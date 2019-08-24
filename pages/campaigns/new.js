import React, {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component{
    state={
        minimumContribution: '',
        goal: '',
        deadline: '',
        errorMessage: '',
        loading: false
    };
    
    //submit the form to create the campaign
    onSubmit = async (event)=> {
        //prevent directly sent back to backend server
       event.preventDefault();
       this.setState({loading: true, errorMessage: '', deadline: '', goal: ''});
       try{
       const accounts=await web3.eth.getAccounts();
       await factory.methods
       .createCampaign(this.state.goal, this.state.deadline, this.state.minimumContribution)
       .send({
            from: accounts[0]
       });
       
       //set the router to main page after submit the form
       Router.pushRoute('/');
    } catch(err) {
        this.setState({errorMessage: err.message});
    }

    this.setState({loading: false});
    };

    render(){
        return (
            <Layout>
                <h3>new Campaign!</h3> //submit the form
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                        <label>goal</label>
                        <Input 
                        label="wei" 
                        labelPosition="right"
                        value={this.state.goal} 
                        onChange={event=>
                            this.setState({goal:event.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>deadline</label>
                        <Input 
                        label="day" 
                        labelPosition="right"
                        value={this.state.deadline} 
                        onChange={event=>
                            this.setState({deadline:event.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                        label="wei" 
                        labelPosition="right"
                        value={this.state.minimumContribution} 
                        onChange={event=>
                            this.setState({minimumContribution:event.target.value})}/>
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;