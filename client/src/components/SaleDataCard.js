import React from 'react'
import {
  Button,
  Card,
  Container,
  Header,
  Grid,
  Icon,
  Popup,
  Label,
  TextArea,
  Form,
  Image,
  Segment, Dropdown
} from 'semantic-ui-react'
import moment from 'moment'
import SalesItemTable from './SalesItemTable'
import { toTitleCase } from '../common/helpers'
import { Link } from 'react-router-dom'

const styles = {
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15
  },
}

const saleDataCard = ({sale, actions: {removeSale, applySalePayment}}) => {
  const {date, remarks, term, payment, paymentDate, items, _id: id, officialReceipt} = sale
  const dueDate = moment(date).add(parseInt(term), 'days')
  let subtotalAmount = 0.0
  let discount = 0.0
  items.forEach(({price, discount: itemDiscount, quantity}) => {
    discount += itemDiscount
    subtotalAmount += price * quantity
  })
  discount += sale.discount
  const grandTotal = (subtotalAmount - discount)
  return (
    <Card fluid style={styles.userCard} key={id}>
      <Card.Content>
        {payment === 'paid' &&
        <Label as='a' color='green' ribbon>
          Paid on {moment(paymentDate).format('MMMM D, YYYY')}
        </Label>}
        {payment === 'promised' &&
        <Label as='a' color='blue' ribbon>
          Promised - due {moment(date).add(term, 'days').fromNow()}
        </Label>}
        {payment === 'unpaid' &&
        <Label as='a' color='red' ribbon>
          Unpaid - due {moment(date).add(term, 'days').fromNow()}
        </Label>}
        <Card.Header style={styles.cardHeader}>
          <Container>
            {toTitleCase(sale.customer.firstname + ' ' + sale.customer.lastname)}
          </Container>
          <Button color='teal' icon='edit' circular as={Link} to={`/sales/update/${id}`}/>
          <Popup
            size={'large'}
            trigger={<Button color='red' icon='delete' circular/>}
            content={
              <div>
                <Button color='green' icon='delete' content='Confirm Delete' onClick={(e) => {
                  e.preventDefault()
                  removeSale(id)
                }
                }/>
              </div>
            }
            on='click'
            flowing
            position={'bottom right'}
          />
        </Card.Header>

        <Card.Meta>
          OR Number: {officialReceipt}
        </Card.Meta>
        <Card.Description>
          <Grid style={{marginTop: 10}}>
            <Grid.Row columns={2}>
              <Grid.Column width={5}>
                <Container>
                  <Label style={{fontSize: 13, width: 78}}>
                    <Icon name='calendar outline'/> Date:
                  </Label>
                  <span style={{marginLeft: 6}}>{moment(date).format('MMM DD, YYYY')}</span>
                </Container>
                <Container style={{marginTop: 5, marginBottom: 5}}/>
                <Container>
                  <Label style={{fontSize: 13, width: 78}}>
                    <Icon name='hourglass outline'/>
                    <span style={{textAlign: 'right'}}>Term:</span>
                  </Label>
                  <span style={{marginLeft: 6}}>{`${term} ${term > 1 ? 'days' : 'day'}`}</span>
                </Container>
                <Container style={{marginTop: 5, marginBottom: 5}}/>
                <Container>
                  <Label style={{fontSize: 13, width: 78}}>
                    <Icon name='calendar times outline'/> &nbsp;Due:
                  </Label>
                  <span style={{marginLeft: 6}}>{moment(dueDate).format('MMM DD, YYYY')}</span>
                </Container>
              </Grid.Column>
              <Grid.Column width={6}>
                <Container>
                  <Label style={{fontSize: 13, width: 105}}>
                    <Icon name='credit card outline'/> Subtotal:
                  </Label>
                  <span style={{marginLeft: 6}}> ₱ {parseFloat(subtotalAmount).toFixed(2)}</span>
                </Container>
                <Container style={{marginTop: 5, marginBottom: 5}}/>
                <Container>
                  <Label style={{fontSize: 13, width: 105}}>
                    <Icon name='minus circle'/>
                    <span style={{textAlign: 'right'}}>Discount:</span>
                  </Label>
                  <span style={{marginLeft: 6}}> ₱ {parseFloat(discount).toFixed(2)}</span>
                </Container>
                <Container style={{marginTop: 5, marginBottom: 5}}/>
                <Container>
                  <Label style={{fontSize: 13, width: 105}}>
                    <Icon name='money'/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:
                  </Label>
                  <span style={{marginLeft: 6}}> ₱ {parseFloat(grandTotal).toFixed(2)}</span>
                </Container>
              </Grid.Column>
              <Grid.Column width={5}>
                <Dropdown text='Payment' icon='payment'
                          style={{width: 150, float: 'right', textAlign: 'center', marginBottom: 5}} floating labeled
                          button

                          className='icon'>
                  <Dropdown.Menu>
                    <Dropdown.Header icon='tags' content='Apply Payment Options'/>
                    <Dropdown.Divider/>
                    <Dropdown.Item label={{color: 'green', empty: true, circular: true}} text='Paid' value='paid' onClick={(e, data) => {
                      applySalePayment({_id: id, payment: data.value, officialReceipt})
                    }}/>
                    <Dropdown.Item label={{color: 'red', empty: true, circular: true}} text='Unpaid' value='unpaid' onClick={(e, data) => {
                      applySalePayment({_id: id, payment: data.value, officialReceipt})
                    }}/>
                    <Dropdown.Item label={{color: 'blue', empty: true, circular: true}} text='Promised' value='promised' onClick={(e, data) => {
                      applySalePayment({_id: id, payment: data.value, officialReceipt})
                    }}/>
                  </Dropdown.Menu>
                </Dropdown>
                <SalesItemTable items={items || []}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Form>
                  <Header size={'small'}>Remarks</Header>
                  <TextArea disabled={true} style={{
                    minHeight: 70,
                    maxHeight: 120,
                    width: '100%',
                    borderRadius: 3,
                    backgroundColor: 'white'
                  }}/>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default saleDataCard
