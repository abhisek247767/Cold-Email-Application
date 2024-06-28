const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Agenda = require('agenda');
const nodemailer = require('nodemailer');
const cors = require('cors');
const Flowchart = require('./models/Flowchart');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

agenda.define('send email', async (job) => {
  const { to, subject, text } = job.attrs.data;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
});

(async function () {
  await agenda.start();
})();

app.post('/api/save-flowchart', async (req, res) => {
  try {
    const { elements } = req.body;
    const nodes = elements.filter((el) => el.position); // Only nodes have position property
    const edges = elements.filter((el) => !el.position); // Only edges don't have position property

    // Save flowchart data to MongoDB using Mongoose
    const flowchart = new Flowchart({ nodes, edges });
    await flowchart.save();

    // Process nodes to schedule emails
    for (const node of nodes) {
      if (node.type === 'coldEmail') {
        const email = node.data.email;
        const subject = node.data.subject;
        const body = node.data.body;

        // Find the delay associated with this node
        const edge = edges.find((e) => e.source === node.id);
        let delayTime = 0;
        if (edge) {
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (targetNode && targetNode.type === 'waitDelay') {
            delayTime = targetNode.data.delay || 0; // Delay in minutes
          }
        }

        // Schedule email sending using Agenda
        agenda.schedule(new Date(Date.now() + delayTime * 60 * 1000), 'send email', {
          to: email,
          subject,
          text: body,
        });
      }
    }

    res.status(200).json({ message: 'Flowchart saved successfully' });
  } catch (error) {
    console.error('Error saving flowchart:', error);
    res.status(500).json({ error: 'An error occurred while saving flowchart' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
