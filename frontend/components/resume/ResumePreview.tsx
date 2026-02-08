import React from 'react';
import type { Resume } from '@/lib/schemas/resume.schema';

interface Props {
  resume: Resume | null;
  mode: 'ats' | 'recruiter';
}

export const ResumePreview: React.FC<Props> = ({ resume, mode }) => {
  if (!resume) return <div className="text-gray-400">Empty</div>;

  // 1. RECRUITER / MODERN MODE
  if (mode === 'recruiter') {
    return (
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl flex text-slate-800 text-sm">
        {/* SIDEBAR */}
        <div className="w-[32%] bg-slate-100 p-8 border-r border-slate-200">
          {/* Contact */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-2 mb-4">Contact</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="break-words">{resume.personalInfo.email}</div>
              <div>{resume.personalInfo.phone}</div>
              <div>{resume.personalInfo.location}</div>
              {resume.personalInfo.linkedin && (
                <a href={resume.personalInfo.linkedin} className="text-blue-600 hover:underline block break-words">
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-2 mb-4">Education</h3>
            <div className="space-y-4">
              {resume.education.map(edu => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-800">{edu.degree}</div>
                  <div className="text-xs text-slate-600">{edu.school}</div>
                  <div className="text-xs text-slate-500">{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-2 mb-4">Skills</h3>
            <div className="space-y-3">
              {resume.skills.categories.map(cat => (
                <div key={cat.category}>
                  <div className="font-semibold text-xs text-slate-700 mb-1">{cat.category}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {cat.skills.join(', ')}
                  </div>
                </div>
              ))}
              {resume.skills.flatSkills && resume.skills.flatSkills.length > 0 && (
                 <div className="text-xs text-slate-600">{resume.skills.flatSkills.join(', ')}</div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-[68%] p-10 pt-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight mb-2">
              {resume.personalInfo.fullName}
            </h1>
            <p className="text-lg text-slate-500 tracking-wide uppercase">
              {resume.experience[0]?.role || 'Software Engineer'}
            </p>
          </div>

          {/* Summary */}
          {resume.summary?.summary && (
            <div className="mb-8">
               <p className="text-slate-600 leading-relaxed">{resume.summary.summary}</p>
            </div>
          )}

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">Experience</h2>
            <div className="space-y-6">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base text-slate-800">{exp.role}</h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mb-2 italic">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  <ul className="list-disc ml-4 space-y-1 text-slate-600">
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} className="pl-1">{line.replace(/^[•-]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

           {/* Projects */}
           {resume.projects && resume.projects.length > 0 && (
             <div>
                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-4">Projects</h2>
                <div className="space-y-4">
                  {resume.projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline">
                         <h3 className="font-bold text-slate-800">{proj.title}</h3>
                         <span className="text-xs text-slate-500">{proj.technologies}</span>
                      </div>
                      <p className="text-slate-600 mt-1">{proj.description}</p>
                    </div>
                  ))}
                </div>
             </div>
           )}
        </div>
      </div>
    );
  }

  // 2. ATS CLASSIC MODE (Simple, high-contrast, linear)
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-12 text-black font-serif">
      {/* Centered Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase mb-2">{resume.personalInfo.fullName}</h1>
        <div className="text-sm flex justify-center flex-wrap gap-x-4 gap-y-1">
          <span>{resume.personalInfo.email}</span>
          <span>{resume.personalInfo.phone}</span>
          <span>{resume.personalInfo.location}</span>
          {resume.personalInfo.linkedin && <span>LinkedIn</span>}
        </div>
      </div>

      {/* Sections */}
      {[
        { title: 'Summary', content: resume.summary?.summary },
        { title: 'Experience', items: resume.experience },
        { title: 'Education', items: resume.education },
      ].map((section) => (
        section.content || (Array.isArray(section.items) && section.items.length > 0) ? (
          <div key={section.title} className="mb-6">
            <h3 className="text-sm font-bold uppercase border-b border-gray-400 mb-3">{section.title}</h3>
            {typeof section.content === 'string' ? (
              <p className="text-sm">{section.content}</p>
            ) : (
              <div className="space-y-4">
                 {/* Logic to render generic list items for ATS view */}
                 {(section.items as any[]).map((item: any) => (
                    <div key={item.id}>
                      <div className="flex justify-between font-bold text-sm">
                         <span>{item.role || item.school || item.degree}</span>
                         <span>{item.startDate || item.graduationDate}</span>
                      </div>
                      <div className="text-sm italic mb-1">{item.company}</div>
                      {item.description && (
                         <ul className="list-disc ml-5 text-sm">
                           {item.description.split('\n').map((l: string, i: number) => (
                             <li key={i}>{l.replace(/^[•-]\s*/, '')}</li>
                           ))}
                         </ul>
                      )}
                    </div>
                 ))}
              </div>
            )}
          </div>
        ) : null
      ))}
    </div>
  );
};
