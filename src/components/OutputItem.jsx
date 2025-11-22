import React, { memo } from 'react';
import { terminalConfig } from '../config/terminalConfig';
import { useTheme } from '../context/ThemeContext';

/**
 * Helper to parse text and replace URLs with clickable links
 */
const formatContent = (text, linkColor) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkColor} hover:underline hover:text-white transition-colors`}
                >
                    {part}
                </a>
            );
        }
        return part;
    });
};

/**
 * Memoized output item to prevent unnecessary re-renders
 */
export const OutputItem = memo(({ item }) => {
    const { prompt } = terminalConfig;
    const { theme } = useTheme();
    const { colors } = theme;

    switch (item.type) {
        case 'command':
            return (
                <div className={`flex gap-2 ${colors.text} opacity-80`}>
                    <span>{prompt}</span>
                    <span>{item.content}</span>
                </div>
            );

        case 'output':
            return (
                <pre className={`whitespace-pre-wrap ${colors.textSecondary} ml-4 font-mono`}>
                    {formatContent(item.content, colors.text)}
                </pre>
            );

        case 'error':
            return (
                <pre className={`whitespace-pre-wrap ${colors.error} ml-4 font-mono`}>
                    {item.content}
                </pre>
            );

        case 'system':
            return (
                <pre className={`whitespace-pre-wrap ${colors.system} font-mono`}>
                    {formatContent(item.content, colors.text)}
                </pre>
            );

        default:
            return null;
    }
}, (prevProps, nextProps) => {
    return prevProps.item.timestamp === nextProps.item.timestamp;
});

OutputItem.displayName = 'OutputItem';
