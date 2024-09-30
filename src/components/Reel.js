import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../css/Reel.css';
import noRewardIcon from '../assets/no-reward-icon.jpg';

const Reel = ({ item, isSpinning }) => {
  const reelRef = useRef(null);

  useEffect(() => {
    if (isSpinning) {
      const elements = reelRef.current.querySelectorAll('.reel-item');
      gsap.to(elements, {
        yPercent: "+=250", // Move down to simulate spinning
        repeat: -1, // Infinite loop while spinning
        duration: 0.2, // Fast duration for spinning effect
        ease: "none",
        modifiers: {
          yPercent: gsap.utils.wrap(-100, 100),
        },
      });
    } else {
      // Stop spinning and reset position
      gsap.killTweensOf(reelRef.current.querySelectorAll('.reel-item')); // Stop spinning
      const reelItems = reelRef.current.querySelectorAll('.reel-item');

      // Center each item by resetting its transform
      reelItems.forEach((item) => {
        item.style.transform = 'translateY(0)'; // Reset translateY to 0
      });
    }
  }, [isSpinning]);

  return (
    <div className="reel-container" ref={reelRef}>
      <div className="reel-item">
        {item ? (
          <img src={item.image} alt={item.type} />
        ) : (
          <img src={noRewardIcon} alt="No Reward" className="no-reward-icon" />
        )}
      </div>
    </div>
  );
};

export default Reel;
