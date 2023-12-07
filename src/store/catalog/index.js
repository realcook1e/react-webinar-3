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
      count: 0,
      limit: 10,
      skip: 0,
    };
  }

  setSkip(skip) {
    this.setState({
      ...this.getState(),
      skip,
    });
  }

  async load() {
    const { limit, skip } = this.getState();

    return await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState(
          {
            ...this.getState(),
            list: json.result.items,
            count: json.result.count,
          },
          "Загружены товары из АПИ"
        );
      });
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
