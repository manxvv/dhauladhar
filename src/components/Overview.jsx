import React from 'react';
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { ImagesSliderDemo } from './ImagesSliderDemo';
import Navbar from './Navbar';
import Footer from './Footer';
import { MapPin, Mountain, Leaf } from 'lucide-react';
import { ColourfulTextDemo } from './ColourfulTextDemo';

"use client";

const words = `Escape to Serenity—Own a Luxurious Flat or Scenic Plot Amidst the Majestic Dhauladhar Range, Where Breathtaking Views, Fresh Mountain Air, and Unmatched Tranquility Await You!`;

export default function Overview() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ 
          backgroundImage: "url('/plp.webp')", 
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <TextGenerateEffect 
              words={words} 
              className="text-3xl md:text-5xl font-bold leading-tight mb-6"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Explore Properties
            </button>
          </div>
        </div>
      </div>

      {/* About Palampur Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div >
            <div className='mb-2'>

            <ColourfulTextDemo/>
            </div>
            {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Discover Palampur</h2> */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nestled in the heart of Himachal Pradesh, Palampur is a hidden gem that offers an unparalleled blend of natural beauty and serene living. Known for its lush tea gardens, breathtaking Dhauladhar ranges, and pristine environment, it's the perfect escape for those seeking tranquility and natural splendor.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-emerald-600" />
                <span className="text-gray-700">Prime Location</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mountain className="text-emerald-600" />
                <span className="text-gray-700">Scenic Views</span>
              </div>
              <div className="flex items-center space-x-3">
                <Leaf className="text-emerald-600" />
                <span className="text-gray-700">Natural Living</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <ImagesSliderDemo />
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="w-full">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Location Highlights</h2>
      </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d263743.70387919113!2d76.44409963654783!3d32.11036421032723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904b3e0d1e63ac9%3A0x11046afda32dfd59!2sPalampur%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1743077532530!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
         
      </section>

      <Footer />
    </div>
  );
}