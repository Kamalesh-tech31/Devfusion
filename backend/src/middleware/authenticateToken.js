const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Access token required" })
    }

    next()
  } catch (error) {
    res.status(403).json({ message: "Invalid token", error: error.message })
  }
}

module.exports = authenticateToken
