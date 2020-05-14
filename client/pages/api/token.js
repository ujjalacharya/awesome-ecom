export default (req, res) => {
  if (req.method === "POST") {
    res.status(200).json({
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWJjMTEyZWYzYWVmMTBhMjZmMmEyMTciLCJpYXQiOjE1ODk0NDU5NDkwNDN9.GjnCUrdFag5kblQjGXzAz7r5qfFNQpuzQ-SjJd8pupM",
    });
  }
};
