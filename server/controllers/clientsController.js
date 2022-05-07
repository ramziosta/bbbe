 
const data = {
    clients: require('../data/clients.json'),
    setClients: function (data) { this.clients = data }
}

const getAllClients = (req, res) => {
    res.json(data.clients);
}

const createNewClient = (req, res) => {
    const newClient = {
        email: data.clients?.length ? data.clients[data.clients.length - 1].email + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newClient.firstname || !newClient.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setClients([...data.clients, newclient]);
    res.status(201).json(data.clients);
}

const updateClient = (req, res) => {
    const client = data.clients.find(Clnt => Clnt.email === parseInt(req.body.email));
    if (!client) {
        return res.status(400).json({ "message": `Client email ${req.body.email} not found` });
    }
    if (req.body.firstname) client.firstname = req.body.firstname;
    if (req.body.lastname) client.lastname = req.body.lastname;
    const filteredArray = data.clients.filter(Clnt => Clnt.email !== parseInt(req.body.email));
    const unsortedArray = [...filteredArray, client];
    data.setClients(unsortedArray.sort((a, b) => a.email > b.email ? 1 : a.email < b.email ? -1 : 0));
    res.json(data.clients);
}

const deleteClient = (req, res) => {
    const client = data.clients.find(Clnt => Clnt.email === parseInt(req.body.email));
    if (!client) {
        return res.status(400).json({ "message": `Client email ${req.body.email} not found` });
    }
    const filteredArray = data.clients.filter(Clnt => Clnt.email !== parseInt(req.body.email));
    data.setClients([...filteredArray]);
    res.json(data.clients);
}

const getClient = (req, res) => {
    const client = data.clients.find(Clnt => Clnt.email === parseInt(req.params.email));
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