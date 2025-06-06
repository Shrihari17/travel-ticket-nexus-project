
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This would be replaced with actual authentication logic
  const simulateLogin = () => setIsLoggedIn(true);
  const simulateLogout = () => setIsLoggedIn(false);

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
          <span className="text-orange-500 mr-1">Bus</span>Tracker
        </Link>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-lg hover:text-blue-600">Home</Link>
                <Link to="/routes" className="text-lg hover:text-blue-600">Routes</Link>
                <Link to="/my-tickets" className="text-lg hover:text-blue-600">My Tickets</Link>
                <Link to="/contact" className="text-lg hover:text-blue-600">Contact Us</Link>
                {isLoggedIn ? (
                  <>
                    <Link to="/my-account" className="text-lg hover:text-blue-600">My Account</Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center"
                      onClick={simulateLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button 
                        variant="outline" 
                        className="w-full justify-center"
                        onClick={simulateLogin}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/routes" className="text-gray-700 hover:text-blue-600">Routes</Link>
            <Link to="/my-tickets" className="text-gray-700 hover:text-blue-600">My Tickets</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link>
          </nav>
          
          <div className="flex space-x-3">
            {isLoggedIn ? (
              <>
                <Link to="/my-account">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    My Account
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={simulateLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    onClick={simulateLogin}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
