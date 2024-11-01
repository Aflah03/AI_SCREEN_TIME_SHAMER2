import { AppStats } from '../types';

const comments = {
  socialMedia: [
    { text: "Another hour scrolling? I'm sure those memes were life-changing...", severity: 'mild' },
    { text: "Your social media addiction is reaching new heights! Maybe try actual socializing?", severity: 'medium' },
    { text: "Congratulations! You've successfully avoided real life for another day!", severity: 'savage' },
  ],
  productivity: [
    { text: "At least you pretended to work today!", severity: 'mild' },
    { text: "Your productivity is as impressive as a sleeping sloth.", severity: 'medium' },
    { text: "Did you know some people actually finish their tasks? Wild concept, right?", severity: 'savage' },
  ],
  entertainment: [
    { text: "Netflix asked if you're still watching. Are you?", severity: 'mild' },
    { text: "Your couch has officially molded to your body shape.", severity: 'medium' },
    { text: "Breaking: Local person forgets what outside looks like!", severity: 'savage' },
  ],
  gaming: [
    { text: "Level up your game, level down your life!", severity: 'mild' },
    { text: "Your character is progressing nicely. You? Not so much.", severity: 'medium' },
    { text: "Achievement Unlocked: Peak Procrastination!", severity: 'savage' },
  ],
};

export const generateSassyComment = (category: keyof AppStats, hours: number) => {
  const severity = hours <= 2 ? 'mild' : hours <= 4 ? 'medium' : 'savage';
  const categoryComments = comments[category];
  return categoryComments.find((c) => c.severity === severity) || categoryComments[0];
};