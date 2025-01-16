import React from 'react';
import Table from './components/Table';
import{ mockData } from './assets/mockData';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'salary', label: 'Salary' },
];

const App: React.FC = () => (
<div>
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* Navbar */}
    <div className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reusable Table
        </h1>
      </div>
    </div>

    {/* Table */}
    <Table
      data={mockData.data}
      columns={columns}
      rowsPerPageOptions={[10, 25, 50]}
    />
  </div>
</div>

);

export default App;
