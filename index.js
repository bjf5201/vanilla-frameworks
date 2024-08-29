// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({
  auth: `personal-access-token123`,
  authStrategy: createOAuthUserAuth,
});

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search';
const app = document.getElementById('app');

function addButtonEvent() {
  document.getElementById('searchButton')
    .addEventListener('click', onSearch);
};

function doSearch(query) {
  return fetch(`${BASE_URL}?q=${query}`)
    .then(response => response.json())
    .then(result => result.total);
};

function onSearch() {
  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};

function getValueFromElementById(id) {
  return document.getElementById(id).value;
};

function appendList(list) {
  const ul = document.createElement('ul');
  ul.setAttribute('id', 'resultList');
  app.appendChild(ul);

  list.forEach(appendItem(ul));
}

function appendItem(ul) {
  return item => {
    const li = document.createElement('li');
    li.textContent = item.title;
    ul.appendChild(li);
  };
}

function removeList() {
  let listNode = document.getElementById('resultList');
  if (listNode) {
    listNode.parentNode.removeChild(listNode);
  }
}

