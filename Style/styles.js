import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF44F',
    },
    profileDetails: {
        marginTop: 16,
        paddingHorizontal: 130,
        alignContent: 'center',
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 150,
        borderColor: '#dddddd',
        borderWidth: 1,
        backgroundColor: '#dcdcdc',
    },
    profileName: {
        marginLeft: 10,
        marginTop: 25,
        alignContent: 'center',
    },
    separator: {
        marginVertical: 20,
        borderBottomColor: 'red',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    text: {
        alignItems: 'center'
    },
    titleText: {
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red'

    },
    topText: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'

    },
    feedText: {
        fontSize: 15,
        color: 'red'
    }

});