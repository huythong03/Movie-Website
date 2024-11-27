import React from 'react';

// Component nhận videoKey làm props để hiển thị video YouTube
const TrailerPlayer = ({ videoKey }) => {
    if (!videoKey) return null; // Nếu không có videoKey, không hiển thị gì

    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe
                className="embed-responsive-item"
                src={`https://www.youtube.com/embed/${videoKey}`}
                title="Trailer"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default TrailerPlayer;
