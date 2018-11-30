import React, { Component, Fragment } from 'react'
import { Table, Label, Button, Popup, Grid } from 'semantic-ui-react'
import _ from 'lodash'

class InventoryRow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			expanded: false
		}
	}

	toggleMore = () => this.setState({ expanded: !this.state.expanded })

	render () {
		const { expanded } = this.state
		const { item } = this.props
    const dummyWorkers = ['Ruel', 'Raul', 'Reynaldo', 'Danny']
		return (
			<Fragment>
				<Table.Row>
					<Table.Cell>Hollow block</Table.Cell>
					<Table.Cell>{item.quantity}</Table.Cell>
					<Table.Cell>{_.startCase(item.status)}</Table.Cell>
					<Table.Cell>{item.receivedBy}</Table.Cell>
					<Table.Cell textAlign='center'>
						<Popup 
							inverted
							content='View more details'
							position='right center'
							trigger={
								<Button onClick={this.toggleMore} size='mini' circular icon={expanded ? 'chevron up' : 'chevron down'} />
							}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					{ expanded &&
						<Table.Cell colSpan={5}>
							<Grid style={{ padding: '1.5rem 0.75rem' }}>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel} width={2}>Workers</Grid.Column>
									<Grid.Column width={8}>{dummyWorkers.map(worker => <Label key={worker} style={{ marginBottom: '3px' }}>{worker}</Label>)}</Grid.Column>
								</Grid.Row>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel} width={2}>Source</Grid.Column>
									<Grid.Column width={3}>{item.source || 'N/A'}</Grid.Column>
									<Grid.Column style={style.rowlabel} width={2}>Producer</Grid.Column>
									<Grid.Column width={3}>{item.producer || 'N/A'}</Grid.Column>
									<Grid.Column style={style.rowlabel} width={2}>Truck #</Grid.Column>
									<Grid.Column width={3}>{item.truckPlateNumber || 'N/A'}</Grid.Column>
								</Grid.Row>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel} width={2}>Company</Grid.Column>
									<Grid.Column width={3}>{item.company || 'N/A'}</Grid.Column>
									<Grid.Column style={style.rowlabel} width={2}>PO</Grid.Column>
									<Grid.Column width={3}>{item.poNumber || 'N/A'}</Grid.Column>
								</Grid.Row>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel} width={2}>Notes</Grid.Column>
									<Grid.Column width={14}>{item.notes || 'N/A'}</Grid.Column>
								</Grid.Row>
							</Grid>
						</Table.Cell>
					}
				</Table.Row>
			</Fragment>
		)
	}
}

const style = {
	row: {
		paddingBottom: '0.75rem',
		paddingTop: 0
	},
	rowlabel: {
		color: 'grey'
	},
}

export default InventoryRow