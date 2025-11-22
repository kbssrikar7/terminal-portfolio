/**
 * Terminal configuration
 * Centralized configuration for easy customization
 */
export const terminalConfig = {
    // Display settings
    prompt: '❯',
    welcomeMessage: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Welcome to K.B.S Srikar's Interactive Terminal Portfolio
   
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type 'help' to see all available commands

Tips:
  • Use ↑/↓ arrow keys to browse command history
  • Press TAB for command suggestions
  • Try commands like: about, skills, projects, contact

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,

    // History settings
    maxHistory: 100,
    maxCommandHistory: 50,

    // Autocomplete settings
    maxSuggestions: 5,
    debounceDelay: 150,

    // Performance settings
    virtualScrolling: false, // Enable for large output if needed
    maxOutputItems: 1000,

    // Theme
    colors: {
        primary: 'text-terminal-green',
        secondary: 'text-green-300',
        error: 'text-red-500',
        system: 'text-gray-500',
        prompt: 'text-terminal-green'
    },

    // Mobile settings
    mobileBreakpoint: 768,
    showMobileKeyboard: true,
};
