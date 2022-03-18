import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Style/styles';

class FriendRequests extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: []
    }
  }

  componentDidMount() {
    this.getData();
  }
  //Get Request for retrieving list of Friend Requests
  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
      'headers': {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          throw 'Error';
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
  }

  //Render Method for Friend Requests
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#FFF44F' }}>
        <View >
          <Text style={styles.topText}>
            Outstanding Friend Requests Below:
          </Text>
          <FlatList
            data={this.state.listData}
            renderItem={({ item }) => (
              <View>
                <Text>{item.user_givenname} {item.user_familyname}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.user_id.toString()}
          />
          <Button
            title="Back to Friends"
            color="red"
            onPress={() => this.props.navigation.navigate("Friends")}
          />
        </View>
      </ScrollView>
    );
  }

}
export default FriendRequests;

