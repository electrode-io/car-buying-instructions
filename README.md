# Welcome to WalmartLabs Women Who Code Electrode Workshop

We are here to build a Car-Buying Experience Application using the OpenSource Electrode platform developed by WalmartLabs.

## Setup

-   For development on your local machine, please install latest [node.js](https://nodejs.org/en/). (Recommended >=6)

-   Use [electrode-ignite](https://docs.electrode.io/chapter1/quick-start/start-with-ignite.html) to start your development environment with the Electrode platform.

```bash
npm install -g electrode-ignite
```

-   Run the electrode environment checker to ensure your environment is using compatible versions.

```bash
ignite check-nodejs
```

![alt text][check-nodejs]

## Getting Started

Let's get started.  For the duration of this workshop, we will be creating files and directories under a single working folder `walmartlabs-wwc`

-   First create the working folder:

```bash
mkdir walmartlabs-wwc
cd walmartlabs-wwc
```

When the instructions refers to "go back to the working folder", this will be the folder it refers to.

-   Let's get started by generating an Electrode app using Ignite:

```bash
ignite generate-app
```

-   You will be prompted for information about your app.

    -   The only information you need to enter is the app name.  Enter `car-buying` for that.
    -   You can press `<Enter>` to use the defaults for the rest of the prompts.
    -   Please use `HapiJS` as your server framework for this app.

![alt text][generator-prompts]

-   Try running the app:

```bash
cd car-buying
clap dev
```

-   You can see your app running on <http://localhost:3000/>.

![alt text][initial-app]

-   Congratulations on creating your first Electrode application!

## Installing the Mock Server

The mock server is a simple NodeJS Hapi server that simulates services needed in the car-buying app. It also serves images that are used by the app.

-   First go back to your `walmartlabs-wwc` folder.
-   Clone the server from [here](https://github.com/electrode-io/car-buying-service).

```bash
git clone https://github.com/electrode-io/car-buying-service.git
```

After cloning the repo, run the following commands to get the server running.
You can run these in a separate terminal.

```bash
cd car-buying-service
npm install
npm start
```

-   You should now have a server running at `http://localhost:8000`.
-   Test that the server is running by calling it with curl.

```bash
curl http://localhost:8000
```

It should reply with: `Hello! from the car buying service.`

> The server needs to be running for the duration of the exercise. You can now switch back to your electrode generated app directory.
>
> Note: For windows, you will need to have curl installed separately for the above command.

## Building your car-buying app

Let's build our car-buying app.

### Installing prerequisites

In this app, we will be using the `react-modal` and `react-icons` modules for modal dialogs and icons.  Please stop the application server and install these two modules:

```bash
$ npm install --save react-modal react-icons
```

We have combined all the css styles into a single file. You just need create a new file `src/client/styles/car-buying.css` and copy the following content inside: [car-buying.css](./src/client/styles/car-buying.css)

### Building the home page

Now, let's start building our car-buying app. Here is the high level description of the structure:

![alt text][component-structure]

In your project folder, look for the file: `src/client/components/home.jsx`, replace the contents of that file with: [home.jsx](./src/client/components/home.jsx).  

-   `home.jsx` is the main page of your app.  It allows the user to pick from buyer or dealer roles.  We will return a React component that contains the Buyer and Dealer buttons.

Now, restart your server by `clap dev` and switch to your <http://localhost:3000/>, and you can see:

![alt text][home1]

Yay! You've got your home page done.

### Building the User View

We now need to create components for the car buyer and dealer role.

-   Let's have a quick peek of what the components are going to look like:

-   `User` Component is composed of the `User Banner` and a collection of the  `Car` component as shown below:

![alt text][component-diagram]

Now Let's build!

-   Create a file named `user.jsx` under directory `src/client/components`
-   Copy the following content inside: [user.jsx](./src/client/components/user.jsx)

### Build the User Banner

User Banner serves as a header for the user page.

-   Create a file named `banner.jsx` under directory `src/client/components`
-   Copy the following content inside: [banner.jsx](./src/client/components/banner.jsx)

### Build the Car Inventory

The car inventory is a collection of the `Car` component, which is used to display information about a car. We will use this component in both User and Dealer components. Create a file named `car.jsx` under the directory `src/client/components`, copy the following content inside: [car.jsx](./src/client/components/car.jsx)

-   We can now add routes to connect the buttons on the homepage to the appropriate views.
-   Modify the `routes.jsx` file under `src/client` with the following code.

```js
import React from "react";
import { Router, Route } from "react-router";
import Home from "./components/home";
import User from "./components/user";

export const routes = (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/user" component={User} />
  </Router>
);
```

-   Now, the initial User view should be ready for you.
-   Restart the server and wait for your app to recompile.
-   Open `http://localhost:3000/user` and you should see:

![alt text][user1]

Congratulations for building your initial user view!

### Add Plugins

As you can see above, the user view is supposed to display a list of cars available in the inventory. We will add an API that gets the available inventory from a service.

We will store the vehicles inventory in a file called `vehicles.json` which is stored under your [mock server](https://github.com/electrode-io/car-buying-service) that we initially set up.

Here is the flow for the data:

![Data Flow][flow]

-   Please create a file called `vehicles.js` under `src/server/plugins` with content from [here](./src/server/plugins/vehicles.js).
-   This file exposes the `/vehicles` endpoint which is used to get the list of vehicles present in the inventory.
-   Register this plugin in `config/default.js` under `plugins` field:

```js
"./server/plugins/vehicles": {
  "module": "./{{env.APP_SRC_DIR}}server/plugins/vehicles"
}
```

> -   `{{env.APP_SRC_DIR}}` is a special token that the module [electrode-confippet] will process and replace with `process.env.APP_SRC_DIR` when it loads the config.
> -   `process.env.APP_SRC_DIR` is an environment variable Electrode platform sets to either load your code from `src` during development or in `lib` during production deployment

### Adding data and populating the initial state for the pages

-   Update `src/server/views/index-views.jsx` with the following content:

```js
import ReduxRouterEngine from "electrode-redux-router-engine";
import { routes } from "../../client/routes";
import { createStore } from "redux";
import rootReducer from "../../client/reducers";
import fs from "fs";
import path from "path";

const Promise = require("bluebird");
const readFileAsync = Promise.promisify(fs.readFile);

function storeInitializer(req, vehicles) {
  let initialState = {
    cars: vehicles
  };
  return createStore(rootReducer, initialState);
}

function createReduxStore(req, match) {
  return Promise.all([
    req.server
      .inject("/vehicles")
      .then(res => {
        return JSON.parse(res.payload);
      })
      .catch(() => {
        return {};
      })
  ]).then(([vehicles]) => storeInitializer(req, vehicles));
}

module.exports = req => {
  const app = (req.server && req.server.app) || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({ routes, createReduxStore });
  }

  return app.routesEngine.render(req);
};
```

> Notice how we are populating the initial redux store with `createReduxStore` and `storeInitializer` functions. We are setting the initial state with a list of vehicles to populate the user view. We are calling the `/vehicles` api created in the `vehicles.js` plugin created in the previous step. This is the data being populated on the server side. Check out how this data is consumed on the client side in `src/client/app.jsx`.

Since we do not have any actions for now, please delete the contents from the file `src/client/actions/index.js` and update the file `src/client/reducers.jsx` with:

```js
import {combineReducers} from "redux";
export default combineReducers({});
```

-   Re-start the server and go to `http://localhost:3000/user`, you should see:

![alt text][user2]

### Testing

Electrode is already setup to run tests along with `eslint` checks. We have already added a basic test for `home.jsx`.

-   Running the command `npm test` will run the tests for you.
-   We want you to add a test for the `user.jsx` component that you just created.
-   Add a new file `user.spec.jsx` under `test/client/components`.
-   You can start by adding a basic test similar to the `home.spec.jsx` and refer [here](./test/client/components/user.spec.jsx) for help.

Congratulations! You've finished the main focus of today's workshop. If you have time or want to try it later, you can try some coding on your own :-)

## Going on your own

Now, we want you to build the dealer view.

From what we've already learned above on how to fetch the vehicles inventory and displaying it on the car inventory page, we now want to fetch data for transactions page.

-   Here is what you will build:

![alt text][transaction-history2]

And here is what you need to do:

-   Add a `transactions.js` file under server's plugins, you will have APIs to get, create, and update transactions. These APIs will call the mock server endpoints similar to the `vehicles` plugin. API endpoints available in the mock server are:

| Path                | Method | Purpose                                      |
| ------------------- | ------ | -------------------------------------------- |
| /transactions       | GET    | Return all transactions in record.           |
| /get-negotiations   | GET    | Return all transactions of type Negotiation. |
| /create-transaction | POST   | Create a new transaction.                    |
| /update-transaction | POST   | Update a transaction.                        |

-   Add views under `src/client/components` that display our transactions loaded from the service.
-   Make sure the data is populated on the server side, before the view is rendered, similar to how vehicles was populated in the `storeInitializer` function.

## Challenge

Wow you are doing a great job! If you still have time, let's move on to some challenges. :-)

If you switch to user view at `http://localhost:3000/car-details`, you will realize the `Details` button is not working yet.

Here is what we want to display:

![alt text][car-details]

Let's add a route for car details and build the view above!

When you run `npm test` a coverage report is generated for you. You can view it under the `coverage` folder. A detailed coverage report will be included as an `index.html` file under `coverage/client/<HeadlessChrome>/lcov-report/`. Please go ahead and add tests for components that lack coverage.

## Thank you

Again, thank you so much for joining this workshop with Electrode today. We are happy to have you here to code together.
We have created a complete version of the car-buying app [here](https://github.com/electrode-io/car-buying) if you are interested in checking it out!

[initial-app]: instructions_img/initial-app.png

[generator-prompts]: instructions_img/generator-prompts.png

[check-nodejs]: instructions_img/check-nodejs.png

[home1]: instructions_img/home1.png

[user-banner]: instructions_img/user-banner.png

[car-inventory]: instructions_img/car-inventory.png

[user1]: instructions_img/user1.png

[user2]: instructions_img/user2.png

[car-details]: instructions_img/car-details.png

[transaction-history]: instructions_img/transaction-history1.png

[transaction-history2]: instructions_img/transaction-history2.png

[component-diagram]: instructions_img/component-diagram.jpg

[component-structure]: instructions_img/component-structure.jpg

[flow]: instructions_img/flow.png

[electrode-confippet]: https://github.com/electrode-io/electrode-confippet
