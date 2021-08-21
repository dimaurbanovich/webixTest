const list = document.getElementById('list');
const input = document.getElementById('input');
const btn = document.getElementById('btn');
const readonlyBox = document.getElementById('readonly');

let tags = [];

btn.addEventListener('click', function () {
  const tagValue = input.value;
  tags.push({ name: tagValue, id: `${tags.length}_${tagValue}` });

  renderList();
});

const renderList = () => {
  list.innerHTML = ``;
  tags.forEach((tag) => {
    const liTag = document.createElement('li');

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
    tags = tags.filter((tag) => tag.id !== deleteId);
    console.log(tags);
  }
  renderList();
});

const addOneTag = (tagName) => {
  tags.push({ name: tagName, id: `${tags.length}_${tagValue}` });
};

const readonlyMode = () => {
  input.toggleAttribute('disabled');
  btn.toggleAttribute('disabled');
};

readonlyBox.addEventListener('click', readonlyMode);
