import { useState } from "react";
import Button from "../../Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ServiceIcon from "../../../assets/img/sms.png";
import FeaturesIcon from "../../../assets/img/features.png";
import BenefitsIcon from "../../../assets/img/Frame.png";
import { DiCoda } from "react-icons/di";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";
import api from "../../../service/api";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required"),
  offer: Yup.string().required("Offer is required"),
  features: Yup.array().of(Yup.string().required("Feature is required")),
  benefits: Yup.array().of(Yup.string().required("Benefit is required")),
  // target_name: Yup.string().required("Target Name is required"),
  // location: Yup.string().required("Location is required"),
  // employee_count: Yup.string().required("Employee Count is required"),
  // industry: Yup.string().required("Industry is required"),
  // job_title: Yup.string().required("Job Title is required"),
});
const CompanyEditService = ({ show, setShow, editService, fetchService }) => {
  const [activeTab, setActiveTab] = useState("service");
  const [title, setTitle] = useState("Company Service Update ");
  const [firstEditService] = editService;
  const handleClose = () => setShow(false);
  const prepareServiceData = (values) => {
    const {
      title,
      price,
      offer,
      features,
      benefits,
      // target_name,
      // location,
      // employee_count,
      // industry,
      // job_title,
    } = values;
    return {
      title,
      price,
      currency: values.currency,
      under_offer: false,
      offer,
      features: features.map((feature) => feature.description),
      benefits: benefits.map((benefit) => benefit.description),
      // target_name,
      // location: location.split(",").map((loc) => loc.trim()),
      // employee_count: employee_count.split(",").map((count) => count.trim()),
      // industry: [industry],
      // job_title,
      serviceId: firstEditService._id,
    };
  };

  const formik = useFormik({
    initialValues: {
      title: firstEditService.title || "",
      price: firstEditService.price || "",
      offer: firstEditService.offer || "",
      currency: firstEditService.currency || "",
      features:
        [...firstEditService.features.map((ele) => ele.description)] || [],
      benefits:
        [...firstEditService.benefits.map((ele) => ele.description)] || [],
      // target_name: firstEditService.target_market?.targetName || "",
      // location: firstEditService.target_market?.location?.join(",") || "",
      // employee_count:
      //   firstEditService.target_market?.employeeCount?.join(",") || "",
      // industry: firstEditService.target_market?.industry?.join(",") || "",
      // job_title: firstEditService.target_market?.jobTitle || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const resData = await api.post("/service/update", {
          serviceId: firstEditService._id,
          title: values.title,
          price: values.price,
          currency: values.currency,
          under_offer: false,
          offer: values.offer,
          features: values.features,
          benefits: values.benefits,
          // target_name: values.target_name,
          // location: values.location.split(","),
          // employee_count: values.employee_count.split(","),
          // industry: values.industry.split(","),
          // job_title: values.job_title,
        });
        if (resData.isSuccess) {
          toast.success("Service Update Successful");
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
    { key: "service", label: "Service", icon: ServiceIcon },
    { key: "feature", label: "Features", icon: FeaturesIcon },
    { key: "benefits", label: "Benefits", icon: BenefitsIcon },
    // { key: "targetmarket", label: "Target Market", icon: <AcUnitIcon /> },
  ];

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    tabKey === "targetmarket"
      ? setTitle("Company Target Market")
      : setTitle("Company Update Service");
    document
      .getElementById("left-tabs-example")
      .setAttribute("activeKey", tabKey);
  };
  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    if (
      currentIndex === 0 &&
      !(
        formik.values.title &&
        formik.values.price &&
        formik.values.offer &&
        formik.values.currency
      )
    ) {
      toast.error("All Fields Requires!");
      return;
    }

    if (currentIndex === 1) {
      if (formik.values.features.length === 0) {
        toast.error("At Least One Field Require!");
        return;
      }
      if (formik.values.features[0] === "") {
        toast.error("All Fields Requires!");
        return;
      } else {
        formik.values.features = formik.values.features.filter(
          (item) => item !== ""
        );
      }
    }

    if (currentIndex === 2) {
      if (formik.values.benefits.length === 0) {
        toast.error("At Least One Field Require!");
        return;
      }
      if (formik.values.benefits[0] === "") {
        toast.error("All Fields Requires!");
        return;
      } else {
        formik.values.benefits = formik.values.benefits.filter(
          (item) => item !== ""
        );
      }
    }

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
  const addFeature = () => {
    formik.setFieldValue("features", [...formik.values.features, ""]);
  };

  const removeFeature = (index) => {
    const newFeatures = [...formik.values.features];
    newFeatures.splice(index, 1);
    formik.setFieldValue("features", newFeatures);
  };

  const addBenefit = () => {
    formik.setFieldValue("benefits", [...formik.values.benefits, ""]);
  };

  const removeBenefit = (index) => {
    const newBenefits = [...formik.values.benefits];
    newBenefits.splice(index, 1);
    formik.setFieldValue("benefits", newBenefits);
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
        show={show}
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
                        onClick={() => handleTabChange(tab.key)}
                        className={`${
                          activeTab === tab.key
                            ? "bg-body-secondary text-black fw-medium ms-2 rounded-3"
                            : "text-black fw-medium ms-2 "
                        } `}
                        eventKey={tab.key}
                      >
                        <img
                          src={tab.icon}
                          alt={tab.label}
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(0%) sepia(0%) hue-rotate(0deg) brightness(104%) contrast(100%)",
                          }}
                        />{" "}
                        {tab.label}
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
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                      onClick={() => handleNext()}
                    >
                      Next
                    </Button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="feature">
                    <div className="m-2">
                      {formik.values?.features?.map((feature, index) => (
                        <>
                          <div key={index} className="d-flex flex-row">
                            <Input
                              id={"features" + (index + 1)}
                              lebel={"Feature " + (index + 1)}
                              className={"mt-2 w-75"}
                              type={"text"}
                              value={feature}
                              onChange={(e) => {
                                const newFeatures = [...formik.values.features];
                                newFeatures[index] = e.target.value;
                                formik.setFieldValue("features", newFeatures);
                              }}
                              size={"small"}
                              classnamelebal={"mt-2"}
                            />
                            <Button
                              variant="contained"
                              onClick={() => removeFeature(index)}
                              style={{
                                backgroundColor: `${theme.palette.primary.main}`,
                              }}
                              className="ms-2 mt-2"
                            >
                              Remove
                            </Button>
                          </div>
                          <div>
                            {formik.touched?.features &&
                              formik.errors?.features &&
                              formik.errors?.features[index] && (
                                <div className="error ms-2 text-danger">
                                  {formik.errors.features[index]}
                                </div>
                              )}
                          </div>
                        </>
                      ))}
                    </div>
                    <Button
                      variant="contained"
                      onClick={addFeature}
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                    >
                      Add Feature
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePrevious}
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                      onClick={() => handleNext()}
                    >
                      Next
                    </Button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="benefits">
                    <div className="m-2">
                      {formik.values?.benefits?.map((benefit, index) => (
                        <>
                          <div key={index} className="d-flex flex-row">
                            <Input
                              // id={"benefits" + (index + 1)}
                              lebel={"Benefit " + (index + 1)}
                              className={"mt-2 w-75"}
                              type={"text"}
                              value={benefit}
                              onChange={(e) => {
                                const newBenefits = [...formik.values.benefits];
                                newBenefits[index] = e.target.value;
                                formik.setFieldValue("benefits", newBenefits);
                              }}
                              size={"small"}
                              classnamelebal={"mt-2"}
                            />
                            <Button
                              variant="contained"
                              onClick={() => removeBenefit(index)}
                              style={{
                                backgroundColor: `${theme.palette.primary.main}`,
                              }}
                              className="ms-2 mt-2"
                            >
                              Remove
                            </Button>
                          </div>
                          <div>
                            {formik.touched?.benefits &&
                              formik.errors?.benefits &&
                              formik.errors?.benefits[index] && (
                                <div className="error ms-2 text-danger">
                                  {formik.errors.benefits[index]}
                                </div>
                              )}
                          </div>
                        </>
                      ))}
                    </div>
                    <Button
                      variant="contained"
                      onClick={addBenefit}
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                    >
                      Add Benefit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePrevious}
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                      onClick={formik.handleSubmit}
                    >
                      Update
                    </Button>
                  </Tab.Pane>
                  {/* <Tab.Pane eventKey="targetmarket">
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
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: `${theme.palette.primary.main}` }}
                      className="ms-2 mt-2"
                      onClick={formik.handleSubmit}
                    >
                      Update Service
                    </Button>
                  </Tab.Pane> */}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompanyEditService;
