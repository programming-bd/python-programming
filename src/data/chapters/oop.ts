export const oop = {
  id: 9,
  slug: "oop",
  title: "অবজেক্ট অরিয়েন্টেড প্রোগ্রামিং (OOP)",
  subtitle: "কোডিং যখন বাস্তব জীবনের মতো",
  sections: [
    {
      id: "9.1",
      title: "ক্লাস ও অবজেক্ট",
      content: "OOP বা অবজেক্ট অরিয়েন্টেড প্রোগ্রামিং হলো কোড লেখার একটি স্টাইল যা বাস্তব জীবনের বস্তুর ওপর ভিত্তি করে তৈরি।\n\n**Class:** ধরুন 'গাড়ি' একটি ক্লাস। সব গাড়িরই চাকা, ইঞ্জিন, স্টিয়ারিং আছে। এটা হলো ব্লু-প্রিন্ট বা নকশা।\n**Object:** টয়োটা, বিএমডব্লিউ, অডি — এগুলো হলো সেই ক্লাসের এক একটি বাস্তব অবজেক্ট। প্রত্যেকের বৈশিষ্ট্য আলাদা (রঙ, মডেল), কিন্তু মূল গঠন এক।",
      code: {
        language: "python",
        content: "class Car:\n    def __init__(self, brand, color):\n        self.brand = brand\n        self.color = color\n\n    def start_engine(self):\n        print(f\"{self.brand} গাড়িটি স্টার্ট হয়েছে...\")\n\n# অবজেক্ট তৈরি\nmy_car = Car(\"Toyota\", \"White\")\nmy_car.start_engine()"
      }
    },
    {
      id: "9.2",
      title: "ইনহেরিট্যান্স (Inheritance)",
      content: "বাবার সম্পত্তি যেমন সন্তান পায়, তেমনি এক ক্লাসের বৈশিষ্ট্য অন্য ক্লাস পেতে পারে। একে বলে ইনহেরিট্যান্স।",
      code: {
        language: "python",
        content: "class Animal:\n    def speak(self):\n        print(\"প্রাণীটি শব্দ করছে...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"ঘেউ ঘেউ!\")\n\nclass Cat(Animal):\n    def speak(self):\n        print(\"মিয়াউ!\")\n\nd = Dog()\nd.speak()  # আউটপুট: ঘেউ ঘেউ!"
      }
    }
  ]
};
