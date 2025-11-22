import { useState } from 'react';

const commands = ['help', 'about', 'skills', 'experience', 'projects', 'education', 'contact', 'clear'];

export default function MobileKeyboard({ onCommand }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Only show on mobile
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
        return null;
    }

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            {/* Toggle Button */}
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="w-full bg-black/90 border-t border-green-500/30 p-3 text-green-400 text-sm font-mono hover:bg-black backdrop-blur-sm"
                >
                    ⌨️ Quick Commands
                </button>
            ) : (
                <>
                    {/* Command Grid */}
                    <div className="bg-black/95 border-t border-green-500/30 p-3 backdrop-blur-md">
                        <div className="grid grid-cols-4 gap-2 mb-2">
                            {commands.map((cmd) => (
                                <button
                                    key={cmd}
                                    onClick={() => {
                                        onCommand(cmd);
                                        setIsExpanded(false);
                                    }}
                                    className="bg-green-900/20 hover:bg-green-900/40 border border-green-500/30 text-green-400 px-2 py-2 rounded text-xs font-mono transition-colors"
                                >
                                    {cmd}
                                </button>
                            ))}
                        </div>
                        {/* Close Button */}
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="w-full bg-green-900/20 border border-green-500/30 text-green-400 py-2 rounded text-sm font-mono"
                        >
                            Close ×
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
