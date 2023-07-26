import { StyleSheet } from "react-native";

const TableStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      
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
      width: 100, 
    },
    columnFour: {
        width: 70, 
      },
    columnDoube: {
      width: 200, 
    },
  });

  export default TableStyles;
