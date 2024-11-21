import React from 'react'
import { useLocation } from 'react-router-dom'
function Dashboard() {
  const location = useLocation();
  const userData = location.state?.userData || {};
  console.log(userData);
  return (
    <div>
        Hello {userData.name} !
    </div>
  )
}

export default Dashboard