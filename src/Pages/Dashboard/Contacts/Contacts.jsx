import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import api from "../../../service/api";
import EmailView from "./EmailViewModal";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "../../../Component/Button";
import "./index.css";

const Contacts = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [meta, setMeta] = useState();

  const fetchEmailData = async () => {
    try {
      const resData = await api.post("email/get", {
        pageNumber: pageNumber,
        pageSize: 7,
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
    // handle your modal logic
  };

  return (
    <div className="contacts-container mt-3" style={{ position: "relative", height: "750px" }}>
      <Box className="rounded-3 mt-2 card border-0" style={{ height: "90%", overflow: "auto" }}>
        {data.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="fs-6 fw-bold">Name</TableCell>
                    <TableCell className="fs-6 fw-bold">Company</TableCell>
                    <TableCell className="fs-6 fw-bold">Email</TableCell>
                    <TableCell className="fs-6 fw-bold">View Email</TableCell>
                    <TableCell className="fs-6 fw-bold">Email Sent</TableCell>
                    <TableCell className="fs-6 fw-bold">Email Opened</TableCell>
                    <TableCell className="fs-6 fw-bold">Times Opened</TableCell>
                    <TableCell className="fs-6 fw-bold">Date Opened</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.companyId.name}</TableCell>
                      <TableCell>{item.companyId.name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${item.prospectId.email}`}>{item.prospectId.email}</a>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEmailViewModal(item._id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{item.isSent ? "TRUE" : "FALSE"}</TableCell>
                      <TableCell className="blur-class">{item.isOpen ? "TRUE" : "FALSE"}</TableCell>
                      <TableCell className="blur-class">{item.counts}</TableCell>
                      <TableCell className="blur-class">{item.openAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {show && <EmailView show={show} setShow={setShow} />}
            <div className="d-flex justify-content-end m-2 mb-3">
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
      <div className="blur-container  card p-5 bg-body-secondary" style={{ width: "600px", position: "absolute", bottom: "180px", left: "77%", transform: "translateX(-50%)" }}>  
      </div>
      <div style={{position:"absolute",border:"1px solid black",width: "600px", position: "absolute", bottom: "180px", left: "77%", transform: "translateX(-50%)"}} className="inercontainer ">
      <h4 className="mx-5" style={{lineHeight:"30px"}}>Unlock access to recipient engagement insights to see which individuals have interacted with your email.</h4>
        <Button variant="contained" size="" className="mx-5 mt-3">Request a Call</Button>
      </div>
    </div>
  );
};

export default Contacts;
