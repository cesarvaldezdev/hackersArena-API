// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const { Problem, ProblemData } = require('../models');


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
      let ini = 0;
      let fin = process.env.INCREMENT_QUERIES;
      let data = [];
      let cont = true;
      while(cont){
        let pagina = await Problem.getAll(ini,fin,true);
        ini += parseInt(process.env.INCREMENT_QUERIES);
        fin += parseInt(process.env.INCREMENT_QUERIES);
        if(pagina.length === 0) cont =false;
        else data.push(pagina);
      }
      // let data = await Problem.getAll();
      // data = this.processResult(data);
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
      }else{
        const dataP = await ProblemData.get(req.params.problemId);
        if (dataP.length === 0) {
          res.status(400).send({ message: 'Problem data not found' });
        }else{
          data.description = dataP.description;
          data.test = dataP.test;
          data.output = dataP.output;
          res.status(200).send({ data });
        }
      }
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
        timeLimit: 0,//req.body.timeLimit,
        memoryLimit: 0,//req.body.memoryLimit,
        attempts: 0,//req.body.attempts,
        solved: 0,//req.body.solved,
        aliasUser: req.body.aliasUser,
        idCategory: req.body.idCategory,
        status: req.body.status,
        title: req.body.title,
      }).save();

      let idP = req.params.problemId;
      if(idP === undefined){
        let idP = await Problem.getAll(0,1,false);
        if(idP !== undefined){
          idP = idP[0].id;
        }else{
          res.status(400).send({ message: "Oops! Can't save data problem, try again" });
        }
      }
      console.log(idP);
      console.log(req.body.description);
      console.log(req.body.test);
      console.log(req.body.output);
      const dataP = await new ProblemData({
        idProblem: idP,
        description: req.body.description,
        test: req.body.test,
        output: req.body.output,
      }).save();
      if(dataP !== 0){
        res.status(400).send({ message: "Oops! Can't save data problem, try again" });
      }

      if (data === 0) {
        res.status(201).send({ message: 'Item saved' });
      }else if (data === 1) {
        res.status(400).send({ message: 'Oops! Trouble saving' });
      }else if (data === 2) {
        res.status(400).send({ message: 'Oops! Alias not found' });
      }else if (data === 3) {
        res.status(400).send({ message: 'Oops! Category not found' });
      }
    };


    /**
     * Controls the deletion of a problem
     * @param  {[type]}  req body of the request
     * @param  {[type]}  res body of the response
     * @return {Promise}     returns data concerning the deletion
     */
    this.delete = async (req, res) => {
      // FIXME Agregar manejo de errores
      //const data = await new Problem({ id: req.params.problemId }).delete();
      const problem = await Problem.get(req.params.problemId);
      problem.status = 0;
      const data = await problem.save();
      if (data === 0) {
        res.status(200).send({ message: 'Problem disabled' });
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
