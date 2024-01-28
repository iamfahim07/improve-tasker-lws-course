const letter = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

export const colorGenerator = () => {
  let hexColorCode = "#";

  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * letter.length);
    hexColorCode += letter[index];
  }
  return hexColorCode;
};
