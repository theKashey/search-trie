import { EMPTY } from './magic';
import { EdgeNodes, EdgeValues, SearchCharTrie, TrieNode } from './types';

const put = (
  node: TrieNode,
  str: string,
  value: any,
  edgeNodes: EdgeNodes,
  values: EdgeValues,
  edgeDelimiter: string
) => {
  let nextNode;
  for (const c of str) {
    nextNode = node[c];
    if (!nextNode) {
      nextNode = node[c] = Object.create(EMPTY);
      if (c === edgeDelimiter) {
        edgeNodes.delete(node);
      }
    }
    node = nextNode;
  }
  edgeNodes.set(node, str);
  values.set(node, value);
  return nextNode;
};

const get = (node: TrieNode, str: string) => {
  let nextNode;
  for (const c of str) {
    nextNode = node[c];
    if (!nextNode) {
      return false;
    }
    node = nextNode;
  }

  return nextNode;
};

/**
 * builds char based search trie
 */
export const buildCharacterTrie = <T>(
  words: Array<{ key: string; value: T }>,
  edgeDelimiter = '.'
): SearchCharTrie<T> => {
  const root = Object.create(EMPTY);
  const edgeNodes = new Map();
  const values = new WeakMap();

  for (const { key, value } of words) {
    put(root, key, value, edgeNodes, values, edgeDelimiter);
  }

  return {
    has(word) {
      return Boolean(get(root, word));
    },
    get(word) {
      const node = get(root, word);
      return node ? values.get(node) : undefined;
    },
    put(word, value) {
      put(root, word, value, edgeNodes, values, edgeDelimiter);
    },
  };
};
