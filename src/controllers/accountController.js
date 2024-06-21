const { Account, Destination } = require('../models');

exports.createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (account) {
      res.json(account);
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (account) {
      await account.update(req.body);
      res.json(account);
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (account) {
      await account.destroy();
      res.json({ message: 'Account deleted' });
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAccountDestinations = async (req, res) => {
    try {
      const account = await Account.findByPk(req.params.id, { include: Destination });
      console.log("account",account)
      if (account) {
        res.json(account.Destinations);
      } else {
        res.status(404).json({ error: 'Account not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
