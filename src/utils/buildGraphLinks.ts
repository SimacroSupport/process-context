import {
    type GraphLink,
    type GraphNode,
} from '../data/processData';

export function buildGraphLinks(graphNodes: GraphNode[]): GraphLink[] {
    const links: GraphLink[] = [];
    const allNodeIds = new Set(graphNodes.map(node => node.id));

    const addLink = (source: string, target: string) => {
        // const isReversedLinkExists = links.some(link =>
        //     link.source === target && link.target === source
        // );

        // 노드가 존재하고, 반대 방향 링크가 없을 때만 추가
        if (allNodeIds.has(target)) {
        // if (allNodeIds.has(target) && !isReversedLinkExists) {
            // console.log(source, target)
            links.push({ source, target });
        }
        // links.push({ source, target });

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
