const { Solution } = require('../models');

class SolutionCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  static processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new Solution(res));
    });
    return result;
  }

  async getAll(req, res) {
    let data = await Solution.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ message: 'No existen elementos que cumplan con la peticion' });
    } else {
      res.status(200).send({ data });
    }
  }

  static async get(req, res) {
    const data = await Solution.get(req.params.solutionId);
    if (data.length === 0) {
      res.status(400).send({ message: 'Element could not be found' });
    }
    res.send({ data });
  }

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
    if (data === 0) res.status(201).send({ message: 'Saved successfully' });
    else if (data === 1) res.status(400).send({ message: 'Could not be saved' });
    else if (data === 2) res.status(400).send({ message: 'Problem does not exist' });
    else if (data === 3) res.status(400).send({ message: 'No existe el lenguaje que se quiere asignar' });
    else if (data === 4) res.status(400).send({ message: 'No existe el usuario que se quiere asignar' });
    else if (data === 5) res.status(400).send({ message: 'No existe el veredicto que se quiere asignar' });
  }

  static async delete(req, res) {
    const data = await new Solution({ id: req.params.solutionId }).delete();
    if (data === 0) {
      res.status(200).send({ message: 'Deleted successfully' });
    } else if (data === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (data === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new SolutionCtrl();
