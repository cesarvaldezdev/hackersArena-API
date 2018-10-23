const { Verdict } = require('../models');


/**
 * The controller that manages verdicts
 */
class VerdictCtrl {
  /**
   * Method that initializes the VerdictCtrl object
   * Binds all methods so they don't lose context
   */
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);

    /**
     * Method that processes the data obtained in getAll
     * @param  {object}   data  all verdicts obtained from the database
     * @return {Verdict[]}      an array containing all the obtained verdicts
     */
    this.processResult = (data) => {
      const result = [];
      data.forEach((res) => {
        result.push(new Verdict(res));
      });
      return result;
    };


    /**
     * Controls the obtainment of all existing verdicts
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.getAll = async (req, res) => {
      let data = await Verdict.getAll();
      // const json = {
      //   data: data,
      //   total_count: data.length,
      //   per_page: data.length,
      //   page: 0,
      // };
      data = this.processResult(data);
      if (data.length === 0) {
        res.status(400).send({ message: 'No items satisfy the petition' });
      } else {
        res.status(200).send({ data });
      }
    };


    /**
     * Controls the obtainment of a verdict
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     return data concerning the obtainment
     */
    this.get = async (req, res) => {
      const data = await Verdict.get(req.params.verdictId);
      if (data.length === 0) {
        res.status(400).send({ message: 'Item not found' });
      }
      res.send({ data });
    };


    /**
     * Controls the creation of a verdict
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the creation
     */
    this.create = async (req, res) => {
      const data = await new Verdict({ id: req.params.verdictId, type: req.body.type }).save();
      if (data === 0) res.status(201).send({ message: 'Item saved' });
      else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
    };

    /**
     * Controls the deletion of a verdict
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the deletion
     */
    this.delete = async (req, res) => {
      const data = await new Verdict({ id: req.params.verdictId }).delete();
      if (data === 0) {
        res.status(200).send({ message: 'Item deleted' });
      } else if (data === 1) {
        res.status(400).send({ error: 'Oops! Trouble deleting' });
      } else if (data === 2) {
        res.status(404).send({ error: 'Item not found' });
      }
    };
  }
}

module.exports = new VerdictCtrl();
