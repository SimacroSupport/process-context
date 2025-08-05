import React, { useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import type { GraphNode, GraphLink } from '@/types/processTypes';

type Props = {
    fgRef: React.RefObject<any>;
    nodes: GraphNode[];
    links: GraphLink[];
    viewMode: 'default' | 'layered';
    onNodeClick: (node: GraphNode) => void;
    getNodeObject: (node: GraphNode) => THREE.Object3D;
};

export function GraphRenderer({
                                  fgRef,
                                  nodes,
                                  links,
                                  viewMode,
                                  onNodeClick,
                                  getNodeObject,
                              }: Props) {
    useEffect(() => {
        const fg = fgRef.current;
        if (!fg) return;

        const camera = fg.camera();
        const controls = fg.controls();

        if (viewMode === 'layered') {
            // ✅ 카메라 위치 설정
            // z 방향 위에서 내려다보는 정렬
            camera.position.set(0, 0, 600);        // 카메라 Z축 위에 배치
            camera.up.set(0, 1, 0);                // up 벡터 Y축
            camera.lookAt(0, 0, 0);                // 항상 중심을 봄

            controls.target.set(0, 0, 0);
            controls.minPolarAngle = 0;
            controls.maxPolarAngle = 0;           // 정면에서 아래만 보도록 제한
            controls.minAzimuthAngle = 0;
            controls.maxAzimuthAngle = 0;
            controls.update();

        }

        if (viewMode === 'default') {
            // ✅ 제한 해제
            controls.minPolarAngle = 0;
            controls.maxPolarAngle = Math.PI;
            controls.minAzimuthAngle = -Infinity;
            controls.maxAzimuthAngle = Infinity;

            controls.update();
        }
    }, [viewMode]);



    return (
        <ForceGraph3D
            ref={fgRef}
            graphData={{ nodes, links }}
            nodeLabel="id"
            enableNodeDrag={false}
            cooldownTicks={viewMode === 'layered' ? 1 : undefined}
            backgroundColor="black"
            nodeAutoColorBy={viewMode === 'layered' ? 'module' : undefined}
            nodeOpacity={viewMode === 'layered' ? 0.9 : 1}
            linkDirectionalParticles={2}
            linkDirectionalParticleColor="red"
            linkDirectionalParticleWidth={viewMode === 'layered' ? 0.8 : 1}
            linkDirectionalParticleSpeed={0.006}
            onNodeClick={onNodeClick}
            nodeThreeObject={getNodeObject}
        />
    );
}
