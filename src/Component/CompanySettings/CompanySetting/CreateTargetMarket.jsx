import { useState ,useEffect} from "react";
import Button from "../../Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { theme } from "../../../Theme/Theme";
import Input from "../../Input";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../../service/api";

const validationSchema = Yup.object().shape({
  target_name: Yup.string().required("Target Name is required"),
  location: Yup.string().required("Location is required"),
  employee_count: Yup.string().required("Employee Count is required"),
  industry: Yup.string().required("Industry is required"),
  job_title: Yup.string().required("Job Title is required"),
});
const CreateTargetMarket = ({ targetShow, setTargetShow,serviceid, fetchService,selectedTargetMarket }) => {
  const handleClose = () => setTargetShow(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (selectedTargetMarket) {
      setIsEditMode(true);
    }
  }, [selectedTargetMarket]);
  const formik = useFormik({
    initialValues: {
      target_name: isEditMode ? selectedTargetMarket.targetName : "",
      location: isEditMode ? selectedTargetMarket.location.join(",") : "",
      employee_count: isEditMode ? selectedTargetMarket.employeeCount : "",
      industry: isEditMode ? selectedTargetMarket.industry.join(",") : "",
      job_title: isEditMode ? selectedTargetMarket.jobTitle : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const targetMarketData = {
        targetName: values.target_name,
        location: values.location.split(","),
        employeeCount: values.employee_count,
        industry: values.industry.split(","),
        jobTitle: values.job_title,
        serviceId: serviceid
      };

      try {
        let resData;
        if (isEditMode) {
          resData = await api.post("/target-market/update", {
            targetMarketId: editTargetMarketData._id,
            ...targetMarketData
          });
        } else {
          resData = await api.post("/target-market/add", targetMarketData); 
        }
        
        if (resData.isSuccess) {
          toast.success(isEditMode ? "Target Market Updated Successfully" : "Target Market Created Successfully");
          fetchService(); 
          handleClose();
        } else {
          toast.error(resData.response.data.message);
        }
      } catch (error) {
        console.error("API Error:", error);
        toast.error(isEditMode ? "Failed to update target market" : "Failed to create target market");
      }
    },
  });
  
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
          <Modal.Title className="fw-medium d-flex align-items-center"><AcUnitIcon />Create Target Market</Modal.Title>
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
                      type="submit"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}`,
                      }}
                      className="ms-2 mt-2"
                      onClick={formik.handleSubmit}
                    >
                      Create Market
                    </Button>
                
              
              </Col>
            </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateTargetMarket;
