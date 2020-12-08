const luke = {
    jedi: true,
    age: 28,
  };
  
  // bad
  const isJedi = luke['jedi'];
  
  // good
  const isJedi = luke.jedi;


  const luke = {
    jedi: true,
    age: 28,
  };
  
  function getProp(prop) {
    return luke[prop];
  }
  
  const isJedi = getProp('jedi');

  // bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;