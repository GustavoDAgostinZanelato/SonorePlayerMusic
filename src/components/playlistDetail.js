import React, { useState } from "react";
import { View, StyleSheet, Modal, Dimensions, TextInput, TouchableWithoutFeedback, Text, FlatList } from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function PlaylistDetail({ visible, playlist, onClose, onSubmit }) {
    return (
        <Modal visible={visible} animationType="slide" transparent
        onRequestClose={onClose}>
            <View style={styles.container}>
                <Text style={styles.title}>{Playlist.titulo}</Text>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={playlist.audios}
                    keyExtrator={item => item.codigo.toString()}
                    renderItem={({ item }) => (
                    <View style={{marginBottom: 10}}>

                    <AudioListItem title={item.filename} duration={item.duration} />
                    </View>)}
                />
            </View>
            <View style={styles.modalBg} />
        </Modal>
    )
}

const { width, height } = Dimensions.get("window")

const Styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        height: height - 150,
        width: width - 15,
        backgroundColor: "fff", //colocar a cor de fundo
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },

    modalBg: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: -1,
    },

    text: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
    },

    listContainer: {
        padding: 20,
    },

    title: {
        textAlign: "center",
        fontSize: 20,
        paddingVertical: 5,
        fontWeight: "bold",
        color: "#000",
    },
});