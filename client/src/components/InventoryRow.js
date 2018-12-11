import React, { Component, Fragment } from 'react'
import { Table, Label, Button, Popup, Grid, Icon } from 'semantic-ui-react'
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
		const { item, removeInventory } = this.props
		return (
			<Fragment>
				<Table.Row>
					<Table.Cell>{item.itemName || 'N/A'}</Table.Cell>
					<Table.Cell>{item.quantity || 'N/A'}</Table.Cell>
					<Table.Cell>{_.startCase(item.status) || 'N/A'}</Table.Cell>
					<Table.Cell>
						{item.receivedBy.length
							? item.receivedBy.map(receiver => <Label key={receiver} style={{ marginBottom: '3px' }}>{receiver}</Label>)
							: 'N/A'
						}
					</Table.Cell>
					<Table.Cell singleLine textAlign='center'>
						<Popup 
							inverted
							size='tiny'
							content='View more details'
							position='left center'
							trigger={
								<Button onClick={this.toggleMore} size='mini' circular icon={expanded ? 'chevron up' : 'chevron down'} />
							}
						/>
						<Button icon='edit' circular size='mini' color='teal' />
						<Popup
							size='tiny'
							on='click'
							flowing
							position={'bottom right'}
							trigger={<Button icon='trash' circular size='mini' color='red' />}
							content={
								<Button size='tiny' color='red' icon='delete' content='Confirm Delete' onClick={(e) => {
									e.preventDefault()
									removeInventory(item._id)
								}} />
							}
						/>
						
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					{ expanded &&
						<Table.Cell colSpan={5}>
							<Grid style={{ padding: '1.5rem 0.75rem' }}>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel}>
										<Icon name='dolly' /> Workers
									</Grid.Column>
									<Grid.Column width={13}>
										{item.workers.length
											? item.workers.map(worker => <Label key={worker} style={{ marginBottom: '3px' }}>{worker}</Label>)
											: 'N/A'
										}
									</Grid.Column>
								</Grid.Row>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel}>
										<Icon name='map marker alternate' /> Source
									</Grid.Column>
									<Grid.Column width={4}>{item.source || 'N/A'}</Grid.Column>
									<Grid.Column style={style.rowlabel}>
										<Icon name='pallet' /> Producer
									</Grid.Column>
									<Grid.Column width={4}>{item.producer || 'N/A'}</Grid.Column>
								</Grid.Row>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel}>
										<Icon name='truck' /> Truck #
									</Grid.Column>
									<Grid.Column width={4}>{item.truckPlateNumber || 'N/A'}</Grid.Column>
									<Grid.Column style={style.rowlabel}>
										<Icon name='building outline' /> Company
									</Grid.Column>
									<Grid.Column width={4}>{item.company || 'N/A'}</Grid.Column>
								</Grid.Row>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel}>
										<Icon name='barcode' /> PO
									</Grid.Column>
									<Grid.Column width={4}>{item.poNumber || 'N/A'}</Grid.Column>
								</Grid.Row>
								<Grid.Row style={style.row} verticalAlign='middle'>
									<Grid.Column style={style.rowlabel}>
										<Icon name='sticky note outline' /> Notes
									</Grid.Column>
									<Grid.Column width={13}>{item.notes || 'N/A'}</Grid.Column>
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
		color: 'grey',
		width: '100px',
		paddingRight: 0
	},
}

export default InventoryRow