import React, { useState, useEffect } from "react";
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
import Loader from "../../../Component/Loader";
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
  const [pageNumber, setPageNumber] = useState(1);
  const [scheduleId, setscheduleId] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleTimeId, setscheduleTimeId] = useState();
  const [schedule, setSchedule] = useState(false);
  const [meta, setMeta] = useState();
  const userDatails = useSelector((state) => state.login.userDatails);

  const fetchScheduleData = async (pageNumber) => {
    try {
      const resData = await api.post("/email/getScheduleEmails", {
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

  const handleDeleteModalClose = () => setShow(false);
  const handleEditModalClose = () => setShowEdit(false);

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleDateChange = (date) => {
    const utcDate = date.toISOString();
    setSelectedDate(utcDate);
  };

  const handleTimeChange = (time) => {
    let temp = dayjs.utc(time).format("HH:mm");
    setSelectedDate(temp);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data: fetchedData, meta: fetchedMeta } =
          await fetchScheduleData(pageNumber);
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
  }, [pageNumber]);

  const handleEditModalOpen = (edit_id, schedule) => {
    setSchedule(schedule);
    setscheduleTimeId(edit_id);
    setShowEdit(true);
  };

  const handleEdit = async () => {
    try {
      const resData = await api.post("email/schedule/update", {
        id: scheduleTimeId,
        scheduledTime: selectedDate,
      });
      if (resData.isSuccess) {
        toast.success("Company Update Successful");
        handleEditModalClose();
        const { data: fetchedData, meta: fetchedMeta } =
          await fetchScheduleData(pageNumber);
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
        const { data: fetchedData, meta: fetchedMeta } =
          await fetchScheduleData(pageNumber);
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
      className="card "
      style={{
        position: "relative",
        marginTop: "30px",
        minHeight: "auto",
        boxSizing: "border-box",
      }}
    >
      <Box
        className="rounded-3 card border-0 "
        style={{ minHeight: "100%", overflow: "auto" }}
      >
        {data?.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold text-center">Label</TableCell>
                    <TableCell className="fw-bold text-center">
                      Status
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Emails Per Day
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Total Email
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Scheduled Time
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Daily Schedule
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      End Time
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Created At
                    </TableCell>
                    <TableCell className="fw-bold text-center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">
                        {item.label?.title}
                      </TableCell>
                      <TableCell
                        className={`text-center ${
                          item.isActive ? "text-warning" : "text-success"
                        }`}
                      >
                        {item.isActive ? "In Progress" : "Completed"}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.emailsGenerated}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.totalEmails}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.isDailySchedule
                          ? item.scheduledTime
                          : new Date(item.scheduledTime).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.isDailySchedule ? "Yes" : "No"}
                      </TableCell>

                      <TableCell className="text-center">
                        {item.endTime && item.endTime != ""
                          ? new Date(item.endTime).toLocaleString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          className="border-0"
                          onClick={() =>
                            handleEditModalOpen(item._id, item.isDailySchedule)
                          }
                        >
                          <BiSolidEdit className="fs-4" />{" "}
                        </Button>

                        <Button
                          className="text-danger border-0"
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
                  {!schedule ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          className="mb-2"
                          label="Select date and time "
                          onChange={handleDateChange}
                          renderInput={(params) => <input {...params} />}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  ) : (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Time To Send"
                        ampm={false}
                        onChange={handleTimeChange}
                        renderInput={(params) => <input {...params} />}
                        className="mt-2 w-100"
                      />
                    </LocalizationProvider>
                  )}
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
    </div>
  );
};

export default Schedule;
