// Set up the throttler
const throttle = (fn, delay) => {
  // Capture the current time
  let time = Date.now();

  return () => {
    if (time + delay - Date.now() <= 0) {
      // Run the function passed to throttler,
      // and reset the `time` variable
      fn();
      time = Date.now();
    }
  };
};
