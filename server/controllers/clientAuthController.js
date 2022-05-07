const clientDB = {
  clients: require("../data/clients.json"),
  setClients: function (data) {
    this.clients = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundClient = clientDB.clients.find((person) => person.email === email);
  if (!foundClient) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundClient.password);
  if (match) {
    // create JWTs
    res.json({ success: `User ${foundClient.user} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
