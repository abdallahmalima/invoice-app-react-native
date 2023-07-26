import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SectionList } from 'react-native';
;
import { useState, useEffect } from 'react';
import useSQLiteDB from '../composables/useSQLiteDB';
import { SQLTransaction } from 'expo-sqlite';
import Invoice from '../components/Invoice';
import MButton from '../components/MButton';
import MModal from '../components/MModal';
import convertToSectionListData from '../composables/convertToSectionListData';
import loadData from '../composables/loadData';
import NoDataFound from '../components/NoDataFound';

export interface InvoiceType {
  id:number;
  mainContact: string;
  aName: string;
  eName: string;
  unit: string;
  quantity: number;
  price: number;
  discount: number;
  taxPercentage: number;
}

const Home=()=> {

  const [isLoading,db]=useSQLiteDB();
  const [invoices, setInvoices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [invoiceItem,setInvoiceItem]=useState(null)
  useEffect(()=>{
    if(!isLoading){
      loadData(db,setInvoices,convertToSectionListData)
    }
  },[isLoading])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading Invoices...</Text>
      </View>
    );
  }



  const showModel=()=>{
    setInvoiceItem(null)
    setModalVisible(true)
  }

  const showModalUpdate=(item:InvoiceType)=>{
    setInvoiceItem(item)
    setModalVisible(true)
  }

 
  const showAlert = (id:number) =>
  Alert.alert(
    'DELETE INVOICE',
    'Do want to delete  invoice?',
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteName(id)},
    ],
    
    {
      cancelable: true,
    },
  );


  const deleteName = (id :number) => {
    db.transaction((tx:SQLTransaction) => {
      tx.executeSql(`DELETE FROM InvoiceSell WHERE id=?;`, [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            loadData(db,setInvoices,convertToSectionListData)
          }
        },
        (txObj, error) => {
          console.log(error)
          return false;
        }
      );
    });
  };

 


  return (
    
    <View style={styles.container}>
      <MButton title="New Invoice" 
      handleClick={showModel} 
      exContainer={styles.btn}/>
      <MModal 
        isVisible={modalVisible}
        handelSetVisible={setModalVisible}
        handleSetInvoices={setInvoices}
        item={invoiceItem}
      />
      <Text style={styles.invoicesTile}>Invoice Details</Text>
      <SectionList
        sections={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Invoice item={item} handleDelete={showAlert} handleUpdate={showModalUpdate}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.mainContact}>Main Contact: {title}</Text>
        )}
        ListEmptyComponent={<NoDataFound/>} 
       />
       
      <StatusBar style="auto" />
    </View>
  );
  }


  const styles = StyleSheet.create({
    invoicesTile:{
      fontSize:23,
      fontWeight:'bold',
      width:310,
      borderBottomWidth:1,
      marginVertical:19
    },
    mainContact:{
      fontSize:17,
      fontWeight:'bold',
      textAlign:'center',
      marginVertical:25
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical:19
    },

    addBtn: {
      width:300,
      marginVertical:15,
    
    },
    btn:{
      width:270,
      height:'auto',
    },
   
  });

  export default Home;