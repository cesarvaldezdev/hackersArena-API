const { Category } = require('../models');


/**
 * The controller that manages categories
 */
class CategoryCtrl {
  /**
   * Method that initializes the CategoryCtrl object
   * Binds all methods so they don't lose context
   */
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }


  /**
   * Method that processes the data obtained in getAll
   * @param  {object} data     all categories obtained in database
   * @return {Category[]}      an array containing all existing categories
   */
  static processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new Category(res));
    });
    return result;
  }


  /**
   * Controls the obtainment of all existing categories
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the obtainment
   */
  static async getAll(req, res) {
    let data = await Category.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ message: 'Oops! No items satisfy the petition' });
    } else {
      res.status(200).send({ data });
    }
  }


  /**
   * Controls the obtainment of a category
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the obtainment
   */
  static async get(req, res) {
    const data = await Category.get(req.params.categoryId);
    if (data.length === 0) {
      res.status(400).send({ message: 'Item not found' });
    }
    res.send({ data });
  }


  /**
   * Controls the creation of a category
   * @param  {object}  req body of a request
   * @param  {object}  res body of a response
   * @return {Promise}     returns data concerning the creation
   */
  static async create(req, res) {
    const data = await new Category({
      id: req.params.categoryId,
      name: req.body.name,
    })
      .save();
    if (data === 0) res.status(201).send({ message: 'Item saved' });
    else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
  }


  /**
   * Controls the deletion of a category
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the deletion
   */
  static async delete(req, res) {
    const data = await new Category({ id: req.params.categoryId }).delete();
    if (data === 0) {
      res.status(200).send({ message: 'Item deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Oops! Trouble deleting' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Item not found' });
    }
  }
}


module.exports = new CategoryCtrl();
