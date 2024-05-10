export function checkTimestampBeforeToday(value: number): boolean {
  return value <= Math.floor(Date.now() / 1000)
}
