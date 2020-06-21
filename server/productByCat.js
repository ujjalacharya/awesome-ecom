let categories = [
  { id: 0, name: "first", parent: null },
  { id: 1, name: "second", parent: 0 },
  { id: 2, name: "third", parent: 1 },
  { id: 3, name: "third1", parent: 1 },
  { id: 4, name: "third2", parent: 1 },
  { id: 5, name: "four", parent: 2 },
  { id: 6, name: "fourA", parent: 2 },
  { id: 7, name: "fourB", parent: 2 },
  { id: 8, name: "fourC", parent: 2 },
  { id: 9, name: "four1", parent: 3 },
  { id: 10, name: "four1A", parent: 3 },
  { id: 11, name: "four1B", parent: 3 },
  { id: 12, name: "four1C", parent: 3 },
  { id: 13, name: "four2", parent: 4 },
  { id: 14, name: "four2A", parent: 4 },
  { id: 15, name: "four2B", parent: 4 },
  { id: 16, name: "four2C", parent: 4 },
];
let products = [
  // { id: 4, name: "ProductOne", categories: [5, 1] },
  { id: 5, name: "Productfour", categories: [5, 8] },
  { id: 6, name: "ProductfourA", categories: [6, 4] },
  { id: 7, name: "ProductfourB", categories: [7] },
  { id: 8, name: "ProductfourC", categories: [8, 5, 6, 12] },
  { id: 9, name: "Productfour1", categories: [9, 11] },
  { id: 10, name: "Productfour1A", categories: [10] },
  { id: 11, name: "Productfour1B", categories: [9, 11] },
  { id: 12, name: "Productfour1C", categories: [12, 14, 16] },
  { id: 13, name: "Productfour2", categories: [13] },
  { id: 14, name: "Productfour2A", categories: [12, 14, 16] },
  { id: 15, name: "Productfour2B", categories: [15, 8] },
  { id: 16, name: "Productfour2C", categories: [12, 14, 16] },
];

let allProducts = []

const productsofAllChildCat = (id) => {
  const allChildCat = categories.filter((c) => c.parent === id);
  console.log(allChildCat)
  // exit();
  let products = [];
  if(allChildCat.length > 0){
    //   console.log('hey hey')
    products = allChildCat.map((cat) => {
        return findProducts(cat);
      });
  }
  console.log(products, 'sada');
  return products;
};
const hasNoParentCat = (cat) => (cat.parent === null ? true : false);
const hasNoChildCat = (id) => {
  let noChild = true;
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].parent === id) {
      noChild = false;
      break;
    }
  }
  return noChild;
};
const findProducts = (cat) => {
  // if(hasNoParentCat(cat)) return null
  let catID = cat.id;
  // if (hasNoChildCat(catID)) return products.filter(p=>p.categories.includes(catID))

  let productsAtThisCat = products.filter((p) => {return p.categories.includes(catID)});
  console.log(productsAtThisCat)
  // if (productsAtThisCat.length > 0) {
      console.log('hey')
      allProducts = productsAtThisCat.concat(productsofAllChildCat(catID));
  // }
  // productsofAllChildCat(catID)
  // return productsAtThisCat;
};

// findProducts(categories[1])
findProducts(categories[1]);
console.log(allProducts)
// findProducts(categories[4])
