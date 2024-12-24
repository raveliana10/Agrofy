const RoleBasedRoute = ({ role, allowedRoles, children }) => {
  if (!allowedRoles.includes(role)) {
    return (window.location.href = "*");
  }
  return children;
};

export default RoleBasedRoute;
