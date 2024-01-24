import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

import CompanyEditService from "./CompanyEditService";
import CompanyCreateService from "./CompanyCreateService";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const CompanySetting = () => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

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
        <div className="col-6">
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
              <table className="table table-hover" style={{ minWidth: "100%" }}>
                <tbody>
                  {names?.map((value, index) => (
                    <tr key={index}>
                      <td>{value}</td>
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
            onClick={handleShow}
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

        <div className="col-6">
          <div className="mt-2 mb-2" style={{ maxHeight: "300px" }}>
            <table
              className="table table-hover bg-body-secondary"
              style={{ minWidth: "100%" }}
            >
              <thead className="fs-4">
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
              }}
            >
              <table className="table table-hover" style={{ minWidth: "100%" }}>
                <tbody>
                  {names?.map((value, index) => (
                    <tr key={index}>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Button
            style={{ color: `${theme.palette.primary.main}` }}
            variant="outlined"
            className="me-2 ms-3 fw-medium"
            onClick={handleShow}
          >
            Edit
          </Button>

          <Button
            style={{ backgroundColor: `${theme.palette.primary.main}` }}
            variant=""
            className="fw-medium text-white"
          >
            Create Market
          </Button>
        </div>
        {show && <CompanyEditService show={show} setShow={setShow} />}
        {show2 && <CompanyCreateService show2={show2} setShow2={setShow2} />}
        <div className="col mt-3">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-body-secondary"
            >
              <Typography>Featurs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              className="bg-body-secondary"
            >
              <Typography>Benefits</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
