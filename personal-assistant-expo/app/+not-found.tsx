import { Link } from 'expo-router';
import { useColorScheme, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

export default function NotFoundScreen() {
  const c=theme[useColorScheme()==='dark'?'dark':'light'];
  return <View style={[s.root,{backgroundColor:c.background}]}>
    <Text style={[s.code,{color:c.tint}]}>404</Text>
    <Text style={[s.title,{color:c.text}]}>الصفحة غير موجودة</Text>
    <Text style={[s.body,{color:c.muted}]}>يبدو أن هذا المسار غير متاح حاليًا.</Text>
    <Link href="/" style={[s.link,{color:c.tint}]}>العودة للرئيسية</Link>
  </View>;
}
const s=StyleSheet.create({root:{flex:1,alignItems:'center',justifyContent:'center',padding:28},code:{fontSize:48,fontWeight:'900'},title:{fontSize:22,fontWeight:'800',marginTop:8},body:{fontSize:14,textAlign:'center',marginTop:8},link:{fontSize:14,fontWeight:'800',marginTop:24}});
