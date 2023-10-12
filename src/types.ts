export type SearchResult<KEY, T> = {
    path: KEY;
    value: T | undefined;
    isComplete: boolean;
};

export interface SearchTrie<KEY, T> {
    /**
     * checks if value exists
     */
    has(word: KEY): boolean;

    /**
     * searches trie for the value
     * @returns {Boolean} if exact match was found
     */
    get(word: KEY): T | undefined;

    /**
     * finds nearest record in the trie
     */
    findNearest(word: KEY): SearchResult<KEY, T>

    /**
     * puts a new value into the trie
     */
    put(word: KEY, value: T): void;
}

export type TrieNode = {
    [P in string]: TrieNode;
};

export type EdgeNodes = Map<TrieNode, string>;
export type EdgeValues = WeakMap<TrieNode, any>;
