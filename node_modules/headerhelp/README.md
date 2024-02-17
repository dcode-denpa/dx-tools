## HeaderHelp
```
> Beautiful header
```

<div align="center">
  <br />
  <p>
    <img src="https://media.discordapp.net/attachments/1095383942565220524/1105617792864092170/image.png" alt="HeaderHelp" />
  </p>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/headerhelp"><img src="https://img.shields.io/npm/v/headerhelp" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/headerhelp"><img src="https://img.shields.io/npm/dt/headerhelp" alt="npm downloads" /></a>
  </p>
</div>

## About

<strong>HeaderHelp is a [Node.js](https://nodejs.org) module to make good header.</strong>

### <strong>[Example](https://github.com/Lykiooo/HeaderHelp/tree/main/example)</strong>

### <strong>[Import Version](https://github.com/Lykiooo/HeaderHelp_Import)</strong>
## Installation

```sh-session
npm install headerhelp
```

## How to use
```js
const Header = require('headerhelp');
var header = new Header({
    bannerTitle: string,
	  bannerStyle: string,
    bannerColor: string[],
    littleTitle: boolean,
    clear: boolean
}, {
    separator: string,
    name: string,
    info: string[]
});

console.log(header);
```
- Use ``setArgs(...args)``
```js
const Header = require('headerhelp');
var header = new Header({
    bannerTitle: string,
	  bannerStyle: string,
    bannerColor: string[],
    littleTitle: boolean,
    clear: boolean
});

header.setArgs({
    separator: string,
    name: string,
    info: string[]
});

console.log(header);
```

## Credits
[Gradient-string](https://www.npmjs.com/package/gradient-string)
[Figlet](https://www.npmjs.com/package/figlet)

# Made With <img src="https://cdn3.emoji.gg/emojis/7835-sakuramikohappy.gif" alt="." width="30" height="30"/>
