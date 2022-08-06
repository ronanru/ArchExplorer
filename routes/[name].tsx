/** @jsx h */
import { formatStorage, formatTime } from '../utils/formatters.ts';
import Layout from '../components/Layout.tsx';
import { PageProps } from '$fresh/server.ts';
import { Handlers } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import { Package } from '../types.ts';
import { tw } from 'twind';
import { h } from 'preact';

export const handler: Handlers<Package> = {
  async GET(_req, ctx) {
    const pkg = await fetch(`https://archlinux.org/packages/search/json/?name=${ctx.params.name}`)
      .then(res => res.json())
      .then(json => json.results[0] as Package);
    if (!pkg) return new Response(null, { status: 404 });
    return ctx.render(pkg);
  }
};

export default ({ data }: PageProps<Package>) => (
  <Layout noLogo={false}>
    <Head>
      <script
        defer
        src={`data:text/javascript,document.getElementById('installButton').addEventListener('click',() => navigator.clipboard.writeText('sudo pacman -Sy ${data.pkgname}'))`}></script>
    </Head>
    <div class={tw`rounded-xl shadow p-4 bg-white`}>
      <div class={tw`flex items-center gap-4 mb-2`}>
        <img
          src={`/icon/${data.pkgname}`}
          alt=""
          loading="lazy"
          width="64"
          height="64"
          class={tw`w-16  h-16`}
        />
        <h1 class={tw`text-3xl font-bold`}>
          <span
            class={tw`${
              {
                core: 'text-purple-600',
                extra: 'text-blue-600',
                community: 'text-red-600',
                multilib: 'text-green-600'
              }[data.repo]
            }`}>
            {data.repo}
          </span>{' '}
          / {data.pkgname}
        </h1>
        <div class={tw`flex-1`} />
        <button
          id="installButton"
          class={tw`hidden md:flex gap-2 items-center bg-gray-200 border border-primary p-2 shadow rounded-lg hover:shadow-lg outline-none ring-primary focus:ring-2 transition-shadow`}>
          <code>sudo pacman -Sy {data.pkgname}</code>
          <svg
            class={tw`h-6 w-6`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
      <p>{data.pkgdesc}</p>
      <div class={tw`grid md:grid-cols-2  lg:grid-cols-3 gap-1 my-1`}>
        <p>
          <strong>Latest Version:</strong> {data.pkgver}
        </p>
        <p>
          <strong>Site:</strong>{' '}
          <a href={data.url} class={tw`underline`} target="_blank" rel="noopener noreferrer">
            {data.url}
          </a>
        </p>
        <p>
          <strong>Architecture:</strong> {data.arch}
        </p>
        <p>
          <strong>Licenses:</strong> {data.licenses.join(', ')}
        </p>
        <p>
          <strong>Download Size:</strong> {formatStorage(data.compressed_size)}
        </p>
        <p>
          <strong>Install Size:</strong> {formatStorage(data.installed_size)}
        </p>
        <p>
          <strong>Last Update:</strong> {formatTime(data.last_update)}
        </p>
        <p>
          <strong>Out of date:</strong>{' '}
          {data.flag_date ? `Yes, flagged ${formatTime(data.flag_date)}` : 'No'}
        </p>
      </div>
      <div>
        <strong>Dependencies ({data.depends.length}):</strong>
        {data.depends.map(dep => (
          <p class={tw`ml-4`}>
            <a href={`/${dep}`} class={tw`underline`}>
              {dep}
            </a>
          </p>
        ))}
        {data.optdepends.map(dep => {
          const [name, desc] = dep.split(': ');
          return (
            <p class={tw`ml-4`}>
              <a href={`/${name}`} class={tw`underline`}>
                {name}
              </a>{' '}
              (optional) {desc ? ` - ${desc}` : ''}
            </p>
          );
        })}
      </div>
    </div>
  </Layout>
);
