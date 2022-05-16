//  run: npx parcel index.html  in client folder

import "./index.scss";
import axios from 'axios';
const ethers = require('ethers');

const server = "http://localhost:3042";

document.getElementById("public-address").addEventListener('input', async ({ target: { value } }) => {
    if (value === "") {
        document.getElementById("balance").innerHTML = 0;
        return;
    }
    const response = await axios.get(`${server}/balance/${value}`);
    let balance = ethers.utils.formatEther(response.data.balance.hex);
    balance = Math.round(balance * 10000) / 10000 + " ETH";
    document.getElementById("balance").innerHTML = balance;
});

document.getElementById("latest-block").addEventListener('click', async () => {
    const response = await axios.get(`${server}/block/`);
    const latestBlock = response.data.latestBlock;

    let html = "";
    html += "<p> block number: " + latestBlock.number + "</p>"
        + "<p> block hash: " + latestBlock.hash + "</p>"
        + "<p> block miner: " + latestBlock.miner + "</p>";

    document.getElementById("block-information").innerHTML = html;

});

document.getElementById("this-block").addEventListener('click', async () => {
    const hash = document.getElementById("block-hash").value;
    const response = await axios.get(`${server}/blockByHash/${hash}`);
    const block = response.data.block;

    let html = "";
    html += "<p> block number: " + block.number + "</p>"
        + "<p> block hash: " + block.hash + "</p>"
        + "<p> block miner: " + block.miner + "</p>";

    document.getElementById("block-information").innerHTML = html;

});