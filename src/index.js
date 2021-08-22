const list = document.getElementById('list');
const input = document.getElementById('input');
const btn = document.getElementById('btn');
const readonlyBox = document.getElementById('readonly');
const tagStorageKey = 'tags';
const readonlyStorageKey = 'readonly';

const tags = {
  value: [],
  addTag(tagName) {
    this.value.push({ name: tagName, id: `${this.value.length}_${tagName}` });
    localStorage.setItem(tagStorageKey, JSON.stringify(this.value));
    renderList();
  },
  readonlyMode() {
    input.toggleAttribute('disabled');
    btn.toggleAttribute('disabled');
    const destroyButtons = document.getElementsByClassName('destroy');
    for (let i = 0; i < destroyButtons.length; i++) {
      destroyButtons[i].toggleAttribute('disabled');
    }
  },
  getTags() {
    const allTags = [];
    this.value.map((tag) => {
      allTags.push(tag.name);
    });
    const pTag = document.createElement('p');
    pTag.innerHTML = ``;
    pTag.innerHTML = `<p>${allTags.join(', ')}</p>`;
    list.after(pTag);
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

window.addEventListener('click', function (e) {
  console.log(e.target);
});

renderList();