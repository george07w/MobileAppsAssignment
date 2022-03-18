import React, { Component } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { styles } from '../Style/styles';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const Separator = () => (
    <View style={styles.separator} />
);


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            listData: [],
            user_id: "",
            email: "",
            password: ""
        }
    }

    componentDidMount() {

        this.getData();
    }


    //Get Request for Retrieving User Information
    getData = async () => {
        return fetch("http://localhost:3333/api/1.0.0/user/9", {
            'headers': {
                'X-Authorization': "65722a797dfd42044ab0da849187f762"
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    this.props.navigation.navigate("Login");
                } else {
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    listData: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            })
    };
    //Patch Request for Updating a User's Information
    async updateItem() {
        let to_send = {};

        if (this.state.email != this.state.email) {
            to_send['email'] = this.state.email;
        }
        if (this.state.password != this.state.password) {
            to_send['password'] = this.state.password;
        }
        console.log(to_send);

        try {
            const response = await fetch("http://localhost:3333/api/1.0.0/user/9", {
                method: 'patch',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(to_send)
            });
            Alert.alert("Updated Succesfully");
        } catch (error) {
            console.log(error);
        }
    }

    //Profile Render Method
    render() {
        return (
            <SafeAreaView style={styles.container}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 29 }}
                >
                    <View style={styles.profileDetails} row aCenter>
                        <View style={styles.profilePicture} />
                        <View style={styles.profileName} >
                            <Text username>George White</Text>
                        </View>
                    </View>
                    <Separator />



                    <View>
                        <FlatList
                            data={this.state.listData}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.user_givenname} {item.user_familyname}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => item.user_id.toString()}
                        />
                    </View>



                    <Separator />
                    <Button
                        title="Upload a Profile Picture"
                        onPress={() => this.deleteItem(post)}
                        color='red'
                    />
                    <Separator />

                    <View>
                        <Text>Update your email address:</Text>
                        <TextInput
                            placeholder='Update email address...'
                            onChangeText={(email) => this.setState({ email })}
                            value={this.setState.email}
                            style={{ padding: 5, borderWidth: 1, margin: 5, backgroundColor: 'white' }}
                        />
                        <Button
                            title="Update email"
                            onPress={() => this.updateItem()}
                            color='red'
                        />
                        <Text>Update your password:</Text>
                        <TextInput
                            placeholder='Update password...'
                            onChangeText={(password) => this.setState({ password })}
                            value={this.setState.password}
                            secureTextEntry
                            style={{ padding: 5, borderWidth: 1, margin: 5, backgroundColor: 'white' }}
                        />
                        <Button
                            title="Update password"
                            onPress={() => this.updateItem()}
                            color='red'
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>

        );
    }

}



export default Profile;