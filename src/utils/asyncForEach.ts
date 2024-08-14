/**
 * @name asyncForEach
 * @description Creates an asynchronous for each iterator.
 * @param  {array} array The array to be iterated over.
 * @param  {function} callback A function that will be called for each iteration.
 * @example
 *
 * await asyncForEach([1, 2, 3, 4, 5], async (number) => {
 *   // Do something asynchronous
 *  });
 */
const asyncForEach = async <T>(
  array: T[],
  callback: (data: T, index: number, array: T[]) => void
) => {
  // Begin loop
  for (let index = 0; index < array.length; index++) {
    // Await the asynchronous callback function for each element
    await callback(array[index], index, array);
  }
};

export default asyncForEach;
