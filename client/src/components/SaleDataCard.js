import React from 'react'
import { Card } from 'semantic-ui-react'

import DeleteConfirmationModal from './DeleteConfirmationModal'
import SalesItemTable from './SalesItemTable'

const saleDataCard = ({sale, actions}) => {
  const { removeSale } = actions
  return (
    <Card centered fluid>
      <Card.Content>
        <div style={{float: 'right'}}>
          <span style={{fontWeight: 'bold', fontSize: '13px'}}>
            {sale.officialReceipt}
          </span>
        </div>
        <Card.Header>{sale.customer.firstname + ' ' + sale.customer.lastname}</Card.Header>
        <div style={{float: 'right'}}>
          <span style={{fontWeight: 'bold', padding: '5px', fontSize: '15px'}}>
            Net Term: {sale.terms}
          </span>
        </div>
        <Card.Meta><b style={{fontSize: '12px'}}>From: {sale.dateFrom}</b></Card.Meta>
        <Card.Meta><b style={{fontSize: '12px'}}>To: {sale.dateTo}</b></Card.Meta>
        <Card.Meta>Discount: ₱ {sale.discount}</Card.Meta>
        <Card.Meta>Total Amount: ₱ {sale.grandTotal}</Card.Meta>
        <Card.Description>Remarks: {sale.remarks}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <SalesItemTable items={sale.itemLists || []}/>
        <DeleteConfirmationModal removeItem={removeSale} item={sale}/>
      </Card.Content>
    </Card>
  )
}

export default saleDataCard
