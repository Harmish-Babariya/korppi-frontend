import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import { Button } from "@mui/material";
import Input from "../../../Component/Input";
import { theme } from "../../../Theme/Theme";
import { Row } from "reactstrap";
import { toast } from "react-toastify";
import api from "../../../service/api";

const EditIndustry = ({ editshow, setEditShow, fetchData, editData }) => {
  const initialValues = {
    name: editData?.name,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Industry is required"),
  });

  const handleClose = () => setEditShow(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const endpoint = "/industry/update";
        const value = { ...values, id: editData._id };
        const resData = await api.post(endpoint, value);
        if (resData.isSuccess) {
          toast.success(`Industry updated successfully`);
          fetchData();
          setEditShow(false);
        } else {
          toast.error(resData.message);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    },
  });

  return (
    <Modal
      className="mt-5 mb-5"
      size="lg"
      dialogClassName="modal-100w w-100"
      style={{ letterSpacing: "1px", width: "500px", marginLeft: "500px" }}
      show={editshow}
      onHide={handleClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-medium">Update Industry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Input
              id="name"
              lebel="Industry"
              className={"mt-2"}
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size={"small"}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error ms-2 text-danger">{formik.errors.name}</div>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="ms-1 text-white"
            sx={{
              color: `${theme.palette.primary.main}`,
            }}
          >
            {!editData ? "Create" : "Update"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditIndustry;
