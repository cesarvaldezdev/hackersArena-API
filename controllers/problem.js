// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const { Problem } = require('../models');


/**
 * The controller that manages problem
 */
class ProblemCtrl {
  /**
   * Method that initializes the ProblemCtrl object
   * Binds all methods so they don't lose context
   */
  constructor() {
    /**
     * Controls the obtainment of all existing problems
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.getAll = async (req, res) => {
      // FIXME Agregar manejo de errores
      let data = await Problem.getAll();
      data = this.processResult(data);
      if (data.length === 0) {
        res.status(400).send({ message: 'No items satisfy the petition' });
      } else {
        res.status(200).send({ data });
      }
    };


    /**
     * Controls the obtainment of a problem
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.get = async (req, res) => {
      // FIXME Agregar manejo de errores
      const data = await Problem.get(req.params.problemId);
      if (data.length === 0) {
        res.status(400).send({ message: 'Item not found' });
      }
      res.send({ data });
    };


    /**
     * Controls the creation of a problem
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the creation
     */
    this.create = async (req, res) => {
      // FIXME Agregar manejo de errores
      const data = await new Problem({
        id: req.params.problemId,
        idDoc: req.body.idDoc,
        testTime: req.body.testTime,
        testMemory: req.body.testMemory,
        attempts: req.body.attempts,
        solved: req.body.solved,
        aliasUser: req.body.aliasUser,
        idCategory: req.body.idCategory,
      })
        .save();
      // FIXME No utilizar condicionales de una sola linea
      if (data === 0) res.status(201).send({ message: 'Item saved' });
      else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
      else if (data === 2) res.status(400).send({ message: 'Oops! Alias not found' });
      else if (data === 3) res.status(400).send({ message: 'Oops! Category not found' });
    };


    /**
     * Controls the deletion of a problem
     * @param  {[type]}  req body of the request
     * @param  {[type]}  res body of the response
     * @return {Promise}     returns data concerning the deletion
     */
    this.delete = async (req, res) => {
      // FIXME Agregar manejo de errores
      const data = await new Problem({ id: req.params.problemId }).delete();
      if (data === 0) {
        res.status(200).send({ message: 'Deleted succesfully' });
      } else if (data === 1) {
        res.status(400).send({ error: 'Oops! Trouble deleting' });
      } else if (data === 2) {
        res.status(404).send({ error: 'Item not found' });
      }
    };


    /**
     * Method that processes the data obtained in getAll
     * @param  {object} data   all problems obtained from the database
     * @return {Problem[]}     an array containing all existing problems
     */
    this.processResult = (data) => {
      const result = [];
      data.forEach((res) => {
        result.push(new Problem(res));
      });
      return result;
    };
  }
}


module.exports = new ProblemCtrl();
