import { useTheme } from '../context/ThemeContext';

export function ThemeEffects() {
    const { theme } = useTheme();

    return (
        <>
            {/* Scanlines Effect */}
            {theme.effects.scanlines && (
                <div
                    className="fixed inset-0 pointer-events-none z-10"
                    style={{
                        background: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )`
                    }}
                />
            )}

            {/* Vignette Effect */}
            <div
                className="fixed inset-0 pointer-events-none z-10"
                style={{
                    background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(0, 0, 0, 0.4) 100%
          )`
                }}
            />

            {/* Flicker Animation */}
            {theme.effects.flicker && (
                <style>{`
          @keyframes flicker {
            0%, 100% { opacity: 0.98; }
            10% { opacity: 0.95; }
            20% { opacity: 0.97; }
            30% { opacity: 0.93; }
            40% { opacity: 0.98; }
            50% { opacity: 0.95; }
            60% { opacity: 0.97; }
            70% { opacity: 0.96; }
            80% { opacity: 0.98; }
            90% { opacity: 0.94; }
          }
          .terminal-screen {
            animation: flicker 0.3s infinite;
          }
        `}</style>
            )}

            {/* Glow Effect */}
            {theme.effects.glow && (
                <style>{`
          .terminal-screen {
            text-shadow: 
              0 0 5px currentColor,
              0 0 10px currentColor,
              0 0 15px var(--theme-accent);
          }
        `}</style>
            )}
        </>
    );
}
