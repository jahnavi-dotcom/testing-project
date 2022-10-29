import React from "react";


const ReadOnly = ({ data, handleEditClick,handleDeleteClick}) => {
  return (
      <tr>
        <td>{data.description}</td>
        <td>{data.category}</td>
        <td>{data.amount} </td>
        <td>{data.date}</td>
        <td>
          <button type='button' onClick={(event) => handleEditClick(event,data)}>Edit</button>
          <button type="button" onClick={() => handleDeleteClick(data.id) }>Delete</button>
        </td>
      </tr>
  )

}

export default ReadOnly;