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
                <h1> Blue Hen CISC Course Planner </h1>
                <p>
                    {" "}
                    start your course plan by adding a semester and add/remove
                    classes at your own will!
                </p>
                <p>
                    {" "}
                    Created by Robby Sammataro, Christopher Bennett, and William
                    Hart
                </p>
            </header>
            <p className="Hello-message">
                Hello and welcome to our BlueHen CISC Planner. As we may know,
                our advising department is not in its best state right now, so
                we are just going to do things ourselves. Our goal is to make
                your college course scheduling as easy and efficient as
                possible. Whether it be through simple dropdown menus or through
                displaying what courses you wll need to take in order to
                graduate, we will always be there for you with a 24 hour website
                dedicated to labelling your scholarly journey.
            </p>
            <CourseViewer course={myCourse}></CourseViewer>
        </div>
    );
}

export default App;
