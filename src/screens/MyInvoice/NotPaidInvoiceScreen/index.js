import React, {Component} from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import Menu from 'src/components/Menu';
import TabBar from 'src/components/TabBar';
import { navigate } from 'src/utils/navigation';
import { DataTable } from 'react-native-paper';
import {connect} from 'react-redux';
import {GetInvoiceAction} from 'src/store/MyInvoice/action'
import Spinner from 'react-native-loading-spinner-overlay';
class NotPaidInvoiceScreen extends Component {

  componentDidMount () {
    if (!this.props.token) {
      navigate('LoginScreen')
      return
    }
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.getInvoice (0, this.props.token)
    });
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
          <Menu title="Paid" />
          <TabBar 
              tap1="Not Paid"
              route1="NotPaidInvoiceScreen"
              tap2="Paid"
              route2="PaidInvoiceScreen"
          />
            <MyTable>
              <DataTable.Row>
                <HeaderLeft>ID</HeaderLeft>
                <HeaderRight>Job Number</HeaderRight>
              </DataTable.Row>
              {
                this.props.data && this.props.data.invoices && this.props.data.invoices.map ((item, index) => {
                  return (
                    <TableRow key={index}>
                      <LeftCell onPress={()=>navigate('Invoice', {paid: item.is_paid, hashedId: item.hashed_id})}>
                        <Text>View More({item.id})</Text>
                      </LeftCell>
                      <RightCell>
                      <Text>#{item.invoice_jobs? item.invoice_jobs[0].job_id: '' }</Text>
                      </RightCell>
                    </TableRow>
                  )
                })
              }
              <TableRow>
                <LeftCell>
                  <Text></Text>
                </LeftCell>
                <RightCell>
                  <Text></Text>
                </RightCell>
              </TableRow>
              <TableRow>
                <LeftCell>
                  <Text></Text>
                </LeftCell>
                <RightCell>
                  <Text></Text>
                </RightCell>
              </TableRow>
              <TableRow>
                <LeftCell>
                  <Text></Text>
                </LeftCell>
                <RightCell>
                  <Text></Text>
                </RightCell>
              </TableRow>
              <TableRow>
                <LeftCell>
                  <Text></Text>
                </LeftCell>
                <RightCell>
                  <Text></Text>
                </RightCell>
              </TableRow>
              <TableRow>
                <LeftCell>
                  <Text></Text>
                </LeftCell>
                <RightCell>
                  <Text></Text>
                </RightCell>
              </TableRow>
            </MyTable>
        </Container>
      </ScrollView> 
    )
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.myInvoice.isLoading,
    data: state.myInvoice.data
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getInvoice: (status,token) => dispatch(GetInvoiceAction(status,token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotPaidInvoiceScreen);

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



