import React from 'react'
import { Grid, Loader as SemanticLoader } from 'semantic-ui-react'

const Loader = () => (
  <Grid stretched style={{ height: '100%', marginTop: '50%' }} verticalAlign={'middle'} textAlign={'center'}>
    <SemanticLoader active />
  </Grid>
)

export default Loader
