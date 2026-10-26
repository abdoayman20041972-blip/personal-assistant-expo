import { SymbolView } from 'expo-symbols';
import { useColorScheme, StyleSheet, Text, View, Pressable } from 'react-native';
import { theme } from '@/constants/theme';

export default function VaultScreen(){
  const c=theme[useColorScheme()==='dark'?'dark':'light'];
  return <View style={[s.root,{backgroundColor:c.background}]}>
    <View style={s.content}>
      <View style={[s.lock,{backgroundColor:c.tintSoft}]}><SymbolView name={{android:'lock',ios:'lock.fill',web:'lock'}} tintColor={c.tint} size={34}/></View>
      <Text style={[s.title,{color:c.text}]}>الخزنة الآمنة</Text>
      <Text style={[s.sub,{color:c.muted}]}>مساحة منفصلة لبياناتك الحساسة: كلمات المرور، شبكات Wi‑Fi، المفاتيح والملاحظات السرية.</Text>
      <View style={[s.boundary,{backgroundColor:c.card,borderColor:c.border}]}>
        {['بيانات دخول','شبكات Wi‑Fi','ملاحظات سرية'].map((item)=><View key={item} style={s.item}><SymbolView name={{android:'check_circle',ios:'checkmark.circle.fill',web:'check_circle'}} tintColor={c.tint} size={19}/><Text style={[s.itemText,{color:c.text}]}>{item}</Text></View>)}
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="فتح الخزنة الآمنة" style={[s.button,{backgroundColor:c.tint}]}><Text style={s.buttonText}>فتح الخزنة</Text></Pressable>
      <Text style={[s.note,{color:c.muted}]}>الأمان الفعلي سيعتمد على التخزين الآمن والتشفير ورمز PIN والبصمة قبل تخزين أي سر.</Text>
    </View>
  </View>
}
const s=StyleSheet.create({root:{flex:1},content:{padding:25,alignItems:'center',justifyContent:'center',flex:1},lock:{width:82,height:82,borderRadius:26,alignItems:'center',justifyContent:'center',marginBottom:20},title:{fontSize:27,fontWeight:'800'},sub:{fontSize:14,lineHeight:23,textAlign:'center',writingDirection:'rtl',marginTop:10,maxWidth:340},boundary:{width:'100%',borderWidth:1,borderRadius:18,padding:15,marginTop:22},item:{flexDirection:'row',alignItems:'center',marginVertical:6,justifyContent:'flex-end'},itemText:{fontSize:13,marginRight:9,fontWeight:'600'},button:{marginTop:22,paddingHorizontal:34,paddingVertical:15,borderRadius:15},buttonText:{color:'#fff',fontSize:15,fontWeight:'800'},note:{fontSize:11.5,textAlign:'center',marginTop:15,lineHeight:18}});