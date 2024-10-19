import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
// Nhận hàm callback từ props

const AddYourJob = () => {
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const userName = route.params?.userName;
    const note = route.params.note; // Nhận note từ props
    const onFinish = route.params.onFinish;
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
        if (note) {
            setContent(note.content);  // Set content bằng nội dung của note khi sửa
        }
    }, [note]);

    const handleFinish = async () => {
        if (content.trim() === '') {
            alert('Vui lòng nhập nội dung Note cần thêm.');
            return;
        }

        try {
            if (note) {
                // Nếu đang sửa, thực hiện PUT request
                await axios.put(`https://670b84dfac6860a6c2cc4349.mockapi.io/apv/v1/content/${note.id}`, { content });
                alert('Ghi chú đã được sửa thành công!');
            } else {
                // Nếu thêm mới, thực hiện POST request
                const response = await axios.get('https://670b84dfac6860a6c2cc4349.mockapi.io/apv/v1/content');
                const newNoteId = response.data.length ? (parseInt(response.data[response.data.length - 1].id) + 1).toString() : "1";
                const newNote = { id: newNoteId, content };
                const result = await axios.post('https://670b84dfac6860a6c2cc4349.mockapi.io/apv/v1/content', newNote);
                alert('Ghi chú đã được thêm thành công!');
                
            }
            // Gọi hàm callback để làm mới danh sách ghi chú
            if (onFinish) {
                onFinish();
            }

            // Quay lại NoteList và truyền userName
            navigation.navigate('NoteList', { userName });
           

            // Reset content
            setContent('');
        } catch (error) {
            console.error(error);
            alert('Failed to add or edit the note');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('NoteList', { userName })}> <FontAwesome name="arrow-left" size={25} style={styles.icon2} /></TouchableOpacity>

                <View style={styles.viewimage}>
                    <Image source={require('../img/avatar.png')}
                        style={styles.image}
                    /></View>

                <View style={styles.name}>

                    <Text style={styles.title1}>Hi {userName}</Text>
                    <Text style={styles.title}>Have agrate day a head</Text>

                </View>




            </View>
            <Text style={styles.title3}>{note ? 'EDIT YOUR JOB' : 'ADD YOUR JOB'}</Text>
            <View style={styles.inputContainer}>
                <FontAwesome name="book" size={20} style={styles.icon} />
                <TextInput

                    style={styles.input}
                    placeholder="input your job"
                    value={content}
                    onChangeText={setContent}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.buttonText}>{note ? 'UPDATE' : 'FINISH'}</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={require('../img/note.png')} style={styles.imageNote} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title3: {
        fontSize: 35,
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 40,
        marginTop: 30,
        marginBottom: 20,
    },
    input: {

        borderColor: '#ccc',
        padding: 10,

        borderRadius: 8,
        width: '80%',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00cfe6',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',

    }, name: {
        marginLeft: 20,
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
    }, inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#aba9a9',
        marginBottom: 50,

    },
    icon: {
        padding: 10,
        color: 'green',

    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    imageNote: {
        width: 180,
        height: 180,
        marginBottom: 10,
    }
});

export default AddYourJob;
