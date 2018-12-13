import React from 'react'
import { Grid } from 'semantic-ui-react'
import { PropagateLoader } from 'react-spinners'

const Loader = () => {
  return (
    <Grid stretched style={{height: '100%', marginTop: '50%'}} verticalAlign={'middle'} textAlign={'center'}>
      <PropagateLoader size={15}/>
    </Grid>
  )
}

export default Loader
