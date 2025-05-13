# 🤝 Social Link Normalizer

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/packageName?color=yellow)](https://npmjs.com/package/packageName)
[![npm downloads](https://img.shields.io/npm/dm/packageName?color=yellow)](https://npm.chart.dev/packageName)

<!-- /automd -->

A package to normalize a wide range of social links, including:  Twitter, X, Instagram, Facebook, YouTube, Tiktok, Reddit.
This package aims to find invalid links or malformed links and return a valid link in a standard format, excluding any tracking parameters, uncessary query parameters, or other metadata.

## Usage

Install the package:

```sh
# ✨ Auto-detect (supports npm, yarn, pnpm, deno and bun)
npx nypm install social-link-normalizer
```

Import:

<!-- automd:jsimport cdn name="pkg" -->

**ESM** (Node.js, Bun, Deno)

```js
import { normalize } from "social-link-normalizer";
```

**CDN** (Deno, Bun and Browsers)

```js
import { normalize } from "https://esm.sh/social-link-normalizer";
```

<!-- /automd -->

## Development

<details>

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/unjs/packageName/blob/main/LICENSE) license.
Made by [community](https://github.com/unjs/packageName/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/packageName/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/packageName" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
