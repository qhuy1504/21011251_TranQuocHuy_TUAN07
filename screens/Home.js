import React, {useCallback, useState} from "react";
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from 'axios'

const Home = () => {

    const [username, setUsername] = useState('');
   
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
           setUsername('');
        }, [])

    );
    const handleGetStarted = async () => {
        try {
            const response = await axios.get('https://670b84dfac6860a6c2cc4349.mockapi.io/apv/v1/users');
            const user = response.data.find(u => u.username.toLowerCase() === username.toLowerCase());
            if (user) {
                navigation.navigate('NoteList', {userName: user.name});
            } else {
                Alert.alert('Username không tồn tại trong hệ thống, vui lòng nhập lại!');
            }
        } catch (error) {
                console.log('Error: ', error);
                Alert.alert('Lỗi kết nối đến server, vui lòng thử lại sau!');
            }
            
          
      
    };




    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../img/note.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>Manage Your
                   
                </Text>
                <Text style={styles.title2}>Task</Text>
              
                
        
            </View>
            <View style={[styles.inputContainer]}>

                <FontAwesome name="user" size={20} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nhập vào username"
                    value={username}

                  
                    onChangeText={setUsername}



                ></TextInput>


            </View>
            <View style={[styles.inputContainer2]}>
                <TouchableOpacity style={styles.loginButton} onPress={handleGetStarted}>
                <Text style={styles.textButton}>GET STARTED</Text>
                <FontAwesome name="chevron-right" size={15} style={styles.icon2} />

                </TouchableOpacity>
            
              
                
            </View>
            {/* <TouchableOpacity style={styles.loginButton2} >
                <Text style={styles.loginText} >Login</Text>
            </TouchableOpacity> */}

        </View>

    );
    
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    header: {
       marginBottom: 30,
    },
    image: {
        width: 250,
        height: 230,
        marginTop: '-50%',
        left: 20,
        
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#8353E2',
      
        marginTop: 10,
        marginLeft: 30,
    },
    title2: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#8353E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 80,
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        borderColor: '#6C63FF',
        borderWidth: 2, 
       


    },
    icon: {
        padding: 10,
        color: '#6C63FF',

    },
    icon2: {
        marginLeft: 200,
        position: 'relative',
        top: '-40%',
        color: '#ffffff',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        width: 250,
        paddingHorizontal: 10,
        outlineWidth: 0,
       
        borderRadius: 8,         // Bo tròn các góc của viền
        backgroundColor: '#fff', // Nền trắng cho input
        


    }, loginButton:
    {
        backgroundColor: '#00BDD6',
        borderRadius: 8,
        paddingHorizontal: 40,
        paddingVertical: 10,
        


    },
    loginButton2:
    {
        marginTop: 20,
        backgroundColor: '#4cc22f',
        borderRadius: 8,
        paddingHorizontal: 40,
        paddingVertical: 10,



    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 30,
    },
    inputContainer2: {
    
        flexDirection: 'row',
      
        



    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
       
    }



});
export default Home;
