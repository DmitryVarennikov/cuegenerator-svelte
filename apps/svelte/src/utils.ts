export const replaceFileExt = (fileName: string, ext: string) => {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex === -1) return fileName + ext;

  const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
  return baseName + ext;
};

export const makeCueFileName = (soundFileName: string) => {
  if (soundFileName) return replaceFileExt(soundFileName, '.cue');
  return 'Untitled.cue';
};
