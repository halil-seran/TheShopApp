import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Colors } from "../../constants/Colors";

import CartItem from './CartItem';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem} >
            <View style={styles.summary} >
                <Text style={styles.totalAmount}>{props.amount.toFixed(2)}₺</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.button}>
                <Button color='#253237' title={showDetails ? 'Hide Details' : 'Show Details'} onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}
                />
            </View>
            {showDetails && (
                <View style={styles.detailItems} >
                    {props.items.map(cartItem => (
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.productTitle}
                        />
                    ))
                    }
                </View>)}

        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 18,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'flex-end'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        marginLeft: 5,
        marginTop: 4
    },
    date: {
        fontSize: 17,
        fontFamily: 'open-sans',
        color: '#888',
        marginRight: 5,
        marginTop: 4
    },
    button: {
        margin: 4,
        marginRight: 7,
        width: 120
    },
    detailItems: {
        width: 360,
        marginVertical: 5
    }
});

export default OrderItem;