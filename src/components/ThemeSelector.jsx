import { useTheme } from '../context/ThemeContext';
import { themes } from '../config/themes';

export function ThemeSelector() {
    const { currentTheme, changeTheme, availableThemes } = useTheme();

    return (
        <div className="fixed top-4 left-4 z-50">
            <select
                value={currentTheme}
                onChange={(e) => changeTheme(e.target.value)}
                className="px-3 py-2 bg-black/80 border border-current rounded font-mono text-sm cursor-pointer hover:bg-black transition-colors text-white"
            >
                {availableThemes.map(themeName => (
                    <option key={themeName} value={themeName}>
                        {themes[themeName].name}
                    </option>
                ))}
            </select>
        </div>
    );
}
