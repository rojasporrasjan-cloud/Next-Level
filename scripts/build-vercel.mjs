import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const result = spawnSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_LEVEL_STATIC_EXPORT: '1' },
});
if (result.error) throw result.error;
if (result.status === 0 && !existsSync('dist/client/index.html')) {
  throw new Error('Static export did not produce dist/client/index.html');
}
process.exit(result.status ?? 1);
