// GitHub API base URL
const apiUrl = 'https://api.github.com';

// DOM Elements
const repositoriesContainer = document.getElementById('repositories');
const loadingSpinner = document.getElementById('loading');
const pageSizeSelect = document.getElementById('pageSize');

let currentPage = 1;
let repositoriesPerPage = parseInt(pageSizeSelect.value);

// Fetch repositories from GitHub API
async function fetchRepositories(username) {
  try {
    const response = await fetch(
      `${apiUrl}/users/${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

// Render repositories on the page
function renderRepositories(repositories) {
  repositoriesContainer.innerHTML = '';

  repositories.forEach((repository) => {
    const card = document.createElement('div');
    card.className = 'card col-md-6 mb-4';

    card.innerHTML = `
      <div class="card-header bg-primary text-white">${repository.name}</div>
      <div class="card-body">
        <h5 class="card-title">${repository.full_name}</h5>
        <p class="card-text">${repository.description || 'No description available.'}</p>
        <a href="${repository.html_url}" target="_blank" class="btn btn-primary">Visit Repository</a>
      </div>
    `;

    repositoriesContainer.appendChild(card);
  });
}

// Update repositories per page and re-fetch
function updatePerPage() {
  currentPage = 1;
  repositoriesPerPage = parseInt(pageSizeSelect.value);
  fetchAndRenderRepositories();
}

// Fetch and render repositories based on the current page and per page count
async function fetchAndRenderRepositories() {
  loadingSpinner.style.display = 'block';

  const username = 'bhoomika2025'; // Replace with the desired GitHub username

  const repositories = await fetchRepositories(username);
  renderRepositories(repositories);

  loadingSpinner.style.display = 'none';
}

// Event listeners for pagination buttons
document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchAndRenderRepositories();
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  currentPage++;
  fetchAndRenderRepositories();
});

// Initial fetch and render
fetchAndRenderRepositories();