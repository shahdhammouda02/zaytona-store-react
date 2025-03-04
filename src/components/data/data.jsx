import foodcategory from "../../assets/images/foodcategory.png";
import clothescategory from "../../assets/images/clothescategory.png";
import handcraftescategory from "../../assets/images/handcraftscategory.png";
import bookscategory from "../../assets/images/bookscategory.png";
import oliveoil from "../../assets/images/oliveoil.png";
import dress from "../../assets/images/dress.jpg";
import craft from "../../assets/images/craft.jpg";
import books from "../../assets/images/books.jpg";

export const categories = [
  {
    title: "المنتجات الغذائية",
    subcategories: ["المشروبات", "الاكل الفلسطيني", "الزيوت"],
    banner: foodcategory,
    items: [
      {
        id: 1,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "المشروبات"
      },
      {
        id: 2,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "الاكل الفلسطيني"
      },
      {
        id: 3,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "الزيوت"
      },
      {
        id: 4,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "المشروبات"
      },
      {
        id: 5,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "الزيوت"
      },
      {
        id: 6,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "الاكل الفلسطيني"
      },
      {
        id: 7,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "الاكل الفلسطيني"
      },
      {
        id: 8,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "المشروبات"
      },
      {
        id: 9,
        name: "زيت الزيتون الفلسطيني الاصلي  ",
        image: oliveoil,
        salary: "5.99",
        subcategory: "الزيوت"
      },
    ],
  },
  {
    title: "الملابس والاكسسوارات",
    subcategories: ["الاكسسوارات", "الملابس الرجالية", "الملابس النسائية"],
    banner: clothescategory,
    items: [
      { id: 7, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الاكسسوارات" },
      { id: 8, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الاكسسوارات" },
      { id: 9, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الملابس الرجالية" },
      { id: 10, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الملابس الرجالية" },
      { id: 11, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الملابس النسائية" },
      { id: 12, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الملابس النسائية" },
      { id: 13, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الملابس النسائية" },
      { id: 14, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الملابس الرجالية" },
      { id: 15, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99", subcategory: "الاكسسوارات" },
    
    ],
  },
  {
    title: "الحرف اليدوية",
    banner: handcraftescategory,
    subcategories: ["فخار", "أطباق", "ميدالية"],
    items: [
      { id: 13, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "فخار" },
      { id: 14, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "فخار" },
      { id: 15, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "أطباق" },
      { id: 16, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "أطباق" },
      { id: 17, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "ميدالية" },
      { id: 18, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "ميدالية" },
      { id: 19, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "ميدالية" },
      { id: 20, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "أطباق" },
      { id: 21, name: "زبدية فخار", image: craft, salary: "3.99", subcategory: "فخار" },
    ],
  },
  {
    title: "الكتب والمطبوعات",
    subcategories: ["القصص", "الروايات", "الصحف والمجلات"],
    banner: bookscategory,
    items: [
      {
        id: 19,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "القصص"
      },
      {
        id: 20,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "القصص"
      },
      {
        id: 21,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "الروايات"
      },
      {
        id: 22,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "الروايات"
      },
      {
        id: 23,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "الصحف والمجلات"
      },
      {
        id: 24,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "الصحف والمجلات"
      },
      {
        id: 25,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "الصحف والمجلات"
      },
      {
        id: 26,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "القصص"
      },
      {
        id: 27,
        name: "رواية الطنطورية للكاتبة رضوى عاشور",
        image: books,
        salary: "5.99",
        subcategory: "الروايات"
      },
    ],
  },
];
