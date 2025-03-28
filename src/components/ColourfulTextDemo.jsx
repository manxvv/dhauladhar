"use client";
import React from "react";
import ColourfulText from "../components/ui/colourful-text";
import { motion } from "framer-motion";

export function ColourfulTextDemo() {
    return (

        <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-start text-black relative z-2 font-sans">
        Discover Serenity in the land of <ColourfulText text="Palampur" />
    </h1>
    
        // <div
        //   className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
        // {/* <motion.img
        // src="https://assets.aceternity.com/linear-demo.webp"
        // className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 0.5 }}
        // transition={{ duration: 1 }} /> */}
  
    // </div>
  );
}
