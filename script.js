const APIURL = 'https://api.github.com/users/'
const  main = document.getElementById('main');
const  form = document.getElementById('form');
const  search = document.getElementById('search');

console.log('start code');
console.log('middle code');
console.log('finish code');

async function getUser(username) {
try{
  const res = await fetch(APIURL + username);
  const data = await res.json();
  createUserCard(data);
  getRepos(username);
}catch(err){
  if(err.responce.status == 404){
    createErrorCard('No profile with this username');
  }
  console.log(err);
 }
}

async function getRepos(username) {
  try{
    const res = await fetch(APIURL + username + '/repos?sort=created');
    const data = await res.json();
    addReposToCard(data);
  }catch(err){
    console.log(err);
    createErrorCard('Problem fetching repos');
  }
}

function createUserCard(user) {
	const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>`:'';
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${userID}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardHTML = `
  <div class = "card">
  <h1>${msg}</h1>
  </div>
  `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');
  repos.slice(0,5).forEach(repo =>{
    const repolEl = document.createElement('a');
    repolEl.classList.add('repo');
    repolEl.href = repo.html_url;
    repolEl.target = '_blank';
    repolEl.innerText = repo.name;
    reposEl.appendChild(repolEl);
  });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;
    if(user === 'nikitalushpaev'){
      createErrorCard('secret information')
    }
    else{
      getUser(user);
      search.value = '';
    }
    
    
})


