import fs from 'node:fs';
const allowed = new Set(['IMPLEMENTED','CONNECTED','PARTIAL','SIMULATED','PLACEHOLDER','PLANNED','BLOCKED','UNSUPPORTED','DEPRECATED','REMOVED']);
const registry = JSON.parse(fs.readFileSync('data/whisperx-registry.json','utf8'));
for (const group of ['skills','library']) for (const item of registry[group] ?? []) if (!allowed.has(item.status)) throw new Error(`${group}:${item.id} has invalid status ${item.status}`);
for (const item of registry.imports ?? []) if (!allowed.has(item.status)) throw new Error(`imports:${item.source} has invalid status ${item.status}`);
console.log(`registry-ok skills=${registry.skills.length} library=${registry.library.length} imports=${registry.imports.length}`);
