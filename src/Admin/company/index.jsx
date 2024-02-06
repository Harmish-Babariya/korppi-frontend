import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FaRegEye } from "react-icons/fa";

import { MdCreate } from "react-icons/md";
import CreateCompany from "../companyCreate";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { toast } from "react-toastify";
import CompanyEditModal from "./companyEditModal";
import CompanyDeleteModal from "./companyDeleteModal";
const Company = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCompany, setEditedCompany] = useState({});
  const [deletedCompany, setDeletedCompany] = useState();
  const [companyid, setCompanyId] = useState("");
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [meta, setMeta] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const header = {
    search: "a",
    pageNumber: pageNumber,
    pageSize: 7,
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchCompany();
  }, [pageNumber]);
  async function fetchCompany() {
    const resData = await api.post("company/get", header);
    if (resData.isSuccess) {
      setData(resData.data);
      setMeta(resData.meta);
    } else toast.error(resData.message);
  }
  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };
  const fieldConfigurations = [
    { id: "name", lebel: "CompanyName", type: "text" },
    { id: "industryId", lebel: "IndustryId", type: "text" },
    { id: "size", lebel: "Size", type: "text" },
    { id: "revenue", lebel: "Revenue", type: "text" },
    { id: "region", lebel: "Region", type: "text" },
    { id: "country", lebel: "Country", type: "text" },
    { id: "postalCode", lebel: "PostalCode", type: "text" },
    // { id: "linkedin_url", lebel: "LinkedIn URL", type: "text" },
    // { id: "linkedin_about", lebel: "LinkedIn About", type: "text" },
    // { id: "linkedin_post", lebel: "LinkedIn Post", type: "text" },
  ];
  const handleShow = () => setShow(true);
  const handleCompanyDatails = (id) => {
    navigate(`/admin/company/${id}`);
  };
  const handleEditModalOpen = (company) => {
    const { name,_id, postalCode, region, revenue, size, country } =
      company;
     
    const editdata = {
      name: name,
      postalCode: postalCode,
      region: region,
      revenue: revenue,
      size: size,
      country: country,
    };
    setEditedCompany(editdata);
    setCompanyId(_id)
    setEditModalOpen(true);
  };
  const handleDeleteModalOpen = (company) => {
    setDeletedCompany(company);
    setDeleteModalShow(true);
  };
  return (
    <>
      <div className="card shadow w-100 h-100 mt-3">
        <div className="d-flex">
          <div>
            <h3 className="ms-2 mt-3">Company</h3>
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
        <CreateCompany
          show={show}
          setShow={setShow}
          fetchCompany={fetchCompany}
        />
        {data.length > 0 ? (
          <>
            <div className="table-responsive  mt-3">
              <table className="table  text-center table-hover ">
                <thead className="text-bg-danger">
                  <tr>
                    <th>Company Name</th>
                    <th>Revenue</th>
                    <th>Size</th>
                    <th>Country</th>
                    <th>Postal Code</th>
                    <th>Region</th>
                    {/* <th>#Linkedin url</th>
                <th>#Linkedin about</th>
                <th>#Linkedin post</th>
                <th>#Website url</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.revenue}</td>
                        <td>{value.size}</td>
                        <td>{value.country}</td>
                        <td>{value.postalCode}</td>
                        <td>{value.region}</td>
                        {/* <td>
                      <a href="">{value.linkedinurl}</a>
                    </td>
                    <td>{value.linkedinabout}</td>
                    <td>{value.linkedinpost}</td>
                    <td>
                      <a href="">{value.websiteurl}</a>
                    </td> */}
                        <td className=" text-center">
                          <Button
                            variant="outlined"
                            className="text-secondary"
                            onClick={() => handleCompanyDatails(value._id)}
                          >
                            <FaRegEye className="icon fs-4" />{" "}
                          </Button>
                          <Button
                            variant="outlined"
                            className="bg-body-secondary ms-2"
                            onClick={() => handleEditModalOpen(value._id)}
                          >
                            <BiSolidEdit className="fs-4" />{" "}
                          </Button>
                          <CompanyEditModal
                            editModalOpen={editModalOpen}
                            setEditModalOpen={setEditModalOpen}
                            editedCompany={editedCompany}
                            fetchCompany={fetchCompany}
                            setEditedCompany={setEditedCompany}
                            companyId={companyid}
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            className="text-danger bg-danger-subtle  ms-2"
                            onClick={() => handleDeleteModalOpen(value._id)}
                          >
                            <MdDelete className="fs-4" />
                          </Button>
                          <CompanyDeleteModal
                            deleteModalShow={deleteModalShow}
                            setDeleteModalShow={setDeleteModalShow}
                            deletedCompany={deletedCompany}
                            fetchCompany={fetchCompany}
                            setDeletedCompanyy={setDeletedCompany}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {meta.totalPages && (
              <div className="ms-auto m-2 mb-3">
                <Stack spacing={2}>
                  <Pagination
                    count={meta.totalPages}
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
    </>
  );
};

export default Company;
