const GITHUB_GRAPHQL = "https://api.github.com/graphql";

export type ContributionDay = {
  contributionCount: number;
  date: string;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type GitHubContributions = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

export async function getGitHubContributions(
  username: string,
): Promise<GitHubContributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;
    return calendar ?? null;
  } catch {
    return null;
  }
}
