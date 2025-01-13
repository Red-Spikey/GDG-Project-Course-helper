import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Courses } from "./pages/Courses";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
