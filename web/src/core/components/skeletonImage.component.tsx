import { Skeleton } from "@material-ui/lab"
import React, { useCallback, useState } from "react"
import { makeStyles } from "@material-ui/core"

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const useStyles = makeStyles(theme => ({
  skeleton: {
    height: "100%",
    width: "100%"
  }
}))

const SkeletonImage: React.FC<SkeletonImageProps> = ({ alt, src, className, ...props }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<Boolean>(true)

  const handleLoaded = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <Skeleton variant="rect" className={`${classes.skeleton} ${className}`} />}
      <img alt={alt} src={src} className={className} {...props} onLoad={handleLoaded} style={{ display: loading ? "none" : "block" }} />
    </>
  )
}

export default SkeletonImage
