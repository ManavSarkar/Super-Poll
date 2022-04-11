import "./App.css";
import Navbar from "./components/navbar.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NewPoll from "./pages/newpoll";
import Dashboard from "./pages/dashboard";
import Contact from "./pages/contact";
import About from "./pages/about";
import Login from "./pages/login";
import PollVote from "./pages/poll_vote";
import Signup from "./pages/signup";
import PollResult from "./pages/pollResult";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poll">
            <Route path="newpoll" element={<NewPoll />} />
            <Route path="result/:id" element={<PollResult />} />
            <Route path="vote/:id" element={<PollVote />} />
          </Route>
          <Route path="/user">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
