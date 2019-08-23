import React from 'react';
import {Container} from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

import { defineProperties } from 'ethereumjs-util';

export default () =>{
    return (
        <Container>
            <Head>
            <link
               rel="stylesheet"
               //link is not compelte!
               href="//cdnjs.cloudflare.com"
               />
            </Head>
            <Header />
            {props.children}
            <h1>footer</h1>
        </Container>
    )

}