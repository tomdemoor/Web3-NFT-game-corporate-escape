const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Promoted Tom", "Late-for-subway Tom", "Fiat Slayer Tom"],       // Names
      ["ipfs://QmdRK38RocG5k818ZVHpEe9zwZGSdXKTtScGruqVPjmStP/business-monk-tom.png", // IPFS Test
      "https://tomdemoor.com/workfiles/nftgame/late-for-subway-tom.png", 
      "https://tomdemoor.com/workfiles/nftgame/business-monk-tom.png"],
      [100, 50, 300],                    // HP values
      [100, 250, 25],                       // Attack damage values
      "Quarterly Report", // Boss name
      "https://tomdemoor.com/workfiles/nftgame/bigboss.png", // Boss image
      10000, // Boss hp
      50 // Boss attack damage
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    txn = await gameContract.mintCharacterNFT(0);
    await txn.wait();
    console.log("Minted NFT #1");

    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    console.log("Minted NFT #2");

    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    console.log("Minted NFT #3");

    //attack boss twice
    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);

    console.log("Done!");
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();