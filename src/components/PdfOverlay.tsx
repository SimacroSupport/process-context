import styles from '@/styles/pdfOverlay.module.css';
import PdfPreview from './PdfPreview';

interface PdfOverlayProps {
    fileUrl: string;
    onClose: () => void;
}

export default function PdfOverlay({ fileUrl, onClose }: PdfOverlayProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.overlayBackdrop} onClick={onClose} />
            <div className={styles.overlayContent}>
                <PdfPreview fileUrl={fileUrl} onClose={onClose} />
                <button className={styles.closeButton} onClick={onClose}>✕</button>
            </div>
        </div>
    );
}