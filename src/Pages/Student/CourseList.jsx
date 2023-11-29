import React, { useState } from "react";

import Card from "./Card";

function CourseList(params) {
  const data = [
    // Your course data here

    // ...

    {
      id: 1,

      img: "https://source.unsplash.com/1800x900/?course&1",

      Title: "Agile",

      desc: "this is course description this is course description",

      btn: "know More &rarr;",
    },

    {
      id: 2,

      img: "https://source.unsplash.com/1800x900/?course&2",

      Title: "Scrum",

      desc: "this is course description this is course description",

      btn: "know More &rarr;",
    },

    {
      id: 3,

      img: "https://source.unsplash.com/1800x900/?course&3",

      Title: "TOSCA",

      desc: "this is course description this is course description",

      btn: "know More &rarr;",
    },

    {
      id: 4,

      img: "https://source.unsplash.com/1800x900/?course&4",

      Title: "Q-TEST",

      desc: "this is course description this is course description",

      btn: "know More &rarr;",
    },

    {
      id: 5,

      img: "https://source.unsplash.com/1800x900/?course&1",

      Title: "MB-300",

      desc: "this is course description this is course description",

      btn: "know More &rarr;",
    },

    {
      id: 6,

      img: "https://source.unsplash.com/1800x900/?course&2",

      Title: "MS-EXCEL",

      desc: "this is course description this is course description",

      btn: "know More &rarr;",
    },

    {
      id: 7,

      img: "https://source.unsplash.com/1800x900/?course&3",

      Title: "MS-WORD",

      desc: "this is course description this is course description",

      btn: "know More &rarr;",
    },

    {
      id: 8,

      img: "https://source.unsplash.com/1800x900/?course&4",

      Title: "POWERPOINT",

      desc: "this is course description this is course description",

      btn: "know More &rarr;",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // If the search term is empty or contains only whitespace, display an error alert

      alert("Search term is empty or contains only whitespace.");

      return;
    }

    // Filter courses based on the search term

    const filtered = data.filter((course) =>
      course.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      // If no courses match the search term, display an error alert

      alert("No courses found.");

      return;
    }

    setFilteredData(filtered);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        className="search-bar"
        style={{ marginTop: "35px", marginBottom: "10px", display: "flex" }}
      >
        <input
          type="text"
          placeholder="Search Courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "850px" }}
        />

        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </div>

      <div className="d-flex flex-wrap">
        {filteredData.map((course) => (
          <Card
            key={course.id}
            id={course.id}
            img={course.img}
            title={course.Title}
            desc={course.desc}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
