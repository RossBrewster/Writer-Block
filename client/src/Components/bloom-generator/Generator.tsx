import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../ui/Alert";

const BloomsTaxonomyLevels = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create"
] as const;

type BloomsTaxonomyLevel = typeof BloomsTaxonomyLevels[number];

interface Question {
  question: string;
  answer: string;
}

export const QuestionGenerator: React.FC = () => {
  const [lessonPlan, setLessonPlan] = useState('');
  const [bloomsLevel, setBloomsLevel] = useState<BloomsTaxonomyLevel>('Remember');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://m7rkvakx88.execute-api.us-west-2.amazonaws.com/dev/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonPlan, bloomsLevel }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Please check your API key or CORS settings.');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQuestions(data.result.questions);
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Network error. Please check your internet connection or CORS settings.');
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
      console.error('Error details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Question Generator</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="lessonPlan" className="block text-sm font-medium text-gray-700 mb-1">
            Lesson Plan
          </label>
          <textarea
            id="lessonPlan"
            value={lessonPlan}
            onChange={(e) => setLessonPlan(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>
        
        <div>
          <label htmlFor="bloomsLevel" className="block text-sm font-medium text-gray-700 mb-1">
            Bloom's Taxonomy Level
          </label>
          <select
            id="bloomsLevel"
            value={bloomsLevel}
            onChange={(e) => setBloomsLevel(e.target.value as BloomsTaxonomyLevel)}
            className="w-full p-2 border rounded-md"
            required
          >
            {BloomsTaxonomyLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Questions'}
        </button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {questions.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Generated Questions</h2>
          <ul className="space-y-4">
            {questions.map((q, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-md">
                <p className="font-medium mb-2">Q: {q.question}</p>
                <p className="text-gray-700">A: {q.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

