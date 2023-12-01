import React, { useState, useEffect } from "react";
import Video from "./Video";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "./Video";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function Videos() {
  const { id } = useParams();
  const [videosData, setVideosData] = useState([]);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/videos/`);
        const video = response.data.filter((video) => video.fk_course == id);
 
        setVideosData(video);
        console.log("PDF Content : ", video);
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchData();
  }, [id]);
 
  if (error) {
    return <div>Error loading videos: {error.message}</div>;
  }
 
  return (
    <div className="container CourseSyllabus">
      <div className="syllabusFaq faqs text-light d-flex justify-content-between align-items-center">
        <span>Videos</span>
      </div>
      <ul className="list-group list-group-flush">
        {videosData.map((video) => (
          <Video
            video={video.videos}
            title={video.videoTitle}
            id={video.id}
            key={video.id}
          />
        ))}
      </ul>
    </div>
  );
}
 
export default Videos;
