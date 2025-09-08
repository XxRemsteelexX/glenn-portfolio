
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

interface GitHubAPIResponse {
  repos: GitHubRepo[];
  totalCount: number;
  error?: string;
}

export async function fetchGitHubRepos(username: string = 'XxRemsteelexX'): Promise<GitHubAPIResponse> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Glenn-Portfolio-Website'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}: ${response.statusText}`);
    }

    const repos = await response.json();
    
    return {
      repos: repos || [],
      totalCount: repos?.length || 0
    };
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return {
      repos: [],
      totalCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function transformGitHubRepoToProject(repo: GitHubRepo) {
  return {
    name: repo.name,
    description: repo.description || 'No description available',
    githubUrl: repo.html_url,
    technologies: repo.topics || (repo.language ? [repo.language] : []),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    lastSyncAt: new Date()
  };
}
