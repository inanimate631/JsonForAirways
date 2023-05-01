const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const rules = auth.rewriter({
  users: 600,
  messages: 660,
  cities: 640,
});

const db = {
  users: [],
  messages: ['success'],
  cities: ['Dublin', 'Warsaw Modlin', 'Paris', 'Luxemburg', 'Berlin'],
  tikets: [],
};

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const date = new Date();
date.setHours(0, 0, 0, 0);
const milSecond = date.getTime();

db.cities.forEach((value) => {
  for (let i = 0; i < db.cities.length; i++) {
    if (db.cities[i] === value) {
      continue;
    }
    for (let day = 0; day < 10; day++) {
      if (getRandomInt(4) === 0) {
        continue;
      }
      const departure = milSecond + getRandomInt(24) * 3600000 + day * 86400000;
      const cost = getRandomArbitrary(60, 600);
      const total = Math.round(getRandomArbitrary(50, 188))

      const tiket = {
        from: value,
        to: db.cities[i],
        departure: new Date(departure).toISOString(),
        arrival: new Date(
          departure + getRandomInt(7) * 3600000 + (getRandomInt(5) + 1) * 600000
        ),
        price: {
          EUR: Number(cost),
          USA: Number((cost * 1.083).toFixed(2)),
          RUB: Number((cost * 91.33).toFixed(2)),
          PLN: Number((cost * 4.56).toFixed(2)),
        },
        flightNum: Math.round(getRandomArbitrary(1000, 2000)),
        seats: {
          total: total,
          available: Math.round(getRandomArbitrary(5, total)),
        },
      };
      db.tikets.push(tiket);
    }
  }
});

const PORT = '3000';

const app = jsonServer.create();
const router = jsonServer.router(db);

app.db = router.db;
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);
app.use(auth);
app.use(rules);
app.use(auth);
app.use(router);
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
