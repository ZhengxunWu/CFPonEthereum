const assert=require('assert');
const ganache=require('ganache-cli');
const Web3=require('web3');
const web3=new Web3(ganache.provider());

const compiledFactory=require('../ethereum/build/Factory.json');
const compiledCampaign=require('../ethereum/build/FundRaising.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () =>{
    accounts=await web3.eth.getAccounts();
    factory=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({from: accounts[0], gas:'1000000'});

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });
    //take first elt of the array assign to camAddr
    [campaignAddress]=await factory.methods.getDeployedCampaigns().call();
    campaign=await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

