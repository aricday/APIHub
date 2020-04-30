# Layer7 ApiHub Library

## Add support for a new language

First add a dependency to the react-admin package for the language.
You might find one on this page: <https://marmelab.com/react-admin/Translation.html#available-locales>

Then, duplicates the `./packages/layer7-apihub/src/i18n/en.js` file and name it with the new locale code. For example, `nl` for Dutch.

Finaly, update the `./packages/layer7-apihub/src/i18n/supportedLocales.js` file and the new locale.
