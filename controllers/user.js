// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const bcrypt = require('bcrypt');

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
    /**
     * Controls the obtainment of all existing users
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.getAll = async (req, res) => {
      // FIXME Agregar manejo de errores
      let ini = 0;
      let fin = process.env.INCREMENT_QUERIES;
      let data = [];
      let cont = true;
      while(cont){
        let pagina = await User.getAll(ini,fin);
        ini += parseInt(process.env.INCREMENT_QUERIES);
        fin += parseInt(process.env.INCREMENT_QUERIES);
        if(pagina.length === 0) cont =false;
        else data.push(pagina);
      }
      //let data = await User.getAll();
      //data = this.processResult(data);
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
      const data = await User.get(req.params.userAlias);
      if (data.length === 0) {
        res.status(400).send({ message: 'Item not found' });
      }
      res.send({ data });
    };


    /**
     * Controls the creation of a user
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the creation
     */
    this.create = async (req, res) => {
      // FIXME Agregar manejo de errores
      const passhash = bcrypt.hashSync(req.body.password, process.env.SALT_ROUNDS);
      const data = await new User({
        alias: req.params.userAlias,
        name: req.body.name,
        lastName: req.body.lastName,
        score: req.body.score,
        email: req.body.email,
        password: passhash,
        idUniversity: req.body.idUniversity,
        idCountry: req.body.idCountry,
        status: 0,
      }).save();
      // FIXME No utilizar condicionales de una sola linea
      if (data === 0) res.status(201).send({ message: 'Item saved' });
      else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
      else if (data === 2) res.status(400).send({ message: 'Oops! Country not found' });
      else if (data === 3) res.status(400).send({ message: 'Oops! University not found' });
    };


    /**
     * Controls the deletion of a user
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the deletion
     */
    this.delete = async (req, res) => {
      // FIXME Agregar manejo de errores
      //const data = await new User({ alias: req.params.userAlias }).delete();
      const user = await User.get(req.params.userAlias);
      user.status = 0;
      const data = await user.save();
      if (data === 0) {
        res.status(200).send({ message: 'User disabled' });
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
        result.push(new User(res));
      });
      return result;
    };
  }
}


module.exports = new UserCtrl();
