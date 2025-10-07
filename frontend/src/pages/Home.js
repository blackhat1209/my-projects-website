import React, { useState, useEffect } from 'react';

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Admin config
  const ADMIN_USERNAME = 'blackhat1209';
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Add Project form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Check admin
  useEffect(() => {
    // Replace with real auth in production!
    const user = ADMIN_USERNAME;
    setCurrentUser(user);
    setIsAdmin(user === ADMIN_USERNAME);
  }, []);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add Project logic
  const handleAddProject = () => {
    setShowAddForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map(tech => tech.trim())
          .filter(Boolean)
      };
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      if (!response.ok) throw new Error('Failed to add project');
      setFormData({ title: '', description: '', technologies: '', githubLink: '', liveLink: '' });
      setShowAddForm(false);
      await fetchProjects();
      alert('Project added successfully!');
    } catch (err) {
      alert('Failed to add project: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setFormData({ title: '', description: '', technologies: '', githubLink: '', liveLink: '' });
  };

  // Render
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

      {/* Add Project button */}
      {isAdmin && !showAddForm && (
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

      {/* Add Project Form */}
      {showAddForm && isAdmin && (
        <div
          style={{
            border: '2px solid #007bff',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '5px',
            backgroundColor: '#f0f8ff'
          }}
        >
          <h2>Add New Project</h2>
          <form onSubmit={handleSubmitProject}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Technologies (comma separated)
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="e.g., React, Node.js, MongoDB"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                GitHub Link
              </label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                placeholder="https://github.com/..."
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Live Link
              </label>
              <input
                type="url"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleInputChange}
                placeholder="https://..."
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? 'Submitting...' : 'Submit Project'}
              </button>
              <button
                type="button"
                onClick={handleCancelAdd}
                disabled={submitting}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h2>Project List</h2>
        {projects.length === 0 ? (
          <p>
            No projects found.{' '}
            {isAdmin
              ? 'Click "Add Project" to create your first project!'
              : 'Check back later for updates.'}
          </p>
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
                    style={{
                      color: '#007bff',
                      textDecoration: 'none',
                      marginRight: '15px'
                    }}
                  >
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#28a745',
                      textDecoration: 'none'
                    }}
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
