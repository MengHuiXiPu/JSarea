// bad
function Queue(contents = []) {
    this.queue = [...contents];
}
Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
};

// good
class Queue {
    constructor(contents = []) {
        this.queue = [...contents];
    }
    pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
    }
}

// bad
const inherits = require('inherits');

function PeekableQueue(contents) {
    Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
    return this.queue[0];
};

// good
class PeekableQueue extends Queue {
    peek() {
        return this.queue[0];
    }
}

// bad
Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
};

Jedi.prototype.setHeight = function (height) {
    this.height = height;
};


const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
    jump() {
        this.jumping = true;
        return this;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }
}

const luke = new Jedi();
luke.jump()
    .setHeight(20);


    class Jedi {
        constructor(options = {}) {
          this.name = options.name || 'no name';
        }
      
        getName() {
          return this.name;
        }
      
        toString() {
          return `Jedi - ${this.getName()}`;
        }
      }
      

      // bad
class Jedi {
    constructor() {}
  
    getName() {
      return this.name;
    }
  }
  
  // bad
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
    }
  }
  
  // good
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
      this.name = 'Rey';
    }
  }

  // bad
class Foo {
    bar() { return 1; }
    bar() { return 2; }
  }
  
  // good
  class Foo {
    bar() { return 1; }
  }
  
  // good
  class Foo {
    bar() { return 2; }
  }

  // bad
class Foo {
    bar() {
      console.log('bar');
    }
  }
  
  // good - this is used
  class Foo {
    bar() {
      console.log(this.bar);
    }
  }
  
  // good - constructor is exempt
  class Foo {
    constructor() {
      // ...
    }
  }
  
  // good - static methods aren't expected to use this
  class Foo {
    static bar() {
      console.log('bar');
    }
  }