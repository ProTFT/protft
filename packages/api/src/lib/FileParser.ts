interface ParsedFile {
  titles: string[];
  lines: string[];
}

export const parseFileString = (fileString: string): ParsedFile => {
  const [fileHeader, ...lines] = fileString.replace(/\r/g, "").split("\n");
  return {
    titles: fileHeader.split(","),
    lines,
  };
};
