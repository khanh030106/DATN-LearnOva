import React from "react";
import { FaPlay, FaVolumeUp, FaClosedCaptioning } from "react-icons/fa";
import { IoSettings, IoExpand } from "react-icons/io5";

function CourseVideoPlayer() {
  return (
      <div className="video-player-container">
        <div className="video-player">
          <div className="video-placeholder">
            <FaPlay className="play-button-large" />
          </div>
          <div className="video-controls">
            <div className="progress-bar"></div>
            <div className="controls-bottom">
              <button className="control-btn">
                <FaVolumeUp />
              </button>
              <button className="control-btn">
                <FaClosedCaptioning />
              </button>
              <button className="control-btn">
                <IoSettings />
              </button>
              <button className="control-btn">
                <IoExpand />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default CourseVideoPlayer;