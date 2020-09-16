# Spices - Anise
> Javascript utility library for parsing the document.location

## Usage

```JS
import {Anise, Field} from '@spices/anise'

let args = Anise.detect({
  new Field({
    name: 'lang', 
    fallback: 'en', 
    path: /.?\/(de|en|es)\/?.?/,
    persistent: true, 
    search: /lang=(de|en|es)/,
    values: ['de', 'en', 'es'],
  })
});
```

Will yield

- `/` -> `{lang="en"}` - Because `en` is the `fallback` value .
- `/fr` -> `{lang="en"}` - Because `fr` is not in the value list, therefor it takes only the valid values.
- `/en?lang=de` -> `{lang="de"}` - Because the search values will override the path values.

## Field

- `fallback` <Any> - The fallback if the field is not found. The default value.
- `name` <String> - The value used to identify the field
- `path` <RegExp> | <Function> - The path regexp to test against. Or the function to call to check whether or not the arguments is part of the pathname  
- `persistent` <Boolean> - Whether or not use the localstorage are a source and provider
- `search` <RegExp> | <Function> The search regexp to test against. Or the function to call to check whether or not the arguments is part of the search query string  
- `validator` <Function> A function use to determine Whether or not the value detected is valid or not
- `values` <Array> A list of allowed values for the field. Will be used to check against for validity.

## How does it work?

When triggering the method `Anise.detect`, @spices/anise will check for the fields in the following sequence:

1. Use the `fallback` to setup the default values
2. Look for the `persistent` values in the localStorage
3. Look at the `document.location.pathname` for field matching the `path`
4. Look at the `document.location.search` for field mathing the `search`
5. Persists the information when needed

