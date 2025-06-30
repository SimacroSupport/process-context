import styles from '../../styles/contextProcess.module.css';
import {colorMap} from "@/utils/colorMap.ts";
import NodeDetail from './NodeDetail';
import { type GraphNode } from '@/data/processData';

function getNodeTitle(type: string): string {
    const nameMap: Record<string, string> = {
        pfd: 'PFD Info',
        equipment: 'Equipment Info',
        block: 'Block Info',
        line: 'Line Info',
        stream: 'Stream Info',
        tag: 'Tag Info',
    };
    return nameMap[type] || 'Node Info';
}

interface Props {
    node: GraphNode;
    onClose: () => void;
    onFocus: (node: GraphNode) => void;
}

export default function NodeDetailPanel({ node, onClose, onFocus }: Props) {
    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <h3 style={{ margin: 0, color: colorMap[node.type] }}>{getNodeTitle(node.type)}</h3>
                <button onClick={onClose} className={styles.closeButton}>×</button>
            </div>
            <div className={styles.panelBody}>
                <p><strong>ID:</strong> {node.id}</p>
                <NodeDetail node={node} onFocus={onFocus} />
            </div>
        </div>
    );
}
