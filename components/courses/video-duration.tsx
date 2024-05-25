import React, { useEffect, useState, useRef } from 'react';

const VideoDuration = ({ videoSrc }: {videoSrc: string}) => {
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleLoadedMetadata = () => {
            if (videoElement) {
                setDuration(videoElement.duration);
            }
        };

        if (videoElement) {
            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

            // Load video metadata
            videoElement.load();
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, [videoSrc]);

    const formatDuration = (duration: number) => {
        if (duration < 60) {
            return `${Math.round(duration)} secs`;
        } else {
            const minutes = Math.floor(duration / 60);
            const seconds = Math.round(duration % 60);
            return seconds === 0
                ? `${minutes} min${minutes > 1 ? 's' : ''}`
                : `${minutes} min${minutes > 1 ? 's' : ''} ${seconds} secs`;
        }
    };

    return (
        <div>
            <video ref={videoRef} style={{ display: 'none' }}>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <button className="py-1 px-2 bg-grey2 rounded-md text-white text-sm">
                {formatDuration(duration)}
            </button>
        </div>
    );
};

export default VideoDuration;
