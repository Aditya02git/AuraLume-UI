import React, { useState, useEffect, useRef } from 'react';
import './TrieSearch.css';

// Trie Data Structure Implementation
class Trie {
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

const TrieSearch = ({
  data = [],
  placeholder = "Enter word to search",
  maxResults = 50,
  showStats = true,
  searchMode = 'prefix', // 'prefix', 'wildcard', 'exact'
  onResultSelect = null,
  className = '',
  debounceMs = 100,
  caseSensitive = false,
  theme = 'search-light', // 'search-light' or 'search-dark'
  color = '#e33de0' // Accent color for focus and bar
}) => {
  const [trie] = useState(() => new Trie());
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ totalWords: 0, searchTime: 0, avgSearchTime: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const searchTimesRef = useRef([]);
  const debounceRef = useRef(null);

  // Initialize trie with data
  useEffect(() => {
    if (data.length > 0) {
      const start = performance.now();
      data.forEach(word => {
        if (typeof word === 'string' && word.trim()) {
          trie.insert(word.trim());
        }
      });
      const end = performance.now();
      
      setStats(prev => ({
        ...prev,
        totalWords: trie.getLength(),
        initTime: end - start
      }));
      setIsInitialized(true);
    }
  }, [data, trie]);

  // Debounced search function
  const performSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const start = performance.now();
    let searchResults = [];

    switch (searchMode) {
      case 'wildcard':
        searchResults = trie.wildcardFind(searchQuery);
        break;
      case 'exact':
        const found = trie.find(searchQuery);
        searchResults = found ? [searchQuery.toUpperCase()] : [];
        break;
      case 'prefix':
      default:
        searchResults = trie.prefixFind(searchQuery);
        break;
    }

    const end = performance.now();
    const searchTime = end - start;
    
    if (searchTime > 0 && searchResults.length > 0) {
      searchTimesRef.current.push(searchTime / searchResults.length);
      if (searchTimesRef.current.length > 100) {
        searchTimesRef.current = searchTimesRef.current.slice(-50);
      }
    }

    const avgSearchTime = searchTimesRef.current.length > 0 
      ? searchTimesRef.current.reduce((a, b) => a + b, 0) / searchTimesRef.current.length 
      : 0;

    setResults(searchResults.slice(0, maxResults));
    setStats(prev => ({
      ...prev,
      searchTime,
      avgSearchTime,
      resultCount: searchResults.length
    }));
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, debounceMs);
  };

  // Handle result selection
  const handleResultClick = (result) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    setQuery(result);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setStats(prev => ({ ...prev, searchTime: 0, resultCount: 0 }));
  };

  return (
    <div 
      className={`trie-search-container ${theme} ${className}`}
      style={{
        '--trie-accent-color': color,
        '--trie-accent-color-light': `${color}1a` // 10% opacity
      }}
    >
      <div className="trie-search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="trie-search-input"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="trie-search-clear"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {showStats && isInitialized && (
        <div className="trie-search-stats">
          {stats.resultCount !== undefined ? (
            <>
              Found {stats.resultCount} words in {stats.searchTime.toFixed(2)} ms
              {searchTimesRef.current.length > 0 && (
                <> (avg: {stats.avgSearchTime.toFixed(3)} ms/word)</>
              )}
            </>
          ) : (
            `Loaded ${stats.totalWords} words in ${stats.initTime?.toFixed(2)} ms`
          )}
        </div>
      )}

      <div className="trie-search-results">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div
              key={`${result}-${index}`}
              className="trie-search-result-item"
              onClick={() => handleResultClick(result)}
            >
              {caseSensitive ? result : result.toLowerCase()}
            </div>
          ))
        ) : (
          query && isInitialized && (
            <div className="trie-search-no-results">
              No results found for "{query}"
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TrieSearch;