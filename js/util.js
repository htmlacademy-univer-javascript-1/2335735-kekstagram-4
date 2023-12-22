export const call = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`${response.status}. ${response.statusText}`);
  }

  return response.json();
};

export const debounce = (callback, delay = 500) => {
  let statusTimeout;
  let latestCallTime;

  return (...rest) => {
    const passedTime = Date.now() - latestCallTime;
    const callDelay = Math.max(delay - passedTime, 0);
    clearTimeout(statusTimeout);

    statusTimeout = setTimeout(() => {
      callback(...rest);
      latestCallTime = Date.now();
    }, callDelay);
  };
};
