import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import TaskList from "./components/Tasks/TaskList";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./guard/protectedRoute";
import NotFound from "./guard/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoute component={Login} />} />{" "}
            <Route
              path="/register"
              element={<ProtectedRoute component={Register} />}
            />{" "}
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
