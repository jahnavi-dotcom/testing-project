import React, { useState, Fragment } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import data from './bills.json';
import moment from 'moment';
import { nanoid } from 'nanoid';
import Dropdown from 'react-bootstrap/Dropdown';


import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import ReadOnly from './components/readOnlyRows';
import EditableRow from './components/editableRow';

function App() {
  const [mockData, setMockData] = useState(data)
  const [addFormData, setAddFormData] = useState({
    description: '',
    category: '',
    amount: ''
  })
  const [editData, setEditData] = useState(null)

  const [editFormData, setEditFormData] = useState({
    description: '',
    category: '',
    amount: ''
  })
  const [searchValue, setSearchValue] = useState("")

  const handleChange = (event) => {
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  const handleFormData = (event) => {
    event.preventDefault();
    const newData = {
      id: nanoid(),
      description: addFormData.description,
      category: addFormData.category,
      amount: addFormData.amount,
      date: moment(new Date()).format('DD/MM/YYYY')
    }

    const newFormData = [...mockData, newData]
    setMockData(newFormData)
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value;

    const NewFormData = { ...editFormData }
    NewFormData[fieldName] = fieldValue

    setEditFormData(NewFormData)

  }

  const handleEditClick = (event, data) => {

    event.preventDefault();
    setEditData(data.id)

    const FormValues = {
      description: data.description,
      category: data.category,
      amount: data.amount
    }

    setEditFormData(FormValues)
  }

  const handleEditSubmitButton = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editData,
      description: editFormData.description,
      category: editFormData.category,
      amount: editFormData.amount,
      date: moment(new Date()).format('DD/MM/YYYY')
    }

    const newData = [...mockData]
    const index = mockData.findIndex((item) => item.id === editData)
    newData[index] = editedContact
    setMockData(newData)
    setEditData(null)
  }

  const handleCancelClick = () => {
    setEditData(null)
  }

  const handleDeleteClick = (id) => {
    const newData = [...mockData]

    const index = mockData.findIndex((item) => item.id === id)

    newData.splice(index, 1)
    setMockData(newData)
  }

  return (
    <div className='app-container'>


      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title="Dropdown"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#">Category</Dropdown.Item>
          <Dropdown.Item href="#">Id</Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)} className="dropdown" />
      </InputGroup>

      <form onSubmit={handleEditSubmitButton}>
        <table id="myTable">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData
              .filter(name => name.category.includes(searchValue))
              .map((item) => (
                <Fragment>
                  {editData === item.id ? <EditableRow handleCancelClick={handleCancelClick} editFormData={editFormData} handleEditFormChange={handleEditFormChange} /> :
                    <ReadOnly data={item} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />}
                </Fragment>
              ))}
          </tbody>
        </table>
      </form>

      <h1>add Data</h1>
      <form onSubmit={handleFormData}>
        <input type='text' placeholder='Enter description' name='description' onChange={handleChange} />
        <input type='text' placeholder='Enter category' name='category' onChange={handleChange} />
        <input type='text' placeholder='Enter amount' name='amount' onChange={handleChange} />
        <button type='submit'>Add</button>
      </form>

    </div>
  );
}

export default App;
