export const lists = {
  id: 6,
  slug: "lists",
  title: "লিস্ট (List)",
  subtitle: "একসাথে অনেক তথ্য রাখা",
  sections: [
    {
      id: "6.1",
      title: "লিস্ট কী?",
      content: "লিস্ট হলো একটা ব্যাগের মতো, যেখানে আপনি অনেকগুলো জিনিস একসাথে রাখতে পারেন। পাইথনে থার্ড ব্র্যাকেট `[]` দিয়ে লিস্ট তৈরি করা হয়।",
      code: {
        language: "python",
        content: "friends = [\"করিম\", \"রহিম\", \"জব্বার\", \"সালাম\"]\n\nfirst = friends[0]  # করিম\nlast = friends[-1]  # সালাম"
      }
    },
    {
      id: "6.2",
      title: "লিস্টের অপারেশন",
      content: "লিস্টে আপনি নতুন আইটেম যোগ করতে পারেন, বাদ দিতে পারেন, বা সাজাতে পারেন।",
      code: {
        language: "python",
        content: "numbers = [5, 2, 8, 1]\n\n# শেষে যোগ করা\nnumbers.append(10)\n\n# মাঝখানে ঢোকানো\nnumbers.insert(1, 99)  # ১ নম্বর পজিশনে ৯৯\n\n# ডিলিট করা\nnumbers.remove(2)      # ২ সংখ্যাটি মুছে ফেলো\n\n# সাজানো (Sort)\nnumbers.sort()\n\nprint(numbers)"
      }
    }
  ]
};
