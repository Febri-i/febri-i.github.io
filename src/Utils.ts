import { IconTree } from "solid-icons";

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.substring(1, str.length);
}

export function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

export function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(Math.min(val, max), min);
}

export function normalizeStr(str: string) {
  return str
    .split("-")
    .map((str: any) => capitalize(str))
    .join(" ");
}

export function svgStr2IconTree(str: string): IconTree {
  let attr: any = {};

  let startin = str.replaceAll("\n", " ").trim();
  startin = startin.substring(4, startin.length - 4).trim();

  let splitted = startin.split(">");

  splitted[0]
    .trim()
    .split('" ')
    .forEach((str) => {
      let splitagain = str.split('="');
      if (splitagain.length == 2) {
        attr[splitagain[0]] = splitagain[1];
      } else {
        throw Error("Error invalid svg " + str);
      }
    });

  return { c: splitted.slice(1, splitted.length).join(">") + ">", a: attr };
}
