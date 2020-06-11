export const getChildCategories = (allCategories, parentCategory) => {
  // let newParentCate = [];
  // let finalData = []
  // allCategories.map((cate) => {
  //   let parentCategoryElements = { ...cate };
  //   let childCate = [];
  //   allCategories.forEach((allCate) => {
  //     if (allCate.parent === cate._id) {
  //       childCate.push(allCate);
  //     }
  //   });
  //   parentCategoryElements.childCate = childCate;
  //   newParentCate.push(parentCategoryElements);
  // });

  // newParentCate.forEach(datum => {
  //   if (datum.parent === undefined) {
  //     finalData.push(datum);
  //   }
  // });
  // return finalData;

  let newParentCate = []
  parentCategory.map((parentCate) => {
    let parentCategoryElements = {...parentCate};
    let childCate = [];
    allCategories.map((allCate) => {
      if (allCate.parent === parentCate._id) {
        childCate.push(allCate);
      }
    });
    parentCategoryElements.childCate = childCate
    newParentCate.push(parentCategoryElements)

  });
  return newParentCate;
};
