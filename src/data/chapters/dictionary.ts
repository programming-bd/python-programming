export const dictionary = {
  id: 7,
  slug: "dictionary",
  title: "ডিকশনারি (Dictionary)",
  subtitle: "কি-ভ্যালু পেয়ার",
  sections: [
    {
      id: "7.1",
      title: "ডিকশনারি পরিচিতি",
      content: "বাস্তব জীবনের ডিকশনারির মতোই, যেখানে একটা শব্দের (Key) একটা অর্থ (Value) থাকে। পাইথনে কার্লি ব্রেস `{}` দিয়ে ডিকশনারি তৈরি করা হয়। এটি ডেটা স্টোর করার সবচেয়ে শক্তিশালী মাধ্যমগুলোর একটি।",
      code: {
        language: "python",
        content: "student = {\n    \"name\": \" সাকিব\",\n    \"age\": 22\n}\n\nname = student[\"name\"]  # সাকিব\nage = student.get(\"age\")  # 22"
      }
    },
    {
      id: "7.2",
      title: "ডিকশনারি মডিফিকেশন",
      content: "ডিকশনারিতে সহজেই নতুন তথ্য যোগ বা আপডেট করা যায়।",
      code: {
        language: "python",
        content: "car = {\n    \"brand\": \"Toyota\",\n    \"model\": \"Corolla\",\n    \"year\": 2015\n}\n\n# মান আপডেট করা\ncar[\"year\"] = 2020\n\n# নতুন কি-ভ্যালু যোগ করা\ncar[\"color\"] = \"Black\"\n\n# লুপ চালানো\nfor key, value in car.items():\n    print(f\"{key}: {value}\")"
      }
    }
  ]
};
