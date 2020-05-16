export default (req, res) => {
  console.log("req.headers.authorization", req.headers.authorization);
  if (req.headers.authorization != "null") {
    res.json({
      user: "Lustrous",
    });
  } else {
    res.json({ user: "Unauthenticated user" });
  }
};
