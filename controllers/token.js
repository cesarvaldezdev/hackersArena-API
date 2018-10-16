const { Token } = require('../models');

class TokenCtrl {
  constructor() {
    //this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    //this.processResult = this.processResult.bind(this);
  }

  // processResult(data) {
  //   const result = [];
  //   data.forEach((res) => {
  //     result.push(new Token(res));
  //   });
  //   return result;
  // }
  //
  // async getAll(req, res) {
  //   let data = await Token.getAll();
  //   data = this.processResult(data);
  //   if (data.length === 0) {
  //     res.status(400).send({message: 'No existen elementos que cumplan con la peticion'});
  //   }else{
  //     res.status(200).send({data});
  //   }
  // }

  async get(req, res) {
    let data = await Token.get(req.params.tokenToken);
    if (data.length === 0) {
      res.status(400).send({message: 'No se encontro el elemento'});
    }
    res.send({data});
  }

  async create(req, res) {
    let data = await new Token({
                //id:req.params.universityId,
                token:req.body.token,
                type:req.body.token,
                status:req.body.status,
                aliasUser:req.body.aliasUser,
              })
              .save();
    if(data===0) res.status(201).send({message: 'Guardado correctamente'});
    else if (data===1) res.status(400).send({message: 'No se pudo guardar correctamente'})
    else if (data===2) res.status(400).send({message: 'No existe el pais que se quiere asignar'})
  }

  async delete(req, res) {
    let data = await new Token({id: req.params.tokenToken}).delete();
    if(data === 0){
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else if (data === 1) {
      res.status(400).send({ error: 'No se pudo eliminar' });
    } else if (data === 2) {
      res.status(404).send({ error: 'No existe el elemento a eliminar' });
    }
  }
}

module.exports = new UniversityCtrl();
