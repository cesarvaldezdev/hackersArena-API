const { Problem } = require('../models');

class ProblemCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  processResult(data) {
    const result = [];
    data.forEach((res) => {
      result.push(new Problem(res));
    });
    return result;
  }

  async getAll(req, res) {
    let data = await Problem.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({message: 'No existen elementos que cumplan con la peticion'});
    }else{
      res.status(200).send({data});
    }
  }

  async get(req, res) {
    let data = await User.get(req.params.problemId);
    if (data.length === 0) {
      res.status(400).send({message: 'No se encontro el elemento'});
    }
    res.send({data});
  }

  async create(req, res) {
    let data = await new Problem({
                id: req.body.problemId,
                title: req.body.title,
                difficulty: req.body.difficulty,
                id_author:req.body.id_author,
                score:req.body.score,
                testTime:req.body.testTime,
                memory:req.body.memory,
                description:req.body.description,
                input:req.body.input,
                output:req.body.output})
                .save();
    if(data===0) res.status(201).send({message: 'Guardado correctamente'});
    else if (data===1) res.status(400).send({message: 'No existe el autor que se quiere asignar'});
  }

  async delete(req, res) {
    let data = await new Problem({alias: req.params.problemId}).delete();
    if(data === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (data === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (data === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new ProblemCtrl();
