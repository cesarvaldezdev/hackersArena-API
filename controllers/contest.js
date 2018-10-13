const { Contest } = require('../models');

class ContestCtrl {
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
      result.push(new Contest(res));
    });
    return result;
  }

  static async getAll(req, res) {
    let data = await Contest.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ message: 'The are no elements that match request' });
    } else {
      res.status(200).send({ data });
    }
  }

  static async get(req, res) {
    const data = await Contest.get(req.params.contestId);
    if (data.length === 0) {
      res.status(400).send({ message: 'Element not found' });
    }
    res.send({ data });
  }

  static async create(req, res) {
    const data = await new Contest({
      name: req.body.name,
      start: req.body.start,
      end: req.body.end,
      type: req.body.type,
      penalty: req.body.penalty,
      frozenTime: req.body.frozenTime,
      deadTime: req.body.deadTime,
      medal: req.body.medal,
    })
      .save();
    if (data === 0) res.status(201).send({ message: 'Saved succesfully' });
    else if (data === 1) res.status(400).send({ message: 'Could not be saved' });
  }

  static async delete(req, res) {
    const data = await new Contest({ alias: req.params.contestId }).delete();
    if (data === 0) {
      res.status(200).send({ message: 'Deleted succesfully' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Could not be deleted' });
    } else if (data === 2) {
      res.status(404).send({ error: 'There is no element to delete' });
    }
  }
}

module.exports = new ContestCtrl();
