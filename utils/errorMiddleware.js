export default function (err, res) {
  return res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
}
