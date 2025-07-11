import { NodeLegend } from './NodeLegend';
// import { ViewSelector } from './ViewSelector';
import styles from '@/styles/contextProcess.module.css';

interface ControlPanelProps {
    filters: Record<string, boolean>;
    onToggle: (type: string) => void;
    viewMode: 'default' | 'layered';
    onChangeViewMode: (mode: 'default' | 'layered') => void;
}

export const ControlPanel = ({
                                 filters,
                                 onToggle,
                                 // viewMode,
                                 // onChangeViewMode
                             }: ControlPanelProps) => {
    return (
        <div className={styles.controlPanel}>
            {/*<ViewSelector viewMode={viewMode} onChange={onChangeViewMode} />*/}
            <NodeLegend filters={filters} onToggle={onToggle} />
        </div>
    );
};
