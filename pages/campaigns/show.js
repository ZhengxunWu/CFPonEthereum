import React, {Component} from 'react';
import Layout from '../../components/Layout';
import {Card, Grid, Button} from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
//import { CardMeta, Card } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component {
    static 
        async getInitialProps(props) {
        const campaign =Campaign(props.query.address);

        const summary=await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            admin: summary[4],
            goal: summary[5],
            deadline: summary[6]
        };
    }


    renderCards() {
        const {
            balance,
            admin,
            minimumContribution,
            requestsCount,
            approversCount,
            goal,
            deadline
        } = this.props;

        const items=[
            {
                header: admin,
                meta: 'address of admin',
                description: 'the admin created this campaign and can',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'min contribution(wei)',
                description:''
            },
            {
                header: requestsCount,
                meta:'',
                description:''
            },
            { 
                header: approversCount,
                
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                mata: 'Campaign balance (ether)',
                description: 'how much money this campaign has'
            }
        ];

        return <Card.Group items={items} />;
    }  
    render() {
        return(
            <Layout>
             <h3>Campaign show</h3>;
             <Grid>
                 <Grid.Row>
                 <Grid.Column width={10}>
                     {this.renderCards()}
                    
                 </Grid.Column>
                 


                 <Grid.Column width={6}>
                     <ContributeForm address={this.props.address}/>
                 </Grid.Column>
                 </Grid.Row>

                 <Grid.Row>
                     <Grid.Column>
                  <Link route={`/campaigns/${this.props.address}/requests`}>
                         <a>
                             <Button primary>View Requests</Button>
                         </a>
                     </Link>
                     </Grid.Column>
                 </Grid.Row>

                
             </Grid>
            
             
             </Layout>
        );
    }
}

export default CampaignShow;