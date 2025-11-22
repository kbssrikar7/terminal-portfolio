import { registry, Command } from './commandRegistry';
import { resume } from '../data/resume';

/**
 * Register all default commands
 */
export function registerDefaultCommands() {
  // Help command
  registry.register('help', new Command({
    description: 'Display available commands',
    execute: () => {
      const commands = registry.getCommandNames();
      return `Available Commands:\n${commands.map(cmd => {
        const command = registry.get(cmd);
        return `  ${cmd.padEnd(12)} ${command.description}`;
      }).join('\n')}`;
    }
  }));

  // About command
  registry.register('about', new Command({
    description: 'Display professional summary',
    execute: () => `
Professional Summary
─────────────────────
${resume.basics.name}
${resume.basics.label}

I am a passionate developer who loves building things for the web.
    `
  }));

  // Skills command
  registry.register('skills', new Command({
    description: 'List technical competencies',
    execute: () => `
Technical Skills
─────────────────
Languages:  ${resume.skills.languages.join(', ')}
Frameworks: ${resume.skills.frameworks.join(', ')}
Tools:      ${resume.skills.tools.join(', ')}
Libraries:  ${resume.skills.libraries.join(', ')}
    `
  }));

  // Experience command
  registry.register('experience', new Command({
    description: 'View work history',
    execute: () => {
      const expList = resume.experience.map(exp => `
${exp.position} @ ${exp.company}
${exp.startDate} - ${exp.endDate} | ${exp.location}
${exp.highlights.map(h => `- ${h}`).join('\n')}
`).join('\n');
      return `Professional Experience\n────────────────────────${expList}`;
    }
  }));

  // Projects command
  registry.register('projects', new Command({
    description: 'List portfolio projects',
    execute: () => `
Portfolio Projects
──────────────────
1. Handwritten
   Stack: Python, Streamlit, Machine Learning
   Description: A handwriting recognition app powered by ML.
   URL: https://handwrittennn.streamlit.app/

2. Heart Ensemble
   Stack: Python, Hugging Face, Scikit-learn
   Description: Heart attack risk prediction using ensemble learning.
   URL: https://huggingface.co/spaces/kbsss/Heart-Attack-Risk-Rate
    `
  }));

  // Education command
  registry.register('education', new Command({
    description: 'Show education history',
    execute: () => {
      const eduList = resume.education.map(edu => `
${edu.institution}
${edu.studyType} in ${edu.area}
${edu.startDate} - ${edu.endDate}
`).join('\n');
      return `Education\n─────────${eduList}`;
    }
  }));

  // Contact command
  registry.register('contact', new Command({
    description: 'Display contact information',
    execute: () => `
Contact Information
───────────────────
Email:    ${resume.basics.email}
Phone:    ${resume.basics.phone}
Socials:
${resume.basics.profiles.map(p => `  ${p.network}: ${p.url}`).join('\n')}
    `
  }));

  // Clear command
  registry.register('clear', new Command({
    description: 'Clear terminal screen',
    execute: () => ({ type: 'CLEAR_SCREEN' })
  }));
}

export function registerThemeCommands(themeContext) {
  // Theme command removed to enforce Matrix-only mode

  registry.register('music', new Command({
    description: 'Control background music',
    usage: 'music [on|off|toggle]',
    execute: (args) => {
      // Note: This is a placeholder. Actual music control is handled via UI or needs a bridge.
      // For now, we'll just return a message instructing to use the UI.
      return 'Please use the music controls in the top right corner.';
    }
  }));
}



/**
 * Parse and execute command
 */
export function parseCommand(input) {
  const trimmed = input.trim();

  if (!trimmed) {
    return { output: '', error: false };
  }

  const [commandName, ...args] = trimmed.split(/\s+/);
  const command = registry.get(commandName);

  if (!command) {
    return {
      output: `Command '${commandName}' not found. Type 'help' for available commands.`,
      error: true
    };
  }

  const result = command.execute(args);
  return {
    output: result.output,
    error: !result.success
  };
}

/**
 * Get autocomplete suggestions
 */
export function getCommandSuggestions(partial) {
  if (!partial) return [];
  return registry.search(partial).slice(0, 5);
}

/**
 * Get all available commands
 */
export function getAvailableCommands() {
  return registry.getCommandNames();
}
