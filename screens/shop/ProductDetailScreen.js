import React from "react";
import { Text, View, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { HeaderTitle } from "react-navigation-stack";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId)); //products is same name in combine reducer // app.js root reducer
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={'#253237'} title="Add To Card" onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));   
                }} />
            </View>
            <Text style={styles.price}>{selectedProduct.price.toFixed(2)}₺</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return
    {
        HeaderTitle: navData.navigation.getParam('ProductTitle');
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        marginBottom: 10
    },
    actions:{
        marginVertical:10,
        marginHorizontal:50
    },
    price: {
        fontSize: 35,
        color: '#253237',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily:'mont-black'
    },
    description: {
        fontSize: 22,
        textAlign: 'center',
        marginHorizontal:25,
        fontFamily:'mont-light'
    }
});

export default ProductDetailScreen;
