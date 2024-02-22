import React, { useState, useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Modal } from "react-bootstrap";
import Createindustry from "./industryCreate";
import Pagination from "@mui/material/Pagination";
import { MdCreate } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../Component/Button";
import api from "../../service/api";
import Stack from "@mui/material/Stack";
import EditIndustry from "./industryEdit";
const Industry = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [meta, setMeta] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

  const userDatails = useSelector((state) => state.login.userDatails);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleShowEdit = () => setEditShow(true);
  const header = {
    search: "",
    pageNumber: pageNumber,
    pageSize: 7,
  };

  const fetchData = async () => {
    try {
      const response = await api.post("/industry/get", header);
      if (response.isSuccess) {
        setData(response.data);
        setMeta(response.meta);
      } else toast.error(response.message);
    } catch (error) {
      console.error("Error fetching industry data:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  useEffect(() => {
    userDatails && userDatails.isAdmin ? fetchData() : navigate("/dashboard");
  }, [pageNumber, userDatails]);

  const handleEdit = async (industryId) => {
    try {
      const response = await api.post("/industry/get", {
        id: industryId,
      });
      if (response.isSuccess) {
        setEditData(response.data[0]);
        setEditShow(true);
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.error("Error getId industry:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.post("/industry/update", {
        id: selectedIndustryId,
        status: 3,
      });
      if (response.isSuccess) {
        fetchData();
        setDeleteModalOpen(false);
        toast.success(`Industry Delete successfully`);
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.error("Error deleting industry:", error);
    }
  };

  return (
    <>
      <div className="card shadow w-100 mt-3">
        <div className="d-flex">
          <div>
            <h3 className="ms-2 mt-3">Industry</h3>
          </div>
          <div className="ms-auto me-2">
            <Button
              variant="contained"
              className="mt-3 fw-bold me-4"
              onClick={handleShow}
            >
              <MdCreate className="me-1 mb-1 mt-1" />
              Create
            </Button>
          </div>
        </div>
        <Createindustry show={show} setShow={setShow} fetchData={fetchData} />
        {data?.length > 0 ? (
          <>
            <div className="table-responsive mb-2 mt-3">
              <table className="table  text-center table-hover ">
                <thead
                  style={{
                    backgroundColor: "#0F2422",
                  }}
                >
                  <tr>
                    <th>#Industry id</th>
                    <th>#Name</th>
                    <th>#Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value._id}</td>
                        <td>{value.name}</td>
                        <td>
                          <Button
                            variant="outlined"
                            className="bg-body-secondary ms-2"
                            onClick={() => handleEdit(value._id)}
                          >
                            <BiSolidEdit className="fs-4" />{" "}
                          </Button>

                          <Button
                            variant="outlined"
                            size="small"
                            className="text-danger bg-danger-subtle  ms-2"
                            onClick={() => {
                              setSelectedIndustryId(value._id);
                              setDeleteModalOpen(true);
                            }}
                          >
                            <MdDelete className="fs-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {editshow && (
              <EditIndustry
                editshow={editshow}
                setEditShow={setEditShow}
                fetchData={fetchData}
                editData={editData}
              />
            )}
            {meta?.totalPages && (
              <div className="ms-auto m-2 mb-3">
                <Stack spacing={2}>
                  <Pagination
                    count={meta?.totalPages}
                    page={pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Stack>
              </div>
            )}
          </>
        ) : (
          <h3 className="text-center fw-light fs-5">Loading...</h3>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={deleteModalOpen}
        onHide={() => setDeleteModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this industry?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            className="text-white ms-2"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Industry;
