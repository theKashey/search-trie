import { EMPTY } from './magic';
import { EdgeValues, SearchWordTrie, TrieNode } from './types';

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

export const searchTrie = (trie: TrieNode, paths: string[], values: EdgeValues) => {
  let node = trie;
  let lastValue;
  let lastValuePath = -1;
  const valuePath = [];

  for (let i = 0; i < paths.length; ++i) {
    node = node[paths[i]];
    if (!node) {
      break;
    }
    valuePath.push(paths[i]);
    const value = values.get(node);
    if (value !== undefined) {
      lastValue = value;
      lastValuePath = i;
    }
  }

  return {
    value: lastValue,
    path: valuePath.slice(0, lastValuePath + 1),
  };
};

/**
 * builds a word based search trie
 */
export const buildWordTrie = <T>(lines: Array<{ key: string[]; value: T }>): SearchWordTrie<T> => {
  const root = Object.create(EMPTY);
  const values = new WeakMap();

  for (const { key, value } of lines) {
    put(root, key, value, values);
  }

  return {
    findNearest(word) {
      return searchTrie(root, word, values);
    },
    put(word, value) {
      put(root, word, value, values);
    },
  };
};
