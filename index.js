const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const rules = auth.rewriter({
  users: 600,
  messages: 660,
  tikets: 660,
})

const db = {
  users: [],
  messages: ['success'],
  tikets: [
    {
      from: 'Dublin',
      to: 'Warsaw Modlin',
      date: '2023-05-07T21:00:00.000Z',
      flightTime: '2h 50m',
      price: {
        EUR: 524.70,
        USA: 578.9,
        RUB: 47200.89,
        PLN: 2408.35
      },
      FlightNum: 1925
    },
    {
      from: 'Dublin',
      to: 'Warsaw Modlin',
      date: '2023-05-07T21:00:00.000Z',
      flightTime: '2h 50m',
      price: {
        EUR: 524.70,
        USA: 578.9,
        RUB: 47200.89,
        PLN: 2408.35
      },
      FlightNum: 1925
    }
  ],
};

const PORT = '3000'

const app = jsonServer.create();
const router = jsonServer.router(db);

app.db = router.db
app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(auth)
app.use(rules)
app.use(auth)
app.use(router)


app.patch('/tikets', (req, res) => {
  const { startDate, endDate } = req.query;

  if (!endDate) {
    return //
  }

  if (!db.garage.find(car => car.id === +id)) {
    return res.status(404).send('Car with such id was not found in the garage.')
  }


});
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});