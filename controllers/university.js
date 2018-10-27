const { University } = require('../models');


/**
 * Controller that manages the universities
 */
class UniversityCtrl {
  /**
   * Method that initializes the UniversityCtrl object
   * Binds all methods so they don't lose context
   */
  constructor() {
    /**
     * Controls the obtainment of all existing universities
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.getAll = async (req, res) => {
      let data = await University.getAll();
      data = this.processResult(data);
      if (data.length === 0) {
        res.status(400).send({ message: 'No items satisfy the petition' });
      } else {
        res.status(200).send({ data });
      }
    };


    /**
     * Controls the obtainment of a university
     * @param  {object}  req body of the request
     * @param  {object}  res body of the response
     * @return {Promise}     returns data concerning the obtainment
     */
    this.get = async (req, res) => {
      const data = await University.get(req.params.universityId);
      if (data.length === 0) {
        res.status(400).send({ message: 'Item not found' });
      }
      res.send({ data });
    };


    /**
     * Controls the creation of a university
     * @param  {object}  req body of a request
     * @param  {object}  res body of a response
     * @return {Promise}     returns data concerning the creation
     */
    this.create = async (req, res) => {
      const data = await new University({
        id: req.params.universityId,
        name: req.body.name,
        idLogo: req.body.idLogo,
        idCountry: req.body.idCountry,
      })
        .save();
      if (data === 0) res.status(201).send({ message: 'Item saved' });
      else if (data === 1) res.status(400).send({ message: 'Oops! Trouble saving' });
      else if (data === 2) res.status(400).send({ message: 'Oops! Country not found' });
    };


    /**
     * Controls the deletion of a university
     * @param  {object}  req body of a request
     * @param  {object}  res body of a response
     * @return {Promise}     [description]
     */
    this.delete = async (req, res) => {
      const data = await new University({ id: req.params.universityId }).delete();
      if (data === 0) {
        res.status(200).send({ message: 'Item deleted' });
      } else if (data === 1) {
        res.status(400).send({ error: 'Oops! Trouble deleting' });
      } else if (data === 2) {
        res.status(404).send({ error: 'Item not found' });
      }
    };
    /**
     * Method that processes thedata obtained in getAll
     * @param  {object} data     all universities obtained from the database
     * @return {University[]}    an array containing all existing universities
     */
    this.processResult = (data) => {
      const result = [];
      data.forEach((res) => {
        result.push(new University(res));
      });
      return result;
    }
  }
}


module.exports = new UniversityCtrl();
