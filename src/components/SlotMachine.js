import React, { useState, useEffect } from 'react';
import Reel from './Reel';
import SpinButton from './SpinButton';
import RewardsDisplay from './RewardsDisplay';
import '../css/SlotMachine.css';
import { Howl } from 'howler';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// Sounds
const spinSound = new Howl({
  src: ['/sounds/spin.mp3'],
  loop: true,
  volume: 0.5,
});

const rewardSound = new Howl({
  src: ['/sounds/reward.mp3'],
  volume: 0.7,
});

const noRewardSound = new Howl({
  src: ['/sounds/no-reward.mp3'],
  volume: 0.7,
});

// Items Pool
const itemsPool = [
  { type: 'Weapon', rarity: 'Common', count: 1, image: '/images/ar-m416.png' },
  { type: 'Weapon', rarity: 'Rare', count: 1, image: '/images/sr-m24.png' },
  { type: 'Consumable', rarity: 'Common', count: 3, image: '/images/ar-m416.png' },
  { type: 'Material', rarity: 'Legendary', count: 1, image: '/images/ar-akm.png' },
  { type: 'Material', rarity: 'Rare', count: 1, image: '/images/sr-m24.png' },
  { type: 'Consumable', rarity: 'Legendary', count: 5, image: '/images/ar-akm.png' },
];

// Helper function to get a random item or undefined (for No Reward)
const getRandomItem = () => {
  const rarityRoll = Math.random();
  if (rarityRoll < 0.7) {
    return itemsPool.filter(item => item.rarity === 'Common')[Math.floor(Math.random() * 3)];
  } else if (rarityRoll < 0.9) {
    return itemsPool.filter(item => item.rarity === 'Rare')[Math.floor(Math.random() * 2)];
  } else if (rarityRoll < 0.95) {
    return itemsPool.filter(item => item.rarity === 'Legendary')[0];
  }
  return undefined; // No reward case
};

function SlotMachine() {
  const [reels, setReels] = useState([null, null, null]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false); // Confetti state
  const [isNoReward, setIsNoReward] = useState(false); // No Reward state

  const { width, height } = useWindowSize(); // To fit the confetti to the screen

  // Initial reel setup
  useEffect(() => {
    const initialReels = [getRandomItem(), getRandomItem(), getRandomItem()];
    setReels(initialReels);
  }, []);

  // Spin function
  const spinReels = () => {
    setIsSpinning(true);
    setShowConfetti(false); // Reset confetti
    setIsNoReward(false);   // Reset No Reward state

    spinSound.play();

    // Simulate spinning by updating with random items
    const spinningReels = [getRandomItem(), getRandomItem(), getRandomItem()];
    setReels(spinningReels);

    // After 4 seconds, stop spinning and show rewards
    setTimeout(() => {
      const finalReels = [getRandomItem(), getRandomItem(), getRandomItem()];
      setReels(finalReels);
      setRewards(finalReels);
      setIsSpinning(false);
      spinSound.stop();

      // Check if all reels are undefined (No Reward case)
      const allUndefined = finalReels.every(item => item === undefined);
      if (allUndefined) {
        noRewardSound.play();   // Play no-reward sound
        setIsNoReward(true);    // Set No Reward state to true
        setShowConfetti(false); // Disable confetti
      } else {
        rewardSound.play();     // Play reward sound
        setShowConfetti(true);  // Show confetti on a successful reward
        setTimeout(() => setShowConfetti(false), 3000); // Stop confetti after 3 seconds
      }
    }, 4000); // 4 seconds of spinning
  };

  return (
    <div>
      {/* Show confetti only when there is a reward */}
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className={`reels ${isNoReward ? 'no-reward-effect' : 'cheering-effect'}`}>
        {reels.map((item, index) => (
          <Reel key={index} item={item} isSpinning={isSpinning} />
        ))}
      </div>
      <SpinButton spinReels={spinReels} disabled={isSpinning} />
      <RewardsDisplay rewards={rewards} />

      {isNoReward && <p className="no-reward-message">No reward this time. Better luck next time!</p>}
    </div>
  );
}

export default SlotMachine;
