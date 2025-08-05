import {useState} from "react";
import type { GraphNode, BaseNode } from '@/types/processTypes.ts';
import { graphNodes } from '@/data/processData.ts';
import {colorMap} from "@/utils/colorMap.ts";
import styles from '../../../styles/contextProcess.module.css';
import PdfOverlay from "@/components/PdfOverlay.tsx";

interface Props {
    node: GraphNode;
    onFocus: (node: GraphNode) => void;
}


const NodeDetail = ({ node, onFocus }: Props) => {
    const inlineList = styles.inlineList;
    const itemClass = styles.listItem;
    const descClass = styles.smallDesc;
    const [showOverlay, setShowOverlay] = useState(false);

    const coloredId = (id: string, type: string) => (
        <strong style={{ color: colorMap[type] || '#333' }}>{id}</strong>
    );

    const linked = node?.linked ?? {};

    const pfdNodes = graphNodes.filter(n => n.type === 'pfd');
    const equipmentNodes = graphNodes.filter(n => n.type === 'equipment');
    const blockNodes = graphNodes.filter(n => n.type === 'block');
    const lineNodes = graphNodes.filter(n => n.type === 'line');
    const streamNodes = graphNodes.filter(n => n.type === 'stream');
    const tagNodes = graphNodes.filter(n => n.type === 'tag');
    const datasheetNodes = graphNodes.filter(n => n.type === 'datasheet');

    const nodeTypeMap: Record<string, { type: string; source: BaseNode[] }> = {
        stream: { type: 'stream', source: streamNodes },
        equipment: { type: 'equipment', source: equipmentNodes },
        block: { type: 'block', source: blockNodes },
        line: { type: 'line', source: lineNodes },
        tag: { type: 'tag', source: tagNodes },
        datasheet: { type: 'datasheet', source: datasheetNodes },
        pfd: { type: 'pfd', source: pfdNodes },
    };

    const formatKeyName = (key: string) => {
        const map: Record<string, string> = {
            inletStreams: 'Inlet Streams',
            outletStreams: 'Outlet Streams',
            equipment: 'Connected Equipments',
            hotStreamIn: 'Hot Stream In',
            hotStreamOut: 'Hot Stream Out',
            coldStreamIn: 'Cold Stream In',
            coldStreamOut: 'Cold Stream Out',
        };
        return map[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    const renderLinkedItems = (
        key: string,
        value: string | string[],
        nodeType: string,
        sourceNodes: BaseNode[],
    ) => {
        const idList = Array.isArray(value) ? value : [value];
        const matchedNodes = sourceNodes.filter(n => idList.includes(n.id));
        if (matchedNodes.length === 0) return null;

        return (
            <>
                <hr />
                <p><strong>{formatKeyName(key)}</strong></p>
                <ul className={inlineList}>
                    {matchedNodes.map(n => (
                        <li key={n.id} onClick={() => onFocus(n as GraphNode)} className={itemClass}>
                            {coloredId(n.id, nodeType)}{' '}
                            {'modelType' in n && `(${(n as any).modelType || '-'})`}<br />
                            <span className={descClass}>
                                {(n as any).description || (n as any).filename || '-'}
                            </span>
                        </li>
                    ))}
                </ul>
            </>
        );
    };

    if (node.type === 'pfd' && 'equipments' in linked) {
        return (
            <>
                <p><strong>Equipments:</strong></p>
                <ul className={inlineList}>
                    {(linked.equipments as string[]).map(equipmentId => {
                        const eq = equipmentNodes.find(e => e.id === equipmentId);
                        return (
                            <li key={equipmentId} onClick={() => eq && onFocus(eq)} className={itemClass}>
                                {coloredId(equipmentId, 'equipment')} ({eq?.modelType || '-'})<br />
                                <span className={descClass}>{eq?.description || '-'}</span>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }

    if (
        node.type === 'equipment' ||
        node.type === 'block' ||
        node.type === 'stream' ||
        node.type === 'line' ||
        node.type === 'tag'
    ) {
        const renderBasicInfo = () => {
            switch (node.type) {
                case 'equipment': {
                    const connectedPfd =
                        'pfd' in linked && linked.pfd
                            ? pfdNodes.find(p => p.id === linked.pfd)
                            : undefined;

                    return (
                        <>
                            <p><strong>Model Type:</strong> {node.modelType || '-'}</p>
                            <p><strong>Description:</strong> {node.description || '-'}</p>
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
                        </>
                    );
                }

                case 'block':
                    return (
                        <>
                            <p><strong>Block Type:</strong> {node.blockType || '-'}</p>
                            <p><strong>Description:</strong> {node.description || '-'}</p>
                        </>
                    );

                case 'stream':
                    return (
                        <>
                            <p><strong>Type:</strong> Stream</p>
                            <p><strong>Stream Type:</strong> {node.streamType}</p>
                        </>
                    );

                case 'line':
                    return (
                        <>
                            <p><strong>Type:</strong> Line</p>
                            <p><strong>Phase:</strong> {node.phase || '-'}</p>
                            <p><strong>Description:</strong> {node.description || '-'}</p>
                        </>
                    );

                case 'tag':
                    return (
                        <>
                            <p><strong>Type:</strong> {node.tagType}</p>
                        </>
                    );

                default:
                    return null;
            }
        };

        return (
            <>
                {renderBasicInfo()}

                {Object.entries(linked).map(([key, value]) => {
                    if (!value || key === 'pfd') return null;
                    const match = Object.keys(nodeTypeMap).find(type =>
                        key.toLowerCase().includes(type)
                    );
                    if (!match) return null;
                    const { type, source } = nodeTypeMap[match];
                    return renderLinkedItems(key, value, type, source);
                })}
            </>
        );
    }


    if (node.type === 'datasheet') {
        const connectedEquipment = 'equipment' in linked && linked.equipment ? equipmentNodes.find(eq => eq.id === linked.equipment) : undefined;

        return (
            <>
                <p><strong>Datasheet PDF</strong></p>
                <p><strong>Filename:</strong> {node.filename}.{node.extension}</p>

                <button onClick={() => setShowOverlay(true)} className={styles.listItem}>
                    Open PDF Preview
                </button>

                {showOverlay && (
                    <PdfOverlay
                        fileUrl={`/datasheets/${node.filename}.pdf`}
                        onClose={() => setShowOverlay(false)}
                    />
                )}

                {connectedEquipment && (
                    <>
                        <hr />
                        <p><strong>Connected Equipment</strong></p>
                        <ul className={inlineList}>
                            <li onClick={() => onFocus(connectedEquipment)} className={itemClass}>
                                {coloredId(connectedEquipment.id, 'equipment')} ({connectedEquipment.modelType})<br />
                                <span className={descClass}>{connectedEquipment.description || '-'}</span>
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
