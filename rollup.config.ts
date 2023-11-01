import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import metablock from "rollup-plugin-userscript-metablock";
import pkgJson from "./package.json" assert { type: "json" };
import { defineConfig } from "rollup";

const userScriptMetaBlockConfig = {
  file: "./userscript.meta.json",
  override: {
    version: pkgJson.version,
    description: pkgJson.description,
    author: pkgJson.author,
  },
};

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        format: "iife",
        file: "dist/juejin-props-back.user.js",
        sourcemap: false,
        esModule: false,
        compact: true,
        generatedCode: "es2015",
        globals: {
          dayjs: "dayjs",
          dayjs_plugin_relativeTime: "dayjs_plugin_relativeTime",
        },
      },
    ],
    plugins: [
      nodeResolve(),
      swc(
        defineRollupSwcOption({
          jsc: {
            target: "es2020",
          },
        })
      ),
      metablock(userScriptMetaBlockConfig),
    ],
    external: [
      "typed-query-selector",
      "dayjs",
      "dayjs/plugin/relativeTime",
      "dayjs/locale/zh-cn",
    ],
  },
  {
    input: "src/dummy.js",
    output: [
      {
        file: "dist/juejin-props-back.meta.js",
      },
    ],
    plugins: [metablock(userScriptMetaBlockConfig)],
  },
]);
