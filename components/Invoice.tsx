import { Button, Text, View} from "react-native";
import MButton from "./MButton";
import TableStyles from "./table.styles";
import { InvoiceType } from "../screens/Home";

interface InvoiceProps {
  handleDelete: (id: number) => void;
  handleUpdate: (item: InvoiceType) => void;
  item: InvoiceType;
}

const Invoice=({handleDelete,handleUpdate,item}:InvoiceProps)=>(
  <View key={item.id} style={TableStyles.container}>
  <View style={TableStyles.tableRow}>
        <Text style={[TableStyles.columnHeader, TableStyles.column]}>orderNo.</Text>
        <Text style={[TableStyles.columnHeader, TableStyles.column]}>aName</Text>
        <Text style={[TableStyles.columnHeader, TableStyles.column]}>eName</Text>
  </View>
   <View  style={TableStyles.tableRow}>
   <Text style={[TableStyles.cell, TableStyles.column]}>{item.id}</Text>
   <Text style={[TableStyles.cell, TableStyles.column]}>{item.aName}</Text>
   <Text style={[TableStyles.cell, TableStyles.column]}>{item.eName}</Text>
 </View>
 <View  style={TableStyles.tableRow}>
 
   <MButton exContainer={[TableStyles.cell, TableStyles.column]} title='Update' handleClick={() => handleUpdate(item)} />
   <MButton exContainer={[TableStyles.cell, TableStyles.columnDoube]} title='Delete' handleClick={() => handleDelete(item.id)} />
 </View>
 </View>
)




export default Invoice;