import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import useAuth from "./hooks/useAuth";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Loader from "./components/common/Loader";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/*"
        element={<ProtectedLayout />}
      />
    </Routes>
  );
};

export default App;


