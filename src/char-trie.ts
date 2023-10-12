import {EMPTY} from './magic';
import type {EdgeNodes, EdgeValues, SearchTrie, TrieNode} from './types';

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

const getNearest = (node: TrieNode, str: string) => {
    let nextNode;
    let found = '';

    for (const c of str) {
        nextNode = node[c];

        if (!nextNode) {
            return {node, path: found, isComplete: false}
        }

        found+=c;

        node = nextNode;
    }

    return {
        node,
        path: str,
        isComplete: true
    };
};


/**
 * builds a "char" based search trie.
 * Optimized for random inputs with unpredictable variation
 *
 * pros:
 * - more stable speed at large sets
 * - every character matters, you can get the longest prefix available even without value
 *
 * cons:
 * - more operations are required to perform a single search
 *
 * - input: array of {key:string, value}
 */
export const buildCharacterTrie = <T>(
    words: Array<{ key: string; value: T }>,
    edgeDelimiter = '.'
): SearchTrie<string, T> => {
    const root = Object.create(EMPTY);
    const edgeNodes = new Map();
    const values = new WeakMap();

    for (const {key, value} of words) {
        put(root, key, value, edgeNodes, values, edgeDelimiter);
    }

    return {
        has(word) {
            return Boolean(get(root, word));
        },

        findNearest(word) {
            const {node, path, isComplete} = getNearest(root, word);

            return {
                value: values.get(node),
                path,
                isComplete
            };
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
