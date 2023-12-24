import chalk from 'chalk';
import { Wallet, ethers } from 'ethers';
import { appendFileSync } from 'fs';
import moment from 'moment';
import readlineSync from 'readline-sync';

// Function to create a new Ethereum account
function createAccountETH() {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const publicKey = wallet.publicKey;
  const mnemonicKey = wallet.mnemonic.phrase;

  return { privateKey, publicKey, mnemonicKey };
}

// Main function using async IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    // Get the total number of wallets to create from user input
    const totalWallet = readlineSync.question(
      chalk.yellow('Input how much the wallet you want: ')
    );

    let count = 1;

    // If the user entered a valid number greater than 1, set the count
    if (totalWallet > 1) {
      count = totalWallet;
    }

    // Create the specified number of wallets
    while (count > 0) {
      const createWalletResult = createAccountETH();
      const theWallet = new Wallet(createWalletResult.privateKey);

      if (theWallet) {
        // Append wallet details to result.txt
        appendFileSync(
          './result.txt',
          `Address: ${theWallet.address} | Private Key: ${createWalletResult.privateKey} | Mnemonic: ${createWalletResult.mnemonicKey}\n`
        );
        // Display success message with the wallet address and timestamp
        console.log(
          chalk.green(
            `[${moment().format('HH:mm:ss')}] => ` + 'Wallet created...! Your address: ' + theWallet.address
          )
        );
      }

      count--;
    }

    // Display final message after creating all wallets
    // Change the timer (3000) if you think this is too long, in milliseconds.
    setTimeout(() => {
      console.log(
        chalk.green(
          'All wallets have been created. Check result.txt to check your results (the address, mnemonic, and private key).'
        )
      );
    }, 3000);
    return;
  } catch (error) {
    // Display error message if an error occurs
    console.log(chalk.red('Your program encountered an error! Message: ' + error));
  }
})();
