/**
 * @name asyncForEach
 * @description Creates an asynchronous for each iterator.
 * @param  {array} array The array to be iterated over.
 * @param  {function} callback A function that will be called for each iteration.
 * @example
 *
 * await asyncForEach([1, 2, 3, 4, 5], async (number) => {
 *   // Do something asynchronous, for example, wait for 1 second
 *   await waitFor(1000);
 *   // Log the number to the console
 *   console.log("number :", number);
 *  });
 */
const asyncForEach = async (
  array: unknown[],
  callback: (data: any, index: number, array: any[]) => void
) => {
  // Begin loop
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export default asyncForEach;
