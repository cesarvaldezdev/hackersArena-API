const { Contest } = require('../models');

class ContestCtrl {
  constructor() {
    // Category data temporatily hardcoded
    this.data = [
      {
        id: 1,
        name: 'This is a contest',
        start: new Date(2018, 11, 24),
        end: new Date(2018, 11, 24),
        type: 'Sudden_death',
        penalty: [],
        frozenTime: 1,
        deadTime: 1,
        medal: [],
      },
      {
        id: 2,
        name: 'This is another contest',
        start: new Date(2019, 6, 12),
        end: new Date(2019, 6, 14),
        type: 'Friendly_match',
        penalty: [],
        frozenTime: 2,
        deadTime: 2,
        medal: [],
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

module.exports = new ContestCtrl();
