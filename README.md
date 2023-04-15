Utility types and validators for typesafe work with json in typescript.

<a href="https://bundlejs.com/?q=%40mellkam%2Fjson"><img src="https://deno.bundlejs.com/?q=@mellkam/json&badge=minified"></a>

# Installation

```bash
npm i @mellkam/json
```

# Usage

```ts
import { type JSONValue, isJSONValue } from "@mellkam/json";

JSON.parse("...") as JSONValue;
JSON.stringify({ ... } as JSONValue)

isJSONValue({ key: new Map() }) // false
```

# Validator benchmark

594 times faster than zod json schema 

```bash
zod: 2.523s
@mellkam/json: 4.244ms
```

