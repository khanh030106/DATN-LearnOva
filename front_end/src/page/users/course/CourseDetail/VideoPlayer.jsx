import React from "react";
import { FaPlay, FaVolumeUp, FaClosedCaptioning } from "react-icons/fa";
import { IoSettings, IoExpand } from "react-icons/io5";

function CourseVideoPlayer() {
  return (
      <div className="video-player-container">
        <div className="video-player">
          <div className="video-placeholder">
            <video
                controls
                width="100%"
                src="https://datn-video-bucket.s3.ap-southeast-1.amazonaws.com/course-video/67feb416-040e-4d22-89d3-69ac2840dcc9.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260622T161926Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAXETSIAIPEU2BVVBA%2F20260622%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=b45ea0b9322af07bdbd504bd28c0bbbe95be14a1a3031285d7c424c88db0e96b"
            />
          </div>
        </div>
      </div>
  );
}

export default CourseVideoPlayer;