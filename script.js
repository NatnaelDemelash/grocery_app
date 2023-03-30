// Dom Element
const itemForm = document.getElementById("item-form"); //form
const itemInput = document.getElementById("item-input"); // user inpur
const itemList = document.getElementById("item-list"); // ul
const clearBtn = document.getElementById("clear"); // clear button
const itemFilter = document.getElementById("filter");

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

// Remove Items from the list
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

// Clear All Items
function clearItems() {
  itemList.innerHTML = "";
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
};

// Event Listners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItem);
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
