/**
 * Convert string to md5 hash.
 *
 * @param {string} data - The raw string you want to convert.
 * @return {string} The hexadecimal hash string that is handled and converted.
 * @example
 * ```
 * import md5 = require('@xn-02f/md5');
 * // import md5 from '@xn-02f/md5';
 * md5('xn-02f'); //=> '54d30fa674d13e3598970bc9c5e2388e'
 * ```
 */
declare const md5: (data: string) => string;

export = md5;
