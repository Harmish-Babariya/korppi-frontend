import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import Input from "../../../Component/Input";
import api from "../../../service/api";
import { Row, Col } from "reactstrap";

const CreateUser = ({ showUser, setShowUser, fetchUsers, companyId }) => {
  const handleClose = () => setShowUser(false);

  const [companyOptions, setCompanyOptions] = useState([]);

  const fieldConfigurations = [
    { id: "firstName", lebel: "First Name", type: "text" },
    { id: "lastName", lebel: "Last Name", type: "text" },
    { id: "role", lebel: "Role", type: "text" },
    { id: "email", lebel: "Email", type: "email" },
    { id: "phone", lebel: "Phone", type: "text" },

    { id: "linkedinUrl", lebel: "LinkedIn Url", type: "text" },
  ];

  const initialValues = fieldConfigurations.reduce(
    (acc, field) => ({ ...acc, [field.id]: "", companyId }),
    {}
  );

  const validationSchema = Yup.object().shape(
    fieldConfigurations.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: Yup.string().required(`${field.lebel} is required`),
      }),
      {}
    )
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resData = await api.post("/user/add", values);
        if (resData.isSuccess) {
          toast.success("User Create Successful");
          setShowUser(false);
          formik.resetForm();
          fetchUsers();
        } else toast.error(resData.message);
      } catch (error) {
        toast.error("User Data Not Create", error);
      }
    },
  });

  return (
    <Modal
      className="mt-5 mb-5"
      size="lg"
      dialogClassName="modal-100w w-100"
      style={{ letterSpacing: "1px", width: "500px", marginLeft: "500px" }}
      show={showUser}
      onHide={handleClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-medium">Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {fieldConfigurations.map((field) => (
              <Col
                key={field.zid}
                className="pr-1 d-flex flex-column mx-auto"
                md="10"
              >
                <Input
                  id={field.id}
                  lebel={field.lebel}
                  className={"mt-2"}
                  type={field.type}
                  name={field.id}
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size={"small"}
                  classnamelebal={"mt-2"}
                />

                {formik.touched[field.id] && formik.errors[field.id] && (
                  <div className="error ms-2 text-danger">
                    {formik.errors[field.id]}
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="contained" className="ms-1 text-white">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateUser;
