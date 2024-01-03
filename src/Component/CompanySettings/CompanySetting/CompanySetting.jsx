import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CompanyEditService from "./CompanyEditService";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CompanySetting = () => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
          <div>
            <label className="mt-1" htmlFor="Company Name">
              Company Name :
            </label>
            <TextField
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              size="small"
              fullWidth
            />
            <label className="mt-1" htmlFor="Industry">
              Industry :
            </label>
            <TextField
              id="outlined-basic"
              label="Industry"
              variant="outlined"
              size="small"
              className="mt-1"
              fullWidth
            />
          </div>
          <div>
            <label className="mt-1" htmlFor="Company ">
              Companies You Work With :
            </label>
            <TextField
              id="outlined-basic"
              label="Companies You Work With"
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>
        </Box>

        {show && <CompanyEditService show={show} setShow={setShow} />}
      </div>
      <hr />
      <div className="row d-flex">
        <div className="col-6">
          <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel id="Services/Product">Services/Product</InputLabel>
            <Select
              labelId="Services/Product"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{ color:`${theme.palette.primary.main}` }}
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
            Add Service
          </Button>
        </div>
        <div className="col-6">
          <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel id="Create Market">Create Market</InputLabel>
            <Select
              labelId="Services/Product"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            style={{ color:`${theme.palette.primary.main}`  }}
            variant="outlined"
            className="me-2 ms-3 fw-medium"
            onClick={handleShow}
          >
            Edit
          </Button>

          <Button
            style={{ backgroundColor:`${theme.palette.primary.main}` }}
            variant=""
            className="fw-medium text-white"
          >
            Create Market
          </Button>
        </div>

        <div className="col">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
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
