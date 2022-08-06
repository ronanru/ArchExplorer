/** @jsx h */
import { AURPackage, Package, Either } from '../types.ts';
import Layout from '../components/Layout.tsx';
import { tw } from 'twind';
import { h } from 'preact';

export default ({
  results,
  searchParams
}: {
  results: Either<Package, AURPackage>[];
  searchParams: URLSearchParams;
}) => {
  const searchRepos = searchParams.getAll('repo'),
    repos: [string, boolean][] = ['Core', 'Extra', 'Community', 'Multilib', 'AUR'].map(repo => [
      repo,
      searchRepos.includes(repo)
    ]),
    searchArches = searchParams.getAll('arch'),
    arches: [string, boolean][] = ['any', 'i686', 'x86_64'].map(arch => [
      arch,
      searchArches.includes(arch)
    ]);

  return (
    <Layout noLogo={false}>
      <form action="/" method="GET" class={tw`space-y-4 mb-6`}>
        <div class={tw`flex gap-4 w-full`}>
          <input
            class={tw`w-full border border-primary rounded-lg outline-none ring-primary focus:ring-2 p-2 shadow transition-shadow`}
            type="text"
            name="q"
            value={searchParams.get('q') as string}
            id="search"
          />
          <button
            class={tw`flex items-center justify-center bg-primary text-white px-2 py-1 rounded-lg flex gap-2 shadow transition-shadow hover:shadow-lg focus:outline-none ring-primary focus:ring-2`}>
            <svg
              class={tw`h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>
        <details class={tw`bg-white p-4 rounded-xl shadow space-y-2 w-full`}>
          <summary class={tw`flex gap-1 items-center cursor-pointer`}>
            <svg class={tw`h-5 w-5`} viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd"
              />
            </svg>{' '}
            Filters
          </summary>
          <div class={tw`grid lg:grid-cols-2 gap-4`}>
            <div>
              <p class={tw`flex gap-1`}>Repository filter:</p>
              <div class={tw`flex gap-4 flex-wrap`}>
                {repos.map(([name, isEnabled]) => (
                  <div class={tw`flex gap-1`}>
                    <input type="checkbox" name="repo" value={name} id={name} checked={isEnabled} />
                    <label for={name}>{name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p class={tw`flex gap-1`}>Architecture filter:</p>
              <div class={tw`flex gap-4 flex-wrap`}>
                {arches.map(([name, isEnabled]) => (
                  <div class={tw`flex gap-1`}>
                    <input type="checkbox" name="arch" value={name} id={name} checked={isEnabled} />
                    <label for={name}>{name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </details>
      </form>
      <div class={tw`grid gap-4`}>
        {results.map(pkg => (
          <a
            href={`${pkg.repo ? '' : `/aur`}/${pkg.pkgname || pkg.Name}`}
            class={tw`p-4 bg-white shadow rounded-xl flex gap-4 items-center`}>
            <img
              src={`/icon/${pkg.pkgname || pkg.Name}`}
              alt=""
              loading="lazy"
              width="64"
              height="64"
              class={tw`w-16  h-16`}
            />
            <div>
              <p>
                <span
                  class={tw`${
                    {
                      core: 'text-purple-600',
                      extra: 'text-blue-600',
                      community: 'text-red-600',
                      multilib: 'text-green-600',
                      aur: 'text-primary'
                    }[pkg.repo || 'aur']
                  }`}>
                  {pkg.repo || 'aur'}
                </span>{' '}
                / {pkg.pkgname || pkg.Name} v{pkg.pkgver || pkg.Version}{' '}
                {(pkg.OutOfDate || pkg.flag_date) && (
                  <span class={tw`text-red-600`}>[Out of date]</span>
                )}
              </p>
              <p>{pkg.pkgdesc || pkg.Description}</p>
            </div>
          </a>
        ))}
      </div>
    </Layout>
  );
};
