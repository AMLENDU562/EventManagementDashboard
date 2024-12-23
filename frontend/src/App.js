import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Attendees from './Pages/Attendees';
import TaskTracker from './Pages/TaskTracker'; 
import Event from './Pages/Event';
import Sidebar from './Pages/Sidebar';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-layout">
          {/* Sidebar Component */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/event" element={<Event />} />
              <Route path="/tasktracker" element={<TaskTracker />} />
              <Route path="/attendees" element={<Attendees />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
