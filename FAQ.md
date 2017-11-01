# FAQ for car-buying app development

## What to select from prompts after running `$ignite-generate-app`?

After inputting your `Application Name`, you can just press enter to use the default answer that we've set up for you for each of the question.

If you would like to fill it out by yourself here is a sample for the prompting questions. Please choose `HapiJS` as your server framework for this app.

```
  _-----_     ╭──────────────────────────╮
 |       |    │      Welcome to the      │
 |--(o)--|    │ phenomenal Electrode App │
`---------´   │        generator!        │
 ( _´U`_ )    ╰──────────────────────────╯
 /___A___\   /
  |  ~  |     
__'.___.'__   
´   `  |° ´ Y `

? Application Name: electrode-app
? Description: an app for buying a car
? Project homepage url: https://github.com/electrode-io/car-buying
? Which framework for the server? HapiJS
? Author's Name: Sheng Di
? Author's Email: SDi@walmartlabs.com
? Author's Homepage: https://github.com/didi0613
? Package keywords (comma to split): electrode,car-buying
? Would you like to make a Progressive Web App? No
? Support disabling server side rendering based on high load? No
? Use double quotes or single quotes? "
? Would you like to create a new directory for your project? Yes
? Would you like to yarn install packages? No
? GitHub username or organization: didi0613
? Which license do you want to use? Apache 2.0
```

## Why does the app server not start on running `clap dev` ?

If you seen issues similar to

```
m-C02SL0GSG8WM:~ s0d00px$ clap dev
Cannot find the module xclap at CWD /Users/s0d00px
Please install it with 'npm install xclap'
```

or

```
npm ERR! code E401
npm ERR! 401 Unauthorized: electrode-archetype-react-app@^4.0.0

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/s0d00px/.npm/_logs/2017-10-31T00_00_48_129Z-debug.log
```

The above error is caused by `npm/lifecycle` module with npm@5.4.x which leads to an incorrect npm installation.
Please verify your npm version. If you are under npm@5.4.x, please either downgrade to npm@5.3.x or a more stable version npm@5.5.x.

## What debugging tools can we use when developing the car-buying app?

You can use Electrode [webpack-reporter](https://github.com/electrode-io/electrode/tree/master/packages/electrode-webpack-reporter). Electrode Webpack Reporter is an HTML based reporter for webpack-dev-server. While you are developing, you may see some error messages in your terminal saying:

```
webpack bundle is now VALID but has ERRORS

webpack report is served from http://localhost:2992/reporter
 > isomorphic-loader extend require: webpack dev server mode - waiting for config to become valid.
 > isomorphic-loader extend require: file watcher config is now invalid
```

You can switch to your browser, and open a new tab `http://localhost:2992/reporter`. You shall see the detailed information of the issue under the `Error` section. Electrode webpack reporter can also track the sizes of the assets and bundles. It also has a legacy view similar to your terminal. For more detailed information, please check [here](https://github.com/electrode-io/electrode/tree/master/packages/electrode-webpack-reporter).
