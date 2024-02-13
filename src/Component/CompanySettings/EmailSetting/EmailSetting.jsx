import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmailLoginModal from "./EmailLoginModal";
import { theme } from "../../../Theme/Theme";
import { Input } from "reactstrap";
const EmailSetting = ({userDatails}) => {
  const [show, setShow] = useState(false);
  const [signature, setSignature] = useState(userDatails?.firstName + ' ' +userDatails?.lastName + "\n" + userDatails?.role +" | " + userDatails?.companyId.name + "\n" + "E: " + userDatails?.email);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="d-flex">
        <Box
          component="form"
          sx={{
            display: "flex",
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              size="small"
              value={userDatails.firstName}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Job Title"
              variant="outlined"
              value={userDatails.role}
              size="small"
              className="mt-2"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            value={userDatails.lastName}
              size="small"
              fullWidth
            />
          </div>
        </Box>
      </div>
      <hr />
      <div className="row d-flex mt-1">
        <div className="col border-end me-2">
          {" "}
          <Typography className="ms-2 fw-bold" variant="h6" component="div">
            Email
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: `${theme.palette.primary.main}`,
              color: "white",
              letterSpacing: "1px",
            }}
            className="btn-sm m-2 ms-2"
            onClick={handleShow}
          >
            Login
          </Button>
          {show && <EmailLoginModal show={show} setShow={setShow} />}
          <Button
            variant="outlined"
            style={{
              color: `${theme.palette.primary.main}`,
              letterSpacing: "1px",
            }}
            className="btn-sm  m-2 ms-1"
          >
            Disconnect
          </Button>
        </div>
        <div className="col">
          <Typography className="fw-bold" variant="h6" component="div">
            Signature
          </Typography>
          <Typography
            className=" ps-3 py-1 bg-body-secondary rounded "
            variant="h10"
            component="div"
          >
            <textarea
              id={"Singature"}
              name={"Singature"}
              className={"w-100 bg-transparent border-0"}
              style={{"outline": "none"}}
              type={"text"}
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              size={"small"}
              classnamelebal={"mt-1"}
            />
            
          </Typography>
        </div>
      </div>
      <hr />
      <div>
        <Typography className="fw-bold" variant="h5" component="div">
          Domain Health{" "}
          <span className="fw-normal fs-6 text-muted text-decoration-underline">
            Refresh
          </span>
        </Typography>
        <div className="bg-body-secondary rounded">
          <form className="m-2">
            <input
              type="radio"
              className="m-2"
              name="recordType"
              id="spfRecord"
            />
            <label className="ms-1" htmlFor="spfRecord">
              SPF Record
            </label>
            <input
              type="radio"
              className="m-2"
              name="recordType"
              id="dkimRecord"
            />
            <label className="ms-1" htmlFor="dkimRecord">
              DKIM Record
            </label>
            <input
              type="radio"
              className="m-2"
              name="recordType"
              id="dmarcRecord"
            />
            <label className="ms-1" htmlFor="dmarcRecord">
              DMARC Record
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailSetting;
