import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import SingleBlog from "./components/SingleBlog";
import Contact from "./components/Contact";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </Router>
  );
};

export default App;