import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

import SendVerification from '../components/SendVerification';
import { useEffect, useState } from 'react';
import { backendUrl } from '../api/api';

const Dashboard = ({ token }) => {
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verified, setVerified] = useState(false);

  const { _id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${backendUrl}/api/v1/users/${_id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data.result)
        return setErrorMessage(data.message || 'Could not load user');

      setUser(data.result);

      setVerified(data.result.user.isEmailVerified);

      setErrorMessage(''); // reset error message (zur sicherheit)
    }

    fetchUser();
    // fetchUser();
  }, [verified]);

  return (
    <>
      <Navbar userId={_id} />
      {verified ? '' : <SendVerification userId={_id} token={token} />}

      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
