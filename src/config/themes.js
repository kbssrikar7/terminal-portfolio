/**
 * Theme configurations
 * Define visual styles for different themes
 */
export const themes = {
    matrix: {
        name: 'Matrix',
        colors: {
            bg: 'bg-black',
            text: 'text-green-400',
            textSecondary: 'text-green-300',
            textTertiary: 'text-green-500',
            error: 'text-red-400',
            system: 'text-gray-400',
            border: 'border-green-500/30',
            highlight: 'bg-green-900/20',
            accent: '#00ff00'
        },
        font: 'font-mono',
        effects: {
            glow: true,
            scanlines: true,
            flicker: false
        }
    },

    fightclub: {
        name: 'Fight Club',
        colors: {
            bg: 'bg-zinc-950',
            text: 'text-red-400',
            textSecondary: 'text-red-300',
            textTertiary: 'text-red-500',
            error: 'text-orange-400',
            system: 'text-gray-500',
            border: 'border-red-500/30',
            highlight: 'bg-red-900/20',
            accent: '#ff0000'
        },
        font: 'font-mono',
        effects: {
            glow: true,
            scanlines: false,
            flicker: true
        }
    }
};

export const defaultTheme = 'matrix';
