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

export type ApiResponse = {
  getToken: { code: 200; body: { token: string } };
  getCounter: { code: 200; body: { counter: number } };
  postCounter: { code: 200; body: { counter: number } };
};
export type ApiRequest = {
  postCounter: {
    payload: { performer: string; title: string; fileName: string; cue: string };
  };
};
