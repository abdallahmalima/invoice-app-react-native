import { SQLTransaction } from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import useSQLiteDB from '../composables/useSQLiteDB';
import InvoiceHeader from '../components/InvoiceHeader';
import loadData from '../composables/loadData';
import NoDataFound from '../components/NoDataFound';


const InvoiceHeaderTitle=()=>(

  <View style={styles.tableRow}>
   <Text style={[styles.columnHeader, styles.column]}>Main Contact</Text>
   <Text style={[styles.columnHeader, styles.column]}>aName</Text>
   <Text style={[styles.columnHeader, styles.column]}>eName</Text>
   <Text style={[styles.columnHeader, styles.column]}>Total</Text>
   </View>
)

const Header=()=> {
  const [isLoading,db]=useSQLiteDB();
  const [invoices, setInvoices] = useState([]);

  useEffect(()=>{
    if(!isLoading){
      loadData(db,setInvoices)
    }
  },[isLoading])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading Invoices...</Text>
      </View>
    );
  }

 

    return (
         <View style={styles.rootContainer}>
         <Text style={styles.invoicesTile}>Invoice Header List</Text>
         
         <FlatList
          data={invoices}
          keyExtractor={(item)=>item.id}
          renderItem={(item)=>(
           <InvoiceHeader header={item}/>         
          )}
          ListHeaderComponent={<InvoiceHeaderTitle/>}
          ListEmptyComponent={<NoDataFound/>}
         />


      </View>
    );
  }

  const styles=StyleSheet.create({
    rootContainer:{
       justifyContent: 'center', 
       alignItems: 'center' 
    },
    invoicesTile:{
      fontSize:23,
      fontWeight:'bold',
      width:310,
      borderBottomWidth:1,
      marginVertical:19
    },
    container: {
      padding: 10,
      backgroundColor: '#fff',
      marginVertical:5,
      
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 7,
    },
    columnHeader: {
      fontWeight: 'bold',
    },
    cell: {
      marginRight:5
    },
    column: {
      width: 70, // Set a fixed width for each column
    },
   
  });

  

  export default Header;