const clientDB = {
  clients: require("../data/clients.json"),
  setClients: function (data) {
    this.clients = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
    const { user, email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required." });
  
    const foundClient = clientDB.clients.find((person) => person.user === user);
   
  const match = await bcrypt.compare(password, foundClient.password);
  if (match) {
    // create JWTs
    res.json({ 'success': `user ${foundClient.user} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
