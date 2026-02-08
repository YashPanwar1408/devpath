/**
 * Resume Store - Centralized State Management with Zustand
 * Features: Autosave, Undo/Redo, Version Control, Persistence
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { 
  Resume, 
  ExperienceItem, 
  EducationItem, 
  ProjectItem, 
  CertificationItem, 
  AchievementItem, 
  LanguageItem 
} from '../schemas/resume.schema';
import type { ATSAnalysis } from '../schemas/ats.schema';

// ============================================================================
// TYPES
// ============================================================================

export interface ResumeVersion {
  id: string;
  resume: Resume;
  timestamp: Date;
  label: string;
}

export interface ResumeState {
  // Current resume being edited
  currentResume: Resume | null;
  
  // Resume versions (for different job applications)
  versions: ResumeVersion[];
  activeVersionId: string | null;
  
  // Undo / Redo stacks
  past: Resume[];
  future: Resume[];
  
  // ATS Analysis state
  atsAnalysis: ATSAnalysis | null;
  isAnalyzing: boolean;
  jobDescription: string;
  
  // UI state
  activeSection: string;
  hasUnsavedChanges: boolean;
  lastSavedAt: Date | null;
  isAutoSaveEnabled: boolean;
  
  // Form state
  validationErrors: Record<string, string[]>;
  completenessScore: number;
}

export interface ResumeActions {
  // Resume CRUD
  setResume: (resume: Resume) => void;
  updateResume: (updater: (draft: Resume) => void) => void;
  clearResume: () => void;
  
  // Section updates (type-safe helpers)
  updatePersonalInfo: (updater: (draft: Resume['personalInfo']) => void) => void;
  updateSummary: (updater: (draft: Resume['summary']) => void) => void;
  updateExperience: (id: string, updater: (draft: ExperienceItem) => void) => void;
  addExperience: (data?: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;
  
  updateEducation: (id: string, updater: (draft: EducationItem) => void) => void;
  addEducation: (data?: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  
  updateSkills: (updater: (draft: Resume['skills']) => void) => void;
  
  // Projects
  addProject: (data?: Partial<ProjectItem>) => void;
  updateProject: (id: string, updater: (draft: ProjectItem) => void) => void;
  removeProject: (id: string) => void;
  
  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, updater: (draft: CertificationItem) => void) => void;
  removeCertification: (id: string) => void;
  
  // Achievements
  addAchievement: () => void;
  updateAchievement: (id: string, updater: (draft: AchievementItem) => void) => void;
  removeAchievement: (id: string) => void;
  
  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, updater: (draft: LanguageItem) => void) => void;
  removeLanguage: (id: string) => void;
  
  // Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  saveSnapshot: () => void;
  
  // Version control
  createVersion: (label: string) => void;
  loadVersion: (versionId: string) => void;
  deleteVersion: (versionId: string) => void;
  duplicateVersion: (versionId: string, newLabel: string) => void;
  
  // ATS Analysis
  setJobDescription: (jd: string) => void;
  setATSAnalysis: (analysis: ATSAnalysis | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  
  // Persistence
  saveResume: () => void;
  loadResumeFromStorage: (resumeId: string) => void;
  setAutoSave: (enabled: boolean) => void;
  
  // UI state
  setActiveSection: (section: string) => void;
  setValidationErrors: (errors: Record<string, string[]>) => void;
  calculateCompleteness: () => void;
}

type ResumeStore = ResumeState & ResumeActions;

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: ResumeState = {
  currentResume: null,
  versions: [],
  activeVersionId: null,
  past: [],
  future: [],
  atsAnalysis: null,
  isAnalyzing: false,
  jobDescription: '',
  activeSection: 'personal-info',
  hasUnsavedChanges: false,
  lastSavedAt: null,
  isAutoSaveEnabled: true,
  validationErrors: {},
  completenessScore: 0,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const calculateResumeCompleteness = (resume: Resume | null): number => {
  if (!resume) return 0;
  
  let score = 0;
  const weights = {
    personalInfo: 15,
    summary: 10,
    experience: 30,
    education: 20,
    skills: 15,
    projects: 5,
    certifications: 3,
    achievements: 2,
  };
  
  // Personal info (required fields)
  if (resume.personalInfo.fullName && resume.personalInfo.email && resume.personalInfo.phone) {
    score += weights.personalInfo;
  }
  
  // Summary
  if (resume.summary?.summary && resume.summary.summary.length >= 50) {
    score += weights.summary;
  }
  
  // Experience
  if (resume.experience.length > 0) {
    const validExp = resume.experience.filter(e => e.company && e.role && e.description);
    score += (validExp.length / Math.max(resume.experience.length, 1)) * weights.experience;
  }
  
  // Education
  if (resume.education.length > 0) {
    score += weights.education;
  }
  
  // Skills
  if (resume.skills.categories.length > 0 || (resume.skills.flatSkills && resume.skills.flatSkills.length > 0)) {
    score += weights.skills;
  }
  
  // Optional sections
  if (resume.projects && resume.projects.length > 0) {
    score += weights.projects;
  }
  if (resume.certifications && resume.certifications.length > 0) {
    score += weights.certifications;
  }
  if (resume.achievements && resume.achievements.length > 0) {
    score += weights.achievements;
  }
  
  return Math.round(score);
};

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const useResumeStore = create<ResumeStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // ====================================================================
        // RESUME CRUD
        // ====================================================================
        
        setResume: (resume) => {
          set((state) => {
            state.currentResume = resume;
            state.hasUnsavedChanges = true;
            state.completenessScore = calculateResumeCompleteness(resume);
          });
          get().saveSnapshot();
        },
        
        updateResume: (updater) => {
          set((state) => {
            if (state.currentResume) {
              updater(state.currentResume);
              state.hasUnsavedChanges = true;
              state.completenessScore = calculateResumeCompleteness(state.currentResume);
            }
          });
        },
        
        clearResume: () => {
          set((state) => {
            state.currentResume = null;
            state.past = [];
            state.future = [];
            state.atsAnalysis = null;
            state.hasUnsavedChanges = false;
            state.completenessScore = 0;
          });
        },
        
        // ====================================================================
        // SECTION UPDATES
        // ====================================================================
        
        updatePersonalInfo: (updater) => {
          set((state) => {
            if (state.currentResume) {
              updater(state.currentResume.personalInfo);
              state.hasUnsavedChanges = true;
            }
          });
        },
        
        updateSummary: (updater) => {
          set((state) => {
            if (state.currentResume) {
              if (!state.currentResume.summary) {
                state.currentResume.summary = { summary: '' };
              }
              updater(state.currentResume.summary);
              state.hasUnsavedChanges = true;
            }
          });
        },
        
        updateExperience: (id, updater) => {
          set((state) => {
            if (state.currentResume) {
              const exp = state.currentResume.experience.find((e) => e.id === id);
              if (exp) {
                updater(exp);
                state.hasUnsavedChanges = true;
              }
            }
          });
        },
        
        addExperience: (data) => {
          set((state) => {
            if (state.currentResume) {
              const newExp = {
                id: generateId(),
                company: data?.company || '',
                role: data?.role || '',
                location: data?.location || '',
                startDate: data?.startDate || '',
                endDate: data?.endDate || '',
                current: data?.current || false,
                description: data?.description || '',
                bullets: data?.bullets || [],
              };
              state.currentResume.experience.unshift(newExp);
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        removeExperience: (id) => {
          set((state) => {
            if (state.currentResume) {
              state.currentResume.experience = state.currentResume.experience.filter((e) => e.id !== id);
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        reorderExperience: (fromIndex, toIndex) => {
          set((state) => {
            if (state.currentResume) {
              const [removed] = state.currentResume.experience.splice(fromIndex, 1);
              state.currentResume.experience.splice(toIndex, 0, removed);
              state.hasUnsavedChanges = true;
            }
          });
        },
        
        updateEducation: (id, updater) => {
          set((state) => {
            if (state.currentResume) {
              const edu = state.currentResume.education.find((e) => e.id === id);
              if (edu) {
                updater(edu);
                state.hasUnsavedChanges = true;
              }
            }
          });
        },
        
        addEducation: (data) => {
          set((state) => {
            if (state.currentResume) {
              const newEdu = {
                id: generateId(),
                school: data?.school || '',
                degree: data?.degree || '',
                field: data?.field || '',
                location: data?.location || '',
                gpa: data?.gpa || '',
                graduationDate: data?.graduationDate || '',
                honors: data?.honors || '',
              };
              state.currentResume.education.push(newEdu);
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        removeEducation: (id) => {
          set((state) => {
            if (state.currentResume) {
              state.currentResume.education = state.currentResume.education.filter((e) => e.id !== id);
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        updateSkills: (updater) => {
          set((state) => {
            if (state.currentResume) {
              updater(state.currentResume.skills);
              state.hasUnsavedChanges = true;
            }
          });
        },
        
        // Projects
        addProject: (data) => {
          set((state) => {
            if (state.currentResume) {
              if (!state.currentResume.projects) state.currentResume.projects = [];
              state.currentResume.projects.push({
                id: generateId(),
                title: data?.title || '',
                link: data?.link || '',
                technologies: data?.technologies || '',
                startDate: data?.startDate || '',
                endDate: data?.endDate || '',
                description: data?.description || '',
                current: data?.current || false,
              });
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        updateProject: (id, updater) => {
          set((state) => {
            if (state.currentResume?.projects) {
              const proj = state.currentResume.projects.find((p) => p.id === id);
              if (proj) {
                updater(proj);
                state.hasUnsavedChanges = true;
              }
            }
          });
        },
        
        removeProject: (id) => {
          set((state) => {
            if (state.currentResume?.projects) {
              state.currentResume.projects = state.currentResume.projects.filter((p) => p.id !== id);
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        // Certifications
        addCertification: () => {
          set((state) => {
            if (state.currentResume) {
              if (!state.currentResume.certifications) state.currentResume.certifications = [];
              state.currentResume.certifications.push({
                id: generateId(),
                name: '',
                issuer: '',
                date: '',
                expirationDate: '',
                credentialId: '',
                link: '',
              });
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        updateCertification: (id, updater) => {
          set((state) => {
            if (state.currentResume?.certifications) {
              const cert = state.currentResume.certifications.find((c) => c.id === id);
              if (cert) {
                updater(cert);
                state.hasUnsavedChanges = true;
              }
            }
          });
        },
        
        removeCertification: (id) => {
          set((state) => {
            if (state.currentResume?.certifications) {
              state.currentResume.certifications = state.currentResume.certifications.filter((c) => c.id !== id);
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        // Achievements
        addAchievement: () => {
          set((state) => {
            if (state.currentResume) {
              if (!state.currentResume.achievements) state.currentResume.achievements = [];
              state.currentResume.achievements.push({
                id: generateId(),
                title: '',
                description: '',
                date: '',
              });
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        updateAchievement: (id, updater) => {
          set((state) => {
            if (state.currentResume?.achievements) {
              const ach = state.currentResume.achievements.find((a) => a.id === id);
              if (ach) {
                updater(ach);
                state.hasUnsavedChanges = true;
              }
            }
          });
        },
        
        removeAchievement: (id) => {
          set((state) => {
            if (state.currentResume?.achievements) {
              state.currentResume.achievements = state.currentResume.achievements.filter((a) => a.id !== id);
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        // Languages
        addLanguage: () => {
          set((state) => {
            if (state.currentResume) {
              if (!state.currentResume.languages) state.currentResume.languages = [];
              state.currentResume.languages.push({
                id: generateId(),
                language: '',
                proficiency: 'intermediate',
              });
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        updateLanguage: (id, updater) => {
          set((state) => {
            if (state.currentResume?.languages) {
              const lang = state.currentResume.languages.find((l) => l.id === id);
              if (lang) {
                updater(lang);
                state.hasUnsavedChanges = true;
              }
            }
          });
        },
        
        removeLanguage: (id) => {
          set((state) => {
            if (state.currentResume?.languages) {
              state.currentResume.languages = state.currentResume.languages.filter((l) => l.id !== id);
              state.hasUnsavedChanges = true;
            }
          });
          get().saveSnapshot();
        },
        
        // ====================================================================
        // UNDO / REDO
        // ====================================================================
        
        saveSnapshot: () => {
          set((state) => {
            if (state.currentResume) {
              // Deep clone current resume
              state.past.push(JSON.parse(JSON.stringify(state.currentResume)));
              // Keep only last 50 snapshots
              if (state.past.length > 50) {
                state.past.shift();
              }
              // Clear future on new change
              state.future = [];
            }
          });
        },
        
        undo: () => {
          const { past } = get();
          if (past.length === 0) return;
          
          set((state) => {
            if (state.currentResume) {
              state.future.push(JSON.parse(JSON.stringify(state.currentResume)));
              state.currentResume = state.past.pop() as Resume;
              state.hasUnsavedChanges = true;
              state.completenessScore = calculateResumeCompleteness(state.currentResume);
            }
          });
        },
        
        redo: () => {
          const { future } = get();
          if (future.length === 0) return;
          
          set((state) => {
            if (state.currentResume) {
              state.past.push(JSON.parse(JSON.stringify(state.currentResume)));
              state.currentResume = state.future.pop() as Resume;
              state.hasUnsavedChanges = true;
              state.completenessScore = calculateResumeCompleteness(state.currentResume);
            }
          });
        },
        
        canUndo: () => get().past.length > 0,
        canRedo: () => get().future.length > 0,
        
        // ====================================================================
        // VERSION CONTROL
        // ====================================================================
        
        createVersion: (label) => {
          set((state) => {
            if (state.currentResume) {
              const version: ResumeVersion = {
                id: generateId(),
                resume: JSON.parse(JSON.stringify(state.currentResume)),
                timestamp: new Date(),
                label,
              };
              state.versions.push(version);
              state.activeVersionId = version.id;
            }
          });
        },
        
        loadVersion: (versionId) => {
          const version = get().versions.find((v) => v.id === versionId);
          if (version) {
            get().setResume(JSON.parse(JSON.stringify(version.resume)));
            set({ activeVersionId: versionId });
          }
        },
        
        deleteVersion: (versionId) => {
          set((state) => {
            state.versions = state.versions.filter((v) => v.id !== versionId);
            if (state.activeVersionId === versionId) {
              state.activeVersionId = null;
            }
          });
        },
        
        duplicateVersion: (versionId, newLabel) => {
          const version = get().versions.find((v) => v.id === versionId);
          if (version) {
            set((state) => {
              const newVersion: ResumeVersion = {
                id: generateId(),
                resume: JSON.parse(JSON.stringify(version.resume)),
                timestamp: new Date(),
                label: newLabel,
              };
              state.versions.push(newVersion);
            });
          }
        },
        
        // ====================================================================
        // ATS ANALYSIS
        // ====================================================================
        
        setJobDescription: (jd) => {
          set({ jobDescription: jd });
        },
        
        setATSAnalysis: (analysis) => {
          set({ atsAnalysis: analysis });
        },
        
        setIsAnalyzing: (isAnalyzing) => {
          set({ isAnalyzing });
        },
        
        // ====================================================================
        // PERSISTENCE
        // ====================================================================
        
        saveResume: () => {
          set({
            hasUnsavedChanges: false,
            lastSavedAt: new Date(),
          });
        },
        
        loadResumeFromStorage: (resumeId) => {
          // Implementation would load from localStorage/backend
          console.log('Loading resume:', resumeId);
        },
        
        setAutoSave: (enabled) => {
          set({ isAutoSaveEnabled: enabled });
        },
        
        // ====================================================================
        // UI STATE
        // ====================================================================
        
        setActiveSection: (section) => {
          set({ activeSection: section });
        },
        
        setValidationErrors: (errors) => {
          set({ validationErrors: errors });
        },
        
        calculateCompleteness: () => {
          set((state) => {
            state.completenessScore = calculateResumeCompleteness(state.currentResume);
          });
        },
      })),
      {
        name: 'resume-store',
        partialize: (state) => ({
          currentResume: state.currentResume,
          versions: state.versions,
          activeVersionId: state.activeVersionId,
          jobDescription: state.jobDescription,
          isAutoSaveEnabled: state.isAutoSaveEnabled,
        }),
      }
    ),
    { name: 'ResumeStore' }
  )
);

// ============================================================================
// AUTOSAVE HOOK
// ============================================================================
// Note: Auto-save is implemented directly in the editor component
// This hook is reserved for future use if needed

// export const useAutoSave = (intervalMs: number = 10000) => {
//   const { currentResume, hasUnsavedChanges, isAutoSaveEnabled, saveResume } = useResumeStore();
//   // Auto-save implementation would go here
//   // Using useEffect in a component or a separate hook
// };
