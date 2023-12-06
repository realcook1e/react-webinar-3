import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      _id: "",
      description: "",
      title: "",
      madeIn: {
        title: "",
        code: "",
      },
      category: "",
      year: 0,
      price: 0,
    };
  }

  // Запрос информации о товаре
  async getProductInfo(id) {
    if (!id) return {};
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );

    const json = await response.json();

    this.setState({
      ...this.getState(),
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
    });
  }
}

export default Product;
