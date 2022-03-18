import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { styles } from '../Style/styles';

const Separator = () => (
  <View style={styles.separator} />
);

class AddFriends extends Component {

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
  //Post Request for Adding a Friend
  async addFriend() {

    let to_send = {
      user_id: parseInt(this.state.user_id),
      text: this.state.text,
      post_id: parseInt(this.state.post_id)
    }

    try {
      const response = await fetch("http://localhost:3333/api/1.0.0/user/9/friends", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': "65722a797dfd42044ab0da849187f762"
        },
        body: JSON.stringify(to_send)
      });
      if (response.status === 201) {
        Alert.alert("Friend Added");
      } else if (response.status === 403) {
        throw 'You are already friends!';
      } else {
        throw 'Something went wrong!';
      }
    } catch (error) {
      console.log(error);
    }
  }


  //Add Friends Render Method
  render() {
    return (

      <ScrollView style={{ backgroundColor: '#FFF44F' }} >
        <View>
          <Text style={styles.topText}>
            Enter your friends ID to add a new friend: </Text>
          <TextInput
            placeholder="Enter your friends ID..."
            onChangeText={(user_id) => this.setState({ user_id })}
            value={this.state.user_id}
            style={{ padding: 5, borderWidth: 1, margin: 5, backgroundColor: 'white' }}
          />
          <Button
            title="Add Friend"
            onPress={() => this.addFriend()}
            color='red'
          />
          <Separator />
          <Button
            title="Back to Friends"
            color="red"
            onPress={() => this.props.navigation.navigate("Requests")}
          />
          <Separator />
        </View>
      </ScrollView>
    );
  }
}

export default AddFriends;



