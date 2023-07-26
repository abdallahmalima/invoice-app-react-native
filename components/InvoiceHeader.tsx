import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import TableStyles from './table.styles';
import { InvoiceType } from '../screens/Home';

type HeaderType={
   header:{item:InvoiceType} ;
}

function InvoiceHeader({header}:HeaderType) {
    const {
        mainContact,
        aName,
        eName,
        price,
        quantity,
        discount,
        taxPercentage}=header.item;
   

    const total=():number=>{
        
        const totalPriceWithoutTax=(price*quantity)-discount;
        const tax=(taxPercentage/100)*totalPriceWithoutTax;
        return totalPriceWithoutTax+tax
    }

    return (
        <View  style={[TableStyles.container,styles.mv]}>
        <View  style={TableStyles.tableRow}>
        <Text style={[TableStyles.cell, TableStyles.columnFour]}>{mainContact}</Text>
        <Text style={[TableStyles.cell, TableStyles.columnFour]}>{aName}</Text>
        <Text style={[TableStyles.cell, TableStyles.columnFour]}>{eName}</Text>
        <Text style={[TableStyles.cell, TableStyles.columnFour]}>{total()}</Text>
       </View>
       </View>
    );
}

const styles=StyleSheet.create({
mv:{
    marginVertical:5
},
});


export default InvoiceHeader;