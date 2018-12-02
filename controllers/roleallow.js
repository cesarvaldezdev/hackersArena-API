// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const bcrypt = require('bcrypt');

const { RoleAllow } = require('../models');

/**
 * The controller that manages users
 */
class RoleAllowCtrl {
  /**
   * Method that initializes the UserCtrl object
   * Binds all methods so they don't lose context
   */
  constructor() {
    /**
     * Controls the obtainment of all existing users
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.getAll = async (req, res) => {
      // FIXME Agregar manejo de errores
      let data = await RoleAllow.getAll();
      data = this.processResult(data);
      if (data.length === 0) {
        res.status(400).send({ message: 'No items satisfy the petition' });
      } else {
        res.status(200).send({ data });
      }
    };


    /**
     * Controls the obtainment of a user
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.get = async (req, res) => {
      // FIXME Agregar manejo de errores
      let data = await RoleAllow.get(req.params.idRole);
      data = this.processResult(data);
      if (data.length === 0) {
        res.status(400).send({ message: 'No items satisfy the petition' });
      }
      res.status(400).send({ data });
    };


    /**
     * Controls the creation of a user
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the creation
     */
    this.create = async (req, res) => {
      // FIXME Agregar manejo de errores
      if(req.body.status === undefined){
        req.body.status = 1;
      }
      const data = await new RoleAllow({
        idRole: req.body.idRole,
        idAllow: req.body.idAllow,
        status: req.body.status,
      }).save();
      // FIXME No utilizar condicionales de una sola linea
      if (data === 0) res.status(201).send({ message: 'Item saved' });
      else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
      else if (data === 2) res.status(400).send({ message: 'Oops! Allow not found' });
      else if (data === 3) res.status(400).send({ message: 'Oops! Role not found' });
    };


    /**
     * Controls the deletion of a user
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the deletion
     */
    this.delete = async (req, res) => {
      // FIXME Agregar manejo de errores
      const data = await new RoleAllow({
        idRole: req.body.idRole,
        idAllow: req.body.idAllow,
        status: req.body.status,
      }).delete();

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
     * @param  {object} data all users obtained from the database
     * @return {User[]}      an array containing all existing users
     */
    this.processResult = (data) => {
      const result = [];
      data.forEach((res) => {
        result.push(new RoleAllow(res));
      });
      return result;
    };
  }
}


module.exports = new RoleAllowCtrl();
