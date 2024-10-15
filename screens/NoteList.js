import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// Hàm xóa ghi chú
import { Alert } from 'react-native';
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";


function NoteList() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const route = useRoute();
    const navigation = useNavigation();
    const userName = route.params.userName || 'Không tìm thấy user';
    const newNote = route.param?.newNote;

    
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`https://670b84dfac6860a6c2cc4349.mockapi.io/apv/v1/content`);
                if (response.status === 200) {
                    setNotes(response.data);
                } else {
                    throw new Error(`Error fetching notes : ${response.status}`);
                }
            }

            catch (error) {
                console.log('Error: ', error);
                alert('Lỗi kết nối đến server, vui lòng thử lại sau!');
            }
    };
    useEffect(() => {
        fetchNotes();

    }, []);
    useEffect(() => {
        if (newNote && newNote.content) {
            setNotes(prevNotes => [...prevNotes, newNote]);
        }
    }, [newNote]);
    // Đảm bảo rằng bạn định nghĩa hàm này
    const handleRefresh = () => {
        fetchNotes(); // Tải lại danh sách ghi chú khi cần
    };
    // Gọi fetchNotes khi màn hình được hiển thị

    const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()));





    // Hàm xóa ghi chú
    const handleDelete = async (id) => {

        console.log('Xóa ghi chú với ID:', id); // Kiểm tra giá trị id

        try {
            await axios.delete(`https://670b84dfac6860a6c2cc4349.mockapi.io/apv/v1/content/${id}`);
            setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
            alert('Đã xóa thành công!'); // Hoặc có thể log thông điệp thành công
        } catch (error) {
            alert('Xóa không thành công:', error); // Log thông báo lỗi
        }

    };







    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}> <FontAwesome name="arrow-left" size={25} style={styles.icon2} /></TouchableOpacity>

                    <View style={styles.viewimage}>
                        <Image source={require('../img/avatar.png')}
                            style={styles.image}
                        /></View>

                    <View style={styles.name}>

                        <Text style={styles.title1}>Hi {userName}</Text>
                        <Text style={styles.title}>Have agrate day a head</Text>

                    </View>




                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="search" size={20} style={styles.icon} />
                    <TextInput style={styles.input}
                        placeholder="Search"
                        value={search}
                        onChangeText={setSearch}

                    ></TextInput>
                </View>
                <FlatList
                    data={filteredNotes}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    renderItem={({ item }) => (
                        <View style={styles.noteItem}>
                            <View style={styles.noteContent}>
                                <Image source={require('../img/icontick.png')}
                                    style={styles.imageIcon}
                                />
                                <Text style={styles.textContent}>{item.content}</Text>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity style={styles.iconEditTouch} onPress={() => navigation.navigate('AddYourJob', { userName, note: item, onFinish: fetchNotes })}>
                                        <FontAwesome name="pencil" size={25} style={styles.iconEdit} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.iconDeleteTouch} onPress={() => handleDelete(item.id)}>
                                        <FontAwesome name="trash" size={25} style={styles.iconDelete} />
                                    </TouchableOpacity>
                                </View>
                            </View>





                        </View>


                    )



                    }
                   
                   

                />
                < View style={styles.buttonPlusContainer}>
                    <TouchableOpacity style={styles.buttonPlus}
                        onPress={() => navigation.navigate('AddYourJob', { userName })}>

                        <Text style={styles.textbuttonPlus}>+</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollview: {
        width: '100%',
        height: 400,
    },
    image: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },

    viewimage:
    {
        marginLeft: 100,
        width: 40,
        height: 40,
        marginBottom: 10,
        borderRadius: '50%',
        backgroundColor: '#e0adff',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666666',
    },
    title1: {
        fontSize: 20,
        fontWeight: 'bold',
    }, header: {
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',

    }, name: {
        marginLeft: 20,
    },
    icon2: {

        opacity: 0.7,
    },

    icon: {
        padding: 10,
        color: 'green',



    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#aba9a9',
        marginBottom: 20,



    },
    input: {
        width: '80%',
        padding: 10,
        fontSize: 18,
    },
    noteContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#DEE1E6',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,


    }, imageIcon: {
        width: 30,
        height: 30,

    }, textContent: {
        marginLeft: 30,
        fontSize: 18,
        fontWeight: 'bold',
    }, iconEdit: {
        color: 'red',

    }
    , iconDelete: {
        color: 'red',
        marginLeft: 20,
    }, iconContainer: {
        marginLeft: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }, buttonPlusContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,

    },
    buttonPlus: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#00cfe6',
        alignItems: 'center',
        justifyContent: 'center',
    }, textbuttonPlus: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        color: '#fff',
    }




});


export default NoteList;