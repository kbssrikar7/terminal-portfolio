import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for managing background music
 * NOTE: Use royalty-free music or music you have rights to
 */
export function useBackgroundMusic(config = {}) {
    const {
        autoPlay = false,
        loop = true,
        volume = 0.3,
        fadeInDuration = 2000,
        fadeOutDuration = 1000
    } = config;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentVolume, setCurrentVolume] = useState(volume);
    const audioRef = useRef(null);
    const fadeIntervalRef = useRef(null);

    /**
     * Initialize audio element
     */
    useEffect(() => {
        // Create audio element
        const audio = new Audio();
        audio.loop = loop;
        audio.volume = 0; // Start at 0 for fade in
        audioRef.current = audio;

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
            }
        };
    }, [loop]);

    /**
     * Fade volume in/out
     */
    const fadeVolume = useCallback((targetVolume, duration) => {
        if (!audioRef.current) return;

        const audio = audioRef.current;
        const startVolume = audio.volume;
        const volumeDiff = targetVolume - startVolume;
        const steps = 50;
        const stepDuration = duration / steps;
        const stepSize = volumeDiff / steps;
        let currentStep = 0;

        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
        }

        fadeIntervalRef.current = setInterval(() => {
            currentStep++;
            const newVolume = startVolume + (stepSize * currentStep);

            if (currentStep >= steps) {
                audio.volume = targetVolume;
                setCurrentVolume(targetVolume);
                clearInterval(fadeIntervalRef.current);
                fadeIntervalRef.current = null;
            } else {
                audio.volume = newVolume;
                setCurrentVolume(newVolume);
            }
        }, stepDuration);
    }, []);

    /**
     * Play music with fade in
     */
    const play = useCallback(async (src) => {
        if (!audioRef.current) return;

        try {
            const audio = audioRef.current;

            // Set new source if provided
            if (src && audio.src !== src) {
                audio.src = src;
            }

            // Start playing
            await audio.play();
            setIsPlaying(true);

            // Fade in
            fadeVolume(volume, fadeInDuration);
        } catch (error) {
            console.warn('Background music play failed:', error.message);
        }
    }, [volume, fadeInDuration, fadeVolume]);

    /**
     * Pause music with fade out
     */
    const pause = useCallback(() => {
        if (!audioRef.current || !isPlaying) return;

        fadeVolume(0, fadeOutDuration);

        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }, fadeOutDuration);
    }, [isPlaying, fadeOutDuration, fadeVolume]);

    /**
     * Toggle play/pause
     */
    const toggle = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, play, pause]);

    /**
     * Mute/unmute
     */
    const toggleMute = useCallback(() => {
        if (!audioRef.current) return;

        if (isMuted) {
            fadeVolume(volume, 500);
            setIsMuted(false);
        } else {
            fadeVolume(0, 500);
            setIsMuted(true);
        }
    }, [isMuted, volume, fadeVolume]);

    /**
     * Set volume
     */
    const setVolume = useCallback((newVolume) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));

        if (audioRef.current && !isMuted) {
            audioRef.current.volume = clampedVolume;
        }

        setCurrentVolume(clampedVolume);
    }, [isMuted]);

    /**
     * Auto-play on mount
     */
    useEffect(() => {
        if (autoPlay) {
            // Delay to allow user interaction (required by browsers)
            const timer = setTimeout(() => {
                play();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [autoPlay, play]);

    return {
        isPlaying,
        isMuted,
        currentVolume,
        play,
        pause,
        toggle,
        toggleMute,
        setVolume
    };
}
