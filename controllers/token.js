const bcrypt = require('bcrypt');
const { Token } = require('../models');

// FIXME esta clase y sus metodos deben estar documentados

class TokenCtrl {
  constructor() {
    // this.getAll = this.getAll.bind(this);
    // this.get = this.get.bind(this);
    // this.create = this.create.bind(this);
    // this.delete = this.delete.bind(this);
    // this.processResult = this.processResult.bind(this);
    this.processResult = (data) => {
      const result = [];
      data.forEach((res) => {
        result.push(new Token(res));
      });
      return result;
    };

    this.getAll = async (req, res) => {
      let data = await Token.getAll();
      data = this.processResult(data);
      if (data.length === 0) {
        res.status(400).send({ message: 'No tokens to show' });
      } else {
        res.status(200).send({ data });
      }
    };

    this.get = async (req, res) => {
      const data = await Token.get(req.params.token);
      if (data.length === 0) {
        res.status(400).send({ message: 'Couldnt find token' });
      }
      res.send({ data });
    };

    this.create = async (req, res, tokenType) => {
      const myToken = bcrypt.hashSync(`${req.params.aliasUser}${new Date()}`, saltRounds);
      var dateNow = new Date();
      var dateThen = new Date();
      dateThen.setHours(dateThen.getHours() + 12); //12 HRS (4 - 23 only)
      const data = await new Token({
        token: myToken,
        createdAt: dateNow,
        expires: dateThen,
        type: tokenType,
        status: 1,
        aliasUser: req.params.aliasUser,
      }).save();
      if (data === 0) res.status(201).send({ message: 'Token saved!' });
      else if (data === 1) res.status(400).send({ message: 'Couldnt save token' });
      else if (data === 2) res.status(400).send({ message: 'The user doesnt exist' });
    };

    this.delete = async (req, res) => {
      const data = await new Token({ token: req.params.token }).delete();
      if (data === 0) {
        res.status(200).send({ message: 'Deleted token!' });
      } else if (data === 1) {
        res.status(400).send({ error: 'Couldnt delete token' });
      } else if (data === 2) {
        res.status(404).send({ error: 'Token doesnt exists' });
      }
    };
  }
}

module.exports = new TokenCtrl();
