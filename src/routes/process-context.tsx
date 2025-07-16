import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import NodeDetailPanel from "@/components/process-context/NodeDetailPanel.tsx";
import { buildGraphLinks } from '../utils/buildGraphLinks';
import { graphNodes, imageMap } from '../data/processData';
import type { NodeType, GraphNode } from '@/types/processTypes.ts'
import { colorMap } from '@/utils/colorMap.ts';
import {usePdfSpriteCache} from "@/hooks/usePdfSpriteCache.ts";
import {ControlPanel} from "@/components/process-context/ContolPanel/ControlPanel.tsx";

export const Route = createFileRoute('/process-context')({
    component: RouteComponent,
});

function RouteComponent() {
    const [viewMode, setViewMode] = useState<'default' | 'layered'>('default');
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [filters, setFilters] = useState<Record<string, boolean>>({
        pfd: true,
        equipment: true,
        line: true,
        block: true,
        stream: true,
        tag: true,
        datasheet: true,
    });

    const { getSprite } = usePdfSpriteCache();
    const spriteCache = new Map<string, THREE.Sprite>();
    const fgRef = useRef<any>(null);

    const focusNode = useCallback((node: GraphNode) => {
        setSelectedNode(node);
        const fg = fgRef.current;
        if (!fg || node.x == null || node.y == null || node.z == null) return;

        const offset = 100;
        const newPos = {
            x: node.x + offset,
            y: node.y + offset,
            z: node.z + offset,
        };
        fg.cameraPosition(newPos, { x: node.x, y: node.y, z: node.z }, 1000);
    }, []);

    const layerYMap: Record<NodeType, number> = {
        pfd: 150,
        equipment: 100,
        block: 50,
        line: 0,
        stream: -50,
        tag: -100,
        datasheet: -150,
    };

    const groupedByType = graphNodes.reduce((acc, node) => {
        if (!acc[node.type]) acc[node.type] = [];
        acc[node.type].push(node);
        return acc;
    }, {} as Record<string, GraphNode[]>);

    const positionedNodes: GraphNode[] = useMemo(() => {
        return Object.entries(groupedByType).flatMap(([type, nodes]) => {
            const radius = 100 + nodes.length * 5;
            const y = layerYMap[type as NodeType] ?? 0;

            return nodes.map(node => {
                if (viewMode === 'layered') {
                    const r = Math.sqrt(Math.random()) * radius;
                    const theta = Math.random() * 2 * Math.PI;

                    const x = r * Math.cos(theta);
                    const z = r * Math.sin(theta); // z축에 퍼짐

                    return {...node, fx: x, fy: y, fz: z };
                } else {
                    return node;
                }
            });
        });
    }, [viewMode]);

    const filteredNodes = useMemo(() => {
        return positionedNodes.filter((node) => filters[node.type]);
    }, [filters, viewMode]);


    const filteredLinks = useMemo(() => {
        const allLinks = buildGraphLinks(filteredNodes);

        console.log(selectedNode)
        console.log(allLinks)
        if (viewMode === 'layered') {
            if (!selectedNode) return []; // 링크 없음
            return allLinks.filter(
                (link) =>
                    link.source === selectedNode.id ||
                    link.target === selectedNode.id
            );
        }

        return allLinks;
    }, [filteredNodes, selectedNode, viewMode]);


    const handleToggle = (type: string) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    useEffect(() => {
        if (viewMode === 'layered' && fgRef.current) {
            fgRef.current.cameraPosition(
                { x: 0, y: 0, z: 600 },
                { x: 0, y: 0, z: 0 },
                1000
            );
        }
    }, [viewMode]);



    // console.log(filteredLinks)
    return (
        <div>
            <ControlPanel
                filters={filters}
                onToggle={handleToggle}
                viewMode={viewMode}
                onChangeViewMode={setViewMode}
            />

            <ForceGraph3D
                ref={fgRef}
                graphData={{ nodes: filteredNodes, links: filteredLinks }}
                nodeLabel="id"
                enableNodeDrag={false}
                cooldownTicks={viewMode === 'layered' ? 1 : undefined}
                backgroundColor='black'
                // linkColor={'rgba(255,0,0,1)'}
                nodeAutoColorBy={viewMode === 'layered' ? 'module' : undefined}
                nodeOpacity={viewMode === 'layered' ? 0.9 : 1}
                linkDirectionalParticleColor='red'

                d3ForceInit={(fg: any) => {
                    if (viewMode === 'layered') {
                        fg.d3Force('collision', THREE.forceCollide((node: any) => Math.cbrt(node.size)));
                        fg.d3Force('charge')?.strength(-30);
                        fg.d3Force('center', THREE.forceCenter(0, 0, 0));
                    } else {
                        fg.d3Force('charge')?.strength(-120);
                        fg.d3Force('link')?.distance(100);
                    }
                }}

                nodeThreeObject={(node: GraphNode) => {
                    if (node.type === 'pfd') {
                        const texture = new THREE.TextureLoader().load(imageMap[node.id]);
                        const material = new THREE.SpriteMaterial({ map: texture });
                        const sprite = new THREE.Sprite(material);
                        sprite.scale.set(40, 25, 1);
                        sprite.position.set(0, -30, 0);
                        return sprite;
                    }

                    if (node.type === 'datasheet') {
                        if (spriteCache.has(node.id)) return spriteCache.get(node.id)!;
                        const placeholder = new THREE.Object3D();
                        getSprite(`/datasheets/${node.filename}.pdf`).then(sprite => {
                            spriteCache.set(node.id, sprite);
                            placeholder.add(sprite);
                        });
                        return placeholder;
                    }

                    const sprite = new SpriteText(node.id);
                    sprite.textHeight = 8;
                    sprite.color = colorMap[node.type] || '#999999';
                    return sprite;
                }}
                onNodeClick={(node: GraphNode) => {
                    if (viewMode === 'default') {
                        focusNode(node);  // 카메라 이동
                    }
                    setSelectedNode(node);  // 항상 상세 패널 열림
                }}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={viewMode === 'layered' ? 0.8 : 1}
                linkDirectionalParticleSpeed={0.006}
            />

            {selectedNode && (
                <NodeDetailPanel
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onFocus={focusNode}
                />
            )}
        </div>
    );
}
