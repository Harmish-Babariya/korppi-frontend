import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import api from "../../../service/api";
import "./index.css";

const Contacts = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [meta, setMeta] = useState();
  const fetchEmailData = async () => {
    try {
      const resData = await api.post("email/get", {
        pageNumber: pageNumber,
        pageSize: 7,
      });
      if (resData.isSuccess) {
        console.log(resData.data)
        setData(resData.data);
        setMeta(resData.meta);
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };
  useEffect(() => {
    fetchEmailData();
  }, [pageNumber]);

  // const handleEdit = async (id) => {
  //   try {
  //     const response = await axios.post(
  //       `https://jsonplaceholder.typicode.com/users/${id}`,
  //       newData
  //     );
  //     console.log("User updated successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `https://jsonplaceholder.typicode.com/users/${id}`
  //     );

  //     console.log("User deleted successfully:", response.data);

  //     setData(data.filter((user) => user.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  return (
    <div className="contacts-container">
      <table className="contacts-table text-center">
        <thead>
          <tr className="mx-auto">
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>View Email</th>
            <th>Email Sent</th>
            <th>Email Opened</th>
            <th>Times Opened</th>
            <th>Date Opened</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.companyId.name}</td>
              <td>{item.companyId.name}</td>
              <td>
                <a href={`mailto:${item.prospectId.email}`}>
                  {item.prospectId.email}
                </a>
              </td>
              <td>
                {" "}
                <button
                  className="edit-button"
                  // onClick={() => handleEdit(item.id)}
                >
                  View
                </button>
              </td>
              <td>{item.isSent ? "TRUE" : "FALSE"}</td>
              
              <td>{item.isOpen ? "TRUE" : "FALSE"}</td>
              <td>{item.counts}</td>
              <td>{item.openAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        <div className="d-flex justify-content-end m-2 mb-3 ">
          <Stack spacing={2}>
            <Pagination
              count={meta?.totalPages}
              page={pageNumber}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      }
    </div>
  );
};

export default Contacts;
