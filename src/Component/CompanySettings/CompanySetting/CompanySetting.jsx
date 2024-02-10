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

const CompanySetting = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const { service, status } = useSelector((state) => state.Service);
  const [selectedService, setSelectedService] = useState(null);
  const [editService, setEditService] = useState(null);
  const [serviceid, setServiceId] = useState();
  const [selectedfeatures, setSelectedFeatures] = useState(
    service[0]?.features
  );
  const [selectedbenefits, setSelectedBenefits] = useState(
    service[0]?.benefits
  );
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const fetchService = async () => {
    try {
      const resData = await api.post("service/get");
      if (resData.isSuccess) {
        dispatch(servicehandle(resData.data));
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
  const handleServiceClick = (id) => {
    setSelectedService(id);
    const fuature = service.find((value, index) => index === id);
    setSelectedFeatures(fuature.features);
    setSelectedBenefits(fuature.benefits);
    setServiceId(fuature._id);
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
              lebel={"Company Name"}
              className={"w-75"}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-1"}
            />
            <Input
              id={"Industry"}
              lebel={"Industry"}
              className={"w-75  mt-2"}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-1"}
            />
          </div>
          <div>
            <Input
              id={"Companies You Work With "}
              lebel={"Companies You Work With"}
              className={"w-75"}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-1"}
            />
          </div>
        </Box>
      </div>
      <hr />
      <div className="row d-flex">
        <div className="col-6">
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
              <thead className="fs-4 border-bottom">
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
          <Button
            sx={{ color: `${theme.palette.primary.main}` }}
            variant="outlined"
            className="me-2 ms-3 mt-2 fw-medium"
            onClick={() => handleEdit()}
          >
            Edit
          </Button>

          <Button
            style={{ backgroundColor: `${theme.palette.primary.main}` }}
            variant="contained"
            className="fw-medium text-white mt-2"
            onClick={handleShow2}
          >
            Add Service
          </Button>
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
        <div className="col-6 mt-2">
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
                <Typography>
                  <ul>
                    {selectedfeatures &&
                      selectedfeatures.map((value, index) => (
                        <li key={index}>{value.description}</li>
                      ))}
                  </ul>
                </Typography>
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
                <Typography>
                  <ul>
                    {selectedbenefits &&
                      selectedbenefits.map((value, index) => (
                        <li key={index}>{value.description}</li>
                      ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <Button
            sx={{ backgroundColor: `${theme.palette.primary.main}` }}
            variant="contained"
            className="fw-medium text-white mt-2"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompanySetting;
