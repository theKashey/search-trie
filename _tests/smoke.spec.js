import {expect} from 'chai';

import buildTrie from '../src/index';

describe('trie', () => {
  it('should bind and search', () => {
    const trie1 = buildTrie(['a', 'b', 'test', 'testable', 'testable.stuff']);
    expect(Array.from(trie1.edges.values())).to.be.deep.equal(['a', 'b', 'test', 'testable.stuff']);

    expect(trie1('a')).to.be.true;
    expect(trie1('b')).to.be.true;
    expect(trie1('c')).to.be.false;

    expect(trie1('test')).to.be.true;
    expect(trie1('testa')).to.be.true;
    expect(trie1('testab')).to.be.true;
    expect(trie1('testable')).to.be.true;

    expect(trie1('missed word')).to.be.false;
    trie1.put('missed word')
    expect(trie1('missed word')).to.be.true;
    trie1.put('testable.stuff.1');
    trie1.put('testable.st');

    expect(Array.from(trie1.edges.values())).to.be.deep.equal([
      "a",
      "b",
      "test",
      "missed word",
      "testable.stuff.1",
      "testable.st",
    ]);
  });
});
