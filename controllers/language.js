// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const { Language } = require('../models');

class LanguageCtrl {
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
      result.push(new Language(res));
    });
    return result;
  }

  async getAll(req, res) {
    // FIXME Agregar manejo de errores
    let data = await Language.getAll();
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
    let data = await Language.get(req.params.languageId);
    if (data.length === 0) {
      // FIXME los mensajes de las respuestas del API deben ser en ingles
      res.status(400).send({message: 'No se encontro el elemento'});
    }
    res.send({data});
  }

  async create(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new Language({
                id:req.params.languageId,
                name:req.body.name,
              })
              .save();
    // FIXME los mensajes de las respuestas del API deben ser en ingles
    // FIXME NO utilizar condicionales en una sola linea
    if(data===0) res.status(201).send({message: 'Guardado correctamente'});
    else if (data===1) res.status(400).send({message: 'No se pudo guardar correctamente'})

  }

  async delete(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new Language({id: req.params.languageId}).delete();
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

module.exports = new LanguageCtrl();
