// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo() { return false; }

// good
function bar() {
  return false;
}


// bad
if (test) {
    thing1();
    thing2();
  }
  else {
    thing3();
  }
  
  // good
  if (test) {
    thing1();
    thing2();
  } else {
    thing3();
  }

  // bad
function foo() {
    if (x) {
      return x;
    } else {
      return y;
    }
  }
  
  // bad
  function cats() {
    if (x) {
      return x;
    } else if (y) {
      return y;
    }
  }
  
  // bad
  function dogs() {
    if (x) {
      return x;
    } else {
      if (y) {
        return y;
      }
    }
  }
  
  // good
  function foo() {
    if (x) {
      return x;
    }
  
    return y;
  }
  
  // good
  function cats() {
    if (x) {
      return x;
    }
  
    if (y) {
      return y;
    }
  }
  
  // good
  function dogs(x) {
    if (x) {
      if (z) {
        return y;
      }
    } else {
      return z;
    }
  }