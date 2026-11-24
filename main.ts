// The Houseplant Out-of-Office — one line, at most 120 characters.
// The joke is told entirely in the plant's own voice: it has not been
// watered since March, it treats the inbox as compost, and it answers
// like an auto-reply that has given up on being watered at all. The
// compost line is the punch: the plant does not file emails, it eats them.
import { mkdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const REPLY =
  'Out of office until someone waters me. Last drink: March. Your email has been filed under compost.';

async function main(): Promise<void> {
  const chars = [...REPLY];
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`reply must be 1-120 characters, got ${chars.length}`);
  }
  const lines = REPLY.split('\n');
  if (lines.length !== 1) throw new Error('reply must be a single line');
  if (REPLY.trim() !== REPLY) throw new Error('reply must not be padded');
  if (!/out of office/i.test(REPLY)) throw new Error('reply must read as an out-of-office message');
  if (!/water/i.test(REPLY)) throw new Error('reply must mention water — a houseplant lives on it');

  const dir = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/entry.txt`, REPLY, { encoding: 'utf8', mode: constants.S_IRUSR | constants.S_IWUSR | constants.S_IRGRP | constants.S_IROTH });
}

await main();
