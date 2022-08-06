/** @jsx h */
import { formatStorage, formatTime } from '../../utils/formatters.ts';
import Layout from '../../components/Layout.tsx';
import { PageProps } from '$fresh/server.ts';
import { Handlers } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import { AURPackage } from '../../types.ts';
import { tw } from 'twind';
import { h } from 'preact';

export const handler: Handlers<AURPackage> = {
  async GET(_req, ctx) {
    const pkg = await fetch(`https://aur.archlinux.org/rpc/?v=5&type=info&arg=${ctx.params.name}`)
      .then(res => res.json())
      .then(json => json.results[0] as AURPackage);
    if (!pkg) return new Response(null, { status: 404 });
    return ctx.render(pkg);
  }
};

export default ({ data }: PageProps<AURPackage>) => (
  <Layout noLogo={false}>
    <Head>
      <script
        defer
        src={`data:text/javascript,document.getElementById('installButton').addEventListener('click',() => navigator.clipboard.writeText('paru -Sy ${data.Name}'))`}></script>
    </Head>
    <div class={tw`rounded-xl shadow p-4 bg-white`}>
      <div class={tw`flex items-center gap-4 mb-2`}>
        <img
          src={`/icon/${data.Name}`}
          alt=""
          loading="lazy"
          width="64"
          height="64"
          class={tw`w-16  h-16`}
        />
        <h1 class={tw`text-3xl font-bold`}>
          <span class={tw`text-primary`}>aur</span> / {data.Name}
        </h1>
        <div class={tw`flex-1`} />
        <button
          id="installButton"
          class={tw`hidden md:flex gap-2 items-center bg-gray-200 border border-primary p-2 shadow rounded-lg hover:shadow-lg outline-none ring-primary focus:ring-2 transition-shadow`}>
          <code>paru -Sy {data.Name}</code>
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
      <p>{data.Description}</p>
      <div class={tw`grid md:grid-cols-2  lg:grid-cols-3 gap-1 my-1`}>
        <p>
          <strong>Latest Version:</strong> {data.Version}
        </p>
        <p>
          <strong>Site:</strong>{' '}
          <a href={data.URL} class={tw`underline`} target="_blank" rel="noopener noreferrer">
            {data.URL}
          </a>
        </p>
        <p>
          <strong>Licenses:</strong> {data.License.join(', ')}
        </p>
        <p>
          <strong>Last Update:</strong> {formatTime(data.LastModified * 1000)}
        </p>
        <p>
          <strong>Votes:</strong> {data.NumVotes}
        </p>
        <p>
          <strong>Out of date:</strong>{' '}
          {data.OutOfDate ? `Yes, flagged ${formatTime(data.OutOfDate * 1000)}` : 'No'}
        </p>
      </div>
      <div>
        <strong>Dependencies ({data.Depends.length}):</strong>
        {data.Depends.map(dep => (
          <p class={tw`ml-4`}>
            <a href={`/${dep}`} class={tw`underline`}>
              {dep}
            </a>
          </p>
        ))}
      </div>
    </div>
  </Layout>
);
