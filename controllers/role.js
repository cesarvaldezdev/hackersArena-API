// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const { Role } = require('../models');


/**
 * The controller that manages verdicts
 */
class RoleCtrl {
  /**
   * Method that initializes the VerdictCtrl object
   * Binds all methods so they don't lose context
   */
  constructor() {
    /**
     * Controls the obtainment of all existing verdicts
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.getAll = async (req, res) => {
      // FIXME Agregar manejo de errores
      let data = await Role.getAll();
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
      // FIXME Agregar manejo de errores
      const data = await Role.get(req.params.roleId);
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
      // FIXME Agregar manejo de errores
      const data = await new Role({ id: req.params.roleId, name: req.body.name }).save();
      // FIXME No utilizar condicionales de una sola linea
      if (data === 0) {
        res.status(201).send({ message: 'Item saved' });
      } else if (data === 1) {
        res.status(400).send({ message: 'Oops! Trouble saving' });
      }
    };


    /**
     * Controls the deletion of a verdict
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the deletion
     */
    this.delete = async (req, res) => {
      // FIXME Agregar manejo de errores
      const data = await new Role({ id: req.params.roleId }).delete();
      if (data === 0) {
        res.status(200).send({ message: 'Item deleted' });
      } else if (data === 1) {
        res.status(400).send({ error: 'Oops! Trouble deleting' });
      } else if (data === 2) {
        res.status(404).send({ error: 'Item not found' });
      }
    };


    /**
     * Method that processes the data obtained in getAll
     * @param  {object}   data  all verdicts obtained from the database
     * @return {Verdict[]}      an array containing all the obtained verdicts
     */
    this.processResult = (data) => {
      const result = [];
      data.forEach((res) => {
        result.push(new Role(res));
      });
      return result;
    };
  }
}


module.exports = new RoleCtrl();
