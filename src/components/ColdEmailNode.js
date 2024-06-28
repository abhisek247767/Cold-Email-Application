// src/components/ColdEmailNode.js

import React from 'react';

const ColdEmailNode = ({ data }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#fff' }}>
      <label>Email ID:</label>
      <input
        type="text"
        value={data.email}
        onChange={(e) => data.setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: '5px' }}
      />
      <label>Subject:</label>
      <input
        type="text"
        value={data.subject}
        onChange={(e) => data.setSubject(e.target.value)}
        style={{ width: '100%', marginBottom: '5px' }}
      />
      <label>Body:</label>
      <textarea
        value={data.body}
        onChange={(e) => data.setBody(e.target.value)}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default ColdEmailNode;
