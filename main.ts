// The entry for make.fun's "Sum up 23 November's world news in one image"
// (competition news-image-20261123). Node 22, standard library only, no network.
//
// The picture is entry.png beside this file: a front page that names the day
// (Monday 23 November 2026) and carries six of its stories plus four more in a
// strip along the bottom. Nothing is fetched or generated here, so two runs of
// the program write the same bytes: it checks the shipped PNG and copies it to
// /output/entry.png, which is what the judge opens.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1024 * 1024;   // the gate takes a PNG of at most 1 MiB
const SIDE = 1024;               // ... and at most 1024 by 1024 pixels
const MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Refuse a file that is not a whole 1024x1024 PNG, rather than ship a broken entry. */
function assertEntryImage(buf: Buffer, name: string): void {
  if (buf.length > MAX_BYTES) {
    throw new Error(`${name}: ${buf.length} bytes is over the ${MAX_BYTES} byte limit`);
  }
  if (!buf.subarray(0, 8).equals(MAGIC)) {
    throw new Error(`${name}: not a PNG (bad signature)`);
  }
  // IHDR is always the first chunk: its length, type, width and height sit at 8..24.
  if (buf.subarray(12, 16).toString('latin1') !== 'IHDR') {
    throw new Error(`${name}: first chunk is not IHDR`);
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (width !== SIDE || height !== SIDE) {
    throw new Error(`${name}: ${width}x${height}, expected ${SIDE}x${SIDE}`);
  }
  // A PNG cut short still opens in some viewers as a grey band: insist on IEND.
  if (buf.subarray(-8, -4).toString('latin1') !== 'IEND') {
    throw new Error(`${name}: truncated (no IEND chunk at the end)`);
  }
}

const here = dirname(fileURLToPath(import.meta.url));
const image = readFileSync(join(here, 'entry.png'));
assertEntryImage(image, 'entry.png');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.png');
writeFileSync(target, image);
console.log(`wrote ${target}: ${image.length} bytes, ${SIDE}x${SIDE}`);
