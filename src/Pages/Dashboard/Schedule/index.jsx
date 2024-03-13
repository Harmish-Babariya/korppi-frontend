import React, { useState, useEffect, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import api from "../../../service/api";
// import EmailView from "./EmailViewModal";
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
// import "./index.css";

const Schedule = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [meta, setMeta] = useState();
  const userDatails = useSelector((state) => state.login.userDatails);

  const fetchScheduleData = async (pageNumber) => {
    try {
      const resData = await api.post("email/getScheduleEmails", {
        pageNumber: pageNumber,
        pageSize: 9,
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

  const memoizedFetchEmailData = useMemo(() => fetchScheduleData, []);

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
  };

  return (
    <div className="card shadow" style={{ position: "relative", marginTop: "28px", minHeight: "640px", boxSizing: "border-box" }}>
      <Box className="rounded-3 mt-2 card border-0" style={{ minHeight: "100%", overflow: "auto" }}>
        {data.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="fs-6 fw-bold">Scheduled Time</TableCell>
                    <TableCell className="fs-6 fw-bold">Emails Generated</TableCell>
                    <TableCell className="fs-6 fw-bold">Daily Schedule</TableCell>
                    <TableCell className="fs-6 fw-bold">Status</TableCell>
                    <TableCell className="fs-6 fw-bold">End Time</TableCell>
                    <TableCell className="fs-6 fw-bold">Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.isDailySchedule ? item.scheduledTime : new Date(item.scheduledTime).toLocaleString()}</TableCell>
                      <TableCell>{item.emailsGenerated}</TableCell>
                      <TableCell>{item.isDailySchedule ? "Yes" : "No"}</TableCell>
                      <TableCell className={`${item.isActive ? "text-warning" : "text-success"}`}>{item.isActive ? "In Progress" : "Completed"}</TableCell>
                      <TableCell>{ item.endTime && item.endTime != '' ? new Date(item.endTime).toLocaleString() : 'N/A'}</TableCell>
                      <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* {show && <EmailView show={show} setShow={setShow} />} */}
            <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(100%)" }}>
              <Stack spacing={2}>
                <Pagination count={meta?.totalPages} page={pageNumber} onChange={handlePageChange} color="primary" className="mb-2" />
              </Stack>
            </div>
          </>
        ) : (
          <h3 className="text-center fw-light fs-5 mt-3">Loading...</h3>
        )}
      </Box>
      {userDatails?.isShowPaywall && (
        <>
          <div className="blur-container p-5 bg-body-secondary" style={{ width: "39%", position: "absolute", bottom: "70px", left: "78%", transform: "translateX(-50%)" }}></div>
          <div style={{ position: "absolute", border: "1px solid black", width: "39%", position: "absolute", bottom: "70px", left: "78%", transform: "translateX(-50%)" }} className="inercontainer ">
            <h4 className="mx-5" style={{ lineHeight: "30px" }}>
              Unlock access to recipient engagement insights to see which individuals have interacted with your email.
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

export default Schedule;
