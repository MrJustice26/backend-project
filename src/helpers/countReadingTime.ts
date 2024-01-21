export const countReadingTime = (body: string): number => {
  const wordsPerMinute = 180;
  const numberOfWords = body.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
};
