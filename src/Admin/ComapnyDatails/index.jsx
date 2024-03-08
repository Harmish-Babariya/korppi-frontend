import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../Component/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import ConfirmationModal from "./deleteUserModal";
import { useParams, useNavigate } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import EditUserModal from "./editUserModal";
import CreateUser from "./createUser";
import api from "../../service/api";
import UserForgotPassword from "./userForgotPassword";

const CompanyDatails = () => {
  const [showUser, setShowUser] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  // const [editedUserId, setEditedUserId] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [forgotUserId, setForgotUserId] = useState();
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const userDatails = useSelector((state) => state.login.userDatails);
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
    try {
      const resData = await api.post("client/getById", companyId);
      if (resData.isSuccess) {
        setData(resData.data);
      } else toast.error(response.response.data.message);
    } catch (error) {
      toast.error("Error fetching users", error);
    }
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
    userDatails && userDatails.isAdmin
      ? fetchCompany() & fetchUsers()
      : navigate("/dashboard");
  }, [id, currentPage, userDatails]);
  const handleEditUser = async (userId) => {
    try {
      const resData = await api.post("user/getById", { userId: userId });
      if (resData.isSuccess) {
        setEditedUser(resData.data);
        setEditModalOpen(true);
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching users", error);
    }
  };
  const handleDeleteModal = async (userId) => {
    setSelectedUserId(userId);
    setShowConfirmationModal(true);
  };
  const handleDeleteUser = async (userId) => {
    const userDelete = {
      id: selectedUserId,
    };
    try {
      const resData = await api.post("/user/delete", userDelete);
      if (resData.isSuccess) {
        toast.success("User deleted successfully");
        fetchUsers();
        setShowConfirmationModal(false);
      } else {
        toast.error(resData);
      }
    } catch (error) {
      toast.error("Error deleting user", error);
    }
  };

  const handleShow = (id) => {
    setForgotUserId(id);
    setShow(true);
  };
  const handleShowUser = () => setShowUser(true);
  const handleCheckboxChange = async (event, userId) => {
    const isChecked = event.target.checked;
    try {
      const updatedUserData = userData.map((user) => {
        if (user._id === userId) {
          return { ...user, isShowPaywall: isChecked };
        }
        return user;
      });

      setUserData(updatedUserData);

      const resData = await api.post("/user/update", {
        id: userId,
        isShowPaywall: isChecked,
      });
      if (resData.isSuccess) {
        toast.success("Paywall value updated successfully");
      } else {
        toast.error("Failed to update Paywall value");
      }
    } catch (error) {
      toast.error("Error updating Paywall value", error);
    }
  };

  return (
    <>
      <div
        style={{ letterSpacing: "1px", marginTop: "30px" }}
        className="card shadow w-100 "
      >
        <div>
          <h3 className="ms-2 mt-2">Client Details</h3>
        </div>
        <div
          style={{ lineHeight: "10px" }}
          className="d-flex flex-row ms-2 mt-1"
        >
          <div className="m-2">
            <p>
              <span className="fw-bold">Client Name :</span> {data?.name}
            </p>
            <p>
              <span className="fw-bold">Email :</span> {data?.email || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Website URL :</span>{" "}
              {data?.websiteUrl || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Industry_Id :</span>{" "}
              {data?.industryId?.name || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Size :</span> {data?.size || "N/A"}
            </p>
            {/* <p>
              <span className="fw-bold">Iinkedinabout :</span>
              <a href="">{data?.linkedinabout}</a>
            </p> */}
          </div>
          <div className="m-2">
            <p>
              <span className="fw-bold">Postal_Code :</span>{" "}
              {data?.postalCode || "N/A"}
            </p>
            {/* <p>
              <span className="fw-bold">Iinkedinurl :</span>
              <a href="">{data?.linkedinurl}</a>
            </p> */}
            <p>
              <span className="fw-bold">Size :</span> {data?.size || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Revenue :</span>{" "}
              {data?.revenue || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Country :</span>{" "}
              {data?.country || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ letterSpacing: "0.8px", height: "430px" }}
        className="card shadow w-100 mt-2"
      >
        <div className="">
          <div className="d-flex">
            <div>
              <h3 className="ms-2 mt-2">Client Users</h3>
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
          <CreateUser
            showUser={showUser}
            setShowUser={setShowUser}
            fetchUsers={fetchUsers}
            companyId={id}
          />
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
                      <th>Paywall</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-scroll">
                    {userData.map((user) => (
                      <tr key={user._id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.companyId}</td>
                        <td>{user.linkedinUrl}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="d-flex mx-auto mt-1"
                            name={user.firstName}
                            checked={user.isShowPaywall}
                            onChange={(event) =>
                              handleCheckboxChange(event, user._id)
                            }
                          />
                        </td>

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
                          <ConfirmationModal
                            show={showConfirmationModal}
                            handleClose={() => setShowConfirmationModal(false)}
                            handleDeleteUser={handleDeleteUser}
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            className="text-danger bg-danger-subtle  ms-2 "
                            onClick={() => handleDeleteModal(user._id)}
                          >
                            <MdDelete className="fs-4" />
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            className="ms-2"
                            onClick={() => handleShow(user._id)}
                          >
                            Reset Password
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {show && (
                <UserForgotPassword
                  show={show}
                  setShow={setShow}
                  forgotUserId={forgotUserId}
                />
              )}

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
