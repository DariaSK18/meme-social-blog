// Test mock API simulation for delay


export function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}