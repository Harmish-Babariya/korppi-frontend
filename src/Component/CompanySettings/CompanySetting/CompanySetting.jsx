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
  const [serviceid, setServiceId] = useState();
  const [selectedfeatures, setSelectedFeatures] = useState(service[0]?.features);
  const [selectedbenefits, setSelectedBenefits] = useState(service[0]?.benefits);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const feachService = async () => {
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
    feachService();
  }, []);
  const handleEdit = async() => {
    handleShow()
    try {
      const resData = await api.post("service/getById",{
        serviceId: serviceid
    });
      if (resData.isSuccess) {
       console.log(resData.data)
      } else {
        toast.error(resData.response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error); 
    }
  }
  const handleServiceClick = (id) => {
    setSelectedService(id)
    const fuature = service.find((value,index)=>index === id)
    setSelectedFeatures(fuature.features)
    setSelectedBenefits(fuature.benefits)
    console.log(fuature._id)
    setServiceId(fuature._id)
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
          <div className="">
            <Input
              id={"companyname"}
              lebel={"Company Name"}
              className={"w-100"}
              type={"text"}
              // value={user}
              // onchange={(e) => setUser(e.target.value)}
              size={"small"}
              classnamelebal={"mt-1"}
            />
            <Input
              id={"Industry"}
              lebel={"Industry"}
              className={"w-100 mt-2"}
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
              className={"w-100"}
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
        <div className="col-7">
          <div className="mt-2 mb-2" style={{ maxHeight: "300px" }}>
            <table className="table table-hover " style={{ minWidth: "100%" }}>
              <thead className="fs-4">
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
              }}
            >
              <table className="table" style={{ minWidth: "100%" }}>
                <tbody>
                  {service?.map((value, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          style={{ letterSpacing: "1.5px" }}
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
            className="me-2 ms-3 fw-medium"
            onClick={()=>handleEdit()}
          >
            Edit
          </Button>

          <Button
            style={{ backgroundColor: `${theme.palette.primary.main}` }}
            variant="contained"
            className="fw-medium text-white"
            onClick={handleShow2}
          >
            Add Service
          </Button>
        </div>

        {show && <CompanyEditService show={show} setShow={setShow} />}
        {show2 && (
          <CompanyCreateService
            show2={show2}
            setShow2={setShow2}
            feachService={feachService}
          />
        )}
        <div className="col-12 mt-2">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-body-secondary"
            >
              <Typography className="fw-bold">Featurs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  {selectedfeatures.map((value, index) => (
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
                  {selectedbenefits.map((value, index) => (
                    <li key={index}>{value.description}</li>
                  ))}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Button
            sx={{ backgroundColor: `${theme.palette.primary.main}` }}
            variant="contained"
            className="fw-medium text-white mt-2 ms-3"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompanySetting;
