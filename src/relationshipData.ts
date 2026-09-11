import { RelationshipConfig } from './types';

/**
 * =========================================================================
 * 💌 RELATIONSHIP CONFIGURATION DATA
 * =========================================================================
 * You can edit all personal details, names, photos, song files, and letters
 * directly in this file!
 *
 * 1. HER PHOTOS: Update the `image` URLs inside `memories` or `songAlbumArt`.
 *    You can use local files like "/assets/photo1.jpg" or external image links.
 * 2. OUR SONG: Set `songAudioSrc` to "/assets/song.mp3" or any audio file.
 * 3. OUR NAMES: Edit `girlfriendName` and `myName`.
 * 4. OUR MEMORIES: Edit items in the `memories` array.
 * 5. CUSTOM APOLOGY & LETTERS: Edit `apologyLetter` and `deepLetter`.
 * =========================================================================
 */

export const initialRelationshipData: RelationshipConfig = {
  girlfriendName: "My Love",
  myName: "Yours Always",

  // Music Player details
  songTitle: "Our Song",
  songArtist: "The melody that will always belong to us",
  songAlbumArt: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop", // Warm vinyl / intimate lighting
  songAudioSrc: "assets/song.mp3", // Put your custom mp3 in the assets folder or use any audio URL

  // Screen 2: The Apology Letter
  apologyLetter: {
    heading: "I’m not here to convince you.",
    subtitle: "I’m here because I finally understand that saying sorry is easy. Making you trust me again is the difficult part.",
    body: [
      "I know I hurt you. And I know that after what happened, my words probably don't mean as much as they used to.",
      "I don't want to defend myself. I don't want to make excuses. And I definitely don't want to tell you that you should stop being angry.",
      "If I were in your place, maybe I'd feel the same.",
      "I'm sorry for giving you a reason to doubt me. I'm sorry for making you question something that should have always felt safe.",
      "I can't magically bring your trust back with one website, one message, or one apology.",
      "But I can start earning it again.",
      "Slowly. Honestly. Through my actions."
    ],
    signoff: "With all my heart,"
  },

  // Screen 3: "I Understand" interactive cards
  understandingCards: [
    {
      id: "anger",
      title: "Your anger",
      shortSnippet: "You have every right to feel it.",
      fullMessage: "You don't have to hide it just to make things easier for me. Your anger is valid, and I am here to hold space for it rather than ask you to sweep it away.",
      icon: "ShieldAlert"
    },
    {
      id: "doubts",
      title: "Your doubts",
      shortSnippet: "Words aren't enough right now.",
      fullMessage: "I understand why my words may not be enough right now. Trust is built through consistent, quiet proof over time—not instant promises.",
      icon: "HelpCircle"
    },
    {
      id: "distance",
      title: "Your distance",
      shortSnippet: "Space is yours to take.",
      fullMessage: "I won't force you to come closer before you're ready. I will wait patiently, right where I am, without guilt or pressure.",
      icon: "Clock"
    }
  ],

  // Screen 3: What I Can Actually Do (5 Commitments)
  commitments: [
    {
      id: 1,
      title: "I’ll communicate instead of hiding things.",
      description: "No selective omissions, no half-truths, no retreating into silence when things feel uncomfortable.",
      iconName: "MessageCircleHeart"
    },
    {
      id: 2,
      title: "I’ll listen instead of immediately defending myself.",
      description: "I will hear your pain and your point of view completely before uttering a single justification.",
      iconName: "Ear"
    },
    {
      id: 3,
      title: "I’ll respect your boundaries.",
      description: "If you need space, silence, or time, I will honor it without making you feel guilty or anxious for taking it.",
      iconName: "Compass"
    },
    {
      id: 4,
      title: "I’ll let my actions prove what my words cannot.",
      description: "Day in and day out, through consistency, reliability, and steady presence, rather than grand speeches.",
      iconName: "CheckCircle2"
    },
    {
      id: 5,
      title: "I’ll give you time instead of demanding forgiveness.",
      description: "Forgiveness is a gift that cannot be scheduled, and I will be patient for as long as you need.",
      iconName: "Hourglass"
    }
  ],

  // Screen 7: The Interactive Constellation Stars (Forms a subtle heart arc)
  constellation: [
    {
      id: "star-1",
      title: "Our First Meet",
      date: "The beginning of it all",
      message: "yr jab apn first time mile the me tujhe lene aaya tha railway station yrr kitna accha laga tha meko or teko bhi fir sath me brkfst kiya apn ne ❤️",
      hint: "Jab railway station pe first time mile the...",
      x: 18,
      y: 46
    },
    {
      id: "star-2",
      title: "First Time Shopping at DMart",
      date: "DMart & the park walk",
      message: "yr jab apn dmart gye fir park bhi gye woh kitna accha time tha apn ka sath me ❤️",
      hint: "Jab apn DMart aur park gaye the...",
      x: 32,
      y: 22
    },
    {
      id: "star-3",
      title: "Going to the Mandir Together",
      date: "A pure & peaceful day",
      message: "jab apn gye the mandir eksath kitna accha tha yr woh din pura... first time me ese kisi k sath hath pakad kar mandir gya tha ekdm pure man se ❤️",
      hint: "Jab apn mandir gaye the ek sath...",
      x: 50,
      y: 38
    },
    {
      id: "star-4",
      title: "Our Favourite Memory",
      date: "The night we lost track of time",
      message: "Walking side by side, nowhere to be, talking about everything from our childhoods to what scared us most. I felt truly seen.",
      hint: "When time completely stopped mattering.",
      x: 68,
      y: 22
    },
    {
      id: "star-5",
      title: "Sitting in the Park Together",
      date: "The day feelings grew so deep",
      message: "jab apn park me bethe the sath me tab mujhe itni feelings aayi aur me tere se bohot zyada attach ho gya ❤️",
      hint: "Jab park me sath bethe the...",
      x: 82,
      y: 46
    }
  ],

  // Screen 8: Full-Screen Letter to Her
  deepLetter: {
    heading: "To the girl I don't want to lose.",
    paragraphs: [
      "I don't expect this website to fix everything.",
      "I don't expect you to suddenly forget what happened.",
      "And I don't expect one apology to rebuild something that took time to break.",
      "I just want you to know that I understand what I have to do now.",
      "I have to be patient. I have to be consistent. I have to be honest. And most importantly, I have to show you — instead of repeatedly telling you — that you can trust me again.",
      "If you need time, I'll respect that.",
      "If you're angry, I'll listen.",
      "If you're hurt, I won't tell you that you shouldn't be.",
      "I love you.",
      "But I know that love isn't enough if my actions don't make you feel safe in it.",
      "So I'm not asking you to trust me today.",
      "I'm asking for the chance to earn it back."
    ]
  },

  // Screen 9: Final Question Responses
  finalQuestion: {
    maybeResponse: {
      title: "Thank you for this chance.",
      message: "Then I'll spend less time trying to convince you, and more time giving you reasons to believe me."
    },
    needTimeResponse: {
      title: "I hear you, completely.",
      message: [
        "Okay.",
        "Take your time.",
        "I won't turn your need for space into another reason for you to feel bad.",
        "I'll be here."
      ],
      footnote: "No pressure. No countdown. Just honesty."
    }
  },

  // 🎁 FINAL SURPRISE — "ONE MORE THING"
  finalSurprise: {
    enabled: true,
    image: "assets/us-final.jpg", // Replace with your actual photo or upload in customizer
    teaserTitle: "I made one more thing for you.",
    buttonText: "Open ❤️",
    messageBlocks: [
      [
        "Whatever happens next,",
        "thank you for being a part of my life."
      ],
      [
        "For all the laughs.",
        "For all the memories.",
        "For all the ordinary moments",
        "that somehow became my favourite ones."
      ],
      [
        "I don't know what tomorrow looks like.",
        "",
        "But I'm grateful that I got to know you,",
        "love you,",
        "and experience all of this with you."
      ]
    ],
    signoff: "— Yours always,",
    optionalClosingLines: [
      "You don't have to answer anything right now.",
      "Just take care of yourself. ❤️"
    ]
  },

  // Footer 5-Click Easter Egg
  easterEggText: {
    lead: "Okay... one last thing.",
    body: "Thank you for every version of us. Even the difficult ones.",
    conclusion: "Because I'm still choosing you."
  }
};
