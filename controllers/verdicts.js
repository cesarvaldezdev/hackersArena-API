const { Verdict } = require('../models');

class VerdictCtrl {
  constructor() {
    // User data temporary hardcoded
    this.data = [
      {
        id: 1,
        type: 'This is a verdict',
      },
      {
        id: 2,
        type: 'This is another verdict',
      },
    ];

    // Binding this to not loose context on router
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
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
    let data = await Verdict.create(req.body);
    res.status(201).send(data);
  }

  delete(req, res) {
    const index = this.data.findIndex(el => el.id === Number(req.params.verdictId));
    this.data.splice(index, 1);
    res.send();
  }
}

module.exports = new VerdictCtrl();
