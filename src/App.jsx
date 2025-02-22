import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { useEffect, useState } from 'react';


const AdminProtected = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = "r@jdeep20"; // Change this to your desired password
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password! Try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4">Enter Admin Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            placeholder="Enter password"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Submit
          </button>
        </form>
      </div>
    );
  }

  return <Admin />;
};

function App() {

  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminProtected  />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;