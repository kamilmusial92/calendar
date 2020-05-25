import React from 'react';
import Sidebar from './Sidebar';
import StoryRouter from 'storybook-react-router';

export default {
    component: Sidebar,
    title: 'Organisms/Sidebar',
    decorators: [StoryRouter()]
    
  };


  export const Normal = () => (
    <Sidebar  />
  );