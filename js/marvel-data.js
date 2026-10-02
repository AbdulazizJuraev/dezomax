/* tools/fetch-marvel.js yaratadi — Wikidata (CC0) ma'lumotlari. Qo'lda o'zgartirmang. */
var MARVEL_INFO = {
 "32": {
  "wd": "Q192724",
  "en": "Iron Man",
  "date": "2008-04-30",
  "runtime": 126,
  "director": [
   "Jon Favreau"
  ],
  "cast": [
   "Terrence Howard",
   "Jeff Bridges",
   "Gwyneth Paltrow",
   "Shaun Toub",
   "Faran Tahir",
   "Leslie Bibb",
   "Clark Gregg",
   "Bill Smitrovich",
   "Paul Bettany",
   "Jon Favreau",
   "Samuel L. Jackson",
   "America Olivo"
  ],
  "budget": 140000000,
  "gross": 585366247
 },
 "33": {
  "wd": "Q182218",
  "en": "The Avengers",
  "date": "2012-04-25",
  "runtime": 142,
  "director": [],
  "cast": [
   "Jillian Morgese",
   "Tom Hiddleston",
   "Clark Gregg",
   "Cobie Smulders",
   "Stellan Skarsgård",
   "Samuel L. Jackson",
   "Gwyneth Paltrow",
   "Alexis Denisof",
   "Tina Benko",
   "Jerzy Skolimowski",
   "Kirill Nikiforov",
   "Jeff Wolfe"
  ],
  "budget": 220000000,
  "gross": 1518812988,
  "yt": "eOrNdBpGMv8",
  "ytCh": "Marvel Entertainment"
 },
 "34": {
  "wd": "Q5887360",
  "en": "Guardians of the Galaxy",
  "date": "2014-07-31",
  "runtime": 121,
  "director": [
   "James Gunn"
  ],
  "cast": [
   "Dave Bautista",
   "Zoe Saldaña",
   "Michael Rooker",
   "Lee Pace",
   "Ophelia Lovibond",
   "Karen Gillan",
   "Djimon Hounsou",
   "Glenn Close",
   "Josh Brolin",
   "Benicio del Toro",
   "John C. Reilly",
   "Sean Gunn"
  ],
  "budget": 170000000,
  "gross": 772776600,
  "yt": "d96cjJhvlMA",
  "ytCh": "Marvel Entertainment"
 },
 "35": {
  "wd": "Q1765358",
  "en": "Captain America: The Winter Soldier",
  "date": "2014-03-26",
  "runtime": 136,
  "director": [
   "Joe Russo"
  ],
  "cast": [
   "Robert Redford",
   "Sebastian Stan",
   "Anthony Mackie",
   "Cobie Smulders",
   "Frank Grillo",
   "Georges St-Pierre",
   "Samuel L. Jackson",
   "Aaron Taylor-Johnson",
   "Alan Dale",
   "Bernard White",
   "Callan Mulvey",
   "Chin Han"
  ],
  "budget": 170000000,
  "gross": 714421503,
  "yt": "7SlILk2WMTI",
  "ytCh": "Marvel Entertainment"
 },
 "36": {
  "wd": "Q18406872",
  "en": "Doctor Strange",
  "date": "2016-10-20",
  "runtime": 115,
  "director": [
   "Scott Derrickson"
  ],
  "cast": [
   "Benedict Cumberbatch",
   "Chiwetel Ejiofor",
   "Rachel McAdams",
   "Michael Stuhlbarg",
   "Tilda Swinton",
   "Amy Landecker",
   "Scott Adkins",
   "Benedict Wong",
   "Benjamin Bratt",
   "Zara Phythian",
   "Alaa Safi",
   "Katrina Durden"
  ],
  "budget": 165000000,
  "gross": 677718395,
  "yt": "HSzx-zryEgM",
  "ytCh": "Marvel Entertainment"
 },
 "37": {
  "wd": "Q22665878",
  "en": "Thor: Ragnarok",
  "date": "2017-10-25",
  "runtime": 130,
  "director": [
   "Taika Waititi"
  ],
  "cast": [
   "Tom Hiddleston",
   "Cate Blanchett",
   "Tessa Thompson",
   "Jeff Goldblum",
   "Karl Urban",
   "Idris Elba",
   "Anthony Hopkins",
   "Sam Neill",
   "Benedict Cumberbatch",
   "Rachel House",
   "Taika Waititi",
   "Tadanobu Asano"
  ],
  "budget": 180000000,
  "gross": 853977126,
  "yt": "BynD1PEVAB4",
  "ytCh": "Marvel Entertainment"
 },
 "38": {
  "wd": "Q23780734",
  "en": "Black Panther",
  "date": "2018-02-14",
  "runtime": 134,
  "director": [],
  "cast": [
   "Chadwick Boseman",
   "Michael B. Jordan",
   "Lupita Nyong'o",
   "Danai Gurira",
   "Winston Duke",
   "Andy Serkis",
   "Forest Whitaker",
   "Florence Kasumba",
   "Daniel Kaluuya",
   "Letitia Wright",
   "Angela Bassett",
   "Sterling K. Brown"
  ],
  "budget": 200000000,
  "gross": 1347597973,
  "yt": "xjDjIWPwcPU",
  "ytCh": "Marvel Entertainment"
 },
 "39": {
  "wd": "Q23780914",
  "en": "Avengers: Infinity War",
  "date": "2018-04-25",
  "runtime": 149,
  "director": [],
  "cast": [
   "Josh Brolin",
   "Tom Hiddleston",
   "Samuel L. Jackson",
   "Benedict Cumberbatch",
   "Paul Bettany",
   "Elizabeth Olsen",
   "Sebastian Stan",
   "Cobie Smulders",
   "Benedict Wong",
   "Zoe Saldaña",
   "Karen Gillan",
   "Dave Bautista"
  ],
  "budget": 400000000,
  "gross": 2048359754,
  "yt": "6ZfuNTqbHE8",
  "ytCh": "Marvel Entertainment"
 },
 "40": {
  "wd": "Q23781155",
  "en": "Avengers: Endgame",
  "date": "2019-04-22",
  "runtime": 181,
  "director": [],
  "cast": [
   "Josh Brolin",
   "Tom Hiddleston",
   "Samuel L. Jackson",
   "Elizabeth Olsen",
   "Evangeline Lilly",
   "Benedict Cumberbatch",
   "Karen Gillan",
   "Gwyneth Paltrow",
   "Sebastian Stan",
   "Brie Larson",
   "Jon Favreau",
   "Don Cheadle"
  ],
  "budget": 356000000,
  "gross": 2797501328,
  "yt": "TcMBFSGVi1c",
  "ytCh": "Marvel Entertainment"
 },
 "41": {
  "wd": "Q68934496",
  "en": "Spider-Man: No Way Home",
  "date": "2021-12-15",
  "runtime": 148,
  "director": [
   "Jon Watts"
  ],
  "cast": [
   "Marisa Tomei",
   "Jacob Batalon",
   "Tony Revolori",
   "Benedict Cumberbatch",
   "Alfred Molina",
   "Jamie Foxx",
   "Jon Favreau",
   "J. B. Smoove",
   "Benedict Wong",
   "Angourie Rice",
   "Hannibal Buress",
   "J. K. Simmons"
  ],
  "budget": 200000000,
  "gross": 1921847111,
  "yt": "ZYzbalQ6Lg8",
  "ytCh": "Marvel Entertainment"
 },
 "42": {
  "wd": "Q19347291",
  "en": "Deadpool",
  "date": "2016-02-10",
  "runtime": 108,
  "director": [
   "Tim Miller"
  ],
  "cast": [
   "Ryan Reynolds",
   "Morena Baccarin",
   "Ed Skrein",
   "T. J. Miller",
   "Gina Carano",
   "Brianna Hildebrand",
   "Andre Tricoteux",
   "Leslie Uggams",
   "Jed Rees",
   "Karan Soni",
   "Taylor Hickson",
   "Randal Reeder"
  ],
  "budget": 58000000,
  "gross": 782836791,
  "yt": "ONHBaC-pfsk",
  "ytCh": "20th Century Studios"
 },
 "43": {
  "wd": "Q29588607",
  "en": "Spider-Man: Into the Spider-Verse",
  "date": "2018-12-13",
  "runtime": 116,
  "director": [
   "Peter Ramsey",
   "Rodney Rothman",
   "Bob Persichetti"
  ],
  "cast": [],
  "budget": 90000000,
  "gross": 363800000,
  "yt": "XfJ1PFzE8DU",
  "ytCh": "Marvel Entertainment"
 },
 "122": {
  "wd": "Q466611",
  "en": "The Incredible Hulk",
  "date": "2008-06-13",
  "runtime": 112,
  "director": [],
  "cast": [
   "Edward Norton",
   "Liv Tyler",
   "Tim Roth",
   "William Hurt",
   "Tim Blake Nelson",
   "Ty Burrell",
   "Peter Mensah",
   "Lou Ferrigno",
   "Stan Lee",
   "Christina Cabot",
   "Débora Nascimento",
   "Joris Jarsky"
  ],
  "budget": 150000000,
  "gross": 263427551
 },
 "123": {
  "wd": "Q205028",
  "en": "Iron Man 2",
  "date": "2010-04-29",
  "runtime": 125,
  "director": [
   "Jon Favreau"
  ],
  "cast": [
   "Gwyneth Paltrow",
   "Don Cheadle",
   "Sam Rockwell",
   "Mickey Rourke",
   "Samuel L. Jackson",
   "Clark Gregg",
   "John Slattery",
   "Garry Shandling",
   "Kate Mara",
   "Leslie Bibb",
   "Jon Favreau",
   "Stan Lee"
  ],
  "budget": 200000000,
  "gross": 623933331
 },
 "124": {
  "wd": "Q217020",
  "en": "Thor",
  "date": "2011-04-27",
  "runtime": 114,
  "director": [],
  "cast": [
   "Kat Dennings",
   "Natalie Portman",
   "Tom Hiddleston",
   "Stellan Skarsgård",
   "Colm Feore",
   "Ray Stevenson",
   "Idris Elba",
   "Rene Russo",
   "Anthony Hopkins",
   "Clark Gregg",
   "Jaimie Alexander",
   "Tadanobu Asano"
  ],
  "budget": 150000000,
  "gross": 449326618,
  "yt": "JOddp-nlNvQ",
  "ytCh": "Marvel Entertainment"
 },
 "125": {
  "wd": "Q275120",
  "en": "Captain America: The First Avenger",
  "date": "2011-07-22",
  "runtime": 124,
  "director": [],
  "cast": [
   "Tommy Lee Jones",
   "Stanley Tucci",
   "Sebastian Stan",
   "Dominic Cooper",
   "Neal McDonough",
   "Derek Luke",
   "Toby Jones",
   "Samuel L. Jackson",
   "Richard Armitage",
   "Natalie Dormer",
   "JJ Feild",
   "Kenneth Choi"
  ],
  "budget": 140000000,
  "gross": 370569774,
  "yt": "JerVrbLldXw",
  "ytCh": "Marvel Entertainment"
 },
 "126": {
  "wd": "Q209538",
  "en": "Iron Man 3",
  "date": "2013-04-24",
  "runtime": 130,
  "director": [],
  "cast": [
   "Gwyneth Paltrow",
   "Don Cheadle",
   "Guy Pearce",
   "Rebecca Hall",
   "Jon Favreau",
   "Ben Kingsley",
   "James Badge Dale",
   "Stephanie Szostak",
   "William Sadler",
   "Dale Dickey",
   "Ty Simpkins",
   "Wang Xueqi"
  ],
  "budget": 200000000,
  "gross": 1214811252,
  "yt": "Ke1Y3P9D0Bc",
  "ytCh": "Marvel UK"
 },
 "127": {
  "wd": "Q1201853",
  "en": "Thor: The Dark World",
  "date": "2013-10-31",
  "runtime": 112,
  "director": [],
  "cast": [
   "Kat Dennings",
   "Natalie Portman",
   "Tom Hiddleston",
   "Stellan Skarsgård",
   "Idris Elba",
   "Christopher Eccleston",
   "Adewale Akinnuoye-Agbaje",
   "Ray Stevenson",
   "Zachary Levi",
   "Tadanobu Asano",
   "Jaimie Alexander",
   "Rene Russo"
  ],
  "budget": 170000000,
  "gross": 644783140,
  "yt": "npvJ9FTgZbM",
  "ytCh": "Marvel Entertainment"
 },
 "128": {
  "wd": "Q14171368",
  "en": "Avengers: Age of Ultron",
  "date": "2015-04-22",
  "runtime": 141,
  "director": [],
  "cast": [
   "Samuel L. Jackson",
   "Aaron Taylor-Johnson",
   "James Spader",
   "Don Cheadle",
   "Elizabeth Olsen",
   "Paul Bettany",
   "Cobie Smulders",
   "Anthony Mackie",
   "Idris Elba",
   "Stellan Skarsgård",
   "Andy Serkis",
   "Claudia Kim"
  ],
  "budget": 250000000,
  "gross": 1402805868,
  "yt": "tmeOjFno6Do",
  "ytCh": "Marvel Entertainment"
 },
 "129": {
  "wd": "Q5901134",
  "en": "Ant-Man",
  "date": "2015-07-14",
  "runtime": 117,
  "director": [],
  "cast": [
   "Paul Rudd",
   "Evangeline Lilly",
   "Corey Stoll",
   "Bobby Cannavale",
   "Judy Greer",
   "T.I.",
   "David Dastmalchian",
   "Wood Harris",
   "Michael Douglas",
   "Anthony Mackie",
   "Abby Ryder Fortson",
   "John Slattery"
  ],
  "budget": 130000000,
  "gross": 519311965,
  "yt": "pWdKf3MneyI",
  "ytCh": "Marvel Entertainment"
 },
 "130": {
  "wd": "Q18407657",
  "en": "Captain America: Civil War",
  "date": "2016-04-27",
  "runtime": 147,
  "director": [],
  "cast": [
   "Sebastian Stan",
   "Anthony Mackie",
   "Don Cheadle",
   "Elizabeth Olsen",
   "Paul Rudd",
   "Emily VanCamp",
   "Frank Grillo",
   "William Hurt",
   "Chadwick Boseman",
   "Daniel Brühl",
   "Martin Freeman",
   "Alfre Woodard"
  ],
  "budget": 250000000,
  "gross": 1153296293,
  "yt": "dKrVegVI0Us",
  "ytCh": "Marvel Entertainment"
 },
 "131": {
  "wd": "Q20001199",
  "en": "Guardians of the Galaxy Vol. 2",
  "date": "2017-04-10",
  "runtime": 136,
  "director": [],
  "cast": [
   "Zoe Saldaña",
   "Dave Bautista",
   "Michael Rooker",
   "Karen Gillan",
   "Sean Gunn",
   "Pom Klementieff",
   "Steve Agee",
   "Kurt Russell",
   "Elizabeth Debicki",
   "Chris Sullivan",
   "Tommy Flanagan",
   "Evan Jones"
  ],
  "budget": 200000000,
  "gross": 863756051,
  "yt": "wUn05hdkhjM",
  "ytCh": "Marvel Entertainment"
 },
 "132": {
  "wd": "Q23010088",
  "en": "Spider-Man: Homecoming",
  "date": "2017-06-28",
  "runtime": 133,
  "director": [],
  "cast": [
   "Marisa Tomei",
   "Tony Revolori",
   "Laura Harrier",
   "Michael Keaton",
   "Donald Glover",
   "Martin Starr",
   "Abraham Attah",
   "Selenis Leyva",
   "Logan Marshall-Green",
   "Michael Mando",
   "Bokeem Woodbine",
   "Tyne Daly"
  ],
  "budget": 175000000,
  "gross": 880166924,
  "yt": "39udgGPyYMg",
  "ytCh": "Marvel Entertainment"
 },
 "133": {
  "wd": "Q22957393",
  "en": "Ant-Man and the Wasp",
  "date": "2018-07-04",
  "runtime": 118,
  "director": [],
  "cast": [
   "Paul Rudd",
   "Evangeline Lilly",
   "Michael Douglas",
   "Bobby Cannavale",
   "T.I.",
   "Judy Greer",
   "David Dastmalchian",
   "Laurence Fishburne",
   "Hannah John-Kamen",
   "Randall Park",
   "Walton Goggins",
   "Abby Ryder Fortson"
  ],
  "budget": 162000000,
  "gross": 622674139,
  "yt": "8_rTIAOohas",
  "ytCh": "Marvel Entertainment"
 },
 "134": {
  "wd": "Q23781129",
  "en": "Captain Marvel",
  "date": "2019-03-06",
  "runtime": 124,
  "director": [],
  "cast": [
   "Brie Larson",
   "Samuel L. Jackson",
   "Jude Law",
   "Gemma Chan",
   "Clark Gregg",
   "Lee Pace",
   "Ben Mendelsohn",
   "Djimon Hounsou",
   "Mckenna Grace",
   "Lashana Lynch",
   "Algenis Perez Soto",
   "Rune Temte"
  ],
  "budget": 152000000,
  "gross": 1128462972,
  "yt": "Z1BCujX3pw8",
  "ytCh": "Marvel Entertainment"
 },
 "135": {
  "wd": "Q27985819",
  "en": "Spider-Man: Far From Home",
  "date": "2019-06-28",
  "runtime": 129,
  "director": [],
  "cast": [
   "Samuel L. Jackson",
   "Jake Gyllenhaal",
   "Marisa Tomei",
   "Jon Favreau",
   "Jacob Batalon",
   "Tony Revolori",
   "Angourie Rice",
   "Remy Hii",
   "Martin Starr",
   "J. B. Smoove",
   "Jorge Lendeborg Jr.",
   "Cobie Smulders"
  ],
  "budget": 160000000,
  "gross": 1131927996,
  "yt": "LFoz8ZJWmPs",
  "ytCh": "Marvel Entertainment"
 },
 "136": {
  "wd": "Q23894626",
  "en": "Black Widow",
  "date": "2021-07-07",
  "runtime": 133,
  "director": [
   "Cate Shortland"
  ],
  "cast": [
   "David Harbour",
   "Rachel Weisz",
   "O. T. Fagbenle",
   "Florence Pugh",
   "Ray Winstone",
   "William Hurt",
   "Ahmed Bakare",
   "Joakim Skarli",
   "Simona Brown-Zivkovska",
   "Olga Kurylenko",
   "Olivier Richters",
   "Yuuki Luna"
  ],
  "budget": 200000000,
  "gross": 379751655,
  "yt": "ybji16u608U",
  "ytCh": "Marvel Entertainment"
 },
 "137": {
  "wd": "Q65768589",
  "en": "Shang-Chi and the Legend of the Ten Rings",
  "date": "2021-09-01",
  "runtime": 132,
  "director": [
   "Destin Daniel Cretton"
  ],
  "cast": [
   "Simu Liu",
   "Tony Leung",
   "Awkwafina",
   "Fala Chen",
   "Florian Munteanu",
   "Ben Kingsley",
   "Benedict Wong",
   "Michelle Yeoh",
   "Dallas Liu",
   "Yuen Wah",
   "Jodi Long",
   "Meng'er Zhang"
  ],
  "budget": 150000000,
  "gross": 432243292,
  "yt": "8YjFbMbfXaQ",
  "ytCh": "Marvel Entertainment"
 },
 "138": {
  "wd": "Q23894629",
  "en": "Eternals",
  "date": "2021-11-03",
  "runtime": 156,
  "director": [
   "Chloé Zhao"
  ],
  "cast": [
   "Richard Madden",
   "Salma Hayek",
   "Kumail Nanjiani",
   "Lauren Ridloff",
   "Brian Tyree Henry",
   "Ma Dong-seok",
   "Lia McHugh",
   "Gemma Chan",
   "Barry Keoghan",
   "Haaz Sleiman",
   "Zain Al Rafeea",
   "Lucia Efstathiou"
  ],
  "budget": 236200000,
  "gross": 402064899
 },
 "139": {
  "wd": "Q64211112",
  "en": "Doctor Strange in the Multiverse of Madness",
  "date": "2022-05-04",
  "runtime": 126,
  "director": [
   "Sam Raimi"
  ],
  "cast": [
   "Benedict Cumberbatch",
   "Benedict Wong",
   "Chiwetel Ejiofor",
   "Elizabeth Olsen",
   "Rachel McAdams",
   "Xochitl Gomez",
   "Michael Stuhlbarg",
   "Patrick Stewart",
   "Lashana Lynch",
   "Anson Mount",
   "John Krasinski",
   "Julian Hilliard"
  ],
  "budget": 200000000,
  "gross": 955775804,
  "yt": "aWzlQ2N6qqg",
  "ytCh": "Marvel Entertainment"
 },
 "140": {
  "wd": "Q65768604",
  "en": "Thor: Love and Thunder",
  "date": "2022-07-06",
  "runtime": 119,
  "director": [
   "Taika Waititi"
  ],
  "cast": [
   "Tessa Thompson",
   "Natalie Portman",
   "Taika Waititi",
   "Christian Bale",
   "Jaimie Alexander",
   "Pom Klementieff",
   "Matt Damon",
   "Sean Gunn",
   "Luke Hemsworth",
   "Russell Crowe",
   "Dave Bautista",
   "Karen Gillan"
  ],
  "budget": 250000000,
  "gross": 760928081,
  "yt": "Go8nTmfrQd8",
  "ytCh": "Marvel Entertainment"
 },
 "141": {
  "wd": "Q54860489",
  "en": "Black Panther: Wakanda Forever",
  "date": "2022-11-09",
  "runtime": 161,
  "director": [
   "Ryan Coogler"
  ],
  "cast": [
   "Letitia Wright",
   "Winston Duke",
   "Angela Bassett",
   "Danai Gurira",
   "Lupita Nyong'o",
   "Florence Kasumba",
   "Dominique Thorne",
   "Daniel Kaluuya",
   "Martin Freeman",
   "Michaela Coel",
   "Tenoch Huerta",
   "Dorothy Steel"
  ],
  "budget": 250000000,
  "gross": 859208836,
  "yt": "_Z3QKkl1WyM",
  "ytCh": "Marvel Entertainment"
 },
 "142": {
  "wd": "Q105359456",
  "en": "Ant-Man and the Wasp: Quantumania",
  "date": "2023-02-15",
  "runtime": 125,
  "director": [
   "Peyton Reed"
  ],
  "cast": [
   "Paul Rudd",
   "Evangeline Lilly",
   "Michael Douglas",
   "Michelle Pfeiffer",
   "Kathryn Newton",
   "Jonathan Majors",
   "Randall Park",
   "Bill Murray",
   "Gregg Turkington",
   "William Jackson Harper",
   "Corey Stoll",
   "Randall Park"
  ],
  "budget": 200000000,
  "gross": 476069301,
  "yt": "ZlNFpri-Y40",
  "ytCh": "Marvel Entertainment"
 },
 "143": {
  "wd": "Q29226331",
  "en": "Guardians of the Galaxy Vol. 3",
  "date": "2023-04-22",
  "runtime": 150,
  "director": [
   "James Gunn"
  ],
  "cast": [
   "Zoe Saldaña",
   "Dave Bautista",
   "Karen Gillan",
   "Pom Klementieff",
   "Vin Diesel",
   "Bradley Cooper",
   "Will Poulter",
   "Sylvester Stallone",
   "Sean Gunn",
   "Chuk Iwuji",
   "Michael Rosenbaum",
   "Daniela Melchior"
  ],
  "budget": 250000000,
  "gross": 845555777,
  "yt": "u3V5KDHRQvk",
  "ytCh": "Marvel Entertainment"
 },
 "144": {
  "wd": "Q89474225",
  "en": "The Marvels",
  "date": "2023-11-08",
  "runtime": 105,
  "director": [
   "Nia DaCosta"
  ],
  "cast": [
   "Brie Larson",
   "Teyonah Parris",
   "Iman Vellani",
   "Samuel L. Jackson",
   "Zawe Ashton",
   "Park Seo-joon",
   "Zenobia Shroff",
   "Mohan Kapur",
   "Saagar Shaikh",
   "Lashana Lynch",
   "Randall Park"
  ],
  "budget": 220000000,
  "gross": 206136557,
  "yt": "wS_qbDztgVY",
  "ytCh": "Marvel Entertainment"
 },
 "145": {
  "wd": "Q102180106",
  "en": "Deadpool & Wolverine",
  "date": "2024-07-24",
  "runtime": 128,
  "director": [],
  "cast": [
   "Ryan Reynolds",
   "Morena Baccarin",
   "Jennifer Garner",
   "Peggy",
   "Matthew Macfadyen",
   "Emma Corrin",
   "Rob Delaney",
   "Leslie Uggams",
   "Karan Soni",
   "Brianna Hildebrand",
   "Stefan Kapičić",
   "Shiori Kutsuna"
  ],
  "budget": 200000000,
  "gross": 1338073645,
  "yt": "73_1biulkYk",
  "ytCh": "Marvel Entertainment"
 },
 "146": {
  "wd": "Q112322116",
  "en": "Captain America: Brave New World",
  "date": "2025-02-12",
  "runtime": 118,
  "director": [
   "Julius Onah"
  ],
  "cast": [
   "Anthony Mackie",
   "Danny Ramirez",
   "Tim Blake Nelson",
   "Shira Haas",
   "Carl Lumbly",
   "Harrison Ford",
   "Liv Tyler",
   "Giancarlo Esposito",
   "Xosha Roquemore",
   "Jóhannes Haukur Jóhannesson",
   "Sebastian Stan"
  ],
  "budget": 180000000,
  "gross": null,
  "yt": "1pHDWnXmK7Y",
  "ytCh": "Marvel Entertainment"
 },
 "147": {
  "wd": "Q112322474",
  "en": "Thunderbolts*",
  "date": "2025-05-01",
  "runtime": 126,
  "director": [
   "Jake Schreier"
  ],
  "cast": [
   "Julia Louis-Dreyfus",
   "Olga Kurylenko",
   "Wyatt Russell",
   "David Harbour",
   "Hannah John-Kamen",
   "Sebastian Stan",
   "Florence Pugh",
   "Lewis Pullman",
   "Geraldine Viswanathan",
   "Chris Bauer",
   "Wendell Pierce"
  ],
  "budget": 180000000,
  "gross": null,
  "yt": "hUUszE29jS0",
  "ytCh": "Marvel Entertainment"
 },
 "148": {
  "wd": "Q105105219",
  "en": "The Fantastic Four: First Steps",
  "date": "2025-07-24",
  "runtime": 114,
  "director": [
   "Matt Shakman"
  ],
  "cast": [
   "Pedro Pascal",
   "Vanessa Kirby",
   "Ebon Moss-Bachrach",
   "Joseph Quinn",
   "Ralph Ineson",
   "Julia Garner",
   "Paul Walter Hauser",
   "John Malkovich",
   "Natasha Lyonne",
   "Mark Gatiss"
  ],
  "budget": 200000000,
  "gross": null,
  "yt": "pAsmrKyMqaA",
  "ytCh": "Marvel Entertainment"
 },
 "149": {
  "wd": "Q113244935",
  "en": "Spider-Man: Brand New Day",
  "date": "2026-07-29",
  "runtime": 145,
  "director": [
   "Destin Daniel Cretton"
  ],
  "cast": [
   "Jacob Batalon",
   "Liza Colón-Zayas",
   "Jon Bernthal",
   "Michael Mando",
   "Tramell Tillman",
   "Krondon",
   "Eman Esfandi",
   "Zabryna Guevara",
   "Olivia Booth-Ford",
   "Marisa Tomei",
   "Florence Pugh",
   "Taryn Marie Butler"
  ],
  "budget": 225000000,
  "gross": null,
  "yt": "daXaTug8rL4",
  "ytCh": "Marvel Entertainment"
 },
 "150": {
  "yt": "irVNGjRFZGk",
  "ytCh": "Marvel Entertainment"
 }
};
