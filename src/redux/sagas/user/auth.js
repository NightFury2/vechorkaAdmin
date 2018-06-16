export function* loginFlow() {
  yield () => { return { login: true }; };
}
