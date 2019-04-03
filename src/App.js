import React from "react";
import CourseListPage from "./pages/CourseListPage";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

const App = () => (
  <div className="App">
    <CourseListPage />
  </div>
);

export default App;
