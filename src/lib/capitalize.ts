export function Capitalize(string: string) {
  return string.at(0)?.toUpperCase() + string.slice(1);
}
