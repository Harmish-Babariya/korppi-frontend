import React, { useState } from "react";
import { Button } from "@mui/material";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FaRegEye } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { MdCreate } from "react-icons/md";

const Company = () => {
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
      <div className="d-flex flex-row justify-content-between me-5 mt-2 ms-2 mb-3">
        <div>
          <h3>Company</h3>
        </div>
        <div>
          <Button
            variant="contained"
            
            className="mt-2 fw-bold"
            // onClick={() => handleDelete(value._id)}
          >
            <IoBagAdd className="me-1 mb-1"/>
Create
          </Button>
          <Button
            variant="contained"
            className="mt-2 ms-2 fw-bold"
            // onClick={() => handleDelete(value._id)}
          >
           <MdCreate className="me-1"/>
 Add Field
          </Button>
        </div>
      </div>

      <div className="table-responsive card mx-2 mb-2">
        <table className="table  text-center table-hover ">
          <thead
            style={{
              backgroundColor: "#0F2422",
            }}
          >
            <tr>
              <th>#Industry id</th>
              <th>#Size</th>
              <th>#Revenue</th>
              <th>#Region</th>
              <th>#Country</th>
              <th>#Postal code</th>
              <th>#Linkedin url</th>
              <th>#Linkedin about</th>
              <th>#Linkedin post</th>
              <th>#Website url</th>
              <th>#Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.industryid}</td>
                  <td>{value.size}</td>
                  <td>{value.revenue}</td>
                  <td>{value.region}</td>
                  <td>{value.country}</td>
                  <td>{value.postalcode}</td>
                  <td>
                    <a href="">{value.linkedinurl}</a>
                  </td>
                  <td>{value.linkedinabout}</td>
                  <td>{value.linkedinpost}</td>
                  <td>
                    <a href="">{value.websiteurl}</a>
                  </td>
                  <td className="d-flex text-center ">
                    <Button
                      variant="outlined"
                      className="text-secondary border-black"
                      // onClick={() => handleShow(value.Id)}
                    >
        
                      <FaRegEye className="icon fs-4" />{" "}
                    </Button>
                    <Button
                      variant="outlined"
                      className="bg-body-secondary ms-2"
                      onClick={() => handleShow(value.Id)}
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="ms-auto me-3 mb-2">
        <Button
          variant="contained"
          size="small"
          className="deleteicon   ms-2"
          // onClick={() => handleDelete(value._id)}
        >
          edit
          {/* <MdDelete className="fs-4" /> */}
        </Button>
        <Button
          variant="contained"
          size="small"
          className="deleteicon   ms-2"
          // onClick={() => handleDelete(value._id)}
        >
          Delete
          {/* <MdDelete className="fs-4" /> */}
        </Button>
      </div>
      <div className="ms-auto m-2">
        {" "}
        <Stack spacing={2}>
          <Pagination count={10} />
        </Stack>
      </div>
    </>
  );
};

export default Company;
