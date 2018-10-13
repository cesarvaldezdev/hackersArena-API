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
      res.status(400).send({message: 'No items satisfy the petition'});
    }else{
      res.status(200).send({data});
    }
  }

  async get(req, res) {
    let data = await Problem.get(req.params.problemId);
    if (data.length === 0) {
      res.status(400).send({message: 'Item not found'});
    }
    res.send({data});
  }

  async create(req, res) {
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
    if(data===0) res.status(201).send({message: 'Item saved'});
    else if (data===1) res.status(400).send({message: 'Oops! Trouble saving'});
    else if (data===2) res.status(400).send({message: 'Oops! Alias not found'});
    else if (data===3) res.status(400).send({message: 'Oops! Category not found'});
  }

  async delete(req, res) {
    let data = await new Problem({id: req.params.problemId}).delete();
    if(data === 0){
      res.status(200).send({ message: 'Item deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Oops! Trouble deleting' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Item not found' });
    }
  }
}

module.exports = new ProblemCtrl();
