// src/hooks/usePdfSpriteCache.ts
import { useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import * as THREE from 'three';
import 'pdfjs-dist/build/pdf.worker.min.mjs';

// 명시적으로 타입 추가
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

/**
 * PDF를 Sprite로 변환하는 함수
 */
async function createSpriteFromPdf(pdfUrl: string): Promise<THREE.Sprite> {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    const base64 = canvas.toDataURL();
    const texture = new THREE.TextureLoader().load(base64);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
    sprite.scale.set(15, 20, 1);

    return sprite;
}

/**
 * PDF Sprite 생성 결과를 메모이제이션 캐시하는 훅
 */
export function usePdfSpriteCache() {
    const cacheRef = useRef<Record<string, Promise<THREE.Sprite>>>({});

    function getSprite(pdfUrl: string): Promise<THREE.Sprite> {
        if (!cacheRef.current[pdfUrl]) {
            cacheRef.current[pdfUrl] = createSpriteFromPdf(pdfUrl);
        }
        return cacheRef.current[pdfUrl];
    }

    return { getSprite };
}
