import React from "react";
import "./App.css";
import headerImage from "./media/banner.png";
import { SemesterViewer } from "./components/SemesterViewer";
import { Semester } from "./templates/semester";
import semesterList from "./templates/Semesters.json";

function App(): JSX.Element {
    return (
        <div className="App">
            <img src={headerImage} width="100%" />
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
            <div>
                {semesterList.map((semester: Semester) => (
                    <div key={Date.now()}>
                        {" "}
                        {/*Our semester type doesnt have an ID, so I think this should suffice for now.. */}
                        <SemesterViewer semester={semester}></SemesterViewer>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
