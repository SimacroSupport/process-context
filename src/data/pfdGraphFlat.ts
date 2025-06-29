export interface BaseNode {
    id: string;
    type: string;
    x?: number;
    y?: number;
    z?: number;
}

export interface LineNode extends BaseNode {
    id: string;               // ex) '116'
    type: 'line';             // 고정 값
    phase: 'Liquid' | 'Vapor' | 'Steam' | ''; // Phase는 명확하게 제한해주는 것이 좋습니다
    from: string;             // 출발 장치명
    to: string;               // 도착 장치명
    description: string;      // 설명
    streamId?: string;        // 연결된 Stream ID (선택)
}

export interface StreamNode extends BaseNode {
    id: string;               // ex) 'S101'
    type: 'stream';           // 고정 값
    streamType: 'Material' | 'Utility' | ''; // Material or Utility 등 구분
    from?: string;            // 출발 장치명
    to?: string;              // 도착 장치명
}


export interface EquipmentNode extends BaseNode {
    id: string;
    type: 'equipment';
    model: string;
    equipmentId: string;
    description: string;
    blocks?: string[]; // 연결된 Block ID들
    material?: string;
    temp?: string;
    pressure?: string;
    capacity?: string;
    pfd?: string;
    pid?: string;
}


export interface BlockNode extends BaseNode {
    id: string;              // Block ID (예: HE101)
    type: 'block';           // 고정 값
    unitId: string;          // 설비에 해당하는 Unit ID
    blockType: string;       // 예: 'Heater', 'Separator'
    inletIds: string[];      // 연결된 Inlet Stream ID 목록
    outletIds: string[];     // 연결된 Outlet Stream ID 목록
    remarks?: string;        // 비고
}

export interface PfdNode extends BaseNode {
    id: string;
    type: 'pfd';
    connections?: {
        equipmentId: string;
        inletStreams: string[];
        outletStreams: string[];
    }[];
}

export interface TagNode extends BaseNode {
    id: string;           // ex) "TI100"
    type: 'tag';          // 고정 값
    tagType: 'TI' | 'PI' | 'FI' | 'GC' | 'H2O' | 'H2S' | 'RVP';  // 태그 분류
    lineId: string;       // 연결된 Line의 ID
    value: number;        // 측정값 (임시 랜덤 값)
}


export type GraphNode = PfdNode | EquipmentNode | BlockNode | LineNode | StreamNode | TagNode;

export type GraphLink = {
    source: string;
    target: string;
};

export const pfdNodes: PfdNode[] = [
    {
        id: 'BA-344715',
        type: 'pfd',
        connections: [
            {
                equipmentId: '864-U-1101A/B',
                inletStreams: ['116', '116-2'],
                outletStreams: ['205', '233']
            },
            {
                equipmentId: '864-C-1101',
                inletStreams: ['205', '211', '209'],
                outletStreams: ['207', '210', '208', '206']
            },
            {
                equipmentId: '864-D-1101',
                inletStreams: [],
                outletStreams: ['204']
            },
            {
                equipmentId: '864-E-1102A/B',
                inletStreams: ['208', 'HP Steam In'],
                outletStreams: ['209', 'HP Steam Out']
            }
        ]
    },
    {
        id: 'BA-344716',
        type: 'pfd',
        connections: [
            {
                equipmentId: '864-E-1103',
                inletStreams: ['213'],
                outletStreams: ['235']
            },
            {
                equipmentId: '864-E-1101A/B',
                inletStreams: ['210', '206'],
                outletStreams: ['211', '213']
            },
            {
                equipmentId: '864-G-1101A/B',
                inletStreams: ['235'],
                outletStreams: ['214']
            }
        ]
    },
    {
        id: 'BA-344717',
        type: 'pfd',
        connections: [
            {
                equipmentId: '864-D-1104A',
                inletStreams: ['234'],
                outletStreams: ['216', '217']
            },
            {
                equipmentId: '864-K-1104A',
                inletStreams: ['216'],
                outletStreams: ['218']
            },
            {
                equipmentId: '864-E-1104A',
                inletStreams: ['218'],
                outletStreams: ['219']
            },
            {
                equipmentId: '864-D-1105A',
                inletStreams: ['219'],
                outletStreams: ['221', '223']
            },
            {
                equipmentId: '864-G-1104A/B',
                inletStreams: ['217'],
                outletStreams: ['220']
            }
        ]
    }
];

export const lineNodes: LineNode[] =[
    {
        "id": "116",
        "type": "line",
        "phase": "Liquid",
        "from": "Feed",
        "to": "864-U-1101A/B",
        "description": "Condensate to Condensate Stabilizer Coalescer",
        "streamId": "S101"
    },
    {
        "id": "116-2",
        "type": "line",
        "phase": "Liquid",
        "from": "Feed",
        "to": "864-U-1101A/B",
        "description": "Condensate to Condensate Stabilizer Coalescer",
        "streamId": "S102"
    },
    {
        "id": "205",
        "type": "line",
        "phase": "Liquid",
        "from": "864-U-1101A/B",
        "to": "864-C-1101",
        "description": "Condensate from Condensate Stabilizer Coalescer",
        "streamId": "S111"
    },
    {
        "id": "208",
        "type": "line",
        "phase": "Liquid",
        "from": "864-C-1101",
        "to": "864-E-1102A/B",
        "description": "Cond. Stabilizer Reboiler Feed",
        "streamId": "S116"
    },
    {
        "id": "210",
        "type": "line",
        "phase": "Liquid",
        "from": "864-C-1101",
        "to": "864-E-1101A/B",
        "description": "Liquid draw to Side Reboiler",
        "streamId": "S114"
    },
    {
        "id": "211",
        "type": "line",
        "phase": "Liquid",
        "from": "864-E-1101A/B",
        "to": "864-C-1101",
        "description": "Liquid draw Side Reboiler Return",
        "streamId": "S115"
    },
    {
        "id": "204",
        "type": "line",
        "phase": "Liquid",
        "from": "864-D-1101",
        "to": "Sour Water Stripper",
        "description": "Sour Water from Cond. Stabilzer",
        "streamId": "Water Out"
    },
    {
        "id": "207",
        "type": "line",
        "phase": "Vapor",
        "from": "864-C-1101",
        "to": "Overhead Comp. Mixer",
        "description": "Top Gas from Cond. Stabilzer",
        "streamId": "S112"
    },
    {
        "id": "206",
        "type": "line",
        "phase": "Liquid",
        "from": "864-C-1101",
        "to": "864-E-1101A/B",
        "description": "Condenstate from Cond. Stabilzer Bttm",
        "streamId": "S117"
    },
    {
        "id": "209",
        "type": "line",
        "phase": "Vapor",
        "from": "864-E-1102A/B",
        "to": "864-C-1101",
        "description": "Cond. Stabilizer Reboiler Return",
        "streamId": "S116-3"
    },
    {
        "id": "216",
        "type": "line",
        "phase": "Vapor",
        "from": "864-D-1104A",
        "to": "864-K-1104A",
        "description": "Gas to Cond. Stabilizer Ovhd Comp. Knock Out Drom",
        "streamId": ""
    },
    {
        "id": "217",
        "type": "line",
        "phase": "Liquid",
        "from": "864-D-1104A",
        "to": "864-G-1104A/B",
        "description": "Liq to Cond. Stabilizer Ovhd Comp. KOD",
        "streamId": ""
    },
    {
        "id": "214",
        "type": "line",
        "phase": "Liquid",
        "from": "864-G-1101A/B/C",
        "to": "Export Pipeline",
        "description": "Stabilized Condensate to Export Pipeline",
        "streamId": "S120"
    },
    {
        "id": "215",
        "type": "line",
        "phase": "Vapor",
        "from": "LP Sour Gas",
        "to": "864-D-1104A",
        "description": "LP Sour Gas",
        "streamId": ""
    },
    {
        "id": "228",
        "type": "line",
        "phase": "Liquid",
        "from": "864-D-1105A",
        "to": "864-D-1002",
        "description": "Condensate from String A/B",
        "streamId": ""
    },
    {
        "id": "234",
        "type": "line",
        "phase": "Liquid",
        "from": "864-D-1002",
        "to": "864-D-1104A",
        "description": "Gas from to Cond. Stabilizer O/H Comp KOD",
        "streamId": ""
    },
    {
        "id": "218",
        "type": "line",
        "phase": "Vapor",
        "from": "864-K-1104A",
        "to": "864-E-1104A",
        "description": "Sour Gas from Cond. Stabilizer O/H Comp. Discharge",
        "streamId": ""
    },
    {
        "id": "219",
        "type": "line",
        "phase": "Vapor",
        "from": "864-E-1104A",
        "to": "864-D-1105A",
        "description": "Sour Gas from Cond. Stabilizer O/H Comp. Discharge Cooler",
        "streamId": ""
    },
    {
        "id": "221",
        "type": "line",
        "phase": "Vapor",
        "from": "864-D-1105A",
        "to": "Sour Gas",
        "description": "Sour Gas from Cond. Stabilizer O/H Comp. Discharge KOD",
        "streamId": ""
    },
    {
        "id": "223",
        "type": "line",
        "phase": "Liquid",
        "from": "864-D-1105A",
        "to": "864-D-1002",
        "description": "Condensate from Cond. Stabilizer O/H Comp. Discharge KOD",
        "streamId": ""
    },
    {
        "id": "226",
        "type": "line",
        "phase": "Vapor",
        "from": "864-D-1105A/B",
        "to": "854-D-1001",
        "description": "To Inlet Gas Slug Catcher",
        "streamId": ""
    },
    {
        "id": "213",
        "type": "line",
        "phase": "Liquid",
        "from": "864-E-1101A/B",
        "to": "864-E-1103",
        "description": "Stabilized Condensate to Product Cooler",
        "streamId": "S118"
    },
    {
        "id": "235",
        "type": "line",
        "phase": "Liquid",
        "from": "864-E-1103",
        "to": "864-G-1101A/B/C",
        "description": "Stabilized Condensate from Product Cooler",
        "streamId": "S119"
    }
]

export const streamNodes: StreamNode[] = [
    {
        "id": "S101",
        "type": "stream",
        "streamType": "Material",
        "from": "",
        "to": "V101"
    },
    {
        "id": "S102",
        "type": "stream",
        "streamType": "Material",
        "from": "",
        "to": "V101"
    },
    {
        "id": "S105",
        "type": "stream",
        "streamType": "Material",
        "from": "V101",
        "to": ""
    },
    {
        "id": "off gas",
        "type": "stream",
        "streamType": "Material",
        "from": "V101",
        "to": ""
    },
    {
        "id": "S111",
        "type": "stream",
        "streamType": "Material",
        "from": "V101",
        "to": "T101-1"
    },
    {
        "id": "S112",
        "type": "stream",
        "streamType": "Material",
        "from": "T101-1",
        "to": ""
    },
    {
        "id": "S113",
        "type": "stream",
        "streamType": "Material",
        "from": "",
        "to": ""
    },
    {
        "id": "S114",
        "type": "stream",
        "streamType": "Material",
        "from": "T101-1",
        "to": "HE101 (tube)"
    },
    {
        "id": "S115",
        "type": "stream",
        "streamType": "Material",
        "from": "HE101 (tube)",
        "to": "RCY-4"
    },
    {
        "id": "PA Return to T102",
        "type": "stream",
        "streamType": "Material",
        "from": "RCY-4",
        "to": "T101-2"
    },
    {
        "id": "S116-1",
        "type": "stream",
        "streamType": "Material",
        "from": "T101-2",
        "to": "HE102"
    },
    {
        "id": "S116-2",
        "type": "stream",
        "streamType": "Material",
        "from": "HE102",
        "to": "V-102"
    },
    {
        "id": "S116-3",
        "type": "stream",
        "streamType": "Material",
        "from": "V-102",
        "to": "RCY-1"
    },
    {
        "id": "Boiled Up",
        "type": "stream",
        "streamType": "Material",
        "from": "RCY-1",
        "to": ""
    },
    {
        "id": "S117",
        "type": "stream",
        "streamType": "Material",
        "from": "V-102",
        "to": "HE101 (shell)"
    },
    {
        "id": "S118",
        "type": "stream",
        "streamType": "Material",
        "from": "HE101 (shell)",
        "to": "HE104"
    },
    {
        "id": "S119",
        "type": "stream",
        "streamType": "Material",
        "from": "HE104",
        "to": ""
    },
    {
        "id": "S120",
        "type": "stream",
        "streamType": "Material",
        "from": "HE104",
        "to": "Export Pipeline"
    },
    {
        "id": "HP Steam",
        "type": "stream",
        "streamType": "Utility",
        "from": "",
        "to": "HE102"
    },
    {
        "id": "Water Out",
        "type": "stream",
        "streamType": "Material",
        "from": "T101-1",
        "to": ""
    }
]

export const equipmentNodes: EquipmentNode[] = [
    {
        id: '864-U-1101A/B',
        type: 'equipment',
        model: 'Vessel',
        equipmentId: '864-U-1101A/B',
        pfd: 'BA-344715',
        pid: 'A',
        description: 'Condensate Stabilizer Coalescer',
        blocks: ['V-102']
    },
    {
        id: '864-C-1101',
        type: 'equipment',
        model: 'Tray Column',
        equipmentId: '864-C-1101',
        capacity: '-',
        material: 'CS+SS (예상)',
        temp: '50–150',
        pressure: '~8.5 / ~123.3',
        pfd: 'BA-344715',
        pid: 'A',
        description: 'Condensate Stabilizer Column',
        blocks: ['T101-1', 'T101-2']
    },
    {
        id: '864-D-1101',
        type: 'equipment',
        model: 'Vessel',
        equipmentId: '864-D-1101',
        pfd: 'BA-344715',
        pid: 'A',
        description: 'Water Side Draw-Off Drum'
    },
    {
        id: '864-E-1102A/B',
        type: 'equipment',
        model: 'Shell & Tube Exchanger',
        equipmentId: '864-E-1102A/B',
        material: 'CS',
        temp: '160–180',
        pressure: '~9 / ~130.5',
        pfd: 'BA-344715',
        pid: 'A',
        description: 'Stabilizer Reboiler',
        blocks: ['HE102']
    },
    {
        id: '864-E-1103',
        type: 'equipment',
        model: 'Air Fin Cooler',
        equipmentId: '864-E-1103',
        material: 'CS',
        temp: '~40',
        pressure: '~8 / ~116.0',
        pfd: 'BA-344716',
        pid: 'B',
        description: 'Product Cooler',
        blocks: ['Prod Cooler']
    },
    {
        id: '864-E-1101A/B',
        type: 'equipment',
        model: 'Shell & Tube Exchanger',
        equipmentId: '864-E-1101A/B',
        capacity: '28.3*1.16 MMBTU/HR',
        material: 'CS',
        pfd: 'BA-344716',
        pid: 'B',
        description: 'Condensate Stabilizer Side Reboiler',
        blocks: ['HE101']
    },
    {
        id: '864-D-1104A',
        type: 'equipment',
        model: 'Horizontal Drum',
        equipmentId: '864-D-1104A',
        material: 'CS',
        temp: '40–60',
        pressure: '~8 / ~116.0',
        pfd: 'BA-344717',
        pid: 'C',
        description: 'Compressor Suction KO Drum'
    },
    {
        id: '864-K-1104A',
        type: 'equipment',
        model: 'Centrifugal Compressor',
        equipmentId: '864-K-1104A',
        capacity: '8000 Nm3/h (예상)',
        material: 'Alloy Steel',
        temp: '50–80',
        pressure: '9–12 / 130.5–174.0',
        pfd: 'BA-344717',
        pid: 'C',
        description: 'Condensate Stabilizer O/H Compressor A'
    },
    {
        id: '864-E-1104A',
        type: 'equipment',
        model: 'Air Fin Cooler',
        equipmentId: '864-E-1104A',
        pfd: 'BA-344717',
        pid: 'C',
        description: 'Compressor Discharge Cooler'
    },
    {
        id: '864-D-1105A',
        type: 'equipment',
        model: 'Horizontal Drum',
        equipmentId: '864-D-1105A',
        material: 'CS',
        temp: '60–80',
        pressure: '~10 / ~145.0',
        pfd: 'BA-344717',
        pid: 'C',
        description: 'Compressor Discharge KO Drum'
    },
    {
        id: '864-G-1101A/B',
        type: 'equipment',
        model: 'Centrifugal Pump',
        equipmentId: '864-G-1101A/B',
        material: 'SS',
        temp: '~50',
        pressure: '~10 / ~145.0',
        pfd: 'BA-344716',
        pid: 'B',
        description: 'Condensate Product Pump'
    },
    {
        id: '864-G-1104A/B',
        type: 'equipment',
        model: 'Centrifugal Pump',
        equipmentId: '864-G-1104A/B',
        pfd: 'BA-344717',
        pid: 'C',
        description: 'Compressor Condensate Stream Pumps'
    }
];

export const blockNodes: BlockNode[] = [
    {
        id: 'HE102',
        type: 'block',
        unitId: 'HE102',
        blockType: 'Heater',
        inletIds: ['S116-1'],
        outletIds: ['S116-2'],
        remarks: 'Reboiler Heater, Duty: Reb Duty'
    },
    {
        id: 'V-102',
        type: 'block',
        unitId: 'V-102',
        blockType: 'Separator',
        inletIds: ['S116-2'],
        outletIds: ['S116-3', 'S117'],
        remarks: '2-phase separator'
    },
    {
        id: 'T101-1',
        type: 'block',
        unitId: 'T101-1',
        blockType: 'Absorber / Tower',
        inletIds: ['S111', 'Vap Out from T102'],
        outletIds: ['S112', 'PA Draw', 'Water Out'],
        remarks: '7 stages'
    },
    {
        id: 'T101-2',
        type: 'block',
        unitId: 'T101-2',
        blockType: 'Absorber / Tower',
        inletIds: ['PA return', 'Boiled Up'],
        outletIds: ['S116', 'Vap Out from T102'],
        remarks: '9 stages'
    },
    {
        id: 'HE101',
        type: 'block',
        unitId: 'HE101',
        blockType: 'Heat Exchanger',
        inletIds: ['S114', 'S117'],
        outletIds: ['S115', 'S118'],
        remarks: 'UA = 804796 Btu/F-hr'
    },
    {
        id: 'V101',
        type: 'block',
        unitId: 'V101',
        blockType: '3-Phase Separator',
        inletIds: ['S101', 'S102'],
        outletIds: ['off gas', 'S111', 'S105'],
    },
    {
        id: 'Prod Cooler',
        type: 'block',
        unitId: 'Prod Cooler',
        blockType: 'Cooler',
        inletIds: ['S118'],
        outletIds: ['S119'],
        remarks: 'Final product stream'
    }
];

export const tagNodes: TagNode[] =[
    {
        "id": "TI100",
        "type": "tag",
        "tagType": "TI",
        "lineId": "209",
        "value": 152
    },
    {
        "id": "TI103",
        "type": "tag",
        "tagType": "TI",
        "lineId": "235",
        "value": 196
    },
    {
        "id": "TI104",
        "type": "tag",
        "tagType": "TI",
        "lineId": "216",
        "value": 58
    },
    {
        "id": "TI105",
        "type": "tag",
        "tagType": "TI",
        "lineId": "218",
        "value": 59
    },
    {
        "id": "TI106",
        "type": "tag",
        "tagType": "TI",
        "lineId": "219",
        "value": 82
    },
    {
        "id": "TI101",
        "type": "tag",
        "tagType": "TI",
        "lineId": "MP In",
        "value": 182
    },
    {
        "id": "TI102",
        "type": "tag",
        "tagType": "TI",
        "lineId": "MP Out",
        "value": 124
    },
    {
        "id": "PI100",
        "type": "tag",
        "tagType": "PI",
        "lineId": "207",
        "value": 14
    },
    {
        "id": "PI101",
        "type": "tag",
        "tagType": "PI",
        "lineId": "216",
        "value": 17
    },
    {
        "id": "PI102",
        "type": "tag",
        "tagType": "PI",
        "lineId": "218",
        "value": 8
    },
    {
        "id": "PI103",
        "type": "tag",
        "tagType": "PI",
        "lineId": "221",
        "value": 14
    },
    {
        "id": "FI100",
        "type": "tag",
        "tagType": "FI",
        "lineId": "205",
        "value": 779
    },
    {
        "id": "FI101",
        "type": "tag",
        "tagType": "FI",
        "lineId": "MP In",
        "value": 509
    },
    {
        "id": "FI102",
        "type": "tag",
        "tagType": "FI",
        "lineId": "214",
        "value": 997
    },
    {
        "id": "FI103",
        "type": "tag",
        "tagType": "FI",
        "lineId": "216",
        "value": 414
    },
    {
        "id": "AI100",
        "type": "tag",
        "tagType": "H2O",
        "lineId": "205",
        "value": 2.59
    },
    {
        "id": "AI101",
        "type": "tag",
        "tagType": "H2O",
        "lineId": "214",
        "value": 1.16
    },
    {
        "id": "AI102",
        "type": "tag",
        "tagType": "H2S",
        "lineId": "214",
        "value": 5.66
    },
    {
        "id": "AI103",
        "type": "tag",
        "tagType": "RVP",
        "lineId": "214",
        "value": 7.81
    },
    {
        "id": "AI104",
        "type": "tag",
        "tagType": "H2O",
        "lineId": "918",
        "value": 8.95
    },
    {
        "id": "AI105",
        "type": "tag",
        "tagType": "H2S",
        "lineId": "918",
        "value": 3.13
    },
    {
        "id": "AI106",
        "type": "tag",
        "tagType": "RVP",
        "lineId": "918",
        "value": 2.05
    },
    {
        "id": "AI107",
        "type": "tag",
        "tagType": "GC",
        "lineId": "214",
        "value": 5.94
    }
]

export const graphNodes: GraphNode[] = [
    ...lineNodes,
    ...pfdNodes,
    ...equipmentNodes,
    ...streamNodes,
    ...blockNodes,
    ...tagNodes
];

export const imageMap: Record<string, string> = {
    'BA-344715': '/pfd/pfd-a.png',
    'BA-344716': '/pfd/pfd-a.png',
    'BA-344717': '/pfd/pfd-a.png',
};
