import React, { useState, useEffect } from 'react';

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Admin configuration - set your GitHub username here
  const ADMIN_USERNAME = 'blackhat1209';
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch current user from GitHub
  useEffect(() => {
    // In production, you would get this from your auth system
    // For now, checking if logged in as admin
    const checkAdmin = async () => {
      try {
        // This is a placeholder - in production you'd have proper auth
        const user = ADMIN_USERNAME; // Replace with actual auth check
        setCurrentUser(user);
        setIsAdmin(user === ADMIN_USERNAME);
      } catch (err) {
        console.error('Error checking admin status:', err);
      }
    };

    checkAdmin();
  }, []);

  // Fetch projects from backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = () => {
    // Navigate to add project page or open modal
    console.log('Add Project clicked');
    // TODO: Implement add project functionality
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>My Projects Portfolio</h1>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>My Projects Portfolio</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <p>Please make sure the backend server is running.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Projects Portfolio</h1>
      
      {/* Show Add Project button only for admin */}
      {isAdmin && (
        <button
          onClick={handleAddProject}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Add Project
        </button>
      )}
      
      <div>
        <h2>Project List</h2>
        {projects.length === 0 ? (
          <p>No projects found. {isAdmin ? 'Click "Add Project" to create your first project!' : 'Check back later for updates.'}</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {projects.map(project => (
              <li
                key={project._id}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>{project.title}</h3>
                <p style={{ margin: '0 0 10px 0' }}>{project.description}</p>
                {project.technologies && (
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Technologies: </strong>
                    {project.technologies.join(', ')}
                  </div>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007bff', textDecoration: 'none', marginRight: '15px' }}
                  >
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#28a745', textDecoration: 'none' }}
                  >
                    Live Demo
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
