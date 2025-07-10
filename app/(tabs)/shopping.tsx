import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ShoppingScreen = () => {
  return (
    <View>
      <Text>Shopping</Text>
      <TouchableOpacity
        onPress={() => {
          router.navigate({
            pathname: 'browser',
          });
        }}
      >
        <Text>Go To Browser</Text>
      </TouchableOpacity>
      <MaterialCommunityIcons name="shopping" size={24} color="red" />
    </View>
  );
};

export default ShoppingScreen;
