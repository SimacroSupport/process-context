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
  streamNodes,
  blockNodes,
  tagNodes,
  imageMap,
  type GraphNode,
} from '../data/processData';
import {colorMap} from "@/utils/colorMap.ts";
import {NodeLegend} from "@/components/context-process/NodeLegend.tsx";
import NodeDetailPanel from "@/components/context-process/NodeDetailPanel.tsx";

export const Route = createFileRoute('/context-process')({
  component: RouteComponent,
});

const graphLinks = buildGraphLinks(
    graphNodes,
    pfdNodes,
    equipmentNodes,
    lineNodes,
    streamNodes,
    blockNodes,
    tagNodes
);



function RouteComponent() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const fgRef = useRef<any>(null);

  function focusNode(node: GraphNode) {
    setSelectedNode(node);
    const distance = 100;
    const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);
    const newPos = {
      x: (node.x || 0) * distRatio,
      y: (node.y || 0) * distRatio,
      z: (node.z || 0) * distRatio,
    };
    fgRef.current.cameraPosition(newPos, node, 2000);
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
