const { Problem } = require('../models');

class ProblemCtrl {
  constructor() {
    // User data temporary hardcoded
    this.data = [
      {
        id: 1,
        title: ,
        difficulty: ,
        author: ,
        score: ,
        testTime: ,
        memory: ,
        description: ,
        input: ,
        output: ,
      },
      {
        id: 2,
        name: 'juan2',
        email: 'juan2@correo',
        title: ,
        difficulty: ,
        author: ,
        score: ,
        testTime: ,
        memory: ,
        description: ,
        input: ,
        output: ,
      },
    ];

    // Binding this to not loose context on router
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    let data = await User.getAll();

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
    let data = await User.get(req.params.userId);

    // In case user was not found
    if (data.length === 0) {
      res.status(404);
    }

    res.send(data);
  }

  async create(req, res, next) {
    let data = await User.create(req.body);
    res.status(201).send(data);
  }

  delete(req, res) {
    const index = this.data.findIndex(el => el.id === Number(req.params.userId));
    this.data.splice(index, 1);
    res.send();
  }
}

module.exports = new ProblemCtrl();
