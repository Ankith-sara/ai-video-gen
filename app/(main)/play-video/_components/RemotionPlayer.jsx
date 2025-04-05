"use client";
import React, { useState, useCallback } from "react";
import { Player } from "@remotion/player";
import RemotionComposition from "@/app/_components/RemotionComposition";

function RemotionPlayer({ videoData }) {
    const [durationInFrames, setDurationInFrame] = useState(100);

    const updateDuration = useCallback((frameValue) => {
        setDurationInFrame(frameValue);
    }, []);

    return (
        <div>
            <Player
                component={RemotionComposition}
                durationInFrames={Math.ceil(durationInFrames) + 100}
                compositionWidth={720}
                compositionHeight={1280}
                fps={30}
                controls
                style={{ width: "25vw", height: "70vh" }}
                inputProps={{
                    videoData: videoData,
                    setDurationInFrame: updateDuration,  // Use the callback function
                }}
            />
        </div>
    );
}

export default RemotionPlayer;
