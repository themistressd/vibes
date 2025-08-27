import test from 'node:test';
import assert from 'node:assert/strict';
import { useAppStore } from '../src/stores/appStore.ts';

test('addLikeGiven increments count', () => {
  const empty = { spicy: 0, chill: 0, urban: 0, artsy: 0, dluxe: 0 };
  useAppStore.setState({ likesGivenByVibe: { ...empty }, likesReceivedByVibe: { ...empty } });
  const { addLikeGiven } = useAppStore.getState();
  addLikeGiven('spicy');
  assert.equal(useAppStore.getState().likesGivenByVibe.spicy, 1);
});

test('receiveLike increments count', () => {
  const empty = { spicy: 0, chill: 0, urban: 0, artsy: 0, dluxe: 0 };
  useAppStore.setState({ likesReceivedByVibe: { ...empty } });
  const { receiveLike } = useAppStore.getState();
  receiveLike('chill');
  assert.equal(useAppStore.getState().likesReceivedByVibe.chill, 1);
});

test('match flow always adds given and received like and creates a match', () => {
  const empty = { spicy: 0, chill: 0, urban: 0, artsy: 0, dluxe: 0 };
  useAppStore.setState({
    profiles: [{
      id: '1',
      name: 'Test',
      age: 20,
      vibe: 'urban',
      bio: '',
      images: [],
      personality: { style: '', catchphrase: '', interests: [], signature_move: '' }
    }],
    currentProfileIndex: 0,
    matches: [],
    likesGivenByVibe: { ...empty },
    likesReceivedByVibe: { ...empty }
  });

  const { addLikeGiven, receiveLike, swipeProfile } = useAppStore.getState();
  const profile = useAppStore.getState().profiles[0];
  addLikeGiven(profile.vibe);
  receiveLike(profile.vibe);
  swipeProfile({ type: 'like', profileId: profile.id, timestamp: new Date() });

  assert.equal(useAppStore.getState().likesGivenByVibe.urban, 1);
  assert.equal(useAppStore.getState().likesReceivedByVibe.urban, 1);
  assert.equal(useAppStore.getState().matches.length, 1);
});
