export const operators = {
  id: 3,
  slug: "operators",
  title: "অপারেটর ও ম্যাথ",
  subtitle: "যোগ, বিয়োগ এবং আরও অনেক কিছু",
  sections: [
    {
      id: "3.1",
      title: "গাণিতিক অপারেটর",
      content: "কম্পিউটার মানেই গণনা। পাইথনে গণিতের কাজগুলো খুব সহজেই করা যায়।",
      code: {
        language: "python",
        content: "a = 15\nb = 4\n\nprint(a + b)   # যোগ: 19\nprint(a - b)   # বিয়োগ: 11\nprint(a * b)   # গুণ: 60\nprint(a / b)   # ভাগ: 3.75\nprint(a // b)  # ফ্লোর ডিভিশন (দশমিক বাদ দিয়ে): 3\nprint(a % b)   # মডুলাস (ভাগশেষ): 3\nprint(a ** b)  # পাওয়ার (১৫ এর পাওয়ার ৪): 50625"
      }
    },
    {
      id: "3.2",
      title: "তুলনামূলক অপারেটর",
      content: "আমরা প্রায়ই দুইটা জিনিসের মধ্যে তুলনা করি — কে বড়, কে ছোট বা তারা সমান কি না। পাইথনেও তাই করা হয়। এগুলো সবসময় সত্য (`True`) বা মিথ্যা (`False`) উত্তর দেয়।",
      code: {
        language: "python",
        content: "x = 10\ny = 20\n\nprint(x == y)  # সমান? False\nprint(x != y)  # অসমান? True\nprint(x > y)   # x কি y এর চেয়ে বড়? False\nprint(x < y)   # x কি y এর চেয়ে ছোট? True"
      }
    }
  ]
};
