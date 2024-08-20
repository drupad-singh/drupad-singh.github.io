import { useState, useEffect } from 'react';
import { Device } from '../types/Common';

// Define breakpoints for different devices
const breakpoints = {
  mobile: 480,   // Up to 480px width
  tablet: 768,   // Up to 768px width
  desktop: 1024  // Up to 1024px width
};

// Function to determine device type based on screen width
const getDeviceType = (width) => {
  if (width <= breakpoints.mobile) return Device.Mobile;
  if (width <= breakpoints.tablet) return Device.Tablet;
  return Device.Desktop;
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};
