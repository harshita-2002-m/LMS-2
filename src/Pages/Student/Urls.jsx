import React, { useState, useEffect } from "react";
import Url from "./url";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = "https://danville.pythonanywhere.com/api";

function Urls() {
  const { id } = useParams();
  const [urlsData, setUrlsData] = useState([]);

  useEffect(() => {
    // Fetch URLs for a particular course
    axios
      .get(`${baseUrl}/get-urls-by-course/${id}/`)
      .then((response) => {
        console.log(response.data);
        setUrlsData(response.data.urls);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  console.log(urlsData);

  return (
    <div className="container CourseSyllabus">
      <div className="syllabusFaq faqs text-light d-flex justify-content-between align-items-center">
        <span>URLs</span>
      </div>
      <ul className="list-group list-group-flush">
        {urlsData.map((url) => (
          <Url link={url.urls} title={url.UrlsTitle} id={url.id} key={url.id} />
        ))}
      </ul>
    </div>
  );
}

export default Urls;
