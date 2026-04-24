import { useState } from "react";

// Define the shape of our Project object using a TypeScript interface
// This gives us autocomplete and type safety across the component
interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
}

function App() {
  // State to store the projects, strongly typed as an array of Project objects
  const [projects, setProjects] = useState<Project[]>([]);

  // Function triggered by the button click
  const handleFetchProjects = async () => {
    try {
      // Perform the GET request to our Node.js backend
      const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/projects`);

      // Check if the HTTP response is successful (status 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON payload from the response
      const data = await response.json();

      // Update the state with the fetched data to trigger a re-render
      setProjects(data);
    } catch (error) {
      // Log any potential network or parsing errors to the console
      console.error("❌ Error fetching data:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>My Dockerized Portfolio</h1>

      {/* Button to trigger the fetch API manually */}
      <button
        onClick={handleFetchProjects}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Fetch Projects from Database
      </button>

      {/* Render the projects list only if our state array has items */}
      {projects.length > 0 && (
        <ul style={{ marginTop: "20px", listStyleType: "none", padding: 0 }}>
          {projects.map((project) => (
            <li
              key={project.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>
                <strong>Tech Stack:</strong> {project.tech_stack}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
