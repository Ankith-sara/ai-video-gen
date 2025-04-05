"use client"
import React, { useEffect } from 'react';
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

function RemotionComposition({ videoData }) {
    const captions = videoData?.captionJson;
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();
    const imageList = videoData?.images;
    const captionStyle = videoData?.captionStyle || {}; // Selected caption style

    const getDurationFrame = () => {
        const totalDuration = captions?.[captions.length - 1]?.end * fps || 0;
        return totalDuration;
    };

    const getCurrentCaption = () => {
        const currentTime = frame / 30;
        const currentCaption = captions?.find((item) => currentTime >= item.start && currentTime <= item?.end);
        return currentCaption ? currentCaption?.word : '';
    }

    useEffect(() => {
        if (videoData) {
            const totalDuration = getDurationFrame();
        }
    }, [videoData]);

    return (
        <div>
            <AbsoluteFill>
                {imageList?.map((item, index) => {
                    const totalDuration = getDurationFrame();
                    const startTime = (index * totalDuration) / imageList.length;
                    const duration = totalDuration / imageList.length;

                    const scale = interpolate(
                        frame,
                        [startTime, startTime + duration / 2, startTime + duration],
                        index % 2 === 0 ? [1, 1.8, 1] : [1, 1.8, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                    return (
                        <Sequence key={index} from={startTime} durationInFrames={duration}>
                            <AbsoluteFill>
                                <Img
                                    src={item}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transform: `scale(${scale})`
                                    }}
                                />
                            </AbsoluteFill>
                        </Sequence>
                    );
                })}
            </AbsoluteFill>
            
            {/* Caption Display with Dynamic Styling */}
            <AbsoluteFill style={{ color: 'white', justifyContent: 'center', bottom: 50, top: undefined, height: 150, textAlign: 'center' }}>
                <h2 className={captionStyle.style}>{getCurrentCaption()}</h2>
            </AbsoluteFill>
            
            {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
        </div>
    );
}

export default RemotionComposition;