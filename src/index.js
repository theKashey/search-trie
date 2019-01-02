const empty = {};

const put = (node, string, edgeNodes, edgeDelimeter) => {
  let nextNode;
  for (let position = 0; position < string.length; position++) {
    const c = string[position];
    nextNode = node[c];
    if (!nextNode) {
      nextNode = node[c] = Object.create(empty);
      if (c === edgeDelimeter) {
        edgeNodes.delete(node)
      }
    }
    node = nextNode;
  }
  edgeNodes.set(node, string);
  return nextNode;
};

const get = (node, string) => {
  let nextNode;
  for (let position = 0; position < string.length; position++) {
    nextNode = node[string[position]];
    if (!nextNode) {
      return false;
    }
    node = nextNode;
  }

  return !!nextNode;
};

const searchTrie = (words, edgeDelimeter = '.') => {
  const root = Object.create(empty);
  const edgeNodes = new Map();

  words.forEach(word => put(root, word, edgeNodes, edgeDelimeter));

  function contains(word) {
    return get(root, word)
  }

  contains.put = word => put(root, word, edgeNodes, edgeDelimeter);
  contains.edges = edgeNodes;
  return contains;
};

export default searchTrie;