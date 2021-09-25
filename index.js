const MIN_RANGE = 1;
const MAX_RANGE = 65_536;

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

/////////////////////////// TESTS ///////////////////////////
const ITERATIONS = 100;
const TEST_ARRAY_SIZE = 5000;

function calculateAverage(array) {
  var total = 0;
  var count = 0;

  array.forEach((item) => {
    total += item;
    count++;
  });

  return total / count;
}

const results = [];
const divider = TEST_ARRAY_SIZE / 100;
const emptyArray = new Array(TEST_ARRAY_SIZE).fill(0);

for (let i = 0; i < ITERATIONS; i++) {
  const arrayWithGeneratedValues = emptyArray.map(getRandomInt);
  const arrayOfUniqueValues = [...new Set(arrayWithGeneratedValues)];

  const uniqueValues = arrayOfUniqueValues.length;
  const percentageChanceToGenerateDuplicateValue = 100 - uniqueValues / divider;

  results.push(percentageChanceToGenerateDuplicateValue);
}

const averageChance = calculateAverage(results);
const formattedAverageChanceValue = averageChance.toFixed(1);
const message = `${formattedAverageChanceValue}% change to generate duplicate value in the group of ${TEST_ARRAY_SIZE} elements.`;

document.body.innerText = message;
