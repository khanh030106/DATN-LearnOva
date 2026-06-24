import React from "react";

function CourseVideoPlayer() {
  return (
      <div className="video-player-container">
        <div className="video-player">
          <div className="video-placeholder">
            <video
                controls
                width="100%"
                src="https://datn-video-bucket.s3.ap-southeast-1.amazonaws.com/course-video/afd61791-2584-491c-b7ad-a2e6b295b975.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260623T114916Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAXETSIAIPEU2BVVBA%2F20260623%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=e26518b8998c1be84807f2984332ad16c1d976cd01eb9396044fc636e733d79a"
            />
          </div>
        </div>
      </div>
  );
}

export default CourseVideoPlayer;