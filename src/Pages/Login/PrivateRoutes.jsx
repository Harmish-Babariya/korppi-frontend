import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../service/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginhandle } from "../../Redux/AuthSlice";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("user_token");
  const fetchUser = async () => {
    try {
      let response = await api.post("user/getById");
      if (response.isSuccess) {
        dispatch(loginhandle(response.data));
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
