import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Separator = () => (
  <View style={styles.separator} />
);


class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });

    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  //Get Method for Find Friends
  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/search", {
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

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };
  //Render Method for Friends
  render() {


    return (

      <ScrollView style={{ backgroundColor: '#FFF44F' }}>

        <View style={styles.fixToText}>

          <Button
            title="Add Friends"
            onPress={() => this.props.navigation.navigate("Search")}
            color='orange'
          />
          <Button
            title="Friend Requests"
            color="red"
            onPress={() => this.props.navigation.navigate("Requests")}
          />
        </View>
        <Separator />
        <View>
          <Text style={styles.title}>
            Your list of Friends:
          </Text>
        </View>


        <View style={styles.item}>
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
      </ScrollView>
    )
  }

}

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    backgroundColor: 'yellow'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  FlatList: {
    textAlign: 'right',
    marginHorizontal: 30,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 20,
  },
});