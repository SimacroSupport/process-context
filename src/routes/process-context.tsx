import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import { buildGraphLinks } from '../utils/buildGraphLinks';
import {
  graphNodes,
  pfdNodes,
  equipmentNodes,
  lineNodes,
  // streamNodes,
  blockNodes,
  tagNodes,
  imageMap,
  type GraphNode,
} from '../data/processData';
import {colorMap} from "@/utils/colorMap.ts";
import {NodeLegend} from "@/components/process-context/NodeLegend.tsx";
import NodeDetailPanel from "@/components/process-context/NodeDetailPanel.tsx";

export const Route = createFileRoute('/context-process')({
  component: RouteComponent,
});

const graphLinks = buildGraphLinks(
    graphNodes,
    pfdNodes,
    equipmentNodes,
    lineNodes,
    // streamNodes,
    blockNodes,
    tagNodes
);



function RouteComponent() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const fgRef = useRef<any>(null);
  function focusNode(node: GraphNode) {
        setSelectedNode(node);

        const fg = fgRef.current;
        if (!fg || !node.x || !node.y || !node.z) return;

        const distance = 100;

        // 노드 기준 방향 벡터 생성
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        // 카메라가 이동할 위치: 노드 위치에서 약간 떨어진 곳
        const newPos = {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
        };

        // 반드시 node를 lookAt 대상으로 지정해야 중앙에 보임
        fg.cameraPosition(newPos, node, 1000);
    }

    return (
      <div>
        <NodeLegend />
        <ForceGraph3D
            ref={fgRef}
            graphData={{ nodes: graphNodes, links: graphLinks }}
            nodeLabel="id"
            nodeThreeObject={(node: GraphNode) => {
              if (node.type === 'pfd') {
                const texture = new THREE.TextureLoader().load(imageMap[node.id]);
                const material = new THREE.SpriteMaterial({ map: texture });
                const sprite = new THREE.Sprite(material);
                sprite.scale.set(40, 25, 1);
                sprite.position.set(0, -30, 0);
                return sprite;
              }
              const sprite = new SpriteText(node.id);
              sprite.textHeight = 8;
              sprite.color = colorMap[node.type] || '#999999';
              return sprite;
            }}
            onNodeClick={(node: GraphNode) => focusNode(node)}
            linkDirectionalArrowLength={0}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={1}
            linkDirectionalParticleSpeed={0.005}
        />
        {selectedNode && (
            <NodeDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} onFocus={focusNode} />
        )}
      </div>
  );
}
