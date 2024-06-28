import React from 'react';

const LeadSourceNode = ({ data }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#fff' }}>
      <label>Lead Source:</label>
      <input
        type="text"
        value={data.source}
        onChange={(e) => data.setSource(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <label>Tags:</label>
      <select
        value={data.tag}
        onChange={(e) => data.setTag(e.target.value)}
        style={{ width: '100%', padding: '5px' }}
      >
        <option value="">Select Tag</option>
        <option value="followup 1">Followup 1</option>
        <option value="first time">First Time</option>
        <option value="successful">Successful</option>
      </select>
    </div>
  );
};

export default LeadSourceNode;
