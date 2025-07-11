import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const HomeIcon = ({ focused, color }: { focused: boolean; color: string }) => {
  const iconName = focused ? 'home' : 'home-outline';
  return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
};

const ShoppingIcon = ({ focused, color }: { focused: boolean; color: string }) => {
  const iconName = focused ? 'shopping' : 'shopping-outline';
  return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
};

//MEMO: tabs안에 어떤 스크린들이 있는지 정의.
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          //MEMO: 탭 배경 색상
          backgroundColor: 'black',
        },
        //MEMO: Active 상태의 탭 색상
        tabBarActiveTintColor: 'white',
        //MEMO: Inactive 상태의 탭 색상
        tabBarInactiveTintColor: 'white',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          //MEMO: 탭 레이블
          tabBarLabel: '홈',
          //MEMO: 상위 Tab에서 정의한 focused, color, size 파라미터가 전달됨.
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          //MEMO: 탭 레이블
          tabBarLabel: '쇼핑',
          tabBarIcon: ShoppingIcon,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
