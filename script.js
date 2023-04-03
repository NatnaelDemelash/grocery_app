// Dom Element
const itemForm = document.getElementById("item-form"); //form
const itemInput = document.getElementById("item-input"); // user inpur
const itemList = document.getElementById("item-list"); // ul
const clearBtn = document.getElementById("clear"); // clear button
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");

let isEditMode = false;

function displayItems() {
  const itemFromStorage = getItemFromStroage();

  itemFromStorage.forEach((item) => addItemToDom(item));

  checkUI();
}

// Add grocery items to the list
function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an Item");
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  }

  // Add Item to the DOM
  addItemToDom(newItem);

  // Add Item to Local Storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM list
  itemList.appendChild(li);
}

// Create Button
const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

// Create Icon
const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

function addItemToStorage(item) {
  let itemFromStorage = getItemFromStroage();

  itemFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function getItemFromStroage() {
  let itemFromStorage;

  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll("li").forEach((i) => (i.style.color = "orange"));

  item.classList.add("edit-mode");
  item.style.color = "#ccc";

  formBtn.innerHTML = '<i class="fa-solid fa-pen "></i> Update Item';

  itemInput.value = item.textContent;
}

// Remove Items from the list
function removeItem(item) {
  if (confirm("Are you Sure ?")) {
    // Remove Item from DOM
    item.remove();

    // Remove from Local Storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemFromStorage = getItemFromStroage();

  itemFromStorage = itemFromStorage.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

// Clear All Items
function clearItems() {
  itemList.innerHTML = "";

  localStorage.removeItem("items");

  checkUI();
}

// Filter Item
function filterItem(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

const checkUI = () => {
  const items = itemList.querySelectorAll("li");
  if (items.length == 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = "<i class= 'fa-solid fa-add'></i> Add Item";
  isEditMode = false;
};

// Event Listners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItem);
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
