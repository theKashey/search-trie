const searchTrie = (words) => {
  const root = {};
  const put = (node, string, position) => {
    const c = string[position];
    let nextNode = node[c];
    if (!nextNode) {
      nextNode = node[c] = {};
    }
    const next = position + 1;
    if (next < string.length) {
      put(nextNode, string, next)
    }
  };

  const get = (node, string, position) => {
    const c = string[position];
    let nextNode = node[c];
    if (!nextNode) {
      return false;
    }
    const next = position + 1;
    if (next < string.length) {
      return get(nextNode, string, next)
    }
    return true;
  };

  words.forEach(word => put(root, word, 0));

  function contains(word) {
    return get(root, word, 0)
  }

  contains.put = word => put(root, word, 0);
  return contains;
};

export default searchTrie;