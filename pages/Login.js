import React, { Component } from 'react';
import { Button } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, Image } from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
);


class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }
    //Login Post Request
    login = async () => {

        

        return fetch("http://localhost:3333/api/1.0.0/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 400) {
                    throw 'Invalid email or password';
                } else {
                    throw 'Something went wrong';
                }
            })
            .then(async (responseJson) => {
                console.log(responseJson);
                await AsyncStorage.setItem('@session_token', responseJson.token);
                this.props.navigation.navigate("Home");
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //Login Render Method
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#FFF44F', height: 10, marginTop: 150, }}>
                <View style={styles.container}>
                    <Image
                        style={{ width: 400, height: 47 }}
                        source={require('../assets/logo.png')} />
                </View>
                <Separator />
                <TextInput
                    placeholder="Enter your email..."
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    style={{ padding: 5, borderWidth: 1, margin: 5 }}
                />
                <TextInput
                    placeholder="Enter your password..."
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry
                    style={{ padding: 5, borderWidth: 1, margin: 5 }}
                />

                <Button
                    title="Login"
                    onPress={() => this.login()}
                    color='red'
                />
                <Button
                    title="Don't have an account?"
                    onPress={() => this.props.navigation.navigate("Signup")}
                    color='orange'
                />
                <Separator />

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'darkBlue',
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default LoginScreen;