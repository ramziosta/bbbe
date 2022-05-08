 
const data = {
    clients: require('../data/clients.json'),
    setClients: function (data) { this.clients = data }
}

const getAllClients = (req, res) => {
    res.json(data.clients);
}

const createNewClient = (req, res) => {
    const newClient = {
        id: data.clients?.length ? data.clients[data.clients.length - 1].id + 1 : 1,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        accountType: req.body.accountType
    }

    if (!newClient.name || !newClient.email) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setClients([...data.clients, newClient]);
    res.status(201).json(data.clients);
}


//! needs editing email works but need to refactor from/to id
const updateClient = (req, res) => {
    const client = data.clients.find(Clnt => Clnt.email === req.body.email);
    if (!client) {
        return res.status(400).json({ "message": `Client email ${req.body.email} not found` });
    }
    if (req.body.name) client.name = req.body.name;
    if (req.body.email) client.email = req.body.email;
    const filteredArray = data.clients.filter(Clnt => Clnt.email !== (req.body.email));
    // const unsortedArray = [...filteredArray, client];
    // data.setClients(unsortedArray.sort((a, b) => a.email > b.email ? 1 : a.email < b.email ? -1 : 0));
    res.json(data.clients);
}

const deleteClient = (req, res) => {
    const client = data.clients.find(Clnt => Clnt.email === req.body.email);
    if (!client) {
        return res.status(400).json({ "message": `Client email ${req.body.email} not found` });
    }
    const filteredArray = data.clients.filter(Clnt => Clnt.email !== req.body.email);
    data.setClients([...filteredArray]);
    res.json(data.clients);
}

const getClient = (req, res) => {
    const client = data.clients.find(Clnt => Clnt.email === req.params.email);
    if (!client) {
        return res.status(400).json({ "message": `Client email ${req.params.email} not found` });
    }
    res.json(client);
}

module.exports = {
    getAllClients,
    createNewClient,
    updateClient,
    deleteClient,
    getClient
}