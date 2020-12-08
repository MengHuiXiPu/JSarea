// bad
const name = "Capt. Janeway";

// bad - template literals should contain interpolation or newlines
const name = `Capt. Janeway`;
// good
const name = 'Capt. Janeway';

// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';
// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';
// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';


// bad
function sayHi(name) {
    return 'How are you, ' + name + '?';
  }
  // bad
  function sayHi(name) {
    return ['How are you, ', name, '?'].join();
  }
  // bad
  function sayHi(name) {
    return `How are you, ${ name }?`;
  }
  // good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }


  // bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;