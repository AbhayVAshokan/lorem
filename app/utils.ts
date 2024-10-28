const DEFAULT_PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const DICTIONARY = [
  "a",
  "ac",
  "accumsan",
  "ad",
  "aenean",
  "aliquam",
  "aliquet",
  "ante",
  "aptent",
  "arcu",
  "at",
  "auctor",
  "augue",
  "bibendum",
  "blandit",
  "class",
  "commodo",
  "condimentum",
  "congue",
  "consequat",
  "conubia",
  "convallis",
  "cras",
  "cubilia",
  "cum",
  "curabitur",
  "curae",
  "cursus",
  "dapibus",
  "diam",
  "dictum",
  "dictumst",
  "dignissim",
  "dis",
  "donec",
  "dui",
  "duis",
  "egestas",
  "eget",
  "eleifend",
  "elementum",
  "enim",
  "erat",
  "eros",
  "est",
  "et",
  "etiam",
  "eu",
  "euismod",
  "facilisi",
  "facilisis",
  "fames",
  "faucibus",
  "felis",
  "fermentum",
  "feugiat",
  "fringilla",
  "fusce",
  "gravida",
  "habitant",
  "habitasse",
  "hac",
  "hendrerit",
  "himenaeos",
  "iaculis",
  "id",
  "imperdiet",
  "in",
  "inceptos",
  "integer",
  "interdum",
  "justo",
  "lacinia",
  "lacus",
  "laoreet",
  "lectus",
  "leo",
  "libero",
  "ligula",
  "litora",
  "lobortis",
  "luctus",
  "maecenas",
  "magna",
  "magnis",
  "malesuada",
  "massa",
  "mattis",
  "mauris",
  "metus",
  "mi",
  "molestie",
  "mollis",
  "montes",
  "morbi",
  "mus",
  "nam",
  "nascetur",
  "natoque",
  "nec",
  "neque",
  "netus",
  "nibh",
  "nisi",
  "nisl",
  "non",
  "nostra",
  "nulla",
  "nullam",
  "nunc",
  "odio",
  "orci",
  "ornare",
  "parturient",
  "pellentesque",
  "penatibus",
  "per",
  "pharetra",
  "phasellus",
  "placerat",
  "platea",
  "porta",
  "porttitor",
  "posuere",
  "potenti",
  "praesent",
  "pretium",
  "primis",
  "proin",
  "pulvinar",
  "purus",
  "quam",
  "quis",
  "quisque",
  "rhoncus",
  "ridiculus",
  "risus",
  "rutrum",
  "sagittis",
  "sapien",
  "scelerisque",
  "sed",
  "sem",
  "semper",
  "senectus",
  "sociis",
  "sociosqu",
  "sodales",
  "sollicitudin",
  "suscipit",
  "suspendisse",
  "taciti",
  "tellus",
  "tempor",
  "tempus",
  "tincidunt",
  "torquent",
  "tortor",
  "tristique",
  "turpis",
  "ullamcorper",
  "ultrices",
  "ultricies",
  "urna",
  "ut",
  "varius",
  "vehicula",
  "vel",
  "velit",
  "venenatis",
  "vestibulum",
  "vitae",
  "vivamus",
  "viverra",
  "volutpat",
  "vulputate",
];

const TERMINATOR = [".", ",", ";"];

Array.prototype.shuffle = function () {
  let index = this.length;

  while (index) {
    const randomIndex = Math.floor(Math.random() * index);
    index--;
    [this[index], this[randomIndex]] = [this[randomIndex], this[index]];
  }

  return this;
};

const generateParagraph = () => {
  // 6-9 sentences per paragraph.
  const sentencesCount = 6 + Math.floor(Math.random() * 4);
  let paragraph = "";

  for (let i = 0; i < sentencesCount; ++i) {
    // 5-8 words per sentence.
    const wordCount = 5 + Math.floor(Math.random() * 8);
    let sentence = DICTIONARY.shuffle().slice(0, wordCount).join(" ");

    // Capitalize the first character
    if (i === 0 || paragraph.at(-1) === ".") {
      sentence = sentence[0].toUpperCase() + sentence.slice(1);
    }

    paragraph += " " + sentence + TERMINATOR.shuffle()[0];
  }

  // Paragraphs end with a period.
  paragraph = paragraph.replace(/.$/, ".").trim();

  return paragraph;
};

export const generateLoremIpsum = (n: number) => {
  let result = [DEFAULT_PARAGRAPH];

  if (n <= 1) return result;
  if (n > 99) n = 99;

  while (--n) result.push(generateParagraph());

  return result;
};
