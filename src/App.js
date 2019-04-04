import React from "react";
import { Router, Redirect } from "@reach/router";
import CourseListPage from "./pages/CourseListPage";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

const App = () => (
  <div className="App">
    <Router>
      <Redirect noThrow from="/" to="/courses" />
      <CourseListPage path="/courses" />
    </Router>
  </div>
);

export default App;
