import React, { useState } from "react";
import { View, StyleSheet, Modal, Dimensions, TextInput, TouchableWithoutFeedback, Text } from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function PlaylistModal({ visible, onClose, onSubmit }) {
    if (!visible) return null; // Renderiza null se o modal não estiver visível

    const [playlistName, setPlaylistName] = useState("")

    const handleOnSubmit = () => {
        if (!playlistName.trim()) {
            onClose()
        } else {
            onSubmit(playlistName)
            onClose()
        }
    }
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={Styles.modalBg}></View>
            </TouchableWithoutFeedback>

            <View style={Styles.modalContainer}>
                <View style={Styles.modalContent}>
                    <Text style={Styles.text}>Criar Nova Playlist</Text>

                    <View style={Styles.inputContainer}>
                        <TextInput value={playlistName} onChangeText={(text) => setPlaylistName(text)}
                            style={Styles.input} />

                        <View style={Styles.submitContainer}>
                            <Entypo name="check" size={30} color="green" onPress={handleOnSubmit} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const { width, height } = Dimensions.get("window");

const Styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#ffffff",
        width: width - 40,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    inputContainer: {
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    input: {
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "#febc2a",
        fontSize: 18,
        paddingVertical: 8,
    },
    submitContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: "#fffff",
        borderRadius: 50,
    },
    modalBg: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    text: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
    },
});