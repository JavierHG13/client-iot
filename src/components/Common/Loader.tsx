import React from "react";
import AnimatedPage from "./AnimatedPage";

import "./Loader.css";

const Loader: React.FC = () => {
  return (
    <AnimatedPage disableAnimation={true}>

      <div className="loader-container">
        <div className="loader"></div>
      </div>
      
    </AnimatedPage>
  );
};

export default Loader;
