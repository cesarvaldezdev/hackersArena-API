const { User } = require('../models');


/**
 * The controller that manages users
 */
class UserCtrl {
  /**
   * Method that initializes the UserCtrl object
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
   * @param  {object} data all users obtained from the database
   * @return {User[]}      an array containing all existing users
   */
  static processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new User(res));
    });
    return result;
  }


  /**
   * Controls the obtainment of all existing users
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the obtainment
   */
  async getAll(req, res) {
    let data = await User.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ message: 'No items satisfy the petition' });
    } else {
      res.status(200).send({ data });
    }
  }


  /**
   * Controls the obtainment of a user
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the obtainment
   */
  static async get(req, res) {
    const data = await User.get(req.params.userAlias);
    if (data.length === 0) {
      res.status(400).send({ message: 'Item not found' });
    }
    res.send({ data });
  }


  /**
   * Controls the creation of a user
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the creation
   */
  static async create(req, res) {
    const data = await new User({
      alias: req.body.alias,
      name: req.body.name,
      lastName: req.body.lastName,
      score: req.body.score,
      email: req.body.email,
      password: req.body.password,
      idUniversity: req.body.idUniversity,
      idCountry: req.body.idCountry,
    })
      .save();
    if (data === 0) res.status(201).send({ message: 'Item saved' });
    else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
    else if (data === 2) res.status(400).send({ message: 'Oops! Country not found' });
    else if (data === 3) res.status(400).send({ message: 'Oops! University not found' });
  }


  /**
   * Controls the deletion of a user
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the deletion
   */
  static async delete(req, res) {
    const data = await new User({ alias: req.params.userAlias }).delete();
    if (data === 0) {
      res.status(200).send({ message: 'Item deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Oops! Trouble deleting' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Item not found' });
    }
  }
}


module.exports = new UserCtrl();
