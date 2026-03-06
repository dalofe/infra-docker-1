import { useState } from "react";
import "./App.css";

function Button() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/status");
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response:", data);
      setResponse(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error:", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Fetch Server Status"}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </button>
      {response && (
        <div>
          <p>{response.message}</p>
          <p>{new Date(response.timestamp).toLocaleString("es-ES")}hs</p>
          <button onClick={() => setResponse(null)}>Clear Response</button>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <>
      <div className="card">
        <Button />
      </div>
    </>
  );
}

export default App;
