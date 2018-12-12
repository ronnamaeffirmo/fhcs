import React from 'react'
import { Container, Card, Icon, Grid, Popup, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { toTitleCase } from '../common/helpers'

const UserDataCard = ({ _id: id, firstname, lastname, username, address, email, phone, picture, role: { title }, deleteUser }) => (
	<Card fluid style={styles.userCard} key={id}>
		<Card.Content>
			<Grid columns='equal'>
				<Grid.Column textAlign='center' width={3}>
					<Image size='tiny' rounded src={picture || '/images/user.png'} />
				</Grid.Column>
				<Grid.Column>
					<div style={styles.cardHeader}>
						<div style={styles.cardHeaderTitle}>{toTitleCase(`${firstname} ${lastname}`)}</div>
						<div>
							<Button size='tiny' color='teal' icon='edit' circular as={Link} to={`/users/update/${id}`}/>
							<Popup
								on='click'
								flowing
								position={'bottom right'}
								trigger={<Button size='tiny' color='red' icon='trash' circular/>}
								content={<Button size='tiny' color='green' icon='delete' content='Confirm Delete' onClick={() => {deleteUser(id)}}/>}
							/>
						</div>
					</div>
					<Card.Meta>{`@${username.toLowerCase()} - ${toTitleCase(title)}`}</Card.Meta>
					<Card.Description style={styles.userInformation}>
						<table border={0}>
							<tbody>
							<tr>
								<td><Icon circular inverted color='orange' name='address card outline' size={'small'} /></td>
								<td style={{paddingRight: '2em'}}>Address</td>
								<td>{address ? `${toTitleCase(address)}` : 'N/A'}</td>
							</tr>
							<tr>
								<td><Icon circular inverted color='olive' name='mail' size={'small'} /></td>
								<td style={{paddingRight: '2em'}}>Email</td>
								<td>{email || 'N/A'}</td>
							</tr>
							<tr>
								<td><Icon circular inverted color='blue' name='phone' size={'small'}/></td>
								<td style={{paddingRight: '2em'}}>Phone</td>
								<td>{phone || 'N/A'}</td>
							</tr>
							</tbody>
						</table>
					</Card.Description>
				</Grid.Column>
			</Grid>
		</Card.Content>
	</Card>
)


const styles = {
	userCard: {
		paddingBottom: 5,
	},
	cardHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	cardHeaderTitle: {
		fontWeight: '700',
    fontSize: '18px'
	},
  userInformation: {
    marginTop: '14px'
  }
}

export default UserDataCard
