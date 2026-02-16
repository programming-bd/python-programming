export const final_project = {
  id: 12,
  slug: "final-project",
  title: "প্রজেক্ট: গেসিং গেম",
  subtitle: "যা শিখলাম তার প্রয়োগ",
  sections: [
    {
      id: "12.1",
      title: "গেম লজিক",
      content: "আমরা একটি গেম বানাবো যেখানে কম্পিউটার ১ থেকে ১০০ এর মধ্যে একটি সংখ্যা মনে মনে ধরবে। আপনাকে বলতে হবে সংখ্যাটি কত। কম্পিউটার আপনাকে ক্লু দেবে (ছোট/বড়)।\n\nচলুন কোড করা যাক!",
      code: {
        language: "python",
        content: "import random\n\ndef guessing_game():\n    secret_number = random.randint(1, 100)\n    attempts = 0\n\n    print(\"স্বাগতম! ১ থেকে ১০০ এর মধ্যে সংখ্যাটি অনুমান করুন।\")\n\n    while True:\n        try:\n            guess = int(input(\"আপনার অনুমান: \"))\n            attempts += 1\n\n            if guess < secret_number:\n                print(\"আরও বড় সংখ্যা!\")\n            elif guess > secret_number:\n                print(\"আরও ছোট সংখ্যা!\")\n            else:\n                print(f\"অভিনন্দন! আপনি {attempts} বারে সঠিক সংখ্যা ({secret_number}) ধরে ফেলেছেন!\")\n                break\n        except ValueError:\n            print(\"দয়া করে একটি বৈধ সংখ্যা লিখুন।\")\n\n# গেম শুরু করুন\nguessing_game()"
      },
      note: "এই কোডটি কপি করে রান করুন এবং দেখুন আপনি কত দ্রুত সংখ্যাটি ধরতে পারেন! এটাই আপনার প্রথম সম্পূর্ণ পাইথন প্রজেক্ট।"
    }
  ]
};
