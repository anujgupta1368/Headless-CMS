import React, { useEffect, useState } from 'react';
import { handleDeleteTable, handleFetchAllTables, handlefetchTableDetails } from '../services/Api';
import TableView from '../components/TableView';
import InsertData from '../components/InsertData';
import { toast } from 'react-toastify';

const AllEntity = () => {
  const [tablesData, setTablesData] = useState([]);
  const [viewedTable, setViewedTable] = useState(null);
  const [insert, setInsert] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await handleFetchAllTables();
        setTablesData(response.allTablesQueryResponse.rows);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const handleViewData = async (tableName) => {
    setViewedTable(tableName);
  };

  const handleViewClose = () => {
    setViewedTable(null);
  };
  
  const handleInsertData = (tableName) => {
    setInsert(tableName);
  };
  
  const handleInsertClose = () => {
    setInsert(null);
  };

  const handleDelete = async (tableName) => {
    try {
      const response = await handleDeleteTable(tableName);
      if(response.error){
        toast.error(response.message, {autoClose:2000});
      }
      else{
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting table', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Tables</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                Table Name
              </th>
              <th scope="col" className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tablesData.map((table, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className="text-m font-medium text-gray-900">{table.table_name}</span>
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center whitespace-nowrap">
                  <button onClick={() => handleViewData(table.table_name)} className="bg-green-600 text-white rounded-md px-2 py-1 hover:bg-green-700">View</button>
                  <button onClick={() => handleInsertData(table.table_name)} className="bg-indigo-600 text-white rounded-md px-2 py-1 hover:bg-indigo-700">Insert Data</button>
                  <button onClick={() => handleDelete(table.table_name)} className="bg-red-600 text-white rounded-md px-2 py-1 hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewedTable && (
        <TableView
          isOpen={true}
          isClose={handleViewClose}
          tableName={viewedTable}
        />
      )}
      {insert && (
        <InsertData
          isOpen={true}
          isClose={handleInsertClose}
          tableName={insert}
        />
      )}
    </div>
  );
};

export default AllEntity;
