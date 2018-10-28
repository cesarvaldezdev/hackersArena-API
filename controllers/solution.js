// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const { Solution } = require('../models');

class SolutionCtrl {
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
      result.push(new Solution(res));
    });
    return result;
  }

  async getAll(req, res) {
    // FIXME Agregar manejo de errores
    let data = await Solution.getAll();
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
    let data = await Solution.get(req.params.solutionId);
    if (data.length === 0) {
      // FIXME los mensajes de las respuestas del API deben ser en ingles
      res.status(400).send({message: 'No se encontro el elemento'});
    }
    res.send({data});
  }

  async create(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new Solution({
                id : req.params.solutionId,
                date : req.body.date,
                time : req.body.time,
                memory : req.body.memory,
                size : req.body.size,
                alias_User : req.body.alias_User,
                id_Problem : req.body.id_Problem,
                id_Language : req.body.id_Language,
                id_Verdict : req.body.id_Verdict,
                })
                .save();
    // FIXME NO utilizar condicionales en una sola linea
    // FIXME los mensajes de las respuestas del API deben ser en ingles
    if(data===0) res.status(201).send({message: 'Guardado correctamente'});
    else if (data===1) res.status(400).send({message: 'No se pudo guardar correctamente'});
    else if (data===2) res.status(400).send({message: 'No existe el problema que se quiere asignar'});
    else if (data===3) res.status(400).send({message: 'No existe el lenguaje que se quiere asignar'});
    else if (data===4) res.status(400).send({message: 'No existe el usuario que se quiere asignar'});
    else if (data===5) res.status(400).send({message: 'No existe el veredicto que se quiere asignar'});
  }

  async delete(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new Solution({id: req.params.solutionId}).delete();
    // FIXME los mensajes de las respuestas del API deben ser en ingles
    if(data === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (data === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (data === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new SolutionCtrl();
