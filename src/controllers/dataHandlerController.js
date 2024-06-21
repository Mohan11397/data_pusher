const { Account, Destination } = require("../models");
const axios = require("axios");

exports.handleIncomingData = async (req, res) => {
  const appSecretToken = req.headers["cl-x-token"];
  if (!appSecretToken) {
    return res.status(401).json({ error: "Un Authenticate" });
  }

  try {
    const account = await Account.findOne({ where: { appSecretToken } });
    if (!account) {
      return res.status(401).json({ error: "Un Authenticate" });
    }

    const destinations = await Destination.findAll({
      where: { accountId: account.id },
    });

    const data = req.body;
    const requests = destinations.map((destination) => {
      const config = {
        method: destination.httpMethod,
        url: destination.url,
        headers: destination.headers,
      };

      if (destination.httpMethod === "GET") {
        config.params = data;
      } else {
        config.data = data;
      }

      return axios(config);
    });

    const sentRequest = await Promise.all(requests);
    console.log("-----------------------------");

    console.log(sentRequest);
    console.log("-----------------------------");
    res.json({
      message: "Data sent to all destinations",
      destination_url: sentRequest[0]?.config?.url,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
