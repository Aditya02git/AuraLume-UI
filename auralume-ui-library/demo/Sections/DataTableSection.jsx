import React, { useState, useEffect } from 'react';
import DataTable from '../../src/components/DataTable';

// Create DataTableUtils since it's referenced but not imported
const DataTableUtils = {
  formatCurrency: (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(value);
  },

  createAvatarRenderer: (nameKey, avatarKey) => (value, row) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <img 
        src={row[avatarKey] || `https://ui-avatars.com/api/?name=${encodeURIComponent(row[nameKey])}&background=3b82f6&color=fff`}
        alt={row[nameKey]}
        style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
      <span style={{ fontWeight: '500' }}>{row[nameKey]}</span>
    </div>
  ),

  createStatusRenderer: (statusConfig) => (value, row) => {
    const config = statusConfig[value] || { className: 'status-default', icon: 'fas fa-circle' };
    return (
      <span className={`status-badge ${config.className}`}>
        {config.icon && <i className={config.icon}></i>}
        {value}
      </span>
    );
  },

  createActionsRenderer: (actions) => (value, row) => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick(row);
          }}
          style={{
            padding: '0.25rem 0.5rem',
            border: '1px solid',
            borderRadius: '0.25rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            ...action.style
          }}
          title={action.label}
        >
          {action.icon && <i className={action.icon}></i>}
          {action.label}
        </button>
      ))}
    </div>
  )
};

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
      width: 'fit-content',
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
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Fallback for environments where clipboard API isn't available
      console.log('Code to copy:', code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

const TableSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode} />
      
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

const DataTableSection = ({isDarkMode, setIsDarkMode}) => {

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


  // Sample data for examples
  const basicData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'active' }
  ];

  const basicColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  // Icon library data
  const iconData = [
    { id: 1, category: 'UI & Navigation', name: 'Home', icon: 'fas fa-home', usage: 'High', popularity: 95 },
    { id: 2, category: 'UI & Navigation', name: 'Search', icon: 'fas fa-search', usage: 'High', popularity: 92 },
    { id: 3, category: 'UI & Navigation', name: 'Menu', icon: 'fas fa-bars', usage: 'High', popularity: 90 },
    { id: 4, category: 'User & Profile', name: 'User', icon: 'fas fa-user', usage: 'Medium', popularity: 88 },
    { id: 5, category: 'User & Profile', name: 'Users', icon: 'fas fa-users', usage: 'Medium', popularity: 75 }
  ];

  const iconColumns = [
    {
      key: 'icon',
      label: 'Icon',
      sortable: false,
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '20px', color: '#3b82f6', width: '20px' }}>
            {/* Note: FontAwesome icons might not render in this environment */}
            📍
          </span>
          <code style={{ 
            backgroundColor: isDarkMode ? '#374151' : '#f3f4f6', 
            color: isDarkMode ? '#e5e7eb' : '#374151',
            padding: '0.25rem 0.5rem', 
            borderRadius: '0.25rem',
            fontSize: '12px'
          }}>
            {value}
          </code>
        </div>
      )
    },
    { key: 'name', label: 'Name', sortable: true },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => (
        <span style={{
          backgroundColor: value === 'UI & Navigation' ? (isDarkMode ? '#1e3a8a' : '#dbeafe') : (isDarkMode ? '#14532d' : '#dcfce7'),
          color: value === 'UI & Navigation' ? (isDarkMode ? '#93c5fd' : '#1e40af') : (isDarkMode ? '#86efac' : '#166534'),
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'usage',
      label: 'Usage',
      sortable: true,
      render: (value) => {
        const colors = { 'High': '#ef4444', 'Medium': '#f59e0b', 'Low': '#10b981' };
        return <span style={{ color: colors[value] || '#6b7280', fontWeight: '500' }}>{value}</span>;
      }
    },
    {
      key: 'popularity',
      label: 'Popularity',
      sortable: true,
      render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '60px', height: '8px', 
            backgroundColor: isDarkMode ? '#374151' : '#e5e7eb', 
            borderRadius: '4px', overflow: 'hidden'
          }}>
            <div style={{
              width: `${value}%`, height: '100%',
              backgroundColor: value >= 90 ? '#10b981' : value >= 70 ? '#f59e0b' : '#ef4444',
              borderRadius: '4px'
            }}></div>
          </div>
          <span style={{ fontSize: '12px', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>{value}%</span>
        </div>
      )
    }
  ];

  // Advanced user data
  const userData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      department: 'UI & Navigation',
      role: 'Admin',
      status: 'active',
      salary: 75000,
      joinDate: new Date('2022-01-15'),
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'User & Profile',
      role: 'Developer',
      status: 'active',
      salary: 68000,
      joinDate: new Date('2022-03-20'),
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      department: 'UI & Navigation',
      role: 'Designer',
      status: 'inactive',
      salary: 62000,
      joinDate: new Date('2021-11-10'),
      avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=f59e0b&color=fff'
    }
  ];

  const userColumns = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: DataTableUtils.createAvatarRenderer('name', 'avatar')
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => (
        <a href={`mailto:${value}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
          📧 {value}
        </a>
      )
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (value) => {
        const icons = {
          'UI & Navigation': '🧭',
          'User & Profile': '👤'
        };
        return (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{icons[value] || '📁'}</span>
            {value}
          </span>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: DataTableUtils.createStatusRenderer({
        'active': { className: 'status-active', icon: '✅' },
        'inactive': { className: 'status-inactive', icon: '❌' },
        'pending': { className: 'status-pending', icon: '⏳' }
      })
    },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,
      render: (value) => DataTableUtils.formatCurrency(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: DataTableUtils.createActionsRenderer([
        {
          label: 'Edit',
          icon: '✏️',
          onClick: (row) => alert(`Edit user: ${row.name}`),
          style: { color: '#3b82f6', borderColor: '#3b82f6' }
        },
        {
          label: 'Delete',
          icon: '🗑️',
          onClick: (row) => alert(`Delete user: ${row.name}`),
          style: { color: '#ef4444', borderColor: '#ef4444' }
        }
      ])
    }
  ];

  const basicJSX = `
    const basicData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'active' }
  ];

  const basicColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];
  <DataTable 
    data={basicData} 
    columns={basicColumns} 
    theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
  />`;

  const searchJSX = `
      const basicData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'active' }
  ];

  const basicColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];
    <DataTable 
    data={basicData} 
    columns={basicColumns}
    searchable={true}
    pagination={true}
    rowsPerPage={3}
    theme={isDarkMode ? 'datatable-dark' : 'datatable-light'} 
  />`;

  const libraryJSX = `
    const iconData = [
    { id: 1, category: 'UI & Navigation', name: 'Home', icon: 'fas fa-home', usage: 'High', popularity: 95 },
    { id: 2, category: 'UI & Navigation', name: 'Search', icon: 'fas fa-search', usage: 'High', popularity: 92 },
    { id: 3, category: 'UI & Navigation', name: 'Menu', icon: 'fas fa-bars', usage: 'High', popularity: 90 },
    { id: 4, category: 'User & Profile', name: 'User', icon: 'fas fa-user', usage: 'Medium', popularity: 88 },
    { id: 5, category: 'User & Profile', name: 'Users', icon: 'fas fa-users', usage: 'Medium', popularity: 75 }
  ];

  const iconColumns = [
    {
      key: 'icon',
      label: 'Icon',
      sortable: false,
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '20px', color: '#3b82f6', width: '20px' }}>
            {/* Note: FontAwesome icons might not render in this environment */}
            📍
          </span>
          <code style={{ 
            backgroundColor: isDarkMode ? '#374151' : '#f3f4f6', 
            color: isDarkMode ? '#e5e7eb' : '#374151',
            padding: '0.25rem 0.5rem', 
            borderRadius: '0.25rem',
            fontSize: '12px'
          }}>
            {value}
          </code>
        </div>
      )
    },
    { key: 'name', label: 'Name', sortable: true },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => (
        <span style={{
          backgroundColor: value === 'UI & Navigation' ? (isDarkMode ? '#1e3a8a' : '#dbeafe') : (isDarkMode ? '#14532d' : '#dcfce7'),
          color: value === 'UI & Navigation' ? (isDarkMode ? '#93c5fd' : '#1e40af') : (isDarkMode ? '#86efac' : '#166534'),
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'usage',
      label: 'Usage',
      sortable: true,
      render: (value) => {
        const colors = { 'High': '#ef4444', 'Medium': '#f59e0b', 'Low': '#10b981' };
        return <span style={{ color: colors[value] || '#6b7280', fontWeight: '500' }}>{value}</span>;
      }
    },
    {
      key: 'popularity',
      label: 'Popularity',
      sortable: true,
      render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '60px', height: '8px', 
            backgroundColor: isDarkMode ? '#374151' : '#e5e7eb', 
            borderRadius: '4px', overflow: 'hidden'
          }}>
            <div style={{
              width: $\`\{value}%\`, height: '100%',
              backgroundColor: value >= 90 ? '#10b981' : value >= 70 ? '#f59e0b' : '#ef4444',
              borderRadius: '4px'
            }}></div>
          </div>
          <span style={{ fontSize: '12px', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>{value}%</span>
        </div>
      )
    }
  ];
    <DataTable 
    data={iconData} 
    columns={iconColumns}
    searchable={true}
    theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
  />`;

  const advancedJSX = `
    const userData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      department: 'UI & Navigation',
      role: 'Admin',
      status: 'active',
      salary: 75000,
      joinDate: new Date('2022-01-15'),
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'User & Profile',
      role: 'Developer',
      status: 'active',
      salary: 68000,
      joinDate: new Date('2022-03-20'),
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      department: 'UI & Navigation',
      role: 'Designer',
      status: 'inactive',
      salary: 62000,
      joinDate: new Date('2021-11-10'),
      avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=f59e0b&color=fff'
    }
  ];

  const userColumns = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: DataTableUtils.createAvatarRenderer('name', 'avatar')
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => (
        <a href={\`mailto:\${value}\`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
          📧 {value}
        </a>
      )
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (value) => {
        const icons = {
          'UI & Navigation': '🧭',
          'User & Profile': '👤'
        };
        return (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{icons[value] || '📁'}</span>
            {value}
          </span>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: DataTableUtils.createStatusRenderer({
        'active': { className: 'status-active', icon: '✅' },
        'inactive': { className: 'status-inactive', icon: '❌' },
        'pending': { className: 'status-pending', icon: '⏳' }
      })
    },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,
      render: (value) => DataTableUtils.formatCurrency(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: DataTableUtils.createActionsRenderer([
        {
          label: 'Edit',
          icon: '✏️',
          onClick: (row) => alert(\`Edit user: \${row.name}\`),
          style: { color: '#3b82f6', borderColor: '#3b82f6' }
        },
        {
          label: 'Delete',
          icon: '🗑️',
          onClick: (row) => alert(\`Delete user: \${row.name}\`),
          style: { color: '#ef4444', borderColor: '#ef4444' }
        }
      ])
    }
  ];
    <DataTable 
    data={userData} 
    columns={userColumns}
    searchable={true}
    pagination={true}
    rowsPerPage={5}
    theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
    onRowClick={(row) => console.log('Row clicked:', row)}
  />`;

  const loadingJSX = `
          <DataTable 
          data={[]} 
          columns={basicColumns}
          loading={true}
          theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
        />`;

  const emptyJSX = `
          <DataTable 
          data={[]} 
          columns={basicColumns}
          emptyMessage="No users found"
          theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
        />`;

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
          { prop: "data", type: "array", default: "[]", desc: "Array of data objects to display in the table." },
          { prop: "columns", type: "array", default: "[]", desc: "Defines column configurations including keys, labels, and formatting." },
          { prop: "sortable", type: "boolean", default: "true", desc: "Enables or disables column sorting functionality." },
          { prop: "searchable", type: "boolean", default: "false", desc: "If true, adds a search input for filtering rows by text." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for the DataTable container." },
          { prop: "rowsPerPage", type: "number", default: "10", desc: "Specifies how many rows to display per page when pagination is enabled." },
          { prop: "pagination", type: "boolean", default: "false", desc: "Enables or disables pagination controls." },
          { prop: "onRowClick", type: "function | null", default: "null", desc: "Callback triggered when a row is clicked, receiving the row’s data." },
          { prop: "loading", type: "boolean", default: "false", desc: "Displays a loading state or spinner when true." },
          { prop: "emptyMessage", type: "string", default: "'No data available'", desc: "Message displayed when no data is present in the table." },
          { prop: "theme", type: "string", default: "'datatable-light'", desc: "Specifies visual theme — 'datatable-light' or 'datatable-dark'." },
          { prop: "color", type: "string", default: "'#3b82f6'", desc: "Defines accent color for highlights, borders, or active elements." },
          { prop: "...props", type: "object", default: "{}", desc: "Additional props spread to the root table container." },
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

      {/* Add status badge styles with dark mode support */}
      <style>{`
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }
        .status-active {
          background-color: ${isDarkMode ? '#14532d' : '#dcfce7'};
          color: ${isDarkMode ? '#86efac' : '#166534'};
        }
        .status-inactive {
          background-color: ${isDarkMode ? '#7f1d1d' : '#fee2e2'};
          color: ${isDarkMode ? '#fca5a5' : '#991b1b'};
        }
        .status-pending {
          background-color: ${isDarkMode ? '#78350f' : '#fef3c7'};
          color: ${isDarkMode ? '#fbbf24' : '#92400e'};
        }
      `}</style>

      {/* Basic DataTable */}
      <TableSectionWithPreview
        title="Basic DataTable"
        jsxCode={basicJSX}
        isDarkMode={isDarkMode}
      >
        <DataTable 
          data={basicData} 
          columns={basicColumns} 
          theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
        />
      </TableSectionWithPreview>

      {/* DataTable with Search and Pagination */}
      <TableSectionWithPreview
        title="DataTable with Search & Pagination"
        jsxCode={searchJSX}
        isDarkMode={isDarkMode}
      >
        <DataTable 
          data={basicData} 
          columns={basicColumns}
          searchable={true}
          pagination={true}
          rowsPerPage={3}
          theme={isDarkMode ? 'datatable-dark' : 'datatable-light'} 
        />
      </TableSectionWithPreview>

      {/* Icon Library DataTable */}
      <TableSectionWithPreview
        title="Icon Library DataTable"
        jsxCode={libraryJSX}
        isDarkMode={isDarkMode}
      >
        <DataTable 
          data={iconData} 
          columns={iconColumns}
          searchable={true}
          theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
        />
      </TableSectionWithPreview>

      {/* Advanced DataTable */}
      <TableSectionWithPreview
        title="Advanced DataTable with Custom Renderers"
        jsxCode={advancedJSX}
        isDarkMode={isDarkMode}
      >
        <DataTable 
          data={userData} 
          columns={userColumns}
          searchable={true}
          pagination={true}
          rowsPerPage={5}
          theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
          onRowClick={(row) => console.log('Row clicked:', row)}
        />
      </TableSectionWithPreview>

      {/* Loading State */}
      <TableSectionWithPreview
        title="Loading State"
        jsxCode={loadingJSX}
        isDarkMode={isDarkMode}
      >
        <DataTable 
          data={[]} 
          columns={basicColumns}
          loading={true}
          theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
        />
      </TableSectionWithPreview>

      {/* Empty State */}
      <TableSectionWithPreview
        title="Empty State"
        jsxCode={emptyJSX}
        isDarkMode={isDarkMode}
      >
        <DataTable 
          data={[]} 
          columns={basicColumns}
          emptyMessage="No users found"
          theme={isDarkMode ? 'datatable-dark' : 'datatable-light'}
        />
      </TableSectionWithPreview>
    </div>
  );
};

export default DataTableSection;