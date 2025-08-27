import test from 'node:test';
import assert from 'node:assert/strict';
import { useAppStore } from '../src/stores/appStore.ts';

// Ensure swiping a profile advances to the next one
// and does not create a match for a pass action.
test('swipeProfile pass advances to next profile without match', () => {
  const profiles = [
    {
      id: '1',
      name: 'One',
      age: 20,
      vibe: 'spicy',
      bio: '',
      images: [],
      personality: { style: '', catchphrase: '', interests: [], signature_move: '' }
    },
    {
      id: '2',
      name: 'Two',
      age: 22,
      vibe: 'chill',
      bio: '',
      images: [],
      personality: { style: '', catchphrase: '', interests: [], signature_move: '' }
    }
  ];

  useAppStore.setState({ profiles, currentProfileIndex: 0, matches: [] });
  const { swipeProfile } = useAppStore.getState();
  swipeProfile({ type: 'pass', profileId: profiles[0].id, timestamp: new Date() });

  assert.equal(useAppStore.getState().currentProfileIndex, 1);
  assert.equal(useAppStore.getState().matches.length, 0);
});
