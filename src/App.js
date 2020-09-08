import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      async function loadRepositories() {
          const response = await api.get('/repositories');

          setRepositories(response.data);
      }

      loadRepositories();
   }, [])

  async function handleAddRepository() {
      const randomNumber = Math.ceil(Math.random() * (1000 - 1) + 1);

     const response = await api.post('/repositories', {
       title: `Repositório ${randomNumber}`,
       url: `Url ${Math.random() * 100000}`,
       techs: 'Tecnologia'
     })

     setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);  
    
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
          </li>  
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
