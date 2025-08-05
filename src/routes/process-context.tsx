import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

import { graphNodes } from '@/data/processData';
import type { GraphNode } from '@/types/processTypes';
import { usePdfSpriteCache } from '@/hooks/usePdfSpriteCache';

import { ControlPanel } from '@/components/process-context/ControlPanel/ControlPanel';
import { GraphRenderer } from '@/components/process-context/GraphRenderer';
import { NodeDetailPanel } from '@/components/process-context/NodeDetailPanel/NodeDetailPanel.tsx';

import { useGraphFiltering } from '@/hooks/useGraphFiltering';
import { useNodePositioning } from '@/hooks/useNodePositioning';
import { useLayerBackgrounds } from '@/hooks/useLayerBackgrounds';

import { getNodeThreeObject } from '@/utils/getNodeThreeObject';
import { focusNodeCamera } from '@/utils/focusNodeCamera';

export const Route = createFileRoute('/process-context')({
    component: RouteComponent,
});

function RouteComponent() {
    const [viewMode, setViewMode] = useState<'default' | 'layered'>('default');
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const { getSprite } = usePdfSpriteCache();

    const spriteCache = useRef(new Map<string, THREE.Sprite>()).current;
    const fgRef = useRef<any>(null);

    const positionedNodes = useNodePositioning(graphNodes, viewMode);
    const { filters, toggleFilter, filteredNodes, filteredLinks } = useGraphFiltering(
        positionedNodes,
        selectedNode,
        viewMode
    );
    const layerBackgrounds = useLayerBackgrounds(viewMode, filters, positionedNodes);

    const handleFocusNode = (node: GraphNode) => {
        setSelectedNode(node);
        if (viewMode === 'default') {
            focusNodeCamera(fgRef.current, node);
        }
    };

    useEffect(() => {
        const scene = fgRef.current?.scene();
        if (!scene) return;

        scene.children = scene.children.filter((obj: THREE.Object3D) => !(obj as any).isLayerBackground);
        layerBackgrounds.forEach((bg: THREE.Object3D) => {
            (bg as any).isLayerBackground = true;
            scene.add(bg);
        });
    }, [layerBackgrounds]);

    return (
        <div>
            <ControlPanel
                filters={filters}
                onToggle={toggleFilter}
                viewMode={viewMode}
                onChangeViewMode={setViewMode}
            />

            <GraphRenderer
                fgRef={fgRef}
                nodes={filteredNodes}
                links={filteredLinks}
                viewMode={viewMode}
                onNodeClick={handleFocusNode}
                getNodeObject={(node) => getNodeThreeObject(node, spriteCache, getSprite)}
            />

            {selectedNode && (
                <NodeDetailPanel
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onFocus={handleFocusNode}
                />
            )}
        </div>
    );
}
