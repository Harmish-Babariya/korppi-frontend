import React, { useState, useEffect, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import api from "../../../service/api";
import { toast } from "react-toastify";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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

const Schedule = () => {
  dayjs.extend(utc);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [scheduleId, setscheduleId] = useState();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [scheduleTimeId, setscheduleTimeId] = useState();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [schedule,setSchedule]=useState(false)
  const [meta, setMeta] = useState();
  const userDatails = useSelector((state) => state.login.userDatails);

  const fetchScheduleData = async (pageNumber) => {
    try {
      const resData = await api.post("/email/getScheduleEmails", {
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
  const handleDeleteModalClose = () => setShow(false);
  const handleEditModalClose = () => setShowEdit(false)
  const memoizedFetchEmailData = useMemo(() => fetchScheduleData, []);

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };
  const handleDateChange = (date) => {
    const utcDate = date.toISOString();
    setSelectedDate(utcDate);
  };

  const handleTimeChange = (time) => {
    let temp = dayjs.utc(time).format("HH:mm")
    setSelectedDate(temp);
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

  const handleEditModalOpen = (edit_id,schedule) => {
    setSchedule(schedule)
    setscheduleTimeId(edit_id);
    setShowEdit(true);
  };
  const handleEdit = async () => {
    try {
      const resData = await api.post("email/schedule/update", {
        id: scheduleTimeId,
        scheduledTime: selectedDate
    });
      if (resData.isSuccess) {
        toast.success("Company Update Successful");
        handleEditModalClose();
        const { data: fetchedData, meta: fetchedMeta } = await fetchScheduleData(
          pageNumber
        );
        setData(fetchedData);
        setMeta(fetchedMeta);
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      toast.error("Company Data Not Updated", error);
    }
  };
  const handleDeleteModalOpen = (edit_id) => {
    setscheduleId(edit_id);
    setShow(true);
  };
  const handleDelete = async () => {
    try {
      const resData = await api.post("/email/schedule/delete", {
        id: scheduleId,
      });
      if (resData.isSuccess) {
    
        const { data: fetchedData, meta: fetchedMeta } = await fetchScheduleData(
          pageNumber
        );
        setData(fetchedData);
        setMeta(fetchedMeta);
        handleDeleteModalClose();
        toast.success("Scheduled deleted successfully");
      } else {
        toast.error(resData.response.data.message); 
      }
    } catch (error) {
      console.error("Failed to delete Scheduled:", error);
      toast.error("Failed to delete Scheduled");
    }
  };
  
  return (
    <div
      className="card shadow"
      style={{
        position: "relative",
        marginTop: "28px",
        minHeight: "640px",
        boxSizing: "border-box",
      }}
    >
      <Box
        className="rounded-3 mt-2  card border-0"
        style={{ minHeight: "100%", overflow: "auto" }}
      >
        {data?.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="fs-6 fw-bold">Label</TableCell>
                    <TableCell className="fs-6 fw-bold">Status</TableCell>
                    <TableCell className="fs-6 fw-bold">
                      Emails Per Day
                    </TableCell>
                    <TableCell className="fs-6 fw-bold">Total Email</TableCell>
                    <TableCell className="fs-6 fw-bold">
                      Scheduled Time
                    </TableCell>
                    <TableCell className="fs-6 fw-bold">
                      Daily Schedule
                    </TableCell>
                    <TableCell className="fs-6 fw-bold">End Time</TableCell>
                    <TableCell className="fs-6 fw-bold">Created At</TableCell>
                    <TableCell className="fs-6 fw-bold">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.label}</TableCell>
                      <TableCell
                        className={`${
                          item.isActive ? "text-warning" : "text-success"
                        }`}
                      >
                        {item.isActive ? "In Progress" : "Completed"}
                      </TableCell>
                      <TableCell>{item.emailsGenerated}</TableCell>
                      <TableCell>{item.totalEmails}</TableCell>
                      <TableCell>
                        {item.isDailySchedule
                          ? item.scheduledTime
                          : new Date(item.scheduledTime).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {item.isDailySchedule ? "Yes" : "No"}
                      </TableCell>

                      <TableCell>
                        {item.endTime && item.endTime != ""
                          ? new Date(item.endTime).toLocaleString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="d-flex">
                        <Button
                          variant="outlined"
                          className="bg-body-secondary ms-2"
                          onClick={() => handleEditModalOpen(item._id, item.isDailySchedule)}
                        >
                          <BiSolidEdit className="fs-4" />{" "}
                        </Button>

                        <Button
                          variant="outlined"
                          size="small"
                          className="text-danger bg-danger-subtle  ms-2"
                          onClick={() => handleDeleteModalOpen(item._id)}
                        >
                          <MdDelete className="fs-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {show && (
              <Modal
                show={show}
                style={{ marginTop: "200px" }}
                onHide={handleDeleteModalClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this scheduled?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outlined" onClick={handleDeleteModalClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    className="ms-2"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            {showEdit && (
              <Modal
                show={showEdit}
                style={{ marginTop: "200px" }}
                onHide={handleEditModalClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Scheduled Time Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
               { !schedule ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        className="mb-2"
                        label="Select date and time "
                        onChange={handleDateChange}
                        renderInput={(params) => <input {...params} />}
                      />
                    </DemoContainer>
                  </LocalizationProvider> :   
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time To Send"
                    ampm={false}
                    onChange={handleTimeChange}
                    renderInput={(params) => <input {...params} />}
                    className="mt-2"
                  />
                </LocalizationProvider>}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outlined" onClick={handleEditModalClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    className="ms-2"
                    onClick={handleEdit}
                  >
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
    
            <div
              style={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(100%)",
              }}
            >
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
          <h3 className="text-center fw-light fs-5 mt-3">Loading...</h3>
        )}
      </Box>
      {userDatails?.isShowPaywall && (
        <>
          <div
            className="blur-container p-5 bg-body-secondary"
            style={{
              width: "39%",
              position: "absolute",
              bottom: "70px",
              left: "78%",
              transform: "translateX(-50%)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              border: "1px solid black",
              width: "39%",
              position: "absolute",
              bottom: "70px",
              left: "78%",
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

export default Schedule;
