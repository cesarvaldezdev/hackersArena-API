const { University } = require('../models');

class UniversityCtrl {
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
      result.push(new University(res));
    });
    return result;
  }

  async getAll(req, res) {
    let data = await University.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({message: 'No items satisfy the petition'});
    }else{
      res.status(200).send({data});
    }
  }

  async get(req, res) {
    let data = await University.get(req.params.universityId);
    if (data.length === 0) {
      res.status(400).send({message: 'Item not found'});
    }
    res.send({data});
  }

  async create(req, res) {
    let data = await new University({
                id:req.params.universityId,
                name:req.body.name,
                id_logo:req.body.id_logo,
                id_Country:req.body.id_Country
              })
              .save();
    if(data===0) res.status(201).send({message: 'Item saved'});
    else if (data===1) res.status(400).send({message: 'Oops! Trouble saving'})
    else if (data===2) res.status(400).send({message: 'Oops! Country not found'})

  }

  async delete(req, res) {
    let data = await new University({id: req.params.universityId}).delete();
    if(data === 0){
      res.status(200).send({ message: 'Item deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Oops! Trouble deleting' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Item not found' });
    }
  }
}

module.exports = new UniversityCtrl();
