﻿# Event Management Dashboard

## Overview
This Event Management Dashboard is a full-stack web application designed to streamline the management of events, tasks, and attendees. It features a React frontend and a Node.js + Express backend, supported by MongoDB for data storage.

## Features
- Manage events with details like name, date, location, and description.
- Manage tasks related to events, including status updates.
- Add, update, and delete attendees for specific events.

## Project Setup

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Install additional required packages:
   ```bash
   npm i react-router-dom axios
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000).

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The backend runs on [http://localhost:5000](http://localhost:5000).

## API Documentation

### GET Requests

#### 1. Get All Events
**Endpoint:** `/getEvents`
- **Method:** `GET`
- **Description:** Retrieves all events.

#### 2. Get All Tasks
**Endpoint:** `/getTasks`
- **Method:** `GET`
- **Description:** Retrieves all tasks.

#### 3. Get Tasks for a Specific Event
**Endpoint:** `/getEventTasks`
- **Method:** `GET`
- **Description:** Retrieves all tasks associated with a specific event.
- **Query Parameters:**
  - `name` (string): Name of the event.

#### 4. Get All Attendees
**Endpoint:** `/getAttendees`
- **Method:** `GET`
- **Description:** Retrieves all attendees.

### POST Requests

#### 1. Add a Task
**Endpoint:** `/postTask`
- **Method:** `POST`
- **Description:** Adds a new task.
- **Body Parameters:**
  - `name` (string): Name of the task.
  - `event` (string): Event ID the task belongs to.
  - `status` (string): Status of the task.

#### 2. Add an Attendee
**Endpoint:** `/postAttendee`
- **Method:** `POST`
- **Description:** Adds a new attendee.
- **Body Parameters:**
  - `name` (string): Name of the attendee.
  - `email` (string): Email of the attendee.
  - `event` (string): Event ID the attendee is linked to.

#### 3. Add an Event
**Endpoint:** `/postEvent`
- **Method:** `POST`
- **Description:** Adds a new event.
- **Body Parameters:**
  - `name` (string): Name of the event.
  - `date` (string): Date of the event.
  - `location` (string): Location of the event.
  - `description` (string): Description of the event.

### DELETE Requests

#### 1. Delete an Event
**Endpoint:** `/deleteEvent`
- **Method:** `DELETE`
- **Description:** Deletes an event.
- **Body Parameters:**
  - `eventName` (string): Name of the event to delete.

#### 2. Delete a Task
**Endpoint:** `/deleteTask`
- **Method:** `DELETE`
- **Description:** Deletes a task.
- **Body Parameters:**
  - `taskName` (string): name of the task to delete.

#### 3. Delete an Attendee
**Endpoint:** `/deleteAttendee`
- **Method:** `DELETE`
- **Description:** Deletes an attendee.
- **Body Parameters:**
  - `attendeeName` (string): name of the attendee to delete.

### PUT Requests

#### 1. Update Event Date
**Endpoint:** `/updateEventDate`
- **Method:** `PUT`
- **Description:** Updates the date of an event.
- **Body Parameters:**
  - `name` (string): Name of the event.
  - `date` (string): New date of the event.

#### 2. Update Event Description
**Endpoint:** `/updateEventDescription`
- **Method:** `PUT`
- **Description:** Updates the description of an event.
- **Body Parameters:**
  - `name` (string): Name of the event.
  - `description` (string): New description of the event.

#### 3. Update Event Location
**Endpoint:** `/updateEventLocation`
- **Method:** `PUT`
- **Description:** Updates the location of an event.
- **Body Parameters:**
  - `name` (string): Name of the event.
  - `location` (string): New location of the event.

#### 4. Change Task Status
**Endpoint:** `/changeTaskStatus`
- **Method:** `PUT`
- **Description:** Updates the status of a task.
- **Body Parameters:**
  - `taskName` (string): Name of the task.
  

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Author
Amlendu Kumar

