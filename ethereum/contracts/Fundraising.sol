pragma solidity >=0.4.22 <0.6.0;

contract Factory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint goal, uint deadline, uint minimumContribution) public{
       address newCampaign= new FundRaising(goal, deadline, minimumContribution, msg.sender);
       deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaign() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract FundRaising{
    mapping(address => uint) public contributers;
    address public admin;
    uint public goal;
    uint public minimumContribution;
    uint public noOfContributer;
    uint public deadline;
    uint public raisedMoney=0;
    struct Request{
        string description;
        address recepient;
        uint value;
        bool completed;
        uint noOfVoters;
        mapping(address=>bool) voters; 
    }
    Request[] public requests;
    
    constructor (uint _goal, uint _deadline, uint _minimumContribution, address creator) public{
        admin=creator;
        goal=_goal;
        deadline=now+_deadline*1 days;
        admin=msg.sender;
        minimumContribution=_minimumContribution;
        
    }
    modifier adminOnly(){
        require(msg.sender==admin);
        _;
    }
    
    function contribute() public payable{
        require(now<deadline);
        require(msg.value>=minimumContribution);
       
        if(contributers[msg.sender]==0){
            noOfContributer++;
        }
        raisedMoney+=msg.value;
        contributers[msg.sender]+=msg.value;
    } 
     
    function getBalance() public view returns(uint){
       return address(this).balance;
    }
    
    function getRefund() public {
        require(now>deadline);
        require(contributers[msg.sender]>0);
        require(raisedMoney<goal);
        
        msg.sender.transfer(contributers[msg.sender]);
        contributers[msg.sender]=0;
    }
    
    function createRequest(string _description, address _recepient, uint _value) public adminOnly {
        Request memory newRequest= Request({
            description : _description,
            recepient : _recepient,
            value : _value,
            completed : false,
            noOfVoters:0
        });
        
        requests.push(newRequest);
    }
    
    function voteRequest(uint index) public{
        Request storage thisRequest=requests[index];
        require(contributers[msg.sender]>0);
        require(thisRequest.voters[msg.sender]==false);
        thisRequest.voters[msg.sender]=true;
        thisRequest.noOfVoters++;
    }
    
    function makePayment(uint index) public adminOnly{
        Request storage thisRequest=requests[index];
        require(thisRequest.completed==false);
        require(thisRequest.noOfVoters>noOfContributer/2);
        thisRequest.recepient.transfer(thisRequest.value);
        thisRequest.completed=true;
    }

    function getSummary() public view retruns(
        uint,uint,uint,uint,address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            voters,
            admin,
            goal,
            deadline
        );
    }

    function getRequestCount() public view retruns(uint){
        return requests.length;
    }
    
    
}

