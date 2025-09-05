type Tokens = {
    [key: string]: RegExp;
};
type TokenType<T extends Tokens, D extends string, A extends boolean> = keyof T | (A extends true ? D | Omit<string, keyof T | D> : D);
type Token<T extends Tokens, D extends string, A extends boolean> = {
    type: TokenType<T, D, A>;
    value: string;
    groups?: Record<string, string>;
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
};
type Options<T extends Tokens, D extends string, A extends boolean> = {
    tokens: T;
    defaultType: D;
    prioritize?: boolean;
    callback?: (token: Token<T, D, A>, prevTokens: Token<T, D, A>[]) => Token<T, D, A> | null;
    concatDefaultType?: boolean;
    authorizeAdditionalTokens?: A;
};
declare const defaultOptions: {
    readonly defaultType: "UNKNOWN";
    readonly concatDefaultType: true;
};
type ConstructorOptions<T extends Tokens, D extends string, A extends boolean> = Omit<Options<T, D, A>, keyof typeof defaultOptions> & Partial<Pick<Options<T, D, A>, keyof typeof defaultOptions>>;
/**
 * Tokenize any string with given tokens
 */
declare class Tokenizer<T extends Tokens, D extends string = "UNKNOWN", A extends boolean = false> {
    static BUILT_IN_RULES: {
        readonly WORD: RegExp;
        readonly NUMBER: RegExp;
        readonly ONE_LINE_COMMENT: RegExp;
        readonly MULTIPLE_LINE_COMMENT: RegExp;
        readonly STRING: RegExp;
        readonly DOUBLE_QUOTE_STRING: RegExp;
        readonly SINGLE_QUOTE_STRING: RegExp;
        readonly GRAVE_ACCENT_STRING: RegExp;
        readonly WHITE_SPACES: RegExp;
        readonly NEW_LINES: RegExp;
    };
    private options;
    constructor(_options: ConstructorOptions<T, D, A>);
    /**
     * Get the default type if no token was match
     * @returns
     */
    /**
     * Get the default type if no token was match
     * @returns
     */
    getDefaultType(): D;
    /**
     * Get the list registered of the tokens
     * @returns
     */
    /**
     * Get the list registered of the tokens
     * @returns
     */
    getTokens(): T;
    /**
     * Get the list of tokens name
     * @returns
     */
    /**
     * Get the list of tokens name
     * @returns
     */
    getTokensName(): (keyof T | D)[];
    /**
     * Tokenize a string
     * @param str
     * @returns
     */
    /**
     * Tokenize a string
     * @param str
     * @returns
     */
    tokenize(str: string): Token<T, D, A>[];
}
export { Tokenizer as default };
