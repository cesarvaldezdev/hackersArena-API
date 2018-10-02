const { Country } = require('../models');

class CountryCtrl {
  constructor() {
    // Category data temporatily hardcoded
    this.data = [
      {
        id: 1,
        name: 'This is a category',
        flagId: 1,
      },
      {
        id: 2,
        name: 'This is another category',
        flagId: 2,
      },
    ];

    // Binding this to not lose context on router
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create.bind(this);
    this.delete.bind(this);
  }

  async getAll(req, res) {
    let data = await Verdict.getAll();

    const json = {
      data: data,
      total_count: data.length,
      per_page: data.length,
      page: 0,
    };
    // In case category was not found
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

module.exports = new CountryCtrl();
