import React, { useState, useRef, useEffect, useId } from 'react';
import './ComboBox.css';

// Action constants
const SelectActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Select: 9,
  Type: 10,
};

// Helper functions
function filterOptions(options = [], filter, exclude = []) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

function getActionFromKey(event, menuOpen) {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
  
  if (!menuOpen && openKeys.includes(key)) {
    return SelectActions.Open;
  }

  if (key === 'Home') {
    return SelectActions.First;
  }
  if (key === 'End') {
    return SelectActions.Last;
  }

  if (
    key === 'Backspace' ||
    key === 'Clear' ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  ) {
    return SelectActions.Type;
  }

  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return SelectActions.CloseSelect;
    } else if (key === 'ArrowDown' && !altKey) {
      return SelectActions.Next;
    } else if (key === 'ArrowUp') {
      return SelectActions.Previous;
    } else if (key === 'PageUp') {
      return SelectActions.PageUp;
    } else if (key === 'PageDown') {
      return SelectActions.PageDown;
    } else if (key === 'Escape') {
      return SelectActions.Close;
    } else if (key === 'Enter' || key === ' ') {
      return SelectActions.CloseSelect;
    }
  }
}

function getIndexByLetter(options, filter, startIndex = 0) {
  const orderedOptions = [
    ...options.slice(startIndex),
    ...options.slice(0, startIndex),
  ];
  const firstMatch = filterOptions(orderedOptions, filter)[0];
  const allSameLetter = (array) => array.every((letter) => letter === array[0]);

  if (firstMatch) {
    return options.indexOf(firstMatch);
  } else if (allSameLetter(filter.split(''))) {
    const matches = filterOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  } else {
    return -1;
  }
}

function getUpdatedIndex(currentIndex, maxIndex, action) {
  const pageSize = 10;

  switch (action) {
    case SelectActions.First:
      return 0;
    case SelectActions.Last:
      return maxIndex;
    case SelectActions.Previous:
      return Math.max(0, currentIndex - 1);
    case SelectActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    case SelectActions.PageUp:
      return Math.max(0, currentIndex - pageSize);
    case SelectActions.PageDown:
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
}

function isElementInView(element) {
  const bounding = element.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

function maintainScrollVisibility(activeElement, scrollParent) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}

const ComboBox = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Choose an option",
  className = "",
  disabled = false,
  id: propId,
  ...props
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchString, setSearchString] = useState('');
  
  const comboRef = useRef(null);
  const listboxRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const ignoreBlurRef = useRef(false);

  // Initialize selected index based on value
  useEffect(() => {
    if (value !== undefined) {
      const index = options.indexOf(value);
      setSelectedIndex(index);
      setActiveIndex(index >= 0 ? index : 0);
    }
  }, [value, options]);

  const getSearchString = (char) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchString('');
    }, 500);

    const newSearchString = searchString + char;
    setSearchString(newSearchString);
    return newSearchString;
  };

  const handleComboBlur = () => {
    if (ignoreBlurRef.current) {
      ignoreBlurRef.current = false;
      return;
    }

    if (isOpen) {
      selectOption(activeIndex);
      setIsOpen(false);
    }
  };

  const handleComboClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleComboKeyDown = (event) => {
    if (disabled) return;

    const max = options.length - 1;
    const action = getActionFromKey(event, isOpen);

    switch (action) {
      case SelectActions.Last:
      case SelectActions.First:
        setIsOpen(true);
      // intentional fallthrough
      case SelectActions.Next:
      case SelectActions.Previous:
      case SelectActions.PageUp:
      case SelectActions.PageDown:
        event.preventDefault();
        const newIndex = getUpdatedIndex(activeIndex, max, action);
        setActiveIndex(newIndex);
        return;
      case SelectActions.CloseSelect:
        event.preventDefault();
        selectOption(activeIndex);
      // intentional fallthrough
      case SelectActions.Close:
        event.preventDefault();
        setIsOpen(false);
        return;
      case SelectActions.Type:
        handleComboType(event.key);
        return;
      case SelectActions.Open:
        event.preventDefault();
        setIsOpen(true);
        return;
    }
  };

  const handleComboType = (letter) => {
    setIsOpen(true);

    const searchStr = getSearchString(letter);
    const searchIndex = getIndexByLetter(options, searchStr, activeIndex + 1);

    if (searchIndex >= 0) {
      setActiveIndex(searchIndex);
    } else {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      setSearchString('');
    }
  };

  const selectOption = (index) => {
    setSelectedIndex(index);
    setActiveIndex(index);
    
    if (onChange && options[index]) {
      onChange(options[index], index);
    }
  };

  const handleOptionClick = (index) => {
    setActiveIndex(index);
    selectOption(index);
    setIsOpen(false);
  };

  const handleOptionMouseDown = () => {
    ignoreBlurRef.current = true;
  };

  // Update scroll visibility when active index changes
  useEffect(() => {
    if (isOpen && listboxRef.current) {
      const options = listboxRef.current.querySelectorAll('[role=option]');
      const activeOption = options[activeIndex];
      
      if (activeOption) {
        if (isScrollable(listboxRef.current)) {
          maintainScrollVisibility(activeOption, listboxRef.current);
        }

        if (!isElementInView(activeOption)) {
          activeOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  }, [activeIndex, isOpen]);

  // Scroll combobox into view when closed
  useEffect(() => {
    if (!isOpen && comboRef.current && !isElementInView(comboRef.current)) {
      comboRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isOpen]);

  const displayValue = selectedIndex >= 0 ? options[selectedIndex] : placeholder;
  const comboId = `combo-${id}`;
  const listboxId = `listbox-${id}`;
  const labelId = label ? `${comboId}-label` : undefined;

  return (
    <div className={`combo-wrapper ${className}`}>
      {label && (
        <label id={labelId} className="combo-label">
          {label}
        </label>
      )}
      <div className={`combo ${isOpen ? 'open' : ''}`}>
        <div
          ref={comboRef}
          id={comboId}
          role="combobox"
          className="combo-input"
          tabIndex={disabled ? -1 : 0}
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          aria-activedescendant={isOpen ? `${comboId}-${activeIndex}` : ''}
          onBlur={handleComboBlur}
          onClick={handleComboClick}
          onKeyDown={handleComboKeyDown}
          {...props}
        >
          {displayValue}
        </div>
        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          className="combo-menu"
          aria-labelledby={labelId}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <div
              key={index}
              id={`${comboId}-${index}`}
              role="option"
              className={`combo-option ${index === activeIndex ? 'option-current' : ''}`}
              aria-selected={index === selectedIndex}
              onClick={() => handleOptionClick(index)}
              onMouseDown={handleOptionMouseDown}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComboBox;