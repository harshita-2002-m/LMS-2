// Video.jsx
 
import React, { useState } from "react";
 
function Video(props) {
    const [isPlaying, setIsPlaying] = useState(false);
 
    const playVideo = () => {
        setIsPlaying(true);
    };
 
    const closeVideo = () => {
        setIsPlaying(false);
    };
 
    return (
        <li className="list-group-item btn-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                {props.title}
            </div>
           
                <button className="" onClick={playVideo}>
                    View
                </button>
 
                {isPlaying && (
                    <div>
                        <video controls width="500" height="300" onEnded={closeVideo}>
                            <source src={props.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
           
        </li>
    );
}
 
export default Video;
