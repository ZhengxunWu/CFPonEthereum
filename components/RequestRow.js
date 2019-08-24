import React, {Componen} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
    onApprove=async () =>{
        const campaign=Campaign(this.props.address);

        const accounts=await web3.eth.getAccounts();
        await campaign.methods.voteRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    onFinalize=async () => {
        const campaign=Campaign(this.props.address);

        const accounts=await web3.eth.getAccounts();
        await campaign.methods.makePayment(this.props.id).send({
            from:accounts[0]
        });
    };

    render() {
        const {Row, Cell} = Table;
        const {id, request, approversCount} =this.props;
        const readyToFinalize = request.noOfVoters > approversCount/2;

        return (
            <Row disabled={request.completed} positive={readyToFinalize&&!request.completed}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.noOfVoters}/{approversCount}</Cell>
                <Cell>
                    {request.completed ? null : (
                    <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                     ) }
                </Cell>
                    
                <Cell>
                    {request.completed ? null : (
                    <Button color='teal' basic> onClick={this.oneFinalzied}>Finalize</Button>
                    )}
                </Cell>

            </Row>
        );
    }
}

export default RequestRow;