import fs from 'node:fs';
const spec = fs.readFileSync('WHISPERX_FINAL_MASTER_LOCK_SPEC.md','utf8');
const css = fs.readFileSync('app/globals.css','utf8');
const design = JSON.parse(fs.readFileSync('global-tw4-master.v7.full-spec.json','utf8'));
for (const phrase of ['editorial','asymmetrical','signal-red','WHISPERX | STUDIO']) if (!spec.includes(phrase)) throw new Error(`missing lock phrase ${phrase}`);
for (const token of ['--font-display','--destructive','noise-overlay','text-stroke']) if (!css.includes(token)) throw new Error(`missing css token ${token}`);
if (design.meta?.locks?.preserveLegacy !== true) throw new Error('design spec lock preserveLegacy missing');
console.log(`design-lock-ok ${design.id} ${design.version}`);
