import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCallback, useEffect, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import useLogin from '../../hooks/use-login';

const LoginButton = () => {
  const { isLoggedIn, loadLoggedIn, logout } = useLogin();
  const iconName = isLoggedIn ? 'logout' : 'login';

  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(() => {
    console.log('🚀 ~ LoginButton ~ isLoggedIn:', isLoggedIn);
    // 스크린에 보여지고 있을 때 isFocused를 true로 변경
    setIsFocused(true);
    // 스크린에 안보일 땐 isFocused를 false로 변경
    return () => {
      setIsFocused(false);
    };
  });

  useEffect(() => {
    if (isFocused) {
      loadLoggedIn();
    }
  }, [isFocused, loadLoggedIn]);

  const handlePressLogin = useCallback(() => {
    router.navigate({
      pathname: 'login',
    });
  }, []);

  const handlePressLogout = useCallback(() => {
    logout();
  }, [logout]);
  return (
    <TouchableOpacity onPress={isLoggedIn ? handlePressLogout : handlePressLogin}>
      <MaterialCommunityIcons name={iconName} size={24} color="white" />
    </TouchableOpacity>
  );
};

export default LoginButton;
