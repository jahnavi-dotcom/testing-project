import React from "react";

const EditableRow =({editFormData,handleEditFormChange, handleCancelClick}) => {
  return(
    <tr>
      <td>
      <input type='text' value={editFormData.description} placeholder='Enter description' name='description' onChange={handleEditFormChange}  />
      </td>
      <td>
      <input type='text' value={editFormData.category} placeholder='Enter category' name='category' onChange={handleEditFormChange} />
      </td>
      <td>
      <input type='text' value={editFormData.amount} placeholder='Enter amount' name='amount' onChange={handleEditFormChange} />
      </td>
      <td>
      <input type='date' value={editFormData.date} placeholder='Enter Date' name='date' />
      </td>
      <td>
        <button button='button'>Save</button>
        <button button='button' onClick={handleCancelClick}>Cancel</button>
      </td>
    </tr>
  )

}


export default EditableRow;