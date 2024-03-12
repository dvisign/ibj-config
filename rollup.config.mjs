import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy"
import alias from "@rollup/plugin-alias"

const tsRollupcConfig = {
  input: "./typescript-config/index.ts", // 가정된 시작점
  output: {
    dir: "dist/typescript-config",
    format: "umd",
    name: "ibjTypescriptConfig",
    sourcemap: process.env.NODE_ENV === "production",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: "./tsconfig.json", outDir: "dist/typescript-config" }),
    copy({
      targets: [
        {
          src: "./src/base.json",
          dest: "dist",
        },
        {
          src: "./src/next-config.json",
          dest: "dist",
        },
        {
          src: "./src/react-library.json",
          dest: "dist",
        },
      ],
    }),
    alias({
      entries: [
        {
          find: "@dvisign/ibj-typescript-config/next-config",
          replacement: "./dist/next-config.json",
        },
      ],
    }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  external: ["path"],
}
const lintRollupConfig = {
  input: "eslint-config/index.ts", // 가정된 시작점
  output: {
    dir: "dist/eslint",
    format: "cjs",
    sourcemap: process.env.NODE_ENV === "production",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      outDir: "dist/eslint",
    }),
    copy({
      targets: [
        {
          src: "./src/library.js",
          dest: "dist/eslint/cjs",
        },
        {
          src: "./src/next-config.js",
          dest: "dist/eslint/cjs",
        },
      ],
    }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  external: ["path"],
}
// export default [tsRollupcConfig, lintRollupConfig]
export default {
  input: "index.ts", // 가정된 시작점
  output: [
    {
      dir: "dist",
      format: "cjs",
      name: "ibjConfig",
      sourcemap: process.env.NODE_ENV === "production",
    },
    {
      dir: "dist",
      format: "umd",
      name: "ibjConfig",
      sourcemap: process.env.NODE_ENV === "production",
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      outDir: "dist",
    }),
    copy({
      targets: [
        {
          src: "./eslint-config/library.js",
          dest: "dist/eslint-config/cjs",
        },
        {
          src: "./eslint-config/next-config.js",
          dest: "dist/eslint-config/cjs",
        },
        {
          src: "./typescript-config/base.json",
          dest: "dist",
        },
        {
          src: "./typescript-config/next-config.json",
          dest: "dist",
        },
        {
          src: "./typescript-config/react-library.json",
          dest: "dist",
        },
      ],
    }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  external: ["path"],
}
