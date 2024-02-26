# tokenize

An advanced tokenizer made with typescript

## Update

See the [CHANGELOG](./CHANGELOG.md) file

## Installation

```
$ npm i @yoannchb/tokenize
```

## CDN

```html
<script src="https://unpkg.com/@yoannchb/tokenize@1.0.0/dist/index.js"></script>
```

## Import

```js
import Tokenizer from "@yoannchb/tokenize";
// OR
const Tokenizer = require("@yoannchb/tokenize");
```

## API

See the [example](#example)

> NOTE: With typescript please set your tokens `as const` to get the typing

```ts
const tokenizer = new Tokenizer({ tokens });
tokenizer.tokenize("my string");
```

### Tokenizer(options)

#### prioritization: boolean

Allow the prioritization of the regex based on the key index in the tokens varaibles (by default it's `true`).

```js
const tokenizer = new Tokenizer({
  tokens: {
    AA: /aa/,
    BABA: /baba/,
  },
  prioritize: true,
});
const result = tokenizer.tokenize("babaaa");
// result[0].type = "UNKNOWN", result[0].value = "bab"
// result[1].type = "AA"
// result[2].type = "UNKNOWN", result[2].value = "a"

const tokenizer = new Tokenizer({
  tokens: {
    AA: /aa/,
    BABA: /baba/,
  },
  prioritize: false,
});
const result = tokenizer.tokenize("babaaa");
// result[0].type = "BABA"
// result[1].type = "AA"
```

#### defaultType: boolean

Change the defaultType when an UNKNOWN token type is matched (by default it's `UNKNOWN`).

#### callback: (token, previousTokens) => Token | null

Set a callback function called every time a new token is matched.
You can also `return null` if you don't want to keep this token.

#### concatDefaultType: boolean

Concat the tokens with the default type (by default it's `true`).

#### authorizeAdditionalTokens: boolean

Authorize custom token type returned by the callback function. It allow you to add adtionnal token in typescript type too.

```js
const tokenizer = new Tokenizer({
  tokens,
  callback: (tk, prevTk) => ({ ...tk, type: "SOMETHING NOT IMPLEMENTED" }),
});
```

## Example

Here follow a simple example of a lexer for the JSON syntax:

### Code

```ts
const tokens = {
  STRING: /(")(?<content>(?:\\\1|.)*?)\1/,
  NUMBER: /\d+(?:\.\d+)?/,
  WHITE_SPACE: /\s+/,
  COMA: /,/,
  COLON: /:/,
  TRUE_BOOLEAN: /true/,
  FALSE_BOOLEAN: /false/,
  NULL: /null/,
  START_BRACKET: /\[/,
  END_BRACKET: /\]/,
  START_BRACE: /\{/,
  END_BRACE: /\}/,
} as const;
const tokenizer = new Tokenizer({
  tokens,
  callback: (tk, prevTk) => {
    switch (tk.type) {
      case "WHITE_SPACE":
        return null; // Remove white spaces
      case "UNKNOWN":
        throw new Error(
          `Invalide JSON: "${tk.value}"\nAt line: ${tk.startLine}, column: ${tk.startColumn}\nTo line: ${tk.endLine}, column: ${tk.endColumn}`
        );
    }
    return tk;
  },
});
const result = tokenizer.tokenize(
  `{ "greeting": "Hello World !", "error": false, "note": 20, "bool": "false" }`
);
```

### Result

```js
[
  {
    type: "START_BRACE",
    value: "{",
    startLine: 0,
    startColumn: 0,
    endLine: 0,
    endColumn: 1,
  },
  {
    type: "STRING",
    value: '"greeting"',
    groups: { content: "greeting" },
    startLine: 0,
    startColumn: 2,
    endLine: 0,
    endColumn: 12,
  },
  {
    type: "COLON",
    value: ":",
    startLine: 0,
    startColumn: 12,
    endLine: 0,
    endColumn: 13,
  },
  {
    type: "STRING",
    value: '"Hello World !"',
    groups: { content: "Hello World !" },
    startLine: 0,
    startColumn: 14,
    endLine: 0,
    endColumn: 29,
  },
  {
    type: "COMA",
    value: ",",
    startLine: 0,
    startColumn: 29,
    endLine: 0,
    endColumn: 30,
  },
  {
    type: "STRING",
    value: '"error"',
    groups: { content: "error" },
    startLine: 0,
    startColumn: 31,
    endLine: 0,
    endColumn: 38,
  },
  {
    type: "COLON",
    value: ":",
    startLine: 0,
    startColumn: 38,
    endLine: 0,
    endColumn: 39,
  },
  {
    type: "FALSE_BOOLEAN",
    value: "false",
    startLine: 0,
    startColumn: 40,
    endLine: 0,
    endColumn: 45,
  },
  {
    type: "COMA",
    value: ",",
    startLine: 0,
    startColumn: 45,
    endLine: 0,
    endColumn: 46,
  },
  {
    type: "STRING",
    value: '"note"',
    groups: { content: "note" },
    startLine: 0,
    startColumn: 47,
    endLine: 0,
    endColumn: 53,
  },
  {
    type: "COLON",
    value: ":",
    startLine: 0,
    startColumn: 53,
    endLine: 0,
    endColumn: 54,
  },
  {
    type: "NUMBER",
    value: "20",
    startLine: 0,
    startColumn: 55,
    endLine: 0,
    endColumn: 57,
  },
  {
    type: "COMA",
    value: ",",
    startLine: 0,
    startColumn: 57,
    endLine: 0,
    endColumn: 58,
  },
  {
    type: "STRING",
    value: '"bool"',
    groups: { content: "bool" },
    startLine: 0,
    startColumn: 59,
    endLine: 0,
    endColumn: 65,
  },
  {
    type: "COLON",
    value: ":",
    startLine: 0,
    startColumn: 65,
    endLine: 0,
    endColumn: 66,
  },
  {
    type: "STRING",
    value: '"false"',
    groups: { content: "false" },
    startLine: 0,
    startColumn: 67,
    endLine: 0,
    endColumn: 74,
  },
  {
    type: "END_BRACE",
    value: "}",
    startLine: 0,
    startColumn: 75,
    endLine: 0,
    endColumn: 76,
  },
];
```
