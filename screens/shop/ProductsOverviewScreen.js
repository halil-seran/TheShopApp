import React, { useState, useEffect, useCallback } from "react";
import { FlatList, Button, Platform, View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';



const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);


    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        });
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={{ fontSize: 22 }}>An Error Occurred!</Text>
                <Button title="Try again" onPress={loadProducts} color={'#253237'} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color='#253237' />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered} >
                <Text style={{ fontSize: 20 }}>No Products Found.Try to add some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                >
                    <View style={styles.button}>
                        <Button
                            color={'#253237'}
                            title="View Details"
                            onPress={() => {
                                selectItemHandler(itemData.item.id, itemData.item.title);
                            }}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            color={'#253237'}
                            title="to Cart"
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item));
                            }}
                        />
                    </View>
                </ProductItem>
            )}
        />
    );
};
ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    button: {
        width: 100
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default ProductsOverviewScreen;