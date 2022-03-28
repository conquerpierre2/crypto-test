const crypto = require("crypto"); 
let SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block {
    constructor(timestamp = "", data = [] ) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
    }

    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }


    mine(difficulty) {
        while(!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();

            }
    }


}

class Blockchain {
     constructor() {
         this.chain = [new Block(Date.now().toString())];
         this.difficulty = 1;
         this.blockTime = 30000;
         this.transactions = [];
         this.reward = 297;
     }

     getLastBlock() {
         return this.chain[this.chain.length - 1];
     
        }

        addBlock(block) {
          block.prevHash = this.getLastBlock().hash;
          block.hash = block.getHash();
          block.mine(this.difficulty);
          this.chain.push(Object.freeze(block));
          this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
          
        }

        isValid(blockchain = this) {
            for(let i = 1; i < blockchain.chain.length; i++) {
                const currentBlock = blockchain.chain[i];
                const prevBlock = blockchain.chain(i - 1);

                if(currentBlock.hash != currentBlock.getHash() || prevBlock.hash != currentBlock.prevHash) {
                    return false;
                }
            }

            return true;
        }

        addTransaction(transaction) {
            this.transactions.push(transaction);
        }

        mineTransactions() {
            this.addBlock(new Block(Date.now().toString(), this.transactions));
            this.transactions = [];
        }

        mineTransactions(rewardAdress) {
            this.addBlock(new Block(Date.now().toString(),))
        }

     



}


class Transaction {
     constructor(from, to, amount) {
         this.from = from;
         this.to = to;
         this.amount = amount;
     }
}

module.exports = {Block, Blockchain};