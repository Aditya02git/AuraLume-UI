import React, { useState, useEffect } from 'react';
import Dropdown from '../../src/components/Dropdown';

// Preview Toggle Component
const PreviewToggle = ({ activeTab, onTabChange, isDarkMode }) => {
  const tabs = ['Preview', 'TSX/JSX'];
  
  return (
    <div style={{ 
      display: 'flex', 
      gap: '4px', 
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
      padding: '4px', 
      borderRadius: '8px',
      marginBottom: '16px',
      width: 'fit-content'
    }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: activeTab === tab ? '#e33de0' : 'transparent',
            color: activeTab === tab ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'),
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Code Display Component
const CodeDisplay = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      position: 'relative', 
      backgroundColor: '#1e293b', 
      borderRadius: '8px', 
      overflow: 'hidden',
      marginBottom: '16px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#334155',
        borderBottom: '1px solid #475569'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          </div>
          <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', marginLeft: '8px' }}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            padding: '6px 12px',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {copied ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg style={{color: '#43eb34'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
          </svg><p>Copied</p></div>
            : <div title='Copy'><svg style={{color: '#bdbdbd'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clip-rule="evenodd"/>
          </svg></div>
          }
        </button>
      </div>
      <pre style={{ 
        padding: '16px', 
        margin: 0, 
        color: '#e2e8f0', 
        fontSize: '14px',
        lineHeight: '1.5',
        overflow: 'auto'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const SwitchSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Preview');

  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ 
        marginBottom: '2rem', 
        color: isDarkMode ? '#ffffff' : '#000000', 
        fontSize: '24px', 
        fontWeight: 'bold' 
      }}>
        {title}
      </h2>
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode}/>
      
      {activeTab === 'Preview' && (
        <div style={{
          padding: '32px',
          backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          transition: 'all 0.3s ease'
        }}>
          {children}
        </div>
      )}
      
      {activeTab === 'TSX/JSX' && (
        <CodeDisplay code={jsxCode} language="TSX/JSX" />
      )}
    </section>
  );
};

const DropdownSection = ({isDarkMode, setIsDarkMode}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedMultiItems, setSelectedMultiItems] = useState([]);

  // Simple dropdown options
  const socialOptions = [
    { label: 'Facebook', href: '#', onClick: () => console.log('Facebook clicked') },
    { label: 'Instagram', href: '#', onClick: () => console.log('Instagram clicked') },
    { label: 'LinkedIn', href: '#', onClick: () => console.log('LinkedIn clicked') }
  ];

  // Select dropdown options
  const clothingOptions = [
    { label: 'Shoes', value: 'shoes' },
    { label: 'Shirts', value: 'shirts' },
    { label: 'Pants', value: 'pants' },
    { label: 'Jackets', value: 'jackets' }
  ];

  // Multi-select dropdown options
  const multiOptions = [
    { label: 'Option A', value: 'optionA' },
    { label: 'Option B', value: 'optionB' },
    { label: 'Option C', value: 'optionC' },
    { label: 'Option D', value: 'optionD' }
  ];

  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    background: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  // Dropdown JSX examples
  const simpleDropdownJSX = `import React from 'react';
import Dropdown from './Dropdown';

const SimpleDropdownExample = () => {
  const socialOptions = [
    { label: 'Facebook', onClick: () => console.log('Facebook') },
    { label: 'Instagram', onClick: () => console.log('Instagram') },
    { label: 'LinkedIn', onClick: () => console.log('LinkedIn') }
  ];

  return (
    <Dropdown
      type="simple"
      placeholder="Social"
      options={socialOptions}
      width="12rem"
      className={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
    />
  );
};`;

  const selectDropdownJSX = `import React, { useState } from 'react';
import Dropdown from './Dropdown';

const SelectDropdownExample = () => {
  const [selectedItem, setSelectedItem] = useState('');
  
  const clothingOptions = [
    { label: 'Shoes', value: 'shoes' },
    { label: 'Shirts', value: 'shirts' },
    { label: 'Pants', value: 'pants' },
    { label: 'Jackets', value: 'jackets' }
  ];

  return (
    <Dropdown
      type="select"
      label="Choose one"
      placeholder="Select item..."
      options={clothingOptions}
      value={selectedItem}
      onChange={setSelectedItem}
      width="14rem"
      className={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
    />
  );
};`;

  const multiSelectDropdownJSX = `import React, { useState } from 'react';
import Dropdown from './Dropdown';

const MultiSelectDropdownExample = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  
  const multiOptions = [
    { label: 'Option A', value: 'optionA' },
    { label: 'Option B', value: 'optionB' },
    { label: 'Option C', value: 'optionC' },
    { label: 'Option D', value: 'optionD' }
  ];

  return (
    <Dropdown
      type="multi"
      label="Select multiple"
      placeholder="Choose options..."
      options={multiOptions}
      value={selectedItems}
      onChange={setSelectedItems}
      width="16rem"
      className={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
    />
  );
};`;

  return (
    <div>
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
          borderRadius: "12px",
          border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
          overflow: "hidden",
          marginBottom: "25px"
        }}
      >
        <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: isDarkMode ? "#334155" : "#f8fafc",
                borderBottom: "1px solid #bababa"
              }}
            >
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Prop</th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Type</th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Default</th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
          { prop: "type", type: "string", default: "'simple'", desc: "Defines dropdown style — e.g., 'simple' or 'searchable'." },
          { prop: "label", type: "string", default: "undefined", desc: "Optional label displayed above the dropdown." },
          { prop: "placeholder", type: "string", default: "'Choose one'", desc: "Text displayed when no option is selected." },
          { prop: "options", type: "array", default: "[]", desc: "Array of dropdown options. Each option can be an object with 'label' and 'value'." },
          { prop: "value", type: "string | number | object", default: "undefined", desc: "Currently selected option value." },
          { prop: "onChange", type: "function", default: "undefined", desc: "Callback triggered when an option is selected, returning the selected value." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for the dropdown container." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables user interaction when set to true." },
          { prop: "width", type: "string", default: "'14rem'", desc: "Sets the dropdown width (accepts CSS units like px, rem, %)." },
          { prop: "color", type: "string", default: "'#87CEEB'", desc: "Defines the accent or highlight color of the dropdown." },
          { prop: "...props", type: "object", default: "{}", desc: "Additional props passed to the root dropdown element." },
        ].map((row, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: `1px solid ${isDarkMode ? "#475569" : "#e2e8f0"}`,
                  backgroundColor:
                    index % 2 === 0
                      ? "transparent"
                      : isDarkMode
                      ? "#1e293b50"
                      : "#f8fafc50",
                }}
              >
                <td
                  style={{
                    padding: "16px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#fbbf24" : "#d97706",
                  }}
                >
                  {row.prop}
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#8b5cf6" : "#7c3aed",
                  }}
                >
                  {row.type}
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#06b6d4" : "#0891b2",
                  }}
                >
                  {row.default}
                </td>
                <td style={{ padding: "16px" }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      {/* Simple Dropdown */}
      <SwitchSectionWithPreview
        title="Simple Dropdown"
        jsxCode={simpleDropdownJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <Dropdown
            type="simple"
            placeholder="Social"
            options={socialOptions}
            width="12rem"
            className={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
          />
        </div>
      </SwitchSectionWithPreview>

      {/* Select Dropdown */}
      <SwitchSectionWithPreview
        title="Select Dropdown"
        jsxCode={selectDropdownJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <Dropdown
            type="select"
            label="Choose one"
            placeholder="Select item..."
            options={clothingOptions}
            value={selectedItem}
            onChange={setSelectedItem}
            width="14rem"
            className={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
          />
        </div>
      </SwitchSectionWithPreview>

      {/* Multi-Select Dropdown */}
      <SwitchSectionWithPreview
        title="Multi-Select Dropdown"
        jsxCode={multiSelectDropdownJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <Dropdown
            type="multi"
            label="Select multiple"
            placeholder="Choose options..."
            options={multiOptions}
            value={selectedMultiItems}
            onChange={setSelectedMultiItems}
            width="16rem"
            className={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
          />
        </div>
      </SwitchSectionWithPreview>

      {/* Disabled Dropdown */}
      <SwitchSectionWithPreview
        title="Disabled Dropdown"
        jsxCode={selectDropdownJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <Dropdown
            type="select"
            label="Disabled dropdown"
            placeholder="Can't select"
            options={clothingOptions}
            disabled={true}
            width="14rem"
            className={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
          />
        </div>
      </SwitchSectionWithPreview>

      {/* Selected Values Display */}
      <SwitchSectionWithPreview
        title="Selected Values"
        jsxCode={`<div>
  <p>Selected item: {selectedItem}</p>
  <p>Selected multi items: {selectedMultiItems.join(', ')}</p>
</div>`}
isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: isDarkMode ? '#334155' : '#f1f5f9', 
            borderRadius: '8px',
            minWidth: '300px',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Selected item:</strong> {selectedItem || 'None'}
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Selected multi items:</strong> {selectedMultiItems.length > 0 ? selectedMultiItems.join(', ') : 'None'}
            </p>
          </div>
        </div>
      </SwitchSectionWithPreview>
    </div>
  );
};

export default DropdownSection;