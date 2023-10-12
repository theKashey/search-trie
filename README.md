# search-trie

A simple trie structure to perform prefix search on texts in O(n) time, where n - number of characters in searched word.
> Trie is a basic Tree structure, also known as [prefix tree](https://en.wikipedia.org/wiki/Trie)
Super simple, Super fast, super compact - less then 0.5kb.


### Search-trie

The single purpose of this package is to find longest match between given strings and the search key.
For example:
- given a couple of directories (`/src`, `/src/a`, `/src/b`, `/src/b/c`)
- find the best match for a given file (`/src/b/c/index.tx` -> `/src/b/c`)

## Usage

This package provides two functions to build two different tries:
- `buildCharacterTrie` - to create "per character" trie. Working great if you need to search something in the compressed json (short names)
- `buildWordTrie` - to create trie where "word" is a key. Working great if there are many "long keys", for example directories you want to traverse faster
> one has more smaller nodes, another one has fewer larger ones. It's all about memory locality and algorithm сonvergence. 

They have almost identical API, and if performance matters - you need to benchmark your data to understand which one is more efficient

# Example
```ts
import {buildWordTrie} from 'search-trie';

// map package info into trie
// using word trie as we operate with directory names
const trie = buildWordTrie(
    packages.map(pkg => ({key: pkg.dir.split(path.sep), value: pkg})
);
    
// it's always possible to insert new data. But `delete` operation is not defined    
trie.put({key:'another/package', value: pkg})

// find longest (nearest to the search key) package. It will be a package containing this file
const getOwnerPackage = (fileName) => trie.findNearest(fileName).value;
```

# Used in
- [proxy-equal](https://github.com/theKashey/proxyequal/blob/c0e167b932eb948f9b3fb15b0a56b40e492413bb/src/objectTrie.js) uses `buildCharacterTrie` to understand factual usage of an object.
- [eslint-plugin-relations](https://github.com/theKashey/eslint-plugin-relations/blob/b80d8a4a6222107d59034bddaa5fe2cb14baab55/src/utils/mapping/mapping.ts#L31) - uses `buildWordTrie` to trim long imports to the nearest allowed
- [idea-exclude](https://github.com/theKashey/idea-exclude/blob/a5f886a8298b909ef08108efd68e348bd0fb7907/src/utils.ts#L10) uses `buildWordTrie` to remove nested directories, ie creating trie containing shortest versions

# Licence

MIT
