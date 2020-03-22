import { asyncOra } from '@electron-forge/async-ora';
import { ForgePlatform, ForgeArch } from '@electron-forge/shared-types';
import { exec } from 'child_process';

// import rebuild from 'electron-rebuild';
// import { RebuildOptions } from 'electron-rebuild/lib/src/rebuild';

export default async (
  buildPath: string,
  electronVersion: string,
  platform: ForgePlatform,
  arch: ForgeArch,
) => {
  await asyncOra('Preparing native dependencies', () => new Promise((resolve, reject) => {
    const buildString = `npm rebuild --runtime=electron --target=${electronVersion} --arch=${arch} --rebuild --disturl=https://atom.io/download/electron --build_from_source=true`;
    return exec(buildString, (error, stdout, stderr) => {
      if (error) return reject(new Error(`Erro no rebuild: ${error}: ${stderr}`));
      return resolve(stdout);
    });
  }));
};
