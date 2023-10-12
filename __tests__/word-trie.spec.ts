import { buildWordTrie } from '../src/word-trie';

describe('word trie', () => {
  const buildTrie = (ar: Array<[string, number]>) =>
    buildWordTrie(
      ar.map(([k, v]) => ({
        key: k.split('/'),
        value: v,
      }))
    );

  const trie = buildTrie([
    ['1/2/3', 1],
    ['1/2/33', 2],
    ['1/2/334', 3],
    ['1/2/3345', 4],
    ['1/2/33/45', 5],
  ]);

  const searchTrie = (t: typeof trie, f: string) => {
    const result = t.findNearest(f.split('/'));

    if(!result){

    }

    return {
      path: result.path ? result.path.join('/') : undefined,
      value: result.value,
    };
  };

  it('searches the trie', () => {
    expect(searchTrie(trie, '1/2/3')).toEqual({
      value: 1,
      path: '1/2/3',
    });

    expect(searchTrie(trie, '1/2/33/45')).toEqual({
      value: 5,
      path: '1/2/33/45',
    });
  });

  it('knows values', () => {
    expect(trie.has('1/2/3'.split('/'))).toBe(true);
    expect(trie.has('3/2/1'.split('/'))).toBe(false);
    expect(trie.has('1/2/33/4'.split('/'))).toBe(false);
  })

  it('picks last known value', () => {
    expect(searchTrie(trie, '1/2/33')).toEqual({
      value: 2,
      path: '1/2/33',
    });

    // non-existing path
    expect(searchTrie(trie, '1/2/333')).toEqual({
      value: undefined,
      path: '',
    });

    expect(searchTrie(trie, '1/2/334')).toEqual({
      value: 3,
      path: '1/2/334',
    });
  });
});
