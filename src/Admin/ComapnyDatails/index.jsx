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
import UserForgotPassword from "./userForgotPassword";
const CompanyDatails = () => {
  let { id } = useParams();
  const [detailsCompany, setDatalisCompany] = useState();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
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
      <div className="card shadow w-100 mt-2">
        <div>
          <h3 className="ms-2 mt-2">Company Details</h3>
        </div>
        <div
          style={{ lineHeight: "3px" }}
          className="d-flex flex-row ms-2 mt-1"
        >
          <div>
            <p>Industryid : {data[0].industryid}</p>
            <p>Size : {data[0].size}</p>
            <p>Revenue : {data[0].revenue}</p>
            <p>Country : {data[0].country}</p>
            <p>
              Iinkedinabout : <a href="">{data[0].linkedinabout}</a>
            </p>
          </div>
          <div className="ms-5">
            <p>Postalcode : {data[0].postalcode}</p>
            <p>Size : {data[0].size}</p>
            <p>Revenue : {data[0].revenue}</p>
            <p>Country : {data[0].country}</p>
            <p>
              Iinkedinurl : <a href="">{data[0].linkedinurl}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="card shadow w-100 mt-2">
        <div className="">
          <div className="d-flex">
            <div>
              <h3 className="ms-2 mt-2">Company Users</h3>
            </div>
            <div className="ms-auto me-2">
              <Button
                variant="contained"
                className="mt-2 fw-bold"
                // onClick={handleShow}
              >
                <IoBagAdd className="me-1 mb-1" />
                Create
              </Button>
              <Button
                variant="contained"
                className="mt-2 ms-2 fw-bold"
                // onClick={() => handleDelete(value._id)}
              >
                <MdCreate className="me-1" />
                Add User
              </Button>
            </div>
          </div>
          {/* <CreateCompany show={show} setShow={setShow} /> */}

          <div className="table-responsive mb-2">
            <table className="table  text-center table-hover ">
              <thead
                style={{
                  backgroundColor: "#0F2422",
                }}
              >
                <tr>
                  <th>#first name</th>
                  <th>#last name</th>
                  <th>#role</th>
                  <th>#email</th>
                  <th>#phone</th>
                  <th>#company id</th>
                  <th>#Linkedin url</th>
                  <th>#Action</th>
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
                      <td className="d-flex text-center me-2">
                        <Button
                          variant="outlined"
                          className="text-secondary border-black ms-auto"
                          // onClick={() => handleCompanyDatails(index)}
                        >
                          <FaRegEye className="icon fs-4" />{" "}
                        </Button>
                        <Button
                          variant="outlined"
                          className="bg-body-secondary ms-2"
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
