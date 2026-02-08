/**
 * PDF Export Service - Professional Grade
 * Architecture: @react-pdf/renderer
 */

import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import type { Resume } from '../schemas/resume.schema';

// Register nice fonts (Optional: You can download and serve these locally for better results)
// For now we rely on standard Helvetica which is safe and professional

// ============================================================================
// STYLES
// ============================================================================

// 1. ATS CLASSIC (Clean, Single Column, Parsing-focused)
const atsStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 11, lineHeight: 1.5, color: '#000' },
  header: { marginBottom: 20, borderBottom: '1pt solid #000', paddingBottom: 10 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 4 },
  contact: { fontSize: 10, flexDirection: 'row', gap: 12, marginBottom: 4 },
  sectionTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginTop: 16, marginBottom: 6, borderBottom: '0.5pt solid #ccc' },
  roleRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  roleTitle: { fontFamily: 'Helvetica-Bold' },
  dates: { fontSize: 10, color: '#333' },
  bullet: { marginLeft: 10, fontSize: 10 },
});

// 2. MODERN PROFESSIONAL (2-Column, Accent Colors, Designer look)
const modernStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#FFFFFF' },
  
  // Left Sidebar
  sidebar: {
    width: '32%',
    backgroundColor: '#f1f5f9', // Slate-100
    padding: 20,
    height: '100%',
  },
  sidebarSection: { marginBottom: 24 },
  sidebarTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a', // Slate-900
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    borderBottom: '1pt solid #cbd5e1',
    paddingBottom: 4,
  },
  skillItem: { fontSize: 10, marginBottom: 4, color: '#334155' },
  contactItem: { fontSize: 9, marginBottom: 6, color: '#334155' },
  
  // Main Content
  main: {
    width: '68%',
    padding: 30,
    paddingTop: 40,
  },
  name: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginBottom: 4 },
  title: { fontSize: 14, color: '#64748b', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1.5 },
  
  summary: { fontSize: 10, lineHeight: 1.6, color: '#334155', marginBottom: 24 },
  
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: '2pt solid #0f172a',
    paddingBottom: 4,
    marginTop: 10,
  },
  
  entryContainer: { marginBottom: 16 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  jobTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#000' },
  company: { fontSize: 11, fontFamily: 'Helvetica-Oblique', color: '#475569' },
  dateLocation: { fontSize: 9, color: '#64748b', textAlign: 'right' },
  bullet: { fontSize: 10, lineHeight: 1.5, marginLeft: 10, color: '#334155' },
});

// ============================================================================
// PDF DOCUMENT COMPONENT
// ============================================================================

const ResumeDocument = ({ resume, mode }: { resume: Resume; mode: 'ats' | 'recruiter' }) => {
  const isModern = mode === 'recruiter';

  if (isModern) {
    return (
      <Document>
        <Page size="A4" style={modernStyles.page}>
          
          {/* LEFT SIDEBAR */}
          <View style={modernStyles.sidebar}>
            {/* Contact */}
            <View style={modernStyles.sidebarSection}>
              <Text style={modernStyles.sidebarTitle}>Contact</Text>
              {resume.personalInfo.email && <Text style={modernStyles.contactItem}>{resume.personalInfo.email}</Text>}
              {resume.personalInfo.phone && <Text style={modernStyles.contactItem}>{resume.personalInfo.phone}</Text>}
              {resume.personalInfo.location && <Text style={modernStyles.contactItem}>{resume.personalInfo.location}</Text>}
              {resume.personalInfo.linkedin && <Text style={modernStyles.contactItem}>LinkedIn: {resume.personalInfo.linkedin.split('/').pop()}</Text>}
              {resume.personalInfo.website && <Text style={modernStyles.contactItem}>{resume.personalInfo.website.replace(/^https?:\/\//, '')}</Text>}
            </View>

            {/* Education (Often better in sidebar for modern layouts) */}
            {resume.education.length > 0 && (
              <View style={modernStyles.sidebarSection}>
                <Text style={modernStyles.sidebarTitle}>Education</Text>
                {resume.education.map(edu => (
                  <View key={edu.id} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>{edu.degree}</Text>
                    <Text style={{ fontSize: 9 }}>{edu.school}</Text>
                    <Text style={{ fontSize: 9, color: '#666' }}>{edu.graduationDate}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            <View style={modernStyles.sidebarSection}>
              <Text style={modernStyles.sidebarTitle}>Skills</Text>
              {resume.skills.categories.map(cat => (
                <View key={cat.category} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#475569', marginBottom: 2 }}>
                    {cat.category.toUpperCase()}
                  </Text>
                  <Text style={modernStyles.skillItem}>{cat.skills.join(', ')}</Text>
                </View>
              ))}
              {/* Flat Skills fallback */}
              {resume.skills.flatSkills && resume.skills.flatSkills.length > 0 && (
                 <Text style={modernStyles.skillItem}>{resume.skills.flatSkills.join(', ')}</Text>
              )}
            </View>
          </View>

          {/* MAIN CONTENT AREA */}
          <View style={modernStyles.main}>
            {/* Header */}
            <Text style={modernStyles.name}>{resume.personalInfo.fullName}</Text>
            {/* Placeholder for Job Title if we had it, using first role or generic */}
            <Text style={modernStyles.title}>{resume.experience[0]?.role || 'Software Engineer'}</Text>
            
            {/* Summary */}
            {resume.summary?.summary && (
              <View style={{ marginBottom: 20 }}>
                <Text style={modernStyles.summary}>{resume.summary.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {resume.experience.length > 0 && (
              <View>
                <Text style={modernStyles.sectionTitle}>Experience</Text>
                {resume.experience.map(exp => (
                  <View key={exp.id} style={modernStyles.entryContainer}>
                    <View style={modernStyles.entryHeader}>
                      <View>
                        <Text style={modernStyles.jobTitle}>{exp.role}</Text>
                        <Text style={modernStyles.company}>{exp.company}</Text>
                      </View>
                      <View>
                        <Text style={modernStyles.dateLocation}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                        {exp.location && <Text style={modernStyles.dateLocation}>{exp.location}</Text>}
                      </View>
                    </View>
                    {exp.description.split('\n').map((bullet, i) => (
                      <Text key={i} style={modernStyles.bullet}>• {bullet.replace(/^[•-]\s*/, '')}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
               <View>
                <Text style={modernStyles.sectionTitle}>Projects</Text>
                {resume.projects.map(proj => (
                  <View key={proj.id} style={modernStyles.entryContainer}>
                    <View style={modernStyles.entryHeader}>
                       <Text style={modernStyles.jobTitle}>{proj.title}</Text>
                       {proj.startDate && <Text style={modernStyles.dateLocation}>{proj.startDate}</Text>}
                    </View>
                    <Text style={{ fontSize: 9, fontStyle: 'italic', marginBottom: 2, color: '#444' }}>{proj.technologies}</Text>
                    {proj.description.split('\n').map((bullet, i) => (
                      <Text key={i} style={modernStyles.bullet}>• {bullet.replace(/^[•-]\s*/, '')}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

          </View>
        </Page>
      </Document>
    );
  }

  // FALLBACK: CLASSIC ATS LAYOUT (Single Column)
  return (
    <Document>
      <Page size="A4" style={atsStyles.page}>
        <View style={atsStyles.header}>
          <Text style={atsStyles.name}>{resume.personalInfo.fullName}</Text>
          <View style={atsStyles.contact}>
            <Text>{resume.personalInfo.email} | {resume.personalInfo.phone} | {resume.personalInfo.location}</Text>
            {resume.personalInfo.linkedin && <Text> | LinkedIn: {resume.personalInfo.linkedin}</Text>}
          </View>
        </View>

        {resume.summary?.summary && (
          <View>
             <Text style={atsStyles.sectionTitle}>Professional Summary</Text>
             <Text style={{ fontSize: 10 }}>{resume.summary.summary}</Text>
          </View>
        )}

        <View>
          <Text style={atsStyles.sectionTitle}>Experience</Text>
          {resume.experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 10 }}>
              <View style={atsStyles.roleRow}>
                <Text style={atsStyles.roleTitle}>{exp.role} at {exp.company}</Text>
                <Text style={atsStyles.dates}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
              </View>
              {exp.description.split('\n').map((b, i) => (
                <Text key={i} style={atsStyles.bullet}>• {b.replace(/^[•-]\s*/, '')}</Text>
              ))}
            </View>
          ))}
        </View>

        {/* Education */}
        {resume.education.length > 0 && (
          <View>
            <Text style={atsStyles.sectionTitle}>Education</Text>
            {resume.education.map(edu => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <View style={atsStyles.roleRow}>
                  <Text style={atsStyles.roleTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</Text>
                  <Text style={atsStyles.dates}>{edu.graduationDate}</Text>
                </View>
                <Text style={{ fontSize: 10 }}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(resume.skills.categories.length > 0 || (resume.skills.flatSkills && resume.skills.flatSkills.length > 0)) && (
          <View>
            <Text style={atsStyles.sectionTitle}>Skills</Text>
            {resume.skills.categories.map((cat, idx) => (
              <View key={idx} style={{ flexDirection: 'row', marginBottom: 4 }}>
                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10, marginRight: 5 }}>{cat.category}:</Text>
                <Text style={{ fontSize: 10 }}>{cat.skills.join(', ')}</Text>
              </View>
            ))}
            {resume.skills.flatSkills && resume.skills.flatSkills.length > 0 && (
              <Text style={{ fontSize: 10 }}>{resume.skills.flatSkills.join(', ')}</Text>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

// ============================================================================
// SERVICE EXPORT
// ============================================================================

export const pdfService = {
  async downloadPDF(resume: Resume, mode: 'ats' | 'recruiter') {
    const blob = await pdf(<ResumeDocument resume={resume} mode={mode} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }
};
