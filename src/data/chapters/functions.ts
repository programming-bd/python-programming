export const functions = {
  id: 8,
  slug: "functions",
  title: "ফাংশন (Functions)",
  subtitle: "বারবার লিখব না, একবার বানাবো",
  sections: [
    {
      id: "8.1",
      title: "ফাংশন কেন লাগে?",
      content: "ফাংশন হলো কোডের একটা ছোট ব্লক যা একটা নির্দিষ্ট কাজ করে। ধরুন আপনাকে প্রতিদিন সকালে কফি বানাতে হয়। এখন কফি বানানোর পুরো প্রক্রিয়াটা যদি একটা মেশিনে সেট করা থাকে (ফাংশন), তাহলে আপনি শুধু বোতাম চাপলেই (কল করলেই) কফি পেয়ে যাবেন। বারবার সব কাজ করতে হবে না।",
      code: {
        language: "python",
        content: "def greet(name):\n    print(f\"হ্যালো, {name}!\")\n    print(\"কেমন আছেন?\")\n\n# ফাংশন ব্যবহার করা (Call)\ngreet(\"রাফি\")\ngreet(\"তানিয়া\")"
      }
    },
    {
      id: "8.2",
      title: "রিটার্ন ভ্যালু",
      content: "ফাংশন কিছু কাজ করে আপনাকে ফলাফল ফেরত দিতে পারে। একে বলে `return`।",
      code: {
        language: "python",
        content: "def add_numbers(n1, n2):\n    result = n1 + n2\n    return result\n\ntotal = add_numbers(50, 60)\nprint(f\"মোট: {total}\")"
      },
      note: "ফাংশন যখন `return` করে, তখন সে ওখানেই তার কাজ শেষ করে দেয়। এরপরের কোনো কোড আর চলে না।"
    }
  ]
};
