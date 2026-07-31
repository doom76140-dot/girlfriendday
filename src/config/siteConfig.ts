import { SiteConfig } from '../types';


export const initialSiteConfig: SiteConfig = {
  girlfriendName: 'My Beautiful Vandu(Chipkali)',
  boyfriendName: 'Apka Balak Deepak',
  
  // Hardcoded credentials for Login Page (/login)
  // Easy to customize anytime!
  credentials: {
    username: 'Bunny',
    password: '3008',
  },

  // Wishes Page (/wishes)
  wishes: [
    {
  id: 1,
  title: "Meri Sabse Pyari Jaan ❤️",
  content:
    "Happy Girlfriend's Day meri jaan! ❤️ Tu meri life ka sabse khoobsurat hissa hai. Teri smile meri har problem ko chhota bana deti hai, aur tera saath meri sabse badi happiness hai. Thank you meri life ko itna special aur beautiful banane ke liye.",
  emoji: "🌸",
  highlight: "Tere saath har pal meri zindagi ka sabse beautiful moment hai. ❤️",
},
   {
  id: 2,
  title: "Teri Smile Meri Duniya Hai ✨",
  content:
    "Thank you meri jaan, meri life me aane ke liye. Tere saath ki har hasi, har late-night call, har hug aur har chhota sa moment meri sabse precious memory hai. Bas tujhe hamesha khush dekhna hi meri sabse badi khushi hai. ❤️",
  emoji: "💖",
  highlight: "Teri ek smile meri poori duniya ko khoobsurat bana deti hai. 🌸❤️",
}
  ],

  // Questions Page (/questions) - 4 customizable questions
  questions: [
    {
      id: 1,
      title: 'Question 1: My favorite food? 🍕',
      subtitle: 'What is my ultimate go-to comfort food?',
      category: 'food',
      options: ['Pizza ', 'Aloo ka paratha', 'Kachodi', 'Chocolates & Ice Cream'],
      correctAnswer: 'Aloo ka paratha',
      hint: 'pta hii hoga tujhe',
    },
    {
      id: 2,
      title: 'Question 2: Our anniversary date? 🗓️',
      subtitle: 'The special day we marked as our beginning!',
      category: 'anniversary',
      options: ['July 28', 'February 14', 'October 24', 'June 28'],
      correctAnswer: 'July 28',
      hint: 'A romantic date in late autumn!',
    },
    {
      id: 3,
      title: 'Question 3: First kiss date? 🏍️',
      subtitle: 'romantic kiss',
      category: 'bike',
      options: ['september 02', 'February 14', 'October 02', 'June 28'],
      correctAnswer: 'October 02',
      hint: 'dashera',
    },
    {
      id: 4,
      title: 'Question 4: our Propose day ? 🎂',
      subtitle: 'propose',
      category: 'birthdate',
      options: ['August 16', 'September 28', 'July 14', 'Augest 05'],
      correctAnswer: 'August 16',
      hint: 'krishann',
    },
  ],

  // Memories Page (/memories) - Easy to replace image paths later
  memories: [
    {
      id: 1,
      url: '/images/img1.jpeg',
      title: 'Our Sunset Stroll',
      date: 'Summer Days',
      location: 'By the Beach',
      aspectRatio: 'portrait',
    },
    {
      id: 2,
      url: '/images/img2.jpeg',
      title: 'Holding Hands Everywhere',
      date: 'Sweet Moments',
      location: 'Our Favorite Spot',
      aspectRatio: 'square',
    },
    {
      id: 3,
      url: '/images/img3.jpeg',
      title: 'Cozy Coffee Date',
      date: 'Weekend Magic',
      location: 'Downtown Cafe',
      aspectRatio: 'portrait',
    },
    {
      id: 4,
      url: '/images/img4.jpeg',
      title: 'Laughing Together',
      date: 'Unforgettable Smile',
      location: 'Park Picnic',
      aspectRatio: 'landscape',
    },
    {
      id: 5,
      url: '/images/img5.jpeg',
      title: 'Your Gorgeous Smile',
      date: 'Golden Hour',
      location: 'Under the Stars',
      aspectRatio: 'portrait',
    },
    {
      id: 6,
      url: '/images/img6.jpeg',
      title: 'Forever & Always',
      date: 'Anniversary Trip',
      location: 'Dream Destination',
      aspectRatio: 'square',
    },
  ],

  // Final Surprise Page (/surprise)
  finalSurprise: {
  heading: "I Love You So Much Meri Chipkali❤️",

  subheading:
    "Tu sirf meri girlfriend nahi , meri duniya, meri khushi aur meri sabse pyari dost hai. 💖",

  loveLetter:
    "Meri Jaan,\n\nHappy Girlfriend's Day!  ❤️\n\nMain shayad har baar apni feelings words me perfectly express nahi kar pata, lekin itna zaroor jaanta hoon ki meri life ka sabse beautiful decision tumse pyaar karna tha. 🥹❤️\n\nTeri ek smile mera poora din bana deti hai, tera ek message meri saari tension khatam kar deta hai, aur tera saath meri zindagi ki sabse badi blessing hai.\n\nThank you har chhoti-badi baat me mera saath dene ke liye, meri bakwaas sunne ke liye, mujhe samajhne ke liye aur bina kisi reason ke bhi mujhe itna pyaar karne ke liye.\n\nMain promise karta hoon ki har situation me, har khushi aur har mushkil me tera haath kabhi nahi chhodunga. ❤️\n\nI Love You Infinity × Infinity. ♾️💕",

  closing: "Hamesha Sirf Tumhara... ❤️🥺",
},

  audioTrackUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
};
