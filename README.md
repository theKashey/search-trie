search-trie
=====

[![Greenkeeper badge](https://badges.greenkeeper.io/theKashey/search-trie.svg)](https://greenkeeper.io/)

A simple trie structure to perform search on texts in O(n) time, where n - number of characters in searched word.

Super simple, Super fast, and just 45 lines long.
### Trie
Trie is a basic Tree structure, also known as suffix tree.

### Search-trie
Has even more simpler structure, optimized for a single build and a few searches afterwards.
Search-tree does not compact Tree into the "suffix" Tree, speeding up the build process.

## Usage
Build a trie from array of strings, and return a search function.
* searchTrie(string:[]): (string) => boolean;
```js
import buildTrie from 'search-trie';

const searchTrie = build(['first term','second term']);

// partial search
searchTrie('first') === true;
// full search
searchTrie('first term') === true;

// will return false
searchTrie('third term') === false;

// put new word inside
searchTrie.put('third term')
searchTrie('third term') === true;
```

To search __exactly__ for the keyword you provided - add, you know, "." to the end, and thats all.
```js
searchTrie.put('third term.')
searchTrie('third term.') === true;

```

# Licence
MIT