export const humanReadableDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const formatLineEndings = (text: string) => {
  if (typeof text !== 'string') {
    return '';
  }

  return text.replace(', ', '\n');
};
