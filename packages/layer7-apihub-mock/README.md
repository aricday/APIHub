# Layer7 Apihub Mock Server

This package provides a mocked ApiHub server which runs in the browser.

## Usage

Starts a mocked server in your client application by calling the `startApiHubMockedServer` function.
All calls to the ApiHub endpoints will be intercepted and a generated response will be sent back.

```js
import { startApiHubMockedServer } from 'layer7-apihub-mock';

startApiHubMockedServer();
```

## Users

Four users are available using the mock:

- A portal admin whose username is `portalAdmin` and password `Password@1`
- An organisation pulisher whose username is `orgPublisher` and password `Password@1`
- An API Owner whose username is `apiOwner` and password `Password@1`
- A simple user whose username is `user` and password `Password@1`
