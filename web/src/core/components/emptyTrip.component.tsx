import React from "react"
import { Box, Typography } from "@material-ui/core"

const EmptyTripComponent = () => {
  return (
    <Box width="100%" display="flex" justifyContent="center" mt={8}>
      <Typography variant="h6">- หารายการไม่พบ -</Typography>
    </Box>
  )
}

export default EmptyTripComponent
