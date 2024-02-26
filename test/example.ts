import Tokenizer from "../dist";

const tokens = {
  STRING: Tokenizer.BUILT_IN_RULES.DOUBLE_QUOTE_STRING,
  NUMBER: Tokenizer.BUILT_IN_RULES.NUMBER,
  WHITE_SPACE: Tokenizer.BUILT_IN_RULES.WHITE_SPACES,
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

const defaultJsonStr = `{ "greeting": "Hello World !", "error": false, "note": 20, "bool": "false" }`;
const expectedResult = [
  {
    type: "START_BRACE",
    value: "{",
    startLine: 0,
    startColumn: 0,
    endLine: 0,
    endColumn: 1,
  },
  {
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 1,
    endLine: 0,
    endColumn: 2,
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
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 13,
    endLine: 0,
    endColumn: 14,
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
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 30,
    endLine: 0,
    endColumn: 31,
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
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 39,
    endLine: 0,
    endColumn: 40,
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
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 46,
    endLine: 0,
    endColumn: 47,
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
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 54,
    endLine: 0,
    endColumn: 55,
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
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 58,
    endLine: 0,
    endColumn: 59,
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
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 66,
    endLine: 0,
    endColumn: 67,
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
    type: "WHITE_SPACE",
    value: " ",
    startLine: 0,
    startColumn: 74,
    endLine: 0,
    endColumn: 75,
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

export { tokens, defaultJsonStr, expectedResult };