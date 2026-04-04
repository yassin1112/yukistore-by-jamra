// منتجات Blox Fruits
// الصيغة: { id: '1bf', name: 'اسم المنتج', image: 'رابط الصورة', price: السعر, featured: true/false, features: ['ميزة 1', 'ميزة 2'] }
// لإضافة منتج جديد: انسخ سطر وأضف منتجك
const bloxFruitsProducts = [
    { 
        id: '1bf', 
        name: 'دبل مساحة', 
        image: 'https://tse4.mm.bing.net/th/id/OIP.Ev0rQdfNLQOZ8nJpb7C4LAAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', 
        price: 5000, 
        features: [
            '✅ فاكهة نادرة'
        ] 
    },
    { 
        id: '2bf', 
        name: 'دبل ماستري', 
        image: 'https://tse1.mm.bing.net/th/id/OIP.wUdUYAaJtr0oeoP7QU1fZQHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', 
        price: 5000, 
        featured: true, 
        features: [
            '',
            ''
        ] 
    },
    { 
        id: '3bf', 
        name: ' دبل فلوس', 
        image: 'https://tse1.mm.bing.net/th/id/OIP.Gp1zLQneSPFMibmVLbT47wAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', 
        price: 5000, 
        features: [
            
        ] 
    },
    { 
        id: '4bf', 
        name: 'دارك بليد', 
        image: 'https://tse4.mm.bing.net/th/id/OIP.5dxiqA0YiI6urwU_h1RIkAAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', 
        price: 15000, 
        features: [
            '',
            '',
            '',
            '',
            '',
            '✅ '
        ] 
    },
    { 
        id: '5bf', 
        name: 'كاشف فواكه', 
        image: 'https://tse4.mm.bing.net/th/id/OIP.2Qf3NSlAOiFHBVK5qi228AAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', 
        price: 30000, 
        features: [
            '',
            '',
            '',
            '',
            '',
            '✅ '
        ] 
    },

    // بيرمات Blox Fruits (السعر: الرقم × 1000 دينار)
    { id: '6bf', name: '🐲 تنين إيست ويست بيرم', image: 'https://tse3.mm.bing.net/th/id/OIP.ZEXxYyRgBTjDfpwhaAiRGgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 50000, featured: true, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '7bf', name: '🐱 كيتسوني بيرم', image: 'https://tse4.mm.bing.net/th/id/OIP.BEY_nlK4-Zih8ftKhnSs3wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 40000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '8bf', name: '🐆 فهد بيرم', image: 'https://tse2.mm.bing.net/th/id/OIP.tRTq_wpz_xI7XUNZEMoLfAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', price: 30000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '9bf', name: 'يتي بيرم', image: 'https://tse4.mm.bing.net/th/id/OIP.qcN8vu-o0PEq7yTDMPRUgwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 30000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '10bf', name: '🦁 سبريت بيرم', image: 'https://tse4.mm.bing.net/th/id/OIP._8w-SzGmVrD7cdklxhFlawHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 25000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '11bf', name: '🛝 كونترول بيرم', image: 'https://tse3.mm.bing.net/th/id/OIP.wkZLw2AJ9LEdsYxRgK3YqwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 40000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '12bf', name: 'غاز بيرم', image: 'https://tse1.mm.bing.net/th/id/OIP.KjCbu2_0Q-3_4fFpttNlMAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 25000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '13bf', name: '☠ فينوم بيرم', image: 'https://cdn-offer-photos.zeusx.com/eb18a8e4-0168-4751-8043-24dab76b7af5.jpg', price: 25000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '14bf', name: '⚫️ شادو بيرم', image: 'https://th.bing.com/th/id/OIP.g_9K-BAuPWRowm5cMHYeDAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', price: 25000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '15bf', name: '🥖 موتشي بيرم', image: 'https://tse2.mm.bing.net/th/id/OIP.RyKHVY02yQCkk-m_Fw3XiQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 25000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '16bf', name: '🍊 تريك1س بيرم', image: 'https://tse3.mm.bing.net/th/id/OIP.HsKQJmtfcH-Xvk8QrPYCGQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 25000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '17bf', name: '🐘 ماموث بيرم', image: 'https://production-gameflipusercontent.fingershock.com/us-east-1:13590915-a6cf-46cb-919c-3e5825a34404/a75bbee8-fe8e-4861-a3cd-1ab712508e04/9e99c294-e0b0-47fe-992f-e3c41be2f3ec', price: 25000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '18bf', name: '🗻 جرافيتي بيرم', image: 'https://tse1.mm.bing.net/th/id/OIP.vbcrInoDwIIv4yjc9DHsKwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', price: 23000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '19bf', name: '❄️ بليزرد بيرم', image: 'https://tse3.mm.bing.net/th/id/OIP.g-gR7ihMkHR5rO8gDyPouAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 22000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '20bf', name: '🐾 باو بيرم', image: 'https://tse3.mm.bing.net/th/id/OIP.3M9AOZX1h-baQ2PkNwwsjgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', price: 22000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '21bf', name: '⛈ برق بيرم', image: 'https://tse4.mm.bing.net/th/id/OIP.Z0aIEPlBub3CGJafkgn5_gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 21000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '22bf', name: '🪄 بورتال بيرم', image: 'https://th.bing.com/th/id/OIP.7axAhR72Py5R3RcVUNluUAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', price: 20000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '23bf', name: '🕊 عنقاء بيرم', image: 'https://tse3.mm.bing.net/th/id/OIP.MQWjzHJ4k9pXlYjUHiPJcwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', price: 20000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '24bf', name: '🎼 صوت بيرم', image: 'https://tse2.mm.bing.net/th/id/OIP.YSk5ZUBdOoRlIi2jvmiFEgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 19000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '25bf', name: '🕷 سبايدر بيرم', image: 'https://tse4.mm.bing.net/th/id/OIP.LC3DDfPPBrsS1tGXCNlvQgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', price: 18000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '26bf', name: '🧘 بوذا بيرم', image: 'https://th.bing.com/th/id/OIP.YM_PWw4X0A0CYye3pPacOgAAAA?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', price: 17000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '27bf', name: '🌋 ماجما بيرم', image: 'https://th.bing.com/th/id/OIP.OjIAsR7fXgN68vb2176lrAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', price: 13000, features: ['✅ بيرم', '✅ Blox Fruits'] },
    { id: '28bf', name: '🎃 لايت بيرم', image: 'https://tse1.mm.bing.net/th/id/OIP.wg0uPKwneuKseRYxMIN5DQHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', price: 12000, features: ['✅ بيرم', '✅ Blox Fruits'] }
];
