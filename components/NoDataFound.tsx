import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function NoDataFound() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>No Data Found</Text>
        </View>
    );
}

export default NoDataFound;

const styles=StyleSheet.create({
container:{
    height:250,
    justifyContent:'center',
    alignItems:'center'
},
text:{
 fontSize:21,

}
});