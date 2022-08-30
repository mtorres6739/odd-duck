'use strict';

let imageContainer = document.getElementById('display-images');
let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');

imageOne.addEventListener('click', onClick);
imageTwo.addEventListener('click', onClick);
imageThree.addEventListener('click', onClick);


console.log('image one', imageOne);

// ALL IMAGES
let imgArray = [
  { path: './img/bag.jpg', name: 'bag' },
  { path: './img/banana.jpg', name: 'banana' },
  { path: './img/bathroom.jpg', name: 'bathroom' },
  { path: './img/boots.jpg', name: 'boots' },
  { path: './img/breakfast.jpg', name: 'breakfast' },
  { path: './img/bubblegum.jpg', name: 'bubblegum' },
  { path: './img/chair.jpg', name: 'chair' },
  { path: './img/cthulhu.jpg', name: 'cthulhu' },
  { path: './img/dog-duck.jpg', name: 'dog-duck' },
  { path: './img/dragon.jpg', name: 'dragon' },
  { path: './img/pen.jpg', name: 'pen' },
  { path: './img/pet-sweep.jpg', name: 'pet-sweep' },
  { path: './img/scissors.jpg', name: 'scissors' },
  { path: './img/shark.jpg', name: 'shark' },
  { path: './img/sweep.jpg', name: 'sweep' },
  { path: './img/tauntaun.jpg', name: 'tauntaun' },
  { path: './img/water-can.jpg', name: 'water-can' },
  { path: './img/wine-glass.jpg', name: 'wine-glass' }
];

let allConstructedProducts = [];

// CONSTRUCTOR
function Product(name, path) {

  this.name = name;
  this.path = path;

  this.shown = 0;
  this.clicks = 0;
  allConstructedProducts.push(this);
}
for (let i = 0; i < imgArray.length; i++) {
  new Product(imgArray[i].name, imgArray[i].path);
}
console.log(allConstructedProducts);
let uniqueIndices = [];
function getRandomImages() {
  uniqueIndices = [];
  while (uniqueIndices.length < 3) {
    let randomNumber = Math.floor(Math.random() * imgArray.length);
    if (!uniqueIndices.includes(allConstructedProducts[randomNumber])) {
      uniqueIndices.push(allConstructedProducts[randomNumber]);
    }
    console.log(uniqueIndices);
  }
  console.log('Filled in unique products', uniqueIndices);
  imageOne.src = uniqueIndices[0].path;
  imageOne.alt = uniqueIndices[0].name;
  
  imageTwo.src = uniqueIndices[1].path;
  imageTwo.alt = uniqueIndices[1].name;
  
  imageThree.src = uniqueIndices[2].path;
  imageThree.alt = uniqueIndices[2].name;
  
}
getRandomImages();

function onClick(event) {
  console.log(event);
  console.log('image container was clicked');
  if (event.target.alt === uniqueIndices[0].name) {
    uniqueIndices[0].clicks++;
  }
  if (event.target.alt === uniqueIndices[1].name) {
    uniqueIndices[1].clicks++;
  }
  if (event.target.alt === uniqueIndices[2].name) {
    uniqueIndices[2].clicks++;
  }
  console.log(uniqueIndices);
  getRandomImages();
}



document.getElementById('display-images');
// imageContainer.addEventListener('click', onClick);
