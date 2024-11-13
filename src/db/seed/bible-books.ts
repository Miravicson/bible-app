import { db } from "@/db/database";
import { defaultBibleBooks } from "../schema";

const books = [ 
  {
    "book": "Genesis",
    "bookNumber": 0
  },
  {
    "book": "Exodus",
    "bookNumber": 1
  },
  {
    "book": "Leviticus",
    "bookNumber": 2
  },
  {
    "book": "Numbers",
    "bookNumber": 3
  },
  {
    "book": "Deuteronomy",
    "bookNumber": 4
  },
  {
    "book": "Joshua",
    "bookNumber": 5
  },
  {
    "book": "Judges",
    "bookNumber": 6
  },
  {
    "book": "Ruth",
    "bookNumber": 7
  },
  {
    "book": "1 Samuel",
    "bookNumber": 8
  },
  {
    "book": "2 Samuel",
    "bookNumber": 9
  },
  {
    "book": "1 Kings",
    "bookNumber": 10
  },
  {
    "book": "2 Kings",
    "bookNumber": 11
  },
  {
    "book": "1 Chronicles",
    "bookNumber": 12
  },
  {
    "book": "2 Chronicles",
    "bookNumber": 13
  },
  {
    "book": "Ezra",
    "bookNumber": 14
  },
  {
    "book": "Nehemiah",
    "bookNumber": 15
  },
  {
    "book": "Esther",
    "bookNumber": 16
  },
  {
    "book": "Job",
    "bookNumber": 17
  },
  {
    "book": "Psalms",
    "bookNumber": 18
  },
  {
    "book": "Proverbs",
    "bookNumber": 19
  },
  {
    "book": "Ecclesiastes",
    "bookNumber": 20
  },
  {
    "book": "Song of Solomon",
    "bookNumber": 21
  },
  {
    "book": "Isaiah",
    "bookNumber": 22
  },
  {
    "book": "Jeremiah",
    "bookNumber": 23
  },
  {
    "book": "Lamentations",
    "bookNumber": 24
  },
  {
    "book": "Ezekiel",
    "bookNumber": 25
  },
  {
    "book": "Daniel",
    "bookNumber": 26
  },
  {
    "book": "Hosea",
    "bookNumber": 27
  },
  {
    "book": "Joel",
    "bookNumber": 28
  },
  {
    "book": "Amos",
    "bookNumber": 29
  },
  {
    "book": "Obadiah",
    "bookNumber": 30
  },
  {
    "book": "Jonah",
    "bookNumber": 31
  },
  {
    "book": "Micah",
    "bookNumber": 32
  },
  {
    "book": "Nahum",
    "bookNumber": 33
  },
  {
    "book": "Habakkuk",
    "bookNumber": 34
  },
  {
    "book": "Zephaniah",
    "bookNumber": 35
  },
  {
    "book": "Haggai",
    "bookNumber": 36
  },
  {
    "book": "Zechariah",
    "bookNumber": 37
  },
  {
    "book": "Malachi",
    "bookNumber": 38
  },
  {
    "book": "Matthew",
    "bookNumber": 39
  },
  {
    "book": "Mark",
    "bookNumber": 40
  },
  {
    "book": "Luke",
    "bookNumber": 41
  },
  {
    "book": "John",
    "bookNumber": 42
  },
  {
    "book": "Acts",
    "bookNumber": 43
  },
  {
    "book": "Romans",
    "bookNumber": 44
  },
  {
    "book": "1 Corinthians",
    "bookNumber": 45
  },
  {
    "book": "2 Corinthians",
    "bookNumber": 46
  },
  {
    "book": "Galatians",
    "bookNumber": 47
  },
  {
    "book": "Ephesians",
    "bookNumber": 48
  },
  {
    "book": "Philippians",
    "bookNumber": 49
  },
  {
    "book": "Colossians",
    "bookNumber": 50
  },
  {
    "book": "1 Thessalonians",
    "bookNumber": 51
  },
  {
    "book": "2 Thessalonians",
    "bookNumber": 52
  },
  {
    "book": "1 Timothy",
    "bookNumber": 53
  },
  {
    "book": "2 Timothy",
    "bookNumber": 54
  },
  {
    "book": "Titus",
    "bookNumber": 55
  },
  {
    "book": "Philemon",
    "bookNumber": 56
  },
  {
    "book": "Hebrews",
    "bookNumber": 57
  },
  {
    "book": "James",
    "bookNumber": 58
  },
  {
    "book": "1 Peter",
    "bookNumber": 59
  },
  {
    "book": "2 Peter",
    "bookNumber": 60
  },
  {
    "book": "1 John",
    "bookNumber": 61
  },
  {
    "book": "2 John",
    "bookNumber": 62
  },
  {
    "book": "3 John",
    "bookNumber": 63
  },
  {
    "book": "Jude",
    "bookNumber": 64
  },
  {
    "book": "Revelation",
    "bookNumber": 65
  }
]


export async function seedBibleBooks() {
  const book = await db.query.defaultBibleBooks.findFirst();

  if (book) return;
  const inserted = await db.insert(defaultBibleBooks).values(books).returning({insertedId: defaultBibleBooks.id})

  console.log(`Inserted`, inserted);
}
