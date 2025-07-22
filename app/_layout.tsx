import { Stack } from 'expo-router/stack';
import LoginButton from './components/login-button';
import { WebViewProvider } from './components/webview-provider';

//MEMO: 앱 전체적으로 어떤 스크린들이 있는지 정의.
const Layout = () => {
  return (
    <WebViewProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            //MEMO: 페이지 상단 헤더 제거
            // headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerRight: LoginButton,
          }}
        />
        <Stack.Screen
          name="browser"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
          }}
        />
      </Stack>
    </WebViewProvider>
  );
};

export default Layout;
