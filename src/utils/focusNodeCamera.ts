import type { GraphNode } from '@/types/processTypes';

export function focusNodeCamera(fg: any, node: GraphNode, offset = 100) {
    if (!fg || node.x == null || node.y == null || node.z == null) return;

    const newPos = {
        x: node.x + offset,
        y: node.y + offset,
        z: node.z + offset,
    };

    fg.cameraPosition(newPos, { x: node.x, y: node.y, z: node.z }, 1000);
}
