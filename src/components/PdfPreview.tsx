// src/components/process-context/PdfPreview.tsx
import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import styles from '@/styles/pdfOverlay.module.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface Props {
    fileUrl: string;
    onClose?: () => void;
}

export default function PdfPreview({ fileUrl, onClose }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pageCount, setPageCount] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        const renderPage = async () => {
            const pdf = await pdfjsLib.getDocument(fileUrl).promise;
            setPageCount(pdf.numPages);
            const page = await pdf.getPage(pageNum);

            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = canvasRef.current;
            if (!canvas) return;

            const context = canvas.getContext('2d');
            if (!context) return;

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport }).promise;
        };

        renderPage();
    }, [fileUrl, pageNum]);

    return (
        <div className={styles.overlay}>
            <div className={styles.overlayBackdrop} onClick={onClose} />
            <div className={styles.overlayContent}>
                <canvas ref={canvasRef} className={styles.canvas} />
                <div className={styles.controls}>
                    <button onClick={() => setPageNum(p => Math.max(1, p - 1))} disabled={pageNum === 1}>◀ Prev</button>
                    <span>Page {pageNum} / {pageCount}</span>
                    <button onClick={() => setPageNum(p => Math.min(pageCount, p + 1))} disabled={pageNum === pageCount}>Next ▶</button>
                    {onClose && <button onClick={onClose} className={styles.closeBtn}>Close ✕</button>}
                </div>
            </div>
        </div>
    );
}
