import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  async load() {
    const response = await fetch("/api/v1/articles");
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      "Загружены товары из АПИ"
    );
  }

  async loadItem(id) {
    if (!id) return {};
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );

    const json = await response.json();

    return {
      _id: json.result._id,
      description: json.result.description,
      title: json.result.title,
      madeIn: {
        title: json.result.madeIn.title,
        code: json.result.madeIn.code,
      },
      category: json.result.category.title,
      year: json.result.edition,
      price: json.result.price,
    };
  }
}

export default Catalog;
