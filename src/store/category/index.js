import StoreModule from "../module";

/**
 * Состояние категорий - список категорий
 */
class CategoryState extends StoreModule {
  initState() {
    return {
      list: [],
    };
  }

  async loadCategories() {
    const response = await fetch(
      "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
    );
    const json = await response.json();
    const items = json.result.items.map((el) => {
      return {
        title: el.title,
        value: el._id,
        _id: el._id,
        parent: el.parent?._id || null,
      };
    });

    const tree = createCategoriesTree(items);
    const categoriesList = [{ title: "Все", value: "all" }, ...tree];

    this.setState(
      {
        ...this.getState(),
        list: categoriesList,
      },
      "Загружен список категорий товаров из АПИ"
    );
  }
}

function createCategoriesTree(items, parent, nesting = 0) {
  parent = parent || null;
  let result = [];

  items.forEach((item) => {
    if (item.parent === parent) {
      item.title = "- ".repeat(nesting) + item.title;
      result.push(item);
      result = [
        ...result,
        ...createCategoriesTree(items, item.value, nesting + 1),
      ];
    }
  });

  return result;
}

export default CategoryState;
