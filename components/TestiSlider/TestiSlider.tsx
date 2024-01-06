import { FC, useCallback, useEffect, useState } from "react";
import LeftArrow from "../../public/icons/LeftArrow";
import RightArrow from "../../public/icons/RightArrow";

const testi = [
  {
    speech:
      "Arpan Decores transformed my hotel into a captivating dining space. Their keen eye for design and attention to detail created an ambiance that resonates with our customers.",
    name: "",
    occupation: "",
  },
  {
    speech:
      "Arpan Decores collaborates seamlessly, turning architectural visions into reality. Their innovative designs enhance the appeal of our constructions, reflecting a perfect blend of aesthetics and functionality.",
    name: "",
    occupation: "",
  },
  {
    speech:
      "Arpan Decores exceeded expectations, infusing charm into our event spaces. Their creativity and adaptability ensure each celebration is surrounded by an atmosphere of elegance and sophistication. Highly recommended!",
    name: "",
    occupation: "",
  },
];
// animate__fadeIn
// animate__lightSpeedInRight
const TestiSlider: FC = () => {
  const [arrIndex, setArrIndex] = useState(0);
  const [animate, setAnimate] = useState("animate__lightSpeedInRight");

  const handleNext = useCallback(() => {
    if (arrIndex === testi.length - 1) {
      setArrIndex(0);
    } else {
      setArrIndex((prevState) => prevState + 1);
      setAnimate("animate__lightSpeedInRight");
    }
  }, [arrIndex]);

  const handlePrev = () => {
    if (arrIndex === 0) {
      setArrIndex(testi.length - 1);
    } else {
      setArrIndex((prevState) => prevState - 1);
      setAnimate("animate__lightSpeedInLeft");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);
  return (
    <div
      className="flex flex-1 overflow-hidden relative my-6"
      style={{ width: "700px" }}
    >
      <div className="slide-section min-w-min h-40 flex">
        {testi.map((ti, index) => {
          return (
            index === arrIndex && (
              <div
                key={ti.name}
                className={`text-silver h-full flex flex-col items-center justify-center animate__animated ${animate}`}
                style={{ width: "700px" }}
              >
                <div className="textiContainer text-center w-3/4">
                  <span>{ti.speech}</span>
                  <h3 className="font-bold mt-6">{ti.name}</h3>
                  <i className="fas fa-band-aid text-white"></i>
                  <span className="text-sm">{ti.occupation? ti.occupation:''}</span>
                </div>
              </div>
            )
          );
        })}
      </div>
      <span
        className="absolute text-gray400 hover:text-gray500 top-1/3 left-3 hover:bg-gray200 rounded-full p-2 cursor-pointer outline-none"
        onClick={handlePrev}
      >
        <LeftArrow />
      </span>
      <span
        className="absolute text-gray400 hover:text-gray500 top-1/3 right-5 hover:bg-gray200 rounded-full p-2 cursor-pointer outline-none"
        onClick={handleNext}
      >
        <RightArrow />
      </span>
    </div>
  );
};

export default TestiSlider;
