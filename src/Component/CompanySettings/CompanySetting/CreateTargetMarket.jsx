import React, { useState, useEffect } from "react";
import Button from "../../Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import Multiselect from "multiselect-react-dropdown";
import api from "../../../service/api";

const validationSchema = Yup.object().shape({
  target_name: Yup.string().required("Target Name is required"),
  location: Yup.string().required("Location is required"),
  employee_count: Yup.number().required("Employee Count is required"),
  industry: Yup.array().required("Industry is required"),
  job_title: Yup.array().required("Job Title is required"),
});

const CreateTargetMarket = ({
  targetShow,
  setTargetShow,
  fetchService,
  editTargetMarket,
  edit,
  serviceId,
}) => {
  const handleClose = () => setTargetShow(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [role, setRole] = useState([]);
  const [editTarget, setEditTarget] = useState(edit ? editTargetMarket[0] : []);
  const [editRole, setEditRole] = useState(edit ? editTargetMarket[0] : []);
  const [searchValue, setSearchValue] = useState("");
  const [searchRoleValue, setSearchRoleValue] = useState("");

  const fetchIndustry = async (searchValue) => {
    try {
      const response = await api.post("/industry/get", { search: searchValue });
      if (response.isSuccess) {
        setIndustry(response.data);
      } else toast.error(response.message);
    } catch (error) {
      console.error("Error fetching industry data:", error);
    }
  };
  const fetchRolesData = async () => {
    try {
      const response = await api.post("/roles/get");
      if (response.isSuccess) {
        setRole(response.data);
      } else toast.error(response.message);
    } catch (error) {
      console.error("Error fetching role data:", error);
    }
  };
  useEffect(() => {
    fetchIndustry();
    fetchRolesData();
  }, [searchValue, searchRoleValue]);
  useEffect(() => {
    if (editTargetMarket) {
      setEditTarget(editTargetMarket[0]);
      setIsEditMode(true);
    }
  }, [editTargetMarket]);
  const formik = useFormik({
    initialValues: {
      target_name: edit ? editTarget.targetName : "",
      location: edit ? editTarget.location?.join(",") : "",
      employee_count: edit ? editTarget.employeeCount : "",
      industry: edit
        ? editTarget.industry.map((ele) => {
            return { name: ele };
          })
        : [],
      job_title: edit
        ? editTarget.jobTitle.map((ele) => {
            return { title: ele };
          })
        : [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const employeeCountArray = [values.employee_count];
      const updatetargetMarketData = {
        targetName: values.target_name,
        location: values.location.split(","),
        employeeCount: values.employee_count,
        industry: values.industry.map((ele) => ele.name),
        jobTitle: values.job_title.map((ele) => ele.title),
      };

      const createtargetMarketData = {
        targetName: values.target_name,
        location: values.location.split(","),
        employeeCount: employeeCountArray,
        industry: values.industry?.map((ele) => ele.name),
        jobTitle: values.job_title?.map((ele) => ele.title),
        serviceId: serviceId,
      };
      try {
        let resData;
        if (edit) {
          resData = await api.post("/target-market/update", {
            id: editTarget._id,
            ...updatetargetMarketData,
          });
        } else {
          resData = await api.post(
            "/target-market/add",
            createtargetMarketData
          );
        }

        if (resData.isSuccess) {
          toast.success(
            isEditMode
              ? "Target Market Updated Successfully"
              : "Target Market Created Successfully"
          );
          fetchService();
          handleClose();
        } else {
          toast.error(resData.response.data.message);
        }
      } catch (error) {
        console.error("API Error:", error);
        toast.error(
          edit
            ? "Failed to update target market"
            : "Failed to create target market"
        );
      }
    },
  });
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangeIndustry = (value) => {
    formik.setFieldValue("industry", value);
  };
  const handleChangeRole = (value) => {
    formik.setFieldValue("job_title", value);
  };
  return (
    <div>
      <div className="modal-background"></div>{" "}
      <Modal
        style={{
          marginTop: "65px",
          backgroundColor: "rgba(0, 0, 0, 0.54)",
        }}
        className="w-100 h-100"
        size="lg"
        dialogClassName="modal-100w"
        show={targetShow}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-medium d-flex align-items-center">
            <AcUnitIcon />
            {edit ? "Update Target Market" : "Create Target Market"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Row>
            <Col sm={12}>
              <div className="d-flex flex-column m-2">
                <Input
                  id={"target_name"}
                  lebel={"Target Market Labal"}
                  className={""}
                  type={"text"}
                  value={formik.values.target_name}
                  onChange={formik.handleChange}
                  size={"small"}
                  classnamelebal={"mt-1"}
                />
                {formik.touched.target_name && formik.errors.target_name && (
                  <div className="error ms-2 text-danger">
                    {formik.errors.target_name}
                  </div>
                )}
                <Input
                  id={"location"}
                  lebel={"Location(s)"}
                  className={"mt-2"}
                  type={"text"}
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  size={"small"}
                  classnamelebal={"mt-2"}
                />
                {formik.touched.location && formik.errors.location && (
                  <div className="error ms-2 text-danger">
                    {formik.errors.location}
                  </div>
                )}
                <Input
                  id={"employee_count"}
                  lebel={"Employee Count"}
                  className={"mt-2"}
                  type={"number"}
                  value={formik.values.employee_count}
                  onChange={formik.handleChange}
                  size={"small"}
                  classnamelebal={"mt-2"}
                />
                {formik.touched.employee_count &&
                  formik.errors.employee_count && (
                    <div className="error ms-2 text-danger">
                      {formik.errors.employee_count}
                    </div>
                  )}
                <Multiselect
                  options={industry}
                  selectedValues={formik.values.industry}
                  onSelect={handleChangeIndustry}
                  onSearch={fetchIndustry}
                  displayValue={"name"}
                  placeholder="Select Industry"
                  className="mt-2"
                />
                <Multiselect
                  options={role}
                  selectedValues={formik.values.job_title}
                  onSelect={handleChangeRole}
                  onSearch={fetchRolesData}
                  displayValue={"title"}
                  placeholder="Select job_title"
                  className="mt-2"
                />
              </div>

              <Button
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: `${theme.palette.primary.main}`,
                }}
                className="ms-2 mt-2"
                onClick={formik.handleSubmit}
              >
                {edit ? "Update" : "Create"}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateTargetMarket;
