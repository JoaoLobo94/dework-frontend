import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signInPage/signIn";
import Companies from "./pages/companiesPage/companies";
import ProtectedRoutes from "./pages/protectedPage/protectedRoute";
// import Contributions from "./pages/contributionsPage/contribributions";
import SingleCompanyPage from "./pages/singleCompaniesPage/singleCompaniesPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/*" element={<SingleCompanyPage />} />
            {/* <Route path="/contributions" element={<Contributions />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
