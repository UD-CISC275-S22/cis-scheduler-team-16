import React from "react";
import "./App.css";
import { Course } from "./templates/course";
import { CourseViewer } from "./components/CourseViewer";

function App(): JSX.Element {
    const myCourse: Course = {
        courseId: "CISC275",
        name: "Intro to Software Engineering",
        prereqs: ["CISC275"],
        credithours: 3,
        isTechElective: false
    };

    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>

            <CourseViewer course={myCourse}></CourseViewer>
        </div>
    );
}

export default App;
