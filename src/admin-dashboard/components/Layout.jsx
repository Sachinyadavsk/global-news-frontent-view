import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar toggle={() => setOpen(!open)} />

        <div className="p-4 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>

    </div>
  );
};

export default Layout;