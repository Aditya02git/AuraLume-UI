import React, { useState, useRef, useEffect } from 'react';
import { Button, Dialog, } from '../../src';

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

const DialogSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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

const DialogSection = ({isDarkMode, setIsDarkMode}) => {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [userData, setUserData] = useState({});
  const [settingsData, setSettingsData] = useState({});

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

  const sectionStyle = {
    padding: '32px',
    backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  };

// Replace these JSX string variables in your code:

const defaultDialogJSX = `<div style={{"--background-blur": '0px', "--background-overlay": 'transparent', "--background-color-light": 'yellow'}}>
  <Dialog
    ref={dialogRef}
    trigger={<Button variant='primary' size='small'>Default Dialog</Button>}
    title="Delete task?"
    className={isDarkMode ? 'dialog-dark' : 'dialog-light'}
  >
    <p>
      Deleting this task will remove it permanently. Any associated files,
      comments, and subtasks will also be deleted. Are you sure you want to proceed?
    </p>

    <div style={{
      display: 'flex',
      justifyContent: 'flex-end', 
      gap: '0.5rem', 
      marginTop: '1.5rem' 
    }}>
      <Button size='small' variant='primary' onClick={onDelete}>Confirm</Button>
      <Button size='small' variant='secondary' onClick={handleSomething}>Cancel</Button>
    </div>
  </Dialog>
</div>`;

const defaultBlurDialogJSX = `<Dialog
  ref={dialogRef}
  trigger={<Button variant='primary' size='small'>Default Dialog</Button>}
  title="Delete task?"
  className={isDarkMode ? 'dialog-dark' : 'dialog-light'}
>
  <p>
    Deleting this task will remove it permanently. Any associated files,
    comments, and subtasks will also be deleted. Are you sure you want to proceed?
  </p>

  <div style={{
    display: 'flex',
    justifyContent: 'flex-end', 
    gap: '0.5rem', 
    marginTop: '1.5rem' 
  }}>
    <Button size='small' variant='primary' onClick={onDelete}>Confirm</Button>
    <Button size='small' variant='secondary' onClick={handleSomething}>Cancel</Button>
  </div>
</Dialog>`;

const crossDialogJSX = `<Dialog
  variant="cross"
  trigger={<Button variant='primary'>Dialog with Cross</Button>}
  title="Information"
  className={isDarkMode ? 'dialog-dark' : 'dialog-light'}
  onClose={() => console.log('Dialog closed!')}
>
  <p>This dialog can only be closed using the X button in the top right corner.</p>
</Dialog>`;

const autoDialogJSX = `<Dialog
  id="auto-dialog"
  variant="auto-close"
  trigger={<button className="btn primary">Auto-close Dialog</button>}
  title="Success!"
  className={isDarkMode ? 'dialog-dark' : 'dialog-light'}
  onClose={() => console.log('Auto-close dialog closed!')}
  autoCloseDelay={5000} // 5 seconds
>
  <p>This dialog will automatically close in a few seconds. You can also close it manually.</p>
</Dialog>`;

  const dialogRef = useRef();
    const handleSomething = () => {
    // Close the dialog programmatically
    dialogRef.current?.close();
  };
  const onDelete = () => {
    alert("Deleted Successfully.");
    dialogRef.current?.close();
  }

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
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Prop
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Type
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Default
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {[
          { prop: "id", type: "string", default: "undefined", desc: "Unique identifier for the dialog." },
          { prop: "trigger", type: "ReactNode", default: "undefined", desc: "Element that triggers opening of the dialog." },
          { prop: "title", type: "string", default: "undefined", desc: "Title text displayed at the top of the dialog." },
          { prop: "children", type: "ReactNode", default: "undefined", desc: "Content inside the dialog body." },
          { prop: "variant", type: "string", default: "'default'", desc: "Defines visual style of the dialog — e.g., 'default', 'info', 'danger'." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class applied to the dialog container." },
          { prop: "width", type: "string | number", default: "undefined", desc: "Width of the dialog (accepts px, %, or rem)." },
          { prop: "onClose", type: "function", default: "undefined", desc: "Callback function triggered when the dialog closes." },
          { prop: "autoCloseDelay", type: "number", default: "3000", desc: "Time in milliseconds after which the dialog automatically closes (if set)." },
          { prop: "...props", type: "object", default: "{}", desc: "Additional props spread to the dialog container." },
          { prop: "ref", type: "React.Ref", default: "-", desc: "Forwarded ref for accessing the dialog element." },
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

    <div>
     
      <DialogSectionWithPreview
        title="Default Confirm Dialog"
        jsxCode={defaultDialogJSX}
        isDarkMode={isDarkMode}
      >
      <div style={sectionStyle}>
        <div style={{"--background-blur" : '0px', "--background-overlay": 'transparent'}}>
        <Dialog
          ref={dialogRef}
          trigger={<Button variant='primary' size='small'>Default Dialog</Button>}
          title="Delete task?"
          theme={isDarkMode ? 'dialog-dark' : 'dialog-light'}
          bgOverlay='none'
        >
          <p>
            Deleting this task will remove it permanently. Any associated files,
            comments, and subtasks will also be deleted. Are you sure you want to proceed?
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end', 
            gap: '0.5rem', 
            marginTop: '1.5rem' 
          }}>
            <Button size='small' variant='primary' onClick={onDelete}>Confirm</Button>
            <Button size='small' variant='secondary' onClick={handleSomething}>Cancel</Button>
          </div>
        </Dialog>
        </div>
      </div>
      </DialogSectionWithPreview>

      <DialogSectionWithPreview
        title="Default Confirm Dialog With Blur Overlay"
        jsxCode={defaultBlurDialogJSX}
        isDarkMode={isDarkMode}
      >
      <div style={sectionStyle}>
        <Dialog
          ref={dialogRef}
          trigger={<Button variant='primary' size='small'>Default Dialog</Button>}
          title="Delete task?"
          theme={isDarkMode ? 'dialog-dark' : 'dialog-light'}
          bgBlur='8px'
        >
          <p>
            Deleting this task will remove it permanently. Any associated files,
            comments, and subtasks will also be deleted. Are you sure you want to proceed?
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end', 
            gap: '0.5rem', 
            marginTop: '1.5rem' 
          }}>
            <Button size='small' variant='primary' onClick={onDelete}>Confirm</Button>
            <Button size='small' variant='secondary' onClick={handleSomething}>Cancel</Button>
          </div>
        </Dialog>
      </div>
      </DialogSectionWithPreview>



      <DialogSectionWithPreview
        title="Dialog with Cross Button"
        jsxCode={crossDialogJSX}
        isDarkMode={isDarkMode}
      >
        <div style={sectionStyle}>

      {/* Dialog with Cross Button */}
      <Dialog
        variant="cross"
        trigger={<Button variant='primary' size='small'>Dialog with Cross</Button>}
        title="Information"
        theme={isDarkMode ? 'dialog-dark' : 'dialog-light'}
        onClose={() => console.log('Dialog closed!')}
      >
        <p>This dialog can only be closed using the X button in the top right corner.</p>
      </Dialog>
      </div>
      </DialogSectionWithPreview>



      <DialogSectionWithPreview
        title="Auto-close Dialog"
        jsxCode={autoDialogJSX}
        isDarkMode={isDarkMode}
      >
      <div style={sectionStyle}>
      {/* Dialog with Cross Button */}
      <Dialog
        id="auto-dialog"
        variant="auto-close"
        trigger={<Button variant='primary' size='small'>Auto-close Dialog</Button>}
        title="Success!"
        theme={isDarkMode ? 'dialog-dark' : 'dialog-light'}
        onClose={() => console.log('Auto-close dialog closed!')}
        autoCloseDelay={5000} // 5 seconds
      >
        <p>This dialog will automatically close in a few seconds. You can also close it manually.</p>
      </Dialog>
      </div>
      </DialogSectionWithPreview>
    </div>
    </div>
  );
};

export default DialogSection;