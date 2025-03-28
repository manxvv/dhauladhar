"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";

export function ImagesSliderDemo() {
  const images = [
  '65bf85f94db29035a7f18fe8_RAAS Kangra Single Colunm 1 Image 1.webp' ,
  '7266c44c117245fa77a824c1ab0abd02.webp',
  'a81841bb291e7deb3d4377bec10deb55.jpg',
  'Dharamshala_-Land-of-Dhauladhar-Mountains--1024x491.jpg',
  'kangra-valley-feature.webp',
  'Echor-Hill-Farm-Cottages-Palampur-1-1.jpg',
  'Echor-Hill-Farm-Cottages-Palampur-2-1.jpg' 
  ];
  return (
    <ImagesSlider className="h-[30rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center">
        {/* <motion.p
          className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button
          className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div
            className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button> */}
      </motion.div>
    </ImagesSlider>
  );
}
