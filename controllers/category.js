const { Category } = require('../models');

class CategoryCtrl {
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
      result.push(new Category(res));
    });
    return result;
  }

  async getAll(req, res) {
    let data = await Category.getAll();
    data = this.processResult(data);
    if (data.length === 0) {
      res.status(400).send({message: 'Oops! No items satisfy the petition'});
    }else{
      res.status(200).send({data});
    }
  }

  async get(req, res) {
    let data = await Category.get(req.params.categoryId);
    if (data.length === 0) {
      res.status(400).send({message: 'Item not found'});
    }
    res.send({data});
  }

  async create(req, res) {
    let data = await new Category({
                id:req.params.categoryId,
                name:req.body.name,
              })
              .save();
    if(data===0) res.status(201).send({message: 'Item saved'});
    else if (data===1) res.status(400).send({message: 'Oops! Trouble saving'})

  }

  async delete(req, res) {
    let data = await new Category({id: req.params.categoryId}).delete();
    if(data === 0){
      res.status(200).send({ message: 'Item deleted' });
    } else if (data === 1) {
      res.status(400).send({ error: 'Oops! Trouble deleting' });
    } else if (data === 2) {
      res.status(404).send({ error: 'Item not found for deleting' });
    }
  }
}

module.exports = new CategoryCtrl();
