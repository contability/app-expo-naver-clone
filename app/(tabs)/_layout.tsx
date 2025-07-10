import { Tabs } from 'expo-router';

// tabs안에 어떤 스크린들이 있는지 정의.
const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="shopping" />
    </Tabs>
  );
};

export default TabLayout;
