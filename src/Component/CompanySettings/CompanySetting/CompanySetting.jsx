import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import api from "../../../service/api";
import { toast } from "react-toastify";
import CompanyEditService from "./CompanyEditService";
import CompanyCreateService from "./CompanyCreateService";
import { useSelector, useDispatch } from "react-redux";
import { servicehandle } from "../../../Redux/CompanyServiceSlice";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";
import "./companySettings.css";
import { FaCheckCircle } from "react-icons/fa";

const CompanySetting = ({ handleClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  let { service, status } = useSelector((state) => state.Service);
  const [selectedService, setSelectedService] = useState(null);
  const [companyDatails, setCompanyDatails] = useState(null);
  const [editService, setEditService] = useState(null);
  const [serviceid, setServiceId] = useState();
  const [selectedfeatures, setSelectedFeatures] = useState(
    service[0]?.features
  );
  const [selectedbenefits, setSelectedBenefits] = useState(
    service[0]?.benefits
  );
  const [formData, setFormData] = useState({
    companyName: service[0]?.company?.name,
    industry: service[0]?.company?.industryId?.name,
    companiesYouWorkWith: service[0]?.company?.partnerCompanies,
  });
  const [companyId, setComapnyID] = useState(service[0]?.company._id);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const fetchService = async () => {
    try {
      const resData = await api.post("service/get");
      if (resData.isSuccess) {
       
        dispatch(servicehandle(resData.data));
        service = useSelector((state) => state.Service);
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  useEffect(() => {
    fetchService();
  }, []);

  useEffect(() => {
    if (service.length > 0) {
      setFormData({
        companyName: service[0]?.company?.name,
        industry: service[0]?.company?.industryId?.name,
        companiesYouWorkWith: service[0]?.company?.partnerCompanies
      });
      setComapnyID(service[0]?.company._id);
      handleServiceClick(0);
    }
  }, [service]);
  const handleEdit = async () => {
    try {
      if (!serviceid) {
        toast.error("Please select a service product");
        return;
      }
      const resData = await api.post("service/getById", {
        serviceId: serviceid,
      });
      if (resData.isSuccess) {
        setEditService(resData.data);
        handleShow();
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      const resData = await api.post("/client/update", {
        id: companyId,
        name: formData.companyName,
        partnerCompanies: formData.companiesYouWorkWith
      });
      if (resData.isSuccess) {
        toast.success("Company Update Successful");
        handleClose()
      } else {
        toast.error(resData.message);
        handleClose()
      }
    } catch (error) {
      toast.error("Company Data Not Updated", error);
      handleClose()
    }
  };
  const handleServiceClick = (id) => {
    setSelectedService(id);
    const fuature = service.find((value, index) => index === id);
    setSelectedFeatures(fuature?.features);
    setSelectedBenefits(fuature?.benefits);
    setServiceId(fuature?._id);
  };

  return (
    <>
      <div className="d-flex">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "60ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="d-flex flex-column">
            <Input
              id={"companyname"}
              name={"companyName"}
              lebel={"Company Name"}
              className={"w-75"}
              type={"text"}
              value={formData.companyName}
              onChange={handleChange}
              size={"small"}
              classnamelebal={"mt-1"}
            />
            <Input
              id={"Industry"}
              name={"industry"}
              lebel={"Industry"}
              className={"w-75  mt-2 disabled"}
              type={"text"}
              value={formData.industry}
              onChange={handleChange}
              size={"small"}
              classnamelebal={"mt-1"}
              readonly
              disabled={'true'}
            />
          </div>
          <div>
            <Input
              id={"companiesYouWorkWith"}
              name={"companiesYouWorkWith"}
              lebel={"Companies You Work With"}
              className={"w-75"}
              type={"text"}
              value={formData.companiesYouWorkWith}
              onChange={handleChange}
              size={"small"}
            />
          </div>
        </Box>
      </div>
      <hr />
      <div className="row d-flex">
        <div className="col-4">
          <div
            className="mt-2 mb-2"
            style={{
              maxHeight: "300px",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #ced4da",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <table
              className="table table-hover rounded"
              style={{
                minWidth: "100%",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <thead className="fs-6 border-bottom">
                <tr>
                  <th>Service/Product</th>
                </tr>
              </thead>
            </table>
            <div
              style={{
                marginTop: "-15px",
                maxHeight: "200px",
                overflowY: "scroll",
                display: "flex",
              }}
            >
              <table className="table" style={{ minWidth: "100%" }}>
                <tbody>
                  {service?.map((value, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          style={{ letterSpacing: "1px", textAlign: "left" }}
                          className={`w-100 border-0  ${
                            selectedService === index
                              ? "selected-button"
                              : "non-selected-button"
                          }`}
                          onClick={() => handleServiceClick(index)}
                        >
                          {value.title}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex flex-column">
          <Button
            style={{ color: `${theme.palette.primary.main}` }}
            variant="outlined"
            size="small"
            className="mt-2 fw-medium"
            onClick={() => handleEdit()}
          >
            Edit
          </Button>

          <Button
            style={{ backgroundColor: `${theme.palette.primary.main}` }}
            variant="contained"
            size="small"
            className="fw-medium text-white mt-2"
            onClick={handleShow2}
          >
            Add Service
          </Button>
          </div>
        </div>
        <div className="col-4">
          <div
            className="mt-2 mb-2"
            style={{
              maxHeight: "300px",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #ced4da",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <table
              className="table table-hover rounded"
              style={{
                minWidth: "100%",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <thead className="fs-6 border-bottom">
                <tr>
                  <th>Target Market</th>
                </tr>
              </thead>
            </table>
            <div
              style={{
                marginTop: "-15px",
                maxHeight: "200px",
                overflowY: "scroll",
                display: "flex",
              }}
            >
              <table className="table" style={{ minWidth: "100%" }}>
                <tbody>
                    <tr>
                      <td>
                        <button
                          style={{ letterSpacing: "1px", textAlign: "left" }}
                          className={`w-100 border-0  ${
                            service[selectedService] && service[selectedService].target_market?.targetName ? "selected-button" : "non-selected-button"
                          }`}
                        >
                          {service[selectedService] && service[selectedService].target_market?.targetName ? service[selectedService].target_market?.targetName : 'No Data Available'}
                        </button>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="d-flex flex-column">
          <Button
            sx={{ color: `${theme.palette.primary.main}` }}
            variant="outlined"
            size="small"
            className="mt-2 fw-medium"
            onClick={() => handleEdit()}
          >
            Edit
          </Button>

          <Button
            style={{ backgroundColor: `${theme.palette.primary.main}` }}
            variant="contained"
            size="small" 
            className="fw-medium text-white mt-2"
            onClick={handleShow2}
          >
            Create Market
          </Button>
          </div> */}
        </div>

        {show && (
          <CompanyEditService
            show={show}
            setShow={setShow}
            editService={editService}
            fetchService={fetchService}
          />
        )}
        {show2 && (
          <CompanyCreateService
            show2={show2}
            setShow2={setShow2}
            fetchService={fetchService}
          />
        )}
        <div className="col-4 mt-2">
          <div
            style={{
              border: "1px solid #ced4da",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              width: "100%",
            }}
          >
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="bg-body-secondary"
              >
                <Typography className="fw-bold">Features</Typography>
              </AccordionSummary>
              <AccordionDetails>
              {selectedfeatures
                  ? selectedfeatures.map((ele, index) => (
                      <Typography key={index}>
                        <FaCheckCircle /> &nbsp; {ele.description}
                      </Typography>
                    ))
                  : "Data Loading..."}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className="bg-body-secondary mt-2"
              >
                <Typography className="fw-bold">Benefits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {selectedbenefits
                  ? selectedbenefits.map((ele, index) => (
                      <Typography key={index}>
                        <FaCheckCircle /> &nbsp; {ele.description}
                      </Typography>
                    ))
                  : "Data Loading..."}
              </AccordionDetails>
            </Accordion>
          </div>

          <Button
            style={{ backgroundColor: `${theme.palette.primary.main}` }}
            variant="contained"
            className="fw-medium text-white mt-2"
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompanySetting;
