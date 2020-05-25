import React from 'react';

import Heading from './Heading';


export default {
    component: Heading,
    title: 'Atoms/Heading',
  };

  export const Normal = () => (
    <Heading>Hello Roman</Heading>
  );

  export const big = () => (
    <Heading big>Hello Roman</Heading>
  );


