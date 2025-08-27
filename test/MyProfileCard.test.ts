import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import MyProfileCard from '../src/components/profile/MyProfileCard.tsx';
import { ThemeProvider } from '../src/styles/themes/ThemeProvider.tsx';

test('MyProfileCard renders user data', () => {
  const currentUser = {
    id: '1',
    name: 'Tester',
    age: 21,
    vibes: ['spicy', 'chill'],
    bio: 'Hello world',
    images: ['/api/placeholder/400/600'],
    distance: 5,
  };

  const element = React.createElement(
    ThemeProvider,
    null,
    React.createElement(MyProfileCard, { currentUser })
  );

  const html = renderToString(element);
  assert.ok(html.includes('Tester'));
  assert.ok(html.includes('spicy'));
});
