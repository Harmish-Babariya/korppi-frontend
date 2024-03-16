import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmailLoginModal from "./EmailLoginModal";
import { theme } from "../../../Theme/Theme";
import api from "../../../service/api";
import { toast } from "react-toastify";
import GoogleLoginModal from "./GoogleLoginModal";
import { loginhandle } from "../../../Redux/AuthSlice";
import { useDispatch } from "react-redux";

const EmailSetting = ({ userDatails, handleClose }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data, setData] = useState(userDatails);
  const [domainHealthCheck, setDomainHealthCheck] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showOfficeModal, setShowOfficeModal] = useState(false);
  const [signature, setSignature] = useState(
    data?.firstName +
      " " +
      data?.lastName +
      "\n" +
      data?.role +
      " | " +
      data?.companyId?.name +
      "\n" +
      "E: " +
      data?.email +
      "\n" +
      "W: " +
      data?.companyId?.websiteUrl
  );
  const handleShow = () => setShow(true);

  function handleChange(e) {
    let newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    setSignature(
      newData?.firstName +
        " " +
        newData?.lastName +
        "\n" +
        newData?.role +
        " | " +
        newData?.companyId.name +
        "\n" +
        "E: " +
        newData?.email
    );
  }

  const fetchUser = async () => {
    try {
      let response = await api.post("/user/getById");
      if (response.isSuccess) {
        setData(response.data);
        dispatch(loginhandle(response.data));
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailConfigChange = async (index) => {
    try {
      const { _id, emailConfig } = data;
      const updatedEmailConfig = emailConfig.map((config, ind) => {
        return {
          ...config,
          isActive: ind === index ? true : false,
        };
      });
      const newData = { id: _id, emailConfig: updatedEmailConfig };

      const res = await api.post("/user/update", newData);
      if (res.isSuccess) {
        toast.success("Email Config Updated Successfully");
        fetchUser();
        setData(newData);
      } else {
        toast.error("Failed to Update Email Config");
      }
    } catch (error) {
      console.error("Error updating email config:", error);
    }
  };

  async function handleSubmit() {
    try {
      const editedUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        id: userDatails._id,
      };
      const resData = await api.post("/user/update", editedUser);
      if (resData.isSuccess) {
        toast.success("User Update Successful");
        fetchUser();
        handleClose();
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error("User Data Not Updated", error);
    }
  }
  useEffect(() => {
    // Fetch domain health status when component mounts
    fetchDomainHealth();
  }, []);
  // const redirectToSettingsPage = () => {
  //   history.push("/settings"); // Redirect to the Settings Page
  // };
  const fetchDomainHealth = async () => {
    // try {
    //   const response = await api.post("/domain/health");
    //   if (response.isSuccess) {
    //     setDomainHealthCheck(response.data.healthCheck);
    //   } else {
    //     toast.error("Failed to fetch domain health status");
    //   }
    // } catch (error) {
    //   console.error("Error fetching domain health status:", error);
    // }
  };
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
              name="firstName"
              size="small"
              value={data.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Job Title"
              variant="outlined"
              name="role"
              value={data.role}
              onChange={handleChange}
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
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </div>
        </Box>
      </div>
      <hr />
      <div className="row d-flex mt-1">
        <div className="col border-end me-2">
          <Typography className="ms-2 fw-bold" variant="h6" component="div">
            Email
          </Typography>
          <div>
            {data?.emailConfig?.map((value, index) => (
              <div key={index}>
                <input
                  type="radio"
                  className="m-2"
                  name="recordType"
                  id={`emailRecord-${index}`}
                  checked={value.isActive}
                  onChange={() => handleEmailConfigChange(index)}
                  style={{ accentColor: `${value.isActive ? "#008000" : ""}` }}
                />
                <label className="ms-1" htmlFor={`emailRecord-${index}`}>
                  {value.email}
                </label>
              </div>
            ))}
          </div>

          <Button
            variant="contained"
            style={{
              backgroundColor: `${theme.palette.primary.main}`,
              color: "white",
              letterSpacing: "1px",
            }}
            className="btn-sm m-2 ms-2"
            onClick={handleShow}
          >
            Login
          </Button>
          {show && (
            <EmailLoginModal
              show={show}
              setShow={setShow}
              setShowGoogleModal={setShowGoogleModal}
            />
          )}
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
              style={{ outline: "none" }}
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
          Domain Health
          <span className="fw-normal fs-6 text-muted text-decoration-underline">
            Refresh
          </span>
        </Typography>
        <div>
          {/* Conditional rendering based on domain health check */}
          {domainHealthCheck ? (
            <span className="text-success ms-2">
              &#10004; Health Check Passed
            </span>
          ) : (
            <span className="text-danger ms-2">Health Check Failed</span>
          )}
        </div>
        {/* <div className="d-flex justify-content-end mt-2">
        <Button variant="contained" onClick={redirectToSettingsPage}>
          Profile
        </Button>
      </div> */}
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
      <div className="d-flex justify-content-end mt-2">
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="outlined"
          className="ms-1"
          style={{
            color: `${theme.palette.primary.main}`,
          }}
          onClick={handleSubmit}
        >
          Save & Close
        </Button>
      </div>
      {showGoogleModal && (
        <GoogleLoginModal
          showGoogleModal={showGoogleModal}
          setShowGoogleModal={setShowGoogleModal}
        />
      )}
    </>
  );
};

export default EmailSetting;
