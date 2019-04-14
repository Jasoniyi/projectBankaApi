import app from './app'

const PORT = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on ${PORT}`));
