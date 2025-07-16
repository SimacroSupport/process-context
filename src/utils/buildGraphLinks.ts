import type {GraphNode, GraphLink} from "@/types/processTypes.ts";

export function buildGraphLinks(graphNodes: GraphNode[]): GraphLink[] {
    const links: GraphLink[] = [];
    const allNodeIds = new Set(graphNodes.map(node => node.id));

    const addLink = (source: string, target: string) => {
        if (allNodeIds.has(target)) {

            links.push({ source, target });
        }
    };

    graphNodes.forEach(node => {
        const links = node.linked ?? {};

        Object.entries(links).forEach(([_, value]) => {
            if (Array.isArray(value)) {
                value.forEach(targetId => {
                    addLink(node.id, targetId);
                });
            } else if (typeof value === 'string') {
                addLink(node.id, value);
            }
        });
    });

    return links;
}
