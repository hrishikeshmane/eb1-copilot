"use client";

import React from "react";
import YouTube, { type YouTubeProps } from "react-youtube";
import { motion } from "framer-motion";

export default function HeroVideo() {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    event.target.pauseVideo();
  };

  const opts = {
    // height: "500",
    // width: "900",
    // playerVars: {
    //     // https://developers.google.com/youtube/player_parameters
    //     autoplay: 1,
    // },
  };

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative m-14 flex h-fit max-w-6xl flex-col items-center justify-center gap-4 shadow-2xl shadow-primary/70 dark:shadow-primary/15 md:my-28 lg:my-36 "
    >
      <YouTube
        iframeClassName="rounded-xl h-[200px] w-[360px] sm:h-[300px] sm:w-[580px] md:h-[400px] md:w-[700px] lg:h-[500px] lg:w-[900px]"
        videoId="dQw4w9WgXcQ"
        //   opts={opts}
        onReady={onPlayerReady}
      />
    </motion.div>
  );
}
