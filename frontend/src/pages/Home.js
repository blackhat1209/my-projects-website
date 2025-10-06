import React from 'react';

function Home() {
  const dummyProjects = [
    { id: 1, title: 'Project 1', description: 'Description for project 1' },
    { id: 2, title: 'Project 2', description: 'Description for project 2' },
    { id: 3, title: 'Project 3', description: 'Description for project 3' }
  ];

  const handleAddProject = () => {
    console.log('Add Project clicked');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Projects Portfolio</h1>
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
      <div>
        <h2>Project List</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {dummyProjects.map(project => (
            <li 
              key={project.id} 
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '5px'
              }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
