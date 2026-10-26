export type Tool = {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  keywords: string[];
};

export const tools: Tool[] = [
  { id:'discount', category:'الحساب والمال', title:'النسبة والخصم', description:'احسب قيمة الخصم والسعر النهائي بسرعة', icon:'percent', keywords:['خصم','نسبة','سعر','حساب'] },
  { id:'unit-converter', category:'التحويلات', title:'تحويل الوحدات', description:'حوّل الوزن والطول والحجم ودرجة الحرارة', icon:'swap_horiz', keywords:['كيلو','رطل','متر','قدم','كم','ميل','سم','بوصة','درجة','لتر','جالون','تحويل'] },
  { id:'age', category:'التاريخ والوقت', title:'العمر والتواريخ', description:'احسب العمر من تاريخ الميلاد حتى تاريخ محدد', icon:'calendar_month', keywords:['العمر','تاريخ','سن','ميلاد','يوم'] },
  { id:'text-tools', category:'النصوص', title:'أدوات النص', description:'عدّ النص ونظّفه وحوّل حالة الأحرف', icon:'text_fields', keywords:['نص','كلمات','حروف','تنظيف','أحرف كبيرة','أحرف صغيرة'] },
  { id:'scientific', category:'العلوم', title:'الحسابات العلمية', description:'احسب المولارية والكثافة ودرجة الحموضة pH', icon:'science', keywords:['مولارية','كثافة','كتلة','حجم','تركيز','ph'] },
  { id:'room-area', category:'المنزل', title:'مساحة الغرفة', description:'احسب المساحة والمحيط واحتياجات الأرضيات', icon:'home', keywords:['غرفة','مساحة','أرضية','متر مربع'] },
  { id:'fuel', category:'السيارات والسفر', title:'تكلفة الرحلة', description:'استهلاك الوقود وتكلفة الرحلة لكل شخص', icon:'directions_car', keywords:['بنزين','وقود','رحلة','سيارة'] },
  { id:'random', category:'عشوائي', title:'اختيار عشوائي', description:'رقم أو عنصر أو فريق بشكل عشوائي', icon:'casino', keywords:['عشوائي','قرعة','اختيار','رقم'] },
];

export const categories = [...new Set(tools.map((tool) => tool.category))];
