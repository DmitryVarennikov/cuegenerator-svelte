import { Formatter } from './formatter';
import { Parser, ParserHelper } from './parser';

const defaultParser = new Parser(new ParserHelper());
const defaultFormatter = new Formatter();

type CueProps = {
  performer: string;
  title: string;
  fileName: string;
  fileType: string;
  trackList: string;
  regionsList: string;
};

export class CueGenerator {
  constructor(readonly parser: Parser, readonly formatter: Formatter) {}

  create({ performer, title, fileName, fileType, trackList, regionsList }: CueProps) {
    if (!performer && !title && !fileName && !trackList) return '';

    const formattedPerformer = this.formatter.formatPerformer(this.parser.parsePerformer(performer));
    const formattedTitle = this.formatter.formatTitle(this.parser.parseTitle(title));
    const formattedFileName = this.formatter.formatFilename(this.parser.parseFileName(fileName), fileType);
    const formattedTracklist = this.formatter.formatTracklist(
      this.parser.parseTrackList(trackList),
      this.parser.parseTimings(regionsList),
      performer
    );

    return formattedPerformer + formattedTitle + formattedFileName + formattedTracklist;
  }
}

export const cueGeneratorFactory = () => new CueGenerator(defaultParser, defaultFormatter);
