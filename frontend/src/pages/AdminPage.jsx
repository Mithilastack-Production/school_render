import React from "react";
import Admin from "../Components/AdminPageComponent/Admin";

function AdminPage({ children }) {
  return (
    <>
      <Admin>{children}</Admin>
    </>
  );
}

export default AdminPage;
