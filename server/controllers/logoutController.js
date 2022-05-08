const clientDB = {
    clients: require("../data/clients.json"),
    setClients: function (data) {
      this.clients = data;
    },
  };
  
  const fs = require("fs").promises;
  const path = require("path");
  
  const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
  
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
  
    // Is refreshToken in db?
    const foundClient = clientDB.clients.find(person => person.refreshToken === refreshToken);
    if (!foundClient) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204);
    }

  // Delete refreshToken in db

  const otherClients = clientDB.clients.filter(
    (person) => person.refreshToken !== foundClient.refreshToken
  );
  const currentClient = { ...foundClient, refreshToken: '' };
  clientDB.setClients([...otherClients, currentClient]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "clients.json"),
    JSON.stringify(clientDB.clients)
  );
    res.clearCookie('jwt', {httpOnly: true}); //add secure: true in production to use https instead of http
    res.sendStatus(204);

  }

module.exports = { handleLogout };
