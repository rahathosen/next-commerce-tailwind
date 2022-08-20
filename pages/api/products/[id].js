import db from "../../../utils/db";
import Product from "../../../models/Product";
const handler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  db.disconnect();
  res.send(product);
};

export default handler;
