/** @jsx h */
import Layout from '../components/Layout.tsx';
import { tw } from 'twind';
import { h } from 'preact';

export default () => {
  const repos = {
      Core: true,
      Extra: true,
      Community: true,
      Multilib: true,
      AUR: true
    },
    arches = { any: true, i686: false, x86_64: true };

  return (
    <Layout noLogo={true} class={tw`h-full flex flex-col justify-center items-center gap-8`}>
      <div class={tw`space-y-2 text-center`}>
        <h1 class={tw`text-6xl font-bold`}>
          <span class={tw`text-primary`}>Arch</span>Explorer
        </h1>
        <p class={tw`text-xl`}>Search Arch Linux packages</p>
      </div>
      <form action="" class={tw`space-y-4 max-w-xl w-full`}>
        <div class={tw`flex gap-4 w-full`}>
          <input
            class={tw`w-full border border-primary rounded-lg outline-none ring-primary focus:ring-2 p-2 shadow transition-shadow`}
            type="text"
            name="q"
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
          <div class={tw`grid gap-4`}>
            <div>
              <p class={tw`flex gap-1`}>Repository filter:</p>
              <div class={tw`flex gap-4 flex-wrap`}>
                {Object.entries(repos).map(([name, isEnabled]) => (
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
                {Object.entries(arches).map(([name, isEnabled]) => (
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
    </Layout>
  );
};
