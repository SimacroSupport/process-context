import styles from '@/styles/contextProcess.module.css';

type ViewMode = "default" | "layered";

interface Props {
    viewMode: ViewMode;
    onChange: (mode: ViewMode) => void;
}

export const ViewSelector = ({ viewMode, onChange }: Props) => {
    const modes: ViewMode[] = ["default", "layered"];

    return (
        <div className={styles.viewSelector}>
            {
                modes.map((mode) => (
                    <label key={mode}>
                        <input
                            type="radio"
                            name="viewMode"
                            value={mode}
                            checked={viewMode === mode}
                            onChange={() => onChange(mode)}
                        />
                        {mode}
                    </label>
                ))
            }
        </div>
)
    ;
};