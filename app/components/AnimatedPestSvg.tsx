"use client";

import { useState, useEffect } from "react";
import PestSvg from "./PestSvg";

type Props = {
  id: string;
  size: number;
};

export default function AnimatedPestSvg({ id, size }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(localStorage.getItem("hoverAnimate") === "true");
  }, []);

  return (
    <div className={animate ? "always-animate" : ""}>
      <PestSvg id={id} size={size} />
    </div>
  );
}
