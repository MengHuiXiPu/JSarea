// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;


// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';
// good
import AirbnbStyleGuide from './AirbnbStyleGuide';



// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';
// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;


// bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';
// good
import foo, { named1, named2 } from 'foo';
// good
import foo, {
  named1,
  named2,
} from 'foo';


// bad
let foo = 3;
export { foo };
// good
const foo = 3;
export { foo };


// bad
export function foo() {}
// good
export default function foo() {}

// bad
import foo from 'foo';
foo.init();
import bar from 'bar';
// good
import foo from 'foo';
import bar from 'bar';
foo.init();


// bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';
// good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} from 'path';



// bad
import fooSass from 'css!sass!foo.scss';
import barCss from 'style!css!bar.css';
// good
import fooSass from 'foo.scss';
import barCss from 'bar.css';

// bad
import foo from './foo.js';
import bar from './bar.jsx';
import baz from './baz/index.jsx';

// good
import foo from './foo';
import bar from './bar';
import baz from './baz';