const {Block, Blockchain} = require('./MyChain.js');

const entryChain = new Blockchain();

entryChain.addBlock(new Block(Date.now().toString(), { from: "John", to: "Bob", amount: 100 }));

console.log(entryChain.chain);
