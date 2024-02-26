import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import api from "../../../service/api";
import EmailView from "./EmailViewModal";
import "./index.css";

const Contacts = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [meta, setMeta] = useState();
  const handleShow = () => setShow(true);
  const fetchEmailData = async () => {
    try {
      const resData = await api.post("email/get", {
        pageNumber: pageNumber,
        pageSize: 8,
      });
      if (resData.isSuccess) {
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

  const handleEmailViewModal = async (id) => {
    setShow(true);
    // try {
    //   const response = await axios.post(
    //     `https://jsonplaceholder.typicode.com/users/${id}`,
    //     newData
    //   );
    //   console.log("User updated successfully:", response.data);
    // } catch (error) {
    //   console.error("Error updating user:", error);
    // }
  };

  return (
    <div
      className="contacts-container"
      style={{ letterSpacing: "1px", marginTop: "25px" }}
    >
      <Box
        className={`p-1 rounded-3  mt-2 card border-0`}
        style={{ height: "660px" }}
      >
        {data.length > 0 ? (
          <>
            <table className="contacts-table text-center ">
              <thead>
                <tr className="rounded-5">
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
              <tbody className="">
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
                        onClick={() => handleEmailViewModal(item._id)}
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
            {show && <EmailView show={show} setShow={setShow} />}
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
          </>
        ) : (
          <h5>Loading....</h5>
        )}
      </Box>
    </div>
  );
};

export default Contacts;
