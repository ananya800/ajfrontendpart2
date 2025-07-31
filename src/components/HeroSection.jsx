import { useNavigate } from "react-router-dom";
import heroBanner from "../../public/images/heroBanner.png";


const HeroSection = () => {
  return (
    <div  className="w-full h-[100vh] object-cover object-center">
      {/* Banner Image */}
      <img
        src="./public/images/heroBanner.png" 
        alt="AJTracker Banner"
        className="w-full h-full object-cover"
      />

      
    </div>
  );
};

export default HeroSection;
