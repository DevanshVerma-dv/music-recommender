"use client";

import React from "react";
import "plyr/dist/plyr.css";
import "../globals.css";

const VideoCard = ({ video }) => {
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    let player;

    import("plyr").then((PlyrModule) => {
      const Plyr = PlyrModule.default;
      player = new Plyr(playerRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "fullscreen",
        ],
      });

      player.on("play", () => {
        // Save to recently played in localStorage
        try {
          const existing = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
          const updated = [video, ...existing.filter((v) => v.id !== video.id)].slice(0, 10);
          localStorage.setItem("recentlyPlayed", JSON.stringify(updated));
        } catch (err) {
          console.error("Failed to save recently played video:", err);
        }
      });
    });

    return () => {
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, [video.id]);

  return (
    <div className="bg-[#181c2b]/80 p-4 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 overflow-visible h-[320px] flex flex-col justify-between">
      <div
        ref={playerRef}
        className="plyr__video-embed w-full aspect-video rounded-lg mb-4"
        data-plyr-provider="youtube"
        data-plyr-embed-id={video.id}
      ></div>

      <h3 className="text-lg font-semibold">{video.title}</h3>
      <p className="text-sm text-gray-400 mb-2">{video.channel}</p>
    </div>
  );
};

export default VideoCard;
