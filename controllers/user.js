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
    let data = await User.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({message: 'No items satisfy the petition'});
    }else{
      res.status(200).send({data});
    }
  }

  async get(req, res) {
    let data = await User.get(req.params.userAlias);
    if (data.length === 0) {
      res.status(400).send({message: 'Item not found'});
    }
    res.send({data});
  }

  async create(req, res) {
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
    if(data===0) res.status(201).send({message: 'Item saved'});
    else if (data===1) res.status(400).send({message: 'Oops! Trouble saving'});
    else if (data===2) res.status(400).send({message: 'Oops! Country not found'});
    else if (data===3) res.status(400).send({message: 'Oops! University not found'});
  }

  async delete(req, res) {
    let data = await new User({alias: req.params.userAlias}).delete();
    if(data === 0){
      res.status(200).send({ message: 'Item deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Oops! Trouble deleting' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Item not found' });
    }
  }
}

module.exports = new UserCtrl();
