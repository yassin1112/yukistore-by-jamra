# دليل إضافة المنتجات - النسخة البسيطة

## كيفية إضافة منتج جديد

### 1. افتح ملف المنتجات المناسب:
- `products/blox-fruits.js` - لمنتجات Blox Fruits (ID يبدأ بـ `bf`)
- `products/murder-mystery-2.js` - لمنتجات Murder Mystery 2 (ID يبدأ بـ `mm`)
- `products/adopt-me.js` - لمنتجات Adopt Me (ID يبدأ بـ `am`)

### 2. أضف منتج جديد في سطر واحد:

**لـ Blox Fruits:**
```javascript
{ id: '5bf', name: 'اسم المنتج', image: 'https://example.com/image.jpg', price: 20000, features: ['✅ ميزة 1', '✅ ميزة 2'] }
```

**لـ Murder Mystery 2:**
```javascript
{ id: '5mm', name: 'اسم المنتج', image: 'https://example.com/image.jpg', price: 20000, features: ['✅ ميزة 1', '✅ ميزة 2'] }
```

**لـ Adopt Me:**
```javascript
{ id: '5am', name: 'اسم المنتج', image: 'https://example.com/image.jpg', price: 20000, features: ['✅ ميزة 1', '✅ ميزة 2'] }
```

### 3. مثال كامل:

افتح `products/blox-fruits.js` وأضف في نهاية المصفوفة:

```javascript
const bloxFruitsProducts = [
    { id: '1bf', name: 'حزمة مبتدئ', image: '', price: 15000, features: ['✅ فاكهة نادرة', '✅ 100,000 Beli', '✅ مستوى 50'] },
    { id: '2bf', name: 'حزمة متوسطة', image: '', price: 30000, featured: true, features: ['✅ فاكهة أسطورية', '✅ 500,000 Beli', '✅ مستوى 150', '✅ سيف قوي'] },
    // أضف منتجك الجديد هنا:
    { id: '5bf', name: 'حزمة خاصة', image: 'https://i.imgur.com/example.jpg', price: 50000, features: ['✅ فاكهة نادرة جداً', '✅ 1,000,000 Beli', '✅ مستوى 300'] }
];
```

## نظام الـ ID:

- **Blox Fruits**: `1bf`, `2bf`, `3bf`, `4bf`, `5bf`... (الرقم + bf)
- **Murder Mystery 2**: `1mm`, `2mm`, `3mm`, `4mm`, `5mm`... (الرقم + mm)
- **Adopt Me**: `1am`, `2am`, `3am`, `4am`, `5am`... (الرقم + am)

## الحقول:

- **id**: معرف المنتج (مثل `5bf` أو `5mm` أو `5am`)
- **name**: اسم المنتج
- **image**: رابط الصورة (اتركه `''` إذا لم تكن لديك صورة)
- **price**: السعر بالدينار العراقي (رقم فقط)
- **featured**: `true` لجعل المنتج مميز (اختياري)
- **features**: قائمة المميزات (كل ميزة في سطر)

## ملاحظات:

1. **الصور**: ضع رابط الصورة في `image` أو اتركه `''` للاستخدام التلقائي
2. **السعر**: رقم فقط بدون علامات (مثل `20000` وليس `20,000`)
3. **المميزات**: استخدم ✅ في بداية كل ميزة
4. **المنتج المميز**: ضع `featured: true` لجعله يظهر كـ "الأكثر شعبية"

## مثال سريع:

```javascript
// منتج جديد لـ Blox Fruits
{ id: '5bf', name: 'حزمة جديدة', image: 'https://example.com/img.jpg', price: 25000, features: ['✅ ميزة 1', '✅ ميزة 2'] }
```

بعد الحفظ، سيظهر المنتج الجديد تلقائياً في الصفحة! 🎉
