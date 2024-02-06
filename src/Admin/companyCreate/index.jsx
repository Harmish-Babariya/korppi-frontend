import React,{useState,useEffect} from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import { Button } from "@mui/material";
import Input from "../../Component/Input";

import { theme } from "../../Theme/Theme";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import api from "../../service/api";

const CreateCompany = ({ show, setShow, fetchCompany }) => {
  const [industryOptions, setIndustryOptions] = useState([]);
  const fetchIndustryData = async () => {
    try {
      const response = await api.post("/industry/get"); 
      const industries = response.data; 
      const formattedOptions = industries.map((industry) => ({
        value: industry._id,
        lebel: industry.name,
      }));
      setIndustryOptions(formattedOptions);
    } catch (error) {
      console.log("Error fetching industry data:", error);
    }
  };
  useEffect(() => {
    fetchIndustryData();
  }, []);
  const fieldConfigurations = [
    { id: "name", lebel: "CompanyName", type: "text" },
    { id: "industryId", lebel: "IndustryId", type: "select" },
    { id: "size", lebel: "Size", type: "text" },
    { id: "revenue", lebel: "Revenue", type: "text" },
    { id: "region", lebel: "Region", type: "text" },
    { id: "country", lebel: "Country", type: "text" },
    { id: "postalCode", lebel: "PostalCode", type: "text" },
    // { id: "linkedin_url", lebel: "LinkedIn URL", type: "text" },
    // { id: "linkedin_about", lebel: "LinkedIn About", type: "text" },
    // { id: "linkedin_post", lebel: "LinkedIn Post", type: "text" },
  ];
  const handleClose = () => setShow(false);
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
        const resData = await api.post("/company/add", values);
        if (resData.isSuccess) {
          toast.success("Company Create SuccessFull");
          setShow(false);
          fetchCompany();
          formik.resetForm();
        } else toast.error(resData.message);
      } catch (error) {
        toast.error("Company Data Not Add", error);
      }
    },
  });

 

  const handleIndustryChange = (selectedOption) => {
    formik.setFieldValue("industryId", selectedOption.value);
  };

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
        <Modal.Title className="fw-medium">Create Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {fieldConfigurations.map((field) => (
            <Col
              key={field.id}
              className="pr-1 d-flex flex-column mx-auto"
              md="10"
            >
              {field.id === "industryId" ? (
                <select
                  value={formik.values.industryId}
                  onChange={(e) =>
                    formik.setFieldValue("industryId", e.target.value)
                  }
                  className="form-select mt-2 z-3"
                >
                  <option value="">Select {field.lebel}</option>
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.lebel}
                    </option>
                  ))}
                </select>
              ) : (
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
              )}
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

export default CreateCompany;
