# Flowchart Email Marketing Application

This is a MERN stack application for creating and managing email marketing sequences using a flowchart interface. It utilizes React Flow for frontend flowchart visualization, and Agenda with Nodemailer for backend scheduling and sending emails.

## Features

- Create, edit, and delete flowchart nodes representing different email marketing steps.
- Save flowchart configurations to a MongoDB database.
- Schedule and send emails based on the flowchart configurations.
- Custom node types including Cold Email, Wait/Delay, and Lead Source.
- Display success messages upon successful operations.

## Technologies Used

- **Frontend**: React, React Flow
- **Backend**: Node.js, Express.js, Agenda, Nodemailer
- **Database**: MongoDB
- **Other**: Mongoose, Axios, dotenv, cors

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/abhisek247767/flowchart-email-marketing.git
    cd flowchart-email-marketing
    ```

2. **Install dependencies:**

    - For the backend:
        ```sh
        cd backend
        npm install
        ```

    - For the frontend:
        ```sh
        cd ../frontend
        npm install
        ```

3. **Set up environment variables:**

    - Create a `.env` file in the `backend` directory with the following content:
        ```env
        PORT=5000
        MONGODB_URI=your_mongodb_uri
        EMAIL_USER=your_emailid
        EMAIL_PASS=your_email_password
        ```

### Running the Application

1. **Start the backend server:**
    ```sh
    cd backend
    npm start
    ```

2. **Start the frontend development server:**
    ```sh
    cd ../frontend
    npm start
    ```

3. **Open the application:**
    - Visit `http://localhost:3000` in your web browser.

## Project Structure

### Backend

- **models/Flowchart.js**: Defines the Mongoose schema for flowcharts.
- **routes/flowchart.js**: Contains the API endpoint for saving flowchart data.
- **server.js**: Sets up the Express server, connects to MongoDB, and initializes Agenda and Nodemailer.

### Frontend

- **src/components/Flowchart.js**: Main component for rendering and managing the flowchart.
- **src/components/ColdEmailNode.js**: Custom node component for Cold Email.
- **src/components/WaitDelayNode.js**: Custom node component for Wait/Delay.
- **src/components/LeadSourceNode.js**: Custom node component for Lead Source.
- **src/App.js**: Main application component.

## API Endpoints

- **POST /api/save-flowchart**: Saves the flowchart configuration to the database and schedules emails based on the nodes.

## Example Usage

1. Add nodes representing different steps in your email marketing sequence (e.g., Cold Email, Wait/Delay, Lead Source).
2. Connect the nodes using edges to define the flow of your sequence.
3. Save the flowchart by clicking the "Save Flowchart" button.
4. The application will store the configuration in the database and schedule the emails accordingly.
5. Upon successful save, a message will be displayed indicating the flowchart has been saved successfully.


