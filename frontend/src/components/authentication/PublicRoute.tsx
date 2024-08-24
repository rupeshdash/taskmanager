// src/components/PublicRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ restricted } : any) => {
  const isAuthenticated = useSelector(
    (state: any) => state.authData.isAuthenticated
  );
   console.log(isAuthenticated && restricted);
    
  // If user is authenticated and the route is restricted, redirect to the dashboard or another page
  if (isAuthenticated && restricted) {
    return <Navigate to="/teams" />;
  }

  return <Outlet />;
};

export default PublicRoute;
