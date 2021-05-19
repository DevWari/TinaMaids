import React, {Component} from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet,} from 'react-native';
import styled from 'styled-components/native';
import Menu from 'src/components/Menu';
import TabBar from 'src/components/TabBar';
import { navigate } from 'src/utils/navigation';
import { DataTable } from 'react-native-paper';
import { Colors } from 'src/theme'
import {connect} from 'react-redux'
import {GetInvoiceDetailAction} from 'src/store/InvoiceDetail/action'
import {GetInoviceInfoAction} from 'src/store/Payment/action'
import Spinner from 'react-native-loading-spinner-overlay';
class Invoice extends Component {

  componentDidMount () {
    if (!this.props.token) {
      navigate ('LoginScreen')
      return
    }
    else {
      this.props.getInvoiceDetail (this.props.navigation.state.params.hashedId, this.props.token)
      this.props.getInvoiceInfo (this.props.navigation.state.params.hashedId, this.props.token)
    }
  }
  render () {    
    return (
      <ScrollView>
        <Spinner 
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />   
        <Container>      
          <Menu title="Invoice" />
            <TabBar 
              tap1="Not Paid"
              route1="NotPaidInvoiceScreen"
              tap2="Paid"
              route2="PaidInvoiceScreen"
            />
            <InvoiceContainer>
              <InvoiceTitle>Invoice # {this.props.data? this.props.data.id: ''} </InvoiceTitle>
              <PersonalInfoTitle>Affilaite{this.props.data? this.props.data.affiliate.id: ''}</PersonalInfoTitle>
              <PersonalInfoContent>{this.props.data? this.props.data.aff.contact_person_phone: ''}</PersonalInfoContent>
              <PersonalInfoContent>{this.props.data? this.props.data.affiliate.email: ''}</PersonalInfoContent>
              <PersonalInfoTitle>To</PersonalInfoTitle>
              <PersonalInfoContent>{this.props.data? this.props.data.customer.name: ''}</PersonalInfoContent>
              <PersonalInfoContent>{this.props.data? this.props.data.cust.address: ''}</PersonalInfoContent>
            </InvoiceContainer>
            <StatusBar>
              {
                this.props.navigation.state.params.paid == 1? <StatusTitle>PAID</StatusTitle>: <StatusTitle>NOT PAID</StatusTitle>
              }
            </StatusBar>
            <EstimateContainer>
              <PersonalInfoTitle>ESTIMATE</PersonalInfoTitle>
              <Text>#{this.props.data? this.props.data.job.estimate_id: ''}</Text>
              <EstimatePriceTitle>Estimate Price</EstimatePriceTitle>
              <Text>${this.props.data? this.props.data.job.estimate.sub_tasks[0].affiliate_price: ''}</Text>
            </EstimateContainer>
            
            <DataTable>
                <DataTable.Header>
                <DataTable.Title>Service type</DataTable.Title>
                <DataTable.Title >Qty</DataTable.Title>
                <DataTable.Title >Price</DataTable.Title>
                <DataTable.Title >Total</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                <DataTable.Cell numberOfLines={2} >{this.props.data? this.props.data.st.name: ''}</DataTable.Cell>
                <DataTable.Cell>1</DataTable.Cell>
                <DataTable.Cell>${this.props.data? this.props.data.total: ''}</DataTable.Cell>
                <DataTable.Cell>${this.props.data? this.props.data.total: ''}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                <DataTable.Cell></DataTable.Cell>
                <DataTable.Cell></DataTable.Cell>
                <DataTable.Cell>SUBTOTAL:</DataTable.Cell>
                <DataTable.Cell>${this.props.data? this.props.data.job.estimate.sub_tasks[0].affiliate_price: ''}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                <DataTable.Cell></DataTable.Cell>
                <DataTable.Cell></DataTable.Cell>
                <DataTable.Cell numberOfLines={2}>GRAND TOTAL:</DataTable.Cell>
                <DataTable.Cell>${this.props.data? this.props.data.job.estimate.sub_tasks[0].affiliate_price: ''}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            {
              this.props.navigation.state.params.paid == 0 && 
              <SaveButton 
                bgColor = {Colors.textColor}
                onPress={()=>navigate('InvoicePaymentScreen', {hashedId: this.props.navigation.state?.params.hashedId})}
              >
              <ButtonTitle>Pay Now</ButtonTitle>
              </SaveButton>
            }
            <Footer />
        </Container>
      </ScrollView> 
    )
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.invoiceDetail.isLoading,
    data: state.invoiceDetail.data
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getInvoiceDetail: (hashedId,token) => dispatch(GetInvoiceDetailAction(hashedId,token)),
    getInvoiceInfo: (hashedId,token) => dispatch(GetInoviceInfoAction(hashedId,token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);

const Container = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
`;
const MyTable = styled(DataTable)`
  width: 90%;
  border-width: 0.5px;
  margin-top: 30px;
  border-color: gray;
`;
const HeaderLeft = styled(DataTable.Cell)`
  justify-content: center;
`;
const HeaderRight = styled(DataTable.Cell)`
  border-left-width: 0.5px;
  border-color: gray;
  align-items: center;
  justifyContent: center;
`;
const TableRow = styled(DataTable.Row)`
  border-top-width: 0.5px;
  border-color: gray;
`;
const LeftCell = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const RightCell = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-left-width: 0.5px;
  border-color: gray; 
`;
const SaveButton = styled (TouchableOpacity)`
  width: 80%;
  height: 60px;
  border-radius: 6px;
  border-width: 3px;
  background-color: ${props=>props.bgColor};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
const ButtonTitle = styled (Text)`
  font-size: 25px;
  color: white;
  height: 30px;
  text-align: center;
`
const InvoiceTitle = styled (Text)`
  font-size: 25px;
  font-weight: bold;
  
`
const InvoiceContainer = styled (View)`
  width: 100%;
  flex: 1;
  padding-horizontal: 10px;
  justify-content: center;
  margin-top: 20px;
`
const PersonalInfoTitle = styled (Text)`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  padding-left: 10px;
`
const EstimatePriceTitle = styled (Text)`
  font-size: 20px;
  margin-top: 20px;
  margin-top: 30px;
`
const PersonalInfoContent = styled (Text)`
  padding-left: 20px;  
  margin-top: 5px;
  font-size: 15px;
`
const StatusBar = styled (View)`
  height: 40px;
  background-color: #F9CC34;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`
const StatusTitle = styled(Text)`
  font-size: 20px;
  height: 25px;
`
const EstimateContainer = styled(View)`
  align-items: flex-end;
  width: 100%;  
  padding-right: 20px;
`
const Footer = styled(View)`
  height: 30px;
`

