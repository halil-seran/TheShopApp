import React from "react";
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";


const ProductItem = props => {
    return (
        <View style={styles.product} >
            <Image style={styles.image} source={{ uri: props.image }} />
            <View style={styles.details}>
                <Text style={styles.title} >{props.title}</Text>
                <Text style={styles.price} >{props.price.toFixed(2)/*.dan sonra 2 bas gösterir*/}₺</Text>
            </View>
            <View style={styles.actions} >
                <Button color={'#253237'} title="View Details" onPress={props.onViewDetail} />
                <Button color={'#253237'} title="to Cart" onPress={props.onAddToCard} />
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
        width:'90%', //370
        margin: 20,
        marginVertical:12
    },
    image: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius:25,
        borderTopRightRadius:25
    },
    details:{
        alignItems:'center',
        height:'11%',
        padding:3
    },
    title: {
        fontSize: 17,
        marginVertical: 4
    },
    price: {
        fontSize: 17,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:'15%',
        marginLeft:20,
        marginRight:20,
        marginBottom:10
    }

});

export default ProductItem;