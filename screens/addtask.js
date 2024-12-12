import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ref, set, onValue } from 'firebase/database';
import { auth, realtimedb } from '../firebaseConfig';
import Toast from 'react-native-toast-message';
import bed from '../assets/pictures/image (3) 1.png';
import dishes from '../assets/pictures/image (5) 1.png';
import pet from '../assets/pictures/image (6) 1.png';
import dohomework from '../assets/pictures/image (4) 1.png';
import read from '../assets/pictures/image (7) 1.png';
import bath from '../assets/pictures/image (8) 1.png';
import brush from '../assets/pictures/image (9) 1.png';
import home from '../assets/pictures/home.png';
import task from '../assets/pictures/task.png';
import logout from '../assets/pictures/logout.png';

export default function Task() {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);

    const [loaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                navigation.navigate('Signin');
            }
        });

        return () => unsubscribeAuth();
    }, [navigation]);

    if (!loaded) {
        return null;
    }

    const chores = [
        { id: 1, image: bed, task: "Make your bed", reward: 5 },
        { id: 2, image: dishes, task: "Wash the Dishes", reward: 20 },
        { id: 3, image: pet, task: "Feed the Pet", reward: 15 },
    ];

    const homework = [
        { id: 4, image: dohomework, task: "Do the homework", reward: 5 },
        { id: 5, image: read, task: "Read for 20 minutes", reward: 20 },
    ];

    const hygiene = [
        { id: 6, image: bath, task: "Take a Bath", reward: 20 },
        { id: 7, image: brush, task: "Brush your Teeth", reward: 20 },
    ];

    const handleTaskClick = (id, task, reward) => {
        if (!userId) return;

        const taskRef = ref(realtimedb, `users/${userId}/tasks/${id}`);

        onValue(taskRef, (snapshot) => {
            const taskData = snapshot.val();
            const currentTime = Date.now();

            if (taskData?.completed && currentTime - taskData.timestamp < 86400000) {
                Toast.show({
                    type: 'info',
                    text1: 'Task already completed',
                    text2: 'You can complete this task again tomorrow!',
                });
                return;
            }

            set(taskRef, {
                task,
                reward,
                completed: true,
                timestamp: currentTime,
            })
                .then(() => {
                    const savingsRef = ref(realtimedb, `users/${userId}/savings`);

                    onValue(
                        savingsRef,
                        (snapshot) => {
                            const currentSavings = snapshot.val() || 0;
                            set(savingsRef, currentSavings + reward);
                        },
                        { onlyOnce: true }
                    );

                    Toast.show({
                        type: 'success',
                        text1: 'Task Completed!',
                        text2: `You've earned ₱${reward.toFixed(2)}`,
                    });
                })
                .catch((error) => {
                    console.error("Error saving task to database:", error);

                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Could not complete the task. Try again.',
                    });
                });
        }, { onlyOnce: true });
    };

    return (
        <View style={{ backgroundColor: '#CBE3C1', flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Motivate Stephanie to Save Coins!</Text>
            </View>

            <ScrollView contentContainerStyle={styles.taskContainer}>
                <Text style={styles.taskHeader}>Chore Tasks</Text>
                {chores.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        image={task.image}
                        task={task.task}
                        reward={task.reward}
                        onTaskClick={handleTaskClick}
                    />
                ))}

                <Text style={styles.taskHeader}>Homework and School Tasks</Text>
                {homework.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        image={task.image}
                        task={task.task}
                        reward={task.reward}
                        onTaskClick={handleTaskClick}
                    />
                ))}

                <Text style={styles.taskHeader}>Personal Hygiene Tasks</Text>
                {hygiene.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        image={task.image}
                        task={task.task}
                        reward={task.reward}
                        onTaskClick={handleTaskClick}
                    />
                ))}
            </ScrollView>

            <View style={styles.navbar}>
                <View style={styles.navbarItem}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.navbarButton}>
                        <Image source={home} style={styles.navbarButtonImage} />
                        <Text style={styles.navbarText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Task')} style={styles.navbarButton}>
                        <Image source={task} style={styles.navbarButtonImage} />
                        <Text style={styles.navbarText}>Tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={styles.navbarButton}>
                        <Image source={logout} style={styles.navbarButtonImage} />
                        <Text style={styles.navbarText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Toast />
        </View>
    );
}

const TaskItem = ({ id, image, task, reward, onTaskClick }) => {
    return (
        <TouchableOpacity onPress={() => onTaskClick(id, task, reward)}>
            <View style={styles.taskItem}>
                <Image source={image} style={styles.taskImage} />
                <View style={styles.taskDetails}>
                    <Text style={styles.taskText}>{task}</Text>
                    <Text style={styles.rewardText}>+₱{reward.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 40,
        marginBottom: 10,
        paddingHorizontal: 20,
        height: 250,
        alignItems: 'center',
        backgroundColor: '#E2B82D',
    },
    greeting: {
        fontFamily: 'Poppins-Black',
        fontSize: 30,
        top: 50,
        color: '#fff',
        textAlign: 'center',

    },
    savingsContainer: {
        paddingHorizontal: 20,
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '80%',
        height: 150,
        marginLeft: 40,
        borderRadius: 15,
        marginBottom: 20,
    },
    savingsLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#FFA000',
        marginRight: 200,
        marginTop: 10,
    },
    savings: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    savingsAmount: {
        fontFamily: 'Poppins-Bold',
        fontSize: 45,
        color: '#499336',
        marginRight: 10,
    },
    savingpiggy: {
        marginTop: -50,
        resizeMode: 'contain',
    },
    taskContainer: {
        paddingHorizontal: 50,
        paddingBottom: 180,
    },
    taskHeader: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#5A5A5A',
        marginBottom: 5,
        marginTop: 20,
    },
    taskItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskImage: {
        width: 50,
        height: 50,
        marginRight: 15,
        marginLeft: 10,
        resizeMode: 'contain',
        backgroundColor: '#CACACA',
        borderColor: '#FFC60B',
        borderWidth: 3,
        borderRadius: 50,
    },
    taskDetails: {
        flex: 1,
        marginLeft: 10,
    },
    taskText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#915FD4',
        marginBottom: -5,
    },
    rewardText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#F59E0B',
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',  
        paddingVertical: 30,
        backgroundColor: '#CBE3C1',
    },
    navbarItem: {
        flexDirection: 'row',
        marginLeft: 85,
        alignItems: 'center',
        width: '60%',
        height: 65,
        gap: -10,
        backgroundColor: '#fff',
        borderRadius: 50,
        bottom: 10,
        borderColor: '#FFA000',
        borderWidth: 4,
    },
    navbarButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 100, // Dagdagan ang height ng button
    },
    
    navbarButtonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

    navbarText: {
        fontFamily: 'Poppins-Regular',
        fontSize:12,
        color: '#FFA000',
        textAlign: 'center',
    },
});
