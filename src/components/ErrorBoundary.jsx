import React, { Component } from 'react';

/**
 * Error Boundary to catch React errors
 */
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Terminal Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen bg-black text-red-500 font-mono p-4 flex items-center justify-center">
                    <div className="max-w-2xl border border-red-500 p-8 bg-black/90">
                        <h1 className="text-2xl mb-4">SYSTEM FAILURE</h1>
                        <pre className="text-sm whitespace-pre-wrap mb-6 text-red-400">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-500 text-red-500 rounded transition-colors uppercase tracking-wider"
                        >
                            Reboot System
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
