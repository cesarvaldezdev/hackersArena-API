// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const { Verdict } = require('../models');

class VerdictCtrl {
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
      result.push(new Verdict(res));
    });
    return result;
  }

  async getAll(req, res) {
    // FIXME Agregar manejo de errores
    let data = await Verdict.getAll();
    // FIXME quitar codigo comentado
    // const json = {
    //   data: data,
    //   total_count: data.length,
    //   per_page: data.length,
    //   page: 0,
    // };
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
    let data = await Verdict.get(req.params.verdictId);
    if (data.length === 0) {
      res.status(400).send({message: 'No se encontro el elemento'});
    }
    res.send({data});
  }

  async create(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new Verdict({id: req.params.verdictId,type: req.body.type}).save();
    // FIXME NO utilizar condicionales en una sola linea
    // FIXME los mensajes de las respuestas del API deben ser en ingles
    if(data===0) res.status(201).send({message: 'Guardado correctamente'});
    else if (data===1) res.status(400).send({message: 'No se pudo guardar correctamente'})

  }

  async delete(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new Verdict({id: req.params.verdictId}).delete();
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

module.exports = new VerdictCtrl();
