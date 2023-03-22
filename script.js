// Dom Element
const itemForm = document.getElementById("item-form"); //form
const itemInput = document.getElementById("item-input"); // user inpur
const itemList = document.getElementById("item-list"); // ul

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add item!");
    return;
  } else {
    // Create list item
    const li = document.createElement("li");
    li.innerText = newItem;
    itemList.appendChild(li);

    const button = document.createElement("button");
    button.className = "remove-item btn-clear text-red";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";
    button.appendChild(icon);

    li.appendChild(button);

    console.log(button);
  }
});
