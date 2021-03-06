import React from 'react';

import Button from './Button';
import { withKnobs, select } from '@storybook/addon-knobs';


export default {
  component: Button,
  title: 'Atoms/Button',
  decorators: [withKnobs]
};

export const Primary = () => {

    const label = 'Colors';
    const options = {
      Primary: 'hsl(49, 100%,58%)',
      Secondary: 'hsl(196, 83%, 75%)',
      Tertiary: 'hsl(106, 47%, 64%)',
    };
    const defaultValue = 'hsl(49, 100%,58%)';
    const groupId = 'GROUP-ID1';
    
    const value = select(label, options, defaultValue, groupId);
   return  <Button color={value}>Hello Button</Button>
}

export const Secondary = () => (
  <Button secondary>
  Hello
  </Button>
);