import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import axios from 'axios'
export const stationService = {
  query,
  save,
  remove,
  getById,
  getEmptyStation,
  searchQuery,
  getSongById,
  getCurrIndex,
  getVideos,
  getRandomSong,
  getPrevSong,
  getNextSong,
  createNewStation,
  userQuery,
  addSongToStation,
  stationNameClass,
  updateStation,
  // editStation,
  getRecommendedSongs,
  removeSongFromStation,
  filterUserStations,
  setVideoIdCache,
  getVideoIdCache,
  //   tryStation,
}
// const gDefaultStations = [
//   {
//     _id: '1',
//     name: 'Sing in the Shower',
//     tags: ['Mood'],
//     imgUrl: 'https://i.scdn.co/image/ab67706f00000003329e2c5d3104f8c6a1d16a34',
//     createdBy: {
//       _id: 'u101',
//       fullname: 'system',
//       imgUrl: 'http://some-photo/',
//     },
//     likedByUsers: ['{minimal-user}', '{minimal-user}'],
//     description:
//       'Make your shower more uplifting by singing along to these hits.',
//     songs: [
//       {
//         _id: '100',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'As It Was',
//         artist: 'Harry Styles',
//         album: 'As It Was',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14',
//         likedByUsers: [],
//       },
//       {
//         _id: '101',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Blinding Lights',
//         artist: 'The Weeknd',
//         album: 'After Hours',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
//         likedByUsers: [],
//       },
//       {
//         _id: '102',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Someone You Loved',
//         artist: 'Lewis Capaldi',
//         album: 'Divinely Uninspired To A Hellish Extent',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2',
//         likedByUsers: [],
//       },
//       {
//         _id: '103',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'One Kiss (with Dua Lipa)',
//         artist: 'Calvin Harris',
//         album: 'One Kiss (with Dua Lipa)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273d09f96d82310d4d77c14c108',
//         likedByUsers: [],
//       },
//       {
//         _id: '104',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Shivers',
//         artist: 'Ed Sheeran',
//         album: '=',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ef24c3fdbf856340d55cfeb2',
//         likedByUsers: [],
//       },
//       {
//         _id: '105',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Locked out of Heaven',
//         artist: 'Bruno Mars',
//         album: 'Unorthodox Jukebox',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46',
//         likedByUsers: [],
//       },
//       {
//         _id: '106',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Love On The Brain',
//         artist: 'Rihanna',
//         album: 'ANTI (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27333c6b920eabcf4c00d7a1093',
//         likedByUsers: [],
//       },
//       {
//         _id: '107',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: "Say You Won't Let Go",
//         artist: 'James Arthur',
//         album: 'Back from the Edge',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27320beb61f61fcbeb33b10a9ab',
//         likedByUsers: [],
//       },
//       {
//         _id: '108',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Watermelon Sugar',
//         artist: 'Harry Styles',
//         album: 'Fine Line',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a',
//         likedByUsers: [],
//       },
//       {
//         _id: '109',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: "There's Nothing Holdin' Me Back",
//         artist: 'Shawn Mendes',
//         album: 'Illuminate (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ea3ef7697cfd5705b8f47521',
//         likedByUsers: [],
//       },
//       {
//         _id: '110',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Viva La Vida',
//         artist: 'Coldplay',
//         album: 'Viva La Vida or Death and All His Friends',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e21cc1db05580b6f2d2a3b6e',
//         likedByUsers: [],
//       },
//       {
//         _id: '111',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Bad Habits',
//         artist: 'Ed Sheeran',
//         album: '=',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ef24c3fdbf856340d55cfeb2',
//         likedByUsers: [],
//       },
//       {
//         _id: '112',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Wake Me Up',
//         artist: 'Avicii',
//         album: 'True',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e14f11f796cef9f9a82691a7',
//         likedByUsers: [],
//       },
//       {
//         _id: '113',
//         addedAt: '2023-03-02T09:50:57Z',
//         title: 'Every Breath You Take',
//         artist: 'The Police',
//         album: 'Synchronicity (Remastered 2003)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273c8e97cafeb2acb85b21a777e',
//         likedByUsers: [],
//       },
//       {
//         _id: '114',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Take on Me',
//         artist: 'a-ha',
//         album: 'Hunting High and Low',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e8dd4db47e7177c63b0b7d53',
//         likedByUsers: [],
//       },
//       {
//         _id: '115',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Cold Heart - PNAU Remix',
//         artist: 'Elton John',
//         album: 'Cold Heart (PNAU Remix)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739f5cce8304c42d3a5463fd23',
//         likedByUsers: [],
//       },
//       {
//         _id: '116',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Thunder',
//         artist: 'Imagine Dragons',
//         album: 'Evolve',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735675e83f707f1d7271e5cf8a',
//         likedByUsers: [],
//       },
//       {
//         _id: '117',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'All of Me',
//         artist: 'John Legend',
//         album: 'Love In The Future (Expanded Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27394c9217a398f5174757c0c78',
//         likedByUsers: [],
//       },
//       {
//         _id: '118',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Umbrella',
//         artist: 'Rihanna',
//         album: 'Good Girl Gone Bad: Reloaded',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f9f27162ab1ed45b8d7a7e98',
//         likedByUsers: [],
//       },
//       {
//         _id: '119',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Adore You',
//         artist: 'Harry Styles',
//         album: 'Fine Line',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a',
//         likedByUsers: [],
//       },
//       {
//         _id: '120',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'The Meters - Cissy Strut',
//         artist: 'Harry Styles',
//         album: 'Starboy',
//         imgUrl:
//           'https://www.adobe.com/express/learn/blog/media_16b8661af5a86e0a9ffe834e6a74a5ae2c8217696.png?width=750&format=png&optimize=medium',
//         likedByUsers: [],
//       },
//       {
//         _id: '121',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Photograph',
//         artist: 'Ed Sheeran',
//         album: 'x (Deluxe Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27313b3e37318a0c247b550bccd',
//         likedByUsers: [],
//       },
//       {
//         _id: '122',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Treat You Better',
//         artist: 'Shawn Mendes',
//         album: 'Illuminate',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731376b4b16f4bfcba02dc571b',
//         likedByUsers: [],
//       },
//       {
//         _id: '123',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Something Just Like This',
//         artist: 'The Chainsmokers',
//         album: 'Memories...Do Not Open',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2730c13d3d5a503c84fcc60ae94',
//         likedByUsers: [],
//       },
//       {
//         _id: '124',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: "Livin' On A Prayer",
//         artist: 'Bon Jovi',
//         album: 'Slippery When Wet',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731336b31b6a1799f0de5807ac',
//         likedByUsers: [],
//       },
//       {
//         _id: '125',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Shallow',
//         artist: 'Lady Gaga',
//         album: 'A Star Is Born Soundtrack',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e2d156fdc691f57900134342',
//         likedByUsers: [],
//       },
//       {
//         _id: '126',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Love Yourself',
//         artist: 'Justin Bieber',
//         album: 'Purpose (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de',
//         likedByUsers: [],
//       },
//       {
//         _id: '127',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Maps',
//         artist: 'Maroon 5',
//         album: 'V',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273442b53773d50e1b5369bb16c',
//         likedByUsers: [],
//       },
//       {
//         _id: '128',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Before You Go',
//         artist: 'Lewis Capaldi',
//         album: 'Divinely Uninspired To A Hellish Extent (Extended Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2737b9639babbe96e25071ec1d4',
//         likedByUsers: [],
//       },
//       {
//         _id: '129',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'A Sky Full of Stars',
//         artist: 'Coldplay',
//         album: 'Ghost Stories',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f864bcdcc245f06831d17ae0',
//         likedByUsers: [],
//       },
//       {
//         _id: '130',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Stay With Me',
//         artist: 'Sam Smith',
//         album: 'In The Lonely Hour',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273b11bdc91cb9ac6b14f5c1dae',
//         likedByUsers: [],
//       },
//       {
//         _id: '131',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'The Motto',
//         artist: 'Tiësto',
//         album: 'The Motto',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2736b64f7a7e0e7af3d604ab41e',
//         likedByUsers: [],
//       },
//       {
//         _id: '132',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Iris',
//         artist: 'The Goo Goo Dolls',
//         album: 'Dizzy up the Girl',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273eda9478c39a21e1cdc6609ca',
//         likedByUsers: [],
//       },
//       {
//         _id: '133',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Closer',
//         artist: 'The Chainsmokers',
//         album: 'Closer',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273495ce6da9aeb159e94eaa453',
//         likedByUsers: [],
//       },
//       {
//         _id: '134',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Levitating (feat. DaBaby)',
//         artist: 'Dua Lipa',
//         album: 'Future Nostalgia',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273d4daf28d55fe4197ede848be',
//         likedByUsers: [],
//       },
//       {
//         _id: '135',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'abcdefu',
//         artist: 'GAYLE',
//         album: 'abcdefu',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732842f743ebd32235bceb43d3',
//         likedByUsers: [],
//       },
//       {
//         _id: '136',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Falling',
//         artist: 'Harry Styles',
//         album: 'Fine Line',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a',
//         likedByUsers: [],
//       },
//       {
//         _id: '137',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Africa',
//         artist: 'TOTO',
//         album: 'Toto IV',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2734a052b99c042dc15f933145b',
//         likedByUsers: [],
//       },
//       {
//         _id: '138',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Too Good At Goodbyes',
//         artist: 'Sam Smith',
//         album: 'The Thrill Of It All (Special Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273005cd7d0ae87b081601f6cca',
//         likedByUsers: [],
//       },
//       {
//         _id: '139',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Thinking out Loud',
//         artist: 'Ed Sheeran',
//         album: 'x (Deluxe Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27313b3e37318a0c247b550bccd',
//         likedByUsers: [],
//       },
//       {
//         _id: '140',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'This Is What You Came For',
//         artist: 'Calvin Harris',
//         album: 'This Is What You Came For',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273d9aa52355e062f5de060adbf',
//         likedByUsers: [],
//       },
//       {
//         _id: '141',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Shut Up and Dance',
//         artist: 'WALK THE MOON',
//         album: 'TALKING IS HARD',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27343294cfa2688055c9d821bf3',
//         likedByUsers: [],
//       },
//       {
//         _id: '142',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'My Universe',
//         artist: 'Coldplay',
//         album: 'My Universe',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f60a9b7e2abafc38da31f575',
//         likedByUsers: [],
//       },
//       {
//         _id: '143',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Dancing Queen',
//         artist: 'ABBA',
//         album: 'Arrival',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27370f7a1b35d5165c85b95a0e0',
//         likedByUsers: [],
//       },
//       {
//         _id: '144',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Story of My Life',
//         artist: 'One Direction',
//         album: 'Midnight Memories (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732f76b797c382bedcafdf45e1',
//         likedByUsers: [],
//       },
//       {
//         _id: '145',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Just the Way You Are',
//         artist: 'Bruno Mars',
//         album: 'Doo-Wops & Hooligans',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f6b55ca93bd33211227b502b',
//         likedByUsers: [],
//       },
//       {
//         _id: '146',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Happier',
//         artist: 'Marshmello',
//         album: 'Happier',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27304bfd5a5fd5aa6ca648f66aa',
//         likedByUsers: [],
//       },
//       {
//         _id: '147',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Uptown Funk (feat. Bruno Mars)',
//         artist: 'Mark Ronson',
//         album: 'Uptown Special',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2',
//         likedByUsers: [],
//       },
//       {
//         _id: '148',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: "Don't Start Now",
//         artist: 'Dua Lipa',
//         album: 'Future Nostalgia',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946',
//         likedByUsers: [],
//       },
//       {
//         _id: '149',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Sorry',
//         artist: 'Justin Bieber',
//         album: 'Purpose (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de',
//         likedByUsers: [],
//       },
//       {
//         _id: '150',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Hey, Soul Sister',
//         artist: 'Train',
//         album: 'Save Me, San Francisco (Golden Gate Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2736ff8bc258e3ebc835ffe14ca',
//         likedByUsers: [],
//       },
//       {
//         _id: '151',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'thank u, next',
//         artist: 'Ariana Grande',
//         album: 'thank u, next',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27356ac7b86e090f307e218e9c8',
//         likedByUsers: [],
//       },
//       {
//         _id: '152',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Whenever, Wherever',
//         artist: 'Shakira',
//         album: 'Laundry Service',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731f400a1f4d821b00824cf58f',
//         likedByUsers: [],
//       },
//       {
//         _id: '153',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: "Summer Of '69",
//         artist: 'Bryan Adams',
//         album: 'Reckless (30th Anniversary / Deluxe Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273cf1fee2a55e98e22bf358512',
//         likedByUsers: [],
//       },
//       {
//         _id: '154',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'I Wanna Dance with Somebody (Who Loves Me)',
//         artist: 'Whitney Houston',
//         album: 'Whitney',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273cc57e9b00b87dd0f6e868347',
//         likedByUsers: [],
//       },
//       {
//         _id: '155',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Sugar',
//         artist: 'Maroon 5',
//         album: 'V',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273442b53773d50e1b5369bb16c',
//         likedByUsers: [],
//       },
//       {
//         _id: '156',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Just Give Me a Reason (feat. Nate Ruess)',
//         artist: 'P!nk',
//         album: 'The Truth About Love',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739d0f0d226987b449808e7b6f',
//         likedByUsers: [],
//       },
//       {
//         _id: '157',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Timber (feat. Ke$ha)',
//         artist: 'Pitbull',
//         album: 'Global Warming: Meltdown (Deluxe Version)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f2486b438645e97b523e4f90',
//         likedByUsers: [],
//       },
//       {
//         _id: '158',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Mercy',
//         artist: 'Shawn Mendes',
//         album: 'Illuminate (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ea3ef7697cfd5705b8f47521',
//         likedByUsers: [],
//       },
//       {
//         _id: '160',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'TiK ToK',
//         artist: 'Kesha',
//         album: 'Animal (Expanded Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2737a6339d6ddfd579f77559b3c',
//         likedByUsers: [],
//       },
//       {
//         _id: '161',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'I Want It That Way',
//         artist: 'Backstreet Boys',
//         album: 'Millennium',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732160c02bc56f192df0f4986b',
//         likedByUsers: [],
//       },
//       {
//         _id: '162',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Stuck with U (with Justin Bieber)',
//         artist: 'Ariana Grande',
//         album: 'Stuck with U',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732babb9dbd8f5146112f1bf86',
//         likedByUsers: [],
//       },
//       {
//         _id: '163',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Set Fire to the Rain',
//         artist: 'Adele',
//         album: '21',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300',
//         likedByUsers: [],
//       },
//       {
//         _id: '164',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Señorita',
//         artist: 'Shawn Mendes',
//         album: 'Shawn Mendes (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273c820f033bd82bef4355d1563',
//         likedByUsers: [],
//       },
//       {
//         _id: '165',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'High Hopes',
//         artist: 'Panic! At The Disco',
//         album: 'Pray for the Wicked',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273c5148520a59be191eea16989',
//         likedByUsers: [],
//       },
//       {
//         _id: '166',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'We Found Love',
//         artist: 'Rihanna',
//         album: 'Talk That Talk',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731c5eacf6965d328c2c795cef',
//         likedByUsers: [],
//       },
//       {
//         _id: '167',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Sucker',
//         artist: 'Jonas Brothers',
//         album: 'Happiness Begins',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273de1a3a5eaa0c75bb18e7b597',
//         likedByUsers: [],
//       },
//       {
//         _id: '168',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Happy - From "Despicable Me 2"',
//         artist: 'Pharrell Williams',
//         album: 'G I R L',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e8107e6d9214baa81bb79bba',
//         likedByUsers: [],
//       },
//       {
//         _id: '169',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Chasing Cars',
//         artist: 'Snow Patrol',
//         album: 'Eyes Open',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735da2756220da9b6f17924f8f',
//         likedByUsers: [],
//       },
//       {
//         _id: '170',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Rude',
//         artist: 'MAGIC!',
//         album: "Don't Kill the Magic",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273604f8ac39f15d287e251f193',
//         likedByUsers: [],
//       },
//       {
//         _id: '171',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Sweet but Psycho',
//         artist: 'Ava Max',
//         album: 'Heaven & Hell',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739a95e89d24214b94de36ccf7',
//         likedByUsers: [],
//       },
//       {
//         _id: '172',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'New Rules',
//         artist: 'Dua Lipa',
//         album: 'Dua Lipa (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2736b915e407b70e121e06fe979',
//         likedByUsers: [],
//       },
//       {
//         _id: '173',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Bruises',
//         artist: 'Lewis Capaldi',
//         album: 'Divinely Uninspired To A Hellish Extent',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2',
//         likedByUsers: [],
//       },
//       {
//         _id: '174',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: "What's Up?",
//         artist: '4 Non Blondes',
//         album: 'Bigger, Better, Faster, More !',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273381371cb8ce680d0dc324600',
//         likedByUsers: [],
//       },
//       {
//         _id: '175',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Wannabe',
//         artist: 'Spice Girls',
//         album: 'Spice',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27363facc42e4a35eb3aa182b59',
//         likedByUsers: [],
//       },
//       {
//         _id: '176',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Rolling in the Deep',
//         artist: 'Adele',
//         album: '21',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300',
//         likedByUsers: [],
//       },
//       {
//         _id: '177',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'This Love',
//         artist: 'Maroon 5',
//         album: 'Songs About Jane: 10th Anniversary Edition',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27392f2d790c6a97b195f66d51e',
//         likedByUsers: [],
//       },
//       {
//         _id: '178',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Dancing On My Own',
//         artist: 'Calum Scott',
//         album: 'Only Human (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f2d671c22b70e01b78a618a8',
//         likedByUsers: [],
//       },
//       {
//         _id: '179',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Where Is The Love?',
//         artist: 'Black Eyed Peas',
//         album: 'Elephunk',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27329a42ba069a854c9078377b4',
//         likedByUsers: [],
//       },
//       {
//         _id: '180',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: '7 Years',
//         artist: 'Lukas Graham',
//         album: 'Lukas Graham',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732d94d0f04e9a58d1654b760b',
//         likedByUsers: [],
//       },
//       {
//         _id: '181',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: "I'm Yours",
//         artist: 'Jason Mraz',
//         album: 'We Sing. We Dance. We Steal Things.',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2730f2e51f7121539e221c51161',
//         likedByUsers: [],
//       },
//       {
//         _id: '182',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Everywhere - 2017 Remaster',
//         artist: 'Fleetwood Mac',
//         album: 'Tango In the Night (Deluxe Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273aaba065944cd82a6f15c86b6',
//         likedByUsers: [],
//       },
//       {
//         _id: '183',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'The Middle',
//         artist: 'Zedd',
//         album: 'The Middle',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273fbe22d168a743b782a5e856a',
//         likedByUsers: [],
//       },
//       {
//         _id: '184',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Royals',
//         artist: 'Lorde',
//         album: 'Pure Heroine',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273187331e276c898d39764cc98',
//         likedByUsers: [],
//       },
//       {
//         _id: '185',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Havana (feat. Young Thug)',
//         artist: 'Camila Cabello',
//         album: 'Camila',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2736eb0b9e73adcf04e4ed3eca4',
//         likedByUsers: [],
//       },
//       {
//         _id: '186',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Happier',
//         artist: 'Ed Sheeran',
//         album: '÷ (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
//         likedByUsers: [],
//       },
//       {
//         _id: '187',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'She Will Be Loved - Radio Mix',
//         artist: 'Maroon 5',
//         album: 'Songs About Jane: 10th Anniversary Edition',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27392f2d790c6a97b195f66d51e',
//         likedByUsers: [],
//       },
//       {
//         _id: '188',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Budapest',
//         artist: 'George Ezra',
//         album: 'Wanted on Voyage (Expanded Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273d6df3bccf3ec41ea2f76debc',
//         likedByUsers: [],
//       },
//       {
//         _id: '189',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Someone Like You',
//         artist: 'Adele',
//         album: '21',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300',
//         likedByUsers: [],
//       },
//       {
//         _id: '190',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Drag Me Down',
//         artist: 'One Direction',
//         album: 'Made In The A.M. (Deluxe Edition)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273241e4fe75732c9c4b49b94c3',
//         likedByUsers: [],
//       },
//       {
//         _id: '191',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Complicated',
//         artist: 'Avril Lavigne',
//         album: 'Let Go',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f7ec724fbf97a30869d06240',
//         likedByUsers: [],
//       },
//       {
//         _id: '192',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Girls Just Want to Have Fun',
//         artist: 'Cyndi Lauper',
//         album: "She's So Unusual",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27352f532df7ba3269b0242fed9',
//         likedByUsers: [],
//       },
//       {
//         _id: '193',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'This Town',
//         artist: 'Niall Horan',
//         album: 'Flicker (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735bac234d5511248b248caf36',
//         likedByUsers: [],
//       },
//       {
//         _id: '194',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'How to Save a Life',
//         artist: 'The Fray',
//         album: 'How To Save A Life',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27359b8b957f164ce660919f1f4',
//         likedByUsers: [],
//       },
//       {
//         _id: '195',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'With Or Without You - Remastered',
//         artist: 'U2',
//         album: 'The Joshua Tree (Super Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273b7bea3d01f04e6d0408d2afe',
//         likedByUsers: [],
//       },
//       {
//         _id: '196',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'IDGAF',
//         artist: 'Dua Lipa',
//         album: 'Dua Lipa (Deluxe)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2736b915e407b70e121e06fe979',
//         likedByUsers: [],
//       },
//       {
//         _id: '197',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Wind Of Change',
//         artist: 'Scorpions',
//         album: 'Crazy World',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273787674b6a114f98cad6f834b',
//         likedByUsers: [],
//       },
//       {
//         _id: '198',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Uptown Girl',
//         artist: 'Billy Joel',
//         album: 'An Innocent Man',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273814cbc4746358a25c84c62e7',
//         likedByUsers: [],
//       },
//       {
//         _id: '199',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'Wake Me Up Before You Go-Go',
//         artist: 'Wham!',
//         album: 'Make It Big',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273a2fc41b0dd6ce4f0d16a4c46',
//         likedByUsers: [],
//       },
//       {
//         _id: '200',
//         addedAt: '2023-02-08T14:33:43Z',
//         title: 'I Don’t Wanna Live Forever (Fifty Shades Darker)',
//         artist: 'ZAYN',
//         album: 'reputation Stadium Tour Surprise Song Playlist',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27363d77f99117b28af9f656918',
//         likedByUsers: [],
//       },
//       {
//         _id: '201',
//         addedAt: '2023-03-02T09:50:57Z',
//         title: 'Should I Stay or Should I Go - Remastered',
//         artist: 'The Clash',
//         album: 'Combat Rock (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27325a4df452a3c42ccc2e9288b',
//         likedByUsers: [],
//       },
//     ],
//     msgs: [
//       {
//         id: 'm101',
//         from: '{mini-user}',
//         txt: 'Manish?',
//       },
//     ],
//   },
//   {
//     _id: '2',
//     name: 'Rock This',
//     tags: ['Rock'],
//     description:
//       "Nothing But Thieves along with today's Rock songs you need to hear.",
//     imgUrl: 'https://i.scdn.co/image/ab67706f00000003c02bfd2d13e8c5784e0390f5',
//     songs: [
//       {
//         _id: '202',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Welcome to the DCC',
//         artist: 'Nothing But Thieves',
//         album: 'Welcome to the DCC',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27367b6e438b2d1dfec09918926',
//         likedByUsers: [],
//       },
//       {
//         _id: '203',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'GOSSIP (feat. Tom Morello)',
//         artist: 'Måneskin',
//         album: 'RUSH!',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273c1b211b5fcdef31be5f806df',
//         likedByUsers: [],
//       },
//       {
//         _id: '204',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Lost',
//         artist: 'Linkin Park',
//         album: 'Lost',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273fa981359e156d38403129fa8',
//         likedByUsers: [],
//       },
//       {
//         _id: '205',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'GODDESS',
//         artist: 'PVRIS',
//         album: 'GODDESS',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273674bf5c15859cdf261ff83d4',
//         likedByUsers: [],
//       },
//       {
//         _id: '206',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Love From The Other Side - Edit',
//         artist: 'Fall Out Boy',
//         album: 'Love From The Other Side',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273b90a83710fe24a824b8868d6',
//         likedByUsers: [],
//       },
//       {
//         _id: '207',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Hollywood Baby',
//         artist: '100 gecs',
//         album: 'Hollywood Baby',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2730fdc0525ef406f8b2e81862b',
//         likedByUsers: [],
//       },
//       {
//         _id: '208',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Running Out Of Time',
//         artist: 'Paramore',
//         album: 'This Is Why',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273de1518c8beec71d61acc25fa',
//         likedByUsers: [],
//       },
//       {
//         _id: '209',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Love Will Get You There',
//         artist: 'Inhaler',
//         album: 'Cuts & Bruises',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273d2e39ea289f5cdc3a2c1ae13',
//         likedByUsers: [],
//       },
//       {
//         _id: '210',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Ghosts Again',
//         artist: 'Depeche Mode',
//         album: 'Ghosts Again',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273534061accc8a24abddb38176',
//         likedByUsers: [],
//       },
//       {
//         _id: '211',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'In My Head',
//         artist: 'Mike Shinoda',
//         album: 'In My Head',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273adee3ea8087cc2a78ebe5127',
//         likedByUsers: [],
//       },
//       {
//         _id: '212',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Supernatural',
//         artist: 'Barns Courtney',
//         album: 'Supernatural',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273d81b8002786b077600ce9de1',
//         likedByUsers: [],
//       },
//       {
//         _id: '213',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Calm Down',
//         artist: 'All Time Low',
//         album: "Tell Me I'm Alive",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27351c5a0490ea847ecb7b8b164',
//         likedByUsers: [],
//       },
//       {
//         _id: '214',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Six Feet Under',
//         artist: 'Charlotte Sands',
//         album: 'Six Feet Under',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2733dc0ca1a9b9ed6048e7aef20',
//         likedByUsers: [],
//       },
//       {
//         _id: '215',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Emergency Contact',
//         artist: 'Pierce The Veil',
//         album: 'Emergency Contact',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2736e61cfcaf2d8c4a7b051d026',
//         likedByUsers: [],
//       },
//       {
//         _id: '216',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Left Behind',
//         artist: 'The Plot In You',
//         album: 'Left Behind',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273d5ed54d7e37d4dd456ec28f1',
//         likedByUsers: [],
//       },
//       {
//         _id: '217',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Kool',
//         artist: 'Meet Me @ The Altar',
//         album: 'Past // Present // Future',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27355ea06678f159ce04854000a',
//         likedByUsers: [],
//       },
//       {
//         _id: '218',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Told You So',
//         artist: 'The Band CAMINO',
//         album: 'Told You So',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273b1ab783287a526d1bd8f1b37',
//         likedByUsers: [],
//       },
//       {
//         _id: '219',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Hooves',
//         artist: 'Sir Chloe',
//         album: 'Hooves',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27384a67de1f7ea4f665608fbe2',
//         likedByUsers: [],
//       },
//       {
//         _id: '220',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Call Me What You Like',
//         artist: 'Lovejoy',
//         album: 'Call Me What You Like',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732645d21cce25cea1ac5aedf2',
//         likedByUsers: [],
//       },
//       {
//         _id: '221',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Veronica Mars',
//         artist: 'Blondshell',
//         album: 'Veronica Mars',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2736774908d6f67a7eac4cee6b7',
//         likedByUsers: [],
//       },
//       {
//         _id: '222',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Pages',
//         artist: 'White Reaper',
//         album: 'Asking For A Ride',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27314a24b46da707b11655c9431',
//         likedByUsers: [],
//       },
//       {
//         _id: '223',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Another Celebration at the End of the World',
//         artist: 'Mammoth WVH',
//         album: 'Another Celebration at the End of the World',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2730e4e8c07ea84c47648ac0a08',
//         likedByUsers: [],
//       },
//       {
//         _id: '224',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Spillways [Feat. Joe Elliott]',
//         artist: 'Ghost',
//         album: 'Spillways [Feat. Joe Elliott]',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273a7e74acfaf004e89a091699e',
//         likedByUsers: [],
//       },
//       {
//         _id: '225',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'War',
//         artist: 'Story Of The Year',
//         album: 'War',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27339119b568203b616b0e606f4',
//         likedByUsers: [],
//       },
//       {
//         _id: '226',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'PANIC',
//         artist: 'YONAKA',
//         album: 'PANIC',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739629c19a2470effdaf531256',
//         likedByUsers: [],
//       },
//       {
//         _id: '227',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Play My Favourite Song',
//         artist: 'Tigercub',
//         album: 'Play My Favourite Song',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2730c53199764b32c6d25a19c91',
//         likedByUsers: [],
//       },
//       {
//         _id: '228',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Love Abuser (Save Me)',
//         artist: 'Royal & the Serpent',
//         album: 'Love Abuser (Save Me)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273d38a9a0226af111542ca5c27',
//         likedByUsers: [],
//       },
//       {
//         _id: '229',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'ALL CAPS (feat. John the Ghost)',
//         artist: 'Weathers',
//         album: 'ALL CAPS (feat. John the Ghost)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273f1dab974d0bd5448bcf6007b',
//         likedByUsers: [],
//       },
//       {
//         _id: '230',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: ':mydopamine:',
//         artist: 'You Me At Six',
//         album: ':mydopamine:',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273867f34691ad85a5dd65ac10d',
//         likedByUsers: [],
//       },
//       {
//         _id: '231',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'The Summoning',
//         artist: 'Sleep Token',
//         album: 'The Summoning',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273eb7a831300d4835a4c16f8c1',
//         likedByUsers: [],
//       },
//       {
//         _id: '232',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Without Me',
//         artist: 'Dayseeker',
//         album: 'Dark Sun',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273af0b19a66d60dd75baa77ec1',
//         likedByUsers: [],
//       },
//       {
//         _id: '233',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Ice Cold',
//         artist: 'Highly Suspect',
//         album: 'The Midnight Demon Club',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273cf88e7a465f979556100e59c',
//         likedByUsers: [],
//       },
//       {
//         _id: '234',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Just Pretend',
//         artist: 'Bad Omens',
//         album: 'THE DEATH OF PEACE OF MIND',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e5f6f7ec99735d7b870f18ae',
//         likedByUsers: [],
//       },
//       {
//         _id: '235',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'BANG BANG!',
//         artist: 'Nessa Barrett',
//         album: 'BANG BANG!',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2737e343ef46476f6dded17cfb5',
//         likedByUsers: [],
//       },
//       {
//         _id: '236',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Eulogy',
//         artist: 'grandson',
//         album: 'Eulogy',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735769a12b62158f468bf533f4',
//         likedByUsers: [],
//       },
//       {
//         _id: '237',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'FREAK (Feat. jxdn)',
//         artist: 'Beauty School Dropout',
//         album: 'FREAK (Feat. jxdn)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2738c77daf900cc662bf97cd897',
//         likedByUsers: [],
//       },
//       {
//         _id: '238',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Shelter (feat. Avril Lavigne)',
//         artist: 'MOD SUN',
//         album: 'God Save The Teen',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273fd23f48e459fb87865829652',
//         likedByUsers: [],
//       },
//       {
//         _id: '239',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Heartbreak Of The Century',
//         artist: 'Neck Deep',
//         album: 'Heartbreak Of The Century',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2732cd2d9761f4818a4a73278ca',
//         likedByUsers: [],
//       },
//       {
//         _id: '240',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'kill[h]er',
//         artist: 'Stand Atlantic',
//         album: 'kill[h]er',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ff9dc97e2b80258177aa830c',
//         likedByUsers: [],
//       },
//       {
//         _id: '241',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Centipede',
//         artist: 'FIDLAR',
//         album: 'Centipede',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2733810fb09270c5b97072b2714',
//         likedByUsers: [],
//       },
//       {
//         _id: '242',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Do It Faster',
//         artist: 'Militarie Gun',
//         album: 'Do It Faster',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273fc192fd409c1e8dd7431b0ee',
//         likedByUsers: [],
//       },
//       {
//         _id: '243',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Lose You (feat. Soccer Mommy)',
//         artist: 'Bully',
//         album: 'Lose You (feat. Soccer Mommy)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739c8fef42f2ac4705c76ec19b',
//         likedByUsers: [],
//       },
//       {
//         _id: '244',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Hate.',
//         artist: 'ThxSoMch',
//         album: 'Hate.',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739a60aa596ebddff13dc0e08b',
//         likedByUsers: [],
//       },
//       {
//         _id: '245',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'curious/furious',
//         artist: 'WILLOW',
//         album: '<COPINGMECHANISM>',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731d13addda541bcf23ea27e0d',
//         likedByUsers: [],
//       },
//       {
//         _id: '246',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'TAKE THIS CROWN (feat. Good Charlotte)',
//         artist: "DE'WAYNE",
//         album: 'My Favorite Blue Jeans',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27321da5bbcc537077342b399f9',
//         likedByUsers: [],
//       },
//       {
//         _id: '247',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'POS',
//         artist: 'Sueco',
//         album: 'POS',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27326f0c5addc43575fe62a55d1',
//         likedByUsers: [],
//       },
//       {
//         _id: '248',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'everybody hates me',
//         artist: 'GAYLE',
//         album: 'everybody hates me',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273cec24360f503f4e1b609aa3c',
//         likedByUsers: [],
//       },
//       {
//         _id: '249',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'Friends With Benefits',
//         artist: 'jxdn',
//         album: 'Friends With Benefits',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2734c1f3cc5c6352f474a8c6196',
//         likedByUsers: [],
//       },
//       {
//         _id: '250',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'EDGING',
//         artist: 'blink-182',
//         album: 'EDGING',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273992db40efc4367bebea586f7',
//         likedByUsers: [],
//       },
//       {
//         _id: '251',
//         addedAt: '2023-03-31T04:01:00Z',
//         title: 'HOLIDAY',
//         artist: 'Turnstile',
//         album: 'GLOW ON',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273a4499cf37a6fe4ff043dc9f2',
//         likedByUsers: [],
//       },
//     ],
//     createdBy: {
//       _id: 'u101',
//       fullname: 'system',
//       imgUrl: 'http://some-photo/',
//     },
//     likedByUsers: [],
//   },
//   {
//     _id: '3',
//     name: 'This Is Pink Floyd',
//     description:
//       'This is Pink Floyd. The essential tracks, all in one playlist.',
//     imgUrl: 'https://thisis-images.scdn.co/37i9dQZF1DZ06evO07zaak-large.jpg',
//     songs: [
//       {
//         _id: '1',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Hey Hey Rise Up (feat. Andriy Khlyvnyuk of Boombox)',
//         artist: 'Pink Floyd',
//         album: 'Hey Hey Rise Up (feat. Andriy Khlyvnyuk of Boombox)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273366a444b9d639924cb953b3b',
//         likedByUsers: [],
//       },
//       {
//         _id: '2',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Another Brick in the Wall, Pt. 2',
//         artist: 'Pink Floyd',
//         album: 'The Wall',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf',
//         likedByUsers: [],
//       },
//       {
//         _id: '3',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Breathe (In the Air)',
//         artist: 'Pink Floyd',
//         album: 'The Dark Side of the Moon',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe',
//         likedByUsers: [],
//       },
//       {
//         _id: '4',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Wish You Were Here',
//         artist: 'Pink Floyd',
//         album: 'Wish You Were Here',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731a84d71391df7469c5ab8539',
//         likedByUsers: [],
//       },
//       {
//         _id: '5',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Pigs on the Wing 1',
//         artist: 'Pink Floyd',
//         album: 'Animals',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273810168d54f85d48f07389237',
//         likedByUsers: [],
//       },
//       {
//         _id: '6',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Comfortably Numb',
//         artist: 'Pink Floyd',
//         album: 'The Wall',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf',
//         likedByUsers: [],
//       },
//       {
//         _id: '7',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'The Great Gig in the Sky',
//         artist: 'Pink Floyd',
//         album: 'The Dark Side of the Moon',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe',
//         likedByUsers: [],
//       },
//       {
//         _id: '8',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Have a Cigar',
//         artist: 'Pink Floyd',
//         album: 'Wish You Were Here',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731a84d71391df7469c5ab8539',
//         likedByUsers: [],
//       },
//       {
//         _id: '9',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Learning to Fly',
//         artist: 'Pink Floyd',
//         album: 'A Momentary Lapse of Reason',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27361f734a2370207feda78d018',
//         likedByUsers: [],
//       },
//       {
//         _id: '10',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Hey You',
//         artist: 'Pink Floyd',
//         album: 'The Wall',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf',
//         likedByUsers: [],
//       },
//       {
//         _id: '11',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Money',
//         artist: 'Pink Floyd',
//         album: 'The Dark Side of the Moon',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe',
//         likedByUsers: [],
//       },
//       {
//         _id: '12',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Shine On You Crazy Diamond (Pts. 1-5)',
//         artist: 'Pink Floyd',
//         album: 'Wish You Were Here',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731a84d71391df7469c5ab8539',
//         likedByUsers: [],
//       },
//       {
//         _id: '13',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Coming Back to Life',
//         artist: 'Pink Floyd',
//         album: 'The Division Bell',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2738431fb4cb38f8ee96d3434c0',
//         likedByUsers: [],
//       },
//       {
//         _id: '14',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Young Lust',
//         artist: 'Pink Floyd',
//         album: 'The Wall',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf',
//         likedByUsers: [],
//       },
//       {
//         _id: '15',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Time',
//         artist: 'Pink Floyd',
//         album: 'The Dark Side of the Moon',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe',
//         likedByUsers: [],
//       },
//       {
//         _id: '16',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Welcome to the Machine',
//         artist: 'Pink Floyd',
//         album: 'Wish You Were Here',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2731a84d71391df7469c5ab8539',
//         likedByUsers: [],
//       },
//       {
//         _id: '17',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'What Do You Want from Me',
//         artist: 'Pink Floyd',
//         album: 'The Division Bell',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2738431fb4cb38f8ee96d3434c0',
//         likedByUsers: [],
//       },
//       {
//         _id: '18',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Another Brick in the Wall, Pt. 1',
//         artist: 'Pink Floyd',
//         album: 'The Wall',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf',
//         likedByUsers: [],
//       },
//       {
//         _id: '19',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Brain Damage',
//         artist: 'Pink Floyd',
//         album: 'The Dark Side of the Moon',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe',
//         likedByUsers: [],
//       },
//       {
//         _id: '20',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Fearless',
//         artist: 'Pink Floyd',
//         album: 'Meddle',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739449d3adaa0f6e26af288c0d',
//         likedByUsers: [],
//       },
//       {
//         _id: '21',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Marooned',
//         artist: 'Pink Floyd',
//         album: 'The Division Bell',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2738431fb4cb38f8ee96d3434c0',
//         likedByUsers: [],
//       },
//       {
//         _id: '22',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Mother',
//         artist: 'Pink Floyd',
//         album: 'The Wall',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf',
//         likedByUsers: [],
//       },
//       {
//         _id: '23',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Us and Them',
//         artist: 'Pink Floyd',
//         album: 'The Dark Side of the Moon',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe',
//         likedByUsers: [],
//       },
//       {
//         _id: '24',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'On the Turning Away',
//         artist: 'Pink Floyd',
//         album: 'A Momentary Lapse of Reason',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27361f734a2370207feda78d018',
//         likedByUsers: [],
//       },
//       {
//         _id: '25',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Lost for Words',
//         artist: 'Pink Floyd',
//         album: 'The Division Bell',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2738431fb4cb38f8ee96d3434c0',
//         likedByUsers: [],
//       },
//       {
//         _id: '26',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Pigs (Three Different Ones)',
//         artist: 'Pink Floyd',
//         album: 'Animals',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273810168d54f85d48f07389237',
//         likedByUsers: [],
//       },
//       {
//         _id: '27',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'San Tropez',
//         artist: 'Pink Floyd',
//         album: 'Meddle',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739449d3adaa0f6e26af288c0d',
//         likedByUsers: [],
//       },
//       {
//         _id: '28',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: "Wot's...Uh the Deal",
//         artist: 'Pink Floyd',
//         album: 'Obscured by Clouds',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e806fae51cd0fc57e59d52a3',
//         likedByUsers: [],
//       },
//       {
//         _id: '29',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Take It Back',
//         artist: 'Pink Floyd',
//         album: 'The Division Bell',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2738431fb4cb38f8ee96d3434c0',
//         likedByUsers: [],
//       },
//       {
//         _id: '30',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Dogs',
//         artist: 'Pink Floyd',
//         album: 'Animals',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273810168d54f85d48f07389237',
//         likedByUsers: [],
//       },
//       {
//         _id: '31',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'One of These Days',
//         artist: 'Pink Floyd',
//         album: 'Meddle',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739449d3adaa0f6e26af288c0d',
//         likedByUsers: [],
//       },
//       {
//         _id: '32',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'The Final Cut',
//         artist: 'Pink Floyd',
//         album: 'The Final Cut',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27347df2a740389393d35cb33ca',
//         likedByUsers: [],
//       },
//       {
//         _id: '33',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Poles Apart',
//         artist: 'Pink Floyd',
//         album: 'The Division Bell',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2738431fb4cb38f8ee96d3434c0',
//         likedByUsers: [],
//       },
//       {
//         _id: '34',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'Sheep',
//         artist: 'Pink Floyd',
//         album: 'Animals',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273810168d54f85d48f07389237',
//         likedByUsers: [],
//       },
//       {
//         _id: '35',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'A Pillow of Winds',
//         artist: 'Pink Floyd',
//         album: 'Meddle',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2739449d3adaa0f6e26af288c0d',
//         likedByUsers: [],
//       },
//       {
//         _id: '36',
//         addedAt: '2023-03-31T17:37:27Z',
//         title: 'One of the Few',
//         artist: 'Pink Floyd',
//         album: 'The Final Cut',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27347df2a740389393d35cb33ca',
//         likedByUsers: [],
//       },
//     ],
//     tags: ['Rock'],
//     createdBy: {
//       _id: 'u101',
//       fullname: 'system',
//       imgUrl: 'http://some-photo/',
//     },
//     likedByUsers: [],
//   },
//   {
//     _id: '4',
//     name: 'This Is The Beatles',
//     description:
//       'This is The Beatles. The essential tracks, all in one playlist.',
//     imgUrl: 'https://thisis-images.scdn.co/37i9dQZF1DZ06evO2iBPiw-large.jpg',
//     tags: ['Rock'],
//     songs: [
//       {
//         _id: '37',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Here Comes The Sun - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Abbey Road (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
//         likedByUsers: [],
//       },
//       {
//         _id: '38',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'In My Life - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Rubber Soul (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ed801e58a9ababdea6ac7ce4',
//         likedByUsers: [],
//       },
//       {
//         _id: '39',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Yesterday - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Help! (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e3e3b64cea45265469d4cafa',
//         likedByUsers: [],
//       },
//       {
//         _id: '40',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Let It Be - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Let It Be (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27384243a01af3c77b56fe01ab1',
//         likedByUsers: [],
//       },
//       {
//         _id: '41',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Blackbird - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'The Beatles (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2734ce8b4e42588bf18182a1ad2',
//         likedByUsers: [],
//       },
//       {
//         _id: '42',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Norwegian Wood (This Bird Has Flown) - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Rubber Soul (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ed801e58a9ababdea6ac7ce4',
//         likedByUsers: [],
//       },
//       {
//         _id: '43',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Come Together - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Abbey Road (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
//         likedByUsers: [],
//       },
//       {
//         _id: '44',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Twist And Shout - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Please Please Me (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df',
//         likedByUsers: [],
//       },
//       {
//         _id: '45',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: "You've Got To Hide Your Love Away - Remastered 2009",
//         artist: 'The Beatles',
//         album: 'Help! (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e3e3b64cea45265469d4cafa',
//         likedByUsers: [],
//       },
//       {
//         _id: '46',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'I Want To Hold Your Hand - Remastered 2015',
//         artist: 'The Beatles',
//         album: '1 (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf',
//         likedByUsers: [],
//       },
//       {
//         _id: '47',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Something - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Abbey Road (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
//         likedByUsers: [],
//       },
//       {
//         _id: '48',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'All My Loving - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'With The Beatles (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273608a63ad5b18e99da94a3f73',
//         likedByUsers: [],
//       },
//       {
//         _id: '49',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Help! - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Help! (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e3e3b64cea45265469d4cafa',
//         likedByUsers: [],
//       },
//       {
//         _id: '50',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Ob-La-Di, Ob-La-Da - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'The Beatles (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2734ce8b4e42588bf18182a1ad2',
//         likedByUsers: [],
//       },
//       {
//         _id: '51',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Hey Jude - Remastered 2015',
//         artist: 'The Beatles',
//         album: '1 (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf',
//         likedByUsers: [],
//       },
//       {
//         _id: '52',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'And I Love Her - Remastered 2009',
//         artist: 'The Beatles',
//         album: "A Hard Day's Night (Remastered)",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e230f303815e82a86713eedd',
//         likedByUsers: [],
//       },
//       {
//         _id: '53',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Love Me Do - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Please Please Me (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df',
//         likedByUsers: [],
//       },
//       {
//         _id: '54',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'While My Guitar Gently Weeps - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'The Beatles (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2734ce8b4e42588bf18182a1ad2',
//         likedByUsers: [],
//       },
//       {
//         _id: '55',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'We Can Work It Out - Remastered 2015',
//         artist: 'The Beatles',
//         album: '1 (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf',
//         likedByUsers: [],
//       },
//       {
//         _id: '56',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Golden Slumbers - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Abbey Road (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
//         likedByUsers: [],
//       },
//       {
//         _id: '57',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: "Can't Buy Me Love - Remastered 2009",
//         artist: 'The Beatles',
//         album: "A Hard Day's Night (Remastered)",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e230f303815e82a86713eedd',
//         likedByUsers: [],
//       },
//       {
//         _id: '58',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: "I'll Follow The Sun - Remastered 2009",
//         artist: 'The Beatles',
//         album: 'Beatles For Sale (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27355612ece447bec5d62c68375',
//         likedByUsers: [],
//       },
//       {
//         _id: '59',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Day Tripper - Remastered 2015',
//         artist: 'The Beatles',
//         album: '1 (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf',
//         likedByUsers: [],
//       },
//       {
//         _id: '60',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Eleanor Rigby - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Revolver (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27328b8b9b46428896e6491e97a',
//         likedByUsers: [],
//       },
//       {
//         _id: '61',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: "A Hard Day's Night - Remastered 2009",
//         artist: 'The Beatles',
//         album: "A Hard Day's Night (Remastered)",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e230f303815e82a86713eedd',
//         likedByUsers: [],
//       },
//       {
//         _id: '62',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Eight Days A Week - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Beatles For Sale (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27355612ece447bec5d62c68375',
//         likedByUsers: [],
//       },
//       {
//         _id: '63',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'I Feel Fine - Remastered 2015',
//         artist: 'The Beatles',
//         album: '1 (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf',
//         likedByUsers: [],
//       },
//       {
//         _id: '64',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Here, There And Everywhere - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Revolver (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27328b8b9b46428896e6491e97a',
//         likedByUsers: [],
//       },
//       {
//         _id: '65',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'I Saw Her Standing There - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Please Please Me (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df',
//         likedByUsers: [],
//       },
//       {
//         _id: '66',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Michelle - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Rubber Soul (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ed801e58a9ababdea6ac7ce4',
//         likedByUsers: [],
//       },
//       {
//         _id: '67',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'The Long And Winding Road - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Let It Be (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27384243a01af3c77b56fe01ab1',
//         likedByUsers: [],
//       },
//       {
//         _id: '68',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'I Will - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'The Beatles (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2734ce8b4e42588bf18182a1ad2',
//         likedByUsers: [],
//       },
//       {
//         _id: '69',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Ticket To Ride - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Help! (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e3e3b64cea45265469d4cafa',
//         likedByUsers: [],
//       },
//       {
//         _id: '70',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'She Loves You - Mono / Remastered',
//         artist: 'The Beatles',
//         album: '1 (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf',
//         likedByUsers: [],
//       },
//       {
//         _id: '71',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Get Back - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Let It Be (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27384243a01af3c77b56fe01ab1',
//         likedByUsers: [],
//       },
//       {
//         _id: '72',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'For No One - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Revolver (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27328b8b9b46428896e6491e97a',
//         likedByUsers: [],
//       },
//       {
//         _id: '73',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: "When I'm Sixty Four - Remastered 2009",
//         artist: 'The Beatles',
//         album: "Sgt. Pepper's Lonely Hearts Club Band (Remastered)",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27334ef8f7d06cf2fc2146f420a',
//         likedByUsers: [],
//       },
//       {
//         _id: '74',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: "Don't Let Me Down - Remastered 2009",
//         artist: 'The Beatles',
//         album: 'The Beatles 1967 - 1970 (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b2736e3d3c964df32136fb1cd594',
//         likedByUsers: [],
//       },
//       {
//         _id: '75',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Penny Lane - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Magical Mystery Tour (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273692d9189b2bd75525893f0c1',
//         likedByUsers: [],
//       },
//       {
//         _id: '76',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Drive My Car - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Rubber Soul (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ed801e58a9ababdea6ac7ce4',
//         likedByUsers: [],
//       },
//       {
//         _id: '77',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'If I Fell - Remastered 2009',
//         artist: 'The Beatles',
//         album: "A Hard Day's Night (Remastered)",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e230f303815e82a86713eedd',
//         likedByUsers: [],
//       },
//       {
//         _id: '78',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'With A Little Help From My Friends - Remastered 2009',
//         artist: 'The Beatles',
//         album: "Sgt. Pepper's Lonely Hearts Club Band (Remastered)",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27334ef8f7d06cf2fc2146f420a',
//         likedByUsers: [],
//       },
//       {
//         _id: '79',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Oh! Darling - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Abbey Road (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
//         likedByUsers: [],
//       },
//       {
//         _id: '80',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Nowhere Man - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Rubber Soul (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273ed801e58a9ababdea6ac7ce4',
//         likedByUsers: [],
//       },
//       {
//         _id: '81',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Across The Universe - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Let It Be (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27384243a01af3c77b56fe01ab1',
//         likedByUsers: [],
//       },
//       {
//         _id: '82',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Lucy In The Sky With Diamonds - Remastered 2009',
//         artist: 'The Beatles',
//         album: "Sgt. Pepper's Lonely Hearts Club Band (Remastered)",
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b27334ef8f7d06cf2fc2146f420a',
//         likedByUsers: [],
//       },
//       {
//         _id: '83',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'All You Need Is Love - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'Magical Mystery Tour (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273692d9189b2bd75525893f0c1',
//         likedByUsers: [],
//       },
//       {
//         _id: '84',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: "I've Just Seen A Face - Remastered 2009",
//         artist: 'The Beatles',
//         album: 'Help! (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273e3e3b64cea45265469d4cafa',
//         likedByUsers: [],
//       },
//       {
//         _id: '85',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: "Octopus's Garden - Remastered 2009",
//         artist: 'The Beatles',
//         album: 'Abbey Road (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
//         likedByUsers: [],
//       },
//       {
//         _id: '86',
//         addedAt: '2023-03-31T17:37:35Z',
//         title: 'Till There Was You - Remastered 2009',
//         artist: 'The Beatles',
//         album: 'With The Beatles (Remastered)',
//         imgUrl:
//           'https://i.scdn.co/image/ab67616d0000b273608a63ad5b18e99da94a3f73',
//         likedByUsers: [],
//       },
//     ],
//     createdBy: {
//       _id: 'u101',
//       fullname: 'system',
//       imgUrl: 'http://some-photo/',
//     },
//     likedByUsers: [],
//   },
// ]

const gSearchCategories = [
  [
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafa862ab80dd85682b37c4e768',
      title: 'Pop',
      color: '#E13300',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafcc70a3c2e4c71398708bdc4a',
      title: 'Folk & Acoustic',
      color: '#7358FF',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafae7e69beb88f16969641b53e',
      title: 'Rock',
      color: '#1E3264',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caf271f9d895003c5f5561c1354',
      title: 'Mood',
      color: '#E8115B',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15',
      title: 'Workout',
      color: '#148A08',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafa1a252e3a815b65778d8c2aa',
      title: 'Indie',
      color: '#BC5900',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934',
      title: 'Focus',
      color: '#E91429',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafda178a834e4f87371e9fa543',
      title: 'Alternative',
      color: '#E1118C',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caff005a355830c374754d32868',
      title: 'Decades',
      color: '#8D67AB',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafe914a07d20cec7a65e2e5dad',
      title: 'At Home',
      color: '#D84000',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caf4b36a2c31432ace68d90c4f2',
      title: 'Travel',
      color: '#E13300',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafcbf80f8ea695536eace4fd2c',
      title: 'Party',
      color: '#7358FF',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1',
      title: 'Hip-Hop',
      color: '#1E3264',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005cafdfdaac1cf9574a196ca25196',
      title: 'Dance-Electronic',
      color: '#148A08',
    },
    {
      img: 'https://i.scdn.co/image/ab67fb8200005caf47e942f5bea637f4f4760170',
      title: 'Chill',
      color: '#E1118C',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002b70e0223f544b1faa2e95ed0',
      title: 'Sleep',
      color: '#BC5900',
    },
  ],
]

const API_KEY = 'AIzaSyCUFGRnCSVi_ThSlPsSGiian0R5z5i5wWA'

const gUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=`
const STORAGE_KEY = 'stations'
const USER_STATIONS = 'user-stations'
const STORAGE_SEARCH_KEY = 'search-stations'
const SEARCH_KEY = 'videosDB'
const VIDEOS_KEY = 'videosIdDB'

var gUserStations = _getUserStations()
var gSearchStations = _loadSearchStations()

// function getVideos(keyword) {
//   if (Array.isArray(keyword)) {
//     // Fetch recommended songs based on the provided list of song titles
//     const recommendedSongs = keyword.map(async (artist) => {
//       // Use the title to fetch the recommended song
//       // Modify the axios.get call to fetch the recommended song based on the title
//       const res = await axios.get(gUrl + artist);
//       const recommendedSong = res.data.items.map((item) =>
//         _prepareRecommendedData(item)
//       );
//       return recommendedSong[0];
//     });

//     return Promise.all(recommendedSongs);
//   }
//   if (gSearchCache[keyword]) {
//     return Promise.resolve(gSearchCache[keyword]);
//   }
//   let videosIds = storageService.load(VIDEOS_KEY) || [];

//   const existTitle = videosIds.find((video) =>
//     video.title.toLowerCase().includes(keyword.toLowerCase())
//   );

//   return axios.get(gUrl + keyword).then((res) => {
//     const videos = res.data.items.map((item) => _prepareData(item));

//     gSearchCache = videos;

//     videosIds.push(videos[0]);
//     // storageService.store(SEARCH_KEY, gSearchCache)
//     // storageService.store(VIDEOS_KEY, videosIds)
//     return videos;
//   });
// }

const videoCache = {}

async function getCachedVideos(keyword) {
  if (
    videoCache[keyword] &&
    Date.now() - videoCache[keyword].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return videoCache[keyword].data
  }

  let videosIds = storageService.load(VIDEOS_KEY) || []
  const res = await axios.get(gUrl + keyword)
  const videos = res.data.items.map((item) => _prepareData(item))

  videoCache[keyword] = {
    timestamp: Date.now(),
    data: videos,
  }

  videosIds.push(videos[0])
  // storageService.store(SEARCH_KEY, gSearchCache)
  // storageService.store(VIDEOS_KEY, videosIds)

  return videos
}

// async function getVideos(keyword, song = null) {
//   if (Array.isArray(keyword)) {
//     const cachedVideos = []
//     const uncachedKeywords = []

//     keyword.forEach((artist) => {
//       if (
//         videoCache[artist] &&
//         Date.now() - videoCache[artist].timestamp < CACHE_EXPIRATION_TIME
//       ) {
//         cachedVideos.push(videoCache[artist].data)
//       } else {
//         uncachedKeywords.push(artist)
//       }
//     })

//     const recommendedSongs = uncachedKeywords.map(async (artist) => {
//       const res = await axios.get(gUrl + artist)
//       const recommendedSong = res.data.items.map((item) => _prepareData(item))
//       videoCache[artist] = {
//         timestamp: Date.now(),
//         data: recommendedSong[0],
//       }
//       return recommendedSong[0]
//     })

//     const recommendedVideos = await Promise.all(recommendedSongs)
//     return cachedVideos.concat(recommendedVideos)
//   }

//   return getCachedVideos(keyword)
// }

const CACHE_KEY = 'recommendedSongsCache'
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000 // 24 hours

async function getVideos(keyword, song = null) {
  if (Array.isArray(keyword)) {
    const cachedVideos = []
    const uncachedKeywords = []
    keyword.forEach((artist) => {
      if (
        videoCache[artist] &&
        Date.now() - videoCache[artist].timestamp < CACHE_EXPIRATION_TIME
      ) {
        cachedVideos.push(videoCache[artist].data)
      } else {
        uncachedKeywords.push(artist)
      }
    })

    const recommendedSongs = await Promise.all(
      uncachedKeywords.map(async (artist) => {
        let cachedSong = getCachedSong(artist)
        if (cachedSong) {
          console.log('cashed')
          return cachedSong
        } else {
          const res = await axios.get(gUrl + artist)
          const recommendedSong = res.data.items.map((item) =>
            _prepareData(item)
          )
          cacheSong(artist, recommendedSong[0])
          console.log('save cashed')
          return recommendedSong[0]
        }
      })
    )

    return cachedVideos.concat(recommendedSongs)
  }

  return getCachedVideos(keyword)
}

function getCachedSong(artist) {
  const cache = getCache()
  if (
    cache &&
    cache[artist] &&
    Date.now() - cache[artist].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return cache[artist].data
  }
  return null
}

function cacheSong(artist, song) {
  const cache = getCache() || {}
  cache[artist] = {
    timestamp: Date.now(),
    data: song,
  }
  setCache(cache)
}

function setVideoIdCache(song, videoId) {
  localStorage.setItem(`${song.artist} - ${song.title}`, videoId)
}

function getVideoIdCache(song) {
  return localStorage.getItem(`${song.artist} - ${song.title}`)
}

function getCache() {
  const cacheJSON = localStorage.getItem(CACHE_KEY)
  return JSON.parse(cacheJSON)
}

function setCache(cache) {
  const cacheJSON = JSON.stringify(cache)
  localStorage.setItem(CACHE_KEY, cacheJSON)
}

function _prepareData(item) {
  return {
    videoId: item.id.videoId,
    title: item.snippet.title,
    imgUrl: item.snippet.thumbnails.default.url,
    addedAt: Date.now(),
    album: item.snippet.title.slice(0, 5),
    artist: item.snippet.title.slice(2, 7),
  }
}

function searchQuery() {
  return Promise.resolve([...gSearchStations])
}

async function userQuery() {
  let loggedinUser = await userService.getLoggedinUser()
  console.log('loggedinUser', loggedinUser)
  const stations = await httpService.get('station')
  console.log('stations', stations)
  const userStations = stations.filter(
    (station) => station.createdBy.fullname === loggedinUser.username
  )
  console.log('userStations', userStations)
  return userStations
}

function query() {
  return httpService.get('station')
}

async function getById(id) {
  return httpService.get(`station/${id}`)
}

async function addSongToStation(stationId, song) {
  return httpService.post(`station/${stationId}/song`, { song })
}

function removeSongFromStation(stationId, songArtist, songTitle) {
  return httpService.delete(
    `station/${stationId}/song/${songArtist}/${songTitle}`
  )
}

async function getSongById(stationId, songId) {
  const station = await getById(stationId)
  const song = station.songs.find((song) => song._id === songId)
  return Promise.resolve({ ...song })
}

async function getRandomSong(stationId) {
  const station = await getById(stationId)
  const length = station.songs.length
  const idx = utilService.getRandomIntInclusive(0, length - 1)
  const song = station.songs[idx]
  return Promise.resolve({ ...song })
}
async function getPrevSong(stationId, songId) {
  let song
  const station = await getById(stationId)
  const idx = station.songs.findIndex((song) => song._id === songId)
  if (idx === 0) song = station.songs[station.length - 1]
  else song = station.songs[idx - 1]

  return Promise.resolve({ ...song })
}
async function getNextSong(stationId, songId) {
  let song
  const station = await getById(stationId)
  const idx = station.songs.findIndex((song) => song._id === songId)
  if (idx === station.length - 1) song = station.songs[0]
  else song = station.songs[idx + 1]
  return Promise.resolve({ ...song })
}

async function getCurrIndex(stationId, songId) {
  const station = await getById(stationId)
  const songIdx = station.songs.findIndex((song) => song._id === songId)
  return Promise.resolve(songIdx)
}

async function remove(stationId) {
  return httpService.delete(`station/${stationId}`)
}
async function save(station) {
  return httpService.put(`station/${station._id}`, station)
}

function getEmptyStation() {
  return {
    model: '',
    type: '',
  }
}

// function _loadStations() {
//   let stations = storageService.load(STORAGE_KEY)
//   if (!stations || !stations.length) stations = gDefaultStations
//   storageService.store(STORAGE_KEY, stations)
//   return stations
// }

function _getUserStations() {
  let stations = storageService.load(USER_STATIONS)
  if (!stations || !stations.length) stations = []
  storageService.store(USER_STATIONS, stations)
  return stations
}

function filterUserStations(userStations, filterBy) {
  let filteredStations = userStations
  switch (filterBy) {
    // case 'Recents':
    //   filteredStations = userStations.filter(station => station.addedAt);
    //   break;
    case 'Recently Added':
      filteredStations = userStations.filter((station) => station.createdAt)
      break
    case 'Alphabetical':
      filteredStations = userStations.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      break
    case 'Creator':
      filteredStations = userStations.sort((a, b) =>
        a.createdBy.fullname.localeCompare(b.creator)
      )
      break
    default:
      break
  }
  return filteredStations
}

function _loadSearchStations() {
  let stations = storageService.load(STORAGE_SEARCH_KEY)
  if (!stations || !stations.length) stations = gSearchCategories
  storageService.store(STORAGE_SEARCH_KEY, stations)
  return stations
}

async function createNewStation(name, songs, url) {
  let loggedinUser = await userService.getLoggedinUser()
  const newStation = {
    imgUrl: url,
    name: name,
    tags: [],
    createdBy: {
      _id: loggedinUser._id,
      fullname: loggedinUser.username,
      imgUrl: '',
    },
    likedByUsers: [],
    songs,
    msgs: [
      {
        id: '',
        from: '',
        txt: '',
      },
    ],
    desc: '',
  }

  return httpService.post('station', newStation)
}

function stationNameClass(station) {
  if (!station.name) return
  const words = station.name.split(' ').length
  if (words <= 3) {
    return 'short-station-name'
  } else if (words <= 5) {
    return 'long-station-name'
  } else {
    return 'huge-station-name'
  }
}

async function updateStation(stationId, songs) {
  const currStation = await getById(stationId)
  if (currStation && currStation._id === stationId) {
    const updatedStation = { ...currStation, songs: songs }
    save(updatedStation)
  } else {
  }
}
// async function editStation(stationId, stationName, stationDesc, stationImg) {
//   const station = await getById(stationId)
//   const idx = gStations.findIndex((s) => s._id === stationId)
//   const userIdx = gUserStations.findIndex((s) => s._id === stationId)
//   if (idx === -1) {
//     console.error('Station with id not found')
//     return null
//   }

//   station.name = stationName
//   station.description = stationDesc
//   station.imgUrl = stationImg

//   const updatedStation = await save(station)

//   gStations[idx] = updatedStation
//   gUserStations[userIdx] = updatedStation
//   storageService.store(STORAGE_KEY, gStations)
//   storageService.store(USER_STATIONS, gUserStations)
//   return Promise.resolve({ ...updatedStation })
// }

async function getRecommendedSongs(station) {
  const songArtists = station.map((song) => song.artist)
  const song = station.map((song) => song)
  return await getVideos(songArtists, song)
}
