import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import CreateUser from "./createUser";
import UserForgotPassword from "./userForgotPassword";
const CompanyDatails = () => {
  let { id } = useParams();
  const [detailsCompany, setDatalisCompany] = useState();
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleShow = () => setShow(true);
  const handleShowUser = () => setShowUser(true);

  const [data, setData] = useState([
    {
      industryid: "John Smith",
      size: 100,
      revenue: 100000,
      region: "John Smith",
      country: "indian",
      postalcode: 456001,
      linkedinurl: "www.linkedin.com/in",
      linkedinabout: "Frame your past",
      linkedinpost: "linkedin post",
      websiteurl: "http://www.ex.com",
    },
    {
      industryid: "John Smith",
      size: 100,
      revenue: 100000,
      region: "John Smith",
      country: "indian",
      postalcode: 456001,
      linkedinurl: "www.linkedin.com/in",
      linkedinabout: "Frame your past",
      linkedinpost: "linkedin post",
      websiteurl: "http://www.ex.com",
    },
    {
      industryid: "John Smith",
      size: 100,
      revenue: 100000,
      region: "John Smith",
      country: "indian",
      postalcode: 456001,
      linkedinurl: "www.linkedin.com/in",
      linkedinabout: "Frame your past",
      linkedinpost: "linkedin post",
      websiteurl: "http://www.ex.com",
    },
    {
      industryid: "John Smith",
      size: 100,
      revenue: 100000,
      region: "John Smith",
      country: "indian",
      postalcode: 456001,
      linkedinurl: "www.linkedin.com/in",
      linkedinabout: "Frame your past",
      linkedinpost: "linkedin post",
      websiteurl: "http://www.ex.com",
    },
    {
      industryid: "John Smith",
      size: 100,
      revenue: 100000,
      region: "John Smith",
      country: "indian",
      postalcode: 456001,
      linkedinurl: "www.linkedin.com/in",
      linkedinabout: "Frame your past",
      linkedinpost: "linkedin post",
      websiteurl: "http://www.ex.com",
    },
  ]);

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
              <span className="fw-bold">Industryid :</span> {data[0].industryid}
            </p>
            <p>
              <span className="fw-bold">Size :</span> {data[0].size}
            </p>
            <p>
              <span className="fw-bold">Revenue :</span> {data[0].revenue}
            </p>
            <p>
              <span className="fw-bold">Country :</span> {data[0].country}
            </p>
            <p>
              <span className="fw-bold">Iinkedinabout :</span>{" "}
              <a href="">{data[0].linkedinabout}</a>
            </p>
          </div>
          <div className="ms-5">
            <p>
              <span className="fw-bold">Postalcode :</span> {data[0].postalcode}
            </p>
            <p>
              <span className="fw-bold">Iinkedinurl :</span>{" "}
              <a href="">{data[0].linkedinurl}</a>
            </p>
            <p>
              <span className="fw-bold">Size :</span> {data[0].size}
            </p>
            <p>
              <span className="fw-bold">Revenue :</span> {data[0].revenue}
            </p>
            <p>
              <span className="fw-bold">Country :</span> {data[0].country}
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
          <CreateUser showUser={showUser} setShowUser={setShowUser} />

          <div className="table-responsive mb-2">
            <table className="table  text-center table-hover ">
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
                {data?.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.industryid}</td>
                      <td>{value.industryid}</td>
                      <td>{value.revenue}</td>
                      <td>{value.region}</td>
                      <td>{value.country}</td>
                      <td>{value.postalcode}</td>
                      <td>
                        <a href="">{value.linkedinurl}</a>
                      </td>
                      <td className=" me-5">
                        <Button
                          variant="outlined"
                          size="small"
                          className="bg-body-secondary rounded ms-auto"
                          // onClick={() => handleShow(value.Id)}
                        >
                          <BiSolidEdit className="fs-4" />{" "}
                        </Button>

                        <Button
                          variant="outlined"
                          size="small"
                          className="text-danger bg-danger-subtle  ms-2"
                          // onClick={() => handleDelete(value._id)}
                        >
                          <MdDelete className="fs-4" />
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          className="ms-2"
                          onClick={handleShow}
                        >
                          Reset Password{" "}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {show && <UserForgotPassword show={show} setShow={setShow} />}

          <div className="d-flex justify-content-end m-3">
            {" "}
            <Stack spacing={2}>
              <Pagination count={10} />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDatails;
