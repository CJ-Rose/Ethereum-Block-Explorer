const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_URL);

app.use(cors());
app.use(express.json());

app.get('/balance/:address', async (req, res) => {
    const { address } = req.params;
    const balance = await provider.getBalance(address);
    console.log('Balance is: ' + balance);
    res.send({ balance });
});

app.get('/block/', async (req, res) => {
    const latestBlock = await provider.getBlock('latest');
    console.log('latest block: ' + latestBlock);
    res.send({ latestBlock });
});

app.get('/blockByHash/:hash', async (req, res) => {
    const { hash } = req.params;
    const block = await provider.getBlock(hash);
    console.log('block: ' + block);
    res.send({ block });
});

app.listen(port, () => {
    console.log(`\nListening on port ${port}!`);
});