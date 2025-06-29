import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';

import {
    graphNodes,
    imageMap,
    type GraphNode,
    type GraphLink,
    pfdNodes,
    equipmentNodes,
    lineNodes,
    streamNodes,
    blockNodes,
    tagNodes
} from '../data/pfdGraphFlat';


export const Route = createFileRoute('/pfd-graph')({
    component: RouteComponent,
});
export const graphLinks: GraphLink[] = [];
const allNodeIds = new Set(graphNodes.map(node => node.id));
const lineIdToStreamIdMap = new Map<string, string>();

// Line → Stream 매핑
lineNodes.forEach(line => {
    if (line.streamId) {
        lineIdToStreamIdMap.set(line.id, line.streamId);
    }
});

// PFD, Equipment, Line, Stream 간 연결
pfdNodes.forEach(node => {
    if (node.type === 'pfd' && node.connections) {
        const pfdId = node.id;

        node.connections.forEach(conn => {
            // 1️⃣ PFD → Equipment
            graphLinks.push({
                source: pfdId,
                target: conn.equipmentId
            });

            // 2️⃣ Equipment ← inlet Line
            conn.inletStreams.forEach(lineId => {
                if (!allNodeIds.has(lineId)) {
                    console.warn(`❌ lineId '${lineId}' not found in graphNodes`);
                } else {
                    graphLinks.push({ source: lineId, target: conn.equipmentId });
                }

                // 3️⃣ Line → Stream
                const streamId = lineIdToStreamIdMap.get(lineId);
                if (streamId && allNodeIds.has(streamId)) {
                    graphLinks.push({ source: lineId, target: streamId });
                }
            });

            // 2️⃣ Equipment → outlet Line
            conn.outletStreams.forEach(lineId => {
                if (!allNodeIds.has(lineId)) {
                    console.warn(`❌ lineId '${lineId}' not found in graphNodes`);
                } else {
                    graphLinks.push({ source: conn.equipmentId, target: lineId });
                }

                // 3️⃣ Line → Stream
                const streamId = lineIdToStreamIdMap.get(lineId);
                if (streamId && allNodeIds.has(streamId)) {
                    graphLinks.push({ source: lineId, target: streamId });
                }
            });
        });
    }
});

// 🔄 Block ↔ Stream 연결
blockNodes.forEach(block => {
    console.log(block)
    block.inletIds.forEach(streamId => {
        if (allNodeIds.has(streamId)) {
            graphLinks.push({ source: streamId, target: block.id });
        } else {
            console.warn(`❌ streamId '${streamId}' (inlet) not found for block '${block.id}'`);
        }
    });

    block.outletIds.forEach(streamId => {
        if (allNodeIds.has(streamId)) {
            graphLinks.push({ source: block.id, target: streamId });
        } else {
            console.warn(`❌ streamId '${streamId}' (outlet) not found for block '${block.id}'`);
        }
    });
});

// 🔄 Block ↔ Equipment 연결
equipmentNodes.forEach(eq => {
    if (!eq.blocks) return;
    eq.blocks.forEach(blockId => {
        if (allNodeIds.has(blockId)) {
            graphLinks.push({ source: eq.id, target: blockId });
        } else {
            console.warn(`❌ blockId '${blockId}' not found for equipment '${eq.id}'`);
        }
    });
});

tagNodes.forEach(tag => {
    if (allNodeIds.has(tag.lineId)) {
        graphLinks.push({ source: tag.id, target: tag.lineId });
    } else {
        console.warn(`❌ lineId '${tag.lineId}' not found for tag '${tag.id}'`);
    }
});

const listItemStyle = {
    cursor: 'pointer',
    marginBottom: '0.5rem',
    padding: '0.4rem 0.6rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.2s',
};

const smallDescStyle = {
    fontSize: '0.85rem',
    color: '#666',
};

const legendStyle: React.CSSProperties = {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    fontSize: '0.9rem',
    zIndex: 10
};

const colorMap: Record<string, string> = {
    pfd: '',
    equipment: '#0077cc',
    block: '#9933cc',
    line: '#ff9900',
    stream: '#00aa00',
    tag: '#d62728'  // 🔴 Tag 색상 추가
};

const NodeLegend = () => (
    <div style={legendStyle}>
        <ul style={{ listStyle: 'none', margin: 0, paddingLeft: '0.5rem' }}>
            <li>
                <span style={{ color: colorMap.pfd }}>🖼️ PFD</span> – Process Flow Diagram
            </li>
            <li>
                <span style={{ color: colorMap.equipment }}>🔧 Equipment</span> – Real physical unit
            </li>
            <li>
                <span style={{ color: colorMap.block }}>🧠 Block</span> – Model of unit operation
            </li>
            <li>
                <span style={{ color: colorMap.line }}>📦 Line</span> – Physical connection in plant
            </li>
            <li>
                <span style={{ color: colorMap.stream }}>🔁 Stream</span> – Modeled flow in simulation
            </li>
            <li>
                <span style={{ color: colorMap.tag }}>📍 Tag</span> – Sensor value
            </li>
        </ul>
    </div>
);

console.log(graphNodes)

function RouteComponent() {
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const fgRef = useRef<any>(null); // <- 그래프 인스턴스 참조

    const getNodeTitle = (type: string) => {
        switch (type) {
            case 'equipment':
                return '🔧 Equipment Info';
            case 'stream':
                return '🌊 Stream Info';
            case 'line':
                return '📈 Line Info';
            case 'pfd':
                return '🗂️ PFD Info';
            case 'block':
                return '🧱 Block Info';
            default:
                return '📌 Node Info';
        }
    };


    function focusNode(node: GraphNode) {
        console.log(node)
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

    function getNodeDetails(node: GraphNode) {
        if (node.type === 'pfd') {
            const connList = pfdNodes.find(pfd => pfd.id === node.id)?.connections || [];
            return (
                <>
                    <p><strong>Equipments:</strong></p>
                    <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                        {connList.map(conn => {
                            const eq = equipmentNodes.find(e => e.id === conn.equipmentId);
                            return (
                                <li
                                    key={conn.equipmentId}
                                    onClick={() => eq && focusNode(eq)}
                                    style={listItemStyle}
                                >
                                    🔧 <strong>{conn.equipmentId}</strong>
                                    <br />
                                    <span style={smallDescStyle}>{eq?.description || '-'}</span>
                                </li>
                            );
                        })}
                    </ul>
                </>
            );
        }

        if (node.type === 'stream') {
            const connectedLines = lineNodes.filter(line => line.streamId === node.id);
            const connectedBlocks = blockNodes.filter(block =>
                block.inletIds.includes(node.id) || block.outletIds.includes(node.id)
            );

            return (
                <>
                    <p><strong>Type:</strong> Stream</p>

                    {/* 🔗 연결된 Line 표시 */}
                    {connectedLines.length > 0 && (
                        <>
                            <hr />
                            <p><strong>🔗 Connected Lines</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                {connectedLines.map(line => (
                                    <li
                                        key={line.id}
                                        onClick={() => focusNode(line)}
                                        style={listItemStyle}
                                    >
                                        ➖ <strong>{line.id}</strong> ({line.phase || '-'})
                                        <br />
                                        <span style={smallDescStyle}>{line.description || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {/* 🔗 연결된 Block 표시 */}
                    {connectedBlocks.length > 0 && (
                        <>
                            <hr />
                            <p><strong>🔗 Connected Blocks</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                {connectedBlocks.map(block => (
                                    <li
                                        key={block.id}
                                        onClick={() => focusNode(block)}
                                        style={listItemStyle}
                                    >
                                        🧱 <strong>{block.id}</strong> ({block.type})
                                        <br />
                                        <span style={smallDescStyle}>{block.remarks || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            );
        }

        if (node.type === 'line') {
            const matchedStream = streamNodes.find(s => s.id === node.streamId);

            // 해당 line의 from/to가 연결된 equipment인 경우
            const connectedEquipments = equipmentNodes.filter(eq =>
                eq.id === node.from || eq.id === node.to
            );

            return (
                <>
                    <p><strong>Type:</strong> Line</p>
                    <p><strong>Phase:</strong> {node.phase || '-'}</p>
                    <p><strong>Description:</strong> {node.description || '-'}</p>
                    <p><strong>Stream ID:</strong> {node.streamId || '-'}</p>

                    {/* 🔗 연결된 Stream 표시 */}
                    {matchedStream && (
                        <>
                            <hr />
                            <p><strong>🔗 Stream Info</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                <li
                                    key={matchedStream.id}
                                    onClick={() => focusNode(matchedStream)}
                                    style={listItemStyle}
                                >
                                    ⬅️ <strong>{matchedStream.id}</strong>
                                    <br />
                                    <span style={smallDescStyle}>
                            </span>
                                </li>
                            </ul>
                        </>
                    )}

                    {/* 🔧 연결된 Equipment 표시 */}
                    {connectedEquipments.length > 0 && (
                        <>
                            <hr />
                            <p><strong>🔧 Connected Equipments</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                {connectedEquipments.map(eq => (
                                    <li
                                        key={eq.id}
                                        onClick={() => focusNode(eq)}
                                        style={listItemStyle}
                                    >
                                        🔧 <strong>{eq.id}</strong>
                                        <br />
                                        <span style={smallDescStyle}>{eq.description || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            );
        }

        if (node.type === 'equipment') {
            const connectedPfd = pfdNodes.find(pfd => pfd.id === node.pfd);
            const relatedLines = lineNodes.filter(line => line.from === node.id || line.to === node.id);
            const relatedBlocks = blockNodes.filter(block => node.blocks?.includes(block.id));
            return (
                <>
                    <p><strong>Model:</strong> {node.model || '-'}</p>
                    <p><strong>Description:</strong> {node.description}</p>
                    <p><strong>Material:</strong> {node.material || '-'}</p>
                    <p><strong>Temp:</strong> {node.temp || '-'}</p>
                    <p><strong>Pressure:</strong> {node.pressure || '-'}</p>

                    {/* 📂 PFD */}
                    {connectedPfd && (
                        <>
                            <hr />
                            <p><strong>📂 Connected PFD</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                <li
                                    key={connectedPfd.id}
                                    onClick={() => focusNode(connectedPfd)}
                                    style={listItemStyle}
                                >
                                    📂 <strong>{connectedPfd.id}</strong>
                                    <br />
                                    <span style={smallDescStyle}>{connectedPfd.id}</span>
                                </li>
                            </ul>
                        </>
                    )}

                    {/* 🧵 Lines */}
                    {relatedLines.length > 0 && (
                        <>
                            <hr />
                            <p><strong>🧵 Connected Lines</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                {relatedLines.map(line => (
                                    <li
                                        key={line.id}
                                        onClick={() => focusNode(line)}
                                        style={listItemStyle}
                                    >
                                        🧵 <strong>{line.id}</strong>
                                        <br />
                                        <span style={smallDescStyle}>{line.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {/* 🧱 Blocks */}
                    {relatedBlocks.length > 0 && (
                        <>
                            <hr />
                            <p><strong>🧱 Connected Blocks</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                {relatedBlocks.map(block => (
                                    <li
                                        key={block.id}
                                        onClick={() => focusNode(block)}
                                        style={listItemStyle}
                                    >
                                        🧱 <strong>{block.id}</strong>
                                        <br />
                                        <span style={smallDescStyle}>{block.type || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            );
        }
        if (node.type === 'block') {
            const inletStreams = streamNodes.filter(s => node.inletIds?.includes(s.id));
            const outletStreams = streamNodes.filter(s => node.outletIds?.includes(s.id));
            const relatedEquipments = equipmentNodes.filter(eq => eq.blocks?.includes(node.id));

            return (
                <>
                    <p><strong>Block ID:</strong> {node.id}</p>
                    <p><strong>Type:</strong> {node.type}</p>
                    <p><strong>Remarks:</strong> {node.remarks || '-'}</p>

                    {/* 🔧 연결된 Equipment */}
                    {relatedEquipments.length > 0 && (
                        <>
                            <hr />
                            <p><strong>🔧 Connected Equipments</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                {relatedEquipments.map(eq => (
                                    <li
                                        key={eq.id}
                                        onClick={() => focusNode(eq)}
                                        style={listItemStyle}
                                    >
                                        🔧 <strong>{eq.id}</strong>
                                        <br />
                                        <span style={smallDescStyle}>{eq.description || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {/* ⬅️ Inlet Streams */}
                    {inletStreams.length > 0 && (
                        <>
                            <hr />
                            <p><strong>⬅️ Inlet Streams</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                {inletStreams.map(stream => (
                                    <li
                                        key={stream.id}
                                        onClick={() => focusNode(stream)}
                                        style={listItemStyle}
                                    >
                                        ⬅️ <strong>{stream.id}</strong>
                                        <br />
                                        {/*<span style={smallDescStyle}>{stream.description || '-'}</span>*/}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {/* ➡️ Outlet Streams */}
                    {outletStreams.length > 0 && (
                        <>
                            <p><strong>➡️ Outlet Streams</strong></p>
                            <ul style={{ paddingLeft: '1.2rem', listStyle: 'none' }}>
                                {outletStreams.map(stream => (
                                    <li
                                        key={stream.id}
                                        onClick={() => focusNode(stream)}
                                        style={listItemStyle}
                                    >
                                        ➡️ <strong>{stream.id}</strong>
                                        <br />
                                        {/*<span style={smallDescStyle}>{stream.description || '-'}</span>*/}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            );
        }


        return null;
    }

    console.log(selectedNode)
    return (
        <div style={{ }}>
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
                    sprite.color = colorMap[node.type] || '#999999'; // fallback gray

                    return sprite;
                }}
                onNodeClick={(node: GraphNode) => focusNode(node)}

                linkDirectionalArrowLength={0}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1}
                linkDirectionalParticleSpeed={0.005}

            />
            {selectedNode && (
                <div
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        width: '320px',
                        maxHeight: '90vh',               // 전체 화면 높이의 90% 제한
                        background: 'white',
                        color: '#000',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* 제목 + 닫기버튼 영역 */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #ddd',
                            padding: '0.75rem 1rem',
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <h3 style={{margin: 0}}>{getNodeTitle(selectedNode.type)}</h3>
                        <button
                            onClick={() => setSelectedNode(null)}
                            style={{
                                background: '#eee',
                                border: '1px solid #aaa',
                                padding: '4px 8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            ×
                        </button>
                    </div>

                    <div
                        style={{
                            padding: '1rem',
                            overflowY: 'auto',
                            flexGrow: 1,
                        }}
                    >
                        <p><strong>ID:</strong> {selectedNode.id}</p>
                        {getNodeDetails(selectedNode)}
                    </div>
                </div>

            )}
        </div>
    );
}
