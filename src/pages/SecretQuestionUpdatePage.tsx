// app/profile/user/update/secret-questions/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SecretQuestionsLoading from "@/components/profile-components/SecretQuestionsLoading";
import {
  SecretQuestion,
  UpdateSecretQuestionsRequest,
  UserSecretQuestion,
} from "@/types/auth-types";
import { AuthService } from "@/service/authService";
import {
  Shield,
  ArrowLeft,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Save,
  Info,
  Lock,
} from "lucide-react";

const SecretQuestionUpdatePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingQuestions, setExistingQuestions] = useState<
    UserSecretQuestion[]
  >([]);
  const [availableQuestions, setAvailableQuestions] = useState<
    SecretQuestion[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [questions, setQuestions] = useState<
    { questionId: number; question: string; answer: string }[]
  >([]);
  const [newQuestionId, setNewQuestionId] = useState<number | "">("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const userQuestions = await AuthService.getSecretQuestionsByUser();
      setExistingQuestions(userQuestions);
      const allQuestions = await AuthService.getSecretQuestions();
      setAvailableQuestions(allQuestions);
      setQuestions(
        userQuestions.map((q) => ({
          questionId: q.secretQuestionId,
          question: q.secretQuestion,
          answer: q.answer,
        })),
      );
    } catch (err) {
      console.error("Failed to load questions:", err);
      setError("Failed to load security questions");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], answer: value };
      return updated;
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const handleAddQuestion = () => {
    if (!newQuestionId || !newAnswer.trim()) {
      setError("Please select a question and provide an answer");
      return;
    }
    if (questions.length >= 3) {
      setError("Maximum 3 security questions allowed");
      return;
    }
    const selectedQuestion = availableQuestions.find(
      (q) => q.questionId === newQuestionId,
    );
    if (!selectedQuestion) {
      setError("Invalid question selected");
      return;
    }
    if (questions.some((q) => q.questionId === newQuestionId)) {
      setError("This question is already added");
      return;
    }
    setQuestions((prev) => [
      ...prev,
      {
        questionId: newQuestionId,
        question: selectedQuestion.question,
        answer: newAnswer.trim(),
      },
    ]);
    setNewQuestionId("");
    setNewAnswer("");
    setError(null);
  };

  const prepareUpdateRequest = (): UpdateSecretQuestionsRequest => {
    const updateQuestions = questions
      .filter((q) =>
        existingQuestions.some(
          (eq) =>
            eq.secretQuestionId === q.questionId && eq.answer !== q.answer,
        ),
      )
      .map((q) => ({ question: q.questionId, answer: q.answer }));

    const addQuestions = questions
      .filter(
        (q) =>
          !existingQuestions.some((eq) => eq.secretQuestionId === q.questionId),
      )
      .map((q) => ({ question: q.questionId, answer: q.answer }));

    const removeQuestionsIds = existingQuestions
      .filter(
        (eq) => !questions.some((q) => q.questionId === eq.secretQuestionId),
      )
      .map((eq) => eq.secretQuestionId);

    return { addQuestions, updateQuestions, removeQuestionsIds };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length !== 3) {
      setError("You must have exactly 3 security questions");
      return;
    }
    const updateRequest = prepareUpdateRequest();
    if (
      updateRequest.addQuestions.length === 0 &&
      updateRequest.updateQuestions.length === 0 &&
      updateRequest.removeQuestionsIds.length === 0
    ) {
      setError("No changes detected");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      const message = await AuthService.updateSecretQuestions(updateRequest);
      setSuccess(message || "Security questions updated successfully!");
      setTimeout(() => loadQuestions(), 2000);
    } catch (err) {
      console.error("Failed to update questions:", err);
      setError("Failed to update security questions");
    } finally {
      setSaving(false);
    }
  };

  const getUnusedQuestions = () =>
    availableQuestions.filter(
      (aq) => !questions.some((q) => q.questionId === aq.questionId),
    );

  const canAdd = questions.length < 3 && !!newQuestionId && !!newAnswer.trim();

  if (loading) return <SecretQuestionsLoading />;

  return (
    <div className="flex-1 bg-[#F7F7F7] min-h-screen">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-6 md:py-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-1 w-6 bg-[#FF5000] rounded-full" />
                <span className="text-xs font-bold tracking-widest text-[#FF5000] uppercase">
                  Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Security Questions
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your secret questions for account recovery
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              {/* Progress pill */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i < questions.length ? "bg-[#FF5000]" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">
                  {questions.length}/3
                </span>
              </div>

              <button
                onClick={() => router.push("/profile/user/update")}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeft size={15} />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Alerts ── */}
      {(error || success) && (
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-5">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-3">
              <AlertCircle
                size={18}
                className="text-red-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-700 font-medium flex-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {success && (
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <CheckCircle
                size={18}
                className="text-emerald-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-emerald-700 font-medium flex-1">
                {success}
              </p>
              <button
                onClick={() => setSuccess(null)}
                className="text-emerald-400 hover:text-emerald-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Current Questions ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <Shield size={16} className="text-[#FF5000]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 tracking-tight">
                  Your Security Questions
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Exactly 3 questions required
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {questions.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <Lock size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No questions added yet</p>
                  <p className="text-xs mt-1">
                    Add 3 questions below to secure your account
                  </p>
                </div>
              )}

              {questions.map((question, index) => {
                const isExisting = existingQuestions.some(
                  (eq) => eq.secretQuestionId === question.questionId,
                );
                return (
                  <div
                    key={index}
                    className="group relative bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-orange-200 transition-colors duration-200"
                  >
                    {/* Number badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#FF5000] flex items-center justify-center flex-shrink-0 shadow-sm shadow-orange-200">
                          <span className="text-white text-xs font-black">
                            {index + 1}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                            isExisting
                              ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                              : "text-[#FF5000] bg-orange-50 border-orange-200"
                          }`}
                        >
                          {isExisting ? "Existing" : "New"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(index)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                        title="Remove question"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    {/* Question text */}
                    <p className="text-sm font-semibold text-gray-800 mb-3 leading-relaxed">
                      {question.question}
                    </p>

                    {/* Answer input */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                        Your Answer
                      </label>
                      <input
                        type="text"
                        value={question.answer}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                        placeholder="Enter your answer"
                        className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 transition-all duration-200"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Add New Question ── */}
          {questions.length < 3 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <Plus size={16} className="text-[#FF5000]" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900 tracking-tight">
                    Add Question
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {3 - questions.length} more question
                    {3 - questions.length !== 1 ? "s" : ""} needed
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Question dropdown */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                    Select Question
                  </label>
                  <select
                    value={newQuestionId}
                    onChange={(e) =>
                      setNewQuestionId(
                        e.target.value ? Number(e.target.value) : "",
                      )
                    }
                    className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">Choose a question...</option>
                    {getUnusedQuestions().map((q) => (
                      <option key={q.questionId} value={q.questionId}>
                        {q.question}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Answer input */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                    Your Answer
                  </label>
                  <input
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Add button */}
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  disabled={!canAdd}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Plus size={16} />
                  Add Question
                </button>
              </div>
            </div>
          )}

          {/* ── Guidelines ── */}
          <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-xl relative">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="h-1 bg-[#FF5000]" />
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#FF5000]/20 flex items-center justify-center">
                  <Info size={15} className="text-[#FF5000]" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Important Guidelines
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "You must have exactly 3 security questions configured",
                  "Remove an existing question before adding a replacement",
                  "Answers are case-sensitive — choose memorable responses",
                  "These questions are used to recover access to your account",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-[#FF5000]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5000]" />
                    </div>
                    <span className="text-sm text-white/60 leading-relaxed">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Submit bar ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 shadow-sm">
            <button
              type="button"
              onClick={() => router.push("/profile/user/update")}
              disabled={saving}
              className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || questions.length !== 3}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF5000] text-white rounded-xl text-sm font-bold hover:bg-[#CC4000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 shadow-md shadow-orange-200"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Update Questions
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecretQuestionUpdatePage;
