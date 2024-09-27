import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${searchQuery}/repos`
      );
      setRepositories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortBy = (value) => {
    setSortBy(value);

    let sortedRepositories = [...repositories];

    if (value === 'stars') {
      sortedRepositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (value === 'forks') {
      sortedRepositories.sort((a, b) => b.forks_count - a.forks_count);
    }

    setRepositories(sortedRepositories);
  };

  return (
    <div className="App">
      <h1>GitHub Repository Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="sort-container">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => handleSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>
      </div>

      <ul className="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id} className="repository-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Forks: {repo.forks_count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
