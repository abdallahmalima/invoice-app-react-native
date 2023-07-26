import React from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

type ButtonProps = {
  title:string;
  handleClick: (event: GestureResponderEvent) => void;
  exContainer?: StyleProp<ViewStyle>;
  exText?: StyleProp<TextStyle>;
  isDisable?:boolean;
};

const MButton = ({ handleClick,title,
   exContainer, 
   exText,
   isDisable=false }: ButtonProps) => (
  <TouchableOpacity 
  onPress={handleClick} 
  style={[styles.container,
               exContainer,
               isDisable && styles.disabledContainer,
              ]}
  disabled={isDisable}
  >
    <Text style={[styles.text,
                        exText,
                        isDisable && styles.disabledText,
                        ]}>
                    {title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0074d9',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  }
,
  disabledContainer: {
    opacity: 0.5,
    backgroundColor: '#ccc', 
  },
  disabledText: {
    color: '#999', 
  },
});

export default MButton;
