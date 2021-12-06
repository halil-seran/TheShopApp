import React, { useState, useEffect, useCallback, useReducer } from "react";
import { View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from '../../store/actions/products';
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'OKAY' }]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            if (editedProduct) {
                await dispatch(
                    productsActions.updateProduct(
                        prodId,
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl
                    )
                );
            } else {
                await dispatch(
                    productsActions.createProduct(
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl,
                        +formState.inputValues.price   //data string olarak çekiyoruz ama price sayı old. için hata veriyordu bu şekilde çözdük
                    )
                );
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
        //props.navigation.goBack();   // navigation.navigate('UserProducts');  /5 satır yukarı taşıdım çünkü error varsa hata versin goBacke gitmesin
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color='#253237' />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90} >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title!'
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image URL'
                        errorText='Please enter a valid image url!'
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <Input
                            id='price'
                            label='Price'
                            errorText='Please enter a valid price!'
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.01}
                        />
                    )}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description!'
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={4}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark-sharp' : 'ios-checkmark'}
                    onPress={submitFn}
                />
            </HeaderButtons>
        )

    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;