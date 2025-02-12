import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Gorgeous & Gleam</h3>
            <p className="text-gray-600">Your one-stop destination for beautiful jewelry and accessories.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/?category=necklaces" className="text-gray-600 hover:text-primary">Necklaces</Link></li>
              <li><Link to="/?category=earrings" className="text-gray-600 hover:text-primary">Earrings</Link></li>
              <li><Link to="/?category=bows" className="text-gray-600 hover:text-primary">Bows</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@gorgeousandgleam.com</li>
              <li className="text-gray-600">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Gorgeous & Gleam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;