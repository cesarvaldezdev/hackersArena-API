// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
const { User } = require('../models');

class UserCtrl {
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
      result.push(new User(res));
    });
    return result;
  }

  async getAll(req, res) {
    // FIXME Agregar manejo de errores
    let data = await User.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({message: 'No existen elementos que cumplan con la peticion'});
    }else{
      res.status(200).send({data});
    }
  }

  async get(req, res) {
    // FIXME Agregar manejo de errores
    let data = await User.get(req.params.userAlias);
    if (data.length === 0) {
      res.status(400).send({message: 'No se encontro el elemento'});
    }
    res.send({data});
  }

  async create(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new User({
                alias: req.body.alias,
                name: req.body.name,
                lastName: req.body.lastName,
                score:req.body.score,
                email:req.body.email,
                password:req.body.password,
                id_University:req.body.id_University,
                id_Country:req.body.id_Country})
                .save();
    // FIXME los mensajes de las respuestas del API deben ser en ingles
    // FIXME NO utilizar condicionales en una sola linea
    if(data===0) res.status(201).send({message: 'Guardado correctamente'});
    else if (data===1) res.status(400).send({message: 'No se pudo guardar correctamente'});
    else if (data===2) res.status(400).send({message: 'No existe el pais que se quiere asignar'});
    else if (data===3) res.status(400).send({message: 'No existe la universidad que se quiere asignar'});
  }

  async delete(req, res) {
    // FIXME Agregar manejo de errores
    let data = await new User({alias: req.params.userAlias}).delete();
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

module.exports = new UserCtrl();
