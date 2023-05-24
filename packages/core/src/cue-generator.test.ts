import { cueGeneratorFactory } from './cue-generator';
import { Formatter } from './formatter';
import { Parser } from './parser';

describe('cueFactory', () => {
  it('factory instantiates a cue generator with the default parser and formatter', () => {
    const gnerator = cueGeneratorFactory();
    expect(gnerator.parser).toBeInstanceOf(Parser);
    expect(gnerator.formatter).toBeInstanceOf(Formatter);
  });
  it('cue generator should create a cue', () => {
    const generator = cueGeneratorFactory();
    const actual = generator.create({
      performer: 'Marilyn Manson',
      title: 'We Are Chaos',
      fileName: 'we-are-chaos.mp3',
      fileType: 'mp3',
      trackList: '01 Red Black and Blue',
      regionsList: '',
    });

    const expected = `PERFORMER "Marilyn Manson"
TITLE "We Are Chaos"
FILE "we-are-chaos.mp3" mp3
  TRACK 01 AUDIO
    PERFORMER "Marilyn Manson"
    TITLE "Red Black and Blue"
    INDEX 01 00:00:00
`;
    expect(actual).toEqual(expected);
  });
});
