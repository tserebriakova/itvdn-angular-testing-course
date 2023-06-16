import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";
import {delay, of} from "rxjs";

describe('Asynchronous tests with setTimeouts', () => {
  it('asynchronous test :: setTimeout and jasmine.done() function', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it('asynchronous test :: setTimeout and fakeAsync test utility - flush()', fakeAsync(() => {
    let test = false;

    setTimeout(() => null, 1500);
    setTimeout(() => test = true, 1000);

    // tick(1000);
    // tick(499);
    // tick(1);

    flush();
    expect(test).toBeTruthy();
  }));

  it('asynchronous test :: setTimeout and fakeAsync test utility - tick()', fakeAsync(() => {
    let test = false;

    setTimeout(() => null, 1500);
    setTimeout(() => test = true, 1000);

    tick(1000);
    tick(499);
    tick(1);

    // flush();
    expect(test).toBeTruthy();
  }));
});

describe('Asynchronous tests with Promises', () => {
  it('asynchronous test :: Promises and setTimeouts diff', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log('first setTimeout callback triggered');
    });

    setTimeout(() => {
      console.log('second setTimeout callback triggered');
    });

    console.log('Creating Promise');
    Promise.resolve().then(() => {
      console.log('first Promise evaluated successfully');
      return Promise.resolve();
    }).then(() => {
      console.log('second Promise evaluated successfully');
      test = true;
    });

    console.log('Running test assertions');
    flushMicrotasks();
    flush();
    expect(test).toBeTruthy();
  }));

  it('asynchronous test :: Promises in fakeAsync zone', fakeAsync(() => {
    let test = false;

    console.log('Creating Promise');
    Promise.resolve().then(() => {
      console.log('first Promise evaluated successfully');
      return Promise.resolve();
    }).then(() => {
      console.log('second Promise evaluated successfully');
      test = true;
    });

    flushMicrotasks();

    console.log('Running test assertions');
    expect(test).toBeTruthy();
  }));

  it('asynchronous test :: Promises + setTimeouts', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter++;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(11);
  }));
});

describe('Asynchronous tests with Observables', () => {
  it('asynchronous test :: Synchronous Observables', function () {
    let test = false;

    console.log('Creating Observable');
    const test$ = of(test);

    test$.subscribe(() => {
      console.log('Subscription working');
      test = true;
    });

    console.log('Running test assertions');
    expect(test).toBe(true);
  });

  it('asynchronous test :: Asynchronous Observables', fakeAsync(() => {
    let test = false;

    console.log('Creating Observable');
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      console.log('Subscription working');
      test = true;
    });

    tick(1000);

    console.log('Running test assertions');
    expect(test).toBe(true);
  }));
});
