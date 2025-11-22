import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for managing command history
 * Uses useRef for performance optimization and circular buffer logic
 * 
 * @param {number} maxSize - Maximum history size
 * @returns {Object} History state and handlers
 */
export function useCommandHistory(maxSize = 100) {
    const [history, setHistory] = useState([]);
    const [pointer, setPointer] = useState(-1);
    const historyRef = useRef([]);

    // Sync ref with state for performance
    useEffect(() => {
        historyRef.current = history;
    }, [history]);

    const addToHistory = useCallback((command) => {
        setHistory(prev => {
            // Only add if different from last command
            if (prev.length > 0 && prev[prev.length - 1] === command) {
                return prev;
            }

            const newHistory = [...prev, command];

            // Hard cap at maxSize
            if (newHistory.length > maxSize) {
                return newHistory.slice(-maxSize);
            }

            return newHistory;
        });
        setPointer(-1);
    }, [maxSize]);

    const navigateHistory = useCallback((direction) => {
        const currentHistory = historyRef.current;

        if (currentHistory.length === 0) return null;

        let newPointer;
        if (direction === 'up') {
            newPointer = Math.min(pointer + 1, currentHistory.length - 1);
        } else {
            newPointer = pointer - 1;
        }

        setPointer(newPointer);

        if (newPointer < 0) return '';
        return currentHistory[currentHistory.length - 1 - newPointer];
    }, [pointer]);

    const clearHistory = useCallback(() => {
        setHistory([]);
        historyRef.current = [];
        setPointer(-1);
    }, []);

    return {
        history,
        pointer,
        addToHistory,
        navigateHistory,
        clearHistory,
        size: history.length
    };
}
