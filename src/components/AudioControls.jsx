import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { useState, useEffect } from 'react';

/**
 * Modern glassmorphic audio controls - Mobile optimized
 */
export function AudioControls() {
    const [hasInteracted, setHasInteracted] = useState(false);
    const musicSource = '/audio/matrix-ambient.mp3';

    const {
        isPlaying,
        isMuted,
        currentVolume,
        play,
        toggle,
        toggleMute,
        setVolume
    } = useBackgroundMusic({
        autoPlay: false,
        loop: true,
        volume: 0.5
    });

    const handleFirstInteraction = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
            play(musicSource);
        }
    };

    useEffect(() => {
        const startAudio = () => {
            if (!hasInteracted) {
                handleFirstInteraction();
            }
        };
        window.addEventListener('click', startAudio);
        return () => window.removeEventListener('click', startAudio);
    }, [hasInteracted]);

    return (
        <div className="fixed top-2 right-2 md:top-4 md:right-4 z-40">
            <div className="backdrop-blur-lg bg-black/30 border border-green-500/30 rounded-xl md:rounded-2xl p-1.5 md:p-3 shadow-xl md:shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all">
                <div className="flex items-center gap-1.5 md:gap-3">
                    {/* Play/Pause - Always visible */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleFirstInteraction();
                            toggle();
                        }}
                        className="group relative w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 border border-green-500/40 hover:border-green-400 transition-all flex items-center justify-center"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 4l10 6-10 6V4z" />
                            </svg>
                        )}
                    </button>

                    {/* Volume controls - Hidden on small mobile */}
                    <div className="hidden sm:flex items-center gap-1.5 md:gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMute();
                            }}
                            className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-400/50 transition-all flex items-center justify-center"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-green-400/80" fill="currentColor" viewBox="0 0 20 20">
                                {isMuted ? (
                                    <path d="M9 4l-4 4H2v4h3l4 4V4z" />
                                ) : (
                                    <path d="M9 4l-4 4H2v4h3l4 4V4zm6.5 6c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                )}
                            </svg>
                        </button>

                        <div className="w-12 md:w-20">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={currentVolume * 100}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setVolume(e.target.value / 100);
                                }}
                                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${currentVolume * 100}%, rgba(16, 185, 129, 0.2) ${currentVolume * 100}%, rgba(16, 185, 129, 0.2) 100%)`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
        }
      `}</style>
        </div>
    );
}
