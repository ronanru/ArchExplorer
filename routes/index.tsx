/** @jsx h */
import { AURPackage, Package } from '../types.ts';
import Results from '../components/Results.tsx';
import { PageProps } from '$fresh/server.ts';
import { Handlers } from '$fresh/server.ts';
import Index from '../components/Index.tsx';
import { h } from 'preact';

const allRepos = ['core', 'extra', 'community', 'multilib'];

export const handler: Handlers<(Package | AURPackage)[] | null> = {
  async GET(req, ctx) {
    const { searchParams } = new URL(req.url),
      repos = searchParams.getAll('repo'),
      q = searchParams.get('q');

    if (!q) return ctx.render(null);
    const data = await Promise.all([
      repos.filter(r => r !== 'AUR').length
        ? fetch(
            `https://www.archlinux.org/packages/search/json?q=${q}&${searchParams
              .getAll('arch')
              .map(arch => `arch=${arch}`)
              .join('&')}&${repos
              .filter(r => r !== 'AUR')
              .map(repo => `repo=${repo}`)
              .join('&')}`
          )
            .then(res => res.json())
            .then(json =>
              json.results.sort((a: Package, b: Package) =>
                allRepos.indexOf(a.repo) > allRepos.indexOf(b.repo) ? 1 : -1
              )
            )
        : Promise.resolve([]),
      repos.includes('AUR')
        ? fetch(`https://aur.archlinux.org/rpc/?v=5&type=search&arg=${q}`)
            .then(res => res.json())
            .then(json =>
              json.results.sort((a: AURPackage, b: AURPackage) =>
                a.Popularity > b.Popularity ? 1 : -1
              )
            )
        : Promise.resolve([])
    ]);
    return ctx.render(data.flat());
  }
};

export default (props: PageProps<(Package | AURPackage)[] | null>) =>
  props.data ? <Results results={props.data} searchParams={props.url.searchParams} /> : <Index />;
