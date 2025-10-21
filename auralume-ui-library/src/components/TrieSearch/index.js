// TrieSearch Component Export
import TrieSearch from './TrieSearch.jsx';
import './TrieSearch.css';

export default TrieSearch;

// Named export for convenience
export { TrieSearch };

// Export the Trie class separately if needed
export class Trie {
  constructor() {
    this.nodes = {};
    this.length = 1;
  }

  getLength() {
    return this.length;
  }

  insert(word) {
    let node = this.nodes;
    word = word.split("").map(e => e.toUpperCase());
    let idx = 0;
    let newWord = false;
    
    while (idx < word.length) {
      if (node[word[idx]]) {
        node = node[word[idx]];
      } else {
        newWord = true;
        node[word[idx]] = {};
        node = node[word[idx]];
      }
      if (idx === word.length - 1) {
        node.end = true;
      }
      idx++;
    }
    
    if (newWord) {
      this.length++;
    }
  }

  delete(word) {
    let findWord = this.search(word);
    if (!findWord) return false;
    
    if (findWord.result.end) {
      delete findWord.result.end;
    }
    
    if (findWord.lastEnd) {
      const key = findWord.lastEnd.key;
      delete findWord.lastEnd.node[key];
    }
    
    this.length--;
    return true;
  }

  search(word) {
    word = word.split("").map(e => e.toUpperCase());
    let node = this.nodes;
    let lastEnd = null;
    
    for (let i = 0; i < word.length; i++) {
      if (!node[word[i]]) {
        return false;
      } else {
        node = node[word[i]];
        if (Object.keys(node).length > 1 && i !== word.length - 1) {
          lastEnd = { node: node, key: word[i + 1] };
        }
      }
    }
    
    return node.end ? { result: node, lastEnd: lastEnd } : false;
  }

  find(word) {
    return this.search(word) ? true : false;
  }

  getNode(word) {
    word = word.split("").map(e => e.toUpperCase());
    let node = this.nodes;
    
    for (let i = 0; i < word.length; i++) {
      if (!node[word[i]]) {
        return false;
      } else {
        node = node[word[i]];
      }
    }
    
    return node;
  }

  printWords() {
    let wordList = [];
    let word = "";
    this._recursePrint(this.nodes, word, wordList);
    return wordList;
  }

  _recursePrint(node, word, list) {
    let keys = Object.keys(node);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'end') {
        list.push(word);
      } else {
        this._recursePrint(node[keys[i]], word + keys[i], list);
      }
    }
  }

  wildcardFind(query) {
    query = query.replace(/[^a-z*]/gi, '').split("").map(e => e.toUpperCase());
    let wordList = [];
    let word = "";
    this._wildcardRecursePrint(this.nodes, word, wordList, query);
    return wordList;
  }

  _wildcardRecursePrint(node, word, list, query) {
    let idx = word.length;
    if (word.length > query.length) return false;
    
    if (Object.keys(node).includes('end') && word.length === query.length) {
      list.push(word);
    }
    
    let keys = query[idx] === '*' ? Object.keys(node) : [query[idx]];
    for (let i = 0; i < keys.length; i++) {
      if (node[keys[i]] && keys[i] !== 'end') {
        this._wildcardRecursePrint(node[keys[i]], word + keys[i], list, query);
      }
    }
  }

  prefixFind(prefix, desiredLength = null) {
    let wordList = [];
    prefix = prefix.replace(/[^a-z]/gi, '').toUpperCase();
    let prefixNode = this.getNode(prefix);
    
    if (!prefixNode) return wordList;
    
    this._prefixRecursePrint(prefixNode, prefix, wordList, prefix, desiredLength);
    return wordList;
  }

  _prefixRecursePrint(node, word, list, originalPrefix, desiredLength) {
    if (desiredLength && word.length > desiredLength) return false;
    
    if (Object.keys(node).includes('end')) {
      if (!desiredLength) {
        list.push(word);
      } else if (word.length === desiredLength) {
        list.push(word);
      }
    }
    
    let keys = Object.keys(node).filter(key => key !== 'end');
    for (let i = 0; i < keys.length; i++) {
      this._prefixRecursePrint(node[keys[i]], word + keys[i], list, originalPrefix, desiredLength);
    }
  }
}