import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Contacts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        newData
      );
      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      console.log("User deleted successfully:", response.data);

      setData(data.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="contacts-container">
      <table className="contacts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th> {/* New column for edit and delete buttons */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
              <td>{item.company.name}</td>
              <td>
                <button  className="edit-button" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
