import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalmSecondBrain from "./components/layouts/home-page";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import InitState from "./components/hooks/init-state";

import { PublicBrain } from "./components/content/public-brain";

const App = () => {
  return (
    <BrowserRouter>
      <InitState />
      <Routes>
        <Route path="/" element={<CalmSecondBrain />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<CalmSecondBrain />} />
        <Route path="/share/:hash" element={<PublicBrain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
