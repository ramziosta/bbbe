const clientDB = {
  clients: require("../data/clients.json"),
  setClients: function (data) { this.clients = data; },
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

// const handleNewClient = async (req,res) => {
//     const { email, pwd } = req.body;
//     if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

//     // check for duplicate usernames in the db
//     const duplicate = await User.findOne({ email: email }).exec();
//     if (duplicate) return res.sendStatus(409); //Conflict 

//     try {
//         //encrypt the password
//         const hashedPwd = await bcrypt.hash(pwd, 10);

//         //create and store the new user
//         const result = await User.create({
//             "email": email,
//             "password": hashedPwd
//         });
//         console.log(result);
//         res.status(201).json({ 'success': `New user ${user} created!` });
//     } catch (err) {
//         res.status(500).json({ 'message': err.message });
//     }
// }

const handleNewClient = async (req,res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required.' });

    const duplicate = await clientDB.clients.find(person => person.email === user)
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newClient = {"email": email, "password": hashedPwd};
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'client.json'),
            JSON.stringify(clientDB.clients)
        );
        console.log(clientDB.clients);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports = { handleNewClient };




