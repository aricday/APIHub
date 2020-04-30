# Example App

## Change the configuration

The configuration of the example app uses global variables stored in the `window.APIHUB_CONFIG` object.

All the config files are declared in the config folder of the example app: `./packages/example/config`. Each file corresponds to a different environment. For example, the file `config-dev.js` corresponds to the config of the `dev` environment.

During the deployment, the config file is copied with the other assets in the public folder of the app. Thanks to that, this file isn't involved in the webpack build process of the React app (see <https://create-react-app.dev/docs/using-the-public-folder)>). And so it's possible to override it.

**To define a config for a new environment**, you have two things to do:

1. Create a new file named `config-XXX.js` in the config folder, where `XXX` is the new environment name.
2. Prefix the deploy command during the deploy process with `DEPLOY_ENV=XXX make deploy`.

**Tips:** you can also override the `window.APIHUB_CONFIG` object directly in JavaScript before the React app is loaded.

``` js
window.APIHUB_CONFIG = {
    PAGE_TITLE: 'Layer 7 Apihub | Broadcom', // The html page title
    APIHUB_URL: 'https://apim.dev.ca.com', // Force the ApiHub url
    TENANT_NAME: 'apim', // Force the tenant name
    ENABLE_MOCK: false, // Enable the mocks
};
```

## Change the page title

The page title is set up by `react` and `react-helmet` in the file [/src/App.js](./src/App.js).

You should follow two steps to change it:

1. Update the default title in the index file [/public/index.html](./public/index.html). It's useful to define the page title before the page is rendered by the React App.
2. Update the page title defined by the React App directly in the config (see [Change the configuration](./README.md#change-the-configuration)). The title is stored under the key `window.APIHUB_CONFIG.PAGE_TITLE`. You can define a different title for each environment.

## Test on a real API / Use the mocks

To test on a real API, you have to disable the mocks in the development config (see [Change the configuration](./README.md#change-the-configuration)). The real API is used by default.

**Tips**: it's also possible to use the mocks on other environments.

## Host the app on another domain

By default, we assume that the app is hosted on `uidev.dev.ca.com`. But you can launch it on another domain, for example `apim.dev.ca.com`.

To do so:

1. Open the file [.env.development](./.env.development)
2. Replace the line HOST by *your new domain*

## Auto-Detect the ApiHub url

If your api is hosted on the same url as your application, you can make it automatically detect the ApiHub url.
To do so, you have to remove the `APIHUB_URL` and the `TENANT_NAME` keys from the config (see [Change the configuration](./README.md#change-the-configuration)).

The new config file will be:

``` js
window.APIHUB_CONFIG = {
    PAGE_TITLE: 'Layer 7 Apihub | Broadcom', // The html page title
    ENABLE_MOCK: false, // Enable the mocks
};
```

## HTTPS

In order to avoid CORS errors regarding HTTPS, you might have to enable HTTPS support in create-react-app.
To do so, edit the `.env.development` file and uncomment the three environment variables needed for HTTPS:

- `PORT`
- `HOST`
- `HTTPS`

## Development using the mock server

We provide a mock server to allow you to work on customizing your application without a real ApiHub instance running.

To enable it, set the `ENABLE_MOCK` variable to `true` in your configuration file.

Four users are available using the mock:

- A portal admin whose username is `portalAdmin` and password `Password@1`
- An organisation pulisher whose username is `orgPublisher` and password `Password@1`
- An API Owner whose username is `apiOwner` and password `Password@1`
- A simple user whose username is `user` and password `Password@1`
****