import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                productPushToken: state.cart.items[key].pushToken
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1); //js sort function 
    });
    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}> 
                    Total:  <Text style={styles.amount}>{Math.round(cartTotalAmount.toFixed(2) * 100) / 100}₺</Text>
                </Text>                              
                {isLoading ? <ActivityIndicator size='small' color='red' /> :                   //sonuç bazen -0 çıkıyor/ fixlemek için 100 le çarpıp 100e bölüyoruz
                <Button      
                    color='#253237'
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={sendOrderHandler}
                />
                }
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                    />
                )}
            />

        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: '#253237',
        fontSize: 21
    }
});

export default CartScreen;