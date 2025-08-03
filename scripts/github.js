// Ganti dengan info GitHub Anda
const GITHUB_USERNAME = "ilham-eng";
const GITHUB_REPO = "gimm";
const GITHUB_TOKEN = "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"; // Dapatkan di GitHub Settings > Developer Settings

async function saveToGitHub(content) {
    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/data/anime_list.json`,
        {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Update anime data",
                content: btoa(unescape(encodeURIComponent(content))),
                sha: await getFileSHA()
            })
        }
    );
    return response.json();
}

async function getFileSHA() {
    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/data/anime_list.json`
    );
    const data = await response.json();
    return data.sha;
          }
