import User from "../../../../models/User";
import db from "../../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("admin signin required");
  }
  const { user } = session;
  if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else if (req.method === "PUT") {
    return putHandler(req, res, user);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const putHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.isAdmin = Boolean(req.body.isAdmin);
    await user.save();
    await db.disconnect();
    res.send({ message: "User Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.email === "admin@example.com") {
      return res.status(400).send({ message: "Can not delete admin" });
    }
    await user.remove();
    await db.disconnect();
    res.send({ message: "User Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }
};

export default handler;
