import React, { useState, useEffect } from 'react'

import api from './services/api'

import './styles.css'

export default function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio React.js',
      url: 'http://github.com/tmowes/desafio-conceitos-reactjs',
      techs: 'NodeJS, ReactJS, ReactNative',
    })
    const repository = response.data
    setRepositories([...repositories, repository])
  }
  // DONE

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter((repository) => repository.id !== id))
  }
  // DONE

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}
