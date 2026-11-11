"use client";

import React, { useState } from "react";
import {
  X,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  Sparkles,
  PlusCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizzes: any[];
  currentUser: any;
  onAttemptComplete: (attemptData: any) => void;
  onCreateQuiz: (newQuiz: any) => Promise<void>;
  onFlyToLocation?: (coords: { lat: number; lng: number }) => void;
}

export default function QuizModal({
  isOpen,
  onClose,
  quizzes,
  currentUser,
  onAttemptComplete,
  onCreateQuiz,
  onFlyToLocation,
}: QuizModalProps) {
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [activeTab, setActiveTab] = useState<"take" | "create">("take");

  // Create Quiz Form state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newClassGrade, setNewClassGrade] = useState("11");
  const [newChapterRef, setNewChapterRef] = useState("Class 11 - India: Physical Environment, Ch 3");
  const [newQuestions, setNewQuestions] = useState([
    {
      id: "q_custom_1",
      prompt: "Identify the salt water lake in Odisha situated at the mouth of Daya River.",
      options: ["Wular Lake", "Chilika Lake", "Sambhar Lake", "Pulicat Lake"],
      correctAnswer: "Chilika Lake",
      targetCoords: { lat: 19.7, lng: 85.3 },
      explanation: "Chilika Lake is Asia's largest brackish water lagoon, designated as the first Indian wetland under Ramsar Convention.",
    },
  ]);

  if (!isOpen) return null;

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);
  const questions = activeQuiz ? (activeQuiz.questions as any[]) : [];
  const currentQuestion = questions[currentQIndex];

  const handleStartQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setUserAnswers({});
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQuestion) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedOption }));
  };

  const handleNextQuestion = async () => {
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === currentQuestion.correctAnswer ? 0 : 0);

      // Trigger Confetti if high score
      if (finalScore >= questions.length * 0.7) {
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore
        }
      }

      // Record to backend
      if (activeQuiz) {
        onAttemptComplete({
          quizId: activeQuiz.id,
          score: finalScore,
          maxScore: questions.length,
          answers: userAnswers,
        });
      }
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await onCreateQuiz({
      title: newTitle,
      description: newDesc || "Custom teacher test",
      classGrade: newClassGrade,
      chapterRef: newChapterRef,
      difficulty: "medium",
      questions: newQuestions,
    });

    setActiveTab("take");
  };

  return (
    <div className="fixed inset-0 z-1100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-sm text-white">
              CBSE Geography Map Pointing Challenge
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {currentUser?.role === "teacher" && (
              <div className="flex bg-slate-800 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setActiveTab("take")}
                  className={`px-2.5 py-1 rounded-md font-semibold ${
                    activeTab === "take" ? "bg-emerald-500 text-white" : "text-slate-400"
                  }`}
                >
                  Test Sets
                </button>
                <button
                  onClick={() => setActiveTab("create")}
                  className={`px-2.5 py-1 rounded-md font-semibold ${
                    activeTab === "create" ? "bg-emerald-500 text-white" : "text-slate-400"
                  }`}
                >
                  Create Quiz
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Quiz Taking View */}
        {activeTab === "take" && (
          <div className="flex-1 overflow-y-auto p-5">
            {!activeQuizId ? (
              // Quiz selection list
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white">
                    Select a CBSE Board Map Skill Practice Set
                  </h3>
                  <p className="text-xs text-slate-400">
                    Timed map recognition questions designed strictly aligned with NCERT guidelines.
                  </p>
                </div>

                <div className="space-y-3">
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Class {quiz.classGrade}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {(quiz.questions as any[])?.length || 5} Questions
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-100">{quiz.title}</h4>
                        <p className="text-xs text-slate-400">{quiz.description}</p>
                      </div>

                      <button
                        onClick={() => handleStartQuiz(quiz.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 transition shadow"
                      >
                        Start Test →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : isFinished ? (
              // Result Card
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Challenge Completed!</h3>
                  <p className="text-xs text-slate-400">
                    Your Score: <span className="text-emerald-400 font-bold text-base">{score}</span> / {questions.length}
                  </p>
                </div>

                <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  {score === questions.length ? (
                    <p className="text-emerald-300 font-medium">
                      🌟 Outstanding! Full marks in CBSE Map pointing. Your spatial recall is board-ready.
                    </p>
                  ) : score >= questions.length * 0.6 ? (
                    <p className="text-amber-300">
                      👍 Good attempt! Review the questions you missed using the 3D layers.
                    </p>
                  ) : (
                    <p className="text-rose-300">
                      📖 Keep practicing! Use the Chapter-wise syllabus explorer to revisit drainage & mineral maps.
                    </p>
                  )}
                </div>

                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => handleStartQuiz(activeQuizId)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </button>
                  <button
                    onClick={() => setActiveQuizId(null)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow"
                  >
                    Back to All Quizzes
                  </button>
                </div>
              </div>
            ) : (
              // Question View
              <div className="space-y-5">
                {/* Question Progress Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <span>Score: {score}</span>
                </div>

                {/* Prompt */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white leading-relaxed">
                    {currentQuestion.prompt}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {currentQuestion.options.map((option: string, idx: number) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQuestion.correctAnswer;

                    let btnStyle = "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300";
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-3.5 rounded-xl border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {isAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>NCERT Geographic Rationale</span>
                      </span>

                      {currentQuestion.targetCoords && onFlyToLocation && (
                        <button
                          onClick={() => onFlyToLocation(currentQuestion.targetCoords)}
                          className="text-[11px] text-sky-400 hover:underline"
                        >
                          Show on Map →
                        </button>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setActiveQuizId(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Quit Quiz
                  </button>

                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedOption}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs transition shadow"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-1 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow"
                    >
                      <span>
                        {currentQIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Teacher Quiz Creator */}
        {activeTab === "create" && (
          <form onSubmit={handleCreateSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-white">Create Custom Map Skill Test</h3>
              <p className="text-slate-400">
                Author customized CBSE test questions for your students.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Test Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit Test 2: Peninsular Drainage & Black Soils"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Class Grade</label>
                  <select
                    value={newClassGrade}
                    onChange={(e) => setNewClassGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  >
                    <option value="11">Class 11 (Physical)</option>
                    <option value="12">Class 12 (Human / Economy)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">NCERT Chapter</label>
                  <input
                    type="text"
                    value={newChapterRef}
                    onChange={(e) => setNewChapterRef(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Sample Question Prompt</label>
                <textarea
                  rows={2}
                  value={newQuestions[0].prompt}
                  onChange={(e) =>
                    setNewQuestions([
                      { ...newQuestions[0], prompt: e.target.value },
                    ])
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {newQuestions[0].options.map((opt, i) => (
                  <input
                    key={i}
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...newQuestions[0].options];
                      updated[i] = e.target.value;
                      setNewQuestions([{ ...newQuestions[0], options: updated }]);
                    }}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("take")}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow"
              >
                Publish Test
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
