import { Stack } from 'expo-router/stack';

// 앱 전체적으로 어떤 스크린들이 있는지 정의.
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          // 페이지 상단 헤더 제거
          headerShown: false,
        }}
      />
      <Stack.Screen name="browser" />
    </Stack>
  );
};

export default Layout;
