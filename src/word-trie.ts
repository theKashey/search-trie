import { EMPTY } from './magic';
import type { EdgeValues, SearchResult, SearchTrie, TrieNode } from './types';

const put = (node: TrieNode, str: string[], value: any, values: EdgeValues) => {
  let nextNode;

  for (const c of str) {
    nextNode = node[c];

    if (!nextNode) {
      nextNode = node[c] = Object.create(EMPTY);
    }

    node = nextNode;
  }

  values.set(node, value);

  return nextNode;
};

export const searchTrie = <T>(trie: TrieNode, paths: string[], values: EdgeValues): SearchResult<string[], T> => {
  let node = trie;
  let lastValue;
  let lastValuePath = -1;
  // const valuePath = [];

  for (let i = 0; i < paths.length; ++i) {
    const searchPath = paths[i];
    node = node[searchPath];

    if (!node) {
      break;
    }

    const value = values.get(node);

    if (value !== undefined) {
      lastValue = value;
      lastValuePath = i;
    }
  }

  const lastIndex = lastValuePath+1;

  return {
    value: lastValue,
    path: paths.slice(0, lastIndex),
    isComplete: lastIndex===paths.length
  };
};

/**
 * builds a "word" based search trie.
 * Optimized for long but structured inputs, like directory names
 *
 * pros:
 * - fewer steps to find solution as key name can be long
 *
 * cons:
 * - potentially more keys in single node causing hashmap speed degradation
 *
 * - input: array of {key:string[], value}
 */
export const buildWordTrie = <T>(lines: Array<{ key: string[]; value: T }>): SearchTrie<string[],T> => {
  const root = Object.create(EMPTY);
  const values = new WeakMap();

  for (const { key, value } of lines) {
    put(root, key, value, values);
  }

  return {
    get(word) {
      const {isComplete, value} = searchTrie<T>(root, word, values);

      return isComplete ? value : undefined;
    },
    has(word): boolean {
      const {isComplete} = searchTrie(root, word, values);

      return isComplete
    },
    findNearest(word) {
      return searchTrie(root, word, values);
    },
    put(word, value) {
      put(root, word, value, values);
    }
  };
};
