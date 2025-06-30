// import { buildGraphLinks } from '../buildGraphLinks';
// import type {
//     GraphNode,
//     GraphLink,
//     PfdNode,
//     EquipmentNode,
//     LineNode,
//     StreamNode,
//     BlockNode,
//     TagNode,
// } from '../../data/processData';
//
// describe('buildGraphLinks', () => {
//     const graphNodes: GraphNode[] = [
//         { id: 'pfd1', type: 'pfd' },
//         { id: 'eq1', type: 'equipment' },
//         { id: 'line1', type: 'line' },
//         { id: 'stream1', type: 'stream' },
//         { id: 'block1', type: 'block' },
//         { id: 'tag1', type: 'tag' }
//     ];
//
//     const pfdNodes: PfdNode[] = [
//         {
//             id: 'pfd1',
//             type: 'pfd',
//             connections: [
//                 {
//                     equipmentId: 'eq1',
//                     inletStreams: ['line1'],
//                     outletStreams: [],
//                 },
//             ],
//         },
//     ];
//
//     const equipmentNodes: EquipmentNode[] = [
//         {
//             id: 'eq1',
//             type: 'equipment',
//             pfd: 'pfd1',
//             blocks: ['block1'],
//         },
//     ];
//
//     const lineNodes: LineNode[] = [
//         {
//             id: 'line1',
//             type: 'line',
//             streamId: 'stream1',
//             from: 'eq1',
//             to: 'block1',
//         },
//     ];
//
//     const streamNodes: StreamNode[] = [
//         {
//             id: 'stream1',
//             type: 'stream',
//         },
//     ];
//
//     const blockNodes: BlockNode[] = [
//         {
//             id: 'block1',
//             type: 'block',
//             inletIds: ['stream1'],
//             outletIds: [],
//         },
//     ];
//
//     const tagNodes: TagNode[] = [
//         {
//             id: 'tag1',
//             type: 'tag',
//             lineId: 'line1',
//             tagType: 'temp',
//             value: 100,
//         },
//     ];
//
//     it('should generate correct graph links for basic PFD setup', () => {
//         const result: GraphLink[] = buildGraphLinks(
//             graphNodes,
//             pfdNodes,
//             equipmentNodes,
//             lineNodes,
//             streamNodes,
//             blockNodes,
//             tagNodes
//         );
//
//         const ids = result.map(link => `${link.source}→${link.target}`);
//
//         expect(ids).toContain('pfd1→eq1');         // PFD to Equipment
//         expect(ids).toContain('line1→eq1');        // Inlet Line to Equipment
//         expect(ids).toContain('line1→stream1');    // Line to Stream
//         expect(ids).toContain('eq1→block1');       // Equipment to Block
//         expect(ids).toContain('stream1→block1');   // Stream to Block
//         expect(ids).toContain('tag1→line1');       // Tag to Line
//
//         // 전체 갯수 체크 (추가로 확인)
//         expect(result.length).toBe(6);
//     });
//
//     it('should return empty array if no valid nodes', () => {
//         const result = buildGraphLinks([], [], [], [], [], [], []);
//         expect(result).toEqual([]);
//     });
// });
