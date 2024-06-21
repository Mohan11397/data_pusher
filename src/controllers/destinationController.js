const { Destination, Account } = require('../models');

exports.createDestination = async (req, res) => {
  try {
    const account = await Account.findByPk(req.body.accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const destination = await Destination.create(req.body);
    res.json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (destination) {
      res.json(destination);
    } else {
      res.status(404).json({ error: 'Destination not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (destination) {
      await destination.update(req.body);
      res.json(destination);
    } else {
      res.status(404).json({ error: 'Destination not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (destination) {
      await destination.destroy();
      res.json({ message: 'Destination deleted' });
    } else {
      res.status(404).json({ error: 'Destination not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
