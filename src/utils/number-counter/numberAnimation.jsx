"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function AnimatedNumber({ value }) {
  const formatted = parseFloat(
    value.replace("₺", "").replaceAll(".", "").replace(",", ".")
  );

  const spring = useSpring(formatted, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  let display = useTransform(
    spring,
    (current) => Math.round(current).toLocaleString("tr-TR") + "₺"
  );

  useEffect(() => {
    spring.set(formatted);
  }, [spring, formatted]);

  return <motion.span>{display}</motion.span>;
}
