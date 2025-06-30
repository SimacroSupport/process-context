import {
    type GraphLink,
    type GraphNode,
    type PfdNode,
    type EquipmentNode,
    type LineNode,
    // type StreamNode,
    type BlockNode,
    type TagNode,
} from '../data/processData';

/**
 * 그래프 노드 간의 연결 정보를 생성하는 함수
 */
export function buildGraphLinks(
    graphNodes: GraphNode[],
    pfdNodes: PfdNode[],
    equipmentNodes: EquipmentNode[],
    lineNodes: LineNode[],
    // streamNodes: StreamNode[],
    blockNodes: BlockNode[],
    tagNodes: TagNode[]
): GraphLink[] {
    const links: GraphLink[] = [];
    const allNodeIds = new Set(graphNodes.map(node => node.id));
    const lineIdToStreamIdMap = new Map<string, string>();

    // Line → Stream 매핑
    lineNodes.forEach(line => {
        if (line.streamId) {
            lineIdToStreamIdMap.set(line.id, line.streamId);
        }
    });

    // PFD → Equipment, Line, Stream
    pfdNodes.forEach(pfd => {
        if (pfd.connections) {
            const pfdId = pfd.id;

            pfd.connections.forEach(conn => {
                // 1. PFD → Equipment
                links.push({ source: pfdId, target: conn.equipmentId });

                // 2. Equipment ← inlet Line
                conn.inletStreams.forEach(lineId => {
                    if (allNodeIds.has(lineId)) {
                        links.push({ source: lineId, target: conn.equipmentId });

                        const streamId = lineIdToStreamIdMap.get(lineId);
                        if (streamId && allNodeIds.has(streamId)) {
                            links.push({ source: lineId, target: streamId });
                        }
                    }
                });

                // 3. Equipment → outlet Line
                conn.outletStreams.forEach(lineId => {
                    if (allNodeIds.has(lineId)) {
                        links.push({ source: conn.equipmentId, target: lineId });

                        const streamId = lineIdToStreamIdMap.get(lineId);
                        if (streamId && allNodeIds.has(streamId)) {
                            links.push({ source: lineId, target: streamId });
                        }
                    }
                });
            });
        }
    });

    // Block ↔ Stream
    blockNodes.forEach(block => {
        block.inletIds.forEach(streamId => {
            if (allNodeIds.has(streamId)) {
                links.push({ source: streamId, target: block.id });
            }
        });

        block.outletIds.forEach(streamId => {
            if (allNodeIds.has(streamId)) {
                links.push({ source: block.id, target: streamId });
            }
        });
    });

    // Equipment → Block
    equipmentNodes.forEach(eq => {
        eq.blocks?.forEach(blockId => {
            if (allNodeIds.has(blockId)) {
                links.push({ source: eq.id, target: blockId });
            }
        });
    });

    // Tag → Line
    tagNodes.forEach(tag => {
        if (allNodeIds.has(tag.lineId)) {
            links.push({ source: tag.id, target: tag.lineId });
        }
    });

    return links;
}
