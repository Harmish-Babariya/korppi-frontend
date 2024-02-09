import { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { RiCustomerServiceLine } from "react-icons/ri";
import { BiLogoPeriscope } from "react-icons/bi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { DiCoda } from "react-icons/di";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../../service/api";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required"),
  offer: Yup.string().required("Offer is required"),
  currency: Yup.string().required("Currency is required"),
  features1: Yup.string().required("Feature 1 is required"),
  features2: Yup.string().required("Feature 2 is required"),
  features3: Yup.string().required("Feature 3 is required"),
  benefits1: Yup.string().required("Benefit 1 is required"),
  benefits2: Yup.string().required("Benefit 2 is required"),
  benefits3: Yup.string().required("Benefit 3 is required"),
  target_name: Yup.string().required("Target Name is required"),
  location: Yup.string().required("Location is required"),
  employee_count: Yup.string().required("Employee Count is required"),
  industry: Yup.string().required("Industry is required"),
  job_title: Yup.string().required("Job Title is required"),
});
const CompanyCreateService = ({ show2, setShow2, fetchService }) => {
  const [activeTab, setActiveTab] = useState("service");
  const [title, setTitle] = useState("Company Create Service");
  const handleClose = () => setShow2(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      offer: "",
      currency: "",
      features1: "",
      features2: "",
      features3: "",
      benefits1: "",
      benefits2: "",
      benefits3: "",
      target_name: "",
      location: "",
      employee_count: "",
      industry: "",
      job_title: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const serviceData = {
        title: values.title,
        price: values.price,
        currency: values.currency,
        under_offer: false,
        offer: values.offer,
        features: [values.features1, values.features2, values.features3],
        benefits: [values.benefits1, values.benefits2, values.benefits3],
        target_name: values.target_name,
        location: values.location.split(","),
        employee_count: values.employee_count.split(","),
        industry: values.industry.split(","),
        job_title: values.job_title,
      };
      try {
        const resData = await api.post("/service/add", serviceData);
        if (resData.isSuccess) {
          toast.success("Service Create SuccessFull");
          fetchService();
          handleClose();
        } else {
          toast.error(resData.response.data.message);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  });

  const tabs = [
    { key: "service", label: "Service", icon: <RiCustomerServiceLine /> },
    { key: "feature", label: "Features", icon: <BiLogoPeriscope /> },
    { key: "benefits", label: "Benefits", icon: <DiCoda /> },
    { key: "targetmarket", label: "Target Market", icon: <AcUnitIcon /> },
  ];

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    tabKey === "targetmarket"
      ? setTitle("Company Target Market")
      : setTitle("Company Create Service");
    document
      .getElementById("left-tabs-example")
      .setAttribute("activeKey", tabKey);
  };
  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    const nextIndex = currentIndex + 1;
    if (nextIndex < tabs.length) {
      const nextTab = tabs[nextIndex];
      setActiveTab(nextTab.key);
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      const previousTab = tabs[previousIndex];
      setActiveTab(previousTab.key);
    }
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
        show={show2}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-medium">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Tab.Container
            id="left-tabs-example"
            activeKey={activeTab}
            defaultActiveKey={activeTab}
          >
            <Row>
              <Col sm={3} className="border-end">
                <Nav className="flex-column">
                  {tabs.map((tab) => (
                    <Nav.Item key={tab.key}>
                      <Nav.Link
                        // onClick={() => handleTabChange(tab.key)}
                        className={`${
                          activeTab === tab.key
                            ? "bg-body-secondary text-black fw-medium ms-2 rounded-3"
                            : "text-black fw-medium ms-2 "
                        } `}
                        eventKey={tab.key}
                      >
                        {tab.icon} {tab.label}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="service">
                    <div className="d-flex flex-column m-2">
                      <Input
                        id={"title"}
                        lebel={"Title"}
                        className={""}
                        type={"text"}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-1"}
                      />
                      {formik.touched.title && formik.errors.title && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.title}
                        </div>
                      )}
                      <Input
                        id={"price"}
                        lebel={"Price"}
                        className={"mt-2"}
                        type={"number"}
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      {formik.touched.price && formik.errors.price && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.price}
                        </div>
                      )}
                      <Input
                        id={"offer"}
                        lebel={"Offers"}
                        className={"mt-2"}
                        type={"text"}
                        value={formik.values.offer}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      {formik.touched.offer && formik.errors.offer && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.offer}
                        </div>
                      )}
                      <select
                        id="currency"
                        name="currency"
                        className="form-select mt-2"
                        value={formik.values.currency}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select Currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                      {formik.touched.currency && formik.errors.currency && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.currency}
                          </div>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                      onClick={() => handleNext()}
                    >
                      Next
                    </Button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="feature">
                    <div className="d-flex flex-column m-2">
                      <Input
                        id={"features1"}
                        lebel={"Feature1"}
                        className={""}
                        type={"text"}
                        value={formik.values.features1}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-1"}
                      />
                      {formik.touched.features1 && formik.errors.features1 && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.features1}
                        </div>
                      )}
                      <Input
                        id={"features2"}
                        lebel={"Feature2"}
                        className={"mt-2"}
                        type={"text"}
                        value={formik.values.features2}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      {formik.touched.features2 && formik.errors.features2 && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.features2}
                        </div>
                      )}
                      <Input
                        id={"features3"}
                        lebel={"Feature3"}
                        className={"mt-2"}
                        type={"text"}
                        value={formik.values.features3}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      {formik.touched.features3 && formik.errors.features3 && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.features3}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      onClick={handlePrevious}
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                      onClick={() => handleNext()}
                    >
                      Next
                    </Button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="benefits">
                    <div className="d-flex flex-column m-2">
                      <Input
                        id={"benefits1"}
                        lebel={"Benefits1"}
                        className={""}
                        type={"text"}
                        value={formik.values.benefits1}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-1"}
                      />
                      {formik.touched.benefits1 && formik.errors.benefits1 && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.benefits1}
                        </div>
                      )}
                      <Input
                        id={"benefits2"}
                        lebel={"Benefits2"}
                        className={"mt-2"}
                        type={"text"}
                        value={formik.values.benefits2}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      {formik.touched.benefits2 && formik.errors.benefits2 && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.benefits2}
                        </div>
                      )}
                      <Input
                        id={"benefits3"}
                        lebel={"Benefits3"}
                        className={"mt-2"}
                        type={"text"}
                        value={formik.values.benefits3}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      {formik.touched.benefits3 && formik.errors.benefits3 && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.benefits3}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      onClick={handlePrevious}
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                      onClick={() => handleNext()}
                    >
                      Next
                    </Button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="targetmarket">
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
                      {formik.touched.target_name &&
                        formik.errors.target_name && (
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
                        type={"text"}
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
                      <Input
                        id={"industry"}
                        lebel={"Industr(y)/(ies)"}
                        className={"mt-2"}
                        type={"text"}
                        value={formik.values.industry}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      {formik.touched.industry && formik.errors.industry && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.industry}
                        </div>
                      )}
                      <Input
                        id={"job_title"}
                        lebel={"Job Title(s)"}
                        className={"mt-2"}
                        type={"text"}
                        value={formik.values.job_title}
                        onChange={formik.handleChange}
                        size={"small"}
                        classnamelebal={"mt-2"}
                      />
                      {formik.touched.job_title && formik.errors.job_title && (
                        <div className="error ms-2 text-danger">
                          {formik.errors.job_title}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      onClick={handlePrevious}
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ backgroundColor: `${theme.palette.primary.main}` }}
                      className="ms-2 mt-2"
                      onClick={formik.handleSubmit}
                    >
                      Create Service
                    </Button>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompanyCreateService;
