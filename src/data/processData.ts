import type { GraphNode } from '@/types/processTypes';


export const graphNodes: GraphNode[] = [
    {
        "id": "BA-344715",
        "type": "pfd",
        "linked": {
            "equipments": [
                "864-U-1101A/B",
                "864-C-1101",
                "864-D-1101",
                "864-E-1102A/B"
            ]
        }
    },
        {
            "id": "BA-344716",
            "type": "pfd",
            "linked": {
                "equipments": [
                    "864-E-1103",
                    "864-E-1101A/B",
                    "864-G-1101A/B"
                ]
            }
        },
        {
            "id": "BA-344717",
            "type": "pfd",
            "linked": {
                "equipments": [
                    "864-D-1104A",
                    "864-K-1104A",
                    "864-E-1104A",
                    "864-D-1105A",
                    "864-G-1104A/B"
                ]
            }
        },
        {
            "id": "864-U-1101A/B",
            "type": "equipment",
            "modelType": "Vessel",
            "description": "Condensate Stabilizer Coalescer",
            "linked": {
                "pfd": "BA-344715",
                "pnid": "A",
                "blocks": [
                    "V-102"
                ],
                "inletLines": [
                    "116",
                    "116-2"
                ],
                "outletLines": [
                    "205",
                    "233"
                ],
                "datasheets": [
                    "DS-V1101"
                ]
            }
        },
        {
            "id": "864-C-1101",
            "type": "equipment",
            "modelType": "Tray Column",
            "capacity": "-",
            "material": "CS+SS (\uc608\uc0c1)",
            "temp": "50\u2013150",
            "pressure": "~8.5 / ~123.3",
            "description": "Condensate Stabilizer Column",
            "linked": {
                "pfd": "BA-344715",
                "pnid": "A",
                "blocks": [
                    "T101-1",
                    "T101-2"
                ],
                "inletLines": [
                    "205",
                    "211",
                    "209"
                ],
                "outletLines": [
                    "207",
                    "210",
                    "208",
                    "206"
                ],
                "tags": ["TI111", "TI112", "TI113", "TI114"]

            }
        },
        {
            "id": "864-D-1101",
            "type": "equipment",
            "modelType": "Vessel",
            "description": "Water Side Draw-Off Drum",
            "linked": {
                "pfd": "BA-344715",
                "pnid": "A",
                "inletLines": [],
                "outletLines": [
                    "204"
                ],
                "datasheets": [
                    "DS-D1101"
                ]
            }
        },
        {
            "id": "864-E-1102A/B",
            "type": "equipment",
            "modelType": "Shell & Tube Exchanger",
            "material": "CS",
            "temp": "160\u2013180",
            "pressure": "~9 / ~130.5",
            "description": "Stabilizer Reboiler",
            "linked": {
                "pfd": "BA-344715",
                "pnid": "A",
                "blocks": [
                    "HE102"
                ],
                "inletLines": [
                    "208",
                    "HP Steam In"
                ],
                "outletLines": [
                    "209",
                    "HP Steam Out"
                ],
                "datasheets": [
                    "DS-E1102"
                ]
            }
        },
        {
            "id": "864-E-1103",
            "type": "equipment",
            "modelType": "Air Fin Cooler",
            "material": "CS",
            "temp": "~40",
            "pressure": "~8 / ~116.0",
            "description": "Product Cooler",
            "linked": {
                "pfd": "BA-344716",
                "pnid": "B",
                "blocks": [
                    "Prod Cooler"
                ],
                "inletLines": [
                    "213"
                ],
                "outletLines": [
                    "235"
                ]
            }
        },
        {
            "id": "864-E-1101A/B",
            "type": "equipment",
            "modelType": "Shell & Tube Exchanger",
            "capacity": "28.3*1.16 MMBTU/HR",
            "material": "CS",
            "description": "Condensate Stabilizer Side Reboiler",
            "linked": {
                "pfd": "BA-344716",
                "pnid": "B",
                "blocks": [
                    "HE101"
                ],
                "inletLines": [
                    "210",
                    "206"
                ],
                "outletLines": [
                    "211",
                    "213"
                ],
                "datasheets": [
                    "HE101 TEMA Sheet"
                ]
            }
        },
        {
            "id": "864-D-1104A",
            "type": "equipment",
            "modelType": "Horizontal Drum",
            "material": "CS",
            "temp": "40\u201360",
            "pressure": "~8 / ~116.0",
            "description": "Compressor Suction KO Drum",
            "linked": {
                "pfd": "BA-344717",
                "pnid": "C",
                "inletLines": [
                    "234"
                ],
                "outletLines": [
                    "216",
                    "217"
                ]
            }
        },
        {
            "id": "864-K-1104A",
            "type": "equipment",
            "modelType": "Centrifugal Compressor",
            "capacity": "8000 Nm3/h (\uc608\uc0c1)",
            "material": "Alloy Steel",
            "temp": "50\u201380",
            "pressure": "9\u201312 / 130.5\u2013174.0",
            "description": "Condensate Stabilizer O/H Compressor A",
            "linked": {
                "pfd": "BA-344717",
                "pnid": "C",
                "inletLines": [
                    "216"
                ],
                "outletLines": [
                    "218"
                ]
            }
        },
        {
            "id": "864-E-1104A",
            "type": "equipment",
            "modelType": "Air Fin Cooler",
            "description": "Compressor Discharge Cooler",
            "linked": {
                "pfd": "BA-344717",
                "pnid": "C",
                "inletLines": [
                    "218"
                ],
                "outletLines": [
                    "219"
                ]
            }
        },
        {
            "id": "864-D-1105A",
            "type": "equipment",
            "modelType": "Horizontal Drum",
            "material": "CS",
            "temp": "60\u201380",
            "pressure": "~10 / ~145.0",
            "description": "Compressor Discharge KO Drum",
            "linked": {
                "pfd": "BA-344717",
                "pnid": "C",
                "inletLines": [
                    "219"
                ],
                "outletLines": [
                    "221",
                    "223"
                ]
            }
        },
        {
            "id": "864-G-1101A/B",
            "type": "equipment",
            "modelType": "Centrifugal Pump",
            "material": "SS",
            "temp": "~50",
            "pressure": "~10 / ~145.0",
            "description": "Condensate Product Pump",
            "linked": {
                "pfd": "BA-344716",
                "pnid": "B",
                "inletLines": [
                    "235"
                ],
                "outletLines": [
                    "214"
                ]
            }
        },
        {
            "id": "864-G-1104A/B",
            "type": "equipment",
            "modelType": "Centrifugal Pump",
            "description": "Compressor Condensate Stream Pumps",
            "linked": {
                "pfd": "BA-344717",
                "pnid": "C",
                "inletLines": [
                    "217"
                ],
                "outletLines": [
                    "220"
                ]
            }
        },
        {
            "id": "116",
            "type": "line",
            "phase": "Liquid",
            "description": "Condensate to Condensate Stabilizer Coalescer",
            "linked": {
                "inletEquipment": "Battery Limit",
                "outletEquipment": "864-U-1101A/B",
                "stream": "S101",
                "tags": ["T101", "P101", "FI001"]
            }
        },
        {
            "id": "116-2",
            "type": "line",
            "phase": "Liquid",
            "description": "Condensate to Condensate Stabilizer Coalescer",
            "linked": {
                "inletEquipment": "Battery Limit",
                "outletEquipment": "864-U-1101A/B",
                "stream": "S102",
                "tags": ["T102", "P102", "FI002"]
            }
        },
        {
            "id": "205",
            "type": "line",
            "phase": "Liquid",
            "description": "Condensate from Condensate Stabilizer Coalescer",
            "linked": {
                "inletEquipment": "864-U-1101A/B",
                "outletEquipment": "864-C-1101",
                "stream": "S111",
                "tags": ["FI111", "AI100"]
            }
        },
        {
            "id": "208",
            "type": "line",
            "phase": "Vapor",
            "description": "Cond. Stabilizer Reboiler Feed",
            "linked": {
                "inletEquipment": "864-C-1101",
                "outletEquipment": "864-E-1102A/B",
                "stream": "S116",
                "tags": ["TI114", "PI114"]
            }
        },
        {
            "id": "210",
            "type": "line",
            "phase": "Liquid",
            "description": "Liquid draw to Side Reboiler",
            "linked": {
                "inletEquipment": "864-C-1101",
                "outletEquipment": "864-E-1101A/B",
                "stream": "S114",
                "tags": ["TI112"]
            }
        },
        {
            "id": "211",
            "type": "line",
            "phase": "Liquid",
            "description": "Liquid draw Side Reboiler Return",
            "linked": {
                "inletEquipment": "864-E-1101A/B",
                "outletEquipment": "864-C-1101",
                "stream": "S115",
                "tags": ["TI113"]
            }
        },
        {
            "id": "204",
            "type": "line",
            "phase": "Liquid",
            "description": "Sour Water from Cond. Stabilzer",
            "linked": {
                "inletEquipment": "864-D-1101",
                "outletEquipment": "Sour Water Stripper",
                "stream": "Water Out",
                "tags": ["FI103"]
            }
        },
        {
            "id": "207",
            "type": "line",
            "phase": "Vapor",
            "description": "Top Gas from Cond. Stabilzer",
            "linked": {
                "inletEquipment": "864-C-1101",
                "outletEquipment": "Overhead Comp. Mixer",
                "stream": "S112",
                "tags": ["TI111", "PIC111"]
            }
        },
        {
            "id": "206",
            "type": "line",
            "phase": "Liquid",
            "description": "Condenstate from Cond. Stabilzer Bttm",
            "linked": {
                "inletEquipment": "864-C-1101",
                "outletEquipment": "864-E-1101A/B",
                "stream": "S117",
                "tags": ["TI117", "FI117"]
            }
        },
        {
            "id": "209",
            "type": "line",
            "phase": "Liquid",
            "description": "Cond. Stabilizer Reboiler Return",
            "linked": {
                "inletEquipment": "864-E-1102A/B",
                "outletEquipment": "864-C-1101",
                "stream": "S116-3",
                "tags": ["TI116"]
            }
        },
        {
            "id": "216",
            "type": "line",
            "phase": "Vapor",
            "description": "Gas to Cond. Stabilizer Ovhd Comp. Knock Out Drum",
            "linked": {
                "inletEquipment": "864-D-1104A",
                "outletEquipment": "864-K-1104A",
                "tags": ["TI104", "PI101", "FI104"]
            }
        },
        {
            "id": "217",
            "type": "line",
            "phase": "Liquid",
            "description": "Liq to Cond. Stabilizer Ovhd Comp. KOD",
            "linked": {
                "inletEquipment": "864-D-1104A",
                "outletEquipment": "864-G-1104A/B"
            }
        },
        {
            "id": "214",
            "type": "line",
            "phase": "Liquid",
            "description": "Stabilized Condensate to Export Pipeline",
            "linked": {
                "inletEquipment": "864-G-1101A/B/C",
                "outletEquipment": "Export Pipeline",
                "stream": "S120",
                "tags": ["FI102", "AI107", "AI101", "AI102", "AI103"]
            }
        },
        {
            "id": "213",
            "type": "line",
            "phase": "Liquid",
            "description": "Stabilized Condensate to Product Cooler",
            "linked": {
                "inletEquipment": "864-E-1101A/B",
                "outletEquipment": "864-E-1103",
                "tags": ["TI118"]
            }
        },
        {
            "id": "215",
            "type": "line",
            "phase": "Vapor",
            "description": "",
            "linked": {
                "inletEquipment": "LP Sour Gas",
                "outletEquipment": "864-D-1104A"
            }
        },
        {
            "id": "218",
            "type": "line",
            "phase": "Vapor",
            "description": "",
            "linked": {
                "inletEquipment": "864-K-1104A",
                "outletEquipment": "864-E-1104A",
                "tags": ["TI105", "PI102"]
            }
        },
        {
            "id": "219",
            "type": "line",
            "phase": "Vapor",
            "description": "",
            "linked": {
                "inletEquipment": "864-E-1104A",
                "outletEquipment": "864-D-1105A",
                "tags": ["TI106"]
            }
        },
        {
            "id": "221",
            "type": "line",
            "phase": "Vapor",
            "description": "",
            "linked": {
                "inletEquipment": "864-D-1105A",
                "outletEquipment": "Sour Gas",
                "tags": ["PI103"]
            }
        },
        {
            "id": "223",
            "type": "line",
            "phase": "Liquid",
            "description": "",
            "linked": {
                "inletEquipment": "864-D-1105A",
                "outletEquipment": "864-D-1002"
            }
        },
        {
            "id": "226",
            "type": "line",
            "phase": "Vapor",
            "description": "",
            "linked": {
                "inletEquipment": "864-D-1105A/B",
                "outletEquipment": "854-D-1001"
            }
        },
        {
            "id": "228",
            "type": "line",
            "phase": "Liquid",
            "description": "",
            "linked": {
                "inletEquipment": "864-D-1105A",
                "outletEquipment": "864-D-1002"
            }
        },
        {
            "id": "234",
            "type": "line",
            "phase": "Liquid",
            "description": "",
            "linked": {
                "inletEquipment": "864-D-1002",
                "outletEquipment": "864-D-1104A"
            }
        },
        {
            "id": "235",
            "type": "line",
            "phase": "Liquid",
            "description": "Stabilized Condensate from Product Cooler",
            "linked": {
                "inletEquipment": "864-E-1103",
                "outletEquipment": "864-G-1101A/B/C",
                "tags": ["TI103"]
            }
        },
        {
            "id": "MP In",
            "type": "line",
            "phase": "Steam",
            "description": "",
            "linked": {
                "tags": ["TI101", "FI101"]
            }
        },
        {
            "id": "MP Out",
            "type": "line",
            "phase": "Steam",
            "description": "",
            "linked": {
                "tags": ["TI102"]
            }
        },
        {
            "id": "918",
            "type": "line",
            "phase": "Liquid",
            "description": "",
            "linked": {
                "tags": ["AI104", "AI105", "AI106"]
            }
        },
        {
            "id": "HE102",
            "type": "block",
            "blockType": "Heater",
            "rootNode": "demo.Model.DT_Mirroring.Blocks",
            "description": "Reboiler Heater, Duty: Reb Duty",
            "linked": {
                "inletStreams": ["S116-1"],
                "outletStreams": ["S116-2"],
                "equipment": ["864-E-1102A/B"]
            }
        },
        {
            "id": "V-102",
            "type": "block",
            "blockType": "Separator",
            "rootNode": "demo.Model.DT_Mirroring.Blocks",
            "description": "2-phase separator",
            "linked": {
                "inletStreams": ["S116-2"],
                "outletStreams": ["S116-3", "S117"],
                "equipment": ["864-U-1101A/B"]
            }
        },
        {
            "id": "T101-1",
            "type": "block",
            "blockType": "Absorber / Tower",
            "rootNode": "demo.Model.DT_Mirroring.Blocks",
            "description": "7 stages",
            "linked": {
                "inletStreams": ["S111", "Vap Out from T102"],
                "outletStreams": ["S112", "PA Draw", "Water Out"],
                "equipment": ["864-C-1101"]
            }
        },
        {
            "id": "T101-2",
            "type": "block",
            "blockType": "Absorber / Tower",
            "rootNode": "demo.Model.DT_Mirroring.Blocks",
            "description": "9 stages",
            "linked": {
                "inletStreams": ["PA return", "Boiled Up"],
                "outletStreams": ["S116", "Vap Out from T102"],
                "equipment": ["864-C-1101"]
            }
        },
        {
            "id": "HE101",
            "type": "block",
            "blockType": "Heat Exchanger",
            "rootNode": "demo.Model.DT_Mirroring.Blocks",
            "description": "UA = 804796 Btu/F-hr",
            "linked": {
                "hotStreamIn": "S117",
                "hotStreamOut": "S118",
                "coldStreamIn": "S114",
                "coldStreamOut": "S115",
                "equipment": ["864-E-1101A/B"]
            }
        },
        {
            "id": "V101",
            "type": "block",
            "blockType": "3-Phase Separator",
            "rootNode": "demo.Model.DT_Mirroring.Blocks",
            "linked": {
                "inletStreams": ["S101", "S102"],
                "outletStreams": ["off gas", "S111", "S105"]
            }
        },
        {
            "id": "Prod Cooler",
            "type": "block",
            "blockType": "Cooler",
            "rootNode": "demo.Model.DT_Mirroring.Blocks",
            "description": "Final product stream",
            "linked": {
                "inletStreams": ["S118"],
                "outletStreams": ["S119"],
                "equipment": ["864-E-1103"]
            }
        },
    {
        "id": "S101",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "V101",
            "outletBlock": null,
            "line": "116"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S102",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "V101",
            "outletBlock": null,
            "line": "116-2"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S105",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": "V101",
            "line": null
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "off gas",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": "V101",
            "line": null
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S111",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "T101-1",
            "outletBlock": "V101",
            "line": "205"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S112",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": "T101-1",
            "line": "207"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S113",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": null,
            "line": null
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S114",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "HE101",
            "outletBlock": null,
            "line": "210"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S115",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": "HE101",
            "line": "211"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "PA Return to T102",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": null,
            "line": null
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S116-1",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "HE102",
            "outletBlock": null,
            "line": null
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S116-2",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "V-102",
            "outletBlock": "HE102",
            "line": null
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S116-3",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": "V-102",
            "line": "209"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "Boiled Up",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "T101-2",
            "outletBlock": null,
            "line": null
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S117",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "HE101",
            "outletBlock": "V-102",
            "line": "206"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S118",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": "Prod Cooler",
            "outletBlock": "HE101",
            "line": "213"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S119",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": "Prod Cooler",
            "line": "235"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "S120",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": null,
            "line": "214"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "HP Steam",
        "type": "stream",
        "streamType": "Utility",
        "linked": {
            "inletBlock": null,
            "outletBlock": null,
            "line": null
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "Water Out",
        "type": "stream",
        "streamType": "Material",
        "linked": {
            "inletBlock": null,
            "outletBlock": "T101-1",
            "line": "204"
        },
        "rootNode": "demo.Model.DT_Mirroring.Streams"
    },
    {
        "id": "T101",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "116"
        }
    },
    {
        "id": "P101",
        "type": "tag",
        "tagType": "Pressure",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "116"
        }
    },
    {
        "id": "FI001",
        "type": "tag",
        "tagType": "MassFlow",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "116"
        }
    },
    {
        "id": "T102",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "116-2"
        }
    },
    {
        "id": "P102",
        "type": "tag",
        "tagType": "Pressure",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "116-2"
        }
    },
    {
        "id": "FI002",
        "type": "tag",
        "tagType": "MassFlow",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "116-2"
        }
    },
    {
        "id": "FI111",
        "type": "tag",
        "tagType": "MassFlow",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "205"
        }
    },
    {
        "id": "AI100",
        "type": "tag",
        "tagType": "AIH2O",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "205"
        }
    },
    {
        "id": "TI114",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "208"
        }
    },
    {
        "id": "PI114",
        "type": "tag",
        "tagType": "Pressure",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "208"
        }
    },
    {
        "id": "TI112",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "210"
        }
    },
    {
        "id": "TI113",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "211"
        }
    },
    {
        "id": "FI103",
        "type": "tag",
        "tagType": "MassFlow",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "204"
        }
    },
    {
        "id": "FI104",
        "type": "tag",
        "tagType": "MassFlow",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "216"
        }
    },
    {
        "id": "TI111",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "207"
        }
    },
    {
        "id": "PIC111",
        "type": "tag",
        "tagType": "Pressure",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "207"
        }
    },
    {
        "id": "TI117",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "206"
        }
    },
    {
        "id": "FI117",
        "type": "tag",
        "tagType": "MassFlow",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "206"
        }
    },
    {
        "id": "TI116",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "209"
        }
    },
    {
        "id": "TI104",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "216"
        }
    },
    {
        "id": "PI101",
        "type": "tag",
        "tagType": "Pressure",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "216"
        }
    },
    {
        "id": "TI105",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "218"
        }
    },
    {
        "id": "PI102",
        "type": "tag",
        "tagType": "Pressure",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "218"
        }
    },
    {
        "id": "TI106",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "219"
        }
    },
    {
        "id": "PI103",
        "type": "tag",
        "tagType": "Pressure",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "221"
        }
    },
    {
        "id": "TI118",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "213"
        }
    },
    {
        "id": "TI103",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "235"
        }
    },
    {
        "id": "TI101",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "MP In"
        }
    },
    {
        "id": "FI101",
        "type": "tag",
        "tagType": "MassFlow",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "MP In"
        }
    },
    {
        "id": "TI102",
        "type": "tag",
        "tagType": "Temperature",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "MP Out"
        }
    },
    {
        "id": "AI104",
        "type": "tag",
        "tagType": "AIH2O",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "918"
        }
    },
    {
        "id": "AI105",
        "type": "tag",
        "tagType": "AIH2S",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "918"
        }
    },
    {
        "id": "AI106",
        "type": "tag",
        "tagType": "AIRVP",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "918"
        }
    },
    {
        "id": "FI102",
        "type": "tag",
        "tagType": "MassFlow",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "214"
        }
    },
    {
        "id": "AI107",
        "type": "tag",
        "tagType": "AIGC",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "214"
        }
    },
    {
        "id": "AI101",
        "type": "tag",
        "tagType": "AIH2O",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "214"
        }
    },
    {
        "id": "AI102",
        "type": "tag",
        "tagType": "AIH2S",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "214"
        }
    },
    {
        "id": "AI103",
        "type": "tag",
        "tagType": "AIRVP",
        "rootNode": "demo.Plant",
        "linked": {
            "line": "214"
        }
    },
    {
            "id": "HE101 TEMA Sheet",
            "type": "datasheet",
            "filename": "HE101 TEMA Sheet",
            "extension": "pdf",
            "linked": {
                "equipment": "864-E-1101A/B"
            }
        },
        {
            "id": "DS-E1102",
            "type": "datasheet",
            "filename": "E-1102 TEMA Sheet",
            "extension": "pdf",
            "linked": {
                "equipment": "864-E-1102A/B"
            }
        },
        {
            "id": "DS-V1101",
            "type": "datasheet",
            "filename": "21-AS-S5211-22 Datasheet",
            "extension": "pdf",
            "linked": {
                "equipment": "864-U-1101A/B"
            }
        },
        {
            "id": "DS-D1101",
            "type": "datasheet",
            "filename": "21-AS-T5231-30 Datasheet",
            "extension": "pdf",
            "linked": {
                "equipment": "864-D-1101"
            }
        }
    ];


export const imageMap: Record<string, string> = {
    'BA-344715': '/pfd/pfd-a.png',
    'BA-344716': '/pfd/pfd-a.png',
    'BA-344717': '/pfd/pfd-a.png',
};
