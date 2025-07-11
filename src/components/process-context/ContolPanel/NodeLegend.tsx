import { colorMap } from '@/utils/colorMap.ts';
import styles from '../../../styles/contextProcess.module.css';

function getDescription(type: string): string {
    switch (type) {
        case 'pfd': return 'Process Flow Diagram';
        case 'equipment': return 'Real physical unit';
        case 'block': return 'Unit operation model';
        case 'line': return 'Physical connection in plant';
        case 'stream': return 'Modeled flow in simulation';
        case 'tag': return 'Sensor or value point';
        case 'datasheet': return 'Design specification or equipment details';
        default: return '';
    }
}

interface NodeLegendProps {
    filters: Record<string, boolean>;
    onToggle: (type: string) => void;
}

export const NodeLegend = ({ filters, onToggle }: NodeLegendProps) => (
    <div className={styles.legend}>
        <ul className={styles.inlineList}>
            {['pfd', 'equipment', 'block', 'line', 'stream', 'tag', 'datasheet'].map(type => (
                <li key={type}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input
                            type="checkbox"
                            checked={filters[type]}
                            onChange={() => onToggle(type)}
                        />
                        <span style={{ color: colorMap[type] || '#333' }}>
                            <strong>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                        </span>
                        – {getDescription(type)}
                    </label>
                </li>
            ))}
        </ul>
    </div>
);
