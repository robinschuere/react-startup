# react-startup
Repository holding all information to start a react app bundled with webpack, babel, linter and jest

Extras:
- electron
- pouchDB / CouchDB or Sqlite (sql.js) / postgres
- routing
- react-router / react-router-dom
- redux

To start the existing project:
`npm i`
`npm start`

# Setup

This project was created to get a better understanding of

- Webpack bundling
- babel configuration with the new babel values @babel/core
- eslint config with these new values
- jest for testing purposes

Extras will be added for:
- electron to create a OS-specific installer
- add a database for offline / online purposes
  - pouchDB / couchDB
  - sqlite / postgres
- react-router for frontend routing
- redux for data flow inside the application

To recreate the steps, this guide was created alongside.

Because I simply do not reinvent the light, here is where I got the sauce.

- https://www.valentinog.com/blog/react-webpack-babel/
- https://www.robinwieruch.de/react-eslint-webpack-babel/
- https://jestjs.io/docs/en/tutorial-react
- https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c

## Step 1: Create a project
```
mkdir react-startup-go
cd react-startup-go
npm init -y
```

We now have a project folder react-startup-go with one file name package.json.

Create the structure as below

```
mkdir src
touch src/index.js
```

That's it. Project is ready to go.

## Step 2: Add webpack

```
npm i -D webpack webpack-cli
```

Small reminder, `-D = --save-dev; -S = --save`

After the install of said packages, it is now possible to create a build commend

Add the following code to `package.json`

```
"scripts": {
  "build": "webpack --mode production"
}
```

Done. We can now bundle the app. Hooray!!!

```
npm run build
```

## Step 3: Add Babel

Packages you say?

```
npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react
touch .babelrc
```

Add the following code to `.babelrc`

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## Step 4: Create a custom webpack config

Custom you say? Since we will be using React and by extension the `.jsx` files, we need to do some transformation of the files before the code will actually run.

```
touch webpack.config.js
```

Add the following code to `webpack.config.js`

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

And, done.

```
npm run build
```

## Step 5: Add react

Why all the hassle to create a whole setup for React if we do not use React?

```
npm i -S react react-dom prop-types
```

We will also create some more project values, so that we have a general understanding of were the files are going to be.

For easy model understanding:
- containers hold state
- components know nothing (like John Snow)

```
mkdir src/components
mkdir src/containers
touch src/components/input.jsx
touch src/containers/form.jsx
```

Add the following code to `input.jsx`

```
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({label, type, id, value, handleChange}) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={handleChange}
        required
      />
    </label>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Input;

```

Add the following code to `form.jsx`

```
import React, { Component } from "react";
import Input from "../components/input.jsx";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
export default FormContainer;

```

Add the following code to `index.js`

```
import Form from "./containers/form.jsx";
```

And re-run the build
```
npm run build
```

Oh wait, we got our first error!!!!

```
ERROR in ./src/containers/form.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/robinschuerewegen/projects/react-startup/src/containers/form.jsx: Support for the experimental syntax 'classProperties' isn't currently enabled (12:16):
```

To solve the problem

```
npm i -D @babel/plugin-proposal-class-properties
```

Add the following code to `.babelrc`

```
  "plugins": ["@babel/plugin-proposal-class-properties"]
```

Done. We can now succesfully add React to our project.

## Step 6: Add a html page so we can actively place our React on a page.

```
touch src/index.html
```

Add the following code to `index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, Babel, Eslint</title>
</head>
<body>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-4 offset-md-1">
                <p>Create a new article</p>
                <div id="create-article-form">
                    <!-- form -->
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

Good, good. We now have a html file that holds an id `create-article-form`. This id will be used to place our React in.

We do need to change the config of our webpack since it now needs to transform html

More packages you say?

```
npm i -D html-webpack-plugin html-loader
```

Replace the code from `webpack.config.js`

```
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};

```

Add the following code to `index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;
```

And re-run

```
npm run build
```

## Step 7: But we don't see anything yet...

We can now happily bundle our project, but, we ain't see nothing yet. Time to start `hot reloading`.

```
npm i -D webpack-dev-server
```

Add the following code to `package.json` under `scripts`

```
"start": "webpack-dev-server --open --mode development"
```

And run the script

```
npm start
```

## Step 8: Add eslint

Now we added some code, although we are not certain it is in a correct syntax. So we are going to use the airBnB styleguide.

```
npm i -D eslint eslint-config-airbnb eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react babel-eslint
touch .eslintrc
```

Add the following code to `.eslintrc`

```
{
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "extends": "airbnb",
  "globals": {
    "document": true
  },
}

```

The intellisense of your favorite tool will probably give errors on some pages, but webpack will not. Not yet.

update the use property under `webpack.config.js` rules for `test: /\.(js|jsx)$/,` into

```
use: ['babel-loader', 'eslint-loader'],
```

Also add to `webpack.config.js`
```
resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
```

And run the script

```
npm start
```

We can now cleanup all code that was by default wrong. Eslint is by no means holy, so dare to ignore some values whenever possible.

## Step 9: Add jest

And, more packages ...

```
npm i -D jest babel-jest react-test-renderer
mkdir src/components/__spec__
touch src/components/__spec__/input.test.jsx
```

Add the following code to `input.test.js`

```
import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../input';

test('Input', () => {
  const onHandleChange = (event) => {
    expect(event).toEqual('something');
  };

  const component = renderer.create(
    <Input label="this" value="is alright" type="text" handleChange={onHandleChange} id="input" />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

```

Our linter does not know the jest syntax, so obviously, we will just add it.

```
"env": {
    "jest": true
  }
```

And we still need a script to run the tests

Add the following code to `package.json` under scripts

```
"test": "jest"
```

run the test script

```
npm test
```

After this step, you have a React app, bundled with Webpack and babel. That has a linter and tests with Jest.

## Step 10: use Electron

If you still want to do some more wicked things, we are now going to make our app run on, DRUMROLL, ANY DEVICE. Or something like it. Enter Electron

More packages ... and more ... and more

```
npm i -D electron
touch start-electron.js
```

add the following code to `start-electron.js`

```
/* eslint-disable */

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:8080');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

```

add the following code to `package.json` under `scripts`

```
"electron": "electron ."

```

and update the main property to "start-electron.js"

for running the electron app for the first time:

```
npm start
npm run electron
```

Eh voila, your app is now running as a standalone Electron app.

## Step 11: Clean the electron a bit up so it works more fluently without 2 npm commands

Since we now have to run both webpack and electron commands to develop simultaneously, we also want to avoiud that specific drag.

add the following code to `start-electron.js`

```
const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/dist/index.html'),
  protocol: 'file:',
  slashes: true
});
```

and update the line for the loadUrl to

```
mainWindow.loadURL(startUrl);
```

as a last step we will now add a new command.

add the following code  `package.json` under `scripts`

```
"electron-dev": "ELECTRON_START_URL=http://localhost:8080 electron .",
"electron-win-dev": "SET ELECTRON_START_URL=http://localhost:8080 electron ."
```

The above will make it possible to:

- run the electron command so that it will take the last bundled value from the dist folder and display it. (to run after npm run build)
- run the electron-dev command simultaneously with the npm start command for development purposes
- run the electron-win-dev command for the above but on windows.

And done. You should now be able to run an electron app.

## Step 12: Create a package installer for different platforms

To create an app installer, we will use a package for doing this values.

```
npm i -D electron-packager
```

add the following code to `package.json`

```
"productName": "Start-Electron"
```

also add a new script under `scripts`

```
"electron-package": "electron-packager ."
```

run the command
```
npm run electron-package
```

a new folder `Start-Electron-darwin-x64` will be created that holds all information for the app. Open the app by installing the `Start-Electron-darwin-x64/Start-Electron.app` on your Mac.

## Final Steps: clean up

for obvious reasons we don't want to populate our repository with data that is unneccesary.

```
touch .gitignore
```

Add the following code to `.gitignore`

```
dist
node_modules
Start-Electron-darwin-x64
```