import React from 'react';
import MatrixRain from './MatrixRain';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full bg-terminal-black text-terminal-green font-mono overflow-hidden selection:bg-terminal-green selection:text-terminal-black">
            {/* Background Effects */}
            <MatrixRain />

            {/* CRT Overlay Effects */}
            <div className="pointer-events-none fixed inset-0 z-50">
                {/* Scanlines */}
                <div className="scanline"></div>
                {/* CRT Grid/Pixel effect */}
                <div className="crt fixed inset-0 opacity-20"></div>
                {/* Vignette */}
                <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-screen w-full p-4 md:p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
