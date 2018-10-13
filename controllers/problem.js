const { Problem } = require('../models');

class ProblemCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.processResult = this.processResult.bind(this);
  }

  static processResult(data) {
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
      res.status(400).send({ message: 'There are no elements that match request' });
    } else {
      res.status(200).send({ data });
    }
  }

  static async get(req, res) {
    const data = await Problem.get(req.params.problemId);
    if (data.length === 0) {
      res.status(400).send({ message: 'Element not found' });
    }
    res.send({ data });
  }

  static async create(req, res) {
    const data = await new Problem({
      id: req.params.problemId,
      id_doc: req.body.id_doc,
      testTime: req.body.testTime,
      testMemory: req.body.testMemory,
      attempts: req.body.attempts,
      solved: req.body.solved,
      aliasUser: req.body.alias_User,
      idCategory: req.body.id_Category,
    })
      .save();
    if (data === 0) res.status(201).send({ message: 'Saved succesfully' });
    else if (data === 1) res.status(400).send({ message: 'Could not be saved' });
    else if (data === 2) res.status(400).send({ message: 'Alias does not exist' });
    else if (data === 3) res.status(400).send({ message: 'Category does not exist' });
  }

  static async delete(req, res) {
    const data = await new Problem({ id: req.params.problemId }).delete();
    if (data === 0) {
      res.status(200).send({ message: 'Deleted succesfully' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Could not be saved' });
    } else if (data === 2) {
      res.status(404).send({ error: 'There is no element to delete' });
    }
  }
}

module.exports = new ProblemCtrl();
