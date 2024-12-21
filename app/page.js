"use client";
import React, { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const handleAnalysis = async () => {
    if (!address) {
      setError("Please enter a Solana contract address.");
      return;
    }
    setError("");
    setLoading(true);
    setAnalysis(null);

    try {
      // Simulated API call or logic to analyze Twitter sentiment
      // Replace this with your actual logic or fetch call.
      const response = await fakeAnalysis(address);

      // This is a mock function below; you might do something like:
      // const response = await fetch('/api/analyze', { method: 'POST', body: JSON.stringify({ address }) });
      // const data = await response.json();
      // setAnalysis(data);

      setAnalysis(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong analyzing the sentiment.");
      setLoading(false);
    }
  };

  // Mock function that returns random sentiment
  const fakeAnalysis = async (contractAddress) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.3) {
          resolve({
            sentiment: "Negative",
            recommendation: "Not a good buy right now.",
          });
        } else if (random < 0.7) {
          resolve({
            sentiment: "Neutral",
            recommendation: "Might be safe, but do more research.",
          });
        } else {
          resolve({
            sentiment: "Positive",
            recommendation: "Looks promising! Might be a good buy.",
          });
        }
      }, 1500);
    });
  };

  return (
    <div className="container">
      <div className="formBox">
        <h1>Rationalize</h1>
        <p>
          The mysterious AI agent that peers into the Twitter realm,
          analyzing the whisperings around your Solana contract to guide your decisions.
        </p>
        <input
          type="text"
          placeholder="Enter Solana contract address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleAnalysis} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {analysis && (
          <div style={{ marginTop: "1em" }}>
            <h3>Sentiment: {analysis.sentiment}</h3>
            <p>Recommendation: {analysis.recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
