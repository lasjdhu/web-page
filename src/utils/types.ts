export type EntryType = "system" | "input" | "output" | "error";

export interface HistoryEntry {
  content: string;
  type: EntryType;
  timestamp?: Date;
  prompt?: string;
}

export type Command =
  | "help"
  | "clear"
  | "date"
  | "echo"
  | "pwd"
  | "ls"
  | "whoami"
  | "cd"
  | "history"
  | "cat"
  | "su"
  | "exit";

export interface File {
  type: "file";
  content: string;
  permissions: string;
  owner: string;
  created: Date;
  modified: Date;
}

export interface Directory {
  type: "dir";
  contents: Record<string, File | Directory>;
  permissions: string;
  owner: string;
  created: Date;
  modified: Date;
}
