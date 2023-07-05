import { httpService } from "./http.service";
import { stationService } from "./station.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUserDetails,
  signupGuest,
  prepareData,
  updateLatestStations,
  updateUser,
  removeSong,
};

window.userService = userService;

function getUsers() {
  return httpService.get(`user`);
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`);

  return user;
}
function remove(userId) {
  return httpService.delete(`user/${userId}`);
}
async function removeSong(songId, user) {
  const updatedUser = await httpService.put(`/user/${user._id}/removeSong`, {
    songId,
  })
  return updatedUser
}

async function update(selectedSong, user) {
  const userCopy = { ...user };

  userCopy.LikedSongs = [...userCopy.LikedSongs, selectedSong];

  const savedUser = await httpService.put(`user/${userCopy._id}`, userCopy);

  if (getLoggedinUser()._id === savedUser._id) saveLocalUser(savedUser);
  return savedUser;
}

async function updateUser(url, user) {
  const userCopy = { ...user };

  userCopy.imgUrl = url;

  const savedUser = await httpService.put(`user/img/${userCopy._id}`, userCopy);

  if (getLoggedinUser()._id === savedUser._id) saveLocalUser(savedUser);
  return savedUser;
}

async function login(userCred) {
  const user = await httpService.post("auth/login", userCred);

  return saveLocalUser(user);
}

async function signup(userCred) {
  if (!userCred.imgUrl) {
    userCred.imgUrl =
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg";
  }
  const user = await httpService.post("auth/signup", userCred);
  return saveLocalUser(user);
}

async function signupGuest(userCred) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userCred));
}

async function logout() {
  return await httpService.post("auth/logout");
}

async function getLoggedinUserDetails() {
  const user = getLoggedinUser();

  if (!user) return null;
  const userDetails = await httpService.get(`user/${user._id}`);
  return userDetails;
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    username: user.username,
    email: user.email,
    stations: [],
    imgUrl:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    LikedSongs: [],
    latestStations: [
      {
        _id: "64284dfe9c77405a15b9a9f6",
        name: "Happy Hits!",
        description: "Hits to boost your mood and fill you with happiness!",
        imgUrl:
          "https://i.scdn.co/image/ab67706f00000003b55b6074da1d43715fc16d6d",
        tags: ["Discover"],
        songs: [
          {
            duration: "2:56",
            addedAt: "2023-03-09T23:00:00Z",
            title: "I'm Good (Blue)",
            artist: "David Guetta",
            album: "I'm Good (Blue)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273933c036cd61cd40d3f17a9c4",
            likedByUsers: [],
          },
          {
            duration: "2:30",
            addedAt: "2023-03-09T23:00:00Z",
            title: "I Ain't Worried",
            artist: "OneRepublic",
            album:
              'I Ain’t Worried (Music From The Motion Picture "Top Gun: Maverick")',
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ec96e006b8bdfc582610ec13",
            likedByUsers: [],
          },
          {
            duration: "2:20",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Players",
            artist: "Coi Leray",
            album: "Players",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2731cf7cf4446b496525e423465",
            likedByUsers: [],
          },
          {
            duration: "2:21",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Shut Me Up",
            artist: "Nicky Youre",
            album: "Shut Me Up",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2735465af6a16e54bdc2de4ab3e",
            likedByUsers: [],
          },
          {
            duration: "3:24",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
            likedByUsers: [],
          },
          {
            duration: "2:55",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Made You Look",
            artist: "Meghan Trainor",
            album: "Takin' It Back",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2731a4f1ada93881da4ca8060ff",
            likedByUsers: [],
          },
          {
            duration: "2:40",
            addedAt: "2023-03-09T23:00:00Z",
            title: "My Stupid Heart",
            artist: "Walk Off the Earth",
            album: "My Stupid Heart",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e7394926d34dc63fa76102a0",
            likedByUsers: [],
          },
          {
            duration: "2:54",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Watermelon Sugar",
            artist: "Harry Styles",
            album: "Fine Line",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a",
            likedByUsers: [],
          },
          {
            duration: "3:07",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Heaven",
            artist: "Niall Horan",
            album: "Heaven",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273723c6c01155c023a9a9f8cf0",
            likedByUsers: [],
          },
          {
            duration: "3:08",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Mother",
            artist: "Meghan Trainor",
            album: "Takin' It Back (Deluxe)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273d5112e087a6ad0aa73f25e12",
            likedByUsers: [],
          },
          {
            duration: "3:58",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Shivers",
            artist: "Ed Sheeran",
            album: "=",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ef24c3fdbf856340d55cfeb2",
            likedByUsers: [],
          },
          {
            duration: "2:31",
            addedAt: "2023-03-09T23:00:00Z",
            title: "If We Ever Broke Up",
            artist: "Mae Stephens",
            album: "If We Ever Broke Up",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273918207ec2316cec13a0e036f",
            likedByUsers: [],
          },
          {
            duration: "4:03",
            addedAt: "2023-03-09T23:00:00Z",
            title: "I'm Not Here To Make Friends",
            artist: "Sam Smith",
            album: "Gloria",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273fc3ff54493fcc890bcaa036c",
            likedByUsers: [],
          },
          {
            duration: "3:18",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Peaches (feat. Daniel Caesar & Giveon)",
            artist: "Justin Bieber",
            album: "Justice",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431",
            likedByUsers: [],
          },
          {
            duration: "4:54",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Pepas",
            artist: "Farruko",
            album: "Pepas",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2734239a6aa89738d8f798168ad",
            likedByUsers: [],
          },
          {
            duration: "2:42",
            addedAt: "2023-03-09T23:00:00Z",
            title: "THATS WHAT I WANT",
            artist: "Lil Nas X",
            album: "MONTERO",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd",
            likedByUsers: [],
          },
          {
            duration: "4:43",
            addedAt: "2023-03-09T23:00:00Z",
            title: "My Universe",
            artist: "Coldplay",
            album: "My Universe",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273f60a9b7e2abafc38da31f575",
            likedByUsers: [],
          },
          {
            duration: "3:17",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Green Green Grass",
            artist: "George Ezra",
            album: "Gold Rush Kid",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ca576b6bbd56385e1120640e",
            likedByUsers: [],
          },
          {
            duration: "4:06",
            addedAt: "2023-03-09T23:00:00Z",
            title: "About Damn Time",
            artist: "Lizzo",
            album: "About Damn Time",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b817e721691aff3d67f26c04",
            likedByUsers: [],
          },
          {
            duration: "4:31",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Uptown Funk (feat. Bruno Mars)",
            artist: "Mark Ronson",
            album: "Uptown Special",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2",
            likedByUsers: [],
          },
          {
            duration: "2:46",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Numb",
            artist: "Marshmello",
            album: "Numb",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2732ff34dbc50313f8cea7b5db5",
            likedByUsers: [],
          },
          {
            duration: "3:44",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Dynamite",
            artist: "BTS",
            album: "BE",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273c07d5d2fdc02ae252fcd07e5",
            likedByUsers: [],
          },
          {
            duration: "3:29",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Music For a Sushi Restaurant",
            artist: "Harry Styles",
            album: "Harry's House",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
            likedByUsers: [],
          },
          {
            duration: "4:17",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Bam Bam (feat. Ed Sheeran)",
            artist: "Camila Cabello",
            album: "Bam Bam (feat. Ed Sheeran)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273364ef5f9057092741f667fea",
            likedByUsers: [],
          },
          {
            duration: "2:49",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Crazy What Love Can Do",
            artist: "David Guetta",
            album: "Crazy What Love Can Do",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273654c0a1cb2c30dd8e11c0186",
            likedByUsers: [],
          },
          {
            duration: "3:15",
            addedAt: "2023-03-09T23:00:00Z",
            title: "2002",
            artist: "Anne-Marie",
            album: "Speak Your Mind (Deluxe)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27338aae75dc37fb42457866ffd",
            likedByUsers: [],
          },
          {
            duration: "2:44",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Sunshine",
            artist: "OneRepublic",
            album: "Sunshine",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2733b248f42fb53c64faf1d748e",
            likedByUsers: [],
          },
          {
            duration: "2:43",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Kings & Queens",
            artist: "Ava Max",
            album: "Heaven & Hell",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2739a95e89d24214b94de36ccf7",
            likedByUsers: [],
          },
          {
            duration: "3:10",
            addedAt: "2023-03-09T23:00:00Z",
            title: "MONTERO (Call Me By Your Name)",
            artist: "Lil Nas X",
            album: "MONTERO",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd",
            likedByUsers: [],
          },
          {
            duration: "3:25",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Hold Me Closer",
            artist: "Elton John",
            album: "Hold Me Closer",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2735d872e7b0c1ba964541f07e8",
            likedByUsers: [],
          },
          {
            duration: "3:20",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Sucker",
            artist: "Jonas Brothers",
            album: "Happiness Begins",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273de1a3a5eaa0c75bb18e7b597",
            likedByUsers: [],
          },
          {
            duration: "3:55",
            addedAt: "2023-03-09T23:00:00Z",
            title: 'Happy - From "Despicable Me 2"',
            artist: "Pharrell Williams",
            album: "G I R L",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e8107e6d9214baa81bb79bba",
            likedByUsers: [],
          },
          {
            duration: "3:09",
            addedAt: "2023-03-09T23:00:00Z",
            title: "2 Be Loved (Am I Ready)",
            artist: "Lizzo",
            album: "Special",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273fe3b1b9cb7183a94e1aafd43",
            likedByUsers: [],
          },
          {
            duration: "2:57",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Friday (feat. Mufasa & Hypeman) - Dopamine Re-Edit",
            artist: "Riton",
            album: "Friday (feat. Mufasa & Hypeman) [Dopamine Re-Edit]",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273815cb538fd7821595b2bc8c5",
            likedByUsers: [],
          },
          {
            duration: "3:37",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Budapest",
            artist: "George Ezra",
            album: "Wanted on Voyage (Expanded Edition)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273d6df3bccf3ec41ea2f76debc",
            likedByUsers: [],
          },
          {
            duration: "3:09",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Queen of Kings",
            artist: "Alessandra",
            album: "Queen of Kings",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2732c9eea7700ceb07c4dabf114",
            likedByUsers: [],
          },
          {
            duration: "4:48",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Castle on the Hill",
            artist: "Ed Sheeran",
            album: "÷ (Deluxe)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
            likedByUsers: [],
          },
          {
            duration: "2:55",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Special (feat. SZA)",
            artist: "Lizzo",
            album: "Special (feat. SZA)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b9041796cb2839e2e89e3ea6",
            likedByUsers: [],
          },
          {
            duration: "3:11",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Where Did You Go? (feat. MNEK)",
            artist: "Jax Jones",
            album: "Where Did You Go (feat. MNEK)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273490a887b85a95378ea66b41d",
            likedByUsers: [],
          },
          {
            duration: "5:16",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Kiss Me More (feat. SZA)",
            artist: "Doja Cat",
            album: "Kiss Me More (feat. SZA)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d56",
            likedByUsers: [],
          },
          {
            duration: "3:26",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Señorita",
            artist: "Shawn Mendes",
            album: "Señorita",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e6095c382c2853667c1623eb",
            likedByUsers: [],
          },
          {
            duration: "3:03",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Butter",
            artist: "BTS",
            album: "Proof",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
            likedByUsers: [],
          },
          {
            duration: "3:31",
            addedAt: "2023-03-09T23:00:00Z",
            title: "You Need To Calm Down",
            artist: "Taylor Swift",
            album: "Lover",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
            likedByUsers: [],
          },
          {
            duration: "2:41",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Hot In It",
            artist: "Tiësto",
            album: "Hot In It",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2731e8798f25a1997f0679b2382",
            likedByUsers: [],
          },
          {
            duration: "2:43",
            addedAt: "2023-03-09T23:00:00Z",
            title: "OUT OUT (feat. Charli XCX & Saweetie)",
            artist: "Joel Corry",
            album: "OUT OUT (feat. Charli XCX & Saweetie)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2730abb7463b44d1be6243642f4",
            likedByUsers: [],
          },
          {
            duration: "2:55",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Better Days (NEIKED x Mae Muller x Polo G)",
            artist: "NEIKED",
            album: "Better Days (NEIKED x Mae Muller x Polo G)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2736b742298f7f36717855c4caf",
            likedByUsers: [],
          },
          {
            duration: "3:01",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Summer of Love (Shawn Mendes & Tainy)",
            artist: "Shawn Mendes",
            album: "Summer Of Love",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273a111c87c210cc9bff93948bd",
            likedByUsers: [],
          },
          {
            duration: "3:41",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Best Day Of My Life",
            artist: "American Authors",
            album: "Oh, What A Life",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273cc761ba55b0e7abad4539abe",
            likedByUsers: [],
          },
          {
            duration: "4:30",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Rasputin",
            artist: "Majestic",
            album: "Rasputin",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273f05cf0af79d057704dc994f4",
            likedByUsers: [],
          },
          {
            duration: "2:20",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Acapulco",
            artist: "Jason Derulo",
            album: "Acapulco",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738544aa5ba43894b7103ec757",
            likedByUsers: [],
          },
          {
            duration: "2:48",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Head & Heart (feat. MNEK)",
            artist: "Joel Corry",
            album: "Head & Heart (feat. MNEK)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27391e93c59bacfe819db9601eb",
            likedByUsers: [],
          },
          {
            duration: "4:02",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Never Gonna Not Dance Again",
            artist: "P!nk",
            album: "Never Gonna Not Dance Again",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273a342edc8d90ae68d99333bab",
            likedByUsers: [],
          },
          {
            duration: "3:02",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Don't Start Now",
            artist: "Dua Lipa",
            album: "Don't Start Now",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738583df1a14bea9175f9ac520",
            likedByUsers: [],
          },
          {
            duration: "2:40",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Remember",
            artist: "Becky Hill",
            album: "Remember",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273fe3a09ccabe5f5e6646f7512",
            likedByUsers: [],
          },
          {
            duration: "3:29",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Heartbreak Anthem (with David Guetta & Little Mix)",
            artist: "Galantis",
            album: "Heartbreak Anthem (with David Guetta & Little Mix)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2731fcd19d56ad06561b76c1665",
            likedByUsers: [],
          },
          {
            duration: "2:53",
            addedAt: "2023-03-09T23:00:00Z",
            title: "My Head & My Heart",
            artist: "Ava Max",
            album: "Heaven & Hell",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2739a95e89d24214b94de36ccf7",
            likedByUsers: [],
          },
          {
            duration: "5:33",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Wings",
            artist: "Jonas Brothers",
            album: "Wings",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273474dfc80905c0ff428aa652d",
            likedByUsers: [],
          },
          {
            duration: "3:43",
            addedAt: "2023-03-09T23:00:00Z",
            title: "I Don't Care (with Justin Bieber)",
            artist: "Ed Sheeran",
            album: "I Don't Care (with Justin Bieber)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27323d36bb2f358094e0271c472",
            likedByUsers: [],
          },
          {
            duration: "4:09",
            addedAt: "2023-03-09T23:00:00Z",
            title: "ME! (feat. Brendon Urie of Panic! At The Disco)",
            artist: "Taylor Swift",
            album: "Lover",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
            likedByUsers: [],
          },
          {
            duration: "3:16",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Whistle (feat. Calum Scott)",
            artist: "Jax Jones",
            album: "Whistle (feat. Calum Scott)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27341b183071eabe1333167ffab",
            likedByUsers: [],
          },
          {
            duration: "3:40",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Shower",
            artist: "Becky G",
            album: "Shower",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273f7f5503cfc6a54d31e65b112",
            likedByUsers: [],
          },
          {
            duration: "2:44",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Love Lost",
            artist: "Mac Miller",
            album: "I Love Life, Thank You",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2732e8e9d480a55d914e1c5ff3b",
            likedByUsers: [],
          },
          {
            duration: "3:11",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Take You Dancing",
            artist: "Jason Derulo",
            album: "Take You Dancing",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27354eab2e4aa8b8706b6b526d2",
            likedByUsers: [],
          },
          {
            duration: "4:22",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Dance Monkey",
            artist: "Tones And I",
            album: "Welcome To The Madhouse (Deluxe)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738e8197111f9d57793a5e7eff",
            likedByUsers: [],
          },
          {
            duration: "2:27",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Betty (Get Money)",
            artist: "Yung Gravy",
            album: "Betty (Get Money)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273633674a4e5072dabf5173069",
            likedByUsers: [],
          },
          {
            duration: "2:49",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Love Grows (Where My Rosemary Goes)",
            artist: "Edison Lighthouse",
            album: "Love Grows (Where My Rosemary Goes) & Other Gems",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2739a0011cc9d31cf969b656905",
            likedByUsers: [],
          },
          {
            duration: "3:10",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Lottery (feat. LU KALA)",
            artist: "Latto",
            album: "Lottery (feat. LU KALA)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273eea05c7a8e47b3b88a09668e",
            likedByUsers: [],
          },
          {
            duration: "4:21",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Higher Love",
            artist: "Kygo",
            album: "Higher Love",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2737c8977a0ad3a3a0627be9ed7",
            likedByUsers: [],
          },
          {
            duration: "2:45",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Dive",
            artist: "Hot Shade",
            album: "Dive",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273c4c0104ba8a799d375aaeb00",
            likedByUsers: [],
          },
          {
            duration: "3:37",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Sweetest Pie",
            artist: "Megan Thee Stallion",
            album: "Sweetest Pie",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738364ea7b6e54e63c82c568cf",
            likedByUsers: [],
          },
          {
            duration: "2:29",
            addedAt: "2023-03-09T23:00:00Z",
            title: "people pleaser",
            artist: "Cat Burns",
            album: "people pleaser / sleep at night",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27378f711930b2e124f883725b4",
            likedByUsers: [],
          },
          {
            duration: "4:20",
            addedAt: "2023-03-09T23:00:00Z",
            title: "3 Nights",
            artist: "Dominic Fike",
            album: "Don't Forget About Me, Demos",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2734a42166d927b3acce345c5c0",
            likedByUsers: [],
          },
          {
            duration: "3:10",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Don’t Wake Me Up",
            artist: "Jonas Blue",
            album: "Don’t Wake Me Up",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2730e3723dac6e7b6c08a553397",
            likedByUsers: [],
          },
          {
            duration: "2:45",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Fancy Like",
            artist: "Walker Hayes",
            album: "Country Stuff The Album",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273cc1ed62132516aabf6ef8751",
            likedByUsers: [],
          },
          {
            duration: "3:41",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Put Your Records On",
            artist: "Ritt Momney",
            album: "Put Your Records On",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273d52d8eb3be188231e120dbbd",
            likedByUsers: [],
          },
          {
            duration: "3:38",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Woke Up in Love",
            artist: "Kygo",
            album: "Woke Up in Love",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2731d31a4969ceaaaa91c52e025",
            likedByUsers: [],
          },
          {
            duration: "3:56",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Anyone For You (Tiger Lily)",
            artist: "George Ezra",
            album: "Gold Rush Kid",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ca576b6bbd56385e1120640e",
            likedByUsers: [],
          },
          {
            duration: "2:58",
            addedAt: "2023-03-09T23:00:00Z",
            title: "AOK",
            artist: "Tai Verdes",
            album: "TV",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273818630bbc67e834cb9a6bd31",
            likedByUsers: [],
          },
          {
            duration: "3:34",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Eyes On You",
            artist: "Nicky Youre",
            album: "Eyes On You",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2734b1e0ce2d6146e24da30229a",
            likedByUsers: [],
          },
          {
            duration: "2:53",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Run",
            artist: "OneRepublic",
            album: "Run",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738120d2b107af14b1bf67cd06",
            likedByUsers: [],
          },
          {
            duration: "2:42",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Dancing In The Moonlight (feat. NEIMY)",
            artist: "Jubël",
            album: "Dancing In The Moonlight (feat. NEIMY)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2736db52dfa1ca09784ab0bd6e1",
            likedByUsers: [],
          },
          {
            duration: "3:48",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Beautiful People (feat. Khalid)",
            artist: "Ed Sheeran",
            album: "Beautiful People (feat. Khalid)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273358f874d5d31e76a8fe3f6d0",
            likedByUsers: [],
          },
          {
            duration: "2:52",
            addedAt: "2023-03-09T23:00:00Z",
            title: "I Forgot That You Existed",
            artist: "Taylor Swift",
            album: "Lover",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
            likedByUsers: [],
          },
          {
            duration: "4:24",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Anyone",
            artist: "Justin Bieber",
            album: "Anyone",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2734b02db5cefb177ff97346cf2",
            likedByUsers: [],
          },
          {
            duration: "2:25",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Magic In The Hamptons (feat. Lil Yachty)",
            artist: "Social House",
            album: "Magic In The Hamptons (feat. Lil Yachty)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273013314e9861a2c4a796b2176",
            likedByUsers: [],
          },
          {
            duration: "4:46",
            addedAt: "2023-03-09T23:00:00Z",
            title:
              "CAN'T STOP THE FEELING! (from DreamWorks Animation's \"TROLLS\")",
            artist: "Justin Timberlake",
            album: "TROLLS (Original Motion Picture Soundtrack)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273d965d29d7dcf46ade5a8a7e4",
            likedByUsers: [],
          },
          {
            duration: "2:37",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Cover Me In Sunshine",
            artist: "P!nk",
            album: "Cover Me In Sunshine",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e465904fbcc8de1920c60867",
            likedByUsers: [],
          },
          {
            duration: "2:44",
            addedAt: "2023-03-09T23:00:00Z",
            title: "This Feeling",
            artist: "The Chainsmokers",
            album: "Sick Boy",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738e26bf4293c9da7a6439607b",
            likedByUsers: [],
          },
          {
            duration: "3:47",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Dancing Feet (feat. DNCE)",
            artist: "Kygo",
            album: "Dancing Feet (feat. DNCE)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273c8737379745bc811274e300a",
            likedByUsers: [],
          },
          {
            duration: "3:45",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Potion (with Dua Lipa & Young Thug)",
            artist: "Calvin Harris",
            album: "Potion (with Dua Lipa & Young Thug)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273210dbb988be90592f4e0a4bd",
            likedByUsers: [],
          },
          {
            duration: "3:28",
            addedAt: "2023-03-09T23:00:00Z",
            title: "2step",
            artist: "Ed Sheeran",
            album: "=",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ef24c3fdbf856340d55cfeb2",
            likedByUsers: [],
          },
          {
            duration: "3:09",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Rain On Me (with Ariana Grande)",
            artist: "Lady Gaga",
            album: "Rain On Me (with Ariana Grande)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273c8583f0bd97d3042d4971acf",
            likedByUsers: [],
          },
          {
            duration: "2:12",
            addedAt: "2023-03-09T23:00:00Z",
            title: "SAD B!TCH",
            artist: "Anne-Marie",
            album: "SAD B!TCH",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27366245b5643c5a9dd16e67a37",
            likedByUsers: [],
          },
          {
            duration: "2:59",
            addedAt: "2023-03-09T23:00:00Z",
            title: "KESI - Remix",
            artist: "Camilo",
            album: "KESI (Remix)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273bec684438c0610c1caab0198",
            likedByUsers: [],
          },
          {
            duration: "3:38",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Call You Mine",
            artist: "The Chainsmokers",
            album: "World War Joy",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2735e90ff76fd49a23f7333de76",
            likedByUsers: [],
          },
          {
            duration: "4:17",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Higher Power",
            artist: "Coldplay",
            album: "Higher Power",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b1092c02972b0bfd91703f75",
            likedByUsers: [],
          },
          {
            duration: "3:41",
            addedAt: "2023-03-09T23:00:00Z",
            title: "What A Man Gotta Do",
            artist: "Jonas Brothers",
            album: "What A Man Gotta Do",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2737a73cc006248544e1a9882ea",
            likedByUsers: [],
          },
          {
            duration: "4:15",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Jerusalema (feat. Nomcebo Zikode)",
            artist: "Master KG",
            album: "Jerusalema",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2736515ccf763fb998671f6eec4",
            likedByUsers: [],
          },
          {
            duration: "3:50",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Follow Me",
            artist: "Sam Feldt",
            album: "Follow Me",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273768c262077eb6de3cce11775",
            likedByUsers: [],
          },
          {
            duration: "1:58",
            addedAt: "2023-03-09T23:00:00Z",
            title: "Wellerman - Sea Shanty / 220 KID x Billen Ted Remix",
            artist: "Nathan Evans",
            album: "Wellerman (Sea Shanty / 220 KID x Billen Ted Remix)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b55f1a2f0299d6525c6ac99e",
            likedByUsers: [],
          },
        ],
        createdBy: {
          _id: "u101",
          fullname: "system",
          imgUrl: "http://some-photo/",
        },
        likedByUsers: [],
      },
      {
        _id: ("64285e9fe9f8c25595bf61db"),
        name: "borderless",
        description:
          "Beyond genre, beyond language, beyond borders. Cover: Cariño with Girl Ultra.",
        imgUrl:
          "https://i.scdn.co/image/ab67706f00000003392404630a7069e5ea1f4f0e",
        tags: ["Alternative"],
        createdBy: {
          _id: "u101",
          fullname: "system",
          imgUrl: "http://some-photo/",
        },
        songs: [
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Cherry Wine",
            artist: "grentperez",
            album: "Cherry Wine",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273136ef277a0791089f46628bb",
            likedByUsers: [],
            _id: ("64a2a8fd7ca50fa6a1cf1bb1"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Going Kokomo",
            artist: "Royel Otis",
            album: "Sofa Kings",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273dc0b3a1b184a7fb490488a26",
            likedByUsers: [],
            _id: ("64a2a8fd7ca50fa6a1cf1bb2"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Something About You",
            artist: "Eyedress",
            album: "Mulholland Drive",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2735088565ff98ae4246ba44255",
            likedByUsers: [],
            _id: ("64a2a8fd7ca50fa6a1cf1bb3"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Locochona",
            artist: "Cariño",
            album: "Locochona",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27354d552e7266f5f97cbae1b13",
            likedByUsers: [],
            _id: ("64a2a8fd7ca50fa6a1cf1bb4"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Boy's a liar",
            artist: "PinkPantheress",
            album: "Boy's a liar",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2735911dc1602a9d100ebe955fc",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bb5"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Always on My Mind",
            artist: "Roller Derby",
            album: "Always on My Mind",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e6d747cd26b2ec8fd37553ba",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bb6"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "spin you round",
            artist: "Rocco",
            album: "spin you round",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273973221e4cc9fe05c95d24d67",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bb7"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "nudis",
            artist: "VINI",
            album: "nudis",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2733b1a176a588505cae12e4ae0",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bb8"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Ribbons",
            artist: "Ryan Beatty",
            album: "Ribbons",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ac1b309183ea5390c95a7e6f",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bb9"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "ganas",
            artist: "Vic Mirallas",
            album: "ganas",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2732c2059faa884c356da1d680b",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bba"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Dancing with my phone",
            artist: "HYBS",
            album: "Dancing with my phone",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273dfcf6d72e22bd972dfdcad84",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bbb"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "+1",
            artist: "Super Plage",
            album: "Magie à minuit",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b9aa7839fd7f30a01ebb8e81",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bbc"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "late nite",
            artist: "VINI",
            album: "late nite",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ea7e45ceb9ccea3868d28e92",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bbd"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "reveal yourself",
            artist: "NOIA",
            album: "reveal yourself",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738ad094e9715c52089f76a134",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bbe"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Alegría",
            artist: "Morreo",
            album: "Alegría",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273dcef3b7304c1c9578ff0515d",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bbf"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Lovesong",
            artist: "beabadoobee",
            album: "Lovesong",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ba45d6775fff9d42bdf6d166",
            likedByUsers: [],
            _id: ("64a2a8fe7ca50fa6a1cf1bc0"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Barcelona",
            artist: "Tagua Tagua",
            album: "Tanto",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273349a029a072aeda5f4044f58",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc1"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "l-o-v-e",
            artist: "Rocco",
            album: "l-o-v-e",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2733067e9343ed7c3cca9f80f01",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc2"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Evangeline",
            artist: "Stephen Sanchez",
            album: "Evangeline",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273c87fb8ff735c907745bca335",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc3"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Old With You",
            artist: "grentperez",
            album: "Old With You",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27352017bf910175a4c3eb75912",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc4"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Action Figures Fighting",
            artist: "Hotel Ugly",
            album: "Action Figures Fighting",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b2e808ad9d4c5e6442c405aa",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc5"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Would You Mind",
            artist: "HYBS",
            album: "Making Steak",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2731d41de38bfa654a630cfb07a",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc6"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Si Me Voy (with The Marías)",
            artist: "Cuco",
            album: "Si Me Voy (with The Marías)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27314a012da5638f895eaefffa5",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc7"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "qué voy a hacer",
            artist: "shego",
            album: "qué voy a hacer",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27318cd5f1b3e3b4086809b6aea",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc8"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Glue Song",
            artist: "beabadoobee",
            album: "Glue Song",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e3862aeefcb2f0860ef017e4",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bc9"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "missin something",
            artist: "Zach Templar",
            album: "orange blood",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27378b198963f59d45b2be5b495",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bca"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Jolly - Sped Up",
            artist: "Tappahall",
            album: "Jolly (Expansion Pack)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2731c29a7bed4ba51e9c328103e",
            likedByUsers: [],
            _id: ("64a2a8ff7ca50fa6a1cf1bcb"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "James Dean",
            artist: "Tash Sultana",
            album: "James Dean",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27317814c8166f2f1cce9642f40",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bcc"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Agüita E",
            artist: "El General Villamil",
            album: "Agüita E",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2733342e5421d8c2e9187dc01ce",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bcd"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "A veces caigo",
            artist: "toorai",
            album: "A veces caigo",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27378f1788eebba0c2c3b920bce",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bce"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Ciudad Espanto",
            artist: "Lolabúm",
            album: "Muchachito Roto",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2737013150992ee8776ab7ec437",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bcf"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Al Cien",
            artist: "Dromedarios Mágicos",
            album: "Al Cien",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273f63c5275e80c4a1685da40e6",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bd0"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "brujita",
            artist: "rusowsky",
            album: "BABAYAGA",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b97e717f67afd391f2382c21",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bd1"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Healing House",
            artist: "Phum Viphurit",
            album: "The Greng Jai Piece",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27331bfb9f5f86f7ad346a4ff52",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bd2"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Ring of Past",
            artist: "Men I Trust",
            album: "Ring of Past",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27391af13aed43a3e59e05e5fb4",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bd3"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "All We Wanna Do",
            artist: "Valeria Stoica",
            album: "All We Wanna Do",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ac98732dfa8a74ada6ba4f21",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bd4"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Laurence",
            artist: "Super Plage",
            album: "Laurence",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27392618117fe087c348fbb7b76",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bd5"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "blood pareil",
            artist: "comment debord",
            album: "blood pareil",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ee6df46796f761647e694675",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bd6"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Get Up",
            artist: "KIKI",
            album: "Get Up",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ee2dbb6dbc10075eff3c311e",
            likedByUsers: [],
            _id: ("64a2a9007ca50fa6a1cf1bd7"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Me Today",
            artist: "Wez Atlas",
            album: "Me Today",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2736df66d1718bf6f69f92e16e1",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1bd8"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "⟡ solitude ⟡",
            artist: "Kora",
            album: "⟡ solitude ⟡",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ff08d539e4c554cff2524cc4",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1bd9"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Notice Me",
            artist: "Peach Luffe",
            album: "Notice Me",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b325e0d52b93b0b4a1e7f109",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1bda"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Galatea",
            artist: "IkeN",
            album: "Galatea",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27302288b5985757dec377eb095",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1bdb"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Solo me gustas cuando yo te gusto a ti",
            artist: "Ganges",
            album: "Solo me gustas cuando yo te gusto a ti",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27311cb3aad3529ef48e2e1ca41",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1bdc"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "del mar county fair 2008",
            artist: "Cavetown",
            album: "del mar county fair 2008",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27302198296ea024ee64aa0d303",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1bdd"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Pineapple Sunrise",
            artist: "Beach Weather",
            album: "Pineapple Sunrise",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273a03e3d24ccee1c370899c342",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1bde"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Mr. Daydream",
            artist: "Mai Davika",
            album: "Mr. Daydream",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27378dd15348367473b6850e13e",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1bdf"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Globus",
            artist: "Renaldo & Clara",
            album: "Globus",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273a535945e04d751378e470ce3",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1be0"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Pyjamas (feat. Remi Wolf)",
            artist: "Benny Sings",
            album: "Pyjamas (feat. Remi Wolf)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e2720633bcf81d01c3c9a58d",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1be1"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Viene y va",
            artist: "Ev",
            album: "Viene y va",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273597c04a84901d02c47d9a5cb",
            likedByUsers: [],
            _id: ("64a2a9017ca50fa6a1cf1be2"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Love Me For Tonight",
            artist: "Oskar Haag",
            album: "Love Me For Tonight",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2739182539f721bead50f78ab17",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1be3"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "NO TE ALEJES",
            artist: "Ainda",
            album: "TE QUIERO",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2733c40c04faeeaf4688005a7c5",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1be4"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Lady of Mine",
            artist: "Baseball Gregg",
            album: "Selected Covers (2016-2022)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273f0997d8005604f79f320cf8a",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1be5"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "flame",
            artist: "strongboi",
            album: "strongboi",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2738d82a6105e7a865692a567e8",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1be6"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Panic Attack",
            artist: "khai dreams",
            album: "Panic Attack",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273652265bc4396fe8be0cb027b",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1be7"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Porn Magazines",
            artist: "Prim",
            album: "Porn Magazines",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27339cb680019499e8761614d33",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1be8"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Alex",
            artist: "Robert Robert",
            album: "Alex",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273985329b2ccfef66d57afb4ca",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1be9"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Üzgün",
            artist: "Lin Pesto",
            album: "Üzgün",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e8e7f80bfd0156d85b55ba28",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1bea"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "REPROGRAMAR",
            artist: "Vanessa Zamora",
            album: "DAMALEONA",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273846eb31916616398c09cea20",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1beb"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Pictures of You",
            artist: "Drugdealer",
            album: "Hiding in Plain Sight",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27395e4d0491463b2dbff0d30a8",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1bec"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Casino",
            artist: "Eira",
            album: "Casino",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2737e90b4c5da0545ff29ed04ba",
            likedByUsers: [],
            _id: ("64a2a9027ca50fa6a1cf1bed"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Closure",
            artist: "M. Rumbi",
            album: "Closure",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273a6fce4e20fbfc052df2ec90b",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bee"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Feather",
            artist: "Sabrina Carpenter",
            album: "emails i can’t send fwd:",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2730f45623be014a592a5815827",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bef"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Going On (feat. Bickleboy & Nana Lourdes)",
            artist: "Billy Lemos",
            album: "Going On (feat. Bickleboy & Nana Lourdes)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b8a53284fa8bbf35b6c2d146",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf0"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Não Fui Feito Para Amar",
            artist: "Montanha Mágica",
            album: "Não Fui Feito Para Amar",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273d0beeb30c24ada9a7cff8b30",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf1"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Bałtyk",
            artist: "Bovska",
            album: "Bałtyk",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2733ce92aa43342be0f14eba9ef",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf2"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "therapist",
            artist: "Cupnoodle",
            album: "therapist",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273530cfaa1a0e2729d8dde1879",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf3"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Cuánto tiempo queda",
            artist: "Ire",
            album: "Cuánto tiempo queda",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273fa270403b157b2d81eeec640",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf4"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Take My Hug",
            artist: "thepicnik",
            album: "Take My Hug",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2732872e9012b3356f4d171e7a1",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf5"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Everybody Loves Sad Songs",
            artist: "Persian Pelican",
            album: "Everybody Loves Sad Songs",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b69cf2b0e98e4787451d34c2",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf6"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Shorty 2",
            artist: "Lolabúm",
            album: "Shorty 2",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273d0d3a5091b334722a97e0693",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf7"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Différent de toi",
            artist: "Zoo Baby",
            album: "Différent de toi",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273091fb95121288ee459422b48",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf8"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Just Say It (feat. Johnny Yukon)",
            artist: "Lou Val",
            album: "Just Say It (feat. Johnny Yukon)",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27355ef0d3afb68a23cbdf0ddcd",
            likedByUsers: [],
            _id: ("64a2a9037ca50fa6a1cf1bf9"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "The Will",
            artist: "Valeria Stoica",
            album: "The Will",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2739d2815d616f5bd0df2c1fc4d",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1bfa"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Daydreaming",
            artist: "The Big Moon",
            album: "Daydreaming",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2737121f36d37ce5daa69552520",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1bfb"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Shame",
            artist: "Huntly",
            album: "Sentimental Still",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27334b4dbf412d15bad0eab6178",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1bfc"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "LAB",
            artist: "Bulgarian Cartrader",
            album: "LAB",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ebf38e7d76261031d23ae86d",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1bfd"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Stay Awake",
            artist: "Mia Wray",
            album: "Stay Awake",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273a39038629e36386556c93362",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1bfe"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Sunset on the Sea",
            artist: "gencry",
            album: "Sunset on the Sea",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27399cf1c5f52a657d3bf2e5ec4",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1bff"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Todai",
            artist: "Bialystocks",
            album: "Quicksand",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273b017986e489a7639ec4389b1",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1c00"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Say My Name",
            artist: "Sophie Lindinger",
            album: "Say My Name",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b27306a62a2ac763e505418e1e2c",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1c01"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "you make me miserable",
            artist: "Karin Ann",
            album: "you make me miserable",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2735e2cd6c0f57dd85ec16f8cdd",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1c02"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Soon You're Gonna Know",
            artist: "Kinneret",
            album: "Soon You're Gonna Know",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2732df7bb9012bb271f99bf5b6a",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1c03"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "burning love letters",
            artist: "april june",
            album: "burning love letters",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273bb67162b6de3c20c601b3757",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1c04"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "What If",
            artist: "Petit Desk",
            album: "What If",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2732268474f8b7170e3236d9bb6",
            likedByUsers: [],
            _id: ("64a2a9047ca50fa6a1cf1c05"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Good Care",
            artist: "HYBS",
            album: "Good Care",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273977781551c577ba4ca24af85",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c06"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "non zero sum game",
            artist: "She Her Her Hers",
            album: "non zero sum game",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273c255e8c3907c92fbdefda5b5",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c07"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Go",
            artist: "Kan Sano",
            album: "Go",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2733eeddfe708943ba9c99087ea",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c08"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Rockstar",
            artist: "BoyWithUke",
            album: "Rockstar",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273701d2432b9999ad82587e479",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c09"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "daydreaming",
            artist: "Foudeqush",
            album: "daydreaming",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273bb218cbac586568796bd2fec",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c0a"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Demasiada velocidad",
            artist: "Maīa",
            album: "Demasiada velocidad",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273e224f7619e30b3e76e7b38f9",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c0b"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Outplayed",
            artist: "M. Rumbi",
            album: "Outplayed",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273ebc40b2396db6de5fee21fb9",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c0c"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "All Night Long",
            artist: "Zoo Baby",
            album: "Volume 2",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b273fe7f09a4c1aa960ede6f285d",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c0d"),
          },
          {
            addedAt: "2023-03-31T06:00:00Z",
            title: "Feelin' Blue",
            artist: "BALTHVS",
            album: "Feelin' Blue",
            imgUrl:
              "https://i.scdn.co/image/ab67616d0000b2731a751b496338954a5f5a471c",
            likedByUsers: [],
            _id: ("64a2a9057ca50fa6a1cf1c0e"),
          },
        ],
      },
      {
        "_id" : ("642878301d8b8c67dc681cad"),
        "name" : "phonk",
        "description" : "the beat of your drift",
        "imgUrl" : "https://i.scdn.co/image/ab67706f0000000365484dbf534bb6df774e75ee",
        "tags" : [
            "Dance-Electronic"
        ],
        "createdBy" : {
            "_id" : "u101",
            "fullname" : "system",
            "imgUrl" : "http://some-photo/"
        },
        "likedByUsers" : [
    
        ],
        "songs" : [
            {
                "addedAt" : "2022-05-20T10:12:52Z",
                "title" : "METAMORPHOSIS",
                "artist" : "INTERWORLD",
                "album" : "METAMORPHOSIS",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b852a616ae3a49a1f6b0f16e",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa5f7ca50fa6a1cf2b25")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "Murder In My Mind",
                "artist" : "Kordhell",
                "album" : "Murder In My Mind",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2731440ffaa43c53d65719e0150",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa5f7ca50fa6a1cf2b26")
            },
            {
                "addedAt" : "2022-10-14T08:20:18Z",
                "title" : "GigaChad Theme - Phonk House Version",
                "artist" : "g3ox_em",
                "album" : "GigaChad Theme (Phonk House Version)",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ddff87d44e3d726372ef7f56",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa5f7ca50fa6a1cf2b27")
            },
            {
                "addedAt" : "2022-12-30T05:01:00Z",
                "title" : "GHOST!",
                "artist" : "phonk.me",
                "album" : "GHOST!",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27363392de372fd2ee2822717ea",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa5f7ca50fa6a1cf2b28")
            },
            {
                "addedAt" : "2022-08-19T05:11:18Z",
                "title" : "SHADOW",
                "artist" : "ONIMXRU",
                "album" : "SHADOW",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27399fbaa282e2f0b28fc383a06",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa5f7ca50fa6a1cf2b29")
            },
            {
                "addedAt" : "2022-09-02T08:01:31Z",
                "title" : "Crystals",
                "artist" : "Isolate.exe",
                "album" : "Crystals",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27397ec3691a89dfb9e05792a0b",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa5f7ca50fa6a1cf2b2a")
            },
            {
                "addedAt" : "2022-10-14T08:20:18Z",
                "title" : "DEMONS IN MY SOUL",
                "artist" : "SCXR SOUL",
                "album" : "DEMONS IN MY SOUL",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d7a9d97eb74cf7e3c4aaf9aa",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa5f7ca50fa6a1cf2b2b")
            },
            {
                "addedAt" : "2022-10-28T04:01:00Z",
                "title" : "WORTH NOTHING - Fast & Furious: Drift Tape/Phonk Vol 1",
                "artist" : "TWISTED",
                "album" : "WORTH NOTHING (Fast & Furious: Drift Tape/Phonk Vol 1)",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a6fb54b3fe850150c61e5980",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b2c")
            },
            {
                "addedAt" : "2022-11-11T07:32:56Z",
                "title" : "Scopin",
                "artist" : "Kordhell",
                "album" : "Scopin",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736193e56a57682a68c2cd0808",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b2d")
            },
            {
                "addedAt" : "2022-04-13T07:53:17Z",
                "title" : "RAVE",
                "artist" : "Dxrk ダーク",
                "album" : "RAVE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273144fcad8ffb348edefb9e851",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b2e")
            },
            {
                "addedAt" : "2022-06-10T07:37:37Z",
                "title" : "NEON BLADE",
                "artist" : "MoonDeity",
                "album" : "NEON BLADE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27333364d6b6fd36894f1a3b506",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b2f")
            },
            {
                "addedAt" : "2022-05-20T10:12:52Z",
                "title" : "vendetta!",
                "artist" : "MUPP",
                "album" : "vendetta!",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27345de6f708fe45e7db8d091db",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b30")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "Live Another Day",
                "artist" : "Kordhell",
                "album" : "Phonkageddon",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273cc319cc65277ea17783dca6b",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b31")
            },
            {
                "addedAt" : "2022-08-05T04:01:00Z",
                "title" : "SUNRISE (Slowed + Reverb)",
                "artist" : "Xantesha",
                "album" : "SUNRISE (Slowed + Reverb)",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273747e65c4c7def3b336bb2205",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b32")
            },
            {
                "addedAt" : "2022-12-16T08:06:05Z",
                "title" : "Slapper - Fast & Furious: Drift Tape/Phonk Vol 1",
                "artist" : "DVRST",
                "album" : "Slapper (Fast & Furious: Drift Tape/Phonk Vol 1)",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27381a1feb2d9b901bf8b4d6015",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b33")
            },
            {
                "addedAt" : "2022-05-20T10:12:52Z",
                "title" : "MIDNIGHT",
                "artist" : "PLAYAMANE",
                "album" : "MIDNIGHT",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27317a08c20deadefc069016642",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b34")
            },
            {
                "addedAt" : "2022-12-23T06:25:48Z",
                "title" : "Disaster's End",
                "artist" : "KSLV Noh",
                "album" : "Disaster's End",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273595bfe99eb20118a8a5025fc",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b35")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "Sahara",
                "artist" : "Hensonn",
                "album" : "Sahara",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27383bd1e120f8b14407fe73816",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b36")
            },
            {
                "addedAt" : "2023-02-10T16:54:18Z",
                "title" : "Attack of the Killer Beast (Phonk)",
                "artist" : "SXCREDMANE",
                "album" : "Attack of the Killer Beast (Phonk)",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c769454fcad20faa5017351f",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa607ca50fa6a1cf2b37")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "AVOID ME",
                "artist" : "KUTE",
                "album" : "AVOID ME",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e9cdae5920ca19b2b6dd6daf",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b38")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "Override",
                "artist" : "KSLV Noh",
                "album" : "Override",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2733b32c423930bf6fcff23f175",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b39")
            },
            {
                "addedAt" : "2021-07-02T08:33:01Z",
                "title" : "Close Eyes",
                "artist" : "DVRST",
                "album" : "Close Eyes",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27311447aead485afd7c57aa042",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b3a")
            },
            {
                "addedAt" : "2023-02-04T02:41:25Z",
                "title" : "Brazilian Phonk Mano",
                "artist" : "Slowboy",
                "album" : "Brazilian Phonk Mano",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273206aec417da1973685825ee3",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b3b")
            },
            {
                "addedAt" : "2023-02-17T15:31:33Z",
                "title" : "The Perfect Phonk",
                "artist" : "Lorean",
                "album" : "The Perfect Phonk",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273376e33b01d2a4e135ec70266",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b3c")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "Why Not",
                "artist" : "Ghostface Playa",
                "album" : "Why Not",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27367e4046891a0207cd9e27574",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b3d")
            },
            {
                "addedAt" : "2023-02-10T16:54:18Z",
                "title" : "COWBELL GOTH",
                "artist" : "DRAGONMANE",
                "album" : "COWBELL GOTH",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273bfa9b9952e389c8ba0ec7c66",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b3e")
            },
            {
                "addedAt" : "2022-12-09T08:15:38Z",
                "title" : "Flare",
                "artist" : "Hensonn",
                "album" : "Flare",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c0214c64c422d07ed007ce43",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b3f")
            },
            {
                "addedAt" : "2023-01-06T05:01:00Z",
                "title" : "MURDER PLOT",
                "artist" : "Kordhell",
                "album" : "MURDER PLOT",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2731b8344b543d7a6e7c04ac7d4",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b40")
            },
            {
                "addedAt" : "2022-06-17T04:02:00Z",
                "title" : "COWBELL WARRIOR!",
                "artist" : "SXMPRA",
                "album" : "COWBELL WARRIOR!",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2738319e776d5f701e35582fe90",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa617ca50fa6a1cf2b41")
            },
            {
                "addedAt" : "2021-05-12T14:02:59Z",
                "title" : "Phonky Town",
                "artist" : "PlayaPhonk",
                "album" : "Phonky Town",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273f13c87b29acce422dbab4cac",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa627ca50fa6a1cf2b42")
            },
            {
                "addedAt" : "2023-03-17T15:27:46Z",
                "title" : "POOR",
                "artist" : "gqtis",
                "album" : "POOR",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273adf806e8e9d8b369b9a103cd",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa627ca50fa6a1cf2b43")
            },
            {
                "addedAt" : "2022-11-18T07:52:46Z",
                "title" : "Phonk Drift",
                "artist" : "VØJ",
                "album" : "Phonk Drift",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27383fdbf49b3cd7216df3009e4",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa627ca50fa6a1cf2b44")
            },
            {
                "addedAt" : "2023-02-17T15:31:33Z",
                "title" : "help urself",
                "artist" : "HXI",
                "album" : "help urself",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e9a7d42daa4cc38639a78f50",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa627ca50fa6a1cf2b45")
            },
            {
                "addedAt" : "2022-09-23T07:48:31Z",
                "title" : "WAKE UP!",
                "artist" : "MoonDeity",
                "album" : "WAKE UP!",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a3a0d9665cc88b29b1d69f8f",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa627ca50fa6a1cf2b46")
            },
            {
                "addedAt" : "2022-09-02T08:01:31Z",
                "title" : "Step Back!",
                "artist" : "1nonly",
                "album" : "Step Back!",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273da044bcfd7538fda65e3a7fc",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa627ca50fa6a1cf2b47")
            },
            {
                "addedAt" : "2022-11-18T07:52:46Z",
                "title" : "PSYCHO CRUISE",
                "artist" : "ONIMXRU",
                "album" : "PSYCHO CRUISE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739073535218e4738c94516416",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa637ca50fa6a1cf2b48")
            },
            {
                "addedAt" : "2022-12-09T08:15:38Z",
                "title" : "classical phonk",
                "artist" : "0to8",
                "album" : "classical phonk",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c45274c1504f0817f4af977a",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa637ca50fa6a1cf2b49")
            },
            {
                "addedAt" : "2023-03-31T15:56:27Z",
                "title" : "Puncher",
                "artist" : "Hensonn",
                "album" : "Puncher",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273f7c79ce5611db5c9db0ca2e4",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa637ca50fa6a1cf2b4a")
            },
            {
                "addedAt" : "2022-09-16T05:48:48Z",
                "title" : "Phonky Tribu",
                "artist" : "Funk Tribu",
                "album" : "The Midnight Club GT",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c8e3aa03baa8787b55481109",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa637ca50fa6a1cf2b4b")
            },
            {
                "addedAt" : "2023-02-04T02:41:25Z",
                "title" : "SMOKE IT OFF!",
                "artist" : "Lumi Athena",
                "album" : "SMOKE IT OFF!",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273f8687c2b6a7a900d9d859733",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa637ca50fa6a1cf2b4c")
            },
            {
                "addedAt" : "2021-05-12T14:02:59Z",
                "title" : "SUICIDE YEAR",
                "artist" : "WEEDMANE",
                "album" : "SUICIDE YEAR",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2734b3656b847d344d9ad53be34",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa637ca50fa6a1cf2b4d")
            },
            {
                "addedAt" : "2023-03-10T18:25:06Z",
                "title" : "JUDAS",
                "artist" : "SAY3AM",
                "album" : "JUDAS",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736c5e54ae3a072b387ae023a9",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa637ca50fa6a1cf2b4e")
            },
            {
                "addedAt" : "2022-04-06T13:12:47Z",
                "title" : "Disaster",
                "artist" : "KSLV Noh",
                "album" : "Disaster",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2731115e7ebc1eae4e6b9027de6",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa637ca50fa6a1cf2b4f")
            },
            {
                "addedAt" : "2023-02-10T16:54:18Z",
                "title" : "RAPTURE",
                "artist" : "INTERWORLD",
                "album" : "RAPTURE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2738009bc75188384c8b65fef4f",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b50")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "PRINCE OF DARKNESS",
                "artist" : "SHADXWBXRN",
                "album" : "PRINCE OF DARKNESS",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d77c40422d515c06fb2972e9",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b51")
            },
            {
                "addedAt" : "2023-01-06T05:01:00Z",
                "title" : "Take Me Home",
                "artist" : "Maikubi",
                "album" : "Take Me Home",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273af2a4e29c4f76506f3d79870",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b52")
            },
            {
                "addedAt" : "2023-02-04T02:41:25Z",
                "title" : "Deadly Vice",
                "artist" : "MUPP",
                "album" : "Deadly Vice",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27394aef8d15512446e4945b79b",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b53")
            },
            {
                "addedAt" : "2023-02-04T02:41:25Z",
                "title" : "Broken Lady",
                "artist" : "VØJ",
                "album" : "Broken Lady",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273bde1bedb653bb4a7c31c2460",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b54")
            },
            {
                "addedAt" : "2023-02-24T18:04:36Z",
                "title" : "Stressed Out",
                "artist" : "SCXLETTE",
                "album" : "Stressed Out",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ec088cc1cd97c7f54178c11e",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b55")
            },
            {
                "addedAt" : "2022-12-09T08:15:38Z",
                "title" : "HIMARS",
                "artist" : "SCXR SOUL",
                "album" : "Himars",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273f74a1401e5e3876670937b03",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b56")
            },
            {
                "addedAt" : "2023-02-17T15:31:33Z",
                "title" : "Laidback",
                "artist" : "Memphis Cult",
                "album" : "Memphis Cult Halloween Edition, Vol. 1",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27316bf5f521ad10bcf6ea8a899",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b57")
            },
            {
                "addedAt" : "2023-03-03T17:41:53Z",
                "title" : "BLOOD RITE",
                "artist" : "Scythermane",
                "album" : "BLOOD RITE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273df5bcbd5072caf4c648c1d9f",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa647ca50fa6a1cf2b58")
            },
            {
                "addedAt" : "2023-03-31T15:56:27Z",
                "title" : "RITMADINHA DANÇANTE",
                "artist" : "DJ GUDOG",
                "album" : "RITMADINHA DANÇANTE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d8d87777f7d539ff4272ccdf",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b59")
            },
            {
                "addedAt" : "2022-09-02T08:01:31Z",
                "title" : "|BONKERS|",
                "artist" : "staplegun",
                "album" : "|BONKERS|",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27345e58675b8c3378390e125f7",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b5a")
            },
            {
                "addedAt" : "2022-12-02T08:05:12Z",
                "title" : "Mom's Here",
                "artist" : "TTM",
                "album" : "Mom's Here",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a5a3f93ef08dd2f0350150d5",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b5b")
            },
            {
                "addedAt" : "2023-02-24T18:04:36Z",
                "title" : "STARFALL",
                "artist" : "MoonDeity",
                "album" : "STARFALL",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273534dd0330f25c2d439af45ea",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b5c")
            },
            {
                "addedAt" : "2023-02-10T16:54:18Z",
                "title" : "MOZART PHONK",
                "artist" : "NUEKI",
                "album" : "MOZART PHONK",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273459ff1ea676fea1fed8d581c",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b5d")
            },
            {
                "addedAt" : "2023-03-10T18:25:06Z",
                "title" : "ANGRY BIRDS PHONK",
                "artist" : "RXDXVIL",
                "album" : "Angry Birds Phonk",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27323ca6c60326c56cb01a058c5",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b5e")
            },
            {
                "addedAt" : "2023-03-10T18:25:06Z",
                "title" : "DRIVE",
                "artist" : "MoonDeity",
                "album" : "DRIVE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273bbf48175a5422669bcec7e3b",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b5f")
            },
            {
                "addedAt" : "2023-03-31T15:56:27Z",
                "title" : "Do Or Die - VYPER 깨물다 PHONK REMIX",
                "artist" : "Magnolia Park",
                "album" : "Do Or Die (Alternate Versions)",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737367e2db5bdb5c3a6b59a599",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b60")
            },
            {
                "addedAt" : "2023-03-03T17:41:53Z",
                "title" : "LET'S RIDE! - Drift Phonk",
                "artist" : "SXMPRA",
                "album" : "LET'S RIDE! (Drift Phonk)",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273569681565640ae0fa3498ea5",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b61")
            },
            {
                "addedAt" : "2023-03-17T15:27:46Z",
                "title" : "NECRONOMICON",
                "artist" : "SHADXWBXRN",
                "album" : "NECRONOMICON",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27336a736b9e63486a12a44bd98",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b62")
            },
            {
                "addedAt" : "2023-02-24T18:04:36Z",
                "title" : "SKY ADVENTURE",
                "artist" : "DIGITAL REY",
                "album" : "Sky Adventure",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27345ed6eaef7a1ec2cb763bda8",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b63")
            },
            {
                "addedAt" : "2023-01-20T06:53:22Z",
                "title" : "BLEED",
                "artist" : "SANTO BEATS",
                "album" : "NEW BREED",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a3824c931864bcf68131121e",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa657ca50fa6a1cf2b64")
            },
            {
                "addedAt" : "2022-12-23T06:25:48Z",
                "title" : "Requiem",
                "artist" : "Sabuze",
                "album" : "Requiem",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27347a6770ff8f108562a81114f",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b65")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "INCOMING",
                "artist" : "MC ORSEN",
                "album" : "INCOMING",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27311cc81d78e74834d4dfae041",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b66")
            },
            {
                "addedAt" : "2022-10-21T04:01:00Z",
                "title" : "BLAST EM'",
                "artist" : "Aega",
                "album" : "BLAST EM'",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d7985c6121af75c0cbdf367c",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b67")
            },
            {
                "addedAt" : "2022-12-23T06:25:48Z",
                "title" : "TOTALITARIANISM II",
                "artist" : "STAYSOLD",
                "album" : "TOTALITARIANISM II",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2738475ccebfe7e866681c88da5",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b68")
            },
            {
                "addedAt" : "2022-02-04T20:08:15Z",
                "title" : "Twilight",
                "artist" : "GRAVECHILL",
                "album" : "Twilight",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ac9ba207ecbc00f9380b70a5",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b69")
            },
            {
                "addedAt" : "2022-11-25T09:20:44Z",
                "title" : "HIT LIST",
                "artist" : "Pharmacist",
                "album" : "HIT LIST",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737337a142b65db896cea023f5",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b6a")
            },
            {
                "addedAt" : "2023-03-10T18:25:06Z",
                "title" : "WORLD DOMINATION",
                "artist" : "D4C",
                "album" : "WORLD DOMINATION",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2731e1a3bfabf8892286b11b40b",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b6b")
            },
            {
                "addedAt" : "2022-11-18T07:52:46Z",
                "title" : "Night Ride",
                "artist" : "FindMyName",
                "album" : "Night Ride",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27309ffade129d2125122086379",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b6c")
            },
            {
                "addedAt" : "2023-02-04T02:41:25Z",
                "title" : "Hurt",
                "artist" : "Maikubi",
                "album" : "Hurt",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27373c13f3c5948ff8123010d52",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b6d")
            },
            {
                "addedAt" : "2022-12-16T08:06:05Z",
                "title" : "BULLET",
                "artist" : "FORGOTTENAGE",
                "album" : "BULLET",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273804db62cf3384ff88fa609eb",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b6e")
            },
            {
                "addedAt" : "2022-11-18T07:52:46Z",
                "title" : "Break Off",
                "artist" : "NØCTRIS",
                "album" : "Break Off",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273589fdcca66514546820b5ca9",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b6f")
            },
            {
                "addedAt" : "2023-03-03T17:41:53Z",
                "title" : "Night Drive",
                "artist" : "Digma",
                "album" : "Night Drive",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273935b456fa53e413e1878b94d",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa667ca50fa6a1cf2b70")
            },
            {
                "addedAt" : "2022-11-18T07:52:46Z",
                "title" : "BREATHE",
                "artist" : "yatashigang",
                "album" : "BREATHE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2735aa2d5b72aae73ce4cb28ba1",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b71")
            },
            {
                "addedAt" : "2022-10-07T05:58:55Z",
                "title" : "Poltergeist",
                "artist" : "RAIZHELL",
                "album" : "Poltergeist",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273898adf786bf4e480e5990aba",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b72")
            },
            {
                "addedAt" : "2022-11-04T04:01:00Z",
                "title" : "medusa!",
                "artist" : "MUPP",
                "album" : "medusa!",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c9aedebb6496c5aa5218e416",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b73")
            },
            {
                "addedAt" : "2023-03-24T14:33:10Z",
                "title" : "Drive Fast",
                "artist" : "MTM",
                "album" : "Drive Fast",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736d925a5d60b02f4b51e6b6d9",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b74")
            },
            {
                "addedAt" : "2023-01-06T05:01:00Z",
                "title" : "Última Oportunidad",
                "artist" : "2upset2die",
                "album" : "Última Oportunidad",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273fb67142f1aa0f00da2246f05",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b75")
            },
            {
                "addedAt" : "2022-09-02T08:01:31Z",
                "title" : "SLAUGHTER HOUSE",
                "artist" : "Phonkha",
                "album" : "SLAUGHTER HOUSE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273abd577bb714160732559fda2",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b76")
            },
            {
                "addedAt" : "2022-08-26T10:49:32Z",
                "title" : "ANUBIS",
                "artist" : "KUTE",
                "album" : "ANUBIS",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273085203fedbaed293010f015d",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b77")
            },
            {
                "addedAt" : "2022-07-08T08:43:19Z",
                "title" : "IMMACULATE",
                "artist" : "VISXGE",
                "album" : "IMMACULATE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b26e4117778b03d1a76a43a3",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b78")
            },
            {
                "addedAt" : "2023-03-31T15:56:27Z",
                "title" : "Komarovo (DVRST Phonk Remix)",
                "artist" : "DVRST",
                "album" : "Atomic Heart (Original Game Soundtrack) Vol.1",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273229a4f6d15e73bbedad1919a",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b79")
            },
            {
                "addedAt" : "2021-05-12T14:02:59Z",
                "title" : "North Memphis",
                "artist" : "Pharmacist",
                "album" : "North Memphis",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739bff2e22af79eb21e0a1775b",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b7a")
            },
            {
                "addedAt" : "2023-03-10T18:25:06Z",
                "title" : "DEVIL",
                "artist" : "Kløn",
                "album" : "DEVIL",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2735f3ed42b6d3f268043c2290d",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b7b")
            },
            {
                "addedAt" : "2021-05-12T14:02:59Z",
                "title" : "Scary Garry",
                "artist" : "Kaito Shoma",
                "album" : "Scary Garry",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27390eb8cc7792233599046a61f",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa677ca50fa6a1cf2b7c")
            },
            {
                "addedAt" : "2023-03-03T17:41:53Z",
                "title" : "ENIGMA",
                "artist" : "UMBASA",
                "album" : "ENIGMA",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e8dc2a35befc1026ab55a7fd",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b7d")
            },
            {
                "addedAt" : "2022-07-22T07:40:20Z",
                "title" : "CRIME",
                "artist" : "NORTMIRAGE",
                "album" : "CRIME",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2735440b3bc86b2fa1b8f3d149b",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b7e")
            },
            {
                "addedAt" : "2022-07-29T04:01:00Z",
                "title" : "HELLDRIFT 2",
                "artist" : "HXI",
                "album" : "HELLDRIFT 2",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273610c76626d627f86e711b151",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b7f")
            },
            {
                "addedAt" : "2021-09-24T18:31:55Z",
                "title" : "TOKYO DRIFT",
                "artist" : "PRXSXNT FXTURE",
                "album" : "TOKYO DRIFT",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273fa864b337b61d7d2f9d1d197",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b80")
            },
            {
                "addedAt" : "2022-08-05T04:01:00Z",
                "title" : "LAND OF FIRE",
                "artist" : "Kordhell",
                "album" : "LAND OF FIRE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c2c8cfd3f522e17789b17686",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b81")
            },
            {
                "addedAt" : "2023-03-31T15:56:27Z",
                "title" : "MAD!",
                "artist" : "Fyex",
                "album" : "MAD!",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2731b6880762cb0b9430a644f96",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b82")
            },
            {
                "addedAt" : "2022-08-26T10:49:32Z",
                "title" : "SHOOTERS",
                "artist" : "FORGOTTENAGE",
                "album" : "SHOOTERS",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273739a42c640497c171f23bcb6",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b83")
            },
            {
                "addedAt" : "2022-05-13T04:02:00Z",
                "title" : "Devil Eyes",
                "artist" : "ZODIVK",
                "album" : "Devil Eyes",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273715060680e6e0fd335de85b7",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b84")
            },
            {
                "addedAt" : "2021-05-12T14:02:59Z",
                "title" : "Keraunos",
                "artist" : "PlayaPhonk",
                "album" : "Keraunos",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273596ecf039255238ef762e4c3",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b85")
            },
            {
                "addedAt" : "2022-06-03T06:37:00Z",
                "title" : "DAMAGE",
                "artist" : "SHADXWBXRN",
                "album" : "DAMAGE",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a040c4715aa67a15d6ca4963",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b86")
            },
            {
                "addedAt" : "2023-03-31T15:56:27Z",
                "title" : "Own Paradise",
                "artist" : "LXAES",
                "album" : "Own Paradise",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273faa13a912dafcff92f48b0e3",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa687ca50fa6a1cf2b87")
            },
            {
                "addedAt" : "2021-05-12T14:02:59Z",
                "title" : "Swaggin' at the Partment",
                "artist" : "Ghostface Playa",
                "album" : "High As Fuck",
                "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27319fb4a1d5d0fd56153966642",
                "likedByUsers" : [
    
                ],
                "_id" : ("64a2aa697ca50fa6a1cf2b88")
    }
   ]
    },
    {
      "_id" : ("64287498a8956e0bd64735a6"),
      "name" : "Deep House Relax",
      "description" : "Forget it and disappear with chill house.",
      "imgUrl" : "https://i.scdn.co/image/ab67706f0000000336b7c4ece12f6a254f41d5c1",
      "tags" : [
          "Chill"
      ],
      "createdBy" : {
          "_id" : "u101",
          "fullname" : "system",
          "imgUrl" : "http://some-photo/"
      },
      "likedByUsers" : [
  
      ],
      "songs" : [
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "There For You",
              "artist" : "Y.V.E. 48",
              "album" : "There For You",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2732959fedb35fa283c918ac359",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa207ca50fa6a1cf2869")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Over You",
              "artist" : "Dillistone",
              "album" : "Over You",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739157da204a154825aa3fb97c",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf286a")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "New Fires",
              "artist" : "Christian Löffler",
              "album" : "New Fires",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273581645c2fb994235c9722821",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf286b")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "These Things Will Come To Be",
              "artist" : "DJ Seinfeld",
              "album" : "Mirrors",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27357751ae9890e997676b998f2",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf286c")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Another Time",
              "artist" : "TWO LANES",
              "album" : "Another Time",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2738d6ff5e86d04828ddf37a58d",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf286d")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Lost",
              "artist" : "Le Youth",
              "album" : "Lost",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27392a5bcf15380f1c9c06c0147",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf286e")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Running up That Hill",
              "artist" : "Dayne S",
              "album" : "Running up That Hill",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27317777d37c5fba2acc644c03f",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf286f")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Tears",
              "artist" : "Tim Green",
              "album" : "Eastbound Silhouette",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739145e5a98e442714faa04ce6",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf2870")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Mine To Love",
              "artist" : "Ross Quinn",
              "album" : "Azure EP",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ccfac960e184a39452ba5a3a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf2871")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Oceanside Girl",
              "artist" : "Holo",
              "album" : "Oceanside Girl",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273409f07b605476320cbd07ba7",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf2872")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Like This",
              "artist" : "Mallin",
              "album" : "Like This",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736e5f2b6286e450bcc2065532",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf2873")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "The Observer",
              "artist" : "Kasper Koman",
              "album" : "The Observer",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ea3d65ebfecf3ac338aec666",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa217ca50fa6a1cf2874")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Ronda",
              "artist" : "Christian Löffler",
              "album" : "Ronda",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739248cdf3e61d3484e10dbad8",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf2875")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Sunrays",
              "artist" : "AK",
              "album" : "Sunrays",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b841d0fd78e2f020e4e7d921",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf2876")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "I Never Really Cared",
              "artist" : "Stoto",
              "album" : "Afterlife",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27304f13bda990d28aba00add8a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf2877")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Sonthee",
              "artist" : "LAR",
              "album" : "Sonthee",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27366c0890cfe0050c31e2f6e3d",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf2878")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Hiraeth (feat. Kim Van Loo)",
              "artist" : "Fejká",
              "album" : "Hiraeth",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739ff2131660f64437c36bfd9c",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf2879")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Amman - Nils Hoffmann Remix",
              "artist" : "Emmit Fenn",
              "album" : "Amman (Nils Hoffmann Remix)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27363aa61272e54e789c528e814",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf287a")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Designer Love - Short Version",
              "artist" : "MARIA Die RUHE",
              "album" : "Designer Love",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737a542971008798558b1bcf0e",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf287b")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Waves (feat. Grace Tither)",
              "artist" : "BLOND:ISH",
              "album" : "Waves (feat. Grace Tither)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736d0b412138b5758d44c03381",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf287c")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Yuregine Deprem",
              "artist" : "Buddha-Bar",
              "album" : "Yuregine Deprem",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2732b06de6f0616c55c1accac98",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf287d")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Peaceful Groove",
              "artist" : "Teen Daze",
              "album" : "Reality Refresh 3",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2735494f78108ed1168eea9100a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf287e")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "malo okoma - Radio Edit",
              "artist" : "dj poolboi",
              "album" : "malo okoma",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737f28f72a1d10493675b3aa1e",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa227ca50fa6a1cf287f")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Money",
              "artist" : "Cody Currie",
              "album" : "Lucas",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273849fe5cc65acdca803d9e96a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2880")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Ordel",
              "artist" : "Parra for Cuva",
              "album" : "Juno",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27307d0bff71dd649f5f67b7413",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2881")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Like I Used To",
              "artist" : "Steven Weston",
              "album" : "Like I Used To",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a53370b97633fe7da62a9ac3",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2882")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Passing Clouds",
              "artist" : "Sum Wave",
              "album" : "Passing Clouds",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c91ebacbdd81a03f12547101",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2883")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Remember",
              "artist" : "King Henry",
              "album" : "Remember",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736b1efd00709d6d75769ff88f",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2884")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "You're a Superstar",
              "artist" : "Tep No",
              "album" : "You're a Superstar",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27371c044f0ac6ee1dfb405f08c",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2885")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Fragments",
              "artist" : "Marsh",
              "album" : "Endless",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273411be12a88984e4606a61c97",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2886")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Fibonacci",
              "artist" : "Nora En Pure",
              "album" : "Fibonacci",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2738c49f272b5c914f6d9eaac57",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2887")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Mancora",
              "artist" : "Sinca",
              "album" : "Anjunadeep Explorations 19",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2735289e150a74dcf827087f8f0",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2888")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Ibiza Blue",
              "artist" : "Sue Avenue",
              "album" : "Ibiza Blue",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e947c3ae7a70d871ad1a01f2",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa237ca50fa6a1cf2889")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Keep Going",
              "artist" : "Stephan Jolk",
              "album" : "Keep Going",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b838e998a0771dee022b2335",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf288a")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Just",
              "artist" : "Amtrac",
              "album" : "Just",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273cf15f2efd20ca057a9cf3e02",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf288b")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Atlas",
              "artist" : "Lane 8",
              "album" : "Little by Little",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2733632681259e482efdffdc1b1",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf288c")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Equals",
              "artist" : "Jasper Tygner",
              "album" : "Equals",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27389c87e777a8d5fb9215d7569",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf288d")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Far Away",
              "artist" : "jackLNDN",
              "album" : "Far Away",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273376f2fe16f736d5cdc1b93a6",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf288e")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "2005 NYE",
              "artist" : "Model Man",
              "album" : "2005 NYE",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ed5f2ee16ec8988c70312578",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf288f")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "All Night Long",
              "artist" : "Marsh",
              "album" : "All Night Long",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d9118321ac31ddb7cd500075",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf2890")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Fade",
              "artist" : "Alex Lustig",
              "album" : "Fade",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27313deba22d2d3e8d07e064e2a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf2891")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "When The World Stops Turning - Quiet Mix",
              "artist" : "Chris Malinchak",
              "album" : "When The World Stops Turning (Quiet Mix)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273f6ad4e643eb1854ad0fa4e77",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf2892")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Castles",
              "artist" : "Kornél Kovács",
              "album" : "Hotel Koko",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e9233d4ab639d612aceaf7eb",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf2893")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Attraction",
              "artist" : "JYYE",
              "album" : "Attraction",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2730b2a9097286d6cd3831dd470",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf2894")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Moment In Time",
              "artist" : "Icarus",
              "album" : "Moment In Time",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737c67612fc775d0e08a46e35f",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa247ca50fa6a1cf2895")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Wairau Bay",
              "artist" : "Duke Boara",
              "album" : "Wairau Bay",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b1e6985a6f8bc28d933cad02",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf2896")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Deep Chicken",
              "artist" : "Sound Quelle",
              "album" : "Deep Chicken",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2733cb5e5027de6b082cdc165f8",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf2897")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Nightwhisper",
              "artist" : "Jody Wisternoff",
              "album" : "Nightwhisper",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273994bf315ed3292b76c71f5a9",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf2898")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Evaporate ft. PaulWetz - Edit",
              "artist" : "Durante",
              "album" : "Evaporate EP",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2731e2797b36b982eb1498ba787",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf2899")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "And Then You Came",
              "artist" : "FERR",
              "album" : "As Above So Below (Deluxe Version)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27323fd0ee02780adf89706c1f2",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf289a")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Athena",
              "artist" : "Trilucid",
              "album" : "Athena",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27305c31ba0d1fc10364cc3faf2",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf289b")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Oasis",
              "artist" : "Attom",
              "album" : "Oasis",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273fd79f262e72616be12ae4fe4",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf289c")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Gravity (with Delhia De France)",
              "artist" : "Monkey Safari",
              "album" : "Gravity / Daka",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27300e71df09040d09941f9cd63",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf289d")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Solid Gold Love",
              "artist" : "Sultan + Shepard",
              "album" : "Solid Gold Love",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737d9c9b82dcc28a269566e59d",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf289e")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Erase",
              "artist" : "Ben Böhmer",
              "album" : "Erase",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273de4854c4a6986e31661ae741",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf289f")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Hide and Seek",
              "artist" : "Session Victim",
              "album" : "10.000 Hours",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27372e62fc58abda595fdf8239a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf28a0")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Bo & Wing",
              "artist" : "Maya Jane Coles",
              "album" : "Take Flight",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27311448ffbf420f3124f0c2a7b",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa257ca50fa6a1cf28a1")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Captivated",
              "artist" : "LTN",
              "album" : "Captivated",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273dcad5d782f831c54b0382433",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28a2")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Reflections - il:lo Remix",
              "artist" : "TWO LANES",
              "album" : "Reflections (il:lo Remix)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d374cb704fc442f596f9c847",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28a3")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Jakarta",
              "artist" : "Bonsaye",
              "album" : "Jakarta",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273cbe8e325b22665995b6f934e",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28a4")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Never - Colyn Remix",
              "artist" : "Joris Voorn",
              "album" : "Never (Colyn Remix)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ed5e43290a0c587350149040",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28a5")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Ceremony",
              "artist" : "Monkey Safari",
              "album" : "Body Language, Vol. 24",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c84422ae15ff83f2737d7073",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28a6")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Ardour",
              "artist" : "Into The Ether",
              "album" : "Ascent / Ardour",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e2169c989f80856cca2857be",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28a7")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Soft Landing - Jody Wisternoff & James Grant Remix",
              "artist" : "David Hohme",
              "album" : "Anjunadeep 09",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2732f98dc917d7e068ccb7791dd",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28a8")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Night Jaguars",
              "artist" : "Quantic",
              "album" : "Heaven Or Hell",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736472a2c80e96cef6ab5f0b7b",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28a9")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Sol",
              "artist" : "Kalaman",
              "album" : "Sol",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27386fa2a5afce935e039e3bb09",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28aa")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Moss",
              "artist" : "Tim Green",
              "album" : "The Moss EP",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27346362525fd4b12045634952c",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28ab")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Feed The Fire - Kassian Remix",
              "artist" : "SG Lewis",
              "album" : "Feed The Fire (Kassian Remix)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2732c4d8c5feed0a2f4a0bb81ef",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28ac")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Nobody Knows",
              "artist" : "Sound Quelle",
              "album" : "Tarazed",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c77a96ebc5c90c7a50ec029b",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa267ca50fa6a1cf28ad")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "2daBeat",
              "artist" : "Super Flu",
              "album" : "Musik 3",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273f2fcdb2d6dd9a2cdd166fbc9",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28ae")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Alfa",
              "artist" : "Crackazat",
              "album" : "Alfa",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737b4a5c7b77b239af3678f786",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28af")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Extassy",
              "artist" : "Sébastien Léger",
              "album" : "Extassy / In A Distorted Galaxy",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739ad5f3a2052eb324f6fcdae6",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b0")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Ahmed",
              "artist" : "Acid Pauli",
              "album" : "Mainacht",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c7a954e0591f7b09c0ad88fc",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b1")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "All Inclusive",
              "artist" : "Pool Boy",
              "album" : "All Inclusive",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2732930ba0561abc3304f15a247",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b2")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Sofia's Theme",
              "artist" : "TÂCHES",
              "album" : "Sofia's Theme",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2738ecf45b843bdbc4d05622bfb",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b3")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Inner Circle",
              "artist" : "Rezident",
              "album" : "Inner Circle",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739b52de6c304ad1b9b399025b",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b4")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Garden Of 3Den - Edit",
              "artist" : "BLOND:ISH",
              "album" : "Garden Of 3Den",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a526c9d626822ac00e56b784",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b5")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Other Side",
              "artist" : "Maya Jane Coles",
              "album" : "Waves & Whirlwinds",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ff001cdf6ca324c50e028fda",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b6")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "My Everything",
              "artist" : "Nico de Andrea",
              "album" : "My Everything",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ab0225aca24205f84c03ada5",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b7")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Bouquet",
              "artist" : "Lstn",
              "album" : "Bouquet",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a30481b5a30f2b807e7fb3cd",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b8")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Blue",
              "artist" : "Chris Malinchak",
              "album" : "Blue",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a4a8ca1bc7ab61adb3c08b08",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa277ca50fa6a1cf28b9")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Leko - Session Victim Remix",
              "artist" : "Kink",
              "album" : "Leko Remixes",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27364b8b69e6116b125cd11c6b1",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28ba")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Nostalgic",
              "artist" : "Col Lawton",
              "album" : "Nostalgic",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e6522ddb11ec464fba3782d7",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28bb")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Midnight - Original Mix",
              "artist" : "Lane 8",
              "album" : "Midnight EP",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273bd212f8abba18039080a733c",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28bc")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Your Love",
              "artist" : "Qrion",
              "album" : "Your Love",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273987a3a3a0d796a2ec50513c9",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28bd")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Broken Parts",
              "artist" : "Eli & Fur",
              "album" : "Found In The Wild",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273de625ff5c6872d28abbf3901",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28be")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Be Patient",
              "artist" : "Loverground",
              "album" : "Be Patient",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273262614a426a50d384abc330b",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28bf")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "tu tienes mi corazón",
              "artist" : "dj poolboi",
              "album" : "tu tienes mi corazón",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2735542158ab56509c73f99a124",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28c0")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Keep On",
              "artist" : "Seb Wildblood",
              "album" : "Keep On",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27371acfd8b2a51e7816a27a35a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28c1")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Embre",
              "artist" : "Tim Green",
              "album" : "Moho EP",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27393d50c867c6c0eb6dea9bbcb",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28c2")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Boats",
              "artist" : "Xinobi",
              "album" : "On the Quiet (Expanded Edition)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2733afdf35e9d8d2cf6c2dac083",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28c3")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Daughters - Oliver Schories Remix",
              "artist" : "Frivolous",
              "album" : "The Tiny House of Delusion (REMIXES)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27326e998ea05913d8fbf932296",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa287ca50fa6a1cf28c4")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Reflections",
              "artist" : "TWO LANES",
              "album" : "Reflections",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2735e523c85ddc4cd8d7260c8ec",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa297ca50fa6a1cf28c5")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Surrender",
              "artist" : "Angelos",
              "album" : "Surrender EP",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c5e1b58d67f378076b5d75fe",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa297ca50fa6a1cf28c6")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "The Truth",
              "artist" : "Fort Romeau",
              "album" : "Beings of Light",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273759e27b2cbf1a92d654ea47e",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa297ca50fa6a1cf28c7")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Aurora",
              "artist" : "David Scott",
              "album" : "Departures",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736d100190aa9c84042c2fb39f",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa297ca50fa6a1cf28c8")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Spectre - Theo Kottis Remix",
              "artist" : "Emma-Jean Thackray",
              "album" : "Spectre (Theo Kottis Remix)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273972f158f13501dbced947b2e",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa297ca50fa6a1cf28c9")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Horns in the Sun",
              "artist" : "DJ Kent",
              "album" : "Horns In the Sun",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2733165a584b9812e4c1236ada3",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa297ca50fa6a1cf28ca")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Eleuthera - Catching Flies Remix",
              "artist" : "Tor",
              "album" : "Oasis Sky (Remixes)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2731d335c333114f23ef00d1691",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa297ca50fa6a1cf28cb")
          },
          {
              "addedAt" : "2023-03-03T05:00:00Z",
              "title" : "Live For The Music feat. Erire - Instrumental",
              "artist" : "CamelPhat",
              "album" : "Live For The Music (feat. Erire)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273726be3fff17707e943d5d711",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa297ca50fa6a1cf28cc")
   }
  ]
  },
  {
    "_id" : ("642875108409e8f8b811caa1"),
    "name" : "Easy Jazz",
    "description" : "The easy listening sound of Jazz. Cover: Norah Jones",
    "imgUrl" : "https://i.scdn.co/image/ab67706f0000000390d8df7e39072c0ce27be78d",
    "tags" : [
        "Chill"
    ],
    "createdBy" : {
        "_id" : "u101",
        "fullname" : "system",
        "imgUrl" : "http://some-photo/"
    },
    "likedByUsers" : [

    ],
    "songs" : [
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Come Away With Me",
            "artist" : "Norah Jones",
            "album" : "Come Away With Me (Super Deluxe Edition)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c648a42b5dad72c8aafceeec",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa297ca50fa6a1cf28cd")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "By Your Side",
            "artist" : "Sade",
            "album" : "Lovers Rock",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27320fc6951e4d293707de2434c",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa297ca50fa6a1cf28ce")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Moon River",
            "artist" : "Carla Bruni",
            "album" : "French Touch",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27323396242460cd825eeebfc9d",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa297ca50fa6a1cf28cf")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Just The Way You Are",
            "artist" : "Diana Krall",
            "album" : "Live In Paris",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27340d00b4499595a2a706a8de8",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa297ca50fa6a1cf28d0")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "I Only Want To Be With You",
            "artist" : "Shelby Lynne",
            "album" : "Just A Little Lovin'",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2730b89978c9a35191ee57977f2",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d1")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Hey Laura",
            "artist" : "Gregory Porter",
            "album" : "Liquid Spirit (Deluxe Version)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27310f24a19d2498497d9c47f5f",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d2")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "A Love That Will Last",
            "artist" : "Renee Olstead",
            "album" : "Renee Olstead",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ab9c78473e864f457f229ceb",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d3")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Dream A Little Dream",
            "artist" : "Laura Fygi",
            "album" : "Introducing",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737921c0adaa1163630028ccaf",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d4")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "(Getting Some) Fun out of Life",
            "artist" : "Madeleine Peyroux",
            "album" : "Dreamland",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2733f59990c61b9c4cd93b1fcdd",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d5")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "You've Got A Friend",
            "artist" : "Stacey Kent",
            "album" : "The Boy Next Door (Special Edition)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27348cf733d555bd7f6e663254d",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d6")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Don't Know Why",
            "artist" : "Norah Jones",
            "album" : "Come Away With Me (Super Deluxe Edition)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c648a42b5dad72c8aafceeec",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d7")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Ain't No Sunshine",
            "artist" : "Ida Sand",
            "album" : "The Gospel Truth (Bonus Track Version)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27341e4fee77d22a65cd3dee389",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d8")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Don't Think Twice, It's Alright",
            "artist" : "Emilie-Claire Barlow",
            "album" : "The Beat Goes On",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e19e28d12fcb823c2f223754",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28d9")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "These Are The Days",
            "artist" : "Jamie Cullum",
            "album" : "Twentysomething",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736108cbae948623a53e060833",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28da")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Moon River",
            "artist" : "Melody Gardot",
            "album" : "Sunset In The Blue",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273531a9f41988ac8e274112df6",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28db")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "The Sun Is Shining for Our Love",
            "artist" : "Jeff Cascaro",
            "album" : "Mother and Brother",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27334894ae177d3c84a276bee6e",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2a7ca50fa6a1cf28dc")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Will you still love me tomorrow",
            "artist" : "Inger Marie Gundersen",
            "album" : "Make this moment",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2734ecb1178c1a007671e9667f1",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28dd")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Temptation",
            "artist" : "Diana Krall",
            "album" : "The Girl In The Other Room",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e7b588e9d98a931180ba0183",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28de")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Those Sweet Words",
            "artist" : "Norah Jones",
            "album" : "Feels Like Home",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27364026be0e09c1beda2f67c32",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28df")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "To Love You All Over Again",
            "artist" : "Madeleine Peyroux",
            "album" : "Bare Bones",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d9091cc29864b6d1d80f7102",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28e0")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Fever",
            "artist" : "Ray Charles",
            "album" : "Genius Loves Company",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737e827444b254f83e8303c790",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28e1")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Blue Moon",
            "artist" : "Flora Martínez",
            "album" : "Moon Lover",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27372d794575cb0b2d17646d200",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28e2")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "What a Wonderful World (with Eva Cassidy)",
            "artist" : "Katie Melua",
            "album" : "Ultimate Collection",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27336fb8c8aa61ffeaf7dadbacf",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28e3")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "You Make Me Feel so Young",
            "artist" : "Emilie-Claire Barlow",
            "album" : "Haven't We Met?",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a6f59f5b55e45037b88b7b01",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28e4")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "What Am I To You?",
            "artist" : "Norah Jones",
            "album" : "Feels Like Home",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27364026be0e09c1beda2f67c32",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28e5")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Worrisome Heart",
            "artist" : "Melody Gardot",
            "album" : "Worrisome Heart",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736c89f528613c53974940f9d5",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2b7ca50fa6a1cf28e6")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Stars Fell On Alabama",
            "artist" : "Lizz Wright",
            "album" : "Grace",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d6505fc54552389db60404ac",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28e7")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "What Love Will Do to You",
            "artist" : "Laufey",
            "album" : "Everything I Know About Love",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27348341e864d4b4881f56f01b4",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28e8")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Sway",
            "artist" : "Peter Cincotti",
            "album" : "Peter Cincotti",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736626c4d33b2907bcf7337fca",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28e9")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Harvest Moon",
            "artist" : "Jane Birkin",
            "album" : "Fictions",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b21a2fe04d5572ff47ffb2c0",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28ea")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "The Nearness Of You",
            "artist" : "Norah Jones",
            "album" : "Come Away With Me (Super Deluxe Edition)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c648a42b5dad72c8aafceeec",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28eb")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Place To Hide",
            "artist" : "Kandace Springs",
            "album" : "Soul Eyes",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739376f5d1c51c92f82e07dbc9",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28ec")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Suzanne (feat. Gregory Porter)",
            "artist" : "Here It Is",
            "album" : "Suzanne",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27347e2bb4e86ad0e3abad03feb",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28ed")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "'S Wonderful",
            "artist" : "Diana Krall",
            "album" : "The Look Of Love",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273797b5bf662679f243b717b6f",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28ee")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Jimmy Jazz",
            "artist" : "Carla Bruni",
            "album" : "French Touch",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27323396242460cd825eeebfc9d",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28ef")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Someone Like You - Spotify Singles",
            "artist" : "Samara Joy",
            "album" : "Spotify Singles",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273eab9b7b553d21b5a23b6d695",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28f0")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "end credits",
            "artist" : "Sarah Kang",
            "album" : "end credits",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ff0dd8d4e78fa03826f861bc",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2c7ca50fa6a1cf28f1")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "How Insensitive",
            "artist" : "Stacey Kent",
            "album" : "The Changing Lights (Bonus Edition)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d1e133f727f0419a398f6388",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28f2")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Easy On Me",
            "artist" : "Changes",
            "album" : "Easy On Me",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737872c6ce0403a8e0fb09bb49",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28f3")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Don't Wait Too Long",
            "artist" : "Madeleine Peyroux",
            "album" : "Careless Love",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273d0f5bb9695225a5c88db29bd",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28f4")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "A Whiter Shade of Pale",
            "artist" : "Halie Loren",
            "album" : "They Oughta Write a Song",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273eebf0f03ac88f7c3673d851f",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28f5")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Just Like Chet",
            "artist" : "Laufey",
            "album" : "Everything I Know About Love",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27348341e864d4b4881f56f01b4",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28f6")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Morning Sun",
            "artist" : "Melody Gardot",
            "album" : "Currency Of Man (The Artist's Cut)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273519c083eb00644bffd0100d5",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28f7")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Oh My Love",
            "artist" : "Kat Edmonson",
            "album" : "The Big Picture",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27302d80215c4f6e7fee1fac5f3",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28f8")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Love of My Life",
            "artist" : "Nils Landgren",
            "album" : "Eternal Beauty",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e267a5c3166e965663c50aed",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28f9")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "One for My Baby (And One More for the Road)",
            "artist" : "Tony Bennett",
            "album" : "Duets II",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273796c0744b04db30174704d24",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28fa")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Lovely Day",
            "artist" : "Stacey Kent",
            "album" : "Songs from Other Places (Special Edition)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ade02604c66115a9775232f8",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28fb")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "My Funny Valentine",
            "artist" : "Seal",
            "album" : "Standards (Deluxe)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273bb380eea240fbc6ec4c419ef",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28fc")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "The Moon Is Made of Gold",
            "artist" : "Rickie Lee Jones",
            "album" : "Balm in Gilead",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273dd0cd6e1501cbf299eee63bb",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2d7ca50fa6a1cf28fd")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Talking to Myself",
            "artist" : "Sinne Eeg",
            "album" : "Remembering You",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273474bb88ca2ede96d9bd0c1d3",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf28fe")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Autumn Leaves",
            "artist" : "Eva Cassidy",
            "album" : "Songbird 20",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737453ed8ae3395305e7be307f",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf28ff")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Your Heart Is As Black As Night",
            "artist" : "Melody Gardot",
            "album" : "My One And Only Thrill",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739fb6068078c8525a7f5a6d16",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2900")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Sunny",
            "artist" : "Laura Fygi",
            "album" : "Jazz Love",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b9dc7fbc882dd2f7e20206f2",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2901")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Say You'll Be There",
            "artist" : "Martina DaSilva",
            "album" : "LIVING ROOM 2",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2730b4c91337b62eb8174d9cf7d",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2902")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "I'm In The Mood For Love",
            "artist" : "Rod Stewart",
            "album" : "The Complete Great American Songbook",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2734d255fb05d321db2196485c4",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2903")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Coming Back To You",
            "artist" : "Here It Is",
            "album" : "Coming Back To You",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273837b73e5761208fb7d8eca75",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2904")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "What a Difference a Day Makes",
            "artist" : "Renee Olstead",
            "album" : "Renee Olstead",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ab9c78473e864f457f229ceb",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2905")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "I'm Gonna Sit Right Down And Write Myself A Letter",
            "artist" : "Paul McCartney",
            "album" : "Kisses On The Bottom",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2738de6327e940dd688cebdbae9",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2906")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "The Summer Wind",
            "artist" : "Madeleine Peyroux",
            "album" : "Half The Perfect World",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b602ed2310b10e5daf8c1b7e",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2907")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "From Paris With Love - Single Version",
            "artist" : "Melody Gardot",
            "album" : "From Paris With Love",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2733e18f0dbb097b7f2191e2190",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2e7ca50fa6a1cf2908")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Waiting In Vain",
            "artist" : "Halie Loren",
            "album" : "Heart First",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c58902976b50f7bc6d74920a",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf2909")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Look Of Love",
            "artist" : "Tok Tok Tok",
            "album" : "Love Again",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2734998f656bc28890536abad40",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf290a")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Call Me",
            "artist" : "Eliane Elias",
            "album" : "Dreamer",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e11e69b8b2461fafab73d7f0",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf290b")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Un homme et une femme",
            "artist" : "Thomas Dutronc",
            "album" : "Frenchy",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a966152c024eeae210258b15",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf290c")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Castles in the Air",
            "artist" : "Laura & Anton",
            "album" : "Castles in the Air",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736d1a1ebf03c4d30d9261ca5e",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf290d")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Hallelujah",
            "artist" : "Here It Is",
            "album" : "Here It Is: A Tribute to Leonard Cohen",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273660ca802ac65f6dc1e5da76a",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf290e")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Close to You - 2018 Remaster",
            "artist" : "Steve Tyrell",
            "album" : "Back to Bacharach (Expanded Edition)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2732840a26c505c8b87a8082fd7",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf290f")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "I Will Wait for You",
            "artist" : "Lisa Lovbrand",
            "album" : "Let Me Love You",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a9dd27ca896b2fc7fbce6c67",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf2910")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Smile",
            "artist" : "Madeleine Peyroux",
            "album" : "Half The Perfect World",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b602ed2310b10e5daf8c1b7e",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf2911")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "C'est si bon",
            "artist" : "Thomas Dutronc",
            "album" : "C’est si bon",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ffa8a1f40369122f6e661a4c",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf2912")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Just A Dream",
            "artist" : "Gerald Clayton",
            "album" : "Bells On Sand",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273aec48272031adb1249a5854b",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa2f7ca50fa6a1cf2913")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Come Fly With Me",
            "artist" : "Eliane Elias",
            "album" : "Love Stories",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ceb88d5c2b4cc03ea5694fe7",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa307ca50fa6a1cf2914")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "Calling You",
            "artist" : "Viktoria Tolstoy",
            "album" : "Meet Me at the Movies (feat. Iiro Rantala)",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2730463cba75f23232215fac07b",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa307ca50fa6a1cf2915")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "A Man and a Woman",
            "artist" : "Simone Kopmajer",
            "album" : "My Wonderland",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273716bf3db0fe33111d7c60b1b",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa307ca50fa6a1cf2916")
        },
        {
            "addedAt" : "2023-03-23T23:00:00Z",
            "title" : "If I Had You",
            "artist" : "Willie Nelson",
            "album" : "American Classic",
            "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2736b562cfa7c33fe63622ea5c1",
            "likedByUsers" : [

            ],
            "_id" : ("64a2aa307ca50fa6a1cf2917")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "What The World Needs Now Is Love",
              "artist" : "Stacey Kent",
              "album" : "The Boy Next Door (Special Edition)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27348cf733d555bd7f6e663254d",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa307ca50fa6a1cf2918")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Pennies From Heaven (with Michael Bublé)",
              "artist" : "Paul Anka",
              "album" : "Duets",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e7afa9599b308a962f843ed5",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa307ca50fa6a1cf2919")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "They Can’t Take That Away From Me",
              "artist" : "José James",
              "album" : "Fifty Shades Darker (Original Motion Picture Soundtrack)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2735997605214d568d73fd365c2",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa307ca50fa6a1cf291a")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "One Day I Fly Away",
              "artist" : "Joe Sample",
              "album" : "Creole Love Call",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a0a3e94b1ee94e8a284f84db",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa307ca50fa6a1cf291b")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "I'll Tell You Something",
              "artist" : "Gabi Hartmann",
              "album" : "Always Seem to Get Things Wrong",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273c0fd11d04e0305c4f2129de5",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa307ca50fa6a1cf291c")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "I've Never Been In Love Before",
              "artist" : "Laufey",
              "album" : "Everything I Know About Love",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27348341e864d4b4881f56f01b4",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa307ca50fa6a1cf291d")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "I Belong to You",
              "artist" : "Emilia Mitiku",
              "album" : "I Belong To You",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273afe7b137ef13d31c159614ec",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa317ca50fa6a1cf291e")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Lover Man (Oh, Where Can You Be?)",
              "artist" : "Flora Martínez",
              "album" : "Lover Man (Oh, Where Can You Be?)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273869f30db360a2bb67903240c",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa317ca50fa6a1cf291f")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Hey Jude",
              "artist" : "Jesse Palter",
              "album" : "Nothing Standard",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27346c24cacc19124cf56eb835a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa317ca50fa6a1cf2920")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Dream a Little Dream",
              "artist" : "Pink Martini",
              "album" : "Dream a Little Dream",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2733869a5c9358172283021f80f",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa317ca50fa6a1cf2921")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Here's to Life",
              "artist" : "Jacintha",
              "album" : "Autumn Leaves (The Songs of Johnny Mercer)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273ec506618d86fce73063da46a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa317ca50fa6a1cf2922")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Fire and Rain",
              "artist" : "Rigmor Gustafsson",
              "album" : "I Will Wait for You (with Nils Landgren & FleshQuartet)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273777eedf507dbd676c2f98d10",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa317ca50fa6a1cf2923")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Hit The Road Jack",
              "artist" : "Shirley Horn",
              "album" : "Light Out Of Darkness (A Tribute To Ray Charles)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273e20f28d72d9e53be19812cbf",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa317ca50fa6a1cf2924")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "You Are My Sunshine",
              "artist" : "Sara Gazarek",
              "album" : "Yours",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739c42692a33c7cd7cfccef721",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa317ca50fa6a1cf2925")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Autumn Breeze",
              "artist" : "Kaiak",
              "album" : "Autumn Breeze",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273eaea816264af2fada757bfd1",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf2926")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "My Funny Valentine (For Oskar and Eli)",
              "artist" : "Amos Lee",
              "album" : "My Funny Valentine (For Oskar and Eli)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a603196a2bd8df5a11ad6994",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf2927")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "A Place I Don’t Know",
              "artist" : "Benjamin Herman",
              "album" : "True Love's Flame",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273725cf156a5a4422b09004a47",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf2928")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "The Age Of Anxiety",
              "artist" : "Jamie Cullum",
              "album" : "The Age of Anxiety",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2739ed020e4b046109b0afd843e",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf2929")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "The Best Is Yet To Come",
              "artist" : "Stacey Kent",
              "album" : "The Boy Next Door (Special Edition)",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b27348cf733d555bd7f6e663254d",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf292a")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Lumiére",
              "artist" : "Emily Sage",
              "album" : "Lumiére",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273b972729b250d74d72170f0b7",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf292b")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Close to You",
              "artist" : "Hailey Tuck",
              "album" : "So in Love",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273329c5f5095a02b06740397ac",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf292c")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "Save Your Love for Me",
              "artist" : "Till Brönner",
              "album" : "On Vacation",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2730b978973af5e3f51d678c757",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf292d")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "I'm Confessin'",
              "artist" : "Lizz Wright",
              "album" : "Dreaming Wide Awake",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273a60911aea5c5087401bbbcdd",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa327ca50fa6a1cf292e")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "The Look Of Love",
              "artist" : "Trijntje Oosterhuis",
              "album" : "The Look Of Love - Burt Bacharach Songbook",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b2737349bc45b2462e511354a375",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa337ca50fa6a1cf292f")
          },
          {
              "addedAt" : "2023-03-23T23:00:00Z",
              "title" : "La belle vie - The Good Life",
              "artist" : "Thomas Dutronc",
              "album" : "La belle vie - The Good Life",
              "imgUrl" : "https://i.scdn.co/image/ab67616d0000b273297fc568f0add9844ec8d96a",
              "likedByUsers" : [
  
              ],
              "_id" : ("64a2aa337ca50fa6a1cf2930")
  }
 ]
  }

      
    ],
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
  if (user) {
    if (user.username === "guest") {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
    } else {
      return httpService.get(`user/${user._id}`);
    }
  }
}

function prepareData(userCred) {
  return {
    email: userCred.email,
    userName: userCred.name,
    img: userCred.picture,
  };
}

async function updateLatestStations(stationId, user) {
  console.log("service", stationId);
  console.log("service", user);
  const station = await stationService.getById(stationId);
  const userCopy = { ...user };
  userCopy.latestStations = [...userCopy.latestStations, station];
  return httpService.put(`user/latest/${userCopy._id}`, userCopy);
}
