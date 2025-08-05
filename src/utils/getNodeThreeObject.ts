import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import type { GraphNode } from '@/types/processTypes';
import { colorMap } from './colorMap';
import { imageMap } from '@/data/processData';

export function getNodeThreeObject(
    node: GraphNode,
    spriteCache: Map<string, THREE.Sprite>,
    getSprite: (url: string) => Promise<THREE.Sprite>
): THREE.Object3D {
    if (node.type === 'pfd') {
        const texture = new THREE.TextureLoader().load(imageMap[node.id]);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(40, 25, 1);
        sprite.position.set(0, -30, 0);
        return sprite;
    }

    if (node.type === 'datasheet') {
        if (spriteCache.has(node.id)) return spriteCache.get(node.id)!;

        const placeholder = new THREE.Object3D();
        getSprite(`/datasheets/${node.filename}.pdf`).then(sprite => {
            spriteCache.set(node.id, sprite);
            placeholder.add(sprite);
        });
        return placeholder;
    }

    const sprite = new SpriteText(node.id);
    sprite.textHeight = 8;
    sprite.color = colorMap[node.type] || '#999999';
    return sprite;
}
