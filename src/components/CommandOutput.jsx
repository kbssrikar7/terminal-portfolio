import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { resume } from '../data/resume';

export const CommandOutput = ({ item }) => {
  const renderContent = () => {
    if (item.type === 'command') {
      return (
        <div className="flex items-center gap-2 text-terminal-green">
          <span>$</span>
          <span>{item.content}</span>
        </div>
      );
    }

    if (item.type === 'error') {
      return (
        <div className="text-red-500">
          {item.content}
        </div>
      );
    }

    // Handle different output types
    if (typeof item.content === 'string') {
      return <div className="whitespace-pre-wrap">{item.content}</div>;
    }

    if (item.content.type === 'help') {
      return (
        <div className="space-y-2">
          <div className="text-terminal-green font-bold">Available Commands:</div>
          <div className="space-y-1 ml-4">
            <div><span className="text-terminal-green">help</span> - Show this help message</div>
            <div><span className="text-terminal-green">clear</span> - Clear the terminal</div>
            <div><span className="text-terminal-green">about</span> - Display about information</div>
            <div><span className="text-terminal-green">skills</span> - Show technical skills</div>
            <div><span className="text-terminal-green">experience</span> - Display work experience</div>
            <div><span className="text-terminal-green">education</span> - Show education background</div>
            <div><span className="text-terminal-green">projects</span> - List all projects</div>
            <div><span className="text-terminal-green">contact</span> - Show contact information</div>
            <div><span className="text-terminal-green">github</span> - Open GitHub profile</div>
            <div><span className="text-terminal-green">linkedin</span> - Open LinkedIn profile</div>
          </div>
        </div>
      );
    }

    if (item.content.type === 'about') {
      return (
        <div className="space-y-3">
          <div className="text-terminal-green font-bold text-lg">{resume.name}</div>
          <div className="text-terminal-green">{resume.title}</div>
          <div className="text-terminal-dim">{resume.location}</div>
          <div className="mt-4 whitespace-pre-wrap">{resume.about}</div>
        </div>
      );
    }

    if (item.content.type === 'skills') {
      return (
        <div className="space-y-4">
          {Object.entries(resume.skills).map(([category, skills]) => (
            <div key={category}>
              <div className="text-terminal-green font-bold mb-2">{category}:</div>
              <div className="ml-4 flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-terminal-dim text-terminal-green rounded border border-terminal-green/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (item.content.type === 'experience') {
      return (
        <div className="space-y-6">
          {resume.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border-l-2 border-terminal-green pl-4"
            >
              <div className="text-terminal-green font-bold text-lg">{exp.title}</div>
              <div className="text-terminal-green">{exp.company}</div>
              <div className="text-terminal-dim text-sm">{exp.location} • {exp.period}</div>
              <ul className="mt-2 ml-4 space-y-1 list-disc text-terminal-dim">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      );
    }

    if (item.content.type === 'education') {
      return (
        <div className="space-y-4">
          {resume.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border-l-2 border-terminal-green pl-4"
            >
              <div className="text-terminal-green font-bold text-lg">{edu.degree}</div>
              <div className="text-terminal-green">{edu.school}</div>
              <div className="text-terminal-dim text-sm">{edu.location} • {edu.period}</div>
              <div className="mt-2 text-terminal-dim">{edu.description}</div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (item.content.type === 'projects') {
      return (
        <div className="space-y-6">
          {resume.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border border-terminal-green/30 rounded p-4 hover:border-terminal-green transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-terminal-green font-bold text-lg flex items-center gap-2">
                    {project.name}
                    {project.featured && (
                      <span className="text-xs px-2 py-0.5 bg-terminal-green text-terminal-black rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="text-terminal-dim mt-1">{project.description}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 mb-3">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i}
                    className="text-xs px-2 py-1 bg-terminal-dim text-terminal-green rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-terminal-green hover:text-terminal-green/70 transition-colors text-sm"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-terminal-green hover:text-terminal-green/70 transition-colors text-sm"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (item.content.type === 'contact') {
      return (
        <div className="space-y-3">
          <div className="text-terminal-green font-bold">Contact Information:</div>
          <div className="ml-4 space-y-2">
            <div>
              <span className="text-terminal-green">Email:</span>{' '}
              <a href={`mailto:${resume.email}`} className="text-terminal-green hover:underline">
                {resume.email}
              </a>
            </div>
            <div>
              <span className="text-terminal-green">GitHub:</span>{' '}
              <a href={resume.github} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                {resume.github}
              </a>
            </div>
            <div>
              <span className="text-terminal-green">LinkedIn:</span>{' '}
              <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                {resume.linkedin}
              </a>
            </div>
            {resume.website && (
              <div>
                <span className="text-terminal-green">Website:</span>{' '}
                <a href={resume.website} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                  {resume.website}
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }

    return <div>{JSON.stringify(item.content)}</div>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-2"
    >
      {renderContent()}
    </motion.div>
  );
};

