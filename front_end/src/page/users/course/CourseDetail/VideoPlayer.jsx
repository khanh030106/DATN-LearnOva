import React from "react";

function CourseVideoPlayer({ src, loading }) {
  return (
    <div className="video-player-container">
      <div className="video-player">
        <div className="video-placeholder">
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8", fontSize: "15px" }}>
              Loading video...
            </div>
          ) : src ? (
            <video key={src} controls width="100%" src={src} style={{ display: "block" }} />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8", fontSize: "15px" }}>
              Select a lesson to start watching
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseVideoPlayer;
