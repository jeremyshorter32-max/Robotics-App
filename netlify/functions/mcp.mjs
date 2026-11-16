// MCP server for the Aldar Robotics site, served at /mcp.
// Agents connect to https://<site>/mcp (Streamable HTTP transport, stateless).
// It reads the same data files the website shows, fetched from this deploy,
// so whatever is live on the site is what agents get.

const PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const SERVER_INFO = { name: "aldar-robotics", title: "Aldar Robotics Deployments", version: "1.0.0" };

const INSTRUCTIONS =
  "Live data on Aldar's robotics deployments across Abu Dhabi. " +
  "Start with get_overview for totals and the data date, then list_deployments " +
  "(filterable) or get_deployment for detail. list_assets groups deployments by site. " +
  "get_market_pulse returns the weekly robotics market intelligence briefing.";

const STATUS_LABELS = { deployed: "Launched", pilot: "Tested / testing in progress", planned: "Test pending" };

const TOOLS = [
  {
    name: "get_overview",
    title: "Fleet overview",
    description:
      "Headline figures for Aldar's robotics programme: totals by status, robot type, district and vendor, plus the date the data was last updated.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "list_deployments",
    title: "List deployments",
    description:
      "List robotics deployments (one per tracker initiative) with asset, district, vendor, model, status, latest update and next steps. All filters are optional and case-insensitive.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["deployed", "pilot", "planned"], description: "deployed = launched, pilot = tested/testing, planned = test pending" },
        robot_type: { type: "string", description: "Robot type id or label, e.g. cleaning, facade, inspection, security, delivery, engagement" },
        district: { type: "string", description: "District id or name, e.g. yas, Saadiyat Island" },
        asset: { type: "string", description: "Asset id or name (partial match)" },
        vendor: { type: "string", description: "Vendor name (partial match)" },
        query: { type: "string", description: "Free-text search across use case, vendor, model, description and updates" },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_deployment",
    title: "Get deployment",
    description: "Full detail for one deployment by its tracker id (e.g. \"07\", \"23\", \"WTC\").",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", description: "Tracker id of the deployment" } },
      required: ["id"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "list_assets",
    title: "List assets",
    description: "Aldar assets (sites) with location, district and the deployments at each. Optionally filter by district.",
    inputSchema: {
      type: "object",
      properties: { district: { type: "string", description: "District id or name" } },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_market_pulse",
    title: "Market Pulse briefing",
    description:
      "The weekly robotics market intelligence briefing (trends, launches, investments, deployments worldwide) with a 'why it matters for Aldar' line per story. Returns the latest edition unless an edition id is given.",
    inputSchema: {
      type: "object",
      properties: {
        edition: { type: "string", description: "Edition id, e.g. 2026-W44. Omit for the latest." },
        category: { type: "string", description: "Category id or label to filter stories, e.g. facade, humanoids" },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
];

// ---------- data loading ----------

async function fetchText(origin, path) {
  const res = await fetch(new URL(path, origin), { headers: { "cache-control": "no-cache" } });
  if (!res.ok) throw new Error(`Could not load ${path} (HTTP ${res.status})`);
  return res.text();
}

async function loadFleet(origin) {
  const src = await fetchText(origin, "/data/fleet-data.js");
  const start = src.indexOf("{", src.indexOf("window.FLEET_DATA"));
  const end = src.lastIndexOf("}");
  return JSON.parse(src.slice(start, end + 1));
}

async function loadIntel(origin) {
  return JSON.parse(await fetchText(origin, "/data/intel-feed.json"));
}

// ---------- helpers ----------

const norm = (v) => String(v ?? "").trim().toLowerCase();
const matches = (item, value) => !value || [item.id, item.label, item.name].some((x) => norm(x) === norm(value));
const contains = (text, value) => norm(text).includes(norm(value));

function indexFleet(data) {
  const types = Object.fromEntries((data.robot_types || []).map((t) => [t.id, t]));
  const districts = Object.fromEntries((data.districts || []).map((d) => [d.id, d]));
  const assets = Object.fromEntries((data.assets || []).map((a) => [a.id, a]));
  return { types, districts, assets };
}

function describeDeployment(row, idx) {
  const asset = idx.assets[row.asset_id] || {};
  const district = idx.districts[asset.district_id] || {};
  const type = idx.types[row.robot_type] || {};
  return {
    id: row.id,
    use_case: row.use_case,
    category: row.category || null,
    robot_type: row.robot_type,
    robot_type_label: type.label || row.robot_type,
    vendor: row.vendor || null,
    model: row.model || null,
    units: row.units ?? null,
    status: row.status,
    status_label: STATUS_LABELS[row.status] || row.status,
    tracker_status: row.tracker_status || null,
    stage: row.stage || null,
    asset_id: row.asset_id,
    asset: asset.name || row.asset_id,
    asset_type: asset.asset_type || null,
    district_id: asset.district_id || null,
    district: district.name || null,
    location: asset.lat != null ? { lat: asset.lat, lng: asset.lng, approximate: !!asset.coord_approx } : null,
    owner: row.owner || null,
    entity: row.entity || null,
    funded_by: row.funded_by || null,
    description: row.description || null,
    latest_update: row.update || null,
    next_steps: row.next_steps || null,
  };
}

function countBy(rows, key) {
  const out = {};
  for (const r of rows) {
    const k = r[key] || "Unspecified";
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

// ---------- tools ----------

async function callTool(name, args, origin) {
  args = args || {};
  if (name === "get_market_pulse") {
    const intel = await loadIntel(origin);
    const editions = intel.editions || [];
    const edition = args.edition ? editions.find((e) => norm(e.id) === norm(args.edition)) : editions[0];
    if (!edition) throw new Error(`No edition "${args.edition}". Available: ${editions.map((e) => e.id).join(", ")}`);
    let posts = edition.posts || [];
    if (args.category) {
      const cat = (intel.meta?.categories || []).find((c) => matches(c, args.category));
      const catId = cat ? cat.id : norm(args.category);
      posts = posts.filter((p) => norm(p.category) === catId);
    }
    return {
      title: intel.meta?.title,
      updated_at: intel.meta?.updated_at,
      available_editions: editions.map((e) => ({ id: e.id, label: e.label })),
      edition: { ...edition, posts },
    };
  }

  const data = await loadFleet(origin);
  const idx = indexFleet(data);
  const all = (data.fleet || []).map((r) => describeDeployment(r, idx));
  const asOf = { data_as_of: data.meta?.data_as_of, source: data.meta?.source };

  if (name === "get_overview") {
    const assetIds = new Set(all.map((d) => d.asset_id));
    return {
      ...asOf,
      tagline: data.meta?.tagline,
      totals: {
        initiatives: all.length,
        robot_units_stated: all.reduce((n, d) => n + (Number(d.units) || 0), 0),
        assets_with_deployments: assetIds.size,
        districts: new Set(all.map((d) => d.district_id).filter(Boolean)).size,
        vendors: new Set(all.map((d) => d.vendor).filter(Boolean)).size,
      },
      by_status: countBy(all, "status_label"),
      by_robot_type: countBy(all, "robot_type_label"),
      by_district: countBy(all, "district"),
      by_vendor: countBy(all, "vendor"),
      status_definitions: STATUS_LABELS,
      robot_types: (data.robot_types || []).map((t) => ({ id: t.id, label: t.label })),
      districts: (data.districts || []).map((d) => ({ id: d.id, name: d.name })),
    };
  }

  if (name === "list_deployments") {
    const rows = all.filter(
      (d) =>
        (!args.status || norm(d.status) === norm(args.status)) &&
        (!args.robot_type || matches({ id: d.robot_type, label: d.robot_type_label }, args.robot_type)) &&
        (!args.district || matches({ id: d.district_id, name: d.district }, args.district)) &&
        (!args.asset || norm(d.asset_id) === norm(args.asset) || contains(d.asset, args.asset)) &&
        (!args.vendor || contains(d.vendor, args.vendor)) &&
        (!args.query ||
          [d.use_case, d.vendor, d.model, d.description, d.latest_update, d.next_steps, d.asset, d.category].some((t) =>
            contains(t, args.query)
          ))
    );
    return { ...asOf, count: rows.length, deployments: rows };
  }

  if (name === "get_deployment") {
    const d = all.find((x) => norm(x.id) === norm(args.id));
    if (!d) throw new Error(`No deployment with id "${args.id}". Known ids: ${all.map((x) => x.id).join(", ")}`);
    return { ...asOf, deployment: d };
  }

  if (name === "list_assets") {
    const assets = (data.assets || [])
      .filter((a) => {
        const dist = idx.districts[a.district_id] || {};
        return !args.district || matches({ id: a.district_id, name: dist.name }, args.district);
      })
      .map((a) => {
        const deps = all.filter((d) => d.asset_id === a.id);
        return {
          id: a.id,
          name: a.name,
          asset_type: a.asset_type || null,
          district_id: a.district_id,
          district: idx.districts[a.district_id]?.name || null,
          location: { lat: a.lat, lng: a.lng, approximate: !!a.coord_approx },
          deployment_count: deps.length,
          deployments: deps.map((d) => ({ id: d.id, use_case: d.use_case, vendor: d.vendor, status: d.status_label })),
        };
      });
    return { ...asOf, count: assets.length, assets };
  }

  throw new Error(`Unknown tool: ${name}`);
}

// ---------- JSON-RPC / transport ----------

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, GET, OPTIONS",
  "access-control-allow-headers": "content-type, accept, authorization, mcp-protocol-version, mcp-session-id, last-event-id",
  "access-control-expose-headers": "mcp-session-id, mcp-protocol-version",
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...CORS } });

const rpcError = (id, code, message) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

async function handleMessage(msg, origin) {
  const { id, method, params } = msg || {};
  const isRequest = id !== undefined && id !== null;
  if (!msg || msg.jsonrpc !== "2.0" || typeof method !== "string") {
    return rpcError(id, -32600, "Invalid request");
  }
  if (!isRequest) return null; // notifications (e.g. notifications/initialized) need no reply

  try {
    switch (method) {
      case "initialize": {
        const asked = params?.protocolVersion;
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: PROTOCOL_VERSIONS.includes(asked) ? asked : PROTOCOL_VERSIONS[0],
            capabilities: { tools: { listChanged: false } },
            serverInfo: SERVER_INFO,
            instructions: INSTRUCTIONS,
          },
        };
      }
      case "ping":
        return { jsonrpc: "2.0", id, result: {} };
      case "tools/list":
        return { jsonrpc: "2.0", id, result: { tools: TOOLS } };
      case "tools/call": {
        const tool = TOOLS.find((t) => t.name === params?.name);
        if (!tool) return rpcError(id, -32602, `Unknown tool: ${params?.name}`);
        try {
          const result = await callTool(tool.name, params.arguments, origin);
          return {
            jsonrpc: "2.0",
            id,
            result: { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result },
          };
        } catch (err) {
          return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: String(err.message || err) }], isError: true } };
        }
      }
      default:
        return rpcError(id, -32601, `Method not found: ${method}`);
    }
  } catch (err) {
    return rpcError(id, -32603, String(err.message || err));
  }
}

export default async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") {
    // No server-initiated stream; this server only answers POSTed JSON-RPC.
    return new Response("Method Not Allowed. POST JSON-RPC messages to this MCP endpoint.", {
      status: 405,
      headers: { allow: "POST, OPTIONS", ...CORS },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json(rpcError(null, -32700, "Parse error"), 400);
  }

  const origin = new URL(req.url).origin;
  if (Array.isArray(body)) {
    const replies = (await Promise.all(body.map((m) => handleMessage(m, origin)))).filter(Boolean);
    return replies.length ? json(replies) : new Response(null, { status: 202, headers: CORS });
  }
  const reply = await handleMessage(body, origin);
  return reply ? json(reply) : new Response(null, { status: 202, headers: CORS });
};

export const config = { path: "/mcp" };
