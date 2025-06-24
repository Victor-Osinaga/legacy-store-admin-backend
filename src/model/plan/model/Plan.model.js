class Plan {
  #id;
  #name;
  #price;

  constructor({ id, name, price }) {
    this.setId(id);
    this.setName(name);
    this.setPrice(price);
  }

  // getter y setter ID
  setId(id) {
    if (!id || typeof id !== "string" || id.trim() == "")
      throw { msg: "ID es requerida" };
    this.#id = id;
  }
  getId() {
    return this.#id;
  }

  // getter y setter NAME
  setName(name) {
    if (!name || name.length == 0 || name.trim() == "")
      throw { msg: "NAME es requerida" };
    this.#name = name;
  }
  getName() {
    return this.#name;
  }

  // getter y setter PRICE
  setPrice(price) {
    if (!price || typeof price !== "number")
      throw { msg: "PRICE es requerido" };
    this.#price = price;
  }
  getPrice() {
    return this.#price;
  }

  // DTO
  convertToDTO() {
    return Object.freeze({
      id: this.#id,
      name: this.#name,
      price: this.#price,
    });
  }
}

export { Plan };
