export type CueInputState = {
  performer: string;
  title: string;
  fileName: string;
  fileType: string;
  trackList: string;
  regionsList: string;
};
export type CueOutputState = { cue: string };
export type CueState = { input: CueInputState; output: CueOutputState };
