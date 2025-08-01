import { useNavigate } from "react-router-dom";
import heroBanner from "../../public/images/heroBanner.png"; // Assuming correct path

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Banner Image */}
      <img
        src={heroBanner}
        alt="AJTracker Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HeroSection;
