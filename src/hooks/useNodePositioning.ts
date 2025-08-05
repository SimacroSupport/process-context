import { useMemo } from 'react';
import type { GraphNode, NodeType } from '@/types/processTypes';

const layerYMap: Record<NodeType, number> = {
    pfd: 150,
    equipment: 100,
    block: 50,
    line: 0,
    stream: -50,
    tag: -100,
    datasheet: -150,
};

export function useNodePositioning(
    nodes: GraphNode[],
    viewMode: 'default' | 'layered'
): GraphNode[] {
    const groupedByType = useMemo(() => {
        return nodes.reduce((acc, node) => {
            if (!acc[node.type]) acc[node.type] = [];
            acc[node.type].push(node);
            return acc;
        }, {} as Record<string, GraphNode[]>);
    }, [nodes]);

    return useMemo(() => {
        return Object.entries(groupedByType).flatMap(([type, group]) => {
            const radius = 100 + group.length * 5;
            const y = layerYMap[type as NodeType] ?? 0;

            return group.map((node) => {
                if (viewMode === 'layered') {
                    const r = Math.sqrt(Math.random()) * radius;
                    const theta = Math.random() * 2 * Math.PI;
                    const x = r * Math.cos(theta);
                    const z = r * Math.sin(theta);
                    return { ...node, fx: x, fy: y, fz: z };
                }
                return node;
            });
        });
    }, [groupedByType, viewMode]);
}
