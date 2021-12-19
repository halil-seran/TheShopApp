import React, { useState, useReducer, useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from "react-redux";
import Input from 'react-native-input-style';
import InputUi from "../../components/UI/InputUi";

import Card from '../../components/UI/Card';
import Colors from "../../constants/Colors";
import * as authActions from '../../store/actions/auth';
import { Switch } from "react-native-gesture-handler";

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

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }])
        }
    }, [
        error
    ]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action =
                authActions.signup(
                    formState.inputValues.email,
                    formState.inputValues.password
                );
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }

    };


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState]
    );

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-400} style={styles.screen} >
                <LinearGradient colors={['#C2AFF0', '#9191E9', '#457EAC', '#2D5D7B']} style={styles.gradient} >
                    <Card style={styles.authContainer} >
                        <ScrollView>
                            <Input
                                id="email"
                                label="E-Mail"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorText="Please enter a valid email!"
                                onInputChange={inputChangeHandler}
                                initialValue=""
                                outlined
                                borderColor="blue"
                            />
                            <Input
                                id="password"
                                label="Password"
                                keyboardType="default"
                                secureTextEntry
                                required
                                minLength={5}
                                email
                                autoCapitalize="none"
                                errorText="Please enter a valid password!"
                                onInputChange={inputChangeHandler}
                                initialValue=""
                                outlined
                                borderColor="blue"
                            />
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.buttonContainer}>
                                    {isLoading ?
                                        (<ActivityIndicator size='small' color='red' />) :
                                        (<Button title={isSignup ? 'Sign Up' : "Log In"} color='#212227' onPress={authHandler} />)
                                    }
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title={`Switch to ${isSignup ? 'Log In' : 'Sign Up'}`}
                                        color='#91AEC1'
                                        onPress={() => {
                                            setIsSignup(prevState => !prevState);
                                        }}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </Card>
                </LinearGradient>
            </KeyboardAvoidingView>
        </View>
    );

};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '86%',
        maxWidth: 355,
        height: 305,
        padding: 15
    },
    buttonContainer: {
        paddingTop: 15,
        paddingVertical: 3,
        width: 221,
        height: 48
    }
});

export default AuthScreen;