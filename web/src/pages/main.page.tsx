import { Container, Typography, makeStyles, TextField, Box } from "@material-ui/core"
import React, { useCallback, useEffect, useRef } from "react"
import CardComponent from "../core/components/card.component"
import EmptyTripComponent from "../core/components/emptyTrip.component"
import { useTripContext } from "../core/controllers/trip.controller"
import { useParams } from "react-router-dom"
import LoadingComponent from "../core/components/loading.component"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: theme.spacing(4, "auto")
  },
  form: {
    width: "100%",
    margin: theme.spacing(3, "auto")
  },
  inputCenter: {
    "& $div": {
      "& $input": {
        textAlign: "center"
      }
    }
  }
}))

const MainPage = () => {
  const classes = useStyles()
  const { tag: initTagValue } = useParams<{ tag: string | undefined }>()
  const { trips, setupTrips, searchTrip } = useTripContext()
  const tagInputRef = useRef<HTMLInputElement>()

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault()
      let tag = tagInputRef.current?.value
      searchTrip(tag)
    },
    [searchTrip]
  )

  useEffect(() => {
    // render once when entering this page
    setupTrips(initTagValue)
  }, [setupTrips, initTagValue])

  if (!trips) {
    return <LoadingComponent open={true} />
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h2" color="primary" align="center">
        เที่ยวไหนดี
      </Typography>
      <Box mx={2}>
        <form noValidate onSubmit={handleSubmit} className={classes.form}>
          <TextField
            key={`tagInput${initTagValue}`}
            defaultValue={initTagValue}
            inputRef={tagInputRef}
            placeholder="หาที่เที่ยวแล้วไปกัน..."
            className={classes.inputCenter}
            fullWidth
          />
        </form>
      </Box>
      <div>
        {trips && trips.length > 0 ? (
          trips?.map(({ title, description, url, tags, photos }, index) => (
            <CardComponent
              key={`card-${index}`}
              title={title}
              description={description}
              url={url}
              tags={tags}
              mainImage={photos[0]}
              otherImage={photos.slice(1)}
            />
          ))
        ) : (
          <EmptyTripComponent />
        )}
      </div>
    </Container>
  )
}

export default MainPage
