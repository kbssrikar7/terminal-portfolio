export const resume = {
  basics: {
    name: "K.B.S Srikar",
    label: "Computer Science Engineer",
    email: "kbsivasrikar@gmail.com",
    phone: "8330986424",
    profiles: [
      {
        network: "GitHub",
        username: "kbssrikar7",
        url: "https://github.com/kbssrikar7"
      },
      {
        network: "LinkedIn",
        username: "kbssrikar",
        url: "https://linkedin.com/in/kbssrikar"
      },
      {
        network: "HackerRank",
        username: "kbssrikar2005",
        url: "https://www.hackerrank.com/profile/kbssrikar2005"
      }
    ],
  },
  education: [
    {
      institution: "Vellore Institute of Technology",
      area: "Computer Science and Engineering",
      studyType: "Bachelor of Technology",
      startDate: "July 2022",
      endDate: "Aug 2026",
      location: "Vellore, Tamil Nadu"
    },
    {
      institution: "Lakshya International School",
      area: "Senior Secondary School (CBSE)",
      studyType: "Schooling",
      startDate: "July 2020", // Estimated based on 2022 completion
      endDate: "July 2022",
      location: "Kakinada, Andhra Pradesh"
    }
  ],
  experience: [
    {
      company: "Vitalitysoft IT Services (OPC) Pvt. Ltd.",
      position: "Full Stack Web Developer Intern",
      startDate: "June 2025",
      endDate: "August 2025",
      location: "Hyderabad, Telangana",
      highlights: [
        "Added multilingual translation support, expanding accessibility and improving SEO performance.",
        "Integrated translation APIs to enhance global reach and search ranking.",
        "Developed and optimized responsive web pages using HTML, CSS, JavaScript.",
        "Assisted with deployment configurations and troubleshooting development environments."
      ]
    },
    {
      company: "Volteo Maritime India Pvt. Ltd.",
      position: "Cloud and DevOps Intern",
      startDate: "April 2025",
      endDate: "June 2025",
      location: "Kakinada, Andhra Pradesh",
      highlights: [
        "Built and automated Python based internal tools that reduced manual setup time by 40%.",
        "Containerized applications with Docker to streamline deployment across multiple environments.",
        "Configured AWS services (EC2, S3, IAM) for deployments, storage, and secure access management.",
        "Collaborated with mentors on DevOps workflows and deployment configuration improvements."
      ]
    }
  ],
  projects: [
    {
      name: "Handwritten Equation Solver",
      tech: ["Python", "TensorFlow", "OpenCV", "Streamlit"],
      description: "Built a CNN-based equation solver capable of recognizing and solving handwritten mathematical expressions from uploaded images. Trained a CNN (32x32 grayscale inputs, 3 Conv2D + 2 Dense layers) achieving ~95% training and ~90% test accuracy across 14 symbol classes.",
      url: "#"
    },
    {
      name: "Predicting Heart Attack Risk",
      tech: ["Python", "Docker", "XGBoost", "CatBoost", "LightGBM", "Streamlit", "SHAP"],
      description: "Developed an explainable ensemble ML system integrating XGBoost, CatBoost, and LightGBM to predict cardiovascular disease risk from 70K clinical records. Achieved 0.849 accuracy and 0.924 ROC-AUC.",
      url: "#"
    },
    {
      name: "Azure Cloud Cost Planner",
      tech: ["Python", "Streamlit", "Azure App Service", "GitHub Actions", "pandas"],
      description: "Built a Streamlit app to estimate Azure VM costs across regions with visualization and regional comparisons. Deployed on Azure App Service (Linux) with automated CI/CD through GitHub Actions.",
      url: "#"
    }
  ],
  skills: {
    languages: ["Python", "Java", "C", "C++", "SQL", "JavaScript", "Bash", "R"],
    frameworks: ["React", "Node.js", "Flask", "FastAPI", "Streamlit", "TensorFlow", "PyTorch"],
    libraries: ["NumPy", "pandas", "Matplotlib", "OpenCV", "SHAP", "LightGBM", "XGBoost", "CatBoost"],
    tools: ["Git", "Docker", "TravisCI", "GitHub Actions", "Render", "AWS", "GCP", "Jupyter", "VirtualBox"],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    os: ["Linux", "MacOS", "Windows"]
  }
};
