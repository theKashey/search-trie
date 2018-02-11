import {expect} from 'chai';

import buildTrie from '../src/index';

describe('trie', () => {
  it('should bind and search', () => {
    const trie1 = buildTrie(['a','b','test','testable']);
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
  });
});
