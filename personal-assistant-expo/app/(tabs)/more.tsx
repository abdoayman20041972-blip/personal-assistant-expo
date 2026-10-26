import { SymbolView } from 'expo-symbols';
import { useColorScheme, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';

const rows=[
 ['mail','الخدمات','Gmail والتقويم والخدمات الخارجية','/services'],
 ['settings','الإعدادات','كل تفضيلات التطبيق في مكان واحد','/settings'],
 ['info','حول التطبيق','الإصدار والخصوصية ومبادئ التطبيق','/about'],
] as const;

export default function MoreScreen(){
 const c=theme[useColorScheme()==='dark'?'dark':'light']; const router=useRouter();
 return <View style={[s.root,{backgroundColor:c.background}]}>
  <ScrollView contentContainerStyle={s.content}>
   <Text style={[s.title,{color:c.text}]}>المزيد</Text>
   <Text style={[s.sub,{color:c.muted}]}>الأقسام الثانوية التي لا تحتاج إلى تبويب مستقل</Text>
   <View style={s.group}>{rows.map(([icon,title,desc,route])=><Pressable key={title} onPress={()=>router.push(route)} style={[s.row,{backgroundColor:c.card,borderColor:c.border}]}>
    <View style={[s.icon,{backgroundColor:c.tintSoft}]}><SymbolView name={{android:icon as any,ios:'gear',web:'menu'}} tintColor={c.tint} size={22}/></View>
    <View style={s.copy}><Text style={[s.rowTitle,{color:c.text}]}>{title}</Text><Text style={[s.desc,{color:c.muted}]}>{desc}</Text></View>
    <SymbolView name={{android:'chevron_left',ios:'chevron.left',web:'chevron_left'}} tintColor={c.muted} size={20}/>
   </Pressable>)}</View>
   <View style={[s.about,{backgroundColor:c.card,borderColor:c.border}]}>
    <Text style={[s.aboutTitle,{color:c.text}]}>Personal Assistant</Text>
    <Text style={[s.desc,{color:c.muted}]}>أدوات، ملاحظات، وخزنة آمنة — في مساحة شخصية واحدة.</Text>
    <Text style={[s.version,{color:c.muted}]}>الإصدار 0.1.0</Text>
   </View>
  </ScrollView>
 </View>
}
const s=StyleSheet.create({root:{flex:1},content:{padding:20,paddingBottom:30},title:{fontSize:28,fontWeight:'800',textAlign:'right'},sub:{fontSize:14,marginTop:5,textAlign:'right'},group:{marginTop:22},row:{minHeight:78,borderWidth:1,borderRadius:17,padding:12,flexDirection:'row-reverse',alignItems:'center',marginBottom:10},icon:{width:44,height:44,borderRadius:13,alignItems:'center',justifyContent:'center'},copy:{flex:1,marginHorizontal:12},rowTitle:{fontSize:15,fontWeight:'800',textAlign:'right'},desc:{fontSize:12,lineHeight:18,marginTop:3,textAlign:'right'},about:{borderWidth:1,borderRadius:18,padding:17,marginTop:7},aboutTitle:{fontSize:16,fontWeight:'800',textAlign:'right'},version:{fontSize:11,marginTop:10,textAlign:'right'}});
