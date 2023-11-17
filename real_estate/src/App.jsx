import Login from "./Pages/Login";
import CreateUser from "./Pages/CreateNewUser";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthState from "./context/authstate";
import AdminPage from "./Pages/AdminPages/AdminPage";
import UserPage from "./Pages/UserPages.jsx/UserPage";
import ProtectedRoute from "./ProtectedRoutes";
import Ekyc from "./Ekyc";
function App() {
  return (
    <div className="mx-2">
      <AuthState>
        <Routes>
        <Route element={<Ekyc />} path="/"></Route>
        <Route element={<Login/>} path ="/login"></Route>
        {/* <Route
                element={
                  <ProtectedRoute
                    element={<Login />}
                    allowedRoles={["IIITD"]}
                  />
                }
                path="/login"
              /> */}
          <Route element={<CreateUser />} path="/new-account"></Route>
          {/* <Route element={<AdminPage />} path="/admin/*"></Route>
          <Route element={<UserPage />} path="/user/*"></Route> */} 
          {/* uncomment above and comment below to enter without authentication, most features wont work without auth though */}
          <Route
                element={
                  <ProtectedRoute
                    element={<AdminPage />}
                    allowedRoles={['admin']}
                  />
                }
                path="/admin/*"
              />
              <Route
                element={
                  <ProtectedRoute
                    element={<UserPage />}
                    allowedRoles={['user']}
                  />
                }
                path="/user/*"
              />
        </Routes>
      </AuthState>
    </div>
  );
}

export default App;
