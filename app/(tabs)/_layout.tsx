import { COLORS } from '@/asset/color';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="User"
                options={{
                    title: 'User',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                    headerShown: false,



                }}
            //<FontAwesome name="user" size={24} color="black" />
            />
            <Tabs.Screen
                name="Other"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="newspaper-o" color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Setting"
                options={{
                    title: 'Setting',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
