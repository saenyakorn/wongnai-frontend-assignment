import { Backdrop, BackdropProps, CircularProgress, makeStyles } from "@material-ui/core"
import React from "react"

export interface LoadingProps extends BackdropProps {}

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.tooltip + 1,
    background: "rgba(0,0,0,0.35)"
  }
}))

const LoadingComponent: React.FC<LoadingProps> = ({ open, ...other }) => {
  const classes = useStyles()

  return (
    <Backdrop open={open} className={classes.backdrop} {...other}>
      <CircularProgress />
    </Backdrop>
  )
}

export default LoadingComponent
