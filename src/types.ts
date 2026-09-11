export interface CommitmentItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface ConstellationStar {
  id: string;
  title: string;
  date: string;
  message: string;
  x: number; // 0-100 percentage in constellation coordinate system
  y: number; // 0-100 percentage in constellation coordinate system
  hint: string;
}

export interface UnderstandingCard {
  id: string;
  title: string;
  shortSnippet: string;
  fullMessage: string;
  icon: string;
}

export interface FinalSurpriseConfig {
  enabled?: boolean;
  image: string;
  name?: string;
  teaserTitle: string;
  buttonText: string;
  messageBlocks: string[][];
  signoff: string;
  optionalClosingLines: string[];
}

export interface RelationshipConfig {
  girlfriendName: string;
  myName: string;
  songTitle: string;
  songArtist: string;
  songAlbumArt: string;
  songAudioSrc: string; // e.g. "assets/song.mp3" or URL
  apologyLetter: {
    heading: string;
    subtitle: string;
    body: string[];
    signoff: string;
  };
  understandingCards?: UnderstandingCard[];
  commitments: CommitmentItem[];
  constellation: ConstellationStar[];
  deepLetter: {
    heading: string;
    paragraphs: string[];
  };
  finalQuestion: {
    maybeResponse: {
      title: string;
      message: string;
    };
    needTimeResponse: {
      title: string;
      message: string[];
      footnote: string;
    };
  };
  finalSurprise?: FinalSurpriseConfig;
  easterEggText: {
    lead: string;
    body: string;
    conclusion: string;
  };
}
