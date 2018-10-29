const { Country } = require('../models');


/**
 * The controller that manages countries
 */
class CountryCtrl {
  /**
   * Method that initializes a CountryCtrl object
   * Binds all methods so they don't lose context
   */
  constructor() {
    /**
     * Controls the obtainment of all existing countries
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.getAll = async (req, res) => {
      let data = await Country.getAll();
      data = this.processResult(data);
      if (data.length === 0) {
        res.status(400).send({ message: 'No items satisfy the petition' });
      } else {
        res.status(200).send({ data });
      }
    };


    /**
     * Controls the obtainment of a country
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.get = async (req, res) => {
      const data = await Country.get(req.params.countryId);
      if (data.length === 0) {
        res.status(400).send({ message: 'Item not found' });
      }
      res.send({ data });
    };


    /**
     * Controls the creation of a country
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the creation
     */
    this.create = async (req, res) => {
      const data = await new Country({
        id: req.params.countryId,
        name: req.body.name,
        id_flag: req.body.id_flag,
      })
        .save();
      if (data === 0) res.status(201).send({ message: 'Item saved' });
      else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
    };


    /**
     * Controls the deletion of a country
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the deletion
     */
    this.delete = async (req, res) => {
      const data = await new Country({ id: req.params.countryId }).delete();
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
     * @param  {object} data    all countries obtained from the database
     * @return {Country[]}      an array containing all existing countries
     */
    this.processResult = (data) => {
      const result = [];
      data.forEach((res) => {
        result.push(new Country(res));
      });
      return result;
    }
  }
}


module.exports = new CountryCtrl();
