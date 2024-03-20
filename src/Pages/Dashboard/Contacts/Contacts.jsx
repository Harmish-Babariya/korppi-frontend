import React, { useState, useEffect, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import api from "../../../service/api";
import EmailView from "./EmailViewModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "../../../Component/Button";
import Loader from "../../../Component/Loader";
import "./index.css";

const Contacts = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [meta, setMeta] = useState();
  const [emailData, setEmailData] = useState([]);
  const userDatails = useSelector((state) => state.login.userDatails);

  const fetchEmailData = async (pageNumber) => {
    try {
      const resData = await api.post("email/get", {
        pageNumber: pageNumber,
        pageSize: 7,
      });
      if (resData.isSuccess) {
        return { data: resData.data, meta: resData.meta };
      } else {
        throw new Error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const memoizedFetchEmailData = useMemo(() => fetchEmailData, []);

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data: fetchedData, meta: fetchedMeta } =
          await memoizedFetchEmailData(pageNumber);
        if (isMounted) {
          setData(fetchedData);
          setMeta(fetchedMeta);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [pageNumber, memoizedFetchEmailData]);

  const handleEmailViewModal = async (id) => {
    setShow(true);
    try {
      const resData = await api.post("email/get", {
        emailId: id,
      });
      if (resData.isSuccess) {
        setEmailData(resData.data);
      } else {
        throw new Error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  return (
    <div
      className="card shadow "
      style={{
        position: "relative",
        marginTop: "30px",
        minHeight: "auto",
        boxSizing: "border-box",
      }}
    >
      <Box
        className="rounded-3 card border-0"
        style={{ minHeight: "100%", overflow: "auto" }}
      >
        {data.length > 0 ? (
          <>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold text-center">Name</TableCell>
                    <TableCell className="fw-bold text-center">
                      Company
                    </TableCell>
                    <TableCell className="fw-bold text-center">Email</TableCell>
                    <TableCell className="fw-bold text-center">
                      View Email
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Email Sent
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Email Opened
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Times Opened
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Date Opened
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="text-center">
                        {item.prospectId.firstName +
                          " " +
                          item.prospectId.lastName}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.companyId.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <a href={`mailto:${item.prospectId.email}`}>
                          {item.prospectId.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-center">
                        <IconButton
                          onClick={() => handleEmailViewModal(item._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.isSent ? "YES" : "NO"}
                      </TableCell>
                      <TableCell
                        className={`text-center${
                          userDatails?.isShowPaywall ? "blur-class" : ""
                        }`}
                      >
                        {item.isOpen ? "YES" : "NO"}
                      </TableCell>
                      <TableCell
                        className={`text-center${
                          userDatails?.isShowPaywall ? "blur-class" : ""
                        }`}
                      >
                        {item.counts}
                      </TableCell>
                      <TableCell
                        className={`text-center${
                          userDatails?.isShowPaywall ? "blur-class" : ""
                        }`}
                      >
                        {item.isOpen
                          ? new Date(item.openAt).toDateString()
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {show && (
              <EmailView show={show} setShow={setShow} emailData={emailData} />
            )}
            <div className="mt-4 mb-4 ms-auto position-sticky">
              <Stack spacing={2}>
                <Pagination
                  count={meta?.totalPages}
                  page={pageNumber}
                  onChange={handlePageChange}
                  color="primary"
                  className="mb-2"
                />
              </Stack>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </Box>
      {data.length > 0 && userDatails?.isShowPaywall && (
        <>
          {" "}
          <div
            className="blur-container  p-5 bg-body-secondary"
            style={{
              width: "39%",
              position: "absolute",
              bottom: "85px",
              left: "77%",
              transform: "translateX(-50%)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              border: "1px solid black",
              width: "39%",
              position: "absolute",
              bottom: "85px",
              left: "77%",
              transform: "translateX(-50%)",
            }}
            className="inercontainer "
          >
            <h4 className="mx-5" style={{ lineHeight: "30px" }}>
              Unlock access to recipient engagement insights to see which
              individuals have interacted with your email.
            </h4>
            <Button variant="contained" size="" className="mx-5 mt-3">
              Request a Call
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Contacts;
