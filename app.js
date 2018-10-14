class App {
  constructor() {
    this.container = new Map();
  }

  create(classObject, dependencies) {
    const objects = dependencies.map((type) => this.resolve(type));
    return new classObject(...objects);
  }

  register(type, object) {
    this.container.set(type, object);
  }

  resolve(type) {
    return this.container.has(type) ? this.container.get(type) : null;
  }

  inject(dependencies, callback) {
    const objects = dependencies.map((type) => this.resolve(type));
    return callback.call(null,...objects);
  }
}

class Engine {

}

class DieselEngine {
  start() {
    console.log('DieselEngine.start()');
  }
}

class Transmission {
}

class FullTransmission {
  start() {
    console.log('FullTransmission.start()');
  }
}

class Car {
  // constructor(app) {
  //   app.inject(['Engine', 'Transmission'], (engine, transmission) => {
  //     this.engine = engine;
  //     this.transmission = transmission;
  //   });
  // }

  constructor(engine, transmission) {
    this.engine = engine;
    this.transmission = transmission;
  }

  start() {
    this.engine.start();
    this.transmission.start();
  }
}

const app = new App();
app.register('Engine', new DieselEngine());
app.register('Transmission', new FullTransmission());

// const car = new Car(app);
const car = app.create(Car, ['Engine', 'Transmission']);
car.start();

// See AngularJS https://docs.angularjs.org/guide/di
