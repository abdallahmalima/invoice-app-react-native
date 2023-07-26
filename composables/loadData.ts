import { SQLTransaction } from "expo-sqlite";



const loadData=(db:any,setInvoices:any,
    formatForSectionList=(data:any)=>(data))=>{
db.transaction((tx:SQLTransaction) => {
tx.executeSql('SELECT * FROM InvoiceSell ORDER BY mainContact;', null,
(txObj, resultSet) => {
setInvoices(formatForSectionList(resultSet.rows._array))
},
(txObj, error) => {
console.log(error)
return false;
}
);
});
}

export default loadData;