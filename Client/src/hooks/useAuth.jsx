import { useSelector } from "react-redux";
import { getAuth } from "../store/slices/authSlice";
const useAuth = () => {
  const auth = useSelector(getAuth);
  return auth?._id ? true : false;
};

export default useAuth;
