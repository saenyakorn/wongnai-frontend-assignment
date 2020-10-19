import { Snackbar, SnackbarProps } from "@material-ui/core"
import React, { useCallback, useState } from "react"
import { Alert, AlertProps } from "@material-ui/lab"

export interface ActiveSnackBarProps {
  type: AlertProps["severity"]
  message: string | undefined
}

export type CustomSnackbarProps = ActiveSnackBarProps &
  SnackbarProps & {
    removeSnackbar: (id: string) => void
  }

const SnackbarComponent: React.FC<CustomSnackbarProps> = ({ id, type, message, removeSnackbar, ...props }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleExited = useCallback(() => {
    removeSnackbar(id ? id : "")
  }, [id, removeSnackbar])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <Snackbar {...props} autoHideDuration={3000} onExited={handleExited} onClose={handleClose} open={isOpen}>
      <Alert severity={type} elevation={6} variant="filled">
        {message ? message : "มีบางอย่างผิดพลาด"}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
