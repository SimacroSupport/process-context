import {colorMap} from "@/utils/colorMap.ts";
import styles from '../../styles/contextProcess.module.css';



function getDescription(type: string): string {
    switch (type) {
        case 'pfd': return 'Process Flow Diagram';
        case 'equipment': return 'Real physical unit';
        case 'block': return 'Unit operation model';
        case 'line': return 'Physical connection in plant';
        case 'stream': return 'Modeled flow in simulation';
        case 'tag': return 'Sensor or value point';
        default: return '';
    }
}

export const NodeLegend = () => (
    <div className={styles.legend}>
        <ul className={styles.inlineList}>
            {['pfd', 'equipment', 'block', 'line', 'stream', 'tag'].map(type => (
                <li key={type}>
          <span style={{ color: colorMap[type] || '#333' }}>
            <strong>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
          </span>{' '}
                    – {getDescription(type)}
                </li>
            ))}
        </ul>
    </div>
);
