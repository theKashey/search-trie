import { buildCharacterTrie } from '../src/char-trie';

describe('trie', () => {
  it('should bind and search', () => {
    const keys = ['a', 'b', 'test', 'testable', 'testable.stuff'];

    const trie1 = buildCharacterTrie(
      keys.map((key) => ({
        key,
        value: key,
      }))
    );
    // expect(Array.from(trie1.edges.values())).toStrictEqual(['a', 'b', 'test', 'testable.stuff']);

    expect(trie1.has('a')).toBe(true);
    expect(trie1.get('a')).toBe('a');
    expect(trie1.get('b')).toBe('b');
    expect(trie1.get('c')).toBe(undefined);

    expect(trie1.has('test')).toBe(true);
    expect(trie1.has('testa')).toBe(true);
    expect(trie1.has('testab')).toBe(true);
    expect(trie1.has('testabl')).toBe(true);
    expect(trie1.has('testable')).toBe(true);

    expect(trie1.get('testa')).toBe(undefined);
    expect(trie1.get('testab')).toBe(undefined);
    expect(trie1.get('testable')).toBe('testable');

    expect(trie1.findNearest('testable stuff').path).toBe('testable');
    expect(trie1.findNearest('testable stuff').isComplete).toBe(false);
    expect(trie1.findNearest('testable').isComplete).toBe(true);
    expect(trie1.findNearest('testable').value).toBe('testable');

    expect(trie1.findNearest('testabl').isComplete).toBe(true);
    expect(trie1.findNearest('testabl').value).toBe(undefined);

    expect(trie1.has('missed word')).toBe(false);
    trie1.put('missed word', '42');
    expect(trie1.has('missed word')).toBe(true);
    // trie1.put('testable.stuff.1', '42');
    // trie1.put('testable.st', '42');

    // expect(Array.from(trie1.edges.values())).toStrictEqual([
    //   "a",
    //   "b",
    //   "test",
    //   "missed word",
    //   "testable.stuff.1",
    //   "testable.st",
    // ]);
  });
});
