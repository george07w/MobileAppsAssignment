import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { styles } from '../Style/styles';

const Separator = () => (
    <View style={styles.separator} />
);

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            id: "",
            user_id: "",
            post_id: "",
            listData: []
        }
    }

    componentDidMount() {
        this.getData();
    }
    //Get Request for list of posts for a User
    getData = async () => {
        return fetch("http://localhost:3333/api/1.0.0/user/9/post/", {
            'headers': {
                'X-Authorization': "65722a797dfd42044ab0da849187f762"
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    throw 'You are not authorised'
                } else {
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    text: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }



    //Post Request for adding a new post
    async uploadPost() {

        let to_send = {
            user_id: parseInt(this.state.user_id),
            text: this.state.text,
            post_id: parseInt(this.state.post_id)
        }

        try {
            const response = await fetch("http://localhost:3333/api/1.0.0/user/9/post", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': "65722a797dfd42044ab0da849187f762"
                },
                body: JSON.stringify(to_send)
            });
            if (response.status === 201) {
                console.log("Post Created");
            } else if (response.status === 404) {
                throw 'You are not unauthorised';
            } else {
                throw 'Something went wrong!';
            }
        } catch (error) {
            console.log(error);
        }
    }
    //Render Method for feed
    render() {
        return (
            <SafeAreaView style={styles.container}>

                <ScrollView>
                    <View style={StyleSheet.container}>
                        <Text style={styles.titleText}> Hello!    Welcome to SpaceBook!</Text>

                    </View>
                    <Separator />
                    <Text style={styles.feedText} >
                        Upload a Post: </Text>
                    <TextInput
                        placeholder="Write your post..."
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        style={{ padding: 5, borderWidth: 1, margin: 5, backgroundColor: 'white' }}
                    />

                    <Button
                        title="Post"
                        onPress={() => this.uploadPost()}
                        color='red'
                    />
                    <Separator />
                    <Text style={styles.feedText}>
                        Your posts: </Text>
                    <View>
                        {<FlatList
                            data={this.state.listData}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.text}</Text>



                                </View>
                            )}
                            keyExtractor={(item) => item.listData.toString()}
                        />}
                    </View>
                    <Separator />

                    <Separator />
                </ScrollView>
            </SafeAreaView>

        );
    }

}




export default Feed;

