import Tokenizer from "../dist";
import { tokens, defaultJsonStr, expectedResult } from "./example";

describe("Test case for Tokenizer", () => {
  it("Should give the correct number of tokens", () => {
    const tokenizer = new Tokenizer({
      tokens,
    });

    expect(tokenizer.tokenize(defaultJsonStr).length).toBe(
      expectedResult.length
    );
  });

  it("Should give the correct end column", () => {
    const tokenizer = new Tokenizer({
      tokens,
    });

    const result = tokenizer.tokenize(defaultJsonStr);

    expect(result[result.length - 1].endColumn).toBe(defaultJsonStr.length);
  });

  it("Should give the correct result", () => {
    const tokenizer = new Tokenizer({
      tokens,
    });

    expect(tokenizer.tokenize(defaultJsonStr)).toEqual(expectedResult);
  });

  it("Should be able to get back the original string", () => {
    const tokenizer = new Tokenizer({
      tokens,
    });

    const result = tokenizer.tokenize(defaultJsonStr);

    expect(result.reduce((a, b) => a + b.value, "")).toBe(defaultJsonStr);
  });

  it("Should filter the white spaces", () => {
    const tokenizer = new Tokenizer({
      tokens,
      callback: (tk, prevTk) => {
        switch (tk.type) {
          case "WHITE_SPACE":
            return null;
          default:
            return tk;
        }
      },
    });

    const result = tokenizer.tokenize(defaultJsonStr).map(({ type }) => type);

    expect(result.includes("WHITE_SPACE")).toBeFalsy();
    expect(result.length).toBeGreaterThan(0);
  });

  it("Should throw an error on invalide type", () => {
    const tokenizer = new Tokenizer({
      tokens,
      callback: (tk, prevTk) => {
        return { ...tk, type: "SOMETHING INVALIDE" as any };
      },
    });

    expect(() => tokenizer.tokenize(defaultJsonStr)).toThrow();
  });

  it("Shouldn't throw an error on invalide type", () => {
    const tokenizer = new Tokenizer({
      tokens,
      authorizeAdditionalTokens: true,
      callback: (tk, prevTk) => {
        return { ...tk, type: "SOMETHING INVALIDE" };
      },
    });

    expect(() => tokenizer.tokenize(defaultJsonStr)).not.toThrow();
  });

  it("Should change the default type", () => {
    const tokenizer = new Tokenizer({
      tokens,
      defaultType: "WORD",
    });

    const invalideJson = defaultJsonStr + "something invalide";
    const result = tokenizer.tokenize(invalideJson);

    expect(result[result.length - 1].type).toBe("WORD");
  });

  it("Shouldn't concat the default type", () => {
    const tokenizer = new Tokenizer({
      tokens,
      concatDefaultType: false,
    });

    const invalideJson = defaultJsonStr + "something invalide";
    const result = tokenizer.tokenize(invalideJson);

    expect(result[result.length - 1].value).toBe("e");
  });

  it("Should concat the default type", () => {
    const tokenizer = new Tokenizer({
      tokens,
      concatDefaultType: true,
    });

    const invalideJson = defaultJsonStr + "something invalide";
    const result = tokenizer.tokenize(invalideJson);

    expect(result[result.length - 1].value).toBe("invalide");
  });

  it("Should throw an error within the callback", () => {
    const tokenizer = new Tokenizer({
      tokens,
      callback: (tk, prevTk) => {
        switch (tk.type) {
          case "UNKNOWN":
            throw new Error(
              `Invalide JSON: "${tk.value}"\nAt line: ${tk.startLine}, column: ${tk.startColumn}\nTo line: ${tk.endLine}, column: ${tk.endColumn}`
            );
        }
        return tk;
      },
    });

    const invalideJson = defaultJsonStr + "something invalide";

    expect(() => tokenizer.tokenize(invalideJson)).toThrow();
  });

  it("Check if the prioritization is implemented", () => {
    const tokenizer = new Tokenizer({
      tokens: {
        A: /a/,
        BAB: /bab/,
      },
    });

    const result = tokenizer.tokenize("bab");

    expect(result[1].type).toBe("A");
  });

  it("Check if the prioritization is implemented 2", () => {
    const tokenizer = new Tokenizer({
      tokens: {
        BAB: /bab/,
        A: /a/,
      },
    });

    const result = tokenizer.tokenize("bab");

    expect(result[0].type).toBe("BAB");
  });

  it("Check if the prioritization is implemented 3", () => {
    const tokenizer = new Tokenizer({
      tokens: {
        AA: /aa/,
        BABA: /baba/,
      },
    });
    const result = tokenizer.tokenize("babaa");
    expect(result[1].type).toBe("AA");
  });

  it("Check if the prioritization is implemented 4", () => {
    const tokenizer = new Tokenizer({
      tokens: {
        AA: /aa/,
        BABA: /baba/,
      },
    });
    const result = tokenizer.tokenize("babacaa");
    expect(result[0].type).toBe("BABA");
    expect(result[2].type).toBe("AA");
  });

  it("Check if we can desactivate the prioritization", () => {
    const tokenizer = new Tokenizer({
      tokens: {
        AA: /aa/,
        BABA: /baba/,
      },
      prioritize: false,
    });
    const result = tokenizer.tokenize("babaaa");
    expect(result[0].type).toBe("BABA");
    expect(result[1].type).toBe("AA");
  });
});
