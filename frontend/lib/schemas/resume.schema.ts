/**
 * Resume Data Schemas - Type-safe validation with Zod
 * Production-ready schema for ATS-optimized resumes
 */

import { z } from 'zod';

// ============================================================================
// PERSONAL INFO SCHEMA
// ============================================================================

export const PersonalInfoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10).max(20).optional().or(z.literal('')), // Relaxed regex for better UX
  location: z.string().min(2).max(100).optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

export const ProfessionalSummarySchema = z.object({
  summary: z.string()
    .min(50, 'Summary should be at least 50 characters')
    .max(2000, 'Summary should not exceed 2000 characters'),
});

// ============================================================================
// EXPERIENCE SCHEMA
// ============================================================================

export const ExperienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required').max(100),
  role: z.string().min(1, 'Job title is required').max(100),
  location: z.string().max(100).optional().or(z.literal('')),
  // Allow flexible date input for UX, refine before save if needed
  startDate: z.string().optional().or(z.literal('')), 
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean(),
  description: z.string().min(0).max(5000), // Relaxed min for initial adding
  bullets: z.array(z.string()).optional(), // Parsed bullets
});

// ============================================================================
// PROJECT SCHEMA
// ============================================================================

export const ProjectItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Project title is required').max(150),
  link: z.string().url('Invalid project URL').optional().or(z.literal('')),
  technologies: z.string().min(1, 'List the technologies used').max(300).optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  description: z.string().min(0).max(2000),
  current: z.boolean().optional(),
});

// ============================================================================
// EDUCATION SCHEMA
// ============================================================================

export const EducationItemSchema = z.object({
  id: z.string(),
  school: z.string().min(1, 'School name is required').max(150),
  degree: z.string().min(1, 'Degree is required').max(150),
  field: z.string().max(100).optional().or(z.literal('')),
  location: z.string().max(100).optional().or(z.literal('')),
  gpa: z.string().optional().or(z.literal('')),
  graduationDate: z.string().optional().or(z.literal('')),
  honors: z.string().max(200).optional().or(z.literal('')),
});

// ============================================================================
// SKILLS SCHEMA
// ============================================================================

export const SkillCategorySchema = z.object({
  category: z.string().min(1).max(50),
  skills: z.array(z.string().min(1).max(50)).min(1, 'Add at least one skill'),
});

export const SkillsSchema = z.object({
  categories: z.array(SkillCategorySchema),
  // Flat list for backward compatibility
  flatSkills: z.array(z.string()).optional(),
});

// ============================================================================
// CERTIFICATION SCHEMA
// ============================================================================

export const CertificationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required').max(150),
  issuer: z.string().min(1, 'Issuing organization is required').max(100),
  date: z.string().optional().or(z.literal('')),
  expirationDate: z.string().optional().or(z.literal('')),
  credentialId: z.string().max(100).optional().or(z.literal('')),
  link: z.string().url('Invalid credential URL').optional().or(z.literal('')),
});

// ============================================================================
// ACHIEVEMENT SCHEMA
// ============================================================================

export const AchievementItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Achievement title is required').max(200),
  description: z.string().min(0).max(1000).optional().or(z.literal('')),
  date: z.string().optional().or(z.literal('')),
});

// ============================================================================
// LANGUAGE SCHEMA
// ============================================================================

export const LanguageItemSchema = z.object({
  id: z.string(),
  language: z.string().min(1, 'Language name is required').max(50),
  proficiency: z.string().min(1).max(50), // Simplified to string for flexibility
});

// ============================================================================
// MAIN RESUME SCHEMA
// ============================================================================

export const ResumeMetadataSchema = z.object({
  id: z.string(),
  version: z.number().default(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string().min(1, 'Resume title is required').max(100),
  targetJobTitle: z.string().max(100).optional().or(z.literal('')),
  targetCompany: z.string().max(100).optional().or(z.literal('')),
  isDefault: z.boolean().default(false),
});

export const ResumeSchema = z.object({
  // Metadata
  metadata: ResumeMetadataSchema.optional(),
  
  // Core sections (order matters for ATS)
  personalInfo: PersonalInfoSchema,
  summary: ProfessionalSummarySchema.optional(),
  experience: z.array(ExperienceItemSchema),
  education: z.array(EducationItemSchema),
  skills: SkillsSchema,
  
  // Optional sections
  projects: z.array(ProjectItemSchema).optional(),
  certifications: z.array(CertificationItemSchema).optional(),
  achievements: z.array(AchievementItemSchema).optional(),
  languages: z.array(LanguageItemSchema).optional(),
  
  // Section order preference
  sectionOrder: z.array(z.string()).optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type ProfessionalSummary = z.infer<typeof ProfessionalSummarySchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type Skills = z.infer<typeof SkillsSchema>;
export type CertificationItem = z.infer<typeof CertificationItemSchema>;
export type AchievementItem = z.infer<typeof AchievementItemSchema>;
export type LanguageItem = z.infer<typeof LanguageItemSchema>;
export type ResumeMetadata = z.infer<typeof ResumeMetadataSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  portfolio: '',
  website: '',
};

export const defaultSkills: Skills = {
  categories: [],
  flatSkills: [],
};