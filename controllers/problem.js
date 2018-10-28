// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
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
    // FIXME Agregar manejo de errores
    let data = await Problem.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      // FIXME los mensajes de las respuestas del API deben ser en ingles
      res.status(400).send({message: 'No existen elementos que cumplan con la peticion'});
    }else{
      res.status(200).send({data});
    }
  }

  async get(req, res) {
    // FIXME Agregar manejo de errores
    let data = await Problem.get(req.params.problemId);
    if (data.length === 0) {
      // FIXME los mensajes de las respuestas del API deben ser en ingles
      res.status(400).send({message: 'No se encontro el elemento'});
    }
    res.send({data});
  }

  async create(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new Problem({
                id: req.params.problemId,
                id_doc: req.body.id_doc,
                testTime: req.body.testTime,
                testMemory: req.body.testMemory,
                attempts: req.body.attempts,
                solved: req.body.solved,
                alias_User: req.body.alias_User,
                id_Category: req.body.id_Category
                })
                .save();
    // FIXME los mensajes de las respuestas del API deben ser en ingles
    // FIXME NO utilizar condicionales en una sola linea
    if(data===0) res.status(201).send({message: 'Guardado correctamente'});
    else if (data===1) res.status(400).send({message: 'No se ha podido guardar'});
    else if (data===2) res.status(400).send({message: 'No existe el alias que se quiere asignar'});
    else if (data===3) res.status(400).send({message: 'No existe la categoria que se quiere asignar'});
  }

  async delete(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new Problem({id: req.params.problemId}).delete();
    if(data === 0){
      // FIXME los mensajes de las respuestas del API deben ser en ingles
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (data === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (data === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new ProblemCtrl();
