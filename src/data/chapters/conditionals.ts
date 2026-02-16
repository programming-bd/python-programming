export const conditionals = {
  id: 4,
  slug: "conditionals",
  title: "সিদ্ধান্ত গ্রহণ (Decision Making)",
  subtitle: "যদি, কিন্তু এবং অথবা",
  sections: [
    {
      id: "4.1",
      title: "if-else: শর্তসাপেক্ষ কাজ",
      content: "জীবনে আমাদের প্রতিনিয়ত সিদ্ধান্ত নিতে হয়। \"যদি আজ বৃষ্টি হয়, তবে ছাতা নেব, নাহলে নেব না।\" প্রোগ্রামেও ঠিক তাই। একে আমরা বলি `if-else` স্টেটমেন্ট।\n\nপাইথনে ব্লকের শুরু বোঝাতে ইনডেন্টেশন (Space) ব্যবহার করা হয়, যা একে দেখতে খুব পরিষ্কার করে তোলে।",
      code: {
        language: "python",
        content: "age = 18\n\nif age >= 18:\n    print(\"আপনি ভোট দিতে পারবেন।\")\n    print(\"স্বাগতম!\")\nelse:\n    print(\"দুঃখিত, আপনি এখনো ছোট।\")"
      }
    },
    {
      id: "4.2",
      title: "elif: একাধিক শর্ত",
      content: "যখন আমাদের সামনে অনেকগুলো অপশন থাকে, তখন আমরা `elif` (else if) ব্যবহার করি।",
      code: {
        language: "python",
        content: "marks = 75\n\nif marks >= 80:\n    print(\"গ্রেড: A+\")\nelif marks >= 70:\n    print(\"গ্রেড: A\")\nelif marks >= 60:\n    print(\"গ্রেড: A-\")\nelse:\n    print(\"আরও ভালো করতে হবে!\")"
      },
      note: "প্রোগ্রাম উপর থেকে নিচে চেক করতে করতে যায়। যেই শর্তটা প্রথমে সত্য হবে, শুধু সেটার কাজই করবে এবং বাকিগুলো স্কিপ করবে।"
    }
  ]
};
