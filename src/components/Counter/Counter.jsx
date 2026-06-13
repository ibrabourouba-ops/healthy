import "./Counter.scss";
import CountUp from "react-countup";
import { useContext } from "react";
import { CartContext } from "../ShopContext/ShopContext";

const Counter = () => {
  const { stats } = useContext(CartContext);
  const counterData = [
    { end: stats.members, label: "Total Member" },
    { end: stats.equipment, label: "Equipment" },
    { end: stats.trainers, label: "Total Trainer" },
    { end: stats.awards, label: "Win Awards" },
  ];

  return (
    <section className="counter">
      {counterData.map((item, index) => (
        <div className="counter__box" key={`${item.label}-${item.end}`}>
          <CountUp
            key={`${item.label}-${item.end}`}
            start={0}
            end={item.end}
            duration={1.5}
            separator="," 
            enableScrollSpy
            scrollSpyOnce
            className="counter__number"
          />
          <p className="counter__text">{item.label}</p>
        </div>
      ))}
    </section>
  );
};

export default Counter;
