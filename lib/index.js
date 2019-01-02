'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var empty = {};

var put = function put(node, string, edgeNodes, edgeDelimeter) {
  var nextNode = void 0;
  for (var position = 0; position < string.length; position++) {
    var c = string[position];
    nextNode = node[c];
    if (!nextNode) {
      nextNode = node[c] = Object.create(empty);
      if (c === edgeDelimeter) {
        edgeNodes.delete(node);
      }
    }
    node = nextNode;
  }
  edgeNodes.set(node, string);
  return nextNode;
};

var get = function get(node, string) {
  var nextNode = void 0;
  for (var position = 0; position < string.length; position++) {
    nextNode = node[string[position]];
    if (!nextNode) {
      return false;
    }
    node = nextNode;
  }

  return !!nextNode;
};

var searchTrie = function searchTrie(words) {
  var edgeDelimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

  var root = Object.create(empty);
  var edgeNodes = new Map();

  words.forEach(function (word) {
    return put(root, word, edgeNodes, edgeDelimeter);
  });

  function contains(word) {
    return get(root, word);
  }

  contains.put = function (word) {
    return put(root, word, edgeNodes, edgeDelimeter);
  };
  contains.edges = edgeNodes;
  return contains;
};

exports.default = searchTrie;