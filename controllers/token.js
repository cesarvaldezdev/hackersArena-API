const { Token } = require('../models');

class TokenCtrl {
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
      result.push(new Token(res));
    });
    return result;
  }

  async getAll(req, res) {
    let data = await Token.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({ message: 'No tokens to show' });
    } else {
      res.status(200).send({ data });
    }
  }

  async get(req, res) {
    let data = await Token.get(req.params.token);
    if (data.length === 0) {
      res.status(400).send({ message: 'Couldnt find token' });
    }
    res.send({ data });
  }

  async create(req, res) {
    let data = await new Token({
      token: req.params.token,
      createdAt: req.params.createdAt,
      expires: req.params.expires,
      type: req.params.type,
      status: req.params.status,
      aliasUser: req.params.aliasUser,
    }).save();
    if (data === 0) res.status(201).send({ message: 'Token saved!' });
    else if (data === 1) res.status(400).send({ message: 'Couldnt save token' });
    else if (data === 2) res.status(400).send({ message: 'The user doesnt exist' });
  }

  async delete(req, res) {
    let data = await new Token ({ token: req.params.token }).delete();
    if (data === 0) {
      res.status(200).send({ message: 'Deleted token!' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Couldnt delete token' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Token doesnt exists' });
    }
  }
}

module.exports = new TokenCtrl();
