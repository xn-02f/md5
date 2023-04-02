/*
 * This file is used to test.
 */
import test from 'ava';

import md5 from '../md5.js';

// Instance object for testing
const example = {
    name: 'xn-02f',
    email: 'i@huiyifyj.cn',
    url: 'xn--02f.com',
    chinese: '中文',
    unicode: '\u4f60\u597d',
    uriReserved: ';/?:@&=+$,'
}

// Related MD5 hash value
const md5Hash = {
    name: '54d30fa674d13e3598970bc9c5e2388e',
    email: '11b334f003ef029c9d154f5dbae18b44',
    url: '014dab5b5a990d379b2306f5d0839261',
    chinese: 'a7bac2239fcdcb3a067903d8077c4a07',
    unicode: '7eca689f0d3389d9dea66ae112e5cfd7',
    uriReserved: 'cae1061daebd7e3700817d67a2727fc2'
}

test('MD5 Test',  t => {
    t.is(
        md5(example.name),
        md5Hash.name,
        `'${example.name}' Converted to MD5 Value Test.`
    )

    t.is(
        md5(example.email),
        md5Hash.email,
        `'${example.email}' Converted to MD5 Value Test.`
    )

    t.is(
        md5(example.url),
        md5Hash.url,
        `'${example.url}' Converted to MD5 Value Test.`
    )
})

test('Special Strings Test', t => {
    t.is(
        md5(example.uriReserved),
        md5Hash.uriReserved,
        `Test reserved characters of URI: '${example.uriReserved}'.`
    )

    t.is(
        md5(example.chinese),
        md5Hash.chinese,
        `Test chinese string '${example.chinese}'.`
    )
})
