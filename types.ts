export interface AURPackage {
  Description: string;
  FirstSubmitted: number;
  ID: number;
  LastModified: number;
  Maintainer: string;
  Name: string;
  NumVotes: number;
  OutOfDate?: number;
  PackageBase: string;
  PackageBaseID: number;
  Popularity: number;
  URL: string;
  URLPath: string;
  Version: string;
  License: string[];
  Depends: string[];
}

export interface Package {
  pkgname: string;
  pkgbase: string;
  repo: string;
  arch: string;
  pkgver: string;
  pkgrel: string;
  epoch: number;
  pkgdesc: string;
  url: string;
  filename: string;
  compressed_size: number;
  installed_size: number;
  build_date: string;
  last_update: string;
  flag_date?: string;
  maintainers: string[];
  packager: string;
  groups: string[];
  licenses: string[];
  conflicts: string[];
  provides: string[];
  replaces: string[];
  depends: string[];
  optdepends: string[];
  makedepends: string[];
  checkdepends: string[];
}

type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;
