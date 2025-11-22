/**
 * Command Registry Pattern
 * Singleton registry for managing terminal commands
 */
class CommandRegistry {
    constructor() {
        this.commands = new Map();
    }

    /**
     * Register a new command
     */
    register(name, command) {
        if (this.commands.has(name)) {
            console.warn(`Command '${name}' already exists. Overwriting.`);
        }
        this.commands.set(name.toLowerCase(), command);
        return this;
    }

    /**
     * Unregister a command
     */
    unregister(name) {
        return this.commands.delete(name.toLowerCase());
    }

    /**
     * Get command by name
     */
    get(name) {
        return this.commands.get(name.toLowerCase());
    }

    /**
     * Get all command names
     */
    getCommandNames() {
        return Array.from(this.commands.keys()).sort();
    }

    /**
     * Check if command exists
     */
    has(name) {
        return this.commands.has(name.toLowerCase());
    }

    /**
     * Get commands matching prefix
     */
    search(prefix) {
        const lower = prefix.toLowerCase();
        return this.getCommandNames().filter(name => name.startsWith(lower));
    }

    /**
     * Clear all commands
     */
    clear() {
        this.commands.clear();
    }
}

// Create singleton instance
export const registry = new CommandRegistry();

// Command base class
export class Command {
    constructor(config) {
        this.description = config.description;
        this.usage = config.usage || '';
        this.aliases = config.aliases || [];
        this.executor = config.execute;
        this.validator = config.validate;
    }

    execute(args = []) {
        // Validate arguments
        if (this.validator) {
            const validation = this.validator(args);
            if (!validation.valid) {
                return {
                    success: false,
                    output: validation.message || 'Invalid arguments'
                };
            }
        }

        try {
            const result = this.executor(args);
            return {
                success: true,
                output: result
            };
        } catch (error) {
            return {
                success: false,
                output: `Error: ${error.message}`
            };
        }
    }
}
