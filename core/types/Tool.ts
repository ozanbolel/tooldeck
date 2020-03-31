export type TTool = {
  id: string;
  label: string;
  shortDesc: string;
  desc?: string;
  cat: string;
  subCat: string;
  url: string;
  iconUrl: string;
  coverUrl?: string;
  external: boolean;
  users: number;
  stars: number;
};
