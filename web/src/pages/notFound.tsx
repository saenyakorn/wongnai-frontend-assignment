import { Box, Typography } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <Box display="flex" width="100%" height="100vh" alignItems="center" justifyContent="center" flexDirection="column">
      <Typography variant="h1" color="primary">
        404 Not Found
      </Typography>
      <Link to="/" style={{ color: "black", marginTop: "2em" }}>
        Back to main page
      </Link>
    </Box>
  )
}

export default NotFoundPage
