import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlaylistModal from "../components/PlaylistModal";
import PlaylistDetail from "../components/playlistDetail";

// precisa ver o episodio #23 da playlist para adicionar coisas no audioList.js

let selectedPlaylist = {}

export default function Playlist() {
    const [modalVisible, setModalVisible] = useState(false)
    const [showPlaylist, setShowPlaylist] = useState(false)

    const context = useContext(AudioContext)
    const { playlist, addToPlaylist, updateState } = context

    const createPlaylist = async playlistName => {
        const result = await AsyncStorage.getItem("playList")

        if (result !== null) {
            const audios = []

            if (addToPlaylist) {
                audios.push(addToPlaylist)
            }
            const newList = {
                codigo: Date.now(),
                titulo: playlistName,
                audios: audios
            }

            const updatedList = [...playlist, newList]
            updateState(context, { addToPlaylist: null, playlist: updatedList })
            await AsyncStorage.setItem("playList", JSON.stringify(updatedList))
        }
        setModalVisible(false)
    }

    const renderPlayList = async () => {
        const result = await AsyncStorage.getItem("playlist")
        if (result === null) {
            const defaultPlaylist = {
                id: Date.now(),
                tittle: "Meus Favoritos",
                audios: []
            }
            const newPlaylist = [...playlist, defaultPlaylist]
            updateState(context, { playlist: [...newPlaylist] })
            return await AsyncStorage.setItem("playList", JSON.stringify([...newP]))
        }

        updateState(context, { playlist: JSON.parse(result) })
    }

    useEffect(() => {
        if (!playlist.length) {
            renderPlayList()
        }
    }, [])

    const handleBannerPress = async (playlist) => {


        if (addToPlaylist) {
            const result = await AsyncStorage.getItem("playList")

            let oldList = []
            let updatedList = []
            let sameAudio = false

            if (result !== null) {
                oldList = JSON.parse(result)

                updatedList = oldList.filter(list => {
                    if (list.codigo === playlist.codigo) {
                        // checar se o audio ja esta na lista ou não
                        for (let audio of list.audios) {
                            if (audio.codigo === addToPlaylist.codigo) {
                                // mensagem de alerta
                                sameAudio = true
                                return
                            }
                        }
                        //caso não tenha o audio
                        list.audios = [...list.audios, addToPlaylist]
                    }
                    return list
                })
            }
            if (sameAudio) {
                Alert.alert("Audio já adicionado!!")
                sameAudio = false

                return updateState(context, { addToPlaylist: null })
            }
            updateState(context, { addToPlaylist: null, playlist: [...updatedList] })
            return AsyncStorage.setItem("playList", JSON.stringify([...updatedList]))
        }
        // se não tiver nenhum audio selecionado, abra a lista
        selectedPlaylist = playlist
        setShowPlaylist(true)
    }

    return (
        <>
            <ScrollView style={styles.container}>
                {playlist.length ? playlist.map(item =>
                    <TouchableOpacity key={item.codigo.toString()}
                        style={styles.PlayListBanner}
                        onPress={() => handleBannerPress(item)}>
                        <Text>{item.titulo}</Text>
                        <Text style={styles.audioCount}>
                            {item.audios.length > 1
                                ? "${item.audios.length} Músicas"
                                : "${item.audios.length} Música"}</Text>
                    </TouchableOpacity>) : null}

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.PlayListBtn}>+ Adicionar nova Playlist</Text>
                </TouchableOpacity>

                <PlaylistModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={(playlistName => console.log(playlistName))} />
            </ScrollView>

            <PlaylistDetail visible={showPlaylist} playlist={selectedPlaylist} 
            onClose={() => setShowPlaylist(false)}/>
        </>
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
        marginBottom: 15,
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