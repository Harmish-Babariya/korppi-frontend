import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import EditUserModal from "./editUserModal";
import CreateUser from "./createUser";
import api from "../../service/api";
import UserForgotPassword from "./userForgotPassword";
const CompanyDatails = () => {
  const [showUser, setShowUser] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [editedUserId, setEditedUserId] = useState(null);
  const [forgotUserId, setForgotUserId] = useState();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState();
  let { id } = useParams();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const companyId = {
    id: id,
  };
  const companyUser = {
    companyId: id,
  };
  const fetchCompany = async () => {
    const resData = await api.post("company/getById", companyId);
    if (resData.isSuccess) {
      setData(resData.data);
    } else  toast.error(response.response.data.message);
  };
  const fetchUsers = async () => {
    try {
      const resData = await api.post("user/get", companyUser);
      if (resData.isSuccess) {
        setUserData(resData.data);
   
        setMeta(resData.meta);
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching users", error);
    }
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetchCompany();
    fetchUsers();
  }, [id, currentPage]);
  const handleEditUser = (userId) => {
    setEditedUserId(userId);
    setEditModalOpen(true);
  };
  const handleDeleteUser = async (userId) => {
    const userDelete ={
      status: 3,
      id: userId
  }
    try {
      const resData = await api.post("/user/delete",userDelete);
      if (resData.isSuccess) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting user", error);
    }
  };

  const handleShow = (id) => {
    setForgotUserId(id)
    setShow(true);
   }
 const handleShowUser = () => setShowUser(true);

  return (
    <>
      <div style={{ letterSpacing: "1px" }} className="card shadow w-100 mt-2">
        <div>
          <h3 className="ms-2 mt-2">Company Details</h3>
        </div>
        <div
          style={{ lineHeight: "10px" }}
          className="d-flex flex-row ms-2 mt-1"
        >
          <div className="m-2">
          <p>
              <span className="fw-bold">Company Name :</span> {data?.name}
            </p>
            <p>
              <span className="fw-bold">Industry_Id :</span> {data?.industryId.name  }
            </p>
            <p>
              <span className="fw-bold">Size :</span> {data?.size}
            </p>
            <p>
              <span className="fw-bold">Revenue :</span> {data?.revenue}
            </p>
            <p>
              <span className="fw-bold">Country :</span> {data?.country}
            </p>
            {/* <p>
              <span className="fw-bold">Iinkedinabout :</span>
              <a href="">{data?.linkedinabout}</a>
            </p> */}
          </div>
          <div className="ms-5">
            <p>
              <span className="fw-bold">Postal_Code :</span> {data?.postalCode}
            </p>
            {/* <p>
              <span className="fw-bold">Iinkedinurl :</span>
              <a href="">{data?.linkedinurl}</a>
            </p> */}
            <p>
              <span className="fw-bold">Size :</span> {data?.size}
            </p>
            <p>
              <span className="fw-bold">Revenue :</span> {data?.revenue}
            </p>
            <p>
              <span className="fw-bold">Country :</span> {data?.country}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ letterSpacing: "0.8px" }}
        className="card shadow w-100 mt-2"
      >
        <div className="">
          <div className="d-flex">
            <div>
              <h3 className="ms-2 mt-2">Company Users</h3>
            </div>
            <div className="ms-auto me-2">
              <Button
                variant="contained"
                className="mt-2 me-2 fw-bold"
                onClick={handleShowUser}
              >
                <IoBagAdd className="me-1 mb-1" />
                Create User
              </Button>
            </div>
          </div>
          <CreateUser showUser={showUser} setShowUser={setShowUser} fetchUsers={fetchUsers} companyId={id}/>
          {userData.length > 0 ? (
            <>
              <div className="table-responsive mb-2">
                <table className="table  text-center table-hover overflow-auto">
                  <thead
                    style={{
                      backgroundColor: "#0F2422",
                    }}
                  >
                    <tr>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Company id</th>
                      <th>Linkedin url</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user) => (
                      <tr key={user._id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.companyId}</td>
                        <td>{user.linkedinUrl}</td>
                        <td className="d-flex">
                          <Button
                            variant="outlined"
                            size="small"
                            className="bg-body-secondary rounded "
                            onClick={() => handleEditUser(user._id)}
                          >
                            <BiSolidEdit className="fs-4" />
                          </Button>
                          {editModalOpen && (
                            <EditUserModal
                              editModalOpen={editModalOpen}
                              setEditModalOpen={setEditModalOpen}
                              editedUser={editedUser}
                              setEditedUser={setEditedUser}
                              fetchUsers={fetchUsers}
                            />
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            className="text-danger bg-danger-subtle  ms-2 "
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <MdDelete className="fs-4" />
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            className="ms-2"
                            onClick={()=>handleShow(user._id)}
                          >
                            Reset Password
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {show && <UserForgotPassword show={show} setShow={setShow} forgotUserId={forgotUserId}/>}

              {meta.totalPages && (
                <div className="d-flex justify-content-end m-2 mb-2">
                  <Stack spacing={2}>
                    <Pagination
                      count={meta.totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Stack>
                </div>
              )}
            </>
          ) : (
            <h3 className="text-center fw-light fs-5">User Not found</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyDatails;
