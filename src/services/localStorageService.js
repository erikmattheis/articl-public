const set = (name, val) => {
  localStorage.setItem(
    name,
    val,
  );

  if (
    window.location.hostname === 'localhost'
    || window.location.hostname === '192.168.1.130'
  ) {
    // Chrome localhost bug
    localStorage.getItem(val);
  }
};
const get = (item) => localStorage.getItem(item);
const clear = () => localStorage.clear();

export {
  clear, get, set,
};
