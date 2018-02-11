"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var searchTrie = function searchTrie(words) {
  var root = {};
  var put = function put(node, string, position) {
    var c = string[position];
    var nextNode = node[c];
    if (!nextNode) {
      nextNode = node[c] = {};
    }
    var next = position + 1;
    if (next < string.length) {
      put(nextNode, string, next);
    }
  };

  var get = function get(node, string, position) {
    var c = string[position];
    var nextNode = node[c];
    if (!nextNode) {
      return false;
    }
    var next = position + 1;
    if (next < string.length) {
      return get(nextNode, string, next);
    }
    return true;
  };

  words.forEach(function (word) {
    return put(root, word, 0);
  });

  function contains(word) {
    return get(root, word, 0);
  }

  contains.put = function (word) {
    return put(root, word, 0);
  };
  return contains;
};

exports.default = searchTrie;