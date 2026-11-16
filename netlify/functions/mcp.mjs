// MCP server for the Aldar Robotics site, served at /mcp.
// Agents connect to https://<site>/mcp (Streamable HTTP transport, stateless).
// It reads the same data files the website shows, fetched from this deploy on
// every request, so whatever is live on the site is what agents get.

const PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const SERVER_INFO = { name: "aldar-robotics", title: "Aldar Robotics Deployments", version: "1.1.0" };

// The two map layers on the site. Both files share the same structure.
const LAYERS = [
  { id: "operations", label: "Residential & commercial operations", file: "/data/fleet-data.js", global: "window.FLEET_DATA" },
  { id: "construction", label: "Construction trials", file: "/data/construction-data.js", global: "window.CONSTRUCTION_DATA" },
];

const INSTRUCTIONS =
  "Live data on Aldar's robotics deployments across Abu Dhabi, in two layers: " +
  "operations (robots at residential and commercial assets) and construction (trials on project sites). " +
  "Start with get_overview for totals and the data date. Use list_deployments (filter by status, layer, " +
  "district, asset, vendor, has_media) to see what is deployed and where, and get_deployment for full detail. " +
  "list_assets groups deployments by site with map coordinates. get_media returns site footage: " +
  "thumbnails as images plus links to the videos. get_market_pulse returns the weekly robotics market briefing.";

const STATUS_LABELS = { deployed: "Launched", pilot: "Tested / testing in progress", planned: "Test pending" };
const MAX_INLINE_THUMBNAILS = 8;

const LAYER_PROP = { type: "string", enum: ["operations", "construction"], description: "operations = residential & commercial robots, construction = construction site trials. Omit for both." };

const TOOLS = [
  {
    name: "get_overview",
    title: "Fleet overview",
    description:
      "Headline figures for Aldar's robotics programme: totals by layer, status, robot type, district and vendor, how much site footage exists, and the date the data was last updated.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "list_deployments",
    title: "List deployments",
    description:
      "What is deployed and where: each deployment (one per tracker initiative or trial) with its asset, district, map coordinates, vendor, model, status, latest update, next steps and links to any site footage. All filters are optional and case-insensitive.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["deployed", "pilot", "planned"], description: "deployed = launched, pilot = tested/testing, planned = test pending" },
        layer: LAYER_PROP,
        robot_type: { type: "string", description: "Robot type id or label, e.g. cleaning, facade, inspection, security, delivery, engagement" },
        district: { type: "string", description: "District id or name, e.g. yas, Saadiyat Island" },
        asset: { type: "string", description: "Asset id or name (partial match)" },
        vendor: { type: "string", description: "Vendor name (partial match)" },
        has_media: { type: "boolean", description: "true = only deployments with site footage" },
        query: { type: "string", description: "Free-text search across use case, vendor, model, description and updates" },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_deployment",
    title: "Get deployment",
    description: "Full detail for one deployment by its tracker id (e.g. \"07\", \"23\", \"WTC\", \"CN06\"), including links to its site footage.",
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
    description: "Aldar assets (sites) with location, district and the deployments at each. Optionally filter by district or layer.",
    inputSchema: {
      type: "object",
      properties: { district: { type: "string", description: "District id or name" }, layer: LAYER_PROP },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_media",
    title: "Site footage",
    description:
      "Photos and videos filmed at deployment sites. Returns each clip's title, duration, deployment and site, a direct video link (MP4) and a thumbnail link. " +
      `Thumbnails are also returned as images you can view (up to ${MAX_INLINE_THUMBNAILS} per call). Filter by deployment id, asset or layer; omit all filters for every clip.`,
    inputSchema: {
      type: "object",
      properties: {
        deployment_id: { type: "string", description: "Tracker id, e.g. 07 or CN06" },
        asset: { type: "string", description: "Asset id or name (partial match)" },
        layer: LAYER_PROP,
        include_thumbnails: { type: "boolean", description: "Return thumbnails as images (default true). Set false for links only." },
      },
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

async function loadLayer(origin, layer) {
  const src = await fetchText(origin, layer.file);
  const start = src.indexOf("{", src.indexOf(layer.global));
  const end = src.lastIndexOf("}");
  return JSON.parse(src.slice(start, end + 1));
}

// Loads both layers. The operations layer is required; construction is skipped if missing.
async function loadAll(origin) {
  const results = await Promise.allSettled(LAYERS.map((l) => loadLayer(origin, l)));
  if (results[0].status === "rejected") throw results[0].reason;
  const layers = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") layers.push({ ...LAYERS[i], data: r.value });
  });
  const deployments = [];
  const assets = [];
  for (const layer of layers) {
    const idx = indexLayer(layer.data);
    for (const row of layer.data.fleet || []) deployments.push(describeDeployment(row, idx, layer, origin));
    for (const a of layer.data.assets || []) assets.push({ asset: a, idx, layer });
  }
  const meta = layers[0].data.meta || {};
  return { layers, deployments, assets, asOf: { data_as_of: meta.data_as_of, source: meta.source } };
}

async function loadIntel(origin) {
  return JSON.parse(await fetchText(origin, "/data/intel-feed.json"));
}

// ---------- helpers ----------

const norm = (v) => String(v ?? "").trim().toLowerCase();
const matches = (item, value) => !value || [item.id, item.label, item.name].some((x) => x != null && norm(x) === norm(value));
const contains = (text, value) => norm(text).includes(norm(value));
const absUrl = (path, origin) => (path ? new URL(path, origin).href : null);

function indexLayer(data) {
  return {
    types: Object.fromEntries((data.robot_types || []).map((t) => [t.id, t])),
    districts: Object.fromEntries((data.districts || []).map((d) => [d.id, d])),
    assets: Object.fromEntries((data.assets || []).map((a) => [a.id, a])),
    sections: Object.fromEntries((data.meta?.video_sections || []).map((s) => [s.id, s.label])),
  };
}

function describeMedia(v, idx, origin) {
  return {
    type: "video",
    title: v.title || null,
    video_url: absUrl(v.src, origin),
    thumbnail_url: absUrl(v.poster, origin),
    duration_seconds: v.duration ?? null,
    width: v.width ?? null,
    height: v.height ?? null,
    gallery_section: idx.sections[v.section] || v.section || null,
  };
}

function describeDeployment(row, idx, layer, origin) {
  const asset = idx.assets[row.asset_id] || {};
  const district = idx.districts[asset.district_id] || {};
  const type = idx.types[row.robot_type] || {};
  const media = (row.videos || []).map((v) => describeMedia(v, idx, origin));
  const out = {
    id: row.id,
    layer: layer.id,
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
    media_count: media.length,
    media,
  };
  // Construction trials carry a few extra fields.
  for (const k of ["poc_year", "poc_cost", "innovation_field"]) if (row[k]) out[k] = row[k];
  return out;
}

function countBy(rows, key) {
  const out = {};
  for (const r of rows) {
    const k = r[key] || "Unspecified";
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

const layerOk = (d, layer) => !layer || norm(d.layer) === norm(layer);
const assetOk = (d, asset) => !asset || norm(d.asset_id) === norm(asset) || contains(d.asset, asset);

async function fetchImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const mimeType = res.headers.get("content-type")?.split(";")[0] || "image/jpeg";
  return { mimeType, data: Buffer.from(await res.arrayBuffer()).toString("base64") };
}

// ---------- tools ----------

// Returns { result, extraContent? }. extraContent holds image / link blocks for get_media.
async function callTool(name, args, origin, protocolVersion) {
  args = args || {};
  if (name === "get_market_pulse") {
    const intel = await loadIntel(origin);
    const editions = intel.editions || [];
    const edition = args.edition ? editions.find((e) => norm(e.id) === norm(args.edition)) : editions[0];
    if (!edition) throw new Error(`No edition "${args.edition}". Available: ${editions.map((e) => e.id).join(", ")}`);
    let posts = edition.posts || [];
    if (args.category) {
      const cats = intel.meta?.categories || [];
      const cat = cats.find((c) => matches(c, args.category));
      if (!cat) throw new Error(`Unknown category "${args.category}". Available: ${cats.map((c) => c.id).join(", ")}`);
      posts = posts.filter((p) => norm(p.category) === cat.id);
    }
    return {
      result: {
        title: intel.meta?.title,
        updated_at: intel.meta?.updated_at,
        available_editions: editions.map((e) => ({ id: e.id, label: e.label })),
        edition: { ...edition, posts },
      },
    };
  }

  const { layers, deployments: all, assets, asOf } = await loadAll(origin);

  if (name === "get_overview") {
    const meta = layers[0].data.meta || {};
    const totalsFor = (rows) => ({
      initiatives: rows.length,
      robot_units_stated: rows.reduce((n, d) => n + (Number(d.units) || 0), 0),
      assets_with_deployments: new Set(rows.map((d) => d.asset_id)).size,
      districts: new Set(rows.map((d) => d.district_id).filter(Boolean)).size,
      vendors: new Set(rows.map((d) => d.vendor).filter(Boolean)).size,
      deployments_with_media: rows.filter((d) => d.media_count).length,
      media_clips: rows.reduce((n, d) => n + d.media_count, 0),
    });
    return {
      result: {
        ...asOf,
        tagline: meta.tagline,
        totals: totalsFor(all),
        by_layer: Object.fromEntries(layers.map((l) => [l.id, { label: l.label, ...totalsFor(all.filter((d) => d.layer === l.id)) }])),
        by_status: countBy(all, "status_label"),
        by_robot_type: countBy(all, "robot_type_label"),
        by_district: countBy(all, "district"),
        by_vendor: countBy(all, "vendor"),
        status_definitions: STATUS_LABELS,
        robot_types: layers.flatMap((l) => (l.data.robot_types || []).map((t) => ({ id: t.id, label: t.label, layer: l.id }))),
        districts: [...new Map(layers.flatMap((l) => (l.data.districts || []).map((d) => [d.id, { id: d.id, name: d.name }]))).values()],
      },
    };
  }

  if (name === "list_deployments") {
    const rows = all.filter(
      (d) =>
        (!args.status || norm(d.status) === norm(args.status)) &&
        layerOk(d, args.layer) &&
        (!args.robot_type || matches({ id: d.robot_type, label: d.robot_type_label }, args.robot_type)) &&
        (!args.district || matches({ id: d.district_id, name: d.district }, args.district)) &&
        assetOk(d, args.asset) &&
        (!args.vendor || contains(d.vendor, args.vendor)) &&
        (args.has_media === undefined || !!d.media_count === args.has_media) &&
        (!args.query ||
          [d.use_case, d.vendor, d.model, d.description, d.latest_update, d.next_steps, d.asset, d.category].some((t) =>
            contains(t, args.query)
          ))
    );
    return { result: { ...asOf, count: rows.length, deployments: rows } };
  }

  if (name === "get_deployment") {
    const d = all.find((x) => norm(x.id) === norm(args.id));
    if (!d) throw new Error(`No deployment with id "${args.id}". Known ids: ${all.map((x) => x.id).join(", ")}`);
    return { result: { ...asOf, deployment: d } };
  }

  if (name === "list_assets") {
    const rows = assets
      .filter(({ asset: a, idx, layer }) => {
        const dist = idx.districts[a.district_id] || {};
        return layerOk({ layer: layer.id }, args.layer) && (!args.district || matches({ id: a.district_id, name: dist.name }, args.district));
      })
      .map(({ asset: a, idx, layer }) => {
        const deps = all.filter((d) => d.layer === layer.id && d.asset_id === a.id);
        return {
          id: a.id,
          name: a.name,
          layer: layer.id,
          asset_type: a.asset_type || null,
          district_id: a.district_id,
          district: idx.districts[a.district_id]?.name || null,
          location: { lat: a.lat, lng: a.lng, approximate: !!a.coord_approx },
          deployment_count: deps.length,
          media_clips: deps.reduce((n, d) => n + d.media_count, 0),
          deployments: deps.map((d) => ({ id: d.id, use_case: d.use_case, vendor: d.vendor, status: d.status_label })),
        };
      });
    return { result: { ...asOf, count: rows.length, assets: rows } };
  }

  if (name === "get_media") {
    if (args.deployment_id && !all.some((d) => norm(d.id) === norm(args.deployment_id))) {
      throw new Error(`No deployment with id "${args.deployment_id}". Known ids: ${all.map((x) => x.id).join(", ")}`);
    }
    const clips = all
      .filter((d) => (!args.deployment_id || norm(d.id) === norm(args.deployment_id)) && layerOk(d, args.layer) && assetOk(d, args.asset))
      .flatMap((d) =>
        d.media.map((m) => ({
          ...m,
          deployment_id: d.id,
          use_case: d.use_case,
          vendor: d.vendor,
          status: d.status_label,
          layer: d.layer,
          asset: d.asset,
          district: d.district,
        }))
      );
    const result = {
      ...asOf,
      count: clips.length,
      note: clips.length
        ? "Video links are direct MP4 files that play in any browser."
        : "No footage matches. Use list_deployments with has_media=true to see which deployments have footage.",
      media: clips,
    };

    const extraContent = [];
    if (args.include_thumbnails !== false) {
      const shown = clips.filter((c) => c.thumbnail_url).slice(0, MAX_INLINE_THUMBNAILS);
      const images = await Promise.allSettled(shown.map((c) => fetchImage(c.thumbnail_url)));
      images.forEach((img, i) => {
        if (img.status !== "fulfilled") return;
        const c = shown[i];
        extraContent.push({ type: "text", text: `Thumbnail: ${c.title || "clip"} (deployment ${c.deployment_id}, ${c.asset}) | video: ${c.video_url}` });
        extraContent.push({ type: "image", data: img.value.data, mimeType: img.value.mimeType });
      });
      if (clips.length > shown.length) {
        extraContent.push({ type: "text", text: `${clips.length - shown.length} more clip(s) listed above without inline thumbnails. Narrow by deployment_id or asset to see them.` });
      }
    }
    // resource_link blocks only exist from protocol 2025-06-18 onwards.
    if (protocolVersion >= "2025-06-18") {
      for (const c of clips) {
        extraContent.push({
          type: "resource_link",
          uri: c.video_url,
          name: c.video_url.split("/").pop(),
          title: `${c.title || "Video"} (${c.deployment_id}, ${c.asset})`,
          mimeType: "video/mp4",
        });
      }
    }
    return { result, extraContent };
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

async function handleMessage(msg, origin, protocolVersion) {
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
          const { result, extraContent = [] } = await callTool(tool.name, params.arguments, origin, protocolVersion);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [{ type: "text", text: JSON.stringify(result, null, 2) }, ...extraContent],
              structuredContent: result,
            },
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
  // Clients send the negotiated version on every request after initialize.
  // Without it the spec says to assume 2025-03-26.
  const protocolVersion = req.headers.get("mcp-protocol-version") || "2025-03-26";
  if (Array.isArray(body)) {
    const replies = (await Promise.all(body.map((m) => handleMessage(m, origin, protocolVersion)))).filter(Boolean);
    return replies.length ? json(replies) : new Response(null, { status: 202, headers: CORS });
  }
  const reply = await handleMessage(body, origin, protocolVersion);
  return reply ? json(reply) : new Response(null, { status: 202, headers: CORS });
};

export const config = { path: "/mcp" };
