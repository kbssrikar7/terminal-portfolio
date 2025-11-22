import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for command autocomplete functionality
 * 
 * @param {string[]} commands - Available commands
 * @returns {Object} Autocomplete state and handlers
 */
export function useAutoComplete(commands) {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Memoize sorted commands for performance
    const sortedCommands = useMemo(() =>
        [...commands].sort(),
        [commands]
    );

    const getSuggestions = useCallback((input) => {
        if (!input || !input.trim()) {
            setSuggestions([]);
            setSelectedIndex(0);
            return [];
        }

        const filtered = sortedCommands.filter(cmd =>
            cmd.toLowerCase().startsWith(input.toLowerCase())
        );

        setSuggestions(filtered);
        setSelectedIndex(0);
        return filtered;
    }, [sortedCommands]);

    const selectNext = useCallback(() => {
        setSelectedIndex(prev =>
            prev < suggestions.length - 1 ? prev + 1 : 0
        );
    }, [suggestions.length]);

    const selectPrevious = useCallback(() => {
        setSelectedIndex(prev =>
            prev > 0 ? prev - 1 : suggestions.length - 1
        );
    }, [suggestions.length]);

    const getSelected = useCallback(() => {
        return suggestions[selectedIndex] || null;
    }, [suggestions, selectedIndex]);

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
        setSelectedIndex(0);
    }, []);

    return {
        suggestions,
        selectedIndex,
        getSuggestions,
        selectNext,
        selectPrevious,
        getSelected,
        clearSuggestions
    };
}
