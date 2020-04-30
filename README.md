# Broadcom - ApiHub

- Example: <https://broadcom-apihub.marmelab.com>
- Storybook: <https://storybook-broadcom-apihub.marmelab.com>

## Development

**Requirements:**

- Dependencies are managed by [yarn](https://yarnpkg.com/)
- Commands are launched using make

Install the dependencies with:

```sh
make install
```

Starts the application in watch mode with:

```sh
make start
```

Starts the tests using:

```sh
make test
```

## APIM Portal - Integration

Portal Url <https://broadcom-apihub.marmelab.com>

### Setup Instructions

Before starting, your IP should be white listed by the Broadcom team.

1. Add this to your `/etc/hosts`:

> 127.0.0.1 uidev.dev.ca.com
> 34.74.64.167 apim.dev.ca.com pssg portal-data dssg apim-ssg.dev.ca.com enroll.dev.ca.com sync.dev.ca.com sso.dev.ca.com analytics.dev.ca.com broker.dev.ca.com ingress false.dev.ca.com

2. Open the following url <https://apim.dev.ca.com> in your browser (repeat this step for all the browsers you use)
3. Accept the certificate exception

Extra steps to host the example application using another tenant name (to use for example `apim.dev.ca.com` instead of `uidev.dev.ca.com`):

1. Change your local config replacing `uidev` by *your new tenant* in the `/etc/hosts` file
2. Host the example app using *your new tenant* (see [Test on a real API / Use the mocks](./packages/example/README.md##test-on-a-real-api-/-use-the-mocks))

### How to Log In

Use the following users:

- Role `portaladministrators` (CRUD):  _TestAdmin1 / Password@1_
- Role `apiowners` (CRUD): _TestAPIOwner2 / Password@1_
- Role `developers` (view tile only): _Developer1 / Password@1_
- Role `developers` (portal API org) : _TestDev1 / Password@1_
- Role `devorgadministrators` (view tile only): _TestOrgAdmin / Password@1_

### Deployment

Our APIM Portal in deployed on an AWS S3, and secured thanks to a CloudFront DNS.

To deploy it, you need to install the [AWS CLI](https://aws.amazon.com/cli).

``` sh
pip install --user awscli
```

Then, you should run the deploy command:

``` sh
BUILD_ENV=integration make deploy
```

**Tips:** you could deploy the storybook and the example app separately using the dedicated commands `make deploy-storybook` and `make deploy-example`.

## Layer7 ApiHub Library

[Documentation](./packages/layer7-apihub/README.md)

- [Add support for a new language](./packages/layer7-apihub/README.md##add-support-for-a-new-language)

## Example App

[Documentation](./packages/example/README.md)

- [Change the configuration](./packages/example/README.md##change-the-configuration)
- [Change the page title](./packages/example/README.md##change-the-page-title)
- [Test on a real API / Use the mocks](./packages/example/README.md##test-on-a-real-api-/-use-the-mocks)
- [Host the app on another domain](./packages/example/README.md##host-the-app-on-another-domain)
- [Auto-Detect the ApiHub url](./packages/example/README.md##auto-detect-the-apihub-url)

## Layer7 ApiHub Mock Server

[Documentation](./packages/layer7-apihub-mock/README.md)

- [Usage](./packages/layer7-apihub-mock/README.md##usage)

