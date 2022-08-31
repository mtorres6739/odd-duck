'use strict';

let imageContainer = document.getElementById('display-images');
let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');

imageOne.addEventListener('click', onClick);
imageTwo.addEventListener('click', onClick);
imageThree.addEventListener('click', onClick);

// Local Storage - Array for local storage
Product.theWholeSheBang = [];

// let result = document.getElementById('result');
let maxClicks = 25;
let clicks = 0;



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
  { path: './img/sweep.png', name: 'sweep' },
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
  this.score = 0;

  // Local Storage - Add every image that gets created into an array
  Product.theWholeSheBang.push(this);


}

for (let i = 0; i < imgArray.length; i++) {
  const product = new Product(imgArray[i].name, imgArray[i].path);
  allConstructedProducts.push(product);
}


let uniqueIndices = [];

function getRandomImages() {
  uniqueIndices = [];
  while (uniqueIndices.length < 3) {
    let randomNumber = Math.floor(Math.random() * imgArray.length);
    const product = allConstructedProducts[randomNumber];
    if (!uniqueIndices.includes(product)) {
      uniqueIndices.push(product);
      product.shown++;
    }

  }

  imageOne.src = uniqueIndices[0].path;
  imageOne.alt = uniqueIndices[0].name;

  imageTwo.src = uniqueIndices[1].path;
  imageTwo.alt = uniqueIndices[1].name;

  imageThree.src = uniqueIndices[2].path;
  imageThree.alt = uniqueIndices[2].name;

}
getRandomImages();

function onClick(event) {
  clicks++;

  let clickedImage = event.target.alt;

  if (clicks >= maxClicks) {
    // showResults();
    // renderChart();
    // Local Storage - store items
    let toStore = Product.theWholeSheBang;
    let serialized = JSON.stringify(toStore);
  
    localStorage.setItem('toStore', serialized);

  } else {
    for (let i = 0; i < uniqueIndices.length; i++) {
      if (clickedImage === uniqueIndices[i].name) {
        // uniqueIndices[i].clicks++;
        uniqueIndices[i].score++;

        break;
      }
    }
    getRandomImages();
  }
  // if (event.target.alt === uniqueIndices[0].name) {
  //   uniqueIndices[0].clicks++;
  // }
  // if (event.target.alt === uniqueIndices[1].name) {
  //   uniqueIndices[1].clicks++;
  // }
  // if (event.target.alt === uniqueIndices[2].name) {
  //   uniqueIndices[2].clicks++;
  // }


  // getRandomImages();

  // Local Storage - load orders and display them
  let maybeStored = localStorage.getItem('toStore');
  let deSerialized = JSON.parse(maybeStored);
  if (maybeStored) {
    Product.theWholeSheBang = deSerialized;
  }
}








let button = document.getElementById('product-button');
button.addEventListener('click', showResults);
button.addEventListener('click', renderChart);

function showResults() {
  let ul = document.getElementById('result');
  for (let i = 0; i < allConstructedProducts.length; i++) {
    // const product = allConstructedProducts[i];
    let title = document.createElement('li');
    title.textContent = `${allConstructedProducts[i].name}: ${allConstructedProducts[i].score} clicks, ${allConstructedProducts[i].shown} views`;
    ul.appendChild(title);


  }
  return ul;

  // for (let i = 0; i < imgArray.length; i++){
  //   let title = document.createElement('li');
  // title.textContent = `${uniqueIndices[i].name} : ${uniqueIndices[i].clicks}`;
  // }
}
document.getElementById('display-images');
// imageContainer.addEventListener('click', onClick);




// CHART

function capitalize(str) {
  let returnValue = str.split('');
  returnValue[0] = returnValue[0].toUpperCase();
  returnValue = returnValue.join('');
  return returnValue;
}


function renderChart() {

  let productNames = [];
  let productClicks = [];
  let productViews = [];

  for (let i = 0; i < allConstructedProducts.length; i++) {
    productNames.push(capitalize(allConstructedProducts[i].name));
    productClicks.push(allConstructedProducts[i].score);
    productViews.push(allConstructedProducts[i].shown);
  }

  const data = {
    labels: productNames,
    datasets: [{
      label: 'Clicks',
      data: productClicks,
      backgroundColor: ['rgba(0,255,0.5)'],
      borderColor: ['rgba(0,255,0,1)'],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: ['rgba(0,0,255,0.5)'],
      borderColor: ['rgba(0,0,255,1)'],
      borderWidth: 1
    }]
  };

  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
}
