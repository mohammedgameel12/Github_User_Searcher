let githubUser = document.querySelector("#username");
let userContainer = document.querySelector(".github_user");
let reposContainer = document.querySelector(".repos");
let btn = document.querySelector("#search_btn");

btn.onclick = _ => {
    reposContainer.innerHTML = ""
    userContainer.innerHTML = `
        <div class="loading"></div>
    `
    if (githubUser.value === "") {
        alert("Must be filled")
    } else {
        fetch(`https://api.github.com/users/${githubUser.value}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Not Found') {
                userContainer.innerHTML = `
                    <h1>User Not Found</h1>
                `
            } else {
                userContainer.innerHTML = `
                    <img src="${data.avatar_url || "userimg.jpg"}">
                    <h1>${data.name || "Unknown"}</h1>
                    <p>@${data.login || "No username"}</p>
                    <h2>${data.bio || "No bio"}</h2>
                    <div><span>Following : ${data.following || 0}</span><span>Followers : ${data.followers || 0}</span></div>
                    <links>
                        ${data.blog ? `<a href="${data.blog}" target="_blank"><i class="fa-solid fa-paperclip"></i></a>` : ""}
                        <a href="${data.html_url}" target="_blank"><i class="fa-brands fa-github"></i></a>
                    </links>
                `
                fetch(`https://api.github.com/users/${githubUser.value}/repos`)
                .then(response => response.json())
                .then(repos => {
                    reposContainer.innerHTML += `<h1>${data.public_repos} Repos</h1>` || "0"
                    repos.forEach(repo => {
                        reposContainer.innerHTML += `
                        <div class="repo">
                            <h1>${repo.name}</h1>
                            <a href="${repo.owner.html_url}/${repo.name}" target="_blank">Preview</a>
                        </div>
                    `
                    })
                })
            }
        })
    }
}
