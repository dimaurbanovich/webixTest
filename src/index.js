const list = document.getElementById('list');
const input = document.getElementById('input');
const btn = document.getElementById('btn');
const readonlyBox = document.getElementById('readonly');
const allTagsBtn = document.getElementById('allTagsBtn');
const replaceTagsBtn = document.getElementById('replaceTagsBtn');
const removeTagBtn = document.getElementById('removeTagBtn');

const tagStorageKey = 'tags';

const tags = {
  value: [],
  addTag(tagName) {
    const enteredTag = tagName.split(' ');
    enteredTag.forEach((tagName) => {
      if (tagName !== '') {
        this.value.push({ name: tagName, id: `${this.value.length}_${tagName}` });
      }
    });
    localStorage.setItem(tagStorageKey, JSON.stringify(this.value));
    renderList();
  },
  readonlyMode() {
    input.toggleAttribute('disabled');
    btn.toggleAttribute('disabled');
    replaceTagsBtn.toggleAttribute('disabled');
    allTagsBtn.toggleAttribute('disabled');
    removeTagBtn.toggleAttribute('disabled');
    const destroyButtons = document.getElementsByClassName('destroy');
    for (let i = 0; i < destroyButtons.length; i++) {
      destroyButtons[i].toggleAttribute('disabled');
    }
  },
  getTags() {
    const allTags = [];
    tags.value.map((tag) => {
      allTags.push(tag.name);
    });
    const pTag = document.createElement('p');
    const addedPTag = document.getElementById('allTags');
    if (addedPTag !== null) {
      addedPTag.innerHTML = `<p id='allTags'>${allTags.join(', ')}</p>`;
    } else {
      pTag.innerHTML = `<p id='allTags'>${allTags.join(', ')}</p>`;
      list.after(pTag);
    }
  },
  replaceTags(stringNewTags) {
    const arrNewTags = stringNewTags.split(' ');
    const newTags = [];
    arrNewTags.forEach((tagName) => {
      if (tagName !== '') {
        newTags.push({ name: tagName, id: `${this.value.length}_${tagName}` });
      }
    });

    input.value = '';
    this.value = newTags;

    localStorage.setItem(tagStorageKey, JSON.stringify(newTags));

    renderList();
  },
  removeLastTag() {
    tags.value.pop();
    localStorage.setItem(tagStorageKey, JSON.stringify(tags.value));

    renderList();
  },
};

if (localStorage.getItem(tagStorageKey) !== null) {
  tags.value = JSON.parse(localStorage.getItem(tagStorageKey));
}

input.addEventListener('keyup', function (event) {
  const tagValue = input.value;
  if (event.key === 'Enter' && tagValue !== '') {
    tags.addTag(tagValue);
    input.value = '';
  }
  renderList();
});

btn.addEventListener('click', function () {
  const tagValue = input.value;
  if (tagValue !== '') {
    tags.addTag(tagValue);
    input.value = '';
  }
  renderList();
});

const renderList = () => {
  list.innerHTML = ``;
  tags.value.forEach((tag) => {
    const liTag = document.createElement('li');
    liTag.className = 'tag';
    liTag.innerHTML = `
        <div>
        <span>${tag.name}</span>
        <button data-value='${tag.id}' class='destroy'>&times</button>
        </div>`;

    list.append(liTag);
  });
};

list.addEventListener('click', function (e) {
  const deleteBtn = e.target;
  if (deleteBtn.classList.contains('destroy')) {
    const deleteId = deleteBtn.dataset.value;
    tags.value = tags.value.filter((tag) => tag.id !== deleteId);
    localStorage.setItem(tagStorageKey, JSON.stringify(tags.value));
  }
  if (!readonlyBox.checked) {
    renderList();
  }
});

readonlyBox.addEventListener('click', tags.readonlyMode);

removeTagBtn.addEventListener('click', tags.removeLastTag);

allTagsBtn.addEventListener('click', tags.getTags);
replaceTagsBtn.addEventListener('click', function () {
  const tagValue = input.value;
  tags.replaceTags(tagValue);
});

renderList();
