import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationBar } from './Navbar';
import avatar from '../assets/images/avatar.png';
import reward from '../assets/images/reward.png';
import badge from '../assets/images/badge.png';
import linkedin from '../assets/images/linkedin.png';
import podium from '../assets/images/podium.png';
import github from '../assets/images/github.png';
import location from '../assets/images/location.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserPoints } from './database';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = React.useState('');
  const [points, setPoints] = React.useState(0);

  React.useEffect(() => {
    const getUserData = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name || '');
        // Fetch points from database
        const userPoints = await getUserPoints(parsedUser.id);
        setPoints(userPoints);
      }
    };
    getUserData();
  }, []);

  const handleNavigation = async (screen) => {
    if (screen === 'Logout') {
      await AsyncStorage.removeItem('user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else if (screen === 'Task') {
      navigation.navigate('Task', { initialTab: 'victorylap' });
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={avatar}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.institution}>Illinois Institute of Technology</Text>
          <View style={styles.iconsContainer}>
            <Image source={location} style={styles.icon} />
            <Image source={linkedin} style={styles.icon} />
            <Image source={github} style={styles.icon} />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Image source={reward} style={styles.rewardIcon} />
            <Text style={styles.statText}>{points}</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={badge} style={styles.badgeIcon} />
            <Text style={styles.statText}>2</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={podium} style={styles.statIcon} />
            <Text style={styles.statText}>6</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {[
            { name: 'All Completed Tasks', screen: 'Task' },
            { name: 'Rewards', screen: 'Rewards' },
            { name: 'Leaderboard', screen: 'Leaderboard' },
            { name: 'Notifications', screen: 'Notifications' },
            { name: 'Preferences & Settings', screen: 'Settings' },
            { name: 'Referral', screen: 'Referral' },
            { name: 'Logout', screen: 'Logout' }
          ].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => handleNavigation(item.screen)}
            >
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <NavigationBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 67,
    height: 66,
    borderRadius: 33.5,
    borderWidth: 2,
    borderColor: 'purple',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Acme',
    color: '#000000',
  },
  institution: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Acme',
    color: '#625555',
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    marginBottom: 20,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 45,
    resizeMode: 'contain',
  },
  rewardIcon: {
    width: 30,
    height: 45,
    resizeMode: 'contain',
  },
  badgeIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
    color: '#6a0dad',
  },
  navigationMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f3edf7ff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1d1b20ff',
    textAlign: 'center',
    lineHeight: 16,
  },
});
