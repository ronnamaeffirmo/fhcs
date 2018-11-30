import React, { Component, Fragment } from 'react'
import { Table, Label, Button, Popup } from 'semantic-ui-react'
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
							<div style={style.flex}>
								<div style={style.colflex}>
									<div style={style.coltitle}>Workers</div>
									<div>{dummyWorkers.map(worker => <Label key={worker} style={{ marginBottom: '3px' }}>{worker}</Label>)}</div>
								</div>
							</div>
							<div style={style.flex}>
								<div style={style.colflex}>
									<div style={style.coltitle}>Source</div>
									<div>{item.source || 'N/A'}</div>
								</div>
								<div style={style.colflex}>
									<div style={style.coltitle}>Producer</div>
									<div>{item.producer || 'N/A'}</div>
								</div>
								<div style={style.colflex}>
									<div style={style.coltitle}>Company</div>
									<div>{item.company || 'N/A'}</div>
								</div>
							</div>
							<div style={style.flex}>
								<div style={style.colflex}>
									<div style={style.coltitle}>PO</div>
									<div>{item.poNumber || 'N/A'}</div>
								</div>
								<div style={style.colflex}>
									<div style={style.coltitle}>Truck Plate #</div>
									<div>{item.truckPlateNumber || 'N/A'}</div>
								</div>
							</div>
							<div style={style.flex}>
								<div style={style.coltitle}>Notes</div>
								<div>{item.notes || 'N/A'}</div>
							</div>
						</Table.Cell>
					}
				</Table.Row>
			</Fragment>
		)
	}
}

const style = {
	flex: {
		display: 'flex', alignItems: 'center', marginBottom: '1rem'
	},
	colflex: {
		display: 'flex', alignItems: 'center', marginRight: '3rem'
	},
	coltitle: {
		marginRight: '1.5rem', color: 'grey'
	}
}

export default InventoryRow