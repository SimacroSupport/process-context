import { useState, useMemo } from 'react';
import type { GraphNode } from '@/types/processTypes';
import { buildGraphLinks } from '@/utils/buildGraphLinks';

type ViewMode = 'default' | 'layered';

export function useGraphFiltering(
    nodes: GraphNode[],
    selectedNode: GraphNode | null,
    viewMode: ViewMode
) {
    const [filters, setFilters] = useState<Record<string, boolean>>({
        pfd: true,
        equipment: true,
        line: true,
        block: true,
        stream: true,
        tag: true,
        datasheet: true,
    });

    const filteredNodes = useMemo(() => {
        return nodes.filter((node) => filters[node.type]);
    }, [filters, nodes]);

    const filteredLinks = useMemo(() => {
        const allLinks = buildGraphLinks(filteredNodes);

        if (viewMode === 'layered') {
            if (!selectedNode) return [];
            return allLinks.filter(
                (link) => link.source === selectedNode.id || link.target === selectedNode.id
            );
        }

        return allLinks;
    }, [filteredNodes, selectedNode, viewMode]);




    const toggleFilter = (type: string) => {
        setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    return {
        filters,
        toggleFilter,
        filteredNodes,
        filteredLinks,
    };
}
