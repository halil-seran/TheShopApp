import React from "react";
import { FlatList, Button, StyleSheet, Platform, View, Alert, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch()
    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this product?', [
            { text: 'No', style: 'cancel' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productsActions.deleteProduct(id));
                }
            }
        ]);
    };

    if (userProducts.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 22 }}>No Products Found!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id);
                    }}
                >
                    <View style={styles.button}>
                        <Button
                            color={'#253237'}
                            title="Edit"
                            onPress={() => {
                                editProductHandler((itemData.item.id));
                            }}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            color={'#d00000'}
                            title="Delete"
                            onPress={deleteHandler.bind(this, itemData.item.id)}
                        />
                    </View>
                </ProductItem>
            )}
        />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create-outline' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>
        )

    };
};

const styles = StyleSheet.create({
    button: {
        width: 100
    }
});


export default UserProductsScreen;