
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BusTracker</h3>
            <p className="text-blue-200">
              Your trusted bus reservation platform providing comfortable and reliable bus services across the country.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-200 hover:text-white">Home</Link></li>
              <li><Link to="/routes" className="text-blue-200 hover:text-white">Bus Routes</Link></li>
              <li><Link to="/login" className="text-blue-200 hover:text-white">Login</Link></li>
              <li><Link to="/register" className="text-blue-200 hover:text-white">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/faqs" className="text-blue-200 hover:text-white">FAQs</Link></li>
              <li><Link to="/terms" className="text-blue-200 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-blue-200 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Info</h4>
            <address className="not-italic text-blue-200">
              <p className="mb-2">123 Bus Terminal Road</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p>Email: info@bustracker.com</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-blue-800 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} BusTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
