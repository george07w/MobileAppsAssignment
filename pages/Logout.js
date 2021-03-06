import React, { Component } from 'react';
import { Text, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: ''
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value !== null) {
            this.setState({ token: value });
        } else {
            this.props.navigation.navigate("Login");
        }
    }
    //Logout Post Request
    logout = async () => {
        let token = await AsyncStorage.getItem('@session_token');
        await AsyncStorage.removeItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/logout", {
            method: 'post',
            headers: {
                "X-Authorization": token
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    this.props.navigation.navigate("Login");
                } else if (response.status === 401) {
                    this.props.navigation.navigate("Login");
                } else {
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show(error, ToastAndroid.SHORT);
            })
    }
    //Logout Render Method
    render() {
        return (
            <ScrollView style={{ height: 100, marginTop: 0, backgroundColor: '#FFF44F' }} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 5, margin: 5 }}>Are you sure you want to Logout?</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', padding: 5, margin: 5 }}>Logging out will require you to login again.</Text>
                <Button
                    title="Logout"
                    onPress={() => this.logout()}
                    color="red"
                />

                <Button
                    title="Return to Spacebook"
                    color="orange"
                    onPress={() => this.props.navigation.navigate("Main")}
                />

            </ScrollView>

        )
    }
}

export default HomeScreen;