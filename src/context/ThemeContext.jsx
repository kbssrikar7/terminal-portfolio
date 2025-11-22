import { createContext, useContext, useState, useEffect } from 'react';
import { themes, defaultTheme } from '../config/themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState(() => {
        // Load from localStorage
        return localStorage.getItem('terminal-theme') || defaultTheme;
    });

    const theme = themes[currentTheme];

    useEffect(() => {
        // Save to localStorage
        localStorage.setItem('terminal-theme', currentTheme);

        // Apply theme to document
        document.documentElement.style.setProperty(
            '--theme-accent',
            theme.colors.accent
        );
    }, [currentTheme, theme]);

    const changeTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
            return true;
        }
        return false;
    };

    const value = {
        theme,
        currentTheme,
        changeTheme,
        availableThemes: Object.keys(themes)
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
