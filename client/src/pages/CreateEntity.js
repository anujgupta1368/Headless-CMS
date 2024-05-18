import React, { useState } from 'react';
import { handleCreateEntity } from '../services/Api';

const CreateEntity = () => {
  const [entityName, setEntityName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '' }]);
  const [errors, setErrors] = useState({ entityName: '', columns: [] });
  const [message, setMessage] = useState('');

  const sqlAttributeTypes = [
    "CHAR",
    "VARCHAR(255)",
    "TINYTEXT",
    "TEXT(255)",
    "MEDIUMTEXT",
    "LONGTEXT",
    "TINYINT",
    "BOOL",
    "SMALLINT",
    "MEDIUMINT",
    "INT",
    "BIGINT",
    "FLOAT",
    "DATE",
    "TIME",
    "TIMESTAMP",
    "BINARY",
    "VARBINARY",
    "BLOB",
  ];

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z][A-Za-z0-9]*[A-Za-z0-9]$/;
    if (!nameRegex.test(name)) {
      return 'Name must start with a letter, not end with an underscore, and contain only alphanumeric characters without spaces.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;

    const entityNameError = validateName(entityName);
    let columnErrors = columns.map((column) => validateName(column.name));

    if (entityNameError) {
      formIsValid = false;
      setErrors((prevErrors) => ({ ...prevErrors, entityName: entityNameError }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, entityName: '' }));
    }

    columnErrors.forEach((error, index) => {
      if (error) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      setErrors((prevErrors) => ({ ...prevErrors, columns: columnErrors }));
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, columns: [] }));
    }

    const entityData = {
      entityName,
      columns,
    };
    const response = await handleCreateEntity(entityData);
    if(response.error){
      setMessage(response.error + '. ' + response.message);
    }
    else{
      setMessage(response.message);
    }
    setEntityName('');
    setColumns([{ name: '', type: '' }]);
  };
  
  const addColumnField = () => {
    setColumns([...columns, { name: '', type: '' }]);
    setErrors((prevErrors) => ({ ...prevErrors, columns: [...prevErrors.columns, ''] }));
  };

  const deleteColumnField = (index) => {
    if (columns.length > 1) {
      const newColumns = [...columns];
      newColumns.splice(index, 1);
      setColumns(newColumns);

      const newErrors = [...errors.columns];
      newErrors.splice(index, 1);
      setErrors((prevErrors) => ({ ...prevErrors, columns: newErrors }));
    }
  };

  const handleColumnNameChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index].name = value;
    setColumns(newColumns);

    const columnError = validateName(value);
    const newErrors = [...errors.columns];
    newErrors[index] = columnError;
    setErrors((prevErrors) => ({ ...prevErrors, columns: newErrors }));
  };

  const handleAttributeTypeChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index].type = value;
    setColumns(newColumns);
  };

  return (
    <div className="container mx-[2.5%] mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Entity</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="entityName" className="block text-gray-700">Entity Name:</label>
          <input
            type="text"
            id="entityName"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            className="border border-gray-800 rounded-md px-4 py-2 w-[40%]"
            required
          />
          {errors.entityName && <p className="text-red-500">{errors.entityName}</p>}
        </div>
        {columns.map((column, index) => (
          <div key={index} className='flex gap-[5%]'>
            <div className="mb-4 w-[40%]">
              <label htmlFor={`columnName${index}`} className="block text-gray-700">Column Name:</label>
              <input
                type="text"
                id={`columnName${index}`}
                value={column.name}
                onChange={(e) => handleColumnNameChange(index, e.target.value)}
                className="border border-gray-800 rounded-md px-4 py-2 w-full"
                required
              />
              {errors.columns[index] && <p className="text-red-500">{errors.columns[index]}</p>}
            </div>
            <div className="mb-4 w-[40%]">
              <label htmlFor={`attributeType${index}`} className="block text-gray-700">Attribute Type:</label>
              <select
                id={`attributeType${index}`}
                value={column.type}
                onChange={(e) => handleAttributeTypeChange(index, e.target.value)}
                className="border border-gray-800 rounded-md px-4 py-2 w-full"
                required
              >
                <option value="" disabled>Select Attribute Type</option>
                {sqlAttributeTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className='mt-6 w-[5%]'>
              {columns.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteColumnField(index)}
                  className="bg-red-500 text-white px-2 py-1 h-10 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" onClick={addColumnField} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Column</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2">Submit</button>
      </form>
      <div>
      {message && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default CreateEntity;
