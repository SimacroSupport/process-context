import { useMemo } from 'react';
import * as THREE from 'three';
import type { NodeType, GraphNode } from '@/types/processTypes';
import { colorMap } from '@/utils/colorMap';

const layerYMap: Record<NodeType, number> = {
    pfd: 150,
    equipment: 100,
    block: 50,
    line: 0,
    stream: -50,
    tag: -100,
    datasheet: -150,
};

export function useLayerBackgrounds(
    viewMode: 'default' | 'layered',
    filters: Record<string, boolean>,
    nodes: GraphNode[]
): THREE.Mesh[] {
    const nodeBounds = useMemo(() => {
        const xs = nodes.map((n) => n.fx ?? n.x ?? 0);
        const zs = nodes.map((n) => n.fz ?? n.z ?? 0);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minZ = Math.min(...zs);
        const maxZ = Math.max(...zs);

        return {
            width: maxX - minX + 100,
            height: maxZ - minZ + 100,
        };
    }, [nodes]);

    return useMemo(() => {
        if (viewMode !== 'layered') return [];

        return Object.entries(layerYMap)
            .filter(([type]) => filters[type])
            .map(([type, y]) => {
                const geometry = new THREE.PlaneGeometry(nodeBounds.width, nodeBounds.height);
                const material = new THREE.MeshBasicMaterial({
                    color: colorMap[type as NodeType] || '#999999',
                    opacity: 0.2,
                    transparent: true,
                    depthWrite: false,
                    side: THREE.DoubleSide,
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = y;
                mesh.name = `layer-${type}`;
                return mesh;
            });
    }, [viewMode, nodeBounds, filters]);
}
