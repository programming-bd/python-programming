import { Book } from '@/types/book';
import { introduction } from './chapters/introduction';
import { variables } from './chapters/variables';
import { operators } from './chapters/operators';
import { conditionals } from './chapters/conditionals';
import { loops } from './chapters/loops';
import { lists } from './chapters/lists';
import { dictionary } from './chapters/dictionary';
import { functions } from './chapters/functions';
import { oop } from './chapters/oop';
import { error_handling } from './chapters/error-handling';
import { modules } from './chapters/modules';
import { final_project } from './chapters/final-project';

export const book: Book = {
  title: "পাইথন প্রোগ্রামিং",
  subtitle: "সহজ বাংলায় প্রোগ্রামিং শেখার পূর্ণাঙ্গ গাইড",
  author: "সিফাত ফয়সাল",
  edition: "আল্টিমেট এডিশন ২০২৬",
  year: "২০২৬",
  description: "পাইথন শিখতে চান কিন্তু কোত্থেকে শুরু করবেন বুঝতে পারছেন না? এই বইটি আপনাকে হাত ধরে শূন্য থেকে একজন দক্ষ পাইথন প্রোগ্রামার হিসেবে গড়ে তুলবে। খুব সহজ ভাষায়, বাস্তব উদাহরণ দিয়ে প্রতিটি বিষয় বুঝিয়ে বলা হয়েছে।",
  coverQuote: "\"কোডিং কেবল কম্পিউটারকে নির্দেশ দেওয়া নয়, এটি সমস্যা সমাধানের শিল্প।\"",
  chapters: [
    introduction,
    variables,
    operators,
    conditionals,
    loops,
    lists,
    dictionary,
    functions,
    oop,
    error_handling,
    modules,
    final_project
  ]
};
