/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from '$fresh/server.ts';
import { virtualSheet } from 'twind/sheets';
import { config, setup } from '@twind';
import manifest from './fresh.gen.ts';

const sheet = virtualSheet();

sheet.reset();
setup({ ...config, sheet });

await start(manifest, {
  render: (ctx: RenderContext, render: InnerRenderFunction) => {
    const snapshot = ctx.state.get('twind') as unknown[] | null;
    sheet.reset(snapshot || undefined);
    render();
    ctx.styles.splice(0, ctx.styles.length, ...sheet.target);
    const newSnapshot = sheet.reset();
    ctx.state.set('twind', newSnapshot);
  }
});
