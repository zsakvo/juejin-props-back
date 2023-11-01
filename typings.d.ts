declare module "*.svg" {
  const content: any;
  export default content;
}

interface Window {
  __GLOBAL_RPOPS_MAPS__: Map<
    string,
    {
      ctime: string;
    }
  >;
  fetch: any;
}
