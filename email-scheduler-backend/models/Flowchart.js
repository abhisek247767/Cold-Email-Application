const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  id: String,
  type: String,
  data: {
    label: String,
    email: String,
    subject: String,
    body: String,
    delay: Number,
    source: String, // Add source field
    tag: String,    // Add tag field
  },
  position: {
    x: Number,
    y: Number,
  },
});

const EdgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
});

const FlowchartSchema = new mongoose.Schema({
  nodes: [NodeSchema],
  edges: [EdgeSchema],
});

module.exports = mongoose.model('Flowchart', FlowchartSchema);
