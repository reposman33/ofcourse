import React from "react";
import { Router, Redirect } from "@reach/router";
import CourseListPage from "./pages/CourseListPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

const App = () => (
  <div className="App">
    <Router>
      <Redirect noThrow from="/" to="/courses" />
      <CourseListPage path="/courses" />
      <CourseDetailPage path="/courses/:courseId" />
    </Router>
  </div>
);

export default App;
