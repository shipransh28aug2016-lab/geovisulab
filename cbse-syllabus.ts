import { CBSE_CURRICULUM_REGISTRY, CurriculumTopic } from "./cbse-curriculum-registry";

export interface SyllabusTopic {
  id: string;
  classGrade: "11" | "12";
  book: string;
  bookHindi?: string;
  unit: string;
  unitHindi?: string;
  chapterNumber: number;
  chapterTitle: string;
  chapterTitleHindi?: string;
  summary: string;
  summaryHindi?: string;
  keyConcepts: string[];
  keyCharacteristics?: string[];
  associatedLayers: string[];
  targetLocation?: {
    lat: number;
    lng: number;
    zoom: number;
    name: string;
  };
  ncertMapItems: string[];
  examTips: string;
  examTipsHindi?: string;
  learningObjective?: string;
  visualizationType?: CurriculumTopic["visualizationType"];
  interactiveMode?: CurriculumTopic["interactiveMode"];
  practicalRequirement?: string;
}

// Convert CurriculumTopic to backward-compatible SyllabusTopic
export const CBSE_SYLLABUS: SyllabusTopic[] = CBSE_CURRICULUM_REGISTRY.map((topic) => ({
  id: topic.id,
  classGrade: topic.classGrade,
  book: topic.book,
  bookHindi: topic.bookHindi,
  unit: topic.unit,
  unitHindi: topic.unitHindi,
  chapterNumber: topic.chapterNumber,
  chapterTitle: topic.chapterTitle,
  chapterTitleHindi: topic.chapterTitleHindi,
  summary: topic.learningObjective + " " + topic.subtopics.slice(0, 2).join("; "),
  summaryHindi: topic.examTipsHindi,
  keyConcepts: [...topic.subtopics.map((st) => st.split(":")[0].trim())],
  keyCharacteristics: topic.subtopics,
  associatedLayers: topic.associatedLayers,
  targetLocation: topic.targetLocation,
  ncertMapItems: topic.mapWork.items,
  examTips: topic.examTips,
  examTipsHindi: topic.examTipsHindi,
  learningObjective: topic.learningObjective,
  visualizationType: topic.visualizationType,
  interactiveMode: topic.interactiveMode,
  practicalRequirement: topic.practicalRequirement,
}));
