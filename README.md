# search-trie

A simple trie structure to perform search on texts in O(n) time, where n - number of characters in searched word.

Super simple, Super fast, and just 45 lines long.

### Trie

Trie is a basic Tree structure, also known as suffix tree.

### Search-trie

Has even more simpler structure, optimized for a single build and a few searches afterwards.
Search-tree does not compact Tree into the "suffix" Tree, speeding up the build process.

## Usage

- `buildCharacterTrie` - creates per "character" search.
- `buildWordTrie` - creates per "word" search

# Licence

MIT
