export const checkHeading = (str) => {
  return /^(\*)(\*)(.*)\*$/.test(str);
};

export const replaceHeadingStarts = (str) => {
  return str.replace(/^(\*)(\*)|(\*)$/g, "");
};
