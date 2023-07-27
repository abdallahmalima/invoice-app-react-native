import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MButton from "./MButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SQLTransaction } from "expo-sqlite";
import useSQLiteDB from "../composables/useSQLiteDB";
import DropDownPicker from 'react-native-dropdown-picker';
import convertToSectionListData from "../composables/convertToSectionListData";
import loadData from "../composables/loadData";
import { InvoiceType } from "../screens/Home";

interface MModalProps {
    isVisible: boolean;
    handelSetVisible: Dispatch<SetStateAction<boolean>>;
    handleSetInvoices: Dispatch<SetStateAction<any>>; 
    item: InvoiceType; 
  }


const MModal=({
              isVisible,
              handelSetVisible,
              handleSetInvoices,
              item,
}:MModalProps)=>{
const [,db]=useSQLiteDB();
const [mainContact, setmainContact] = useState<string | undefined>(undefined);    
const [aName, setaName] = useState<string | undefined>(undefined);
const [eName, seteName] = useState<string | undefined>(undefined);
const [unit, setUnit] = useState<string>("piece");
const [quantity, setQuantity] = useState<number>(0);
const [price, setPrice] = useState<number | undefined>(undefined);
const [discount, setDiscount] = useState<number | undefined>(undefined);
const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined);
const [taxPercentage, setTaxPercentage] = useState<number | undefined>(undefined);
const [totalTax, setTotalTax] = useState<number | undefined>(undefined);
const [totapPriceWithTax, setTotalPriceWithTax] = useState<number | undefined>(undefined);

type OptionType = {
    label: string;
    value: string;
  };
  
const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<OptionType[]>([
    {label: 'Piece', value: 'piece'},
    {label: 'Box', value: 'box'},
    {label: 'Bar', value: 'bar'},
    {label: 'Packet', value: 'packet'},
  ]);

useEffect(()=>{
    if(item){
        setmainContact(item.mainContact)
        setaName(item.aName)
        seteName(item.eName)
        setUnit(item.unit)
        setQuantity(item.quantity)
        setPrice(item.price)
        setDiscount(item.discount)
        const totalPriceWithoutTax=(item.price*item.quantity)-item.discount;
        setTotalPrice(totalPriceWithoutTax)
        setTaxPercentage(item.taxPercentage)
        const totalTax=totalPriceWithoutTax*(item.taxPercentage/100)
        setTotalTax(totalTax)
        setTotalPriceWithTax(totalPriceWithoutTax+totalTax)
    }
},[item])

const submitInvoice = ():void => {
    db.transaction((tx:SQLTransaction) => {
      tx.executeSql(`INSERT INTO InvoiceSell 
      ( 
        mainContact,
        aName,
        eName,
        unit,
        quantity,
        price,
        discount,
        taxPercentage
        )
         values
        (?,?,?,?,?,?,?,?);`, [
          mainContact,
          aName,
          eName,
          unit,
          quantity,
          price,
          discount,
          taxPercentage
      ],
        (txObj, resultSet) => {
            loadData(db, handleSetInvoices,convertToSectionListData)
            handelSetVisible(false);
            resetForm();
        },
        (txObj, error) => {
          console.log(error)
          return false;
        }
      );
    });
  }

    const resetForm=():void=>{
    setmainContact(undefined)
    setaName(undefined)
    seteName(undefined)
    setUnit(undefined)
    setQuantity(0)
    setPrice(undefined)
    setDiscount(undefined)
    setTotalPrice(undefined)
    setTaxPercentage(undefined)
    setTotalTax(undefined)
    setTotalPriceWithTax(undefined)
  }

  const updateInvoice=(id:number):void=>{
    db.transaction((tx:SQLTransaction) => {
        tx.executeSql(`UPDATE InvoiceSell SET 
            mainContact=?,
            aName=?,
            eName=?,
            unit=?,
            quantity=?,
            price=?,
            discount=?,
            taxPercentage=?
            WHERE id=?`, [
            mainContact,
            aName,
            eName,
            unit,
            quantity,
            price,
            discount,
            taxPercentage,
            id,
        ],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
                loadData(db, handleSetInvoices,convertToSectionListData)
                handelSetVisible(false);
                resetForm();
            }
          },
          (txObj, error) => {
            console.log(error)
            return false;
          }
        );
      });
  }

  const cancelModal=():void=>{
    handelSetVisible(!isVisible)
    resetForm()
  }

  const computeTotaPriceFromQuantity=(quantity:number):void=>{
    const newTotalPrice=(quantity*(price || 0))-(discount || 0)
   setTotalPrice(newTotalPrice)
   const newTotalTax=(((taxPercentage || 0)/100)*newTotalPrice)
   setTotalTax(newTotalTax);
   setTotalPriceWithTax(newTotalPrice+newTotalTax)
  }
  const computeTotaPriceFromPrice=(price:number):void=>{
    const newTotalPrice=((quantity || 0)*price)-(discount || 0)
    setTotalPrice(((quantity || 0)*price)-(discount || 0))
    const newTotalTax=(((taxPercentage || 0)/100)*newTotalPrice)
   setTotalTax(newTotalTax);
   }

   const computeTotaPriceFromDiscount=(discount:number):void=>{
    const newTotalPrice=((quantity || 0)*(price || 0))-discount
    setTotalPrice(((quantity || 0)*(price || 0))-discount)
    const newTotalTax=(((taxPercentage || 0)/100)*newTotalPrice)
     setTotalTax(newTotalTax);
     setTotalPriceWithTax(newTotalPrice+newTotalTax)
   }
   const setTotaTaxFromTaxPercentage=(taxPercentage:number):void=>{
    const newTotalTax=((taxPercentage/100)*(totalPrice ||0))
        setTotalTax(newTotalTax);
        setTotalPriceWithTax((totalPrice || 0)+newTotalTax)
   }

   const canSubmit = (): boolean => {
    return !!mainContact &&
           !!aName &&
           !!eName &&
           !!unit &&
           typeof discount === 'number' &&
           typeof taxPercentage === 'number' &&
           typeof totalPrice === 'number' &&
           typeof totalTax === 'number' &&
           typeof totapPriceWithTax === 'number';
  };
  
   


    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          handelSetVisible(!isVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Invoice Detail</Text>
            </View>
        

          <TextInput
            value={mainContact}
            placeholder='Main Contact'
            onChangeText={(text) => setmainContact(text)}
            style={styles.inputField}
            />
            <TextInput
            value={aName}
            placeholder='aName'
            onChangeText={(text) => setaName(text)}
            style={styles.inputField}
            />
            <TextInput
            value={eName}
            placeholder='eName'
            onChangeText={(text) => seteName(text)}
            style={styles.inputField}
            />
             <DropDownPicker
            open={open}
            value={unit}
            items={items}
            setOpen={setOpen}
            setValue={setUnit}
            setItems={setItems}
            containerStyle={styles.dropDownContainer}
            style={styles.dropdown}
            placeholder="Select Unit"
            />
            <View style={styles.counterContainer}>
            <TextInput
            value={quantity?.toString()}
            placeholder='Quantity'
            style={[styles.inputField,styles.half]}
            editable={false}
            />
            <View style={styles.counterBtnContainer}>
            <MButton title="-"
                      handleClick={()=>{
                        if(quantity>0){
                            const newQuantity=quantity-1;
                            setQuantity(newQuantity)
                            computeTotaPriceFromQuantity(newQuantity)

                        }
                       
                    }} 
                      exContainer={styles.counterBtn} 
                      exText={styles.counterBtnTxt} />
            <MButton title="+" 
                     handleClick={()=>{
                        const newQuantity=quantity+1;
                        setQuantity(newQuantity)
                        computeTotaPriceFromQuantity(newQuantity)
                    }} 
                     exContainer={styles.counterBtn} 
                     exText={styles.counterBtnTxt}/>
            </View>
            </View>
            <TextInput
            value={price?.toString()}
            placeholder='Price'
            keyboardType="numeric"
            onChangeText={(text) => {
                const newPrice=Number(text);
                setPrice(newPrice)
                computeTotaPriceFromPrice(newPrice)
            }}
            style={styles.inputField}
            />
           <View style={styles.inputDouble}>
            <TextInput
            value={discount?.toString()}
            placeholder='Discount'
            keyboardType="numeric"
            onChangeText={(text) => {
                const newDiscount=Number(text);
                setDiscount(newDiscount)
                computeTotaPriceFromDiscount(newDiscount)
            }}
            style={[styles.inputField,styles.half]}
            />

            <TextInput
            value={totalPrice?.toString()}
            placeholder='Total Price'
            onChangeText={(text) => setTotalPrice(Number(text))}
            editable={false}
            style={[styles.inputField,styles.half]}
            />
            </View>
            <View style={styles.inputDouble}>
            <TextInput
            value={taxPercentage?.toString()}
            placeholder='Tax Percentage'
            keyboardType="numeric"
            onChangeText={(text) => {
                const newTaxPercentage=Number(text);
                setTaxPercentage(newTaxPercentage)
                setTotaTaxFromTaxPercentage(newTaxPercentage)
                
            }}
            style={[styles.inputField,styles.half]}
            />
            <TextInput
            value={totalTax?.toString()}
            placeholder='Total Tax'
            editable={false}
            style={[styles.inputField,styles.half]}
            />
           </View>
           <TextInput
            value={totapPriceWithTax?.toString()}
            placeholder='Total Price'
            editable={false}
            style={[styles.inputField,styles.txtBlack]}
            />
           <View style={styles.btnFlex}>
            {!item?
           <MButton title="Submit" handleClick={submitInvoice}  exContainer={[styles.btnSize]}  isDisable={!canSubmit()}/>
           :
           <MButton title="Update" handleClick={()=>updateInvoice(item.id)} exContainer={[styles.btnSize]} isDisable={!canSubmit()} />
            }
           <MButton title="Cancel" handleClick={cancelModal} exContainer={[styles.btnCancel]} />
           </View>
          </View>
        </View>
  </Modal>  
    );
}


const styles= StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      btnFlex:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        gap:5,
        marginTop:15,
        width:250
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
        inputField: {
          borderBottomWidth: 1, 
          borderBottomColor: 'gray', 
          paddingVertical: 10, 
          paddingHorizontal: 5,
          fontSize: 16,
          marginBottom: 10,
          width:250,
          
        },
        inputDouble:{
         flexDirection:'row',
         gap:11
        },
        half:{
            width:120,
            color:'black'
        }
        ,
        btnCancel:{
          backgroundColor:'red'
        },
        btnSize:{
            width:130
          },
        title:{
          fontWeight:'bold',
          fontSize:19,
          textTransform:'uppercase'  
        },
        titleContainer:{
            width:250,
            alignItems:'center',
            
        },
        dropDownContainer: {
            zIndex: 1,
          },
       dropdown:{
        borderWidth: 0,
       }   
      ,
      counterBtnContainer:{
       flexDirection:'row'
      },
      counterContainer:{
      flexDirection:'row',
      gap:30,
      marginTop:7,
      },
      counterBtn:{
      width:50,
      alignItems:'center',
      justifyContent:'center',
      height:50,
      backgroundColor:'#fff'
      },
      counterBtnTxt:{
        color:'black',
        fontSize:19
      },
      txtBlack:{
        color:'black'
      }
      

})

export default MModal;