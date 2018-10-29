const { Contest } = require('../models');


/**
 * The controller that manages contests
 */
class ContestCtrl {
  /**
   * Method that initializes the ContestCtrl object
   * Binds all methods so they don't lose context
   */
  constructor() {
    /**
     * Controls the obtainment of all contests
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.getAll = async (req, res) => {
      let data = await Contest.getAll();
      data = this.processResult(data);
      if (data.length === 0) {
        res.status(400).send({ message: 'Oops! No items satisfy the petition' });
      } else {
        res.status(200).send({ data });
      }
    };


    /**
     * Controls the obtainment of a contest
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.get = async (req, res) => {
      const data = await Contest.get(req.params.contestId);
      if (data.length === 0) {
        res.status(400).send({ message: 'Item not found' });
      }
      res.send({ data });
    };


    /**
     * Controls the creation of a contest
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the creation
     */
    this.create = async (req, res) => {
      const data = await new Contest({
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        type: req.body.type,
        penalty: req.body.penalty,
        frozenTime: req.body.frozenTime,
        deadTime: req.body.deadTime,
        medal: req.body.medal,
      })
        .save();
      if (data === 0) res.status(201).send({ message: 'Item saved' });
      else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
    };


    /**
     * Controls the deletion of a contest
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the deletion
     */
    this.delete = async (req, res) => {
      const data = await new Contest({ alias: req.params.contestId }).delete();
      if (data === 0) {
        res.status(200).send({ message: 'Item deleted' });
      } else if (data === 1) {
        res.status(400).send({ error: 'Oops! Trouble deleting' });
      } else if (data === 2) {
        res.status(404).send({ error: 'Item not found' });
      }
    };
    /**
     * Methods that processes the data obtained in getAll
     * @param  {object} data   all contests obtained from the database
     * @return {Contest[]}     an array containing all existing contests
     */
    this.processResult = (data) => {
      const result = [];
      data.forEach((res) => {
        result.push(new Contest(res));
      });
      return result;
    }
  }
}


module.exports = new ContestCtrl();
