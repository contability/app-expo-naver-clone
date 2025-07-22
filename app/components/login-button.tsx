import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCallback } from 'react';
import { router } from 'expo-router';

const LoginButton = () => {
  const isLoggedIn = false;
  const iconName = isLoggedIn ? 'logout' : 'login';

  const handlePressLogin = useCallback(() => {
    console.log('here');

    router.navigate({
      pathname: 'login',
    });
  }, []);

  const handlePressLogout = useCallback(() => {}, []);
  return (
    <TouchableOpacity onPress={isLoggedIn ? handlePressLogout : handlePressLogin}>
      <MaterialCommunityIcons name={iconName} size={24} color="white" />
    </TouchableOpacity>
  );
};

export default LoginButton;
