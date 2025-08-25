import type { VibeType } from '../styles/themes/types';

export interface TeaSpillPost {
  id: string;
  author: string;
  vibe: VibeType;
  content: string;
  timestamp: Date;
  likes: number;
  comments: TeaComment[];
  image?: string;
  isHot: boolean; // Featured/trending posts
}

export interface TeaComment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface Community {
  id: string;
  name: string;
  vibe: VibeType;
  description: string;
  memberCount: number;
  image: string;
  events: CommunityEvent[];
  isJoined: boolean;
}

export interface CommunityEvent {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  attendees: number;
  maxAttendees?: number;
  price?: number;
}

// Mock Tea Spill posts
export const mockTeaPosts: TeaSpillPost[] = [
  {
    id: 'tea_1',
    author: 'Flame Delicious',
    vibe: 'spicy',
    content: '🔥 TEA TIME: Just witnessed the most EPIC wig snatch at Club Inferno last night! The DRAMA, the ARTISTRY, the absolute CHAOS! Who else was there?? 👀',
    timestamp: new Date(Date.now() - 3600000),
    likes: 47,
    isHot: true,
    comments: [
      {
        id: 'comment_1',
        author: 'Scarlett Inferno',
        content: 'GIRL I SAW IT TOO! That death drop was EVERYTHING 💀',
        timestamp: new Date(Date.now() - 3300000),
        likes: 12,
      },
      {
        id: 'comment_2',
        author: 'Neon Nights',
        content: 'The whole club lost their MINDS! Best performance I\'ve seen all year 🙌',
        timestamp: new Date(Date.now() - 3200000),
        likes: 8,
      },
    ],
  },
  {
    id: 'tea_2',
    author: 'Diamond Dynasty',
    vibe: 'dluxe',
    content: '💎 Darlings, the rumors about the new luxury drag lounge are TRUE! Just got the exclusive invite... and let me tell you, the entrance fee alone could buy a small country 💅',
    timestamp: new Date(Date.now() - 7200000),
    likes: 23,
    isHot: true,
    comments: [
      {
        id: 'comment_3',
        author: 'Champagne Supernova',
        content: 'Already booked my table! See you there, gorgeous 🥂',
        timestamp: new Date(Date.now() - 7000000),
        likes: 5,
      },
    ],
  },
  {
    id: 'tea_3',
    author: 'Canvas Queen',
    vibe: 'artsy',
    content: '🎨 ARTISTS UNITE! Just heard that the underground gallery is hosting a drag performance art exhibition next month. Time to blur those lines between high art and high drag! 🌟',
    timestamp: new Date(Date.now() - 10800000),
    likes: 31,
    isHot: false,
    comments: [
      {
        id: 'comment_4',
        author: 'Frida Fierce',
        content: 'This is what I\'ve been WAITING for! Art and drag belong together ✨',
        timestamp: new Date(Date.now() - 10500000),
        likes: 9,
      },
      {
        id: 'comment_5',
        author: 'Avant Grande',
        content: 'Already working on my installation piece! 🎭',
        timestamp: new Date(Date.now() - 10200000),
        likes: 4,
      },
    ],
  },
  {
    id: 'tea_4',
    author: 'Sage Serenity',
    vibe: 'chill',
    content: '🧘‍♀️ Gentle reminder that self-care Sunday includes taking care of your wigs, your mental health, AND your haters. Namaste fabulous, darlings 💚',
    timestamp: new Date(Date.now() - 14400000),
    likes: 89,
    isHot: false,
    comments: [
      {
        id: 'comment_6',
        author: 'Lavender Haze',
        content: 'This is exactly the energy I needed today 🙏',
        timestamp: new Date(Date.now() - 14100000),
        likes: 15,
      },
      {
        id: 'comment_7',
        author: 'Ocean Dream',
        content: 'Wisdom AND sass? Perfect combination 💜',
        timestamp: new Date(Date.now() - 14000000),
        likes: 7,
      },
    ],
  },
  {
    id: 'tea_5',
    author: 'Metro Goddess',
    vibe: 'urban',
    content: '🚇 STREET KNOWLEDGE: The subway tunnels have better acoustics than most venues. Just saying... anyone else notice this? The underground scene is LITERALLY underground! 🎤',
    timestamp: new Date(Date.now() - 18000000),
    likes: 56,
    isHot: true,
    comments: [
      {
        id: 'comment_8',
        author: 'Brick House',
        content: 'Been performing in the tunnels for YEARS! Best kept secret 🤫',
        timestamp: new Date(Date.now() - 17800000),
        likes: 11,
      },
    ],
  },
  {
    id: 'tea_6',
    author: 'Phoenix Rising',
    vibe: 'spicy',
    content: '🔥 CONTROVERSIAL OPINION: Not every queen needs to do a death drop. Sometimes the most powerful move is standing perfectly still and serving FACE 💅',
    timestamp: new Date(Date.now() - 21600000),
    likes: 134,
    isHot: true,
    comments: [
      {
        id: 'comment_9',
        author: 'Sculpture Divine',
        content: 'PREACH! Art is about intention, not just acrobatics 🎭',
        timestamp: new Date(Date.now() - 21400000),
        likes: 19,
      },
      {
        id: 'comment_10',
        author: 'Velvet Royalty',
        content: 'Sometimes a royal wave is more powerful than a backflip 👑',
        timestamp: new Date(Date.now() - 21200000),
        likes: 23,
      },
      {
        id: 'comment_11',
        author: 'Alley Cat',
        content: 'But have you SEEN my signature move though? 😼',
        timestamp: new Date(Date.now() - 21000000),
        likes: 8,
      },
    ],
  },
];

// Mock Communities
export const mockCommunities: Community[] = [
  {
    id: 'comm_spicy',
    name: 'Fire Queens United',
    vibe: 'spicy',
    description: 'For the fierce, the bold, and the absolutely untameable 🔥 Bringing the heat since forever!',
    memberCount: 1247,
    image: '/api/placeholder/200/200',
    isJoined: true,
    events: [
      {
        id: 'event_1',
        name: 'Inferno Night: Battle of the Flames',
        description: 'The hottest competition this side of hell! Bring your A-game and your fire extinguisher.',
        date: new Date(Date.now() + 604800000), // Next week
        location: 'Club Inferno',
        attendees: 89,
        maxAttendees: 150,
        price: 25,
      },
      {
        id: 'event_2',
        name: 'Spice Market Meetup',
        description: 'Casual hangout for all things spicy! Food, drinks, and fiery conversations.',
        date: new Date(Date.now() + 259200000), // 3 days
        location: 'Chili\'s Paradise Rooftop',
        attendees: 34,
        maxAttendees: 50,
        price: 15,
      },
    ],
  },
  {
    id: 'comm_chill',
    name: 'Zen Garden Lounge',
    vibe: 'chill',
    description: 'A peaceful space for mindful queens and serene souls 🧘‍♀️ Finding balance in fabulousness',
    memberCount: 892,
    image: '/api/placeholder/200/200',
    isJoined: true,
    events: [
      {
        id: 'event_3',
        name: 'Moonlight Meditation & Drag',
        description: 'Experience the perfect balance of inner peace and outer glamour under the stars.',
        date: new Date(Date.now() + 432000000), // 5 days
        location: 'Serenity Gardens',
        attendees: 67,
        maxAttendees: 80,
        price: 20,
      },
    ],
  },
  {
    id: 'comm_urban',
    name: 'Street Queens Collective',
    vibe: 'urban',
    description: 'Where city meets fierce! For queens who keep it real and keep it street 🏙️',
    memberCount: 2103,
    image: '/api/placeholder/200/200',
    isJoined: false,
    events: [
      {
        id: 'event_4',
        name: 'Underground Cipher Night',
        description: 'The realest freestyle battle meets the fiercest drag performance. Bring your bars AND your beauty!',
        date: new Date(Date.now() + 518400000), // 6 days
        location: 'Metro Underground',
        attendees: 156,
        maxAttendees: 200,
        price: 30,
      },
    ],
  },
  {
    id: 'comm_artsy',
    name: 'The Creative Collective',
    vibe: 'artsy',
    description: 'Where art meets heart meets drag! For the creatively inclined and artistically devine 🎨',
    memberCount: 756,
    image: '/api/placeholder/200/200',
    isJoined: true,
    events: [
      {
        id: 'event_5',
        name: 'Drag & Draw: Live Art Performance',
        description: 'Watch artists create while queens perform - or better yet, do both at once!',
        date: new Date(Date.now() + 345600000), // 4 days
        location: 'The Canvas Loft',
        attendees: 43,
        maxAttendees: 60,
        price: 35,
      },
    ],
  },
  {
    id: 'comm_dluxe',
    name: 'Luxury League',
    vibe: 'dluxe',
    description: 'For queens who demand nothing but the finest things in life 💎 Exclusivity is our specialty',
    memberCount: 423,
    image: '/api/placeholder/200/200',
    isJoined: false,
    events: [
      {
        id: 'event_6',
        name: 'Diamond Gala: An Evening of Elegance',
        description: 'The most exclusive event of the season. Invitation only, darlings.',
        date: new Date(Date.now() + 777600000), // 9 days
        location: 'The Crystal Ballroom',
        attendees: 127,
        maxAttendees: 150,
        price: 200,
      },
    ],
  },
];