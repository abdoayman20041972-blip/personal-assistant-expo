import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';
import { useColorScheme, ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useMemo, useState } from 'react';
import { tools } from '@/data/tools';
import { theme } from '@/constants/theme';

export default function SearchScreen(){
  const c=theme[useColorScheme()==='dark'?'dark':'light'];
  const router=useRouter();
  const [query,setQuery]=useState('');
  const results=useMemo(()=>{const q=query.trim().toLowerCase(); if(!q)return []; return tools.filter(t=>[t.title,t.description,t.category,...t.keywords].some(v=>v.toLowerCase().includes(q))).slice(0,8)},[query]);
  return <View style={[s.root,{backgroundColor:c.background}]}>
    <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <View style={s.top}><Text style={[s.title,{color:c.text}]}>البحث</Text></View>
      <View style={[s.search,{backgroundColor:c.card,borderColor:c.border}]}>
        <SymbolView name={{android:'search',ios:'magnifyingglass',web:'search'}} tintColor={c.muted} size={21}/>
        <TextInput accessibilityLabel="البحث عن أداة أو ملاحظة" autoFocus value={query} onChangeText={setQuery} placeholder="ماذا تريد أن تفعل؟" placeholderTextColor={c.muted} style={[s.input,{color:c.text}]}/>
      </View>
      {!query.trim() && <View style={s.hint}><Text style={[s.hintTitle,{color:c.text}]}>جرّب البحث بلغة طبيعية</Text><Text style={[s.hintText,{color:c.muted}]}>«خصم 20%» • «تحويل كيلو إلى رطل» • «العمر»</Text></View>}
      {results.map(t=><Pressable key={t.id} onPress={()=>router.push(`/tool/${t.id}`)} style={[s.row,{backgroundColor:c.card,borderColor:c.border}]}>
        <View style={[s.icon,{backgroundColor:c.tintSoft}]}><SymbolView name={{android:t.icon as any,ios:'function',web:'function'}} tintColor={c.tint} size={21}/></View>
        <View style={s.copy}><Text style={[s.name,{color:c.text}]}>{t.title}</Text><Text style={[s.desc,{color:c.muted}]}>{t.category} • {t.description}</Text></View>
        <SymbolView name={{android:'chevron_left',ios:'chevron.left',web:'chevron_left'}} tintColor={c.muted} size={19}/>
      </Pressable>)}
      {!!query.trim() && !results.length && <View style={[s.empty,{backgroundColor:c.card,borderColor:c.border}]}><Text style={[s.emptyTitle,{color:c.text}]}>لا توجد نتائج</Text><Text style={[s.desc,{color:c.muted}]}>جرّب اسم الأداة أو كلمة أقصر.</Text></View>}
    </ScrollView>
  </View>
}
const s=StyleSheet.create({root:{flex:1},content:{padding:20,paddingBottom:30},top:{alignItems:'flex-end',marginBottom:18},title:{fontSize:25,fontWeight:'800'},search:{height:54,borderWidth:1,borderRadius:16,flexDirection:'row-reverse',alignItems:'center',paddingHorizontal:14},input:{flex:1,fontSize:15,marginLeft:9,textAlign:'right',writingDirection:'rtl'},hint:{alignItems:'flex-end',marginTop:28},hintTitle:{fontSize:16,fontWeight:'800'},hintText:{fontSize:12,marginTop:7,textAlign:'right'},row:{minHeight:76,borderWidth:1,borderRadius:16,flexDirection:'row-reverse',alignItems:'center',padding:12,marginTop:10},icon:{width:44,height:44,borderRadius:13,alignItems:'center',justifyContent:'center'},copy:{flex:1,marginHorizontal:11},name:{fontSize:15,fontWeight:'800',textAlign:'right'},desc:{fontSize:11.5,lineHeight:18,textAlign:'right',writingDirection:'rtl',marginTop:3},empty:{borderWidth:1,borderRadius:18,padding:24,alignItems:'center',marginTop:20},emptyTitle:{fontSize:16,fontWeight:'800',marginBottom:5}});
