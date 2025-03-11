"use client";
import { useState, FormEvent } from 'react';

interface Results {
  claims: {
    text: string;
    claimReview: {
      title: string;
      textualRating: string;
    }[];
  }[];
}

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 防止表單提交
    setLoading(true);
    setError(null);

    try {
      // 呼叫內部 API
      const res = await fetch(`/api/fact-check?query=${query}`);
      const data = await res.json();

      if (res.ok) {
        setResults(data); // 設定查核結果
      } else {
        setError(data.error); // 顯示錯誤訊息
      }
    } catch (error) {
      setError('API 請求失敗'); // 錯誤處理
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* 標題 */}
        <h1 className="text-2xl font-bold text-center mb-4">Fact Checker</h1>
        {/* 表單 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {/* 顯示錯誤訊息 */}
        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* 顯示查核結果 */}
        {results && results.claims && results.claims.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold">Results</h2>
            <div>
              {results.claims.slice(0, 3).map((claim, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-bold">{claim.text}</h3>
                  {claim.claimReview.slice(0, 1).map((review, idx) => (
                    <div key={idx}>
                      <p className="text-gray-600">
                        <strong>Title:</strong> {review.title}
                      </p>
                      <p className="text-gray-600">
                        <strong>Rating:</strong> {review.textualRating}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-gray-200 text-center text-gray-700 rounded-lg shadow-md">
            <p className="text-xl font-semibold">No results found</p>
            <p className="mt-2 text-sm">Try searching with different keywords or check your input.</p>
          </div>
        )}
      </div>
    </div>
  );
}
