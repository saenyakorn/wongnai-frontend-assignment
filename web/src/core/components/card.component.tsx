import { Grid, makeStyles, Typography, Box } from "@material-ui/core"
import { grey } from "@material-ui/core/colors"
import React, { useCallback } from "react"
import SkeletonImage from "./skeletonImage.component"
import { Link } from "react-router-dom"

export interface CardProps {
  title: string
  description: string
  url: string
  tags: string[]
  mainImage: string
  otherImage: string[]
}

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4, 0)
  },
  mainImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    objectPosition: "50% 50%",
    borderRadius: 20
  },
  mainImageContainer: {
    maxHeight: 400,
    maxWidth: "100%"
  },
  title: {
    textDecoration: "none",
    fontSize: "1.5em",
    color: "initial",
    transition: "color 0.3s ease",
    "&:hover": {
      color: theme.palette.primary.dark
    }
  },
  description: {
    color: grey[600],
    fontSize: "0.85em"
  },
  catogories: {
    display: "flex"
  },
  tagList: {
    "&>.link": {
      cursor: "pointer",
      textDecoration: "underline",
      margin: theme.spacing(0, 0.5),
      color: "initial",
      transition: "color 0.3s ease"
    },
    "&>.link:hover": { color: theme.palette.primary.dark }
  },
  readMore: {
    marginLeft: theme.spacing(1),
    "&>a": {
      color: theme.palette.primary.main,
      transition: "color 0.3s ease"
    },
    "&>a:hover": {
      color: theme.palette.primary.dark
    }
  },
  photosContainer: {
    display: "flex"
  },
  photo: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 10,
    margin: theme.spacing(3, 3, 0, 0),
    objectPosition: "50% 50%"
  }
}))

const CardComponent: React.FC<CardProps> = ({ title, description, url, tags, mainImage, otherImage }) => {
  const classes = useStyles()

  const limitWordLength = useCallback((word: string) => {
    let limitLength = 240
    return word.length > limitLength ? word.slice(0, limitLength - 1) + "..." : word
  }, [])

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4} className={classes.mainImageContainer}>
          {/* Card's left side */}
          <SkeletonImage alt={title} src={mainImage} className={classes.mainImage} />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          {/* Card's right side */}
          <a href={url} target="_blank" rel="noopener noreferrer" className={classes.title}>
            {title}
          </a>
          <Box className={classes.description} my={2}>
            {limitWordLength(description)
              .split("\n\n")
              .map((content, index) => (
                <React.Fragment key={`desc-${index}`}>
                  {index !== 0 && <br />}
                  {index !== 0 && <br />}
                  {content}
                </React.Fragment>
              ))}
            <Typography variant="caption" component="span" className={classes.readMore}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                อ่านต่อ
              </a>
            </Typography>
          </Box>
          <div className={classes.catogories}>
            <div>หมวด: </div>
            <div className={classes.tagList}>
              {tags.map((tag, index) => (
                <React.Fragment key={`tag-${index}`}>
                  {index === tags.length - 1 && <Typography component="span">และ</Typography>}
                  <Link className="link" to={`/keyword/${tag}`} data-testid={tag}>
                    {tag}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={classes.photosContainer}>
            {otherImage.map((photoURL, index) => (
              <SkeletonImage key={`photo-${index}`} alt={title} src={photoURL} className={classes.photo} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default CardComponent
