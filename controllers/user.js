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
      res.status(400).send({ message: 'There are no elements that match request' });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res) {
    const data = await User.get(req.params.userAlias);
    if (data.length === 0) {
      res.status(400).send({ message: 'Element not found' });
    }
    res.send({ data });
  }

  async create(req, res) {
    const data = await new User({
      alias: req.body.alias,
      name: req.body.name,
      lastName: req.body.lastName,
      score: req.body.score,
      email: req.body.email,
      password: req.body.password,
      idUniversity: req.body.idUniversity,
      idCountry: req.body.idCountry,
    })
      .save();
    if (data === 0) res.status(201).send({ message: 'Saved succesfully' });
    else if (data === 1) res.status(400).send({ message: 'Could not be saved' });
    else if (data === 2) res.status(400).send({ message: 'Country does not exist' });
    else if (data === 3) res.status(400).send({ message: 'University does not exist' });
  }

  async delete(req, res) {
    const data = await new User({ alias: req.params.userAlias }).delete();
    if (data === 0) {
      res.status(200).send({ message: 'Succesfully deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Could not be deleted' });
    } else if (data === 2) {
      res.status(404).send({ error: 'There is no element to delete' });
    }
  }
}

module.exports = new UserCtrl();
