const fruits = [
  { type: "Banana", color: "Yellow" },
  { type: "Apple", color: "Green" }
];


// LONGER FORM
let yellowFruit;
for (let i = 0; i < fruits.length; ++i) {
  if (fruits[i].color === "Yellow") {
    yellowFruit = fruits[i];
  }
}


// SHORTHAND
yellowFruit = fruits.find((fruit) => fruit.color === "Yellow");