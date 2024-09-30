import React from 'react';
import '../css/RewardsDisplay.css'

const RewardsDisplay = ({ rewards }) => {
  return (
    <div className="rewards-container">
      <h3>Rewards</h3>
      <ul>
        {rewards.map((reward, index) => (
          reward ? (
            <li key={index}>
              {reward.type} - {reward.rarity} - Count: {reward.count}
            </li>
          ) : (
            <li key={index}>No reward</li>
          )
        ))}
      </ul>
    </div>
  );
};

export default RewardsDisplay;
