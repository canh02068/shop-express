const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const loaiSPRoute = require('./router/loaiSPRoute');
const SanPhamRoute = require('./router/SanPhamRoute');
const nhaccRoute = require('./router/nhaccRoute');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('tao là hoàn gà gà gà  ');
});

app.use('/admin', loaiSPRoute)
app.use('/admin', SanPhamRoute)
app.use('/admin', nhaccRoute)

// app.use('/api');

app.set('view engine', 'ejs');
app.use(session({
    secret: 'your-secret-key', // Thay 'your-secret-key' bằng một chuỗi bất kỳ
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});