const { Country } = require('../models');

class CountryCtrl {
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
      result.push(new Country(res));
    });
    return result;
  }

  async getAll(req, res) {
    let data = await Country.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ message: 'No existen elementos que cumplan con la peticion ' });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res) {
    let data = await Country.get(req.params.countryId);
    if (data.length === 0) {
      res.status(400).send({message: 'No se encontro el elemento'});
    }
    res.send({data});
  }

  async create(req, res) {
    let data = await new Country({
                id:req.params.countryId,
                name:req.body.name,
                id_flag:req.body.id_flag
              })
              .save();
    if(data===0) res.status(201).send({message: 'Guardado correctamente'});
    else if (data===1) res.status(400).send({message: 'No se pudo guardar correctamente'})

  }

  async delete(req, res) {
    let data = await new Country({id: req.params.countryId}).delete();
    if(data === 0) {
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (data === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (data === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new CountryCtrl();
