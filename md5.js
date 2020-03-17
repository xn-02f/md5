/**
 * This is a file that is used to convert string to md5 hash.
 * (c) 2018-2020 | xn-02f Lab
 * License: MIT
 */

/**
 * Convert string to md5 hash.
 *
 * @param {string} data The raw string you want to convert.
 * @return {string} The hexadecimal hash string that is handled and converted.
 */
module.exports = data => {
    const stringUTF8 = unescape(encodeURIComponent(data));

    const stringNumArr = rstr2binl(stringUTF8);

    const binlMD5Arr = binlMD5(stringNumArr, stringUTF8.length * 8);

    const rawString = binl2rstr(binlMD5Arr);

    return rawStringToHex(rawString);
}

const rstr2binl = input => {
    let output = [];

    output[(input.length >> 2) - 1] = undefined;

    for (let i = 0; i < output.length; i ++) {
        output[i] = 0;
    }

    for (let i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
    }

    return output;
}

const safeAdd = (x, y) => {
    let lsw = (x & 0xffff) + (y & 0xffff);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);

    return (msw << 16) | (lsw & 0xffff);
}

/**
 * bitRotateLeft rotates x left n bits.
 */
const bitRotateLeft = (num, cnt) => (num << cnt) | (num >>> (32 - cnt));

const md5cmn = (q, a, b, x, s, t) => safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);

/**
 * FF, GG, HH, and II transformations for rounds 1, 2, 3, and 4.
 * Rotation is separate from addition to prevent recomputation.
 */
const FF = (a, b, c, d, x, s, t) => md5cmn((b & c) | (~b & d), a, b, x, s, t);
const GG = (a, b, c, d, x, s, t) => md5cmn((b & d) | (c & ~d), a, b, x, s, t);
const HH = (a, b, c, d, x, s, t) => md5cmn(b ^ c ^ d, a, b, x, s, t);
const II = (a, b, c, d, x, s, t) => md5cmn(c ^ (b | ~d), a, b, x, s, t);

const binlMD5 = (x, len) => {
    // append padding
    x[len >> 5] |= 0x80 << (len % 32);
    x[((len + 64) >>> 9 << 4) + 14] = len;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    const originA = a;
    const originB = b;
    const originC = c;
    const originD = d;

    for (let i = 0; i < x.length; i += 16) {
        /* Round 1 */
        a = FF(a, b, c, d, x[i], 7, -680876936);
        d = FF(d, a, b, c, x[i + 1], 12, -389564586);
        c = FF(c, d, a, b, x[i + 2], 17, 606105819);
        b = FF(b, c, d, a, x[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, x[i + 4], 7, -176418897);
        d = FF(d, a, b, c, x[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, x[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, x[i + 7], 22, -45705983);
        a = FF(a, b, c, d, x[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, x[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, x[i + 10], 17, -42063);
        b = FF(b, c, d, a, x[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, x[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, x[i + 13], 12, -40341101);
        c = FF(c, d, a, b, x[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, x[i + 15], 22, 1236535329);
        /* Round 2 */
        a = GG(a, b, c, d, x[i + 1], 5, -165796510);
        d = GG(d, a, b, c, x[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, x[i + 11], 14, 643717713);
        b = GG(b, c, d, a, x[i], 20, -373897302);
        a = GG(a, b, c, d, x[i + 5], 5, -701558691);
        d = GG(d, a, b, c, x[i + 10], 9, 38016083);
        c = GG(c, d, a, b, x[i + 15], 14, -660478335);
        b = GG(b, c, d, a, x[i + 4], 20, -405537848);
        a = GG(a, b, c, d, x[i + 9], 5, 568446438);
        d = GG(d, a, b, c, x[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, x[i + 3], 14, -187363961);
        b = GG(b, c, d, a, x[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, x[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, x[i + 2], 9, -51403784);
        c = GG(c, d, a, b, x[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, x[i + 12], 20, -1926607734);
        /* Round 3 */
        a = HH(a, b, c, d, x[i + 5], 4, -378558);
        d = HH(d, a, b, c, x[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, x[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, x[i + 14], 23, -35309556);
        a = HH(a, b, c, d, x[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, x[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, x[i + 7], 16, -155497632);
        b = HH(b, c, d, a, x[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, x[i + 13], 4, 681279174);
        d = HH(d, a, b, c, x[i], 11, -358537222);
        c = HH(c, d, a, b, x[i + 3], 16, -722521979);
        b = HH(b, c, d, a, x[i + 6], 23, 76029189);
        a = HH(a, b, c, d, x[i + 9], 4, -640364487);
        d = HH(d, a, b, c, x[i + 12], 11, -421815835);
        c = HH(c, d, a, b, x[i + 15], 16, 530742520);
        b = HH(b, c, d, a, x[i + 2], 23, -995338651);
        /* Round 4 */
        a = II(a, b, c, d, x[i], 6, -198630844);
        d = II(d, a, b, c, x[i + 7], 10, 1126891415);
        c = II(c, d, a, b, x[i + 14], 15, -1416354905);
        b = II(b, c, d, a, x[i + 5], 21, -57434055);
        a = II(a, b, c, d, x[i + 12], 6, 1700485571);
        d = II(d, a, b, c, x[i + 3], 10, -1894986606);
        c = II(c, d, a, b, x[i + 10], 15, -1051523);
        b = II(b, c, d, a, x[i + 1], 21, -2054922799);
        a = II(a, b, c, d, x[i + 8], 6, 1873313359);
        d = II(d, a, b, c, x[i + 15], 10, -30611744);
        c = II(c, d, a, b, x[i + 6], 15, -1560198380);
        b = II(b, c, d, a, x[i + 13], 21, 1309151649);
        a = II(a, b, c, d, x[i + 4], 6, -145523070);
        d = II(d, a, b, c, x[i + 11], 10, -1120210379);
        c = II(c, d, a, b, x[i + 2], 15, 718787259);
        b = II(b, c, d, a, x[i + 9], 21, -343485551);
        /* Round Last */
        a = safeAdd(a, originA);
        b = safeAdd(b, originB);
        c = safeAdd(c, originC);
        d = safeAdd(d, originD);
    }

    return [a, b, c, d];
}

const binl2rstr = input => {
    const length32 = input.length * 32;
    let output = '';

    for (let i = 0; i < length32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
    }

    return output;
}

const rawStringToHex = input => {
    const hexTab = '0123456789abcdef';
    let output = '';

    for (let i = 0; i < input.length; i += 1) {
        let x = input.charCodeAt(i);
        output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }

    return output;
}
