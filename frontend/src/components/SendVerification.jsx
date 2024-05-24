import { useState } from "react";
import { backendUrl } from "../api/api";
import { useNavigate } from "react-router-dom";

const SendVerification = ({ userId, token }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const sendEmail = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/send-email/${userId}`, {
      headers: { authorization: `Bearer ${token}` },
      method: "GET",
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(
        data.message || "Failed to send email, please try again"
      );

    const userInfo = data.result;
    navigate(`/verify-email/${userId}`);
  };

  return (
    <>
      Please verify your account:
      <button onClick={sendEmail}>VerifyEmail</button>
    </>
  );
};

export default SendVerification;
