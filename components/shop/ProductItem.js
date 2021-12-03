import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Colors } from "../../constants/Colors";


const ProductItem = props => {

    let TouchableCmp = TouchableOpacity; // this is because of weird effect when touch on android
    if (Platform.OS === 'android' && Platform.Version >= 21) { // bu şekilde fixliyoruz
        TouchableCmp = TouchableNativeFeedback;        // also use Foreground
    }

    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                <Image style={styles.image} source={{ uri: props.image }} />
                <View style={styles.details}>
                    <Text style={styles.title} >{props.title}</Text>
                    <Text style={styles.price} >{props.price.toFixed(2)/*.dan sonra 2 bas gösterir*/}₺</Text>
                </View>
                <View style={styles.actions} >
                    {props.children}
                </View>
                </View>
            </TouchableCmp>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 25,
        backgroundColor: 'white',
        height: 300,
        width: '90%', //370
        margin: 20,
        marginVertical: 12
    },
    touchable:{
        borderRadius:25,
        overflow:'hidden'
    },
    image: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    details: {
        alignItems: 'center',
        height: '11%',
        padding: 3
    },
    title: {
        fontSize: 17,
        marginVertical: 2,
        fontFamily:'open-sans-bold'
    },
    price: {
        fontSize: 17,
        color: '#888',
        fontFamily:'open-sans-bold'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    }

});

export default ProductItem;