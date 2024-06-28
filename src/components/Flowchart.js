import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import axios from 'axios';
import ColdEmailNode from './ColdEmailNode';
import WaitDelayNode from './WaitDelayNode';
import LeadSourceNode from './LeadSourceNode';

const initialNodes = [];
const initialEdges = [];

const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode,
};

const Flowchart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [saveMessage, setSaveMessage] = useState('');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type) => {
    const id = `${type}-${new Date().getTime()}`;
    const newNode = {
      id,
      type,
      data: {
        label: `${type} Node`,
        email: '',
        setEmail: (email) => setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, email } } : node))),
        subject: '',
        setSubject: (subject) => setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, subject } } : node))),
        body: '',
        setBody: (body) => setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, body } } : node))),
        delay: 0,
        setDelay: (delay) => setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, delay } } : node))),
        source: '',
        setSource: (source) => setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, source } } : node))),
        tag: '', // Add tag property
        setTag: (tag) => setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, tag } } : node))), // Add setTag function
      },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const saveFlowchart = async () => {
    try {
      const elements = [...nodes, ...edges];
      const response = await axios.post('http://localhost:5000/api/save-flowchart', { elements });
      setSaveMessage(response.data.message); // Display success message
    } catch (error) {
      console.error('Error saving flowchart', error);
      setSaveMessage('Error saving flowchart');
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <button onClick={() => addNode('coldEmail')}>Add Cold Email</button>
          <button onClick={() => addNode('waitDelay')}>Add Wait/Delay</button>
          <button onClick={() => addNode('leadSource')}>Add Lead Source</button>
          <button onClick={saveFlowchart}>Save Flowchart</button>
          {saveMessage && <p>{saveMessage}</p>}
        </div>
        <div style={{ width: '100%', height: '90vh', border: '1px solid #ccc' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default Flowchart;
