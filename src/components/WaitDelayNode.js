// src/components/WaitDelayNode.js

import React from 'react';

const WaitDelayNode = ({ data }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#fff' }}>
      <label>Delay (minutes):</label>
      <input
        type="number"
        value={data.delay}
        onChange={(e) => data.setDelay(e.target.value)}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default WaitDelayNode;
