const { Verdict } = require('../models');

class VerdictCtrl {
  constructor() {
    // Binding this to not loose context on router
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    let data = await Verdict.getAll();
    const json = {
      data: data,
      total_count: data.length,
      per_page: data.length,
      page: 0,
    };
    // In case user was not found
    if (data.length === 0) {
      res.status(204);
    }
    res.send(json);
  }

  async get(req, res) {
    let data = await Verdict.get(req.params.verdictId);
    // In case user was not found
    if (data.length === 0) {
      res.status(404);
    }
    res.send(data);
  }

  async create(req, res, next) {
    try {
      //let data = await Verdict.create(req.body);
      let data = await new Verdict(req.body).save();
      res.status(201).send(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res){

  }

  async delete(req, res) {
    const index = this.data.findIndex(el => el.id === Number(req.params.verdictId));
    this.data.splice(index, 1);
    res.send();
  }
}

module.exports = new VerdictCtrl();
