import * as THREE from 'three';

export type NodeType =
    | 'pfd'
    | 'equipment'
    | 'block'
    | 'line'
    | 'stream'
    | 'tag'
    | 'datasheet';

export interface BaseNode {
    id: string;
    type: NodeType;
    x?: number;
    y?: number;
    z?: number;
    fx?: number;
    fy?: number;
    fz?: number;
}

export interface PfdNode extends BaseNode {
    type: 'pfd';
    file: string;
    linked: { equipments: string[] };
}

export interface EquipmentNode extends BaseNode {
    type: 'equipment';
    modelType: string;
    description: string;
    material?: string;
    temp?: string;
    pressure?: string;
    capacity?: string;
    linked?: {
        pfd?: string;
        pnid?: string;
        blocks?: string[];
        inletLines?: string[];
        outletLines?: string[];
        datasheets?: string[];
        tags?: string[];
    };
}

export interface LineNode extends BaseNode {
    type: 'line';
    phase: 'Liquid' | 'Vapor' | 'Steam' | '';
    description: string;
    linked: {
        stream?: string;
        inletEquipment?: string;
        outletEquipment?: string;
        tags?: string[];
    };
}

export interface BlockNode extends BaseNode {
    id: string;
    type: 'block';
    blockType: string;
    rootNode?: string;
    linked?: {
        hotStreamIn?:string,
        hotStreamOut?:string,
        coldStreamIn?:string,
        coldStreamOut?:string,
        inletStreams?: string[];
        outletStreams?: string[];
        equipment?: string[];
    };
    description?: string;
}

export interface StreamNode extends BaseNode {
    id: string;
    type: 'stream';
    streamType: 'Material' | 'Utility' | '';
    rootNode: string;
    linked?: {
        inletBlock?: string | null;
        outletBlock?: string | null;
        line?: string | null;
    };
}

export interface TagNode extends BaseNode {
    id: string;
    type: 'tag';
    tagType: string;
    rootNode?: string;
    linked?: {
        line?: string;
        equipment?: string;
    };
}

export interface DatasheetNode extends BaseNode {
    id: string;
    type: 'datasheet';
    filename: string;
    extension: 'pdf' | 'jpg' | 'png' | 'docx' | string;
    linked: {
        equipment: string;
    };
    _spritePromise?: Promise<THREE.Sprite>;
}

export type GraphNode = PfdNode | EquipmentNode | BlockNode | LineNode | StreamNode | TagNode  | DatasheetNode;

export type GraphLink = {
    source: string;
    target: string;
};
