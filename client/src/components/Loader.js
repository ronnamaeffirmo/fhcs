import React from 'react'
import { Grid } from 'semantic-ui-react'
import { MoonLoader } from 'react-spinners'

const Loader = () => {
  return (
    <Grid stretched style={{height: '100%', marginTop: '50%'}} verticalAlign={'middle'} textAlign={'center'}>
      <MoonLoader size={70}/>
    </Grid>
  )
}

export default Loader
