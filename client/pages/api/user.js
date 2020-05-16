export default (req, res) => {
  if (req.headers.authorization != "null") {
    res.json({
      user: "Lustrous",
    });
  } else {
    res.json({ user: "Unauthenticated user" });
  }
};
