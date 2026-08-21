import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <div className="flex-1 flex-row flex items-center justify-between">
        <div className="">BuzMag</div>
        <div className="">search</div>
        <div className="flex items-center space-x-2 ">
          <button className="rounded bg-primary px-4 text-white hover:bg-primary/90">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
