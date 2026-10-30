/* ==========================================================================
   CONSTRUCTION DATA: the Construction layer of the map (switch at the top).
   Same structure as data/fleet-data.js. Each row in fleet is one trial.
   status: "pilot" = Tested, "planned" = Test Pending (tracker wording is
   kept in tracker_status). Extra fields shown on cards: poc_year, poc_cost,
   innovation_field; owner = Aldar lead; entity = business unit;
   stage = Scaled / Not Scaled status.
   Videos use "section": "construction" so they sit in the Construction tab
   of the Watch deployments gallery.
   Mohammed Bin Zayed City, Al Falah and Al Bahyah (Al Deem) outlines:
   OpenStreetMap (ODbL).
   MBZ School, Al Falah School, Al Deem and Yas Business Park pins are
   approximate (coord_approx); Yas Business Park is the tentative location.
   ========================================================================== */
window.CONSTRUCTION_DATA = {
 "meta": {
  "tagline": "Aldar's construction robotics: proof-of-concept trials on live project sites, what has been tested and what is next.",
  "metrics": [
   {
    "key": "deployments",
    "label": "Trials"
   },
   {
    "key": "sites",
    "label": "Sites"
   },
   {
    "key": "sites_testing",
    "label": "Tested"
   },
   {
    "key": "sites_planned",
    "label": "Pending"
   },
   {
    "key": "partners",
    "label": "Tech partners"
   },
   {
    "key": "districts",
    "label": "Districts"
   }
  ],
  "video_sections": [
   {
    "id": "residential-commercial",
    "label": "Residential & Commercial"
   },
   {
    "id": "construction",
    "label": "Construction",
    "coming_soon": "Construction footage is on its way. Videos of robots on Aldar construction sites will appear here soon."
   }
  ],
  "portfolio_title": "Construction trials",
  "owner_label": "Aldar lead",
  "entity_label": "Business unit",
  "data_as_of": "29 Oct 2026",
  "source": "Aldar construction robotics tracker (latest update 29 Oct 2026)"
 },
 "robot_types": [
  {
   "id": "painting",
   "label": "Painting",
   "color": "#E3B341",
   "ink": "#A87B12"
  },
  {
   "id": "plastering",
   "label": "Plastering",
   "color": "#C9A27E",
   "ink": "#8C6640"
  },
  {
   "id": "tiling",
   "label": "Tile laying",
   "color": "#7FB0C9",
   "ink": "#3F7A96"
  },
  {
   "id": "levelling",
   "label": "Concrete levelling",
   "color": "#A9B4BF",
   "ink": "#5E6B78"
  },
  {
   "id": "finishing",
   "label": "Interior finishing",
   "color": "#D98C5F",
   "ink": "#A3542A"
  },
  {
   "id": "inspection",
   "label": "Inspection",
   "color": "#C9A27A",
   "ink": "#8A6236"
  }
 ],
 "districts": [
  {
   "id": "yas",
   "name": "Yas Island",
   "centroid": [
    24.486,
    54.637
   ],
   "badge_align": "left",
   "geometry": {
    "type": "Polygon",
    "coordinates": [
     [
      [
       54.57183,
       24.49971
      ],
      [
       54.57245,
       24.4984
      ],
      [
       54.57714,
       24.49269
      ],
      [
       54.5776,
       24.49271
      ],
      [
       54.5776,
       24.49224
      ],
      [
       54.58116,
       24.48823
      ],
      [
       54.58338,
       24.48723
      ],
      [
       54.58383,
       24.48716
      ],
      [
       54.58401,
       24.48753
      ],
      [
       54.58402,
       24.48703
      ],
      [
       54.58923,
       24.48484
      ],
      [
       54.59074,
       24.48477
      ],
      [
       54.5915,
       24.48386
      ],
      [
       54.59249,
       24.48356
      ],
      [
       54.59373,
       24.48367
      ],
      [
       54.59538,
       24.48247
      ],
      [
       54.59659,
       24.48257
      ],
      [
       54.59889,
       24.48184
      ],
      [
       54.59832,
       24.47872
      ],
      [
       54.59883,
       24.47731
      ],
      [
       54.59968,
       24.4762
      ],
      [
       54.59888,
       24.47512
      ],
      [
       54.59944,
       24.47356
      ],
      [
       54.59792,
       24.47271
      ],
      [
       54.59818,
       24.47213
      ],
      [
       54.59797,
       24.4713
      ],
      [
       54.59735,
       24.472
      ],
      [
       54.59706,
       24.47178
      ],
      [
       54.597,
       24.47051
      ],
      [
       54.59601,
       24.46927
      ],
      [
       54.59585,
       24.46771
      ],
      [
       54.59499,
       24.46718
      ],
      [
       54.59483,
       24.46586
      ],
      [
       54.5937,
       24.46455
      ],
      [
       54.59345,
       24.46382
      ],
      [
       54.59299,
       24.46396
      ],
      [
       54.5925,
       24.46283
      ],
      [
       54.59152,
       24.46174
      ],
      [
       54.59035,
       24.46146
      ],
      [
       54.59115,
       24.45645
      ],
      [
       54.59098,
       24.45589
      ],
      [
       54.59177,
       24.45451
      ],
      [
       54.59303,
       24.45347
      ],
      [
       54.59363,
       24.45349
      ],
      [
       54.59331,
       24.45459
      ],
      [
       54.59367,
       24.45591
      ],
      [
       54.59517,
       24.45713
      ],
      [
       54.59992,
       24.45787
      ],
      [
       54.60028,
       24.45646
      ],
      [
       54.6009,
       24.45659
      ],
      [
       54.60055,
       24.45801
      ],
      [
       54.60088,
       24.4581
      ],
      [
       54.60123,
       24.4576
      ],
      [
       54.60438,
       24.45863
      ],
      [
       54.60484,
       24.4584
      ],
      [
       54.60455,
       24.45951
      ],
      [
       54.60604,
       24.4601
      ],
      [
       54.60757,
       24.45965
      ],
      [
       54.60817,
       24.45862
      ],
      [
       54.60808,
       24.45773
      ],
      [
       54.60862,
       24.45781
      ],
      [
       54.60962,
       24.45971
      ],
      [
       54.61036,
       24.46216
      ],
      [
       54.60995,
       24.46733
      ],
      [
       54.60976,
       24.46757
      ],
      [
       54.60898,
       24.46746
      ],
      [
       54.60924,
       24.46571
      ],
      [
       54.60831,
       24.46558
      ],
      [
       54.60838,
       24.46507
      ],
      [
       54.60675,
       24.46497
      ],
      [
       54.60576,
       24.46562
      ],
      [
       54.60563,
       24.46643
      ],
      [
       54.6069,
       24.46661
      ],
      [
       54.60663,
       24.46827
      ],
      [
       54.60503,
       24.46806
      ],
      [
       54.60487,
       24.46906
      ],
      [
       54.60755,
       24.4694
      ],
      [
       54.60771,
       24.4683
      ],
      [
       54.6085,
       24.46841
      ],
      [
       54.60857,
       24.46788
      ],
      [
       54.60993,
       24.4681
      ],
      [
       54.60898,
       24.47403
      ],
      [
       54.60909,
       24.47519
      ],
      [
       54.60958,
       24.47617
      ],
      [
       54.61095,
       24.47725
      ],
      [
       54.61273,
       24.47794
      ],
      [
       54.61317,
       24.4778
      ],
      [
       54.61322,
       24.4781
      ],
      [
       54.61437,
       24.47829
      ],
      [
       54.61442,
       24.47858
      ],
      [
       54.61548,
       24.47872
      ],
      [
       54.61548,
       24.47897
      ],
      [
       54.61631,
       24.47929
      ],
      [
       54.61668,
       24.47914
      ],
      [
       54.61665,
       24.4794
      ],
      [
       54.61748,
       24.47975
      ],
      [
       54.62246,
       24.48147
      ],
      [
       54.63052,
       24.48486
      ],
      [
       54.63186,
       24.48581
      ],
      [
       54.63303,
       24.4872
      ],
      [
       54.63378,
       24.48842
      ],
      [
       54.63413,
       24.49035
      ],
      [
       54.63204,
       24.50676
      ],
      [
       54.63142,
       24.50835
      ],
      [
       54.62983,
       24.51059
      ],
      [
       54.62803,
       24.51172
      ],
      [
       54.6253,
       24.51252
      ],
      [
       54.60227,
       24.51606
      ],
      [
       54.60183,
       24.51644
      ],
      [
       54.60213,
       24.51716
      ],
      [
       54.60394,
       24.51693
      ],
      [
       54.60264,
       24.51938
      ],
      [
       54.59911,
       24.51668
      ],
      [
       54.59738,
       24.5147
      ],
      [
       54.59052,
       24.50923
      ],
      [
       54.58488,
       24.5071
      ],
      [
       54.58265,
       24.50672
      ],
      [
       54.57528,
       24.50812
      ],
      [
       54.5744,
       24.50796
      ],
      [
       54.57254,
       24.50123
      ],
      [
       54.57271,
       24.50102
      ],
      [
       54.57183,
       24.49971
      ]
     ]
    ]
   }
  },
  {
   "id": "saadiyat",
   "name": "Saadiyat Island",
   "centroid": [
    24.591,
    54.438
   ],
   "badge_align": "top",
   "geometry": {
    "type": "Polygon",
    "coordinates": [
     [
      [
       54.39316,
       24.53968
      ],
      [
       54.3959,
       24.53619
      ],
      [
       54.39741,
       24.5364
      ],
      [
       54.39942,
       24.53536
      ],
      [
       54.39965,
       24.53474
      ],
      [
       54.40064,
       24.53397
      ],
      [
       54.39978,
       24.53277
      ],
      [
       54.40006,
       24.53182
      ],
      [
       54.40112,
       24.53138
      ],
      [
       54.40172,
       24.52997
      ],
      [
       54.40248,
       24.53047
      ],
      [
       54.40312,
       24.52995
      ],
      [
       54.4026,
       24.52924
      ],
      [
       54.40212,
       24.52916
      ],
      [
       54.40202,
       24.52843
      ],
      [
       54.4047,
       24.52672
      ],
      [
       54.40568,
       24.52648
      ],
      [
       54.40628,
       24.5252
      ],
      [
       54.40712,
       24.52481
      ],
      [
       54.40866,
       24.52336
      ],
      [
       54.4099,
       24.52435
      ],
      [
       54.41177,
       24.5229
      ],
      [
       54.41093,
       24.52229
      ],
      [
       54.41363,
       24.519
      ],
      [
       54.4149,
       24.51815
      ],
      [
       54.41629,
       24.51755
      ],
      [
       54.41747,
       24.51747
      ],
      [
       54.41548,
       24.52016
      ],
      [
       54.41725,
       24.52114
      ],
      [
       54.41731,
       24.52049
      ],
      [
       54.41742,
       24.52115
      ],
      [
       54.41784,
       24.52136
      ],
      [
       54.41832,
       24.52139
      ],
      [
       54.41846,
       24.52034
      ],
      [
       54.41849,
       24.52163
      ],
      [
       54.41887,
       24.52169
      ],
      [
       54.41956,
       24.52146
      ],
      [
       54.41955,
       24.52025
      ],
      [
       54.41968,
       24.52117
      ],
      [
       54.42103,
       24.5202
      ],
      [
       54.42118,
       24.52047
      ],
      [
       54.42219,
       24.52008
      ],
      [
       54.42229,
       24.519
      ],
      [
       54.42241,
       24.51997
      ],
      [
       54.42357,
       24.51937
      ],
      [
       54.42379,
       24.51658
      ],
      [
       54.42386,
       24.51936
      ],
      [
       54.42461,
       24.51891
      ],
      [
       54.42588,
       24.51979
      ],
      [
       54.42753,
       24.51911
      ],
      [
       54.4271,
       24.51855
      ],
      [
       54.42566,
       24.51882
      ],
      [
       54.42675,
       24.51831
      ],
      [
       54.4269,
       24.51633
      ],
      [
       54.42694,
       24.51823
      ],
      [
       54.42764,
       24.51907
      ],
      [
       54.42907,
       24.51856
      ],
      [
       54.42916,
       24.5165
      ],
      [
       54.4292,
       24.51856
      ],
      [
       54.43094,
       24.51876
      ],
      [
       54.43091,
       24.51577
      ],
      [
       54.42439,
       24.51567
      ],
      [
       54.42381,
       24.51578
      ],
      [
       54.42379,
       24.5163
      ],
      [
       54.42357,
       24.51504
      ],
      [
       54.42377,
       24.51482
      ],
      [
       54.43042,
       24.51468
      ],
      [
       54.43237,
       24.514
      ],
      [
       54.43423,
       24.51396
      ],
      [
       54.43649,
       24.51449
      ],
      [
       54.43976,
       24.51342
      ],
      [
       54.44381,
       24.51153
      ],
      [
       54.44482,
       24.51141
      ],
      [
       54.44588,
       24.5105
      ],
      [
       54.44959,
       24.50866
      ],
      [
       54.44992,
       24.50901
      ],
      [
       54.45183,
       24.50827
      ],
      [
       54.45249,
       24.50761
      ],
      [
       54.45276,
       24.5067
      ],
      [
       54.45348,
       24.50645
      ],
      [
       54.45438,
       24.50662
      ],
      [
       54.45483,
       24.50645
      ],
      [
       54.45471,
       24.50609
      ],
      [
       54.45494,
       24.50647
      ],
      [
       54.45587,
       24.50641
      ],
      [
       54.45709,
       24.50579
      ],
      [
       54.45788,
       24.50424
      ],
      [
       54.45728,
       24.50613
      ],
      [
       54.45879,
       24.50632
      ],
      [
       54.46143,
       24.50586
      ],
      [
       54.46303,
       24.50776
      ],
      [
       54.4624,
       24.50961
      ],
      [
       54.46168,
       24.51076
      ],
      [
       54.4593,
       24.5119
      ],
      [
       54.45918,
       24.51226
      ],
      [
       54.4596,
       24.51289
      ],
      [
       54.45713,
       24.51552
      ],
      [
       54.45651,
       24.51721
      ],
      [
       54.45579,
       24.51784
      ],
      [
       54.45647,
       24.52179
      ],
      [
       54.46236,
       24.52529
      ],
      [
       54.46186,
       24.52348
      ],
      [
       54.46197,
       24.52253
      ],
      [
       54.46263,
       24.52149
      ],
      [
       54.46276,
       24.52192
      ],
      [
       54.46261,
       24.5209
      ],
      [
       54.4631,
       24.52137
      ],
      [
       54.46283,
       24.52077
      ],
      [
       54.46305,
       24.51991
      ],
      [
       54.46356,
       24.52015
      ],
      [
       54.46383,
       24.52083
      ],
      [
       54.4628,
       24.52202
      ],
      [
       54.46287,
       24.5236
      ],
      [
       54.46251,
       24.52491
      ],
      [
       54.46275,
       24.52528
      ],
      [
       54.46351,
       24.5254
      ],
      [
       54.46361,
       24.52585
      ],
      [
       54.4643,
       24.52587
      ],
      [
       54.46318,
       24.52697
      ],
      [
       54.46161,
       24.53302
      ],
      [
       54.461,
       24.53355
      ],
      [
       54.45882,
       24.54029
      ],
      [
       54.45798,
       24.54024
      ],
      [
       54.45773,
       24.5405
      ],
      [
       54.45748,
       24.54297
      ],
      [
       54.45671,
       24.54392
      ],
      [
       54.4568,
       24.54479
      ],
      [
       54.45591,
       24.54593
      ],
      [
       54.45561,
       24.54697
      ],
      [
       54.45601,
       24.54798
      ],
      [
       54.45641,
       24.54809
      ],
      [
       54.45599,
       24.55042
      ],
      [
       54.45636,
       24.55158
      ],
      [
       54.45626,
       24.55187
      ],
      [
       54.45556,
       24.55167
      ],
      [
       54.4555,
       24.55254
      ],
      [
       54.45611,
       24.55351
      ],
      [
       54.45748,
       24.5542
      ],
      [
       54.45824,
       24.55536
      ],
      [
       54.45872,
       24.55678
      ],
      [
       54.4591,
       24.5606
      ],
      [
       54.46035,
       24.56171
      ],
      [
       54.46087,
       24.56126
      ],
      [
       54.46069,
       24.56208
      ],
      [
       54.46237,
       24.56431
      ],
      [
       54.46509,
       24.56696
      ],
      [
       54.46633,
       24.56906
      ],
      [
       54.46749,
       24.57308
      ],
      [
       54.46882,
       24.57589
      ],
      [
       54.47234,
       24.58071
      ],
      [
       54.474,
       24.58242
      ],
      [
       54.47727,
       24.58428
      ],
      [
       54.47737,
       24.58512
      ],
      [
       54.47639,
       24.58643
      ],
      [
       54.47657,
       24.58748
      ],
      [
       54.47587,
       24.5872
      ],
      [
       54.47294,
       24.58776
      ],
      [
       54.46976,
       24.58145
      ],
      [
       54.46739,
       24.5782
      ],
      [
       54.46348,
       24.57488
      ],
      [
       54.45995,
       24.57129
      ],
      [
       54.45263,
       24.56301
      ],
      [
       54.44352,
       24.5547
      ],
      [
       54.43075,
       24.54548
      ],
      [
       54.42705,
       24.54344
      ],
      [
       54.42132,
       24.54092
      ],
      [
       54.41991,
       24.54078
      ],
      [
       54.41879,
       24.54089
      ],
      [
       54.41879,
       24.54121
      ],
      [
       54.41653,
       24.54113
      ],
      [
       54.41625,
       24.54182
      ],
      [
       54.41569,
       24.54152
      ],
      [
       54.41456,
       24.5416
      ],
      [
       54.41109,
       24.54036
      ],
      [
       54.40619,
       24.53976
      ],
      [
       54.40463,
       24.53995
      ],
      [
       54.40487,
       24.5414
      ],
      [
       54.40442,
       24.53912
      ],
      [
       54.402,
       24.5389
      ],
      [
       54.4002,
       24.54253
      ],
      [
       54.3986,
       24.54243
      ],
      [
       54.39613,
       24.54032
      ],
      [
       54.39675,
       24.53925
      ],
      [
       54.39567,
       24.53843
      ],
      [
       54.39458,
       24.53822
      ],
      [
       54.39344,
       24.53984
      ],
      [
       54.39316,
       24.53968
      ]
     ]
    ]
   }
  },
  {
   "id": "mbz",
   "name": "Mohammed Bin Zayed City",
   "centroid": [
    24.3463,
    54.5494
   ],
   "badge_align": "bottom",
   "source": "OpenStreetMap way 873221076",
   "geometry": {
    "type": "Polygon",
    "coordinates": [
     [
      [
       54.52331,
       24.40576
      ],
      [
       54.52643,
       24.3438
      ],
      [
       54.52685,
       24.31797
      ],
      [
       54.52734,
       24.31182
      ],
      [
       54.53,
       24.30727
      ],
      [
       54.54111,
       24.29812
      ],
      [
       54.5522,
       24.2876
      ],
      [
       54.57206,
       24.29436
      ],
      [
       54.59515,
       24.30264
      ],
      [
       54.59623,
       24.30333
      ],
      [
       54.59898,
       24.30584
      ],
      [
       54.60116,
       24.30887
      ],
      [
       54.59794,
       24.31128
      ],
      [
       54.59474,
       24.31472
      ],
      [
       54.57069,
       24.34874
      ],
      [
       54.56356,
       24.36149
      ],
      [
       54.55759,
       24.36939
      ],
      [
       54.5473,
       24.38051
      ],
      [
       54.54271,
       24.38727
      ],
      [
       54.52747,
       24.40378
      ],
      [
       54.52331,
       24.40576
      ]
     ]
    ]
   }
  },
  {
   "id": "falah",
   "name": "Al Falah",
   "centroid": [
    24.4355,
    54.7119
   ],
   "badge_align": "right",
   "source": "OpenStreetMap relation 13251359",
   "geometry": {
    "type": "Polygon",
    "coordinates": [
     [
      [
       54.67304,
       24.40953
      ],
      [
       54.68,
       24.41005
      ],
      [
       54.74843,
       24.41875
      ],
      [
       54.76293,
       24.4193
      ],
      [
       54.76581,
       24.42731
      ],
      [
       54.76586,
       24.42919
      ],
      [
       54.76536,
       24.43249
      ],
      [
       54.75709,
       24.43175
      ],
      [
       54.7465,
       24.43011
      ],
      [
       54.74536,
       24.43846
      ],
      [
       54.7467,
       24.46068
      ],
      [
       54.68974,
       24.46135
      ],
      [
       54.68024,
       24.4647
      ],
      [
       54.6773,
       24.46439
      ],
      [
       54.6788,
       24.4499
      ],
      [
       54.67745,
       24.42172
      ],
      [
       54.67649,
       24.41722
      ],
      [
       54.67304,
       24.40953
      ]
     ]
    ]
   }
  },
  {
   "id": "bahyah",
   "name": "Al Bahyah",
   "centroid": [
    24.5481,
    54.6562
   ],
   "badge_align": "top",
   "source": "OpenStreetMap way 873221042",
   "geometry": {
    "type": "Polygon",
    "coordinates": [
     [
      [
       54.60314,
       24.52616
      ],
      [
       54.60392,
       24.52237
      ],
      [
       54.60462,
       24.5221
      ],
      [
       54.60484,
       24.52113
      ],
      [
       54.60514,
       24.52147
      ],
      [
       54.60592,
       24.52075
      ],
      [
       54.60494,
       24.5206
      ],
      [
       54.60425,
       24.52102
      ],
      [
       54.60441,
       24.51988
      ],
      [
       54.60475,
       24.51948
      ],
      [
       54.60442,
       24.51885
      ],
      [
       54.60461,
       24.51838
      ],
      [
       54.60602,
       24.51696
      ],
      [
       54.61034,
       24.5159
      ],
      [
       54.6266,
       24.51331
      ],
      [
       54.62965,
       24.51197
      ],
      [
       54.6298,
       24.51217
      ],
      [
       54.6297,
       24.51181
      ],
      [
       54.63046,
       24.51143
      ],
      [
       54.63164,
       24.51007
      ],
      [
       54.63047,
       24.51166
      ],
      [
       54.6325,
       24.51263
      ],
      [
       54.6342,
       24.50999
      ],
      [
       54.63205,
       24.50958
      ],
      [
       54.63322,
       24.50669
      ],
      [
       54.63402,
       24.50093
      ],
      [
       54.63446,
       24.50112
      ],
      [
       54.63458,
       24.50074
      ],
      [
       54.63614,
       24.49999
      ],
      [
       54.63618,
       24.49757
      ],
      [
       54.63447,
       24.49757
      ],
      [
       54.63534,
       24.49129
      ],
      [
       54.63526,
       24.48947
      ],
      [
       54.63443,
       24.4873
      ],
      [
       54.64393,
       24.48491
      ],
      [
       54.66699,
       24.51521
      ],
      [
       54.69021,
       24.54452
      ],
      [
       54.6944,
       24.55023
      ],
      [
       54.69452,
       24.55533
      ],
      [
       54.69585,
       24.56395
      ],
      [
       54.68347,
       24.56512
      ],
      [
       54.68535,
       24.581
      ],
      [
       54.66946,
       24.58696
      ],
      [
       54.68102,
       24.6062
      ],
      [
       54.6702,
       24.6116
      ],
      [
       54.656,
       24.61141
      ],
      [
       54.65355,
       24.6009
      ],
      [
       54.65289,
       24.60007
      ],
      [
       54.65215,
       24.59974
      ],
      [
       54.65018,
       24.57651
      ],
      [
       54.64302,
       24.57896
      ],
      [
       54.633,
       24.55492
      ],
      [
       54.61549,
       24.54597
      ],
      [
       54.62509,
       24.5403
      ],
      [
       54.6293,
       24.53673
      ],
      [
       54.62915,
       24.53631
      ],
      [
       54.6286,
       24.53609
      ],
      [
       54.62701,
       24.53739
      ],
      [
       54.62608,
       24.53658
      ],
      [
       54.6196,
       24.54102
      ],
      [
       54.62021,
       24.54199
      ],
      [
       54.6156,
       24.54462
      ],
      [
       54.61527,
       24.54472
      ],
      [
       54.61497,
       24.54383
      ],
      [
       54.61374,
       24.5442
      ],
      [
       54.61331,
       24.54293
      ],
      [
       54.61474,
       24.54246
      ],
      [
       54.61493,
       24.54316
      ],
      [
       54.61966,
       24.53967
      ],
      [
       54.61944,
       24.53582
      ],
      [
       54.61688,
       24.53062
      ],
      [
       54.6153,
       24.52847
      ],
      [
       54.60849,
       24.52238
      ],
      [
       54.60805,
       24.5235
      ],
      [
       54.60627,
       24.52505
      ],
      [
       54.60595,
       24.525
      ],
      [
       54.6067,
       24.52428
      ],
      [
       54.60608,
       24.52366
      ],
      [
       54.60517,
       24.52443
      ],
      [
       54.60575,
       24.52562
      ],
      [
       54.60314,
       24.52616
      ]
     ]
    ]
   }
  }
 ],
 "assets": [
  {
   "id": "sama-yas",
   "name": "Sama Yas",
   "short": "Sama Yas",
   "district_id": "yas",
   "asset_type": "Residential (under construction)",
   "lat": 24.5079,
   "lng": 54.6171,
   "label_side": "right",
   "coord_approx": false
  },
  {
   "id": "al-deem",
   "name": "Al Deem",
   "short": "Al Deem",
   "district_id": "bahyah",
   "asset_type": "Residential (under construction)",
   "lat": 24.5237,
   "lng": 54.6237,
   "label_side": "right",
   "coord_approx": true
  },
  {
   "id": "yas-business-park",
   "name": "Yas Business Park (location TBC)",
   "short": "Yas Business Park (location TBC)",
   "district_id": "yas",
   "asset_type": "Commercial (under construction)",
   "lat": 24.4879,
   "lng": 54.6106,
   "label_side": "left",
   "coord_approx": true
  },
  {
   "id": "yas-park-gate",
   "name": "Yas Park Gate",
   "short": "Yas Park Gate",
   "district_id": "yas",
   "asset_type": "Residential",
   "lat": 24.499,
   "lng": 54.6198,
   "label_side": "left",
   "coord_approx": true
  },
  {
   "id": "saadiyat-lagoons",
   "name": "Saadiyat Lagoons",
   "short": "Saadiyat Lagoons",
   "district_id": "saadiyat",
   "asset_type": "Residential",
   "lat": 24.525,
   "lng": 54.46,
   "label_side": "right",
   "coord_approx": true
  },
  {
   "id": "mbz-school",
   "name": "MBZ School",
   "short": "MBZ School",
   "district_id": "mbz",
   "asset_type": "Education (under construction)",
   "lat": 24.334,
   "lng": 54.5536,
   "label_side": "right",
   "coord_approx": true
  },
  {
   "id": "al-falah-school",
   "name": "Al Falah School",
   "short": "Al Falah School",
   "district_id": "falah",
   "asset_type": "Education (under construction)",
   "lat": 24.4376,
   "lng": 54.7183,
   "label_side": "right",
   "coord_approx": true
  },
  {
   "id": "yas-acres",
   "name": "Yas Acres",
   "short": "Yas Acres",
   "district_id": "yas",
   "asset_type": "Residential",
   "lat": 24.5048,
   "lng": 54.6007,
   "label_side": "left",
   "coord_approx": false
  }
 ],
 "fleet": [
  {
   "id": "CN01",
   "category": "Construction",
   "use_case": "Painting",
   "robot_type": "painting",
   "vendor": "WeBuild",
   "model": "WEIBUILD Spraying Robot",
   "asset_id": "sama-yas",
   "owner": "Karim Mohammed Elmasry, Praveen Kumar Chitradurga",
   "tracker_status": "Tested",
   "status": "pilot",
   "stage": "In Discussions",
   "entity": "Aldar Development / Aldar Projects",
   "funded_by": "Vendor",
   "units": null,
   "update": "28 Sep: 3 x 2-bedroom apartments at Sama Yas for a structured comparison: 1 for WeiBuild, 1 for Fangshi Tech, and 1 manual control. The objective is a real-time performance comparison to build the ROI case (test to take place Mid-Oct 26). Upon completion, deployment will scale to the entire block/building. Simultaneously, work is underway with the contracts team to embed robotic painting requirements into future project contracts.\n\n19 Sep: A decision has been made to progress WeiBuild, with CDO (Dev) fully on-boarded and aligned. Sama Yas has been selected as the pilot project, with the team identifying 3 x 2-bedroom apartments for a structured comparison: 1 for WeiBuild, 1 for Fangshi Tech, and 1 manual control. The objective is a real-time performance comparison to build the ROI case (test to take place 28 Sep). Upon completion, deployment will scale to the entire block/building. Simultaneously, work is underway with the contracts team to embed robotic painting requirements into future project contracts.\n\n7 Sep: Initial POC Test complete on 20 July with positive feedback from the contractor and consultant at the project. Recommendation to scale up the testing to move from one unit to a full floor or building",
   "description": "2 rooms in 2 different units at Sama Yas test painted. One unsanded and one sanded. Only primer was tested but same results expected for all coats.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 0",
   "innovation_field": "Robotics"
  },
  {
   "id": "CN02",
   "category": "Construction",
   "use_case": "Plastering",
   "robot_type": "plastering",
   "vendor": "WeBuild",
   "model": "WEIBUILD H301 Plastering Robot",
   "asset_id": "sama-yas",
   "owner": "Karim Mohammed Elmasry, Praveen Kumar Chitradurga",
   "tracker_status": "Tested",
   "status": "pilot",
   "stage": "Not Scaled",
   "entity": "Aldar Development / Aldar Projects",
   "funded_by": "Vendor",
   "units": null,
   "update": "19 Sep: Trial completed 16 July 2026. Site team POC feedback: the plaster robot successfully applied plaster with consistent thickness and a uniform surface finish on block walls. Productivity was noticeably higher compared to conventional manual plastering for large wall areas. Manual surface preparation and pre-wetting were essential to achieve satisfactory plaster adhesion. Manual plastering and touch-up by plasterers were required at joints, corners, edges, ceiling junctions, and inaccessible areas. Minor surface defects with visible join lines and bubbles were observed, requiring manual rectification.\n\nRecommendation: Source and test alternative plastering solution providers",
   "description": "A robotic ready-mix plastering system was trialed on block wall surfaces at a residential development under construction, with the objective of assessing productivity, quality, and practical readiness against manual methods. The trial scope covered open wall areas only, with corners, edges, ceiling junctions, and confined or hard-to-access spaces excluded from robotic application.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 0",
   "innovation_field": "Robotics"
  },
  {
   "id": "CN03",
   "category": "Construction",
   "use_case": "Painting",
   "robot_type": "painting",
   "vendor": "Myro",
   "model": "MYRO Painting Robot",
   "asset_id": "al-deem",
   "owner": "Praveen Kumar Chitradurga",
   "tracker_status": "Tested",
   "status": "pilot",
   "stage": "Not Scaled",
   "entity": "Aldar Development / Aldar Projects",
   "funded_by": "Vendor",
   "units": null,
   "update": "19 Sep: The trial at Al Deem has been completed on 22 June 26. Quality of the painted output was assessed as good. However, the system requires finished flooring to be in place before it can operate, which significantly narrows the window in which it can be deployed within the construction sequence. Total surface coverage fell short of vendor claims, with large areas unable to be reached autonomously. Actual coverage achieved was approximately 80%, with the vendor supplementing the robot's reach by supplying a handheld spray gun to address areas outside the robot's capability. This dependency on a manual fallback reduces the overall efficiency case for the system in its current form.",
   "description": "The PoC tested MYRO's autonomous interior wall painting robot at the Al Deem development, covering surface prepping and painting as part of the broader construction programme at the site. The system uses LiDAR-based collision detection and claims 70% operational cost savings, 10x faster completion, and 30% material savings compared to manual methods.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 0",
   "innovation_field": "Robotics"
  },
  {
   "id": "CN04",
   "category": "Construction",
   "use_case": "Tile Laying",
   "robot_type": "tiling",
   "vendor": "PavePal",
   "model": "PavePal P900",
   "asset_id": "mbz-school",
   "owner": "Praveen Kumar Chitradurga, Alanoud Ali Almarri",
   "tracker_status": "Tested",
   "status": "pilot",
   "stage": "In Discussions",
   "entity": "Aldar Development / Aldar Projects",
   "funded_by": "Aldar",
   "units": null,
   "update": "The trial was conducted at MBZ School on 23 July 2026. Feedback from the on-site contracting team: Overall performance was rated below expectations: the robot operated at slow speed and did not meet productivity targets, with no measurable quality or efficiency gains recorded compared to manual work. The system continues to require manual labor for loading, supervision, and calibration, resulting in minimal labor saving in practice. Setup and calibration times were lengthy and not suited to a fast-paced construction environment. Accessibility also presented a practical risk, with the robot difficult to relocate to upper floors. The contractor's overall conclusion was that the system does not meet project requirements in its current form. Based on this assessment, the recommended path is to step back from further deployment of this particular system and evaluate alternative vendors or more mature robotic tiling solutions before any further site testing. Additionally, any future trial should be conducted across a larger area and potentially overnight to provide a more meaningful assessment of the system's productivity and endurance under realistic conditions.",
   "description": "The PoC is set to trial a robotic tile laying solution at MBZ School, assessing the vendor's capability to lay 60x60cm floor tiles autonomously as an alternative to traditional manual methods in a live construction environment.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 10,000",
   "innovation_field": "Robotics"
  },
  {
   "id": "CN05",
   "category": "Construction",
   "use_case": "Concrete Levelling",
   "robot_type": "levelling",
   "vendor": "Fangshi Tech",
   "model": "ZP-415A Concrete Laser Screed Robot",
   "asset_id": "yas-business-park",
   "owner": "Praveen Kumar Chitradurga, Alanoud Ali Almarri",
   "tracker_status": "Test Pending",
   "status": "planned",
   "stage": "In Discussions",
   "entity": "Aldar Development / Aldar Projects",
   "funded_by": "Vendor",
   "units": null,
   "update": "28 Sep: Estimated POC date Mid-October; tentative location identified as Yas Business Park.\n\nThe trial has not yet taken place and is currently blocked on hardware availability, with the vendor's equipment in KSA. Options being actively explored include expediting the existing equipment from KSA, shipping additional stock from the same vendor, or identifying alternative suppliers. A test location has not yet been confirmed and will be determined once hardware availability is resolved.",
   "description": "The PoC is set to trial robotic concrete levelling across a large open expanse area, assessing the capability of an automated levelling solution to replace or supplement traditional manual methods at scale.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 0",
   "innovation_field": "Robotics"
  },
  {
   "id": "CN06",
   "category": "Construction",
   "use_case": "Interior Finishing (Putty Application, Sanding & Painting)",
   "robot_type": "finishing",
   "vendor": "Fangshi Tech",
   "model": "Fangshi Robotic Sampling Unit (model to be confirmed)",
   "asset_id": "al-falah-school",
   "owner": "Praveen Kumar Chitradurga, Alanoud Ali Almarri",
   "tracker_status": "Tested",
   "status": "pilot",
   "stage": "In Discussions",
   "entity": "Aldar Development / Aldar Projects",
   "funded_by": "Vendor",
   "units": null,
   "update": "The trial took place on 10 August 2026 with the output assessed as acceptable quality. Some operational issues were encountered during the test, including blockages to the feeder pipes, attributed to the trades being carried out in a non-standard sequence for the purposes of the demonstration. The overall conclusion is that wider scale testing beyond a single wall is required before a deployment decision can be made.",
   "description": "The PoC set out to trial a robotic finishing solution at Al Falah School, evaluating three key construction trades using a single robot with interchangeable heads: putty application and scraping, sanding, and spray painting. The test was arranged in collaboration with the main contractor to assess whether a single robotic platform could perform multiple finishing operations in a live construction environment and compare output against traditional manual methods.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 0",
   "innovation_field": "Robotics",
   "videos": [
    {
     "src": "assets/video/cf-fangshi-falah-01.mp4",
     "poster": "assets/video/cf-fangshi-falah-01.jpg",
     "width": 464,
     "height": 832,
     "title": "Putty application and scraping",
     "duration": 20,
     "section": "construction"
    },
    {
     "src": "assets/video/cf-fangshi-falah-02.mp4",
     "poster": "assets/video/cf-fangshi-falah-02.jpg",
     "width": 464,
     "height": 832,
     "title": "Spray painting",
     "duration": 12,
     "section": "construction"
    }
   ]
  },
  {
   "id": "CN07",
   "category": "Testing & Commissioning",
   "use_case": "Quadruped Dog Interior Inspections",
   "robot_type": "inspection",
   "vendor": "Analog",
   "model": "Boston Dynamics Spot",
   "asset_id": "yas-park-gate",
   "owner": "Saeed Osman",
   "tracker_status": "Tested",
   "status": "pilot",
   "stage": "In Discussions",
   "entity": "Aldar Estates",
   "funded_by": "Vendor",
   "units": null,
   "update": "The PoC at Yas Park Gate successfully validated 360\u00b0 capture, thermal imaging, and robot maneuverability in residential units. The engagement progressed through a live snagging shadowing exercise and Onsite platform access being granted to the vendor. A live field trial was conducted at Noya 4 Townhouse on 3 September, covering a comprehensive suite of visual and thermal checks across the unit including MDB/SMDB panel inspections. The initiative is now awaiting a full inspection output report from the vendor covering findings, identified defects, and a value assessment against current manual processes.",
   "description": "The PoC set out to deploy a Boston Dynamics Spot quadruped robot at Yas Park Gate, operated by Analog, to conduct handover inspections using RGB and thermal imaging. The initiative was designed to assess whether a ground-based robotic platform could enhance defect detection and documentation quality during the unit handover process. Data once captured to be analyzed by AI for defects and snags.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 0",
   "innovation_field": "Robotics",
   "videos": [
    {
     "src": "assets/video/07-analog-spot-01.mp4",
     "poster": "assets/video/07-analog-spot-01.jpg",
     "width": 464,
     "height": 832,
     "title": "Climbing stairs",
     "duration": 7,
     "section": "construction"
    },
    {
     "src": "assets/video/07-analog-spot-02.mp4",
     "poster": "assets/video/07-analog-spot-02.jpg",
     "width": 464,
     "height": 832,
     "title": "Exterior walk-round",
     "duration": 8,
     "section": "construction"
    },
    {
     "src": "assets/video/07-analog-spot-03.mp4",
     "poster": "assets/video/07-analog-spot-03.jpg",
     "width": 464,
     "height": 832,
     "title": "Interior inspection",
     "duration": 19,
     "section": "construction"
    }
   ]
  },
  {
   "id": "CN08",
   "category": "Testing & Commissioning",
   "use_case": "Drone Inspections for Unit Exterior",
   "robot_type": "inspection",
   "vendor": "AirTech",
   "model": "Thermal: M300 H20T; General capture: Matrice 4E",
   "asset_id": "saadiyat-lagoons",
   "owner": "Saeed Osman",
   "tracker_status": "Tested",
   "status": "pilot",
   "stage": "In Discussions",
   "entity": "Aldar Estates",
   "funded_by": "Vendor",
   "units": null,
   "update": "PoC data gathering is complete. The initiative is now awaiting analysis and findings from the vendor, with outputs expected to inform whether the approach is validated for broader handover QA deployment across the portfolio.",
   "description": "The PoC set out to deploy drone-based handover inspection at Saadiyat Lagoons Sector 1B, with the vendor conducting low-pass scans of villas nearing completion to identify defects and enhance handover QA documentation. Sector 1B was specifically selected due to its level of completion, with a small subset of villas sufficient to validate the approach.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 0",
   "innovation_field": "Robotics"
  },
  {
   "id": "CN09",
   "category": "Testing & Commissioning",
   "use_case": "Hidden Cavity Inspection",
   "robot_type": "inspection",
   "vendor": "Solinas",
   "model": "Endobot 90 & Endobot 250",
   "asset_id": "yas-acres",
   "owner": "Mohamed Maharoof",
   "tracker_status": "Test Pending",
   "status": "planned",
   "stage": "In Discussions",
   "entity": "Aldar Estates",
   "funded_by": "Vendor",
   "units": null,
   "update": "29/10/26: Robotic Crawler Pipe Inspection POC scheduled to take place at Yas Acres on 29 Oct. POC details: Option 1 (400mm pipe diameter): 3 manholes, ~80m total length. Option 2 (250mm pipe diameter): 4 manholes, ~80m total length. Sewer line (160mm pipe diameter): 4 manholes, ~80m total length. The Grove was removed from the POC due to a Civil Defense inspection being scheduled, and therefore it was not possible to get a work permit.\n\n28/09/26: Site identified: Saadiyat Grove. Scope: Sewerage and stormwater lines with pipe sizes ranging from 100 mm to 300 mm in both the upper ground and lower ground areas. POC Date: 12-15 Oct 26",
   "description": "Site identified: Saadiyat Grove. Sewerage and stormwater lines with pipe sizes ranging from 100 mm to 300 mm in both the upper ground and lower ground areas. Delivering live HD video, AI-assisted defect detection and automated inspection reports in real time.",
   "next_steps": "",
   "poc_year": "2026",
   "poc_cost": "AED 0",
   "innovation_field": "Robotics"
  }
 ]
};
