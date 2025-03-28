
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t py-8 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="text-primary p-2 rounded-full bg-primary/10">
                <span className="font-arabic font-bold">ض</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight">Dhiya'</span>
                <span className="text-xs text-muted-foreground font-medium">
                  Ramadhan
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Dhiya' Ramadhan provides daily reflections, prayer schedules, and
              worship tracking throughout the month of Ramadan.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/learning-hub"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Learning Hub
                  </Link>
                </li>
                <li>
                  <Link
                    to="/duas"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Dua Collection
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Prayer Times
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
                Account
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            &copy; {currentYear} Dhiya' Ramadhan. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with{" "}
            <Heart className="h-3 w-3 mx-1 text-destructive animate-pulse" /> for
            Ramadan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
