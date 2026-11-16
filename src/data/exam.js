// General exam review content. Not the official coverage of any specific exam.
// Resource types: F = Google Form quiz, Y = YouTube video, D = Google Drive folder, P = ProProfs quiz.
export const RES={F:id=>"https://docs.google.com/forms/d/e/"+id+"/viewform",Y:id=>"https://youtu.be/"+id,D:id=>"https://drive.google.com/drive/folders/"+id,P:id=>"https://www.proprofs.com/quiz-school/story.php?title="+id};
export const RES_LABEL={F:"Practice quiz (Google Form)",Y:"Video review",D:"Reviewer files (Google Drive)",P:"Practice quiz (ProProfs)"};
export const examSubjects=[
{id:"math",name:"Mathematics",topics:[
 {id:"m1",title:"Arithmetic",notes:"Fractions, decimals, percent, ratio and proportion. Convert to one form before you compare.",formulas:["Percent of a number = (percent / 100) x number"],q:{text:"What is 15% of 240?",choices:["24","30","36","40"],answer:2}},
 {id:"m2",title:"Algebra",notes:"Solve linear equations, factor expressions, and use the quadratic formula.",formulas:["x = (-b +/- sqrt(b^2 - 4ac)) / 2a"],q:{text:"Solve 2x + 7 = 19.",choices:["x = 5","x = 6","x = 8","x = 13"],answer:1}},
 {id:"m3",title:"Geometry",notes:"Areas, perimeters, volumes, angles and the Pythagorean theorem.",formulas:["Circle area = pi r^2","Triangle area = 1/2 x base x height","a^2 + b^2 = c^2"],q:{text:"A right triangle has legs 6 and 8. How long is the hypotenuse?",choices:["9","10","12","14"],answer:1}},
 {id:"m4",title:"Trigonometry",notes:"Right-triangle ratios and common angle values.",formulas:["sin = opposite / hypotenuse","cos = adjacent / hypotenuse","tan = opposite / adjacent"],q:{text:"What is sin 30 degrees?",choices:["1/2","sqrt(3)/2","1","0"],answer:0}},
 {id:"m5",title:"Statistics",notes:"Mean, median, mode and range. Order the data before finding the median.",formulas:["Mean = sum of values / number of values"],q:{text:"What is the mean of 4, 8, 6, 10, 12?",choices:["6","7","8","9"],answer:2}},
 {id:"m6",title:"Word problems",notes:"Underline what is asked, define a variable, write an equation, then check units.",formulas:["Distance = rate x time"],q:{text:"A car travels at 60 km/h for 2.5 hours. How far does it go?",choices:["120 km","140 km","150 km","160 km"],answer:2}}],
 res:[["F","1FAIpQLScDGLlItQSL58UAhERncte0iEg8SHw9Kg6YdhQfHZ5VENrQqQ"],["D","1icluEQ7LQgAxPyv0E8_piv9Vvf7nCISZ"],["Y","KV3h1bDiTQw"],["Y","eXWheBBcmGU"],["F","1FAIpQLSdGyNtH_5JHGfLmREtvX8VzwhW2RjUCuKQrwegql4R73dyBug"],["P","upcat-simulated-exam-math"]]},
{id:"eng",name:"English",topics:[
 {id:"e1",title:"Grammar",notes:"Subject-verb agreement, verb tense, pronouns, and punctuation.",formulas:[],q:{text:"The list of items ___ on the desk.",choices:["are","is","were","be"],answer:1}},
 {id:"e2",title:"Vocabulary",notes:"Use context clues, word roots, prefixes and suffixes. Learn synonyms and antonyms in pairs.",formulas:[],q:{text:"Which word is closest in meaning to 'meticulous'?",choices:["careless","careful and precise","quick","angry"],answer:1}},
 {id:"e3",title:"Reading comprehension",notes:"Find the main idea first, then supporting details, tone, and what the author implies. Reread the question before choosing.",formulas:[]},
 {id:"e4",title:"Sentence structure",notes:"Watch for run-ons, fragments and faulty parallelism.",formulas:[],q:{text:"Which sentence is parallel?",choices:["She likes swimming, to run, and biking.","She likes swimming, running, and biking.","She likes to swim, running, and bike.","She likes swim, run, and bike."],answer:1}}],
 res:[["F","1FAIpQLSe-R5y1fEgQ5rRSssJ9RS2DFJPesssV-lXrcVbLiq0oEbdpCw"],["F","1FAIpQLSf1FdiFvawba2ZxjwPKXbtPkHssbYBrjN3AZik97EC63nG_tw"],["F","1FAIpQLSemq70oSL8NEp2Dfm73iMXeadklRxIbPdyRWXHXU96qIvSUVQ"],["Y","KqK8oKsP2fM"],["Y","YteuZ-32Vxc"]]},
{id:"sci",name:"Science",topics:[
 {id:"s1",title:"Biology",notes:"Cell parts and functions, genetics basics, the human body systems, and ecology.",formulas:[],q:{text:"Which organelle produces most of the cell's ATP?",choices:["Nucleus","Ribosome","Mitochondrion","Golgi body"],answer:2}},
 {id:"s2",title:"Chemistry",notes:"Atomic structure, the periodic table, bonding, and balancing equations.",formulas:[],q:{text:"The atomic number of an element equals its number of...",choices:["neutrons","protons","electrons plus neutrons","isotopes"],answer:1}},
 {id:"s3",title:"Physics",notes:"Motion, Newton's laws, work and energy, and basic electricity.",formulas:["v = d / t","F = m x a"],q:{text:"What force acts on a 5 kg object accelerating at 3 m/s^2?",choices:["8 N","10 N","15 N","20 N"],answer:2}},
 {id:"s4",title:"Earth science",notes:"Earth's layers, plate tectonics, weather and climate, and the solar system.",formulas:[],q:{text:"What is the outermost layer of the Earth?",choices:["Core","Mantle","Crust","Outer core"],answer:2}}],
 res:[["F","1FAIpQLSd5OgZeMrZP-epK2g-ARNIbRbX6c2bo7M5wBkirrZxe0NoXXA"],["F","1FAIpQLSdCtR_jkR-tujQWiQ0dfxeWAqxyK5Rx7EfDm_IRTJiL3aBNjg"],["F","1FAIpQLSc7x0keOPKdbcqJCzjuIzZHjjdFMopxhLGtjXk-SeVlKLU87Q"],["F","1FAIpQLSepETyXafyWQVVpZap-bw8JcB_PJ2r3YhE1gY25m17E4fYS-w"],["F","1FAIpQLScr4QQQMYeBY_kHhMJs_KLGteymt2AZ2tAQ28HqQYCuOD4fig"]]},
{id:"abs",name:"Logical and Abstract Reasoning",topics:[
 {id:"a1",title:"Patterns",notes:"Look for repeating shapes, rotation, shading, and growth between figures.",formulas:[],q:{text:"What comes next: 2, 4, 8, 16, ?",choices:["24","30","32","36"],answer:2}},
 {id:"a2",title:"Number sequences",notes:"Check the difference between terms (arithmetic) or the ratio (geometric).",formulas:[],q:{text:"What comes next: 5, 9, 13, 17, ?",choices:["19","20","21","22"],answer:2}},
 {id:"a3",title:"Analogies",notes:"State the relationship in one sentence, then apply it to the second pair.",formulas:[],q:{text:"Bird is to fly as fish is to...",choices:["water","swim","scales","fin"],answer:1}},
 {id:"a4",title:"Spatial reasoning",notes:"Practice mental rotation, paper folding, and matching a flat net to a solid.",formulas:[]}],
 res:[["Y","59fg7ryDK9Q"],["Y","jQevEpmreAQ"],["Y","VlXDLPMAOh4"],["Y","ua0epYVQZKw"],["Y","Oj_DVoboryk"]]},
{id:"gen",name:"General Information",topics:[
 {id:"g1",title:"Current events",notes:"Only some exams cover this. Follow reliable news and note major national and world events."},
 {id:"g2",title:"General knowledge",notes:"Philippine government, geography, history, and basic world facts. Check the exam announcement to see if it is included."}],
 res:[["F","1FAIpQLSclHK2vgL5dVUtJBNZ170GhI8_zDZSGMpoC2lHh3oYv3tymLA"],["F","1FAIpQLScA7CWo5AjxkeyPJo4e1aTUdCvt8PuCjeKDFtY6FS9rHPZX5Q"],["Y","y-rlGYIli84"],["Y","9kkhub4-kUE"],["Y","fhiPpMCRpkM"]]},
{id:"mix",name:"Mixed Reviewers",topics:[],
 res:[["D","1M7MvEUog2PCzqzfuR7pt6Ve9vo0A3oem"],["D","1PtI8SwJ26Vt66GOFzVf5buwQ3vihcIbt"],["D","1JDup1u9OIDwuSsbiJQtODVPdxlg-ZIAL"],["D","1kSUOLwRDbSLosU9dd127bmgU0ZicFt9E"],["D","1nzogkBMTOuWT6D5mnjRRleh7KxJR8vtA"]]}
];
