const app = require("./app");
const mongoose = require("mongoose");
// const { sendEmail } = require("./helpers");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
  })
  .then(async () => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    // const t = await sendEmail({
    //   to: "artipavl1234567@gmail.com",
    //   text: "ntcn",
    //   subject: "Sending with SendGrid is Fun",
    // });
    // console.log(t);
  })
  .catch((e) => {
    console.log(`Server not running. Error message: ${e.message}`);
    process.exit(1);
  });
