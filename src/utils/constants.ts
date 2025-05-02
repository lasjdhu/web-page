import { type HistoryEntry, type Directory } from "./types";

import lyceum from "../assets/lyceum.png";
import skive from "../assets/skive.png";
import cz from "../assets/cz.png";
import muni from "../assets/muni.png";
import vut from "../assets/vut.png";
import webPage from "../assets/web-page.png";
import gameOfLife from "../assets/game-of-life.png";
import cane from "../assets/cane.png";
import npm from "../assets/npm.png";
import qmaps from "../assets/qmaps.png";

export const AVAILABLE_COMMANDS = [
  "help",
  "clear",
  "date",
  "echo",
  "pwd",
  "ls",
  "whoami",
  "cd",
  "history",
  "cat",
  "su",
  "exit",
] as const;

export const INITIAL_HISTORY: HistoryEntry[] = [
  {
    content:
      "Hate GUI? You can navigate this website using terminal\nType 'help' to see available options",
    type: "system",
    timestamp: new Date(),
  },
];

export const HELP_TEXT = `Available commands:
  help     Show this help
  clear    Clear terminal
  date     Show current date
  echo     Display text
  pwd      Print working directory
  ls       List directory contents
  whoami   Display current user
  cd       Change directory
  history  Show command history
  cat      Display file contents
  su       Switch user
  exit     Exit current user session`;

export const ROOT_USER = "root";
export const ROOT_PASSWORD = "findme";

export const filesystem: Directory = {
  type: "dir",
  contents: {
    Documents: {
      type: "dir",
      contents: {},
      permissions: "drwxr-xr-x",
      owner: "user",
      created: new Date(),
      modified: new Date(),
    },
    Downloads: {
      type: "dir",
      contents: {},
      permissions: "drwxr-xr-x",
      owner: "user",
      created: new Date(),
      modified: new Date(),
    },
    Pictures: {
      type: "dir",
      contents: {},
      permissions: "drwxr-xr-x",
      owner: "user",
      created: new Date(),
      modified: new Date(),
    },
    Projects: {
      type: "dir",
      contents: {},
      permissions: "drwxr-xr-x",
      owner: "user",
      created: new Date(),
      modified: new Date(),
    },
    ".bashrc": {
      type: "file",
      content: "user bash configuration",
      permissions: "-rw-r--r--",
      owner: "user",
      created: new Date(),
      modified: new Date(),
    },
    ".gitconfig": {
      type: "file",
      content: "[user]\nname = Dmitrii Ivanushkin",
      permissions: "-rw-r--r--",
      owner: "user",
      created: new Date(),
      modified: new Date(),
    },
  },
  permissions: "drwxr-xr-x",
  owner: "root",
  created: new Date(),
  modified: new Date(),
};

export const timelineItems = [
  {
    date: "2018 - 2020",
    title: "Business IT Student",
    location: "Russia",
    institution: "Business High School",
    imageUrl: lyceum,
    imageAlt: "Business High School",
    isLeft: true,
  },
  {
    date: "April 2019",
    title: "International Exchange",
    location: "Denmark",
    institution: "Skive College",
    imageUrl: skive,
    imageAlt: "Skive College",
    isLeft: true,
  },
  {
    date: "2020 - 2021",
    title: "Czech Language Course",
    location: "Czech Republic",
    institution: "GoStudy Language School",
    imageUrl: cz,
    imageAlt: "GoStudy",
    isLeft: true,
  },
  {
    date: "April 2023 - Now",
    title: "Front-end Developer",
    location: "Czech Republic",
    institution: "Masaryk University",
    imageUrl: muni,
    imageAlt: "Masaryk University",
    isLeft: false,
  },
  {
    date: "2023 - Now",
    title: "Information Technology Student",
    location: "Czech Republic",
    institution: "Brno University of Technology",
    imageUrl: vut,
    imageAlt: "Brno University of Technology",
    isLeft: true,
  },
];

export const projectItems = [
  {
    title: "motion-event",
    years: "2025 - Now",
    description:
      "Lightweight and efficient Expo module for handling raw motion events on Android",
    link: "https://www.npmjs.com/package/motion-event",
    sourceCode: "https://github.com/lasjdhu/motion-event",
    imageUrl: npm,
  },
  {
    title: "QMaps",
    years: "2025 - Now",
    description:
      "Maps application that uses quantum randomness to generate directions and marker points",
    link: "dev",
    sourceCode: "https://github.com/lasjdhu/qmaps",
    imageUrl: qmaps,
  },
  {
    title: "AI Medical Platform",
    years: "2024",
    description:
      "Cross-platform application that helps people with mental disorders to track their emotions",
    imageUrl: cane,
  },
  {
    title: "This Website",
    years: "2023 - Now",
    description: "Personal portfolio, playground, blog and more",
    imageUrl: webPage,
    link: "dev",
    sourceCode: "https://github.com/lasjdhu/web-page",
  },
  {
    title: "Game of Life",
    years: "2022",
    description: "Conway's Game of Life simulation",
    imageUrl: gameOfLife,
    link: "https://lasjdhu.github.io/game-of-life",
    sourceCode: "https://github.com/lasjdhu/game-of-life",
  },
];
