const { Solution } = require('../models');


/**
 * The controller that manages solution
 */
class SolutionCtrl {
  /**
   * Method that initializes the SolutionCtrl object
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
   * @param  {object} data     all solutions obtained from the databse
   * @return {Solution[]}      an array containing all existing solutions
   */
  static processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new Solution(res));
    });
    return result;
  }


  /**
   * Controls the obtainment of all existing solutions
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the obtainment
   */
  async getAll(req, res) {
    let data = await Solution.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ message: 'No items satisfy the petition' });
    } else {
      res.status(200).send({ data });
    }
  }


  /**
   * Controls the obtainment of a solution
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the obtainment
   */
  static async get(req, res) {
    const data = await Solution.get(req.params.solutionId);
    if (data.length === 0) {
      res.status(400).send({ message: 'Item not found' });
    }
    res.send({ data });
  }


  /**
   * Controls the creation of a solution
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the creation
   */
  static async create(req, res) {
    const data = await new Solution({
      id: req.params.solutionId,
      date: req.body.date,
      time: req.body.time,
      memory: req.body.memory,
      size: req.body.size,
      aliasUser: req.body.aliasUser,
      idProblem: req.body.idProblem,
      idLanguage: req.body.idLanguage,
      idVerdict: req.body.idVerdict,
    })
      .save();
    if (data === 0) res.status(201).send({ message: 'Item saved' });
    else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
    else if (data === 2) res.status(400).send({ message: 'Oops! Problem not found' });
    else if (data === 3) res.status(400).send({ message: 'Oops! Language not found' });
    else if (data === 4) res.status(400).send({ message: 'Oops! User not found' });
    else if (data === 5) res.status(400).send({ message: 'Oops! Verdict not found' });
  }


  /**
   * Controls the deletion of a solution
   * @param  {object}  req body of the request
   * @param  {object}  res body of the response
   * @return {Promise}     returns data concerning the deletion
   */
  static async delete(req, res) {
    const data = await new Solution({ id: req.params.solutionId }).delete();
    if (data === 0) {
      res.status(200).send({ message: 'Item deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Oops! Trouble deleting' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Item not found' });
    }
  }
}


module.exports = new SolutionCtrl();
