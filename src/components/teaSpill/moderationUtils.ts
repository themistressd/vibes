import type { TeaSpillPost as TeaSpillPostType } from '../../data/socialData';

const reports: TeaSpillPostType[] = [];

export const submitReport = (post: TeaSpillPostType) => {
  reports.push(post);
  console.log('Report submitted:', post);
};
