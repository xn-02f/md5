import { expectType } from 'tsd';

import md5 from '../md5.js';

expectType<string>(md5('xn-02f'));
