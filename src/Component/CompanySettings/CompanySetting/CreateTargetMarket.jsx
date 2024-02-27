import React, { useState, useEffect } from "react";
import Button from "../../Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TargetIcon from "../../../assets/img/target-user.png";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import Multiselect from "multiselect-react-dropdown";
import api from "../../../service/api";

const validationSchema = Yup.object().shape({
  target_name: Yup.string().required("Target Name is required"),
  location: Yup.array()
    .min(1, "At least one location must be selected")
    .required("Location is required"),
  employeeCount: Yup.array()
    .min(1, "At least one Employee Count must be selected")
    .required("Employee Count is required"),
  industry: Yup.array()
    .min(1, "At least one industry must be selected")
    .required("Industry is required"),
  job_title: Yup.array()
    .min(1, "At least one job title must be selected")
    .required("Job Title is required"),
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
  const [role, setRole] = useState(
    edit
      ? editTargetMarket[0]["jobTitle"].map((ele) => {
          return { title: ele };
        })
      : []
  );
  const [editTarget, setEditTarget] = useState(edit ? editTargetMarket[0] : []);
  const [editRole, setEditRole] = useState(
    edit
      ? editTargetMarket[0]["jobTitle"].map((ele) => {
          return { title: ele };
        })
      : []
  );
  const [location, setLocation] = useState(
    edit
      ? editTargetMarket[0]["location"].map((ele) => {
          return { country: ele };
        })
      : []
  );
  const [companySize, setCompanySize] = useState(
    edit
      ? editTargetMarket[0]["employeeCount"].map((ele) => {
          return { size: ele };
        })
      : []
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchRoleValue, setSearchRoleValue] = useState("");
  const [searchLocatioValue, setSearchLocationValue] = useState("");
  const [searchCompanySizeValue, setSearchComapnySizeValue] = useState("");
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
  const fetchLocation = async () => {
    try {
      const response = await api.post("locations/get");
      if (response.isSuccess) {
        setLocation(response.data);
      } else toast.error(response.message);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };
  const handleChangeEmployeeCount = (value) => {
    formik.setFieldValue("employeeCount", value);
  };
  const fetchCompanySize = async () => {
    try {
      const response = await api.post("/company-size/get");
      if (response.isSuccess) {
        setCompanySize(response.data);
      } else toast.error(response.message);
    } catch (error) {
      console.error("Error fetching company size data:", error);
    }
  };
  useEffect(() => {
    fetchIndustry();
    fetchRolesData();
    fetchLocation();
    fetchCompanySize();
  }, [
    searchValue,
    searchRoleValue,
    searchLocatioValue,
    searchCompanySizeValue,
  ]);
  useEffect(() => {
    if (editTargetMarket) {
      setEditTarget(editTargetMarket[0]);
      setIsEditMode(true);
    }
  }, [editTargetMarket]);
  const formik = useFormik({
    initialValues: {
      target_name: edit ? editTarget?.targetName : "",
      location: edit
        ? editTarget?.location?.map((ele) => {
            return { country: ele };
          })
        : [],
      employeeCount: edit
        ? editTarget?.employeeCount?.map((ele) => {
            return { size: ele };
          })
        : [],
      industry: edit
        ? editTarget?.industry?.map((ele) => {
            return { name: ele };
          })
        : [],
      job_title: edit
        ? editTarget?.jobTitle?.map((ele) => {
            return { title: ele };
          })
        : [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const updatetargetMarketData = {
        targetName: values.target_name,
        location: values.location.map((ele) => ele.country),
        employeeCount: values.employeeCount.map((ele) => parseInt(ele.size)),
        industry: values.industry.map((ele) => ele.name),
        jobTitle: values.job_title.map((ele) => ele.title),
      };

      const createtargetMarketData = {
        targetName: values.target_name,
        location: values.location?.map((ele) => ele.country),
        employeeCount: values.employeeCount.map((ele) => parseInt(ele.size)),
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
  const handleChangeLocation = (value) => {
    formik.setFieldValue("location", value);
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
            <img src={TargetIcon} alt="TargetIcon" className="me-1" />
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
                <Multiselect
                  options={location || []}
                  selectedValues={formik.values.location}
                  onSearch={fetchLocation}
                  onSelect={handleChangeLocation}
                  displayValue={"country"}
                  placeholder="Select Location"
                  className="mt-2"
                />
                {formik.touched.location && formik.errors.location && (
                  <div className="error ms-2 text-danger">
                    {formik.errors.location}
                  </div>
                )}

                <Multiselect
                  options={companySize}
                  selectedValues={formik.values.employeeCount}
                  onSelect={handleChangeEmployeeCount}
                  onSearch={fetchCompanySize}
                  displayValue={"size"}
                  placeholder="Select EmployeeCount"
                  className="mt-2"
                />
                {formik.touched.employeeCount &&
                  formik.errors.employeeCount && (
                    <div className="error ms-2 text-danger">
                      {formik.errors.employeeCount}
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
                {formik.touched.industry && formik.errors.industry && (
                  <div className="error ms-2 text-danger">
                    {formik.errors.industry}
                  </div>
                )}
                <Multiselect
                  options={role}
                  selectedValues={formik.values.job_title}
                  onSelect={handleChangeRole}
                  onSearch={fetchRolesData}
                  displayValue={"title"}
                  placeholder="Select job_title"
                  className="mt-2"
                />
                {formik.touched.job_title && formik.errors.job_title && (
                  <div className="error ms-2 text-danger">
                    {formik.errors.job_title}
                  </div>
                )}
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
