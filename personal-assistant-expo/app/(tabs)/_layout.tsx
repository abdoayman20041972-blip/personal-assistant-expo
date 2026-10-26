import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { theme } from '@/constants/theme';

export default function TabLayout() {
  const c=theme[useColorScheme()==='dark'?'dark':'light'];
  return <Tabs screenOptions={{
    headerShown:false,
    tabBarActiveTintColor:c.tint,
    tabBarInactiveTintColor:c.muted,
    tabBarStyle:{height:72,paddingTop:8,paddingBottom:10,backgroundColor:c.card,borderTopColor:c.border,elevation:0},
    tabBarLabelStyle:{fontSize:11,fontWeight:'600'},
  }}>
    <Tabs.Screen name="index" options={{title:'الرئيسية',tabBarAccessibilityLabel:'الرئيسية',tabBarIcon:({color})=><SymbolView name={{android:'home',ios:'house.fill',web:'home'}} tintColor={color} size={24}/>}}/>
    <Tabs.Screen name="tools" options={{title:'الأدوات',tabBarAccessibilityLabel:'الأدوات',tabBarIcon:({color})=><SymbolView name={{android:'build',ios:'wrench.and.screwdriver.fill',web:'build'}} tintColor={color} size={24}/>}}/>
    <Tabs.Screen name="notes" options={{title:'الملاحظات',tabBarAccessibilityLabel:'الملاحظات',tabBarIcon:({color})=><SymbolView name={{android:'edit_note',ios:'note.text',web:'edit'}} tintColor={color} size={24}/>}}/>
    <Tabs.Screen name="vault" options={{title:'الخزنة الآمنة',tabBarAccessibilityLabel:'الخزنة الآمنة',tabBarIcon:({color})=><SymbolView name={{android:'lock',ios:'lock.fill',web:'lock'}} tintColor={color} size={24}/>}}/>
    <Tabs.Screen name="more" options={{title:'المزيد',tabBarAccessibilityLabel:'المزيد',tabBarIcon:({color})=><SymbolView name={{android:'more_horiz',ios:'ellipsis.circle.fill',web:'more_horiz'}} tintColor={color} size={24}/>}}/>
  </Tabs>;
}
