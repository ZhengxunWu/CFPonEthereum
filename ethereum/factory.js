import web3 from './web3';
import Factory from './build/Factory.json';

const instance=new web3.eth.Contract(
    JSON.parse(Factory.interface),
    '0x0E2b5Eb57fBb47E52F4B4da0B39a4e495A5091B2'
);

export default instance;