const MIN_RANGE = 1;
const MAX_RANGE = 65536;

function getRandomUint16Value() {
  const uint16 = new Uint16Array(1);
  window.crypto.getRandomValues(uint16);

  return uint16[0];
}

function getRandomInt(min = MIN_RANGE, max = MAX_RANGE) {
  if (
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    min < MIN_RANGE ||
    max > MAX_RANGE ||
    min >= max
  ) {
    return getRandomInt(MIN_RANGE, MAX_RANGE);
  }

  const range = max - min + 1;
  const value = getRandomUint16Value();

  if (value >= Math.floor(MAX_RANGE / range) * range) {
    return getRandomInt(min, max);
  }

  return min + (value % range);
}

console.log(getRandomInt());
