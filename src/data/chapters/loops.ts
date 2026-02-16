export const loops = {
  id: 5,
  slug: "loops",
  title: "লুপ (Loops)",
  subtitle: "একই কাজ বারবার করা",
  sections: [
    {
      id: "5.1",
      title: "for লুপ",
      content: "ধরুন আপনাকে বলা হলো \"আমি পাইথন শিখব\" কথাটি ১০০ বার লিখতে। আপনি কি ১০০ বার কপি-পেস্ট করবেন? নিশ্চয়ই না! প্রোগ্রামিংয়ে এই পুনরাবৃত্তির কাজটাই করে **Loop**।\n\n`for` লুপ ব্যবহার করা হয় যখন আমরা জানি কতবার লুপটা চলবে বা কোনো লিস্টের আইটেমের ওপর লুপ চালাতে।",
      code: {
        language: "python",
        content: "for i in range(5):\n    print(i)\n\nfruits = [\"আম\", \"জাম\", \"লিচু\"]\nfor fruit in fruits:\n    print(fruit)"
      }
    },
    {
      id: "5.2",
      title: "while লুপ",
      content: "`while` লুপ ততক্ষণ চলতে থাকে যতক্ষণ একটা নির্দিষ্ট শর্ত সত্য থাকে।",
      code: {
        language: "python",
        content: "count = 1\n\nwhile count <= 5:\n    print(f\"কাউন্টডাউন: {count}\")\n    count = count + 1  # এটা না দিলে লুপ কিন্তু থামবে না!"
      },
      note: "সতর্কতা: while লুপ চালানোর সময় শর্ত পরিবর্তন করার কোড (যেমন count + 1) দিতে ভুলবেন না, নাহলে লুপ অনন্তকাল চলতে থাকবে (Infinite Loop)!"
    },
    {
      id: "5.3",
      title: "break এবং continue",
      content: "লুপের মাঝপথে থামতে চাইলে `break` এবং কোনো ধাপ স্কিপ করতে চাইলে `continue` ব্যবহার করা হয়।",
      code: {
        language: "python",
        content: "for i in range(1, 11):\n    if i == 5:\n        continue  # ৫ বাদ দিয়ে পরেরটায় যাও\n    if i == 8:\n        break     # ৮ এ আসলে লুপ বন্ধ\n    print(i)"
      }
    }
  ]
};
