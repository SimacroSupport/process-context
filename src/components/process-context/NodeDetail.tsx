import { type GraphNode } from '@/data/processData';
import {
    pfdNodes,
    equipmentNodes,
    blockNodes,
    lineNodes,
    streamNodes,
    tagNodes,
} from '@/data/processData';
import {colorMap} from "@/utils/colorMap.ts";

import styles from '../../styles/contextProcess.module.css';

interface Props {
    node: GraphNode;
    onFocus: (node: GraphNode) => void;
}

const NodeDetail = ({ node, onFocus }: Props) => {
    const inlineList = styles.inlineList;
    const itemClass = styles.listItem;
    const descClass = styles.smallDesc;

    const coloredId = (id: string, type: string) => (
        <strong style={{ color: colorMap[type] || '#333' }}>{id}</strong>
    );

    if (node.type === 'pfd') {
        const connList = pfdNodes.find(pfd => pfd.id === node.id)?.connections || [];
        return (
            <>
                <p><strong>Equipments:</strong></p>
                <ul className={inlineList}>
                    {connList.map(conn => {
                        const eq = equipmentNodes.find(e => e.id === conn.equipmentId);
                        return (
                            <li key={conn.equipmentId} onClick={() => eq && onFocus(eq)} className={itemClass}>
                                {coloredId(conn.equipmentId, 'equipment')} ({eq?.modelType})<br />

                                <span className={descClass}>{eq?.description || '-'}</span>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }

    if (node.type === 'equipment') {
        const connectedPfd = pfdNodes.find(pfd => pfd.id === node.pfd);
        const relatedLines = lineNodes.filter(line => line.from === node.id || line.to === node.id);
        const relatedBlocks = blockNodes.filter(block => node.blocks?.includes(block.id));

        return (
            <>
                <p><strong>Model Type:</strong> {node.modelType || '-'}</p>
                <p><strong>Description:</strong> {node.description}</p>
                <p><strong>Material:</strong> {node.material || '-'}</p>
                <p><strong>Temp:</strong> {node.temp || '-'}</p>
                <p><strong>Pressure:</strong> {node.pressure || '-'}</p>

                {connectedPfd && (
                    <>
                        <hr />
                        <p><strong>Connected PFD</strong></p>
                        <ul className={inlineList}>
                            <li onClick={() => onFocus(connectedPfd)} className={itemClass}>
                                {coloredId(connectedPfd.id, 'pfd')}<br />
                                <span className={descClass}>{connectedPfd.id}</span>
                            </li>
                        </ul>
                    </>
                )}

                {relatedLines.length > 0 && (
                    <>
                        <hr />
                        <p><strong>Connected Lines</strong></p>
                        <ul className={inlineList}>
                            {relatedLines.map(line => (
                                <li key={line.id} onClick={() => onFocus(line)} className={itemClass}>
                                    {coloredId(line.id, 'line')} ({line.phase})<br />
                                    <span className={descClass}>{line.description}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {relatedBlocks.length > 0 && (
                    <>
                        <hr />
                        <p><strong>Connected Blocks</strong></p>
                        <ul className={inlineList}>
                            {relatedBlocks.map(block => (
                                <li key={block.id} onClick={() => onFocus(block)} className={itemClass}>
                                    {coloredId(block.id, 'block')} ({block.blockType})<br />
                                    <span className={descClass}>{block.type || '-'}</span>
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
                <p><strong>Block Type:</strong> {node.blockType || '-'}</p>
                <p><strong>Remarks:</strong> {node.remarks || '-'}</p>

                {relatedEquipments.length > 0 && (
                    <>
                        <hr />
                        <p><strong>Connected Equipments</strong></p>
                        <ul className={inlineList}>
                            {relatedEquipments.map(eq => (
                                <li key={eq.id} onClick={() => onFocus(eq)} className={itemClass}>
                                    {coloredId(eq.id, 'equipment')} ({eq.modelType})<br />
                                    <span className={descClass}>{eq.description || '-'}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {inletStreams.length > 0 && (
                    <>
                        <hr />
                        <p><strong>Inlet Streams</strong></p>
                        <ul className={inlineList}>
                            {inletStreams.map(stream => (
                                <li key={stream.id} onClick={() => onFocus(stream)} className={itemClass}>
                                    {coloredId(stream.id, 'stream')} ({stream.streamType})
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {outletStreams.length > 0 && (
                    <>
                        <p><strong>Outlet Streams</strong></p>
                        <ul className={inlineList}>
                            {outletStreams.map(stream => (
                                <li key={stream.id} onClick={() => onFocus(stream)} className={itemClass}>
                                    {coloredId(stream.id, 'stream')} ({stream.streamType})
                                </li>
                            ))}
                        </ul>
                    </>
                )}
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

                {connectedLines.length > 0 && (
                    <>
                        <hr />
                        <p><strong>Connected Lines</strong></p>
                        <ul className={inlineList}>
                            {connectedLines.map(line => (
                                <li key={line.id} onClick={() => onFocus(line)} className={itemClass}>
                                    {coloredId(line.id, 'line')} ({line.phase || '-'})<br />
                                    <span className={descClass}>{line.description || '-'}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {connectedBlocks.length > 0 && (
                    <>
                        <hr />
                        <p><strong>Connected Blocks</strong></p>
                        <ul className={inlineList}>
                            {connectedBlocks.map(block => (
                                <li key={block.id} onClick={() => onFocus(block)} className={itemClass}>
                                    {coloredId(block.id, 'block')} ({block.blockType})<br />
                                    <span className={descClass}>{block.remarks || '-'}</span>
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
        const connectedTags = tagNodes.filter(tag => tag.lineId === node.id);
        const connectedEquipments = equipmentNodes.filter(eq =>
            eq.id === node.from || eq.id === node.to
        );

        return (
            <>
                <p><strong>Type:</strong> Line</p>
                <p><strong>Phase:</strong> {node.phase || '-'}</p>
                <p><strong>Description:</strong> {node.description || '-'}</p>
                <p><strong>Stream ID:</strong> {node.streamId || '-'}</p>

                {matchedStream && (
                    <>
                        <hr />
                        <p><strong>Stream Info</strong></p>
                        <ul className={inlineList}>
                            <li onClick={() => onFocus(matchedStream)} className={itemClass}>
                                {coloredId(matchedStream.id, 'stream')} ({matchedStream.streamType})
                            </li>
                        </ul>
                    </>
                )}

                {connectedEquipments.length > 0 && (
                    <>
                        <hr />
                        <p><strong>Connected Equipments</strong></p>
                        <ul className={inlineList}>
                            {connectedEquipments.map(eq => (
                                <li key={eq.id} onClick={() => onFocus(eq)} className={itemClass}>
                                    {coloredId(eq.id, 'equipment')} ({eq.modelType})<br />
                                    <span className={descClass}>{eq.description || '-'}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {connectedTags.length > 0 && (
                    <>
                        <hr />
                        <p><strong>Connected Tags</strong></p>
                        <ul className={inlineList}>
                            {connectedTags.map(tag => (
                                <li key={tag.id} onClick={() => onFocus(tag)} className={itemClass}>
                                    {coloredId(tag.id, 'tag')} ({tag.tagType})<br />
                                    <span className={descClass}>Value: {tag.value}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </>
        );
    }

    if (node.type === 'tag') {
        const tag = tagNodes.find(t => t.id === node.id);
        const connectedLine = lineNodes.find(line => line.id === tag?.lineId);

        return (
            <>
                <p><strong>Type:</strong> {tag?.tagType}</p>
                <p><strong>Value:</strong> {tag?.value}</p>
                <p><strong>Connected Line:</strong> {tag?.lineId}</p>

                {connectedLine && (
                    <>
                        <hr />
                        <p><strong>Line Info</strong></p>
                        <ul className={inlineList}>
                            <li onClick={() => onFocus(connectedLine)} className={itemClass}>
                                {coloredId(connectedLine.id, 'line')} ({connectedLine.phase || '-'})<br />
                                <span className={descClass}>{connectedLine.description || '-'}</span>
                            </li>
                        </ul>
                    </>
                )}
            </>
        );
    }

    return null;
};

export default NodeDetail;
