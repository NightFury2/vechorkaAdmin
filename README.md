# Admin panel for Vechorka site

[![Demo on Heroku](https://img.shields.io/badge/demo-heroku-brightgreen.svg?style=flat-square)](https://react-redux.herokuapp.com)

---

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development.

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the 
[Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

If you want to disable the dev tools during development, set `__DEVTOOLS__` to `false` in `/webpack/dev.config.js`.  
DevTools are not enabled during production.

## Building and Running Production Server

```bash
npm run build
npm run start
```

## Demo

A demonstration of this app can be seen [running on heroku](https://react-redux.herokuapp.com), which is a deployment of the [heroku branch](https://github.com/erikras/react-redux-universal-hot-example/tree/heroku).

## Deployment on Heroku

To get this project to work on Heroku, you need to:

1. Remove the `"PORT": 8080` line from the `betterScripts` / `start-prod` section of `package.json`.
2. `heroku config:set NODE_ENV=production`
3. `heroku config:set NODE_PATH=./src`
4. `heroku config:set NPM_CONFIG_PRODUCTION=false`
  * This is to enable webpack to run the build on deploy.

The first deploy might take a while, but after that your `node_modules` dir should be cached.

## FAQ

This project moves fast and has an active community, so if you have a question that is not answered below please visit our [Discord channel](https://discord.gg/0ZcbPKXt5bZZb1Ko) or file an issue.


## Roadmap 

Although this isn't a library, we recently started versioning to make it easier to track breaking changes and emerging best practices. 

* [Inline Styles](docs/InlineStyles.md) - CSS is dead

## Contributing

I am more than happy to accept external contributions to the project in the form of feedback, bug reports and even better - pull requests :) 

If you would like to submit a pull request, please make an effort to follow the guide in [CONTRIBUTING.md](CONTRIBUTING.md). 
 
---
Thanks for checking this out.

– Erik Rasmussen, [@erikras](https://twitter.com/erikras)
