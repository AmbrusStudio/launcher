export function stringSlice(str: string, start: number, end: number): string {
  return `${str.slice(0, start)} ... ${str.slice(-Math.abs(end))}`
}
