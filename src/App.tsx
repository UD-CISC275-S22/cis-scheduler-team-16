import React from "react";
import "./App.css";
import { Course } from "./templates/course";
import { CourseViewer } from "./components/CourseViewer";
import myImage from "./media/banner.png";

function App(): JSX.Element {
    {
        /** THESE ARE JUST SOME TEMPORARY THINGS WHILE I'M TESTING */
    }
    const myCourse: Course = {
        courseId: "CISC275",
        name: "Intro to Software Engineering",
        prereqs: ["CISC275", "CISC181"],
        credithours: 3,
        satisfied_requirements: []
    };

    const myCourse1: Course = {
        courseId: "CISC181",
        name: "Introduction to Computer Science II",
        prereqs: ["CISC108"],
        credithours: 3,
        satisfied_requirements: []
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
            <img src={myImage} width="100%" />
            <p
                className="Hello-message"
                style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "5px"
                }}
            >
                Hello and welcome to our BlueHen CISC Planner. As we may know,
                our advising department is not in its best state right now, so
                we are just going to do things ourselves. Our goal is to make
                your college course scheduling as easy and efficient as
                possible. Whether it be through simple dropdown menus or through
                displaying what courses you wll need to take in order to
                graduate, we will always be there for you with a 24 hour website
                dedicated to labelling your scholarly journey.
            </p>
            <CourseViewer course={myCourse1}></CourseViewer>
            <CourseViewer course={myCourse}></CourseViewer>
        </div>
    );
}

export default App;
