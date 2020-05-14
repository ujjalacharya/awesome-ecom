export default (req, res) => {
    console.log(req.headers.authorization);
    res.json({
        user: "Lustrous"
    })
  };
  