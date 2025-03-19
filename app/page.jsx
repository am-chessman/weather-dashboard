"use client"
import React, { useState, useRef, useEffect } from "react";
import Overlay from "./overlay.jsx";

export default function Page() {
  const buttonRef = useRef(null)
  const overlayRef = useRef(null)
  const [overlay, setOverlay] = useState(false);

  const handleOverlay = () => {
    setOverlay(true);
  }

  const closeOverlay = () => {
    setOverlay(false);
  }

  useEffect(() => {
    console.log(overlay)
    if (overlay) {
      console.log("Overlay is true")
      overlayRef.current.classList.remove("hidden")
      if(overlayRef.current) {
        console.log(overlayRef)
      }
    } else if (!overlay) {
      console.log("Overlay is false")
      overlayRef.current.classList.add("hidden")
    }
  }, 
  [overlay])
  
  return (
    <>
      <div className="flex justify-center">
        <div className="h-20 flex justify-between items-center bg-amber-400 rounded-b-2xl px-5 w-200">
          <h1 className="text-3xl">Weather Dashboard</h1>
          <div className="hover:cursor-pointer">
            <button onClick={handleOverlay} ref={buttonRef} className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Country
            </button>
          </div>
        </div>
      </div>
      
      <div ref={overlayRef} className="fixed inset-0 backdrop-blur-sm z-10 hidden">
        <button onClick={closeOverlay} 
        className="absolute top-55 left-205 bg-blue-400 p-2 rounded-full hover:bg-blue-600 cursor-pointer z-30"
        >
          <img src="icons8-close.svg" alt="Close Icon" className="w-6"/>
        </button>
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <Overlay />
        </div>
      </div>
    </>
  );
}
