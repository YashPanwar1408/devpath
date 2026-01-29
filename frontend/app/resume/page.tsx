'use client';

import React, { useState, useRef } from 'react';

type Template = 'modern' | 'classic' | 'minimal';

interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface Section {
  id: string;
  type: 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';
  title: string;
  visible: boolean;
}

export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('modern');
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    summary: 'Passionate software engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies.'
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      startDate: '2021-06',
      endDate: '',
      current: true,
      description: '• Led development of microservices architecture serving 1M+ users\n• Improved application performance by 40% through optimization\n• Mentored team of 5 junior developers'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Software Engineer',
      startDate: '2019-01',
      endDate: '2021-05',
      current: false,
      description: '• Built RESTful APIs using Node.js and Express\n• Implemented CI/CD pipelines with Jenkins\n• Collaborated with cross-functional teams'
    }
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      gpa: '3.8'
    }
  ]);

  const [skills, setSkills] = useState<string[]>([
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 
    'Docker', 'MongoDB', 'PostgreSQL', 'Git', 'CI/CD', 'Agile'
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Built a full-stack e-commerce platform with payment integration, inventory management, and real-time analytics.',
      technologies: 'React, Node.js, MongoDB, Stripe',
      link: 'github.com/johndoe/ecommerce'
    },
    {
      id: '2',
      name: 'AI Chatbot',
      description: 'Developed an AI-powered chatbot using NLP for customer support automation.',
      technologies: 'Python, TensorFlow, Flask, Redis',
      link: 'github.com/johndoe/chatbot'
    }
  ]);

  const [certifications, setCertifications] = useState<string[]>([
    'AWS Certified Solutions Architect',
    'Google Cloud Professional',
    'MongoDB Certified Developer'
  ]);

  const [sections, setSections] = useState<Section[]>([
    { id: '1', type: 'personal', title: 'Personal Information', visible: true },
    { id: '2', type: 'experience', title: 'Work Experience', visible: true },
    { id: '3', type: 'education', title: 'Education', visible: true },
    { id: '4', type: 'skills', title: 'Skills', visible: true },
    { id: '5', type: 'projects', title: 'Projects', visible: true },
    { id: '6', type: 'certifications', title: 'Certifications', visible: true }
  ]);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (sectionId: string) => {
    setDraggedSection(sectionId);
  };

  const handleDragOver = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    if (!draggedSection || draggedSection === targetSectionId) return;

    const newSections = [...sections];
    const draggedIndex = newSections.findIndex(s => s.id === draggedSection);
    const targetIndex = newSections.findIndex(s => s.id === targetSectionId);

    const [removed] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, removed);

    setSections(newSections);
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    ));
  };

  const exportToPDF = async () => {
    if (!previewRef.current) return;

    // For production, install html2pdf.js: npm install html2pdf.js
    // import html2pdf from 'html2pdf.js';
    
    // For now, using print functionality as fallback
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = previewRef.current.innerHTML;
    const styles = `
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 20px; }
        * { box-sizing: border-box; }
        @media print {
          body { margin: 0; padding: 0; }
          @page { margin: 0.5in; }
        }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${personalInfo.fullName}</title>
          ${styles}
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    setCertifications([...certifications, '']);
  };

  const updateCertification = (index: number, value: string) => {
    const newCerts = [...certifications];
    newCerts[index] = value;
    setCertifications(newCerts);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const getTemplateStyles = () => {
    switch (selectedTemplate) {
      case 'modern':
        return {
          container: 'bg-white text-gray-900',
          header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8',
          section: 'mb-6',
          sectionTitle: 'text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4',
          text: 'text-gray-700'
        };
      case 'classic':
        return {
          container: 'bg-white text-gray-900',
          header: 'border-b-4 border-gray-800 pb-6 mb-6',
          section: 'mb-6',
          sectionTitle: 'text-xl font-bold text-gray-800 uppercase tracking-wide mb-3',
          text: 'text-gray-700'
        };
      case 'minimal':
        return {
          container: 'bg-white text-gray-900',
          header: 'pb-4 mb-6',
          section: 'mb-5',
          sectionTitle: 'text-lg font-semibold text-gray-900 mb-2',
          text: 'text-gray-600 text-sm'
        };
    }
  };

  const styles = getTemplateStyles();

  const renderPreview = () => {
    const visibleSections = sections.filter(s => s.visible);

    return (
      <div ref={previewRef} className={`${styles.container} shadow-lg rounded-lg overflow-hidden`} style={{ minHeight: '842px', width: '595px' }}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className={selectedTemplate === 'modern' ? 'text-blue-100 text-xl' : 'text-gray-600 text-xl'}>{personalInfo.title}</p>
          <div className={`mt-4 flex flex-wrap gap-4 text-sm ${selectedTemplate === 'modern' ? 'text-blue-100' : 'text-gray-600'}`}>
            <span>📧 {personalInfo.email}</span>
            <span>📱 {personalInfo.phone}</span>
            <span>📍 {personalInfo.location}</span>
          </div>
          <div className={`mt-2 flex gap-4 text-sm ${selectedTemplate === 'modern' ? 'text-blue-100' : 'text-gray-600'}`}>
            <span>🔗 {personalInfo.linkedin}</span>
            <span>💻 {personalInfo.github}</span>
          </div>
        </div>

        <div className="p-8">
          {visibleSections.map(section => {
            if (!section.visible) return null;

            switch (section.type) {
              case 'personal':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Summary</h2>
                    <p className={styles.text}>{personalInfo.summary}</p>
                  </div>
                );

              case 'experience':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Work Experience</h2>
                    {experiences.map(exp => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{exp.position}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className={`mt-2 whitespace-pre-line ${styles.text}`}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                );

              case 'education':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {education.map(edu => (
                      <div key={edu.id} className="mb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                            <p className="text-gray-600">{edu.institution}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );

              case 'skills':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );

              case 'projects':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    {projects.map(proj => (
                      <div key={proj.id} className="mb-3">
                        <h3 className="font-bold">{proj.name}</h3>
                        <p className={`${styles.text} mb-1`}>{proj.description}</p>
                        <p className="text-sm text-gray-500">Technologies: {proj.technologies}</p>
                        {proj.link && <p className="text-sm text-blue-600">{proj.link}</p>}
                      </div>
                    ))}
                  </div>
                );

              case 'certifications':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Certifications</h2>
                    <ul className="list-disc list-inside">
                      {certifications.map((cert, idx) => (
                        <li key={idx} className={styles.text}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-400 mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="text-gray-600 mt-1">Create your professional resume with customizable templates</p>
          </div>
          <button
            onClick={exportToPDF}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>

        {/* Template Selector */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Choose Template</h3>
          <div className="flex gap-4">
            {(['modern', 'classic', 'minimal'] as Template[]).map(template => (
              <button
                key={template}
                onClick={() => setSelectedTemplate(template)}
                className={`px-6 py-3 rounded-lg border-2 transition capitalize ${
                  selectedTemplate === template
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Section Order Manager */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Section Order (Drag to Reorder)</h3>
            <div className="space-y-2">
              {sections.map(section => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={() => handleDragStart(section.id)}
                  onDragOver={(e) => handleDragOver(e, section.id)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-move border-2 ${
                    draggedSection === section.id ? 'border-blue-400 opacity-50' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <button
                    onClick={() => toggleSectionVisibility(section.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      section.visible
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {section.visible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Professional Title"
                value={personalInfo.title}
                onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Location"
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={personalInfo.linkedin}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={personalInfo.github}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <textarea
                placeholder="Professional Summary"
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Work Experience</h3>
              <button
                onClick={addExperience}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                + Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {experiences.map(exp => (
                <div key={exp.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="month"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                      <input
                        type="month"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white disabled:bg-gray-100"
                      />
                      <label className="flex items-center gap-2 px-3">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Current</span>
                      </label>
                    </div>
                    <textarea
                      placeholder="Description (use • for bullet points)"
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white"
                    />
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Education</h3>
              <button
                onClick={addEducation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                + Add Education
              </button>
            </div>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="month"
                        placeholder="Start Date"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                      <input
                        type="month"
                        placeholder="End Date"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="GPA"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                    </div>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Skills</h3>
              <button
                onClick={addSkill}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                + Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(idx, e.target.value)}
                    className="px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={() => removeSkill(idx)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Projects</h3>
              <button
                onClick={addProject}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                + Add Project
              </button>
            </div>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    />
                    <textarea
                      placeholder="Description"
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Technologies Used"
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Link (GitHub, Demo, etc.)"
                      value={proj.link}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    />
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Certifications</h3>
              <button
                onClick={addCertification}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                + Add Certification
              </button>
            </div>
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => updateCertification(idx, e.target.value)}
                    placeholder="Certification Name"
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={() => removeCertification(idx)}
                    className="text-red-600 hover:text-red-700 px-3"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Live Preview</h3>
            <div className="overflow-auto" style={{ maxHeight: '1200px' }}>
              <div className="scale-90 origin-top-left" style={{ width: '111%' }}>
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
