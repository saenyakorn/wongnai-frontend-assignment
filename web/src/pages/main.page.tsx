import { Container, Typography, makeStyles, TextField, Box, CircularProgress } from "@material-ui/core"
import React, { useCallback, useEffect, useRef } from "react"
import CardComponent from "../core/components/card.component"
import EmptyTripComponent from "../core/components/emptyTrip.component"
import { useTripContext } from "../core/controllers/trip.controller"
import { useParams } from "react-router-dom"

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
    "& div": {
      "& input": {
        textAlign: "center"
      }
    }
  }
}))

const MainPage = () => {
  const classes = useStyles()
  const { keyword: initKeywordValue } = useParams<{ keyword: string | undefined }>()
  const { trips, setupTrips, searchTrip } = useTripContext()
  const keywordInputRef = useRef<HTMLInputElement>()

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault()
      let keyword = keywordInputRef.current?.value
      searchTrip(keyword)
    },
    [searchTrip]
  )

  useEffect(() => {
    // render once when entering this page
    setupTrips(initKeywordValue)
  }, [setupTrips, initKeywordValue])

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h2" color="primary" align="center">
        เที่ยวไหนดี
      </Typography>
      <Box mx={2}>
        <form noValidate onSubmit={handleSubmit} className={classes.form}>
          <TextField
            inputProps={{ "data-testid": "search" }}
            key={`keywordInput${initKeywordValue}`}
            defaultValue={initKeywordValue}
            inputRef={keywordInputRef}
            placeholder="หาที่เที่ยวแล้วไปกัน..."
            className={classes.inputCenter}
            fullWidth
          />
        </form>
      </Box>
      <div>
        {!trips ? (
          <Box display="flex" justifyContent="center" mt={7}>
            <CircularProgress />
          </Box>
        ) : trips.length > 0 ? (
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
