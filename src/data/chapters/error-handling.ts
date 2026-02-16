export const error_handling = {
  id: 10,
  slug: "error-handling",
  title: "এরর হ্যান্ডলিং",
  subtitle: "ভুল শুধরানোর শিল্প",
  sections: [
    {
      id: "10.1",
      title: "Try-Except ব্লক",
      content: "প্রোগ্রাম চালানোর সময় ভুল হতেই পারে (যেমন শূন্য দিয়ে ভাগ করা)। ভুল হলে যেন পুরো প্রোগ্রাম ক্র্যাশ না করে, সেজন্য আমরা `try-except` ব্যবহার করি।",
      code: {
        language: "python",
        content: "try:\n    number = int(input(\"একটি সংখ্যা দিন: \"))\n    result = 100 / number\n    print(result)\nexcept ZeroDivisionError:\n    print(\"ভুল! শূন্য দিয়ে ভাগ করা যায় না।\")\nexcept ValueError:\n    print(\"ভুল! দয়া করে সংখ্যা লিখুন।\")"
      }
    }
  ]
};
