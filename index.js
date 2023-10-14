import chalk from 'chalk';
import { Wallet, ethers } from 'ethers';
import { appendFileSync } from 'fs';
import moment from 'moment';
import readlineSync from 'readline-sync';

function createAccountETH() {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const publicKey = wallet.publicKey;

  return { privateKey, publicKey };
}

(async () => {
  try {
    const totalWallet = readlineSync.question(
      chalk.yellow('Input how much the wallet you want: ')
    );

    let count = 1;

    if (totalWallet > 1) {
      count = totalWallet;
    }

    while (count > 0) {
      const createWalletResult = createAccountETH();
      const theWallet = new Wallet(createWalletResult.privateKey);

      if (theWallet) {
        appendFileSync(
          './result.txt',
          `Address: ${theWallet.address} | Private Key: ${createWalletResult.privateKey}\n`
        );
        console.log(
          chalk.green(
            `[${moment().format('HH:mm:ss')}] => ` + 'Wallet created...! Your address: ' + theWallet.address
          )
        );
      }

      count--;
    }
    // change the timer (3000) if you think this is too long, in miliseconds.
    setTimeout(() => {
      console.log(
        chalk.green(
          'All wallets have been created. Check result.txt to check your results.'
        )
      );
    }, 3000);
    return;
  } catch (error) {
    console.log(chalk.red('Your program was error! Message: ' + error));
  }
})();
