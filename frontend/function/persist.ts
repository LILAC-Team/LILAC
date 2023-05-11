interface persistProps {
  name: string;
  state: object;
}

export const persist = (name, state) => {
  return window.localStorage.setItem(name, JSON.stringify(state));
};
