export function sortArray(array: any[], key: string) {
  return array.sort((a: any, b: any) => (a[key] === b[key] ? 0 : a[key] < b[key] ? 1 : -1));
}
