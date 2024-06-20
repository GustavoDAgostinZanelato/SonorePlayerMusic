import React, { useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlaylistModal from "../components/PlaylistModal";

export default function Playlist() {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.PlayListBanner}>
                <Text>Favoritos</Text>
                <Text style={styles.audioCount}>0 Músicas</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.PlayListBtn}>+ Adicionar nova Playlist</Text>
            </TouchableOpacity>

            <PlaylistModal visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={(playlistName => console.log(playlistName))} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    PlayListBanner: {
        padding: 5,
        backgroundColor: "#D0D1D3",
        borderRadius: 5,
    },
    audioCount: {
        marginTop: 2,
        opacity: 0.5,
        fontSize: 14,
    },

    PlayListBtn: {
        color: "#febc2a",
        letterSpacing: 1,
        fontWeight: "bold",
        fontSize: 14,
    },
});