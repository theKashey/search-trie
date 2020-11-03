export interface SearchCharTrie<T> {
  /**
   * checks if value exists
   */
  has(word: string): boolean;
  /**
   * searches trie for the value
   * @returns {Boolean} exact match was found
   */
  get(word: string): T | undefined;

  /**
   * puts a new value into the trie
   */
  put(word: string, value: T): void;
}

export interface SearchWordTrie<T> {
  /**
   * checks if value exists
   */
  findNearest(
    word: string[]
  ): {
    path: string[];
    value: T | undefined;
  };

  /**
   * puts a new value into the trie
   */
  put(word: string[], value: T): void;
}

export type TrieNode = {
  [P in string]: TrieNode;
};

export type EdgeNodes = Map<TrieNode, string>;
export type EdgeValues = WeakMap<TrieNode, any>;
