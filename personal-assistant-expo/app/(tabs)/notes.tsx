import { SymbolView } from 'expo-symbols';
import { useColorScheme, ScrollView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import { theme } from '@/constants/theme';

type Note = { id:number; title:string; body:string; };

export default function NotesScreen(){
  const c=theme[useColorScheme()==='dark'?'dark':'light'];
  const [notes,setNotes]=useState<Note[]>([]);
  const [draft,setDraft]=useState('');
  const [adding,setAdding]=useState(false);

  const addNote=()=>{
    const value=draft.trim();
    if(!value)return;
    setNotes((current)=>[{id:Date.now(),title:value.split('\n')[0].slice(0,48),body:value},...current]);
    setDraft('');
    setAdding(false);
  };

  return <View style={[s.root,{backgroundColor:c.background}]}>
    <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.head}>
        <View><Text style={[s.title,{color:c.text}]}>الملاحظات</Text><Text style={[s.sub,{color:c.muted}]}>أفكارك وقوائمك وملاحظاتك السريعة.</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel="إضافة ملاحظة جديدة" onPress={()=>setAdding(true)} style={[s.add,{backgroundColor:c.tint}]}><Text style={s.plus}>＋</Text></Pressable>
      </View>

      {adding && <View style={[s.editor,{backgroundColor:c.card,borderColor:c.border}]}>
        <Text style={[s.editorTitle,{color:c.text}]}>ملاحظة جديدة</Text>
        <TextInput autoFocus multiline value={draft} onChangeText={setDraft} placeholder="اكتب ملاحظتك..." placeholderTextColor={c.muted} style={[s.textarea,{color:c.text,borderColor:c.border}]} />
        <View style={s.actions}>
          <Pressable accessibilityRole="button" accessibilityLabel="إلغاء الملاحظة الجديدة" onPress={()=>{setAdding(false);setDraft('')}}><Text style={[s.cancel,{color:c.muted}]}>إلغاء</Text></Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="حفظ الملاحظة" onPress={addNote} style={[s.save,{backgroundColor:c.tint}]}><Text style={s.saveText}>حفظ</Text></Pressable>
        </View>
      </View>}

      {notes.length===0 && !adding && <View style={[s.empty,{backgroundColor:c.card,borderColor:c.border}]}>
        <View style={[s.icon,{backgroundColor:c.tintSoft}]}><SymbolView name={{android:'edit_note',ios:'note.text',web:'edit'}} tintColor={c.tint} size={28}/></View>
        <Text style={[s.emptyTitle,{color:c.text}]}>ابدأ أول ملاحظة</Text>
        <Text style={[s.emptyText,{color:c.muted}]}>أنشئ ملاحظة سريعة الآن. التخزين الدائم سيأتي مع طبقة البيانات المحلية.</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="إنشاء ملاحظة جديدة" onPress={()=>setAdding(true)} style={[s.cta,{backgroundColor:c.tint}]}><Text style={s.ctaText}>ملاحظة جديدة</Text></Pressable>
      </View>}

      {notes.map((note)=><View key={note.id} style={[s.note,{backgroundColor:c.card,borderColor:c.border}]}>
        <Text style={[s.noteTitle,{color:c.text}]}>{note.title}</Text>
        <Text style={[s.noteBody,{color:c.muted}]} numberOfLines={3}>{note.body}</Text>
      </View>)}
    </ScrollView>
  </View>
}
const s=StyleSheet.create({
 root:{flex:1},content:{padding:20,paddingBottom:30},head:{flexDirection:'row-reverse',justifyContent:'space-between',alignItems:'center',marginBottom:22},
 title:{fontSize:28,fontWeight:'800',textAlign:'right'},sub:{fontSize:14,marginTop:5,textAlign:'right'},add:{width:46,height:46,borderRadius:15,alignItems:'center',justifyContent:'center'},plus:{color:'#fff',fontSize:28,lineHeight:30},
 editor:{borderWidth:1,borderRadius:18,padding:15,marginBottom:14},editorTitle:{fontSize:16,fontWeight:'800',textAlign:'right',marginBottom:10},textarea:{minHeight:120,borderWidth:1,borderRadius:13,padding:12,fontSize:14,textAlign:'right',writingDirection:'rtl',textAlignVertical:'top'},actions:{flexDirection:'row-reverse',justifyContent:'flex-start',alignItems:'center',gap:18,marginTop:12},cancel:{fontSize:13,fontWeight:'700'},save:{paddingHorizontal:20,paddingVertical:10,borderRadius:12},saveText:{color:'#fff',fontWeight:'800'},
 empty:{borderWidth:1,borderRadius:20,padding:28,alignItems:'center',marginTop:35},icon:{width:58,height:58,borderRadius:18,alignItems:'center',justifyContent:'center',marginBottom:15},emptyTitle:{fontSize:18,fontWeight:'800'},emptyText:{fontSize:13,lineHeight:21,textAlign:'center',marginTop:7},cta:{marginTop:18,paddingHorizontal:20,paddingVertical:11,borderRadius:12},ctaText:{color:'#fff',fontWeight:'800'},
 note:{borderWidth:1,borderRadius:17,padding:16,marginBottom:10},noteTitle:{fontSize:16,fontWeight:'800',textAlign:'right'},noteBody:{fontSize:13,lineHeight:21,textAlign:'right',marginTop:6}
});