import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import { Button } from "@mui/material";
import Input from "../../../Component/Input";
import { theme } from "../../../Theme/Theme";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import api from "../../../service/api";
const Createindustry = ({ show, setShow,fetchData }) => {
  const handleClose = () => setShow(false);

  const fieldConfigurations = [
    { id: "name", lebel: "IndustryName", type: "text" },
    // { id: "industryId", lebel: "IndustryId", type: "text" },
    // { id: "size", lebel: "Size", type: "text" },
    // { id: "revenue", lebel: "Revenue", type: "text" },
    // { id: "region", lebel: "Region", type: "text" },
    // { id: "country", lebel: "Country", type: "text" },
    // { id: "postalCode", lebel: "PostalCode", type: "text" },
    // { id: "linkedin_url", lebel: "LinkedIn URL", type: "text" },
    // { id: "linkedin_about", lebel: "LinkedIn About", type: "text" },
    // { id: "linkedin_post", lebel: "LinkedIn Post", type: "text" },
  ];

  const initialValues = fieldConfigurations.reduce(
    (acc, field) => ({ ...acc, [field.id]: "" }),
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
        const resData = await api.post("/industry/add", values);
        if (resData.isSuccess) {
          toast.success("Industry Create SuccessFull");
          fetchData();
          setShow(false);
        } else toast.error(resData.message);
      } catch (error) {
        toast.error("Idustry Data Not Add", error);
      }
    },
  });

  return (
    <Modal
      className="mt-5 mb-5"
      size="lg"
      dialogClassName="modal-100w w-100"
      style={{ letterSpacing: "1px", width: "500px", marginLeft: "500px" }}
      show={show}
      onHide={handleClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-medium">Create Industry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {fieldConfigurations.map((field) => (
              <Col
                key={field.id}
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
                {formik.touched[field.id] && formik.errors[field.id] ? (
                  <div className="error ms-2 text-danger">
                    {formik.errors[field.id]}
                  </div>
                ) : null}
              </Col>
            ))}
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
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Createindustry;
