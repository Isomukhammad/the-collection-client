import { JSX } from "react";

const Hero = (): JSX.Element => {
  return (
    <div
      className="p-5 text-center bg-image rounded"
      style={{
        backgroundImage: "url('/images/hero.webp')",
        height: 500,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="text-white">
            <h1 className="mb-3">TheCollection</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
