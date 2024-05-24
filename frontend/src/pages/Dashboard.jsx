import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import VerifyEmail from "../components/VerifyEmail";


const Dashboard = ({ token, user }) => {

  const { _id } = useParams();

  return (
    <>
    <Navbar/>
    <VerifyEmail/>
      <h1>Dashboard</h1>
      
    </>
  );
};

export default Dashboard;
