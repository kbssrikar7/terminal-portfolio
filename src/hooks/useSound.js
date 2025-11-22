import { useRef, useCallback } from 'react';
import { Howl } from 'howler';

// Generate sound using Web Audio API as fallback
const generateTone = (frequency, duration, type = 'sine') => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.warn('Audio context not available:', error);
  }
};

export const useSound = (enabled = true) => {
  const soundsRef = useRef({
    typing: null,
    enter: null,
    error: null,
    click: null,
  });

  const playTyping = useCallback(() => {
    if (!enabled) return;
    generateTone(800, 0.05, 'sine');
  }, [enabled]);

  const playEnter = useCallback(() => {
    if (!enabled) return;
    generateTone(600, 0.1, 'sine');
  }, [enabled]);

  const playError = useCallback(() => {
    if (!enabled) return;
    generateTone(200, 0.2, 'sawtooth');
  }, [enabled]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    generateTone(1000, 0.05, 'sine');
  }, [enabled]);

  return {
    playTyping,
    playEnter,
    playError,
    playClick,
  };
};

