//delete build folder
//read source code from contrcts folder
//compile contracts with solidity compiler
//write output the build directory
const path=require('path')
const solc=require('solc')
//file system module
const fs=require('fs-extra')
const buildPath=path.resolve(__dirname,'build');
//safe remove whole build folder
fs.removeSync(buildPath);

const campaignPath=path.resolve(__dirname, 'contracts','Fundraising.sol');
const source=fs.readFileSync(campaignPath,'utf8');
const output=solc.compile(source, 1).contracts;

//recreate build folder
fs.ensureDirSync(buildPath);

for (let contract in output){
    fs.outputJSONSync(
         path.resolve(buildPath, contract.replace(":",'')+'.json'),
         output[contract]
    );
}

