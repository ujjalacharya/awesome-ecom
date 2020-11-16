export const getChildCategories = (allCategories, parentCategory) => {
  let newParentCate = [];
  parentCategory.forEach((parentCate) => {
    let parentCategoryElements = { ...parentCate };
    let childCate = [];
    allCategories.forEach((allCate) => {
      if (allCate.parent === parentCate._id) {
        childCate.push(allCate);
      }
    });
    parentCategoryElements.childCate = childCate;
    newParentCate.push(parentCategoryElements);
  });
  return newParentCate;
};

export const nameWithTripleDots = (title = "") => {
  let newtitle = title;
  const splitted = newtitle.split(" ").join("");
  if (splitted.length > 15) {
    const slicedTitle = newtitle.slice(0, 15) + "...";

    return slicedTitle;
  }

  return title;
};
