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
    let data = await Solution.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({message: 'No items satisfy the petition'});
    }else{
      res.status(200).send({data});
    }
  }

  async get(req, res) {
    let data = await Solution.get(req.params.solutionId);
    if (data.length === 0) {
      res.status(400).send({message: 'Item not found'});
    }
    res.send({data});
  }

  async create(req, res) {
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
    if(data===0) res.status(201).send({message: 'Item saved'});
    else if (data===1) res.status(400).send({message: 'Oops! Trouble saving'});
    else if (data===2) res.status(400).send({message: 'Oops! Problem not found'});
    else if (data===3) res.status(400).send({message: 'Oops! Language not found'});
    else if (data===4) res.status(400).send({message: 'Oops! Usuario not found'});
    else if (data===5) res.status(400).send({message: 'Oops! Veredict not found'});
  }

  async delete(req, res) {
    let data = await new Solution({id: req.params.solutionId}).delete();
    if(data === 0){
      res.status(200).send({ message: 'Item deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Oops! Trouble deleting' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Item not found' });
    }
  }
}

module.exports = new SolutionCtrl();
