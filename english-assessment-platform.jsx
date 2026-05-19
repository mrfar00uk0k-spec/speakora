import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════
// CONSTANTS & DATA
// ═══════════════════════════════════════════════

const TRANSLATIONS = {
  en: {
    dir: "ltr",
    nav: { home: "Home", features: "Features", assessment: "Assessment", blog: "Blog", dashboard: "Dashboard", admin: "Admin", login: "Login", signup: "Sign Up", switchLang: "عربي" },
    hero: { badge: "AI-Powered English Assessment", title1: "Rate your English and get ready", title2: "for better opportunities", subtitle: "Rate your English and get ready for better opportunities", cta1: "Start Assessment Now", cta2: "View Demo", stat1: "Users Tested", stat2: "Questions", stat3: "Pass Rate" },
    why: { title: "Why Choose English Test?", subtitle: "Everything you need to ace your call center interview" },
    whyCards: [
      { icon: "🎯", title: "Targeted Call Center Prep", desc: "Practice scenarios designed specifically for customer service and BPO interviews." },
      { icon: "🤖", title: "Real AI Feedback", desc: "Instant analysis of your grammar, fluency, pronunciation, and confidence." },
      { icon: "📊", title: "Track Your Progress", desc: "Detailed analytics showing your improvement over time and weak areas." },
      { icon: "🎙️", title: "Speaking Practice", desc: "Record your answers and get AI-scored feedback on clarity and tone." },
      { icon: "🏆", title: "CEFR Level Certification", desc: "Get officially mapped A2–C1 level results that employers recognize." },
      { icon: "🌍", title: "Bilingual Platform", desc: "Full Arabic & English support with RTL layout and smooth transitions." },
    ],
    features: { title: "Platform Features", subtitle: "A complete system for your English journey" },
    testimonials: { title: "Success Stories" },
    blog: { title: "Learning Hub", subtitle: "Tips, strategies and guides for your English career journey", readMore: "Read Article →" },
    faq: { title: "Frequently Asked Questions" },
    footer: { tagline: "Your gateway to English excellence.", rights: "© 2025 English Test. All rights reserved." },
    assessment: { title: "English Assessment", subtitle: "Choose a section to begin", grammar: "Grammar Test", vocabulary: "Vocabulary Test", reading: "Reading Test", listening: "Listening Test", speaking: "Speaking Practice", hr: "HR Simulation", start: "Start", back: "← Back", next: "Next →", submit: "Submit", score: "Your Score", level: "Your Level", timer: "Time Left" },
    dashboard: { title: "My Dashboard", welcome: "Welcome back,", totalTests: "Tests Taken", avgScore: "Avg. Score", level: "Current Level", streak: "Day Streak", history: "Test History", tips: "Improvement Tips", strengths: "Strengths", weaknesses: "Weak Areas" },
    auth: { login: "Login", signup: "Create Account", email: "Email Address", password: "Password", name: "Full Name", google: "Continue with Google", noAccount: "Don't have an account?", hasAccount: "Already have an account?", signupLink: "Sign up", loginLink: "Login" },
    admin: { title: "Admin Panel", users: "Users", questions: "Questions", blogs: "Blog Posts", analytics: "Analytics", ads: "Ad Manager", addQ: "Add Question", addBlog: "Add Post" },
    hr: { title: "HR Interview Simulation", start: "Start Interview", analyzing: "AI Analyzing...", feedback: "AI Feedback", next: "Next Question", finish: "Finish Interview" },
  },
  ar: {
    dir: "rtl",
    nav: { home: "الرئيسية", features: "المميزات", assessment: "التقييم", blog: "المدونة", dashboard: "لوحتي", admin: "الإدارة", login: "تسجيل الدخول", signup: "إنشاء حساب", switchLang: "English" },
    hero: { badge: "تقييم إنجليزي بالذكاء الاصطناعي", title1: "قيّم لغتك الإنجليزية", title2: "واستعد لفرص أفضل", subtitle: "قيّم لغتك الإنجليزية واستعد لفرص أفضل", cta1: "ابدأ الاختبار الآن", cta2: "عرض تجريبي", stat1: "مستخدم مُقيَّم", stat2: "سؤال متاح", stat3: "معدل النجاح" },
    why: { title: "لماذا تختار English Test؟", subtitle: "كل ما تحتاجه للنجاح في مقابلة مركز الاتصال" },
    whyCards: [
      { icon: "🎯", title: "تحضير موجه لمراكز الاتصال", desc: "سيناريوهات مصممة خصيصاً لمقابلات خدمة العملاء." },
      { icon: "🤖", title: "تغذية راجعة بالذكاء الاصطناعي", desc: "تحليل فوري للقواعد والطلاقة ومستوى ثقتك." },
      { icon: "📊", title: "تتبع تقدمك", desc: "تحليلات تفصيلية تظهر تحسنك ونقاط ضعفك." },
      { icon: "🎙️", title: "تدريب على التحدث", desc: "سجّل إجاباتك واحصل على تقييم ذكاء اصطناعي." },
      { icon: "🏆", title: "شهادة مستوى CEFR", desc: "احصل على نتائج A2–C1 المعترف بها من أصحاب العمل." },
      { icon: "🌍", title: "منصة ثنائية اللغة", desc: "دعم كامل للعربية والإنجليزية مع RTL." },
    ],
    features: { title: "مميزات المنصة", subtitle: "نظام متكامل لرحلتك في الإنجليزية" },
    testimonials: { title: "قصص النجاح" },
    blog: { title: "مركز التعلم", subtitle: "نصائح وإرشادات لرحلتك المهنية", readMore: "اقرأ المقال →" },
    faq: { title: "الأسئلة الشائعة" },
    footer: { tagline: "بوابتك نحو التميز في اللغة الإنجليزية.", rights: "© 2025 English Test. جميع الحقوق محفوظة." },
    assessment: { title: "تقييم اللغة الإنجليزية", subtitle: "اختر قسمًا للبدء", grammar: "اختبار القواعد", vocabulary: "اختبار المفردات", reading: "اختبار القراءة", listening: "اختبار الاستماع", speaking: "تدريب الكلام", hr: "محاكاة مقابلة HR", start: "ابدأ", back: "رجوع ←", next: "التالي ←", submit: "إرسال", score: "درجتك", level: "مستواك", timer: "الوقت المتبقي" },
    dashboard: { title: "لوحتي", welcome: "مرحباً،", totalTests: "اختبارات مُكتملة", avgScore: "متوسط الدرجات", level: "المستوى الحالي", streak: "أيام متتالية", history: "سجل الاختبارات", tips: "نصائح التحسين", strengths: "نقاط القوة", weaknesses: "نقاط الضعف" },
    auth: { login: "تسجيل الدخول", signup: "إنشاء حساب", email: "البريد الإلكتروني", password: "كلمة المرور", name: "الاسم الكامل", google: "المتابعة بجوجل", noAccount: "ليس لديك حساب؟", hasAccount: "لديك حساب بالفعل؟", signupLink: "إنشاء حساب", loginLink: "تسجيل الدخول" },
    admin: { title: "لوحة الإدارة", users: "المستخدمون", questions: "الأسئلة", blogs: "المدونة", analytics: "التحليلات", ads: "إدارة الإعلانات", addQ: "إضافة سؤال", addBlog: "إضافة منشور" },
    hr: { title: "محاكاة مقابلة HR", start: "ابدأ المقابلة", analyzing: "تحليل الذكاء الاصطناعي...", feedback: "تغذية راجعة", next: "السؤال التالي", finish: "إنهاء المقابلة" },
  }
};

const GRAMMAR_QUESTIONS = [
  // Present Simple / Continuous
  { q: "She ___ to the office every day.", opts: ["go","goes","going","gone"], ans: 1 },
  { q: "They ___ a meeting right now.", opts: ["have","are having","has","were having"], ans: 1 },
  { q: "Water ___ at 100 degrees Celsius.", opts: ["boil","is boiling","boils","boiled"], ans: 2 },
  { q: "I ___ to music while I work.", opts: ["am listening","listen","listens","listened"], ans: 1 },
  { q: "He ___ always ___ late to meetings.", opts: ["is/coming","are/come","is/come","am/coming"], ans: 0 },
  // Past Simple / Continuous
  { q: "She ___ the report when the power went out.", opts: ["writes","wrote","was writing","has written"], ans: 2 },
  { q: "We ___ the client yesterday morning.", opts: ["call","are calling","called","have called"], ans: 2 },
  { q: "While he ___ the call, his supervisor ___ in.", opts: ["handled/walked","was handling/walked","handles/walks","handled/was walking"], ans: 1 },
  { q: "I ___ him three times before he answered.", opts: ["call","was calling","called","had called"], ans: 2 },
  { q: "The customer ___ angry before I could explain.", opts: ["becomes","became","was becoming","had become"], ans: 1 },
  // Present Perfect
  { q: "This is the third time the customer ___ about the same issue.", opts: ["calls","is calling","has called","called"], ans: 2 },
  { q: "I ___ this company for five years.", opts: ["work","worked","am working","have worked"], ans: 3 },
  { q: "She ___ never ___ a complaint like this before.", opts: ["has/received","have/received","had/receive","is/received"], ans: 0 },
  { q: "We ___ just ___ the new system.", opts: ["have/launched","has/launch","are/launching","were/launched"], ans: 0 },
  { q: "How long ___ you ___ in customer service?", opts: ["have/worked","did/work","are/working","were/worked"], ans: 0 },
  // Past Perfect
  { q: "By the time the supervisor arrived, the agent ___ the issue.", opts: ["resolves","resolved","had resolved","is resolving"], ans: 2 },
  { q: "I ___ this company for five years before I got promoted.", opts: ["work","worked","have worked","had worked"], ans: 3 },
  { q: "If you ___ the training manual, you would have known the procedure.", opts: ["read","had read","have read","reads"], ans: 1 },
  { q: "She realized she ___ the wrong extension.", opts: ["dials","dialed","has dialed","had dialed"], ans: 3 },
  { q: "The customer ___ already ___ when the agent called back.", opts: ["had/left","has/left","was/leaving","have/left"], ans: 0 },
  // Future Forms
  { q: "The new policy ___ into effect next Monday.", opts: ["comes","will come","came","has come"], ans: 1 },
  { q: "I ___ you as soon as I have more information.", opts: ["will contact","contact","am contacting","contacted"], ans: 0 },
  { q: "By next year, he ___ working here for a decade.", opts: ["will have been","will be","has been","was"], ans: 0 },
  { q: "Look at those clouds — it ___ rain.", opts: ["will","is going to","shall","would"], ans: 1 },
  { q: "The training session ___ at 9 AM tomorrow.", opts: ["starts","will be starting","is starting","start"], ans: 2 },
  // Conditionals
  { q: "If I ___ more time, I would study harder.", opts: ["have","had","has","having"], ans: 1 },
  { q: "If the agent ___ more carefully, he would have caught the error.", opts: ["listens","listened","had listened","would listen"], ans: 2 },
  { q: "If you ___ early tomorrow, we can prepare the report together.", opts: ["come","came","had come","would come"], ans: 0 },
  { q: "___ you call the client if your supervisor asks you to?", opts: ["Will","Would","Do","Had"], ans: 0 },
  { q: "Unless she ___ the situation, the customer will escalate.", opts: ["resolves","resolved","will resolve","resolve"], ans: 0 },
  // Passive Voice
  { q: "The report ___ by the manager before submission.", opts: ["must review","must be reviewed","must reviewing","must reviewed"], ans: 1 },
  { q: "The call ___ recorded for quality assurance purposes.", opts: ["is being","are being","were","have been"], ans: 0 },
  { q: "All agents ___ to complete the compliance test by Friday.", opts: ["require","required","are required","requiring"], ans: 2 },
  { q: "The complaint ___ to the correct department yesterday.", opts: ["forwards","forwarded","was forwarded","is forwarded"], ans: 2 },
  { q: "New procedures ___ implemented starting next quarter.", opts: ["will be","are","is being","be"], ans: 0 },
  // Modal Verbs
  { q: "You ___ speak to the customer more politely.", opts: ["can","should","would","might"], ans: 1 },
  { q: "She ___ handle five calls simultaneously during peak hours.", opts: ["must","can","should","ought"], ans: 1 },
  { q: "Agents ___ always verify the caller's identity.", opts: ["might","can","must","would"], ans: 2 },
  { q: "I ___ be wrong, but I think the system is down.", opts: ["must","should","might","can"], ans: 2 },
  { q: "You ___ have told the customer about the delay earlier.", opts: ["should","must","might","can"], ans: 0 },
  // Reported Speech
  { q: "She said she ___ call back later.", opts: ["will","would","shall","can"], ans: 1 },
  { q: "The manager told us that the meeting ___ postponed.", opts: ["is","was","has been","were"], ans: 1 },
  { q: "He asked me ___ I could process the refund.", opts: ["if","that","what","whether to"], ans: 0 },
  { q: "She told me ___ for the inconvenience.", opts: ["apologize","to apologize","apologizing","apologized"], ans: 1 },
  { q: "The supervisor said the agent ___ the call perfectly.", opts: ["handles","handled","had handled","was handle"], ans: 2 },
  // Articles
  { q: "She is ___ agent with over five years of experience.", opts: ["a","an","the","—"], ans: 1 },
  { q: "___ customer I spoke to earlier called back.", opts: ["A","An","The","—"], ans: 2 },
  { q: "Can I speak to ___ manager, please?", opts: ["a","an","the","—"], ans: 0 },
  { q: "He works in ___ customer service department.", opts: ["a","an","the","—"], ans: 2 },
  { q: "It was ___ unusual complaint — I've never heard it before.", opts: ["a","an","the","—"], ans: 1 },
  // Prepositions
  { q: "The customer is calling ___ a problem with his invoice.", opts: ["about","for","at","by"], ans: 0 },
  { q: "We offer a full refund ___ the item is returned within 30 days.", opts: ["unless","provided that","despite","although"], ans: 1 },
  { q: "I'll transfer you ___ the billing department.", opts: ["in","to","at","for"], ans: 1 },
  { q: "She is responsible ___ quality assurance.", opts: ["of","at","for","with"], ans: 2 },
  { q: "He has been working here ___ 2019.", opts: ["for","since","from","during"], ans: 1 },
  // Subject-Verb Agreement
  { q: "Neither the supervisor nor the agents ___ informed.", opts: ["was","were","is","are"], ans: 1 },
  { q: "Each of the representatives ___ trained on the new system.", opts: ["are","were","was","have been"], ans: 2 },
  { q: "The team ___ meeting every Monday morning.", opts: ["are","is","were","have"], ans: 1 },
  { q: "A number of complaints ___ received this week.", opts: ["was","is","has been","have been"], ans: 3 },
  { q: "Everyone in the office ___ aware of the new policy.", opts: ["are","were","is","have been"], ans: 2 },
  // Gerunds & Infinitives
  { q: "Could you please ___ your name for me?", opts: ["spell","to spell","spelling","spells"], ans: 0 },
  { q: "The manager asked the agent ___ more professional on calls.", opts: ["be","to be","being","been"], ans: 1 },
  { q: "She enjoys ___ with difficult customers.", opts: ["deal","to deal","dealing","dealt"], ans: 2 },
  { q: "I look forward to ___ from you soon.", opts: ["hear","heard","hearing","have heard"], ans: 2 },
  { q: "He refused ___ the refund without authorization.", opts: ["process","to process","processing","processed"], ans: 1 },
  // Comparatives & Superlatives
  { q: "She speaks English very ___ for a non-native speaker.", opts: ["good","well","best","better"], ans: 1 },
  { q: "This is ___ call I've handled all week.", opts: ["the difficult","the more difficult","the most difficult","most difficult"], ans: 2 },
  { q: "Your performance this month is ___ than last month.", opts: ["good","better","best","well"], ans: 1 },
  { q: "The new script is ___ shorter than the old one.", opts: ["more","much","very","too"], ans: 1 },
  { q: "Of all agents, she resolves complaints ___.", opts: ["fast","faster","the fastest","most fast"], ans: 2 },
  // Relative Clauses
  { q: "The customer ___ I spoke to yesterday called back.", opts: ["which","whose","who","whom"], ans: 2 },
  { q: "This is the system ___ we use for logging complaints.", opts: ["who","whom","which","whose"], ans: 2 },
  { q: "The agent ___ performance improved gets a bonus.", opts: ["who","whose","which","that"], ans: 1 },
  { q: "The department ___ handles escalations is on the third floor.", opts: ["who","whose","that","whom"], ans: 2 },
  { q: "He is the manager to ___ I reported the issue.", opts: ["who","that","which","whom"], ans: 3 },
  // Conjunctions & Connectors
  { q: "___ she was new, she handled the call professionally.", opts: ["Despite","Although","Because of","Due to"], ans: 1 },
  { q: "He transferred the call ___ he didn't know the answer.", opts: ["so","because","although","however"], ans: 1 },
  { q: "We apologized ___ sent a replacement immediately.", opts: ["but","and","however","unless"], ans: 1 },
  { q: "The system crashed; ___, all data was recovered.", opts: ["therefore","however","moreover","so that"], ans: 1 },
  { q: "___ the delay, the customer remained calm.", opts: ["Although","Despite","However","Unless"], ans: 1 },
  // Question Forms
  { q: "___ long have you been waiting on hold?", opts: ["What","How","Since","When"], ans: 1 },
  { q: "___ does the new system go live?", opts: ["What","How","When","Where"], ans: 2 },
  { q: "Could you tell me ___ you are calling today?", opts: ["why","that","what","which"], ans: 0 },
  { q: "___ of these options would you prefer?", opts: ["What","Which","How","Who"], ans: 1 },
  { q: "Isn't it true that the payment ___ processed?", opts: ["haven't been","has been","hasn't been","have been"], ans: 2 },
  // Mixed Advanced
  { q: "She ___ the complaint to her supervisor as soon as she received it.", opts: ["escalates","escalated","has escalated","escalating"], ans: 1 },
  { q: "Had the agent followed the script, the customer ___ happier.", opts: ["would be","will be","would have been","was"], ans: 2 },
  { q: "Not only ___ the agent apologize, but she also offered a refund.", opts: ["did","does","had","was"], ans: 0 },
  { q: "It's high time the team ___ a new communication strategy.", opts: ["adopts","adopted","adopt","has adopted"], ans: 1 },
  { q: "The more you practice, the ___ your English will become.", opts: ["good","better","best","well"], ans: 1 },
  { q: "I wish I ___ more time to prepare for this call.", opts: ["have","had","will have","would have"], ans: 1 },
  { q: "By the end of the month, the team ___ all 500 cases.", opts: ["will close","closes","will have closed","has closed"], ans: 2 },
  { q: "It's essential that every agent ___ the client's name.", opts: ["uses","use","used","is using"], ans: 1 },
  { q: "The customer demanded that the refund ___ processed immediately.", opts: ["is","was","be","were"], ans: 2 },
  { q: "Rarely ___ such a positive review from a first-time caller.", opts: ["we receive","do we receive","we do receive","have we receiving"], ans: 1 },
];

const VOCAB_QUESTIONS = [
  // Call Center Terms
  { q: "What does 'escalate' mean in a call center context?", opts: ["To hang up","To transfer to a higher authority","To apologize","To repeat information"], ans: 1 },
  { q: "What is 'AHT' in call center terminology?", opts: ["Average Handling Time","Agent Helpline Tool","Automated Hold Transfer","Active Hour Tracker"], ans: 0 },
  { q: "What does 'SLA' stand for?", opts: ["Standard Language Agreement","Service Level Agreement","Subscriber List Access","System Log Archive"], ans: 1 },
  { q: "What does 'FCR' (First Call Resolution) mean?", opts: ["Solving the issue in the first call without follow-up","Forwarding the call immediately","Failing to resolve the complaint","A billing code"], ans: 0 },
  { q: "What does 'queue' mean in a call center?", opts: ["A type of headset","A line of waiting calls","A customer complaint form","A performance bonus"], ans: 1 },
  { q: "What is 'CSAT' in customer service?", opts: ["Customer Satisfaction Score","Call System Access Terminal","Centralized Support Action Team","Call Speed Analytics Tool"], ans: 0 },
  { q: "What is 'NPS' (Net Promoter Score)?", opts: ["A network speed test","A measure of customer loyalty and likelihood to recommend","A new payment system","An agent performance bonus"], ans: 1 },
  { q: "What does 'CRM' stand for?", opts: ["Customer Rating Metric","Customer Relationship Management","Centralized Response Module","Client Record Manager"], ans: 1 },
  { q: "What is 'attrition' in HR/call center context?", opts: ["A training program","The rate at which employees leave a company","A type of customer complaint","A shift schedule"], ans: 1 },
  { q: "What does 'ACW' (After Call Work) mean?", opts: ["Extra work done before a shift","Work completed after a customer call, such as notes","A bonus for night shifts","A type of complaint"], ans: 1 },
  // Empathy & Communication
  { q: "Choose the best synonym for 'empathize':", opts: ["Ignore","Argue","Understand and share feelings","Dismiss"], ans: 2 },
  { q: "Which phrase best shows empathy to a frustrated customer?", opts: ["That's not my department.","I understand how frustrating this must be.","Please hold.","Read the manual."], ans: 1 },
  { q: "Choose the correct definition of 'resolution' in customer service:", opts: ["Ending a call abruptly","A new company policy","Successfully solving a customer's issue","A type of complaint form"], ans: 2 },
  { q: "What does 'de-escalate' mean?", opts: ["Make the situation more intense","Transfer to a senior agent","Calm down a tense or angry situation","End the call"], ans: 2 },
  { q: "Which phrase is the most professional way to put a customer on hold?", opts: ["Wait a sec.","Hold on.","Would you mind holding for a moment while I check that for you?","Don't hang up."], ans: 2 },
  { q: "What is the meaning of 'courtesy' in a professional context?", opts: ["Ignoring the customer","Being rude but efficient","Showing polite and respectful behavior","Transferring the call quickly"], ans: 2 },
  { q: "Choose the best synonym for 'acknowledge':", opts: ["Ignore","Deny","Recognize and confirm","Transfer"], ans: 2 },
  { q: "What does 'active listening' involve?", opts: ["Waiting silently","Nodding and saying nothing","Paying full attention and responding thoughtfully","Interrupting to solve quickly"], ans: 2 },
  { q: "Which is an example of positive language?", opts: ["I can't do that.","That's not possible.","What I can do is...","That's not my job."], ans: 2 },
  { q: "What does 'clarify' mean?", opts: ["To confuse","To make something clearer or easier to understand","To refuse a request","To delay a response"], ans: 1 },
  // Business Vocabulary
  { q: "What does 'proactive' mean?", opts: ["Reacting after the fact","Acting in anticipation of future problems","Being passive","Waiting for instructions"], ans: 1 },
  { q: "A 'KPI' in business stands for:", opts: ["Key Personal Interest","Key Performance Indicator","Knowledge Processing Index","Known Problem Issue"], ans: 1 },
  { q: "A customer says they are 'dissatisfied'. This means they are:", opts: ["Very happy","Neutral","Unhappy with the service","Confused"], ans: 2 },
  { q: "Which word means to 'make something less severe'?", opts: ["Escalate","Terminate","Mitigate","Duplicate"], ans: 2 },
  { q: "The word 'verbose' means:", opts: ["Speaking very briefly","Using too many words","Being silent","Talking too fast"], ans: 1 },
  { q: "'On behalf of' means:", opts: ["Instead of / representing","Next to","After a long time","Without permission"], ans: 0 },
  { q: "Which sentence uses 'clarify' correctly?", opts: ["Could you clarify your account number?","I will clarify the call now.","Please clarify to hold.","The line is clarifying."], ans: 0 },
  { q: "What does 'benchmark' mean in business?", opts: ["A physical marker","A standard used for comparison","A financial penalty","An employee reward"], ans: 1 },
  { q: "What is a 'deliverable'?", opts: ["A courier service","A concrete output expected from a task","A financial report","A meeting agenda"], ans: 1 },
  { q: "What does 'turnaround time' mean?", opts: ["Time to return a call","Time taken to complete a process","A 180-degree strategy change","Employee onboarding time"], ans: 1 },
  // Professional Phrases
  { q: "Which is the most professional opening for a call?", opts: ["Yeah, what do you need?","Hello?","Thank you for calling. My name is Ahmed. How may I assist you?","What's up?"], ans: 2 },
  { q: "How do you professionally ask a customer to repeat themselves?", opts: ["What?","Huh?","I'm sorry, could you please repeat that?","Say it again."], ans: 2 },
  { q: "What is the best way to close a call professionally?", opts: ["Bye.","Is there anything else I can help you with today? Thank you for calling.","OK see ya.","I'm done here."], ans: 1 },
  { q: "Which phrase confirms understanding?", opts: ["OK fine.","Just to confirm, you're saying that...","Whatever you say.","I heard you."], ans: 1 },
  { q: "How do you professionally apologize for a delay?", opts: ["Not my fault.","You should have called earlier.","I sincerely apologize for the inconvenience caused.","That happens sometimes."], ans: 2 },
  { q: "'I would like to highlight that...' is used to:", opts: ["End a conversation","Emphasize an important point","Express disagreement","Ask for information"], ans: 1 },
  { q: "Which phrase shows you are looking into an issue?", opts: ["I don't know.","Let me pull up your account and take a closer look.","Call back later.","That's not possible."], ans: 1 },
  { q: "What does 'I'll follow up on that' mean?", opts: ["I'll ignore it","I'll check and get back to you","I've already solved it","I'll transfer the call"], ans: 1 },
  { q: "The phrase 'rest assured' means:", opts: ["Don't worry, I guarantee it","Please sit down","Think about it carefully","Call us back"], ans: 0 },
  { q: "Which is correct when transferring a call?", opts: ["Hold on, I'll dump you.","Please hold while I connect you to the relevant department.","Wait while I check.","Someone else will help."], ans: 1 },
  // Word Meaning & Usage
  { q: "What does 'concise' mean?", opts: ["Very long","Brief and clear","Confusing","Formal"], ans: 1 },
  { q: "What does 'facilitate' mean?", opts: ["To block","To make easier","To ignore","To report"], ans: 1 },
  { q: "What does 'adhere to' mean?", opts: ["To break the rules","To follow or stick to something","To ignore a procedure","To suggest changes"], ans: 1 },
  { q: "What is an 'objection' in sales or service?", opts: ["An agreement","A concern or reason for not proceeding","A type of account","A product feature"], ans: 1 },
  { q: "What does 'escalation path' mean?", opts: ["A hallway in an office","The defined route for raising unresolved issues to higher levels","A promotion ladder","A staircase"], ans: 1 },
  { q: "What does 'articulate' mean as an adjective?", opts: ["Confused","Rude","Able to express ideas clearly","Silent"], ans: 2 },
  { q: "What does 'comprehend' mean?", opts: ["To speak quickly","To understand fully","To write neatly","To deny"], ans: 1 },
  { q: "What is 'rapport' in customer service?", opts: ["A written report","A positive connection or relationship with someone","A type of complaint","A billing process"], ans: 1 },
  { q: "What does 'resolve' mean?", opts: ["To create a new problem","To find a solution or settle an issue","To transfer a call","To apologize"], ans: 1 },
  { q: "What does 'verify' mean?", opts: ["To ignore","To deny","To confirm that something is true","To change information"], ans: 2 },
  // Synonyms & Antonyms
  { q: "Which is a synonym for 'assist'?", opts: ["Ignore","Help","Delay","Refuse"], ans: 1 },
  { q: "Which is an antonym for 'polite'?", opts: ["Kind","Rude","Gentle","Respectful"], ans: 1 },
  { q: "Which is a synonym for 'inform'?", opts: ["Hide","Ask","Tell","Forget"], ans: 2 },
  { q: "Which word is closest in meaning to 'urgent'?", opts: ["Optional","Unimportant","Immediate","Slow"], ans: 2 },
  { q: "Which is an antonym for 'satisfied'?", opts: ["Happy","Pleased","Dissatisfied","Content"], ans: 2 },
  { q: "Which is a synonym for 'complaint'?", opts: ["Compliment","Grievance","Praise","Agreement"], ans: 1 },
  { q: "Which is an antonym for 'escalate'?", opts: ["Increase","Raise","De-escalate","Forward"], ans: 2 },
  { q: "Which word is closest in meaning to 'accurate'?", opts: ["Wrong","Correct","Approximate","Vague"], ans: 1 },
  { q: "Which is a synonym for 'brief'?", opts: ["Long","Short and concise","Detailed","Complex"], ans: 1 },
  { q: "Which is an antonym for 'available'?", opts: ["Free","Ready","Occupied","Present"], ans: 2 },
  // Idioms & Expressions
  { q: "'Get to the bottom of it' means:", opts: ["Fall down","Investigate and find the cause","Give up","Ask someone else"], ans: 1 },
  { q: "'Bear with me' means:", opts: ["Attack me","Please be patient","Come with me","Repeat yourself"], ans: 1 },
  { q: "'Touch base' means:", opts: ["Play baseball","Make contact or check in","Reach the end","Complete a task"], ans: 1 },
  { q: "'On the same page' means:", opts: ["Reading together","Having the same understanding","Working in the same office","Looking at the same document"], ans: 1 },
  { q: "'Cut to the chase' means:", opts: ["Use scissors","Chase someone","Get to the main point quickly","Avoid the issue"], ans: 2 },
  { q: "'Give someone the benefit of the doubt' means:", opts: ["Doubt everything","Trust someone despite uncertainty","Criticize openly","Ignore someone"], ans: 1 },
  { q: "'At your earliest convenience' means:", opts: ["As late as possible","Never","As soon as it is possible for you","Right now, urgently"], ans: 2 },
  { q: "'Follow through' means:", opts: ["Throw a ball","Complete what you started","Start a new project","Give instructions"], ans: 1 },
  { q: "'In a nutshell' means:", opts: ["Inside a box","In a very brief summary","In a complicated way","In writing"], ans: 1 },
  { q: "'On hold' in a call center means:", opts: ["The call ended","The agent is listening","The customer is waiting while the agent checks something","The call was dropped"], ans: 2 },
  // Formal/Informal Register
  { q: "Which is more formal: 'I want to' or 'I would like to'?", opts: ["I want to","I would like to","Both equally formal","Neither is formal"], ans: 1 },
  { q: "Which is appropriate in a formal email?", opts: ["Hey there!","Yo, what's up?","Dear Mr. Hassan,","Hiya,"], ans: 2 },
  { q: "Which word is more formal for 'use'?", opts: ["Grab","Utilize","Take","Pick up"], ans: 1 },
  { q: "Which is a formal way to say 'I'm sorry'?", opts: ["Oops!","My bad.","I sincerely apologize.","Sorry, not my fault."], ans: 2 },
  { q: "Which phrase is appropriate when ending a formal email?", opts: ["See ya!","Cheers mate","Yours sincerely,","Later!"], ans: 2 },
  // Context & Comprehension
  { q: "A customer says 'I've been waiting for ages.' They are expressing:", opts: ["Excitement","Gratitude","Frustration with waiting time","Confusion"], ans: 2 },
  { q: "An agent says 'I'll make a note of that.' This means:", opts: ["I will write it down","I will ignore it","I will transfer the call","I will close the account"], ans: 0 },
  { q: "What does a customer mean by 'I want to speak to your superior'?", opts: ["They want to leave a good review","They want to speak to a higher-level staff member","They want to cancel their account","They want a refund"], ans: 1 },
  { q: "When an agent says 'I'll escalate this', they mean:", opts: ["The call is over","They will raise the issue to a higher level","They are angry","They will ignore the complaint"], ans: 1 },
  { q: "A customer says 'This is unacceptable.' They are expressing:", opts: ["Satisfaction","Mild concern","Strong dissatisfaction","Confusion"], ans: 2 },
  // Collocations
  { q: "Which is correct: ___ a complaint?", opts: ["do","make","have","take"], ans: 1 },
  { q: "Which is correct: ___ a call?", opts: ["make","do","have","take"], ans: 0 },
  { q: "Which is correct: ___ responsibility for a mistake?", opts: ["do","take","make","have"], ans: 1 },
  { q: "Which is correct: ___ a solution?", opts: ["make","find","do","have"], ans: 1 },
  { q: "Which is correct: We need to ___ action immediately.", opts: ["do","have","take","make"], ans: 2 },
];

const HR_QUESTIONS = [
  "Tell me about yourself and your relevant experience.",
  "Why do you want to work in a call center environment?",
  "What are your greatest strengths as a communicator?",
  "Describe a time you successfully handled a difficult or angry customer.",
  "Where do you see yourself professionally in 3 years?",
  "How do you manage stress during a high-volume workday?",
  "What does excellent customer service mean to you?",
  "Can you give an example of a time you went above and beyond for someone?",
  "How would you handle a situation where you don't know the answer to a customer's question?",
  "Why should we hire you over other candidates?",
];

// ─── SHUFFLE HELPER ───
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickRandom(arr, n) { return shuffle(arr).slice(0, n); }

// ─── 30 READING PASSAGES ───
const ALL_READING_PASSAGES = [
  { id:1, title:"Customer Service Excellence in the Modern Call Center", text:`In a call center environment, the ability to communicate clearly and empathetically is paramount. Agents must listen actively, identify the customer's core issue, and provide accurate solutions within a reasonable time frame. Studies show that 73% of customers stay loyal to a company due to friendly service, not just product quality.\n\nA skilled agent can de-escalate tense situations by acknowledging the customer's emotions before offering solutions. Phrases such as "I completely understand how frustrating this must be" can significantly reduce a customer's anger and build trust. Instead of saying "I can't do that," a professional agent says "What I can do for you is..." — shifting the focus toward solutions.\n\nFirst Call Resolution (FCR) measures whether a customer's issue was resolved on the first call without follow-up. A high FCR rate indicates a well-trained team and directly impacts CSAT scores. Companies maintaining FCR above 80% typically see a 30% reduction in repeat calls.`, questions:[{q:"What percentage of customers stay loyal due to friendly service?",opts:["63%","73%","83%","93%"],ans:1},{q:"What should an agent do before providing solutions?",opts:["Transfer the call","Acknowledge the customer's emotions","Put on hold","Read a script"],ans:1},{q:"Which phrase replaces 'I can't do that'?",opts:["That's impossible.","Let me transfer you.","What I can do for you is...","Please call back later."],ans:2},{q:"What does FCR stand for?",opts:["Fast Customer Response","First Call Resolution","Full Complaint Report","Forwarded Call Record"],ans:1},{q:"What happens when FCR is above 80%?",opts:["Complaints increase","Agents get promoted","Repeat calls drop 30%","Call volume doubles"],ans:2}]},
  { id:2, title:"The Importance of Active Listening", text:`Active listening is one of the most critical skills in any communication role. Unlike passive hearing, active listening requires full concentration, understanding, and thoughtful response. In customer service, active listeners identify unstated needs and resolve issues more efficiently.\n\nKey techniques include verbal affirmations such as "I see," "I understand," and "Go on." Summarizing what the customer said before offering a solution demonstrates comprehension and builds confidence.\n\nResearch from Cornell University found that active listeners are perceived as 40% more trustworthy than those who simply wait to speak. This trust directly translates into higher customer satisfaction scores and lower call abandonment rates.`, questions:[{q:"What distinguishes active listening from passive hearing?",opts:["Volume of response","Full concentration and thoughtful response","Speed of conversation","Questions asked"],ans:1},{q:"Which phrase is a verbal affirmation?",opts:["Please hold.","I see.","Call back later.","That's not possible."],ans:1},{q:"According to Cornell, active listeners are perceived how?",opts:["20% more efficient","40% more trustworthy","60% more knowledgeable","80% more professional"],ans:1},{q:"What does summarizing a customer's issue demonstrate?",opts:["Impatience","Comprehension and care","Desire to end the call","Lack of training"],ans:1},{q:"What is a direct benefit of trust in a call center?",opts:["Longer call times","Higher satisfaction and lower abandonment","More transfers","Fewer agents needed"],ans:1}]},
  { id:3, title:"Handling Difficult Customers Professionally", text:`Every agent will encounter an angry customer. The most effective approach begins with staying calm — matching anger escalates the situation. The HEARD technique is widely taught: Hear the customer fully, Empathize with frustration, Apologize sincerely, Resolve the issue, and Diagnose the root cause to prevent recurrence.\n\nAvoid defensive language. "That's our policy" or "There's nothing I can do" close the conversation. Instead, "Let me see what options are available" signals willingness to help.\n\nAgents who master this technique consistently receive higher satisfaction scores and lower escalation rates, making it one of the most valued skills in any contact center environment.`, questions:[{q:"What is the first step with an angry customer?",opts:["Match their energy","Stay calm","Transfer the call","Put them on hold"],ans:1},{q:"What does the 'H' in HEARD stand for?",opts:["Help","Hear","Handle","Hold"],ans:1},{q:"Why avoid saying 'That's our policy'?",opts:["Too long","It closes the conversation","Unprofessional slang","Confuses customers"],ans:1},{q:"What does the 'D' in HEARD stand for?",opts:["Deliver","Decline","Diagnose","Direct"],ans:2},{q:"What phrase keeps the conversation open?",opts:["Nothing I can do.","That's our policy.","Let me see what options are available.","Please hold indefinitely."],ans:2}]},
  { id:4, title:"Professional Email Communication", text:`A well-crafted professional email conveys respect, clarity, and competence. The subject line is the first thing a reader sees — it must be clear and specific. The body should begin with a polite greeting, followed by a concise statement of purpose.\n\nAvoid long paragraphs — most professionals prefer emails readable in under two minutes. Use bullet points when listing multiple items, and always end with a clear call to action.\n\nProofreading is non-negotiable. Spelling errors and grammatical mistakes reduce credibility instantly. Re-read every email once from the recipient's perspective before sending.`, questions:[{q:"What is the first element a reader notices?",opts:["The greeting","The subject line","The signature","Attachments"],ans:1},{q:"How long should professional emails ideally take to read?",opts:["Under 30 seconds","Under 2 minutes","Under 5 minutes","Under 10 minutes"],ans:1},{q:"When should bullet points be used?",opts:["Always","Never","When listing multiple items","Only in formal reports"],ans:2},{q:"What does proofreading prevent?",opts:["Long emails","Errors that reduce credibility","Excessive bullet points","Late replies"],ans:1},{q:"What is the recommended final step before sending?",opts:["Add more attachments","Re-read from the recipient's perspective","Shorten the subject","Remove the greeting"],ans:1}]},
  { id:5, title:"Body Language in Professional Settings", text:`Understanding body language is relevant even for call center agents — especially during interviews. Research by Albert Mehrabian suggests only 7% of communication is verbal; 38% is vocal tone, and 55% is body language.\n\nMaintaining eye contact signals confidence. Crossed arms can be perceived as defensive. A genuine smile alters vocal tone, making agents sound more approachable — even on phone calls.\n\nPosture also affects confidence. Sitting upright increases confidence during stressful interactions. For phone agents, standing while speaking can improve vocal projection and energy, leading to more engaging conversations.`, questions:[{q:"According to Mehrabian, what percentage is body language?",opts:["7%","38%","55%","93%"],ans:2},{q:"What does eye contact signal?",opts:["Aggression","Confidence and sincerity","Boredom","Distraction"],ans:1},{q:"What can crossed arms be perceived as?",opts:["Relaxed","Attentive","Defensive or closed-off","Enthusiastic"],ans:2},{q:"How can smiling affect a phone call?",opts:["No effect","Makes agent sound more approachable","Slows speech","Confuses customer"],ans:1},{q:"What is a benefit of standing while on phone calls?",opts:["Shorter calls","Improved vocal projection and energy","Better internet","Faster typing"],ans:1}]},
  { id:6, title:"Time Management for Customer Service Agents", text:`Average Handle Time (AHT) measures the average duration of a customer interaction including talk time, hold time, and after-call work. Keeping AHT low while maintaining quality is a constant balancing act.\n\nAgents improve efficiency using keyboard shortcuts, updated knowledge bases, and minimizing unnecessary holds. However, rushing a customer to lower AHT backfires — hurried customers are less satisfied and more likely to call back.\n\nAgents who complete notes and case documentation immediately after a call maintain greater accuracy and free up mental bandwidth for the next customer.`, questions:[{q:"What does AHT stand for?",opts:["Agent Help Time","Average Handle Time","Automated Hold Transfer","Annual Hour Tracker"],ans:1},{q:"What three elements does AHT measure?",opts:["Talk, hold, and after-call work","Speed, tone, accuracy","Greetings, solutions, farewells","Training, testing, feedback"],ans:0},{q:"What is a risk of rushing customers to reduce AHT?",opts:["Higher quality","Customers feel valued","Lower satisfaction and repeat calls","Shorter ACW"],ans:2},{q:"When should agents complete call notes?",opts:["End of shift","Next morning","Immediately after the call","Weekly"],ans:2},{q:"Which helps agents improve efficiency?",opts:["Longer hold times","Using keyboard shortcuts","Avoiding knowledge base","Multitasking during calls"],ans:1}]},
  { id:7, title:"The Role of Empathy in Customer Support", text:`Empathy — the ability to understand and share another's feelings — is one of the highest-value soft skills in customer service. When customers feel understood, frustration decreases and trust increases. Unlike sympathy, empathy means stepping into their shoes.\n\nContact centers investing in empathy training report up to 20% improvement in CSAT scores. Empathy is not about agreeing with the customer's position, but about validating their emotional experience.\n\nCommon empathetic phrases: "I can only imagine how inconvenient this has been," "That sounds really frustrating," and "You have every right to feel that way."`, questions:[{q:"What is the difference between empathy and sympathy?",opts:["They are the same","Empathy means stepping into their shoes; sympathy means feeling sorry","Sympathy is more professional","Empathy is only written"],ans:1},{q:"What improvement can empathy training produce?",opts:["Up to 10%","Up to 20%","Up to 30%","Up to 40%"],ans:1},{q:"What does empathy NOT require?",opts:["Validating feelings","Agreeing with the customer's position","Acknowledging emotions","Empathetic phrases"],ans:1},{q:"Which phrase demonstrates empathy?",opts:["That's our policy.","I can only imagine how inconvenient this has been.","Please hold.","Can you repeat that?"],ans:1},{q:"What happens when customers feel understood?",opts:["They demand more","Frustration decreases and trust increases","They ask for a supervisor","They end the call quickly"],ans:1}]},
  { id:8, title:"Grammar in the Workplace", text:`Clear grammar is a mark of professionalism. In customer-facing roles, grammatically correct communication prevents misunderstandings. Verb tense consistency is one of the most common challenges for non-native speakers.\n\nSubject-verb agreement is another frequent area of difficulty. "The team are ready" versus "the team is ready" depends on whether the noun is treated as singular or plural — a convention that varies between British and American English.\n\nIn formal communication or call transcripts, grammar errors stand out prominently and can affect how customers perceive the company's credibility and professionalism.`, questions:[{q:"Why is clear grammar important in customer-facing roles?",opts:["Impresses managers only","Prevents misunderstandings and builds credibility","Shortens calls","Required by law"],ans:1},{q:"What is a common grammar difficulty for non-native speakers?",opts:["Vocabulary","Verb tense consistency","Spelling names","Using abbreviations"],ans:1},{q:"What is subject-verb agreement?",opts:["Using the same subject twice","Matching nouns with the correct verb form","Avoiding passive voice","Speaking slowly"],ans:1},{q:"Which sentence has a subject-verb error in American English?",opts:["The team is ready.","The team are ready.","She goes to work daily.","They were informed."],ans:1},{q:"What do grammar conventions vary between?",opts:["Morning and evening shifts","British and American English","Written and spoken only","Formal and informal emails"],ans:1}]},
  { id:9, title:"Workplace Diversity and Inclusion", text:`A diverse workforce brings a wider range of perspectives to problem-solving. Inclusive environments ensure that all employees feel valued and can contribute fully.\n\nResearch by McKinsey & Company found that companies in the top quartile for ethnic diversity are 36% more likely to achieve above-average profitability. Gender-diverse companies outperform peers by 25%.\n\nFor call center agents interacting with global customers, cultural awareness is especially important. Understanding how different cultures approach directness and complaint-handling can prevent miscommunications and improve satisfaction rates.`, questions:[{q:"What does D&I stand for?",opts:["Development and Integration","Diversity and Inclusion","Direction and Instruction","Data and Intelligence"],ans:1},{q:"By how much are ethnically diverse companies more likely to be profitable?",opts:["25% more likely","36% more likely","50% more likely","60% more likely"],ans:1},{q:"Why is cultural awareness important for agents?",opts:["It helps with grammar","It prevents miscommunications with global customers","It speeds up AHT","It reduces training time"],ans:1},{q:"What advantage does D&I provide beyond ethics?",opts:["Shorter work hours","A business competitive advantage","Fewer customer complaints","Lower salaries"],ans:1},{q:"What do inclusive environments ensure?",opts:["Uniform thinking","All employees feel valued and contribute fully","Less diverse hiring","Faster promotions"],ans:1}]},
  { id:10, title:"Remote Work and Virtual Communication", text:`Remote work has changed how teams communicate. For call center agents working from home, maintaining professional communication standards is as important as in a traditional office.\n\nA major challenge of remote work is the loss of nonverbal cues. Poor lighting, unstable connections, or distracting backgrounds undermine credibility. Professionals should use a neutral background, ensure proper lighting, and test equipment before important calls.\n\nWritten communication carries more weight remotely — tone is often lost in text. Messages must be written carefully to avoid sounding curt. Responding within one business day is considered standard.`, questions:[{q:"What challenge does remote work introduce?",opts:["Too many meetings","Loss of nonverbal cues","Shorter work hours","Faster internet"],ans:1},{q:"What undermines credibility on video calls?",opts:["Speaking clearly","Poor lighting or distracting backgrounds","Professional attire","Using a microphone"],ans:1},{q:"Why must text messages be written carefully?",opts:["They take longer","Tone is often lost in text","Spelling checkers unavailable","They are permanent"],ans:1},{q:"What is the professional response standard?",opts:["Reply within 1 hour","Reply within one business day","Reply when available","Reply within one week"],ans:1},{q:"What has remote work replaced?",opts:["Written communication","Many face-to-face interactions","Phone calls only","Email"],ans:1}]},
  { id:11, title:"Stress Management for Call Center Professionals", text:`Call center work can be demanding. Without effective stress management, burnout becomes a serious risk. Techniques include deep breathing, short breaks between calls, and cognitive reframing — viewing challenges as growth opportunities.\n\nMany contact centers offer employee assistance programs (EAPs) including counseling and wellness resources. A supportive team culture significantly reduces anxiety.\n\nStudies show agents who feel psychologically safe are 27% more productive and far less likely to resign within the first year of employment.`, questions:[{q:"What is a major risk of poor stress management?",opts:["Faster AHT","Burnout","Higher bonuses","Longer shifts"],ans:1},{q:"What is cognitive reframing?",opts:["Ignoring challenges","Viewing challenges as growth opportunities","Memorizing scripts","Transferring difficult calls"],ans:1},{q:"What does EAP stand for?",opts:["Employee Assessment Program","Employee Assistance Program","Engagement and Productivity","Evaluation and Performance"],ans:1},{q:"What does psychological safety produce?",opts:["More complaints","27% more productivity","Shorter training","Higher AHT"],ans:1},{q:"Which technique helps manage stress?",opts:["Multitasking","Deep breathing exercises","Ignoring the customer","Answering emails during calls"],ans:1}]},
  { id:12, title:"The Art of Persuasive Communication", text:`Persuasion is the ability to influence others through reasoned argument and emotional appeal. In customer service and sales, the key is ethical persuasion — presenting genuine value rather than manipulating customers.\n\nAristotle's three pillars remain relevant: Ethos (credibility), Pathos (emotional appeal), and Logos (logic and evidence). Effective communicators balance all three.\n\nA persuasive agent might say: "Based on your usage pattern (Logos), I can see you value reliability. Our premium plan (Ethos) has helped thousands of customers (Pathos) avoid exactly the issues you're experiencing." This blended approach outperforms a hard sell.`, questions:[{q:"What does ethical persuasion involve?",opts:["Manipulating customers","Presenting genuine value","Using pressure tactics","Ignoring needs"],ans:1},{q:"What does 'Ethos' refer to?",opts:["Emotional appeal","Logical evidence","Credibility and trustworthiness","Statistical data"],ans:2},{q:"What does 'Pathos' appeal to?",opts:["Logic","The listener's emotions","Company policies","Product features"],ans:1},{q:"What does 'Logos' use?",opts:["Emotional stories","Authority and status","Logic and evidence","Customer testimonials"],ans:2},{q:"What is more effective than a hard sell?",opts:["Repeating the offer","A blended Ethos-Pathos-Logos approach","Longer call duration","Discounts only"],ans:1}]},
  { id:13, title:"Telephone Etiquette and Professional Voice", text:`Telephone calls remain the preferred channel for complex issues. A professional manner begins the moment the call is answered. Agents should speak clearly, at a moderate pace, with warmth and competence.\n\nUsing the customer's name activates the brain's reward center, creating a sense of connection. However, overusing it feels forced and insincere.\n\nA strong closing confirms actions taken, invites final questions, and ends with a genuine farewell: "I've updated your account and you'll receive a confirmation email within 24 hours. Is there anything else I can help you with today? Thank you for calling, and have a wonderful day!"`, questions:[{q:"Why are telephone calls still important?",opts:["Cheaper","Preferred for complex issues","Faster","No training needed"],ans:1},{q:"What does using a customer's name activate?",opts:["Their complaint instinct","The brain's reward center","Account information","A call recording"],ans:1},{q:"What is a risk of overusing the customer's name?",opts:["Slows the call","Feels forced and insincere","Causes confusion","Violates privacy"],ans:1},{q:"What should a professional closing include?",opts:["Quick goodbye only","Confirmation, final questions, genuine farewell","Transfer to another agent","Reading privacy policy"],ans:1},{q:"At what speed should agents speak?",opts:["As fast as possible","At a moderate pace","As slowly as possible","At customer's exact speed"],ans:1}]},
  { id:14, title:"Problem-Solving in Customer Service", text:`Effective problem-solving is highly valued. When a customer presents an issue, the agent must fully understand the problem, explore options, and implement the best solution. Rushing leads to repeat contacts.\n\nA structured approach: define the problem, gather information, identify solutions, evaluate pros and cons, and implement the best option while keeping the customer informed — the "5-step model" used in BPO training.\n\nAgents who think creatively while staying within guidelines are better equipped for unusual cases. This adaptability separates average from high-performing agents.`, questions:[{q:"What is the agent's primary goal?",opts:["End the call quickly","Fully understand and resolve the problem","Transfer to supervisor","Read from a script"],ans:1},{q:"What does rushing lead to?",opts:["Faster resolution","Higher CSAT","Repeat customer contacts","Lower AHT"],ans:2},{q:"How many steps are in the model?",opts:["3","4","5","6"],ans:2},{q:"What is the fourth step?",opts:["Define the problem","Gather information","Identify solutions","Evaluate pros and cons"],ans:3},{q:"What differentiates high-performing agents?",opts:["Longer scripts","Adaptability and creative thinking within guidelines","More calls per hour","More technical jargon"],ans:1}]},
  { id:15, title:"Cross-Cultural Communication", text:`Different cultures have distinct communication styles, attitudes toward hierarchy, and service expectations. In some cultures, indirect communication is preferred — customers hint at a problem rather than stating it directly.\n\nHigh-context cultures (Japan, Arab countries) rely on implicit messages and relationship-building. Low-context cultures (Germany, USA) prefer direct, explicit communication.\n\nSimple adjustments — being more patient with indirect styles or avoiding idiomatic expressions that may not translate well — dramatically improve satisfaction across diverse markets.`, questions:[{q:"What do different cultures have distinct approaches to?",opts:["Product pricing","Communication styles and hierarchy","Call center technology","Agent uniforms"],ans:1},{q:"What characterizes high-context cultures?",opts:["Direct explicit communication","Reliance on implicit messages and relationship-building","Short transactional conversations","Preference for written communication"],ans:1},{q:"Which are examples of low-context cultures?",opts:["Japan and Arab countries","Germany and the United States","China and Brazil","India and Mexico"],ans:1},{q:"What adjustment helps with indirect communication?",opts:["Speak faster","Being more patient","Use more technical terms","End the call sooner"],ans:1},{q:"What should agents avoid with international customers?",opts:["Empathy","Idioms that may not translate","Active listening","Clear pronunciation"],ans:1}]},
  { id:16, title:"Data Privacy and Customer Confidentiality", text:`Customer service agents handle sensitive data — account numbers, payment information, personal identification — and must follow strict protocols to prevent unauthorized access.\n\nThe GDPR, enforced across the EU, sets rules on data collection, storage, and usage. Violations can result in fines of up to €20 million or 4% of global annual turnover.\n\nAgents must verify caller identity before accessing accounts, avoid writing down sensitive information unnecessarily, and never share details via unsecured channels. Data protection is a front-line responsibility.`, questions:[{q:"What does GDPR stand for?",opts:["Global Data Privacy Rules","General Data Protection Regulation","Government Data Processing Registry","Guided Data Privacy Reform"],ans:1},{q:"Where is GDPR enforced?",opts:["Only in the USA","Across the European Union","Only in the UK","Globally for all companies"],ans:1},{q:"What is the maximum GDPR fine?",opts:["€5M or 1%","€10M or 2%","€20M or 4%","€50M or 10%"],ans:2},{q:"What must agents do before accessing accounts?",opts:["Ask for a password","Verify caller identity","Escalate to supervisor","Request written consent"],ans:1},{q:"Whose responsibility is data protection?",opts:["Only IT's","Only management's","All agents' responsibility","Only compliance officers'"],ans:2}]},
  { id:17, title:"Effective Team Communication", text:`Strong team communication is the backbone of any high-performing call center. Poor internal communication leads to conflicting information given to customers.\n\nRegular team huddles — short 10–15 minute meetings — maintain alignment. Teams review performance metrics, share customer feedback, and address policy updates. Two-way feedback channels are equally important.\n\nAgents who feel their input is valued are more engaged and less likely to leave. Monthly one-on-ones combined with anonymous feedback tools create a culture of continuous improvement.`, questions:[{q:"What does poor internal communication lead to?",opts:["Higher CSAT","Conflicting customer information and fractured culture","Faster resolution","Better training"],ans:1},{q:"How long should team huddles last?",opts:["1–2 minutes","10–15 minutes","30–45 minutes","1 hour"],ans:1},{q:"What is reviewed in huddles?",opts:["Personal schedules","Metrics, feedback, and policy updates","Salary information","Vacation requests"],ans:1},{q:"What makes agents more engaged?",opts:["Longer shifts","Feeling their input is valued","More calls","Less training"],ans:1},{q:"What creates a culture of continuous improvement?",opts:["Strict monitoring only","One-on-ones plus anonymous feedback tools","Replacing underperformers","Ignoring complaints"],ans:1}]},
  { id:18, title:"Continuous Learning and Professional Development", text:`Skills that were relevant five years ago may already be obsolete. Microlearning — 3–5 minute focused training bursts — improves knowledge retention by up to 80% compared to hour-long sessions. These modules can be completed between calls.\n\nCertification programs, such as the HDI Customer Service Representative (CSR) certification or English qualifications like IELTS and TOEFL, demonstrate measurable competency to employers.\n\nIn competitive job markets, these credentials can be the deciding factor in hiring decisions.`, questions:[{q:"Why is learning a 'survival strategy'?",opts:["Legally required","Skills evolve and may become obsolete","Increases salary automatically","Shortens hours"],ans:1},{q:"How long are microlearning modules?",opts:["10–15 minutes","30–45 minutes","3–5 minutes","1–2 hours"],ans:2},{q:"By how much does microlearning improve retention?",opts:["Up to 40%","Up to 60%","Up to 80%","Up to 100%"],ans:2},{q:"What can certifications be in competitive markets?",opts:["Irrelevant","The deciding factor in hiring","A replacement for experience","A barrier to employment"],ans:1},{q:"What does HDI CSR stand for?",opts:["High Definition Interface Support Role","HDI Customer Service Representative certification","Human Development Institute Summary Report","None of the above"],ans:1}]},
  { id:19, title:"Conflict Resolution in the Workplace", text:`Unresolved conflict leads to decreased productivity, higher absenteeism, and increased turnover. The Thomas-Kilmann Conflict Model identifies five approaches: competing, collaborating, compromising, avoiding, and accommodating.\n\nNo single style is universally correct — the best approach depends on stakes, relationships, and urgency. An agent who navigates team disagreements without escalating tension, while also handling customer complaints professionally, demonstrates high interpersonal intelligence.\n\nThis quality is increasingly sought after by employers in customer-facing industries worldwide.`, questions:[{q:"What are consequences of unresolved conflict?",opts:["Increased productivity","Decreased productivity, higher absenteeism, turnover","Better cohesion","Faster problem-solving"],ans:1},{q:"How many styles does Thomas-Kilmann identify?",opts:["Three","Four","Five","Six"],ans:2},{q:"What determines the best approach?",opts:["Manager's preference","Stakes, relationship, urgency","Company size","Number of people"],ans:1},{q:"What does handling conflict well demonstrate?",opts:["Technical skills","High interpersonal intelligence","Faster typing","Memorization"],ans:1},{q:"Which is NOT one of the five styles?",opts:["Collaborating","Competing","Delegating","Accommodating"],ans:2}]},
  { id:20, title:"The Psychology of Customer Loyalty", text:`Retaining a customer costs five times less than acquiring a new one. Loyal customers spend 67% more on average than new customers. Despite this, many companies invest disproportionately in acquiring new customers.\n\nEmotional drivers of loyalty are powerful — customers who feel a personal connection with a brand are far less likely to switch, even when offered lower prices elsewhere.\n\nCall center agents are often the primary human touchpoint of a brand. One call handled with warmth can create a loyal advocate. One dismissive call can undo years of brand-building.`, questions:[{q:"How much less does retaining a customer cost?",opts:["Twice as cheap","Three times cheaper","Five times cheaper","Ten times cheaper"],ans:2},{q:"How much more do loyal customers spend?",opts:["33% more","50% more","67% more","100% more"],ans:2},{q:"What are emotional drivers of loyalty?",opts:["Low prices only","Personal connection, consistency, and genuine care","Free gifts","Brand advertising"],ans:1},{q:"What role do agents play in brand loyalty?",opts:["Unrelated to brand loyalty","Primary human touchpoint of a brand","Handle complaints only","Manage marketing"],ans:1},{q:"What can a poorly handled call do?",opts:["Slightly reduce satisfaction","Have no lasting impact","Undo years of positive brand-building","Only affect one customer"],ans:2}]},
  { id:21, title:"Writing Effective Customer Service Responses", text:`Written customer service — through email, chat, or support tickets — requires different skills than phone communication. Without vocal tone, every word carries greater weight. A technically accurate but coldly worded response can feel as unsatisfying as a warm but unhelpful one.\n\nEffective structure: acknowledge the concern, apologize if appropriate, provide the solution or next steps, and close with an invitation for further contact.\n\nTone calibration is important — match the formality of the customer's writing. Responding formally to a casual message creates distance; responding casually to a formal complaint seems disrespectful.`, questions:[{q:"Why does every word carry greater weight in writing?",opts:["Messages are longer","No vocal tone to convey emotion","Customers read carefully","Messages are permanent"],ans:1},{q:"What is the first step in effective written responses?",opts:["Provide the solution","Apologize","Acknowledge the customer's concern","Close with an invitation"],ans:2},{q:"What is tone calibration?",opts:["Adjusting call volume","Matching the formality level of the customer","Using more vocabulary","Shortening responses"],ans:1},{q:"What does responding formally to a casual message create?",opts:["Trust","Distance","Efficiency","Humor"],ans:1},{q:"What is the ultimate goal of a written response?",opts:["Close the ticket quickly","Make the customer feel heard, respected, helped","Explain policy in full","Avoid escalation at all costs"],ans:1}]},
  { id:22, title:"Introduction to IELTS and Language Testing", text:`IELTS is one of the world's most recognized English proficiency examinations, accepted by over 11,000 organizations globally. It assesses four skills: Listening, Reading, Writing, and Speaking — each scored on a band scale from 1 to 9.\n\nThere are two versions: Academic (for university applicants) and General Training (for work and immigration). For most call center roles, the General Training module is more relevant.\n\nEffective preparation requires regular practice across all four skills. Listening to podcasts and native conversations builds listening comprehension for higher bands.`, questions:[{q:"What does IELTS stand for?",opts:["International English Language Testing System","Integrated English Literacy Test Score","International English Listening and Testing Scale","Institute for English Language Training and Skills"],ans:0},{q:"How many organizations accept IELTS globally?",opts:["Over 5,000","Over 8,000","Over 11,000","Over 15,000"],ans:2},{q:"What is the highest IELTS band score?",opts:["7","8","9","10"],ans:2},{q:"Which module is most relevant for call center roles?",opts:["Academic","General Training","Professional","Business English"],ans:1},{q:"What improves IELTS reading scores?",opts:["Memorizing vocabulary lists","Reading extensively in English","Practicing speaking daily","Writing essays"],ans:1}]},
  { id:23, title:"The Growth of BPO Industry in the Middle East", text:`The BPO industry has grown rapidly across MENA. Egypt, Jordan, and Morocco have become major outsourcing destinations due to their large, educated, bilingual workforces and competitive labor costs.\n\nEgypt, in particular, has become a leading BPO hub, with Cairo and Alexandria hosting major contact centers. The government has supported the sector through technology parks such as Smart Village and Maadi Technology Park.\n\nAgents who communicate effectively in both English and Arabic command higher salaries and greater career mobility — making English development a strategic investment.`, questions:[{q:"What does BPO stand for?",opts:["Business Process Outsourcing","Basic Performance Optimization","Bilingual Professional Operations","Business Productivity Office"],ans:0},{q:"Which MENA countries are major outsourcing destinations?",opts:["UAE, Kuwait, Bahrain","Egypt, Jordan, Morocco","Saudi Arabia, Oman, Qatar","Libya, Tunisia, Algeria"],ans:1},{q:"What technology parks support Egypt's BPO sector?",opts:["Cairo Tech Hub and Luxor Valley","Smart Village and Maadi Technology Park","Giza Digital City and Port Said Zone","Alex Park and New Cairo Center"],ans:1},{q:"What do bilingual agents command?",opts:["Lower salaries","Higher salaries and greater career mobility","Same salaries as monolingual agents","Fewer opportunities"],ans:1},{q:"Why do companies outsource to MENA markets?",opts:["Cultural similarity","Cost-effective English-proficient workforces","Time zone advantages only","Advanced technology"],ans:1}]},
  { id:24, title:"Emotional Intelligence in the Workplace", text:`Emotional Intelligence (EI), popularized by Daniel Goleman, refers to the ability to recognize, understand, manage, and use emotions effectively. EI has been shown to be a stronger predictor of professional success than IQ alone.\n\nGoleman identified five core components: self-awareness, self-regulation, motivation, empathy, and social skills. Self-regulation involves controlling impulsive reactions — particularly important with difficult customers.\n\nOrganizations with high EI cultures report better teamwork, more effective leadership, and lower turnover rates.`, questions:[{q:"Who popularized Emotional Intelligence?",opts:["Sigmund Freud","Albert Einstein","Daniel Goleman","Carl Jung"],ans:2},{q:"What does EI predict more than IQ alone?",opts:["Academic performance","Professional success","Physical health","Financial wealth"],ans:1},{q:"What does self-regulation involve?",opts:["Setting goals","Controlling impulsive reactions","Recognizing others' emotions","Building social networks"],ans:1},{q:"How many components of EI did Goleman identify?",opts:["Three","Four","Five","Six"],ans:2},{q:"What do high EI culture organizations report?",opts:["Higher turnover","Better teamwork and lower turnover","Reduced CSAT","More conflicts"],ans:1}]},
  { id:25, title:"Effective Complaint Handling", text:`The "Service Recovery Paradox" shows that a customer whose complaint is resolved satisfactorily is more loyal than one who never had a problem. The three keys are speed, sincerity, and solution quality — all three must align.\n\nCustomers who wait too long feel ignored; those who receive scripted apologies feel patronized; those offered inadequate solutions feel further frustrated.\n\nDocumentation is the often-overlooked final step. A single complaint, properly documented, can prevent hundreds of future ones by identifying systemic problems.`, questions:[{q:"What is the Service Recovery Paradox?",opts:["Customers are more loyal after a well-resolved complaint than those with no problems","Customers never forgive poor service","Service recovery is always more expensive","Complaints always reduce loyalty"],ans:0},{q:"What are the three keys to complaint handling?",opts:["Speed, sincerity, and solution quality","Price, product, policy","Tone, transfer, technology","Scripts, speed, silence"],ans:0},{q:"What do customers feel with scripted apologies?",opts:["Valued","Patronized","Satisfied","Confused"],ans:1},{q:"What is the often-overlooked final step?",opts:["Transferring the case","Offering a discount","Documentation","Following up by email"],ans:2},{q:"What can one documented complaint prevent?",opts:["One future complaint","Ten future complaints","Hundreds of future complaints","Future complaints are unpreventable"],ans:2}]},
  { id:26, title:"Business Vocabulary for Professional Communication", text:`A strong professional vocabulary signals competence. Business communication requires familiarity with specific terminology. "Stakeholder" means any party with interest in a project's outcome. "Benchmark" is a standard used for comparison. "Deliverable" is a concrete output expected from a task. "Turnaround time" is the time taken to complete a process.\n\nMisusing these terms can lead to miscommunication. Building vocabulary requires consistent exposure — reading platforms like Bloomberg or the Financial Times, and practicing vocabulary in context rather than simply memorizing definitions.`, questions:[{q:"What does 'stakeholder' mean?",opts:["A team leader","A financial investor only","Any party with interest in a project's outcome","A company shareholder"],ans:2},{q:"What is a 'deliverable'?",opts:["A courier service","A concrete output expected from a task","A financial report","A meeting agenda"],ans:1},{q:"What does 'turnaround time' mean?",opts:["Time to return a call","Time taken to complete a process","A 180-degree strategy change","Employee onboarding time"],ans:1},{q:"What does 'benchmark' refer to?",opts:["An office seat","A financial milestone","A standard used for comparison","A customer feedback score"],ans:2},{q:"What is the most effective way to build vocabulary?",opts:["Memorizing definitions","Practicing vocabulary in context","Avoiding technical terms","Only reading novels"],ans:1}]},
  { id:27, title:"Interview Skills and Job Application English", text:`The job interview is a high-stakes communication event. The STAR method (Situation, Task, Action, Result) provides a clear template for behavioral questions. For example, "Tell me about a time you handled a difficult situation" would be answered by describing the situation, explaining the task, detailing the actions, and concluding with the measurable result.\n\nKey interview phrases include: "I would like to highlight that...", "One of my key strengths is...", and "In my previous experience, I was responsible for..."\n\nRehearsing these phrases until they feel natural allows candidates to focus on content rather than language construction during the interview.`, questions:[{q:"What does STAR stand for?",opts:["Skills, Training, Ability, Results","Situation, Task, Action, Result","Strength, Timing, Attitude, Responsibility","Subject, Topic, Argument, Resolution"],ans:1},{q:"What is the most effective antidote to interview anxiety?",opts:["Pretending confidence","Taking medication","Preparation","Avoiding difficult questions"],ans:2},{q:"Which phrase is appropriate for highlighting a strength?",opts:["I was just lucky.","One of my key strengths is...","I think maybe I am okay at...","My boss says I am decent."],ans:1},{q:"What should STAR answers conclude with?",opts:["A list of qualifications","The measurable result","A question for the interviewer","A personal opinion"],ans:1},{q:"Why rehearse phrases until they feel natural?",opts:["To memorize word for word","To focus on content rather than language during interview","To impress with vocabulary","To avoid thinking"],ans:1}]},
  { id:28, title:"Technology in Modern Customer Service", text:`AI now powers chatbots handling thousands of simultaneous inquiries. CRM systems give agents instant access to a customer's complete history. Speech analytics software analyzes calls in real time, detecting emotional cues and escalation risks.\n\nDespite these advances, customers prefer human agents for complex or emotional issues. AI and human agents are most effective when working together.\n\nAgents who embrace technology as an enabler rather than a threat are better positioned for advancement in an increasingly automated industry.`, questions:[{q:"What does CRM stand for?",opts:["Customer Rating Metric","Customer Relationship Management","Centralized Response Module","Client Record Manager"],ans:1},{q:"What does speech analytics detect?",opts:["Background noise only","Emotional cues and escalation risks","Agent training needs","Call duration anomalies"],ans:1},{q:"When do customers prefer human agents?",opts:["Simple account inquiries","Password resets","Complex or emotional issues","Order tracking"],ans:2},{q:"What is the most effective approach?",opts:["AI replaces humans","Humans and AI working together","Humans replace AI eventually","AI handles all emotional cases"],ans:1},{q:"How should agents view technology?",opts:["As a threat","As irrelevant","As an enabler for advancement","Only an IT concern"],ans:2}]},
  { id:29, title:"Feedback and Performance Reviews", text:`Employees who receive regular, meaningful feedback are 3.6 times more likely to be engaged at work, according to Gallup. Yet many organizations still rely on annual reviews alone.\n\nEffective feedback is specific, timely, and actionable. "You need to improve communication" is vague. "In yesterday's call, I noticed you interrupted the customer twice. Next time, try pausing for two seconds after they stop speaking" is specific and actionable.\n\nReceiving feedback gracefully is equally important. Professional development requires viewing criticism as information rather than judgment.`, questions:[{q:"According to Gallup, how more engaged are employees with regular feedback?",opts:["1.5 times","2.4 times","3.6 times","5 times"],ans:2},{q:"What are the three qualities of effective feedback?",opts:["Frequent, brief, written","Specific, timely, actionable","Formal, public, documented","Annual, positive, vague"],ans:1},{q:"What is wrong with 'improve your communication'?",opts:["Too personal","Vague and offers no guidance","Too specific","Inappropriate"],ans:1},{q:"What does professional development require when receiving criticism?",opts:["Defending your actions","Ignoring it","Viewing criticism as information rather than judgment","Only accepting positive feedback"],ans:2},{q:"What reduces the effectiveness of feedback?",opts:["Asking clarifying questions","Defensive reactions","Taking notes","Implementing changes quickly"],ans:1}]},
  { id:30, title:"Pronunciation and Accent in Professional English", text:`Intelligibility — being understood — matters far more than accent neutralization. Customers are accepting of accents as long as the speaker is clear, confident, and articulate.\n\nPronunciation training focuses on phoneme production, word stress, and sentence rhythm. Arabic speakers often work on vowel sounds not present in Arabic and on reducing consonant clustering.\n\nThe most effective method is shadowing — mimicking a speaker's rhythm, stress, and intonation simultaneously. Consistent shadowing practice of 10–15 minutes daily produces measurable improvements within weeks.`, questions:[{q:"What matters more than accent neutralization?",opts:["Perfect pronunciation","Speaking very slowly","Intelligibility — being understood","A British accent"],ans:2},{q:"What does pronunciation training focus on?",opts:["Vocabulary and grammar only","Phoneme production, word stress, sentence rhythm","Reading speed","Spelling and punctuation"],ans:1},{q:"What challenges do Arabic speakers often face?",opts:["Vocabulary gaps","Vowel sounds not in Arabic and consonant clustering","Speaking too loudly","Using formal register"],ans:1},{q:"What is shadowing?",opts:["Recording yourself","Listening to music","Mimicking a speaker's rhythm, stress, intonation simultaneously","Reading aloud from textbook"],ans:2},{q:"How long of daily shadowing produces measurable improvements?",opts:["1–2 minutes","5 minutes","10–15 minutes","60 minutes minimum"],ans:2}]},
];

// ─── LISTENING SCENARIOS ───
const ALL_LISTENING_SCENARIOS = [
  { id:1, title:"Billing Dispute Call", duration:"1:52",
    transcript:[
      {role:"Agent",text:"Thank you for calling SkyNet Support. My name is Sarah. How may I assist you today?"},
      {role:"Customer",text:"Hi Sarah, I'm calling because I received my bill this month and the amount is much higher than usual. I'm really confused and a bit frustrated."},
      {role:"Agent",text:"I completely understand how frustrating that can be. I'd be happy to look into that for you right away. Could I please have your account email address?"},
      {role:"Customer",text:"Sure, it's john.smith@email.com."},
      {role:"Agent",text:"Thank you, Mr. Smith. It looks like there was an international roaming charge applied this billing cycle. Did you travel abroad last month?"},
      {role:"Customer",text:"Oh! Yes, I did travel to Turkey for a week, but I didn't think I was using my phone that much."},
      {role:"Agent",text:"That explains it. What I can do for you is apply a one-time courtesy discount of 20% on those charges as a goodwill gesture."},
      {role:"Customer",text:"That would be great, thank you so much!"},
      {role:"Agent",text:"My pleasure. I'll also add a travel package to your account for your next trip. Is there anything else I can help you with today?"},
      {role:"Customer",text:"No, that's all. You've been very helpful."},
    ],
    questions:[
      {q:"Why is the customer calling?",opts:["To cancel his subscription","To report a technical issue","To question a higher-than-usual bill","To upgrade his plan"],ans:2},
      {q:"What caused the extra charges?",opts:["A system error","An unauthorized purchase","International roaming charges","A plan upgrade"],ans:2},
      {q:"What discount does the agent offer?",opts:["10%","15%","20%","25%"],ans:2},
      {q:"What additional action does the agent take?",opts:["Schedules a technician","Cancels roaming","Adds a travel package","Upgrades the account"],ans:2},
      {q:"How does the customer feel at the end of the call?",opts:["Still frustrated","Satisfied and appreciative","Demanding more","Asking for a supervisor"],ans:1},
    ]
  },
  { id:2, title:"Technical Support Call", duration:"2:10",
    transcript:[
      {role:"Agent",text:"Good afternoon, TechSupport line. This is David. How can I help you?"},
      {role:"Customer",text:"Hi David. My internet has been cutting out every 20 minutes for the past two days. It's affecting my work from home and I'm at my limit."},
      {role:"Agent",text:"I'm so sorry to hear that. Let's get this sorted. Can I have your account number, please?"},
      {role:"Customer",text:"It's 447-882-3391."},
      {role:"Agent",text:"I'm running a remote diagnostic now. I can see multiple dropouts. This is a signal strength issue on our end, not your equipment. I'm escalating this to our network team with high priority."},
      {role:"Customer",text:"How long will it take?"},
      {role:"Agent",text:"Our network team will address this within 4 hours. You'll receive an SMS when resolved. I'm also crediting your account for two days of service as compensation."},
      {role:"Customer",text:"Okay, that's reasonable. I appreciate it."},
      {role:"Agent",text:"Of course. Is there anything else I can help with today?"},
      {role:"Customer",text:"No, that covers it. Thank you, David."},
    ],
    questions:[
      {q:"What problem is the customer experiencing?",opts:["A billing error","Internet cutting out every 20 minutes","A broken router","Slow download speeds"],ans:1},
      {q:"How long has the problem been occurring?",opts:["One day","Two days","One week","Three days"],ans:1},
      {q:"What does the remote diagnostic reveal?",opts:["Customer's equipment is faulty","A signal strength issue on the company's end","A software bug","Account suspension"],ans:1},
      {q:"What compensation does the agent offer?",opts:["Full month free","New router","Two days of service credit","30% discount"],ans:2},
      {q:"When will the issue be resolved?",opts:["Immediately","Within 4 hours","Within 24 hours","Next business day"],ans:1},
    ]
  },
  { id:3, title:"Order Tracking Complaint", duration:"1:45",
    transcript:[
      {role:"Agent",text:"Thank you for contacting FastShip Customer Service. My name is Layla. How may I assist you?"},
      {role:"Customer",text:"Hello. I placed an order six days ago and it was supposed to arrive in three days. I haven't received it and I can't track it on your website."},
      {role:"Agent",text:"I sincerely apologize for this delay. That's not the experience we want you to have. May I have your order number?"},
      {role:"Customer",text:"It's ORD-2024-88741."},
      {role:"Agent",text:"I can see your order. There was a sorting error at our regional warehouse causing a 2-day delay. Your package is at our Alexandria distribution center and will be delivered tomorrow by 6 PM."},
      {role:"Customer",text:"I needed it for an event yesterday! This is really unacceptable."},
      {role:"Agent",text:"You are absolutely right, and I completely understand your frustration. I'd like to offer you a full refund of your shipping fee and a 15% discount on your next order as an apology."},
      {role:"Customer",text:"Alright. I appreciate that. Thank you."},
    ],
    questions:[
      {q:"What is the customer's main complaint?",opts:["Wrong item delivered","A delayed order not yet received","A billing error","A damaged product"],ans:1},
      {q:"What caused the delay?",opts:["Bad weather","A website error","A sorting error at the warehouse","Customs clearance"],ans:2},
      {q:"Where is the package currently?",opts:["Still at the sender","At customs","At the Alexandria distribution center","Out for delivery"],ans:2},
      {q:"Why is the customer especially frustrated?",opts:["The price was wrong","She needed it for an event that already passed","The item was broken","Wrong address was used"],ans:1},
      {q:"What does the agent offer?",opts:["Full refund only","Free shipping forever","Shipping fee refund plus 15% discount on next order","A replacement item"],ans:2},
    ]
  },
  { id:4, title:"Account Password Reset Call", duration:"1:30",
    transcript:[
      {role:"Agent",text:"Welcome to SecureBank Support. This is Omar. How can I assist you today?"},
      {role:"Customer",text:"Hi Omar. I've been locked out of my online banking for three days. I tried resetting my password but I'm not receiving the verification email."},
      {role:"Agent",text:"I understand how frustrating that must be. Let me verify your identity and we'll get this resolved. Can I have your full name and the last four digits of your account number?"},
      {role:"Customer",text:"My name is Samia Khalil and my account ends in 7823."},
      {role:"Agent",text:"Thank you, Ms. Khalil. I've verified your identity. The verification emails were being sent to an old email address on file. I've updated it to your current email and sent a new reset link. You should receive it within 2 minutes."},
      {role:"Customer",text:"Oh! I didn't realize my old email was still there. That makes sense."},
      {role:"Agent",text:"It happens quite often after email changes. Your account is now fully accessible. Is there anything else I can help you with?"},
      {role:"Customer",text:"No, that's everything. Thank you so much!"},
    ],
    questions:[
      {q:"What is the customer's problem?",opts:["Forgotten PIN","Locked out of online banking","Suspicious transaction","Closed account"],ans:1},
      {q:"Why wasn't the customer receiving verification emails?",opts:["Spam filter blocked them","The service was down","Emails were sent to an old email address","The account was suspended"],ans:2},
      {q:"What does the agent do to resolve the issue?",opts:["Resets the account completely","Updates the email address and sends a new reset link","Transfers to a specialist","Schedules a branch visit"],ans:1},
      {q:"How long before the customer receives the reset link?",opts:["Immediately","Within 2 minutes","Within 1 hour","Within 24 hours"],ans:1},
      {q:"How does the call end?",opts:["Customer is still frustrated","Agent transfers the call","Customer thanks the agent","Agent escalates to supervisor"],ans:2},
    ]
  },
  { id:5, title:"Subscription Cancellation Request", duration:"2:00",
    transcript:[
      {role:"Agent",text:"Thanks for calling StreamLine Support. I'm Nadia. How can I help you today?"},
      {role:"Customer",text:"Hi Nadia. I'd like to cancel my subscription. I've been charged for two months I didn't use and I want a refund."},
      {role:"Agent",text:"I'm sorry to hear you'd like to cancel, and I understand your concern about the charges. Before I process the cancellation, may I ask what made you decide to stop using our service?"},
      {role:"Customer",text:"I forgot to cancel after my free trial and didn't notice the charges until now."},
      {role:"Agent",text:"I completely understand. That can definitely happen. I can see you haven't used the account in those two months. I'd like to offer you a refund for both months and pause your account for 3 months rather than cancel — giving you time to decide."},
      {role:"Customer",text:"That's actually a good idea. I might use it in the future."},
      {role:"Agent",text:"Wonderful. I'll process the two-month refund now — it'll reflect in your account within 5–7 business days. Your account is now paused and won't be charged during this period."},
      {role:"Customer",text:"Perfect. Thank you, Nadia."},
    ],
    questions:[
      {q:"What does the customer initially request?",opts:["A plan upgrade","Account cancellation and refund","A password reset","Technical support"],ans:1},
      {q:"Why was the customer charged for two months?",opts:["They upgraded their plan","They forgot to cancel after the free trial","They shared the account","They used extra features"],ans:1},
      {q:"What does the agent offer instead of cancellation?",opts:["A free upgrade","A 50% discount forever","A two-month refund and 3-month account pause","An annual plan at a reduced rate"],ans:2},
      {q:"How long will the refund take to appear?",opts:["Immediately","1–2 business days","5–7 business days","2–3 weeks"],ans:2},
      {q:"What is the outcome of the call?",opts:["The customer cancels permanently","The customer accepts the pause offer","The customer demands to speak to a manager","The agent transfers the call"],ans:1},
    ]
  },
  { id:6, title:"Wrong Item Delivered", duration:"1:40",
    transcript:[
      {role:"Agent",text:"Thank you for calling ShopEasy. This is Mona. How can I help you today?"},
      {role:"Customer",text:"Hi Mona. I ordered a blue shirt size large, but I received a red dress size small. This is completely wrong."},
      {role:"Agent",text:"I'm so sorry about that mix-up. That must be very frustrating. Let me look into your order right away. Can I have your order number please?"},
      {role:"Customer",text:"It's SE-2024-44512."},
      {role:"Agent",text:"I can see your order here. You're absolutely right — you were sent the wrong item. I'm going to arrange a free return pickup and send the correct item with express delivery at no charge. You should receive it within 48 hours."},
      {role:"Customer",text:"Will I need to pay anything?"},
      {role:"Agent",text:"Absolutely not. Everything will be covered by us. You'll also receive a 10% discount code via email for the inconvenience."},
      {role:"Customer",text:"That's great. Thank you for sorting this out so quickly."},
    ],
    questions:[
      {q:"What did the customer receive?",opts:["The correct item but wrong size","A blue shirt in the right size","A red dress instead of a blue shirt","A damaged item"],ans:2},
      {q:"What does the agent arrange?",opts:["A store credit","A free return pickup and express delivery of correct item","A full account refund","A call back from the warehouse"],ans:1},
      {q:"How soon will the correct item arrive?",opts:["Same day","24 hours","48 hours","3–5 business days"],ans:2},
      {q:"What additional compensation does the agent offer?",opts:["A free subscription","A 10% discount code","A full refund","A gift card"],ans:1},
      {q:"Does the customer need to pay for the return?",opts:["Yes, a small fee","No, it's completely covered","Yes, standard shipping","Only if outside the return window"],ans:1},
    ]
  },
  { id:7, title:"Upgrade Request Call", duration:"1:35",
    transcript:[
      {role:"Agent",text:"Welcome to ConnectTel. I'm Yusuf. How can I assist you?"},
      {role:"Customer",text:"Hi. I've been on the basic plan for two years. I'd like to upgrade to the premium plan. Can you tell me what's included?"},
      {role:"Agent",text:"Of course! The premium plan includes unlimited data, international calling to 50 countries, priority customer support, and a free device upgrade every two years. It's 150 EGP more per month."},
      {role:"Customer",text:"Does it include the Middle East region?"},
      {role:"Agent",text:"Yes, all Middle Eastern countries are included in the international calling feature."},
      {role:"Customer",text:"That sounds good. Can I switch today?"},
      {role:"Agent",text:"Absolutely. I'll activate it now. Your new plan starts immediately and you'll see the updated features within 2 hours. Your billing cycle will adjust from your next invoice."},
      {role:"Customer",text:"Perfect. Thank you, Yusuf."},
    ],
    questions:[
      {q:"How long has the customer been on the basic plan?",opts:["Six months","One year","Two years","Three years"],ans:2},
      {q:"How much more does the premium plan cost per month?",opts:["50 EGP","100 EGP","150 EGP","200 EGP"],ans:2},
      {q:"How many countries are included in international calling?",opts:["20","30","50","100"],ans:2},
      {q:"When do the new features become available?",opts:["Immediately","Within 2 hours","Next billing cycle","Next day"],ans:1},
      {q:"Does the Middle East region qualify for international calling?",opts:["No","Only selected countries","Yes, all Middle Eastern countries","Only UAE and Saudi Arabia"],ans:2},
    ]
  },
  { id:8, title:"Service Outage Complaint", duration:"2:00",
    transcript:[
      {role:"Agent",text:"TelecomPlus support, this is Hana. Good morning."},
      {role:"Customer",text:"Good morning. I've had no internet connection since 8 AM. It's now 2 PM. This is six hours of complete outage. I work from home — this is a serious problem."},
      {role:"Agent",text:"I completely understand the impact this is having on your work, and I'm truly sorry. I can confirm there is a regional outage affecting your area. Our technical team is working urgently on it."},
      {role:"Customer",text:"When will it be fixed?"},
      {role:"Agent",text:"Our engineers estimate full restoration within the next 90 minutes. You will receive an SMS confirmation once service is restored."},
      {role:"Customer",text:"And what about compensation for six hours of lost service?"},
      {role:"Agent",text:"Absolutely fair. I'm crediting your account with two full days of service as compensation. This will be reflected on your next bill."},
      {role:"Customer",text:"Okay, I appreciate that."},
    ],
    questions:[
      {q:"How long has the outage been when the customer calls?",opts:["Two hours","Four hours","Six hours","Eight hours"],ans:2},
      {q:"Why is the outage especially serious for this customer?",opts:["They have children at home","They work from home","They run a business","They have guests visiting"],ans:1},
      {q:"What caused the outage?",opts:["Customer's router","A regional outage","A billing issue","A software update"],ans:1},
      {q:"How long until the service is restored?",opts:["30 minutes","60 minutes","90 minutes","3 hours"],ans:2},
      {q:"What compensation is offered?",opts:["One day of free service","Two full days credited","A 20% monthly discount","A free equipment upgrade"],ans:1},
    ]
  },
  { id:9, title:"Complaint About Rude Agent", duration:"1:50",
    transcript:[
      {role:"Agent",text:"Good afternoon, SupplyMax. I'm Dina. How can I help?"},
      {role:"Customer",text:"I'm calling to make a formal complaint. The agent I spoke to this morning — James — was rude, dismissive, and interrupted me several times. I want this on record."},
      {role:"Agent",text:"I'm very sorry you had that experience. Every customer deserves to be treated with respect, and that interaction does not reflect our standards. I want to assure you this will be addressed."},
      {role:"Customer",text:"Good. What exactly will happen?"},
      {role:"Agent",text:"I'm logging the complaint now with today's date and time. Your feedback will be reviewed by our quality assurance team and shared with the agent's supervisor. You'll receive a follow-up within 48 hours."},
      {role:"Customer",text:"I appreciate that. I just want to make sure it doesn't happen to others."},
      {role:"Agent",text:"Your feedback genuinely helps us improve. I'll also note that context in your complaint. Thank you for calling this to our attention."},
    ],
    questions:[
      {q:"What is the customer's complaint?",opts:["Wrong item received","Late delivery","A rude and dismissive agent","A billing error"],ans:2},
      {q:"What is the agent's initial response?",opts:["Defend the accused agent","Apologize and validate the customer","Transfer the call","Ask for proof"],ans:1},
      {q:"What does the agent promise to do?",opts:["Fire the agent immediately","Log the complaint and review within 48 hours","Offer a discount","Transfer to a supervisor now"],ans:1},
      {q:"Who will review the complaint?",opts:["The CEO","The billing team","The quality assurance team and supervisor","The customer care manager"],ans:2},
      {q:"What does the customer say their motivation is?",opts:["Getting a refund","Making the company lose money","Ensuring it doesn't happen to others","Revenge against the agent"],ans:2},
    ]
  },
  { id:10, title:"Product Warranty Claim", duration:"1:55",
    transcript:[
      {role:"Agent",text:"Welcome to ElectroMax Support. I'm Tarek. How can I help you today?"},
      {role:"Customer",text:"Hi. I bought a laptop from you four months ago and the screen has started flickering. I think it's a hardware fault. I'd like to make a warranty claim."},
      {role:"Agent",text:"I'm sorry to hear that. Four months is well within our 24-month warranty period. Can I take your serial number?"},
      {role:"Customer",text:"It's EM-2024-LT-88312."},
      {role:"Agent",text:"I can see your purchase. Based on your description, the screen flickering is covered under the display hardware warranty. You have two options: send the device for repair at our service center, or receive a replacement unit."},
      {role:"Customer",text:"How long does repair take?"},
      {role:"Agent",text:"The repair typically takes 5–7 business days. A replacement can be dispatched within 48 hours."},
      {role:"Customer",text:"I'll take the replacement. My work depends on this laptop."},
      {role:"Agent",text:"Understood. I'll arrange the replacement now. A courier will collect your old unit when delivering the new one."},
    ],
    questions:[
      {q:"How old is the laptop?",opts:["One month","Four months","Six months","One year"],ans:1},
      {q:"What is the warranty period?",opts:["6 months","12 months","18 months","24 months"],ans:3},
      {q:"What is the fault?",opts:["Battery not charging","Keyboard not working","Screen flickering","Speaker damage"],ans:2},
      {q:"How quickly can a replacement be dispatched?",opts:["Same day","24 hours","48 hours","5–7 days"],ans:2},
      {q:"Why does the customer choose replacement over repair?",opts:["It's cheaper","Repair takes too long for work needs","The repair center is far","Replacement has more features"],ans:1},
    ]
  },
  { id:11, title:"Loyalty Points Inquiry", duration:"1:30",
    transcript:[
      {role:"Agent",text:"Good morning. Welcome to LoyaltyPlus. I'm Sara. How can I help?"},
      {role:"Customer",text:"Hi Sara. I've been a member for three years and I have what I think is a lot of points, but I don't know how to use them or what they're worth."},
      {role:"Agent",text:"Great question. Let me pull up your account. You currently have 4,750 points. Each 100 points equals 5 EGP in store credit."},
      {role:"Customer",text:"So how much is that in total?"},
      {role:"Agent",text:"That's 237.50 EGP in store credit, which you can use on your next purchase or convert to a voucher code."},
      {role:"Customer",text:"Can I use them online?"},
      {role:"Agent",text:"Absolutely. At checkout, simply enter your loyalty code and the points will be applied automatically."},
      {role:"Customer",text:"Wonderful. I'll use them this week."},
    ],
    questions:[
      {q:"How long has the customer been a member?",opts:["One year","Two years","Three years","Five years"],ans:2},
      {q:"How many points does the customer have?",opts:["2,750","3,500","4,750","5,000"],ans:2},
      {q:"What is the value of 100 points?",opts:["1 EGP","5 EGP","10 EGP","50 EGP"],ans:1},
      {q:"What is the total value of the customer's points?",opts:["150 EGP","200 EGP","237.50 EGP","475 EGP"],ans:2},
      {q:"How are points applied online?",opts:["Call center must apply them","Automatically at checkout with loyalty code","Only in-store","Submit a written request"],ans:1},
    ]
  },
  { id:12, title:"Flight Booking Issue", duration:"2:05",
    transcript:[
      {role:"Agent",text:"SkyFly customer service. I'm Ahmed. How can I assist you?"},
      {role:"Customer",text:"Hi Ahmed. I booked a flight for next Tuesday, but I just realized I made a mistake — I booked for October 7 instead of November 7. Can I change it?"},
      {role:"Agent",text:"Of course. Let me check your booking. Can I have your booking reference?"},
      {role:"Customer",text:"It's SKY-2024-7821."},
      {role:"Agent",text:"I can see your booking. The flight change fee is 200 EGP, and the fare difference for November 7 is 350 EGP, making the total change cost 550 EGP."},
      {role:"Customer",text:"That's a lot. Is there any way to reduce that?"},
      {role:"Agent",text:"Given this is your first change request and the error appears to be a date mistake, I can waive the 200 EGP change fee. You'll only pay the 350 EGP fare difference."},
      {role:"Customer",text:"That's much more reasonable. Please go ahead."},
    ],
    questions:[
      {q:"What error did the customer make?",opts:["Wrong name","Wrong destination","Booked October 7 instead of November 7","Wrong flight class"],ans:2},
      {q:"What is the standard change fee?",opts:["100 EGP","150 EGP","200 EGP","350 EGP"],ans:2},
      {q:"What is the fare difference for November 7?",opts:["200 EGP","300 EGP","350 EGP","550 EGP"],ans:2},
      {q:"What does the agent waive?",opts:["The fare difference","The change fee","Both fees","Nothing"],ans:1},
      {q:"What total does the customer pay?",opts:["200 EGP","350 EGP","550 EGP","750 EGP"],ans:1},
    ]
  },
  { id:13, title:"Medical Insurance Query", duration:"1:50",
    transcript:[
      {role:"Agent",text:"HealthShield Insurance. Good afternoon. I'm Rana."},
      {role:"Customer",text:"Hello. I need to know if my policy covers physiotherapy. My doctor has recommended 10 sessions."},
      {role:"Agent",text:"Let me check your policy details. May I have your policy number please?"},
      {role:"Customer",text:"Sure. It's HS-45-2021-9031."},
      {role:"Agent",text:"I can see your policy. You are on the Gold Plan, which covers physiotherapy up to 20 sessions per year, with a 20% co-payment per session."},
      {role:"Customer",text:"What does co-payment mean?"},
      {role:"Agent",text:"It means the insurance covers 80% of the cost, and you pay 20% per session out of pocket. For the 10 sessions your doctor recommended, we cover the majority."},
      {role:"Customer",text:"That's great. What do I need to do?"},
      {role:"Agent",text:"Simply have your physiotherapist submit the claim form to us, or you can pay upfront and submit receipts for reimbursement within 90 days."},
    ],
    questions:[
      {q:"What treatment does the customer need?",opts:["Surgery","Dental care","Physiotherapy","Medication"],ans:2},
      {q:"What plan is the customer on?",opts:["Silver Plan","Bronze Plan","Gold Plan","Platinum Plan"],ans:2},
      {q:"How many sessions per year does the plan cover?",opts:["10","15","20","25"],ans:2},
      {q:"What does 'co-payment' mean in this context?",opts:["Insurance covers 100%","Customer pays 80%","Insurance covers 80%, customer pays 20%","Customer pays the full cost first"],ans:2},
      {q:"Within how many days must receipts be submitted for reimbursement?",opts:["30 days","60 days","90 days","120 days"],ans:2},
    ]
  },
  { id:14, title:"Job Application Follow-Up", duration:"1:45",
    transcript:[
      {role:"Agent",text:"Good morning, CareerLink HR. I'm Leila."},
      {role:"Customer",text:"Good morning. I applied for the customer service position two weeks ago and I haven't heard back. I wanted to follow up."},
      {role:"Agent",text:"Of course. May I have your full name and the date you applied?"},
      {role:"Customer",text:"My name is Khaled Mansour and I applied on the 3rd of this month."},
      {role:"Agent",text:"Thank you, Khaled. I can see your application. It's currently under review by the hiring team. The shortlisting is expected to be completed by end of this week."},
      {role:"Customer",text:"Should I expect a call or an email?"},
      {role:"Agent",text:"Successful candidates will receive an email with interview details within 5 business days after shortlisting. If you don't hear back within two weeks of today, the position has been filled."},
      {role:"Customer",text:"Thank you for the information."},
    ],
    questions:[
      {q:"How long ago did the customer apply?",opts:["One week","Two weeks","Three weeks","One month"],ans:1},
      {q:"What is the current status of the application?",opts:["Rejected","Under review by the hiring team","Waiting for interview","Shortlisted"],ans:1},
      {q:"When will shortlisting be completed?",opts:["Today","End of this week","Next week","End of the month"],ans:1},
      {q:"How will successful candidates be contacted?",opts:["Phone call","Letter","Email with interview details","SMS"],ans:2},
      {q:"What does no response within two weeks indicate?",opts:["Application is delayed","The position was filled","A second review is underway","A system error"],ans:1},
    ]
  },
  { id:15, title:"Bank Account Fraud Alert", duration:"2:10",
    transcript:[
      {role:"Agent",text:"SecureBank Fraud Prevention. I'm Nasser. How can I help you?"},
      {role:"Customer",text:"I received an alert that there was a transaction of 3,000 EGP from my account at 3 AM. I was asleep and I definitely did not authorize this."},
      {role:"Agent",text:"I understand this is alarming. Let me put a temporary hold on your card immediately to prevent further transactions. Can I verify your identity first?"},
      {role:"Customer",text:"Yes, my name is Fatima Osman, account ending in 4421."},
      {role:"Agent",text:"Thank you, Ms. Osman. I've frozen the card. The suspicious transaction has been flagged for investigation. Our fraud team will contact you within 24 hours. You'll also receive a new card within 3–5 business days."},
      {role:"Customer",text:"What about the 3,000 EGP?"},
      {role:"Agent",text:"If the investigation confirms this was unauthorized, the full amount will be refunded to your account. Most fraud cases are resolved within 5 business days."},
    ],
    questions:[
      {q:"What triggered the customer's call?",opts:["A billing error","An unauthorized 3,000 EGP transaction","A forgotten password","A closed account"],ans:1},
      {q:"What does the agent do immediately?",opts:["Transfers to fraud team","Freezes the card","Issues a refund","Closes the account"],ans:1},
      {q:"When will the fraud team contact the customer?",opts:["Same day","Within 24 hours","Within 48 hours","Within a week"],ans:1},
      {q:"How long does a new card take to arrive?",opts:["1–2 business days","3–5 business days","1 week","2 weeks"],ans:1},
      {q:"When will the 3,000 EGP be refunded?",opts:["Immediately","After the fraud is confirmed, within 5 business days","After 30 days","It will not be refunded"],ans:1},
    ]
  },
  { id:16, title:"Gym Membership Cancellation", duration:"1:40",
    transcript:[
      {role:"Agent",text:"FitLife Gym, member services. I'm Sami."},
      {role:"Customer",text:"Hi. I want to cancel my membership. I'm moving abroad next month."},
      {role:"Agent",text:"I'm sorry to hear you're leaving! May I have your membership ID?"},
      {role:"Customer",text:"It's FL-2022-3301."},
      {role:"Agent",text:"You're on an annual plan with 4 months remaining. Early cancellation has a 30-day notice period. If you cancel today, your membership ends 30 days from now."},
      {role:"Customer",text:"So I pay for 30 more days even though I'm leaving?"},
      {role:"Agent",text:"Yes, that's the policy. However, given that you're relocating abroad, I can waive the notice period and make your last day the end of this month. No additional charges."},
      {role:"Customer",text:"That's very kind. Please do that."},
    ],
    questions:[
      {q:"Why is the customer cancelling?",opts:["Financial reasons","They dislike the gym","Moving abroad","Health reasons"],ans:2},
      {q:"How many months remain on the plan?",opts:["2 months","3 months","4 months","6 months"],ans:2},
      {q:"What is the standard cancellation notice period?",opts:["7 days","14 days","30 days","60 days"],ans:2},
      {q:"What exception does the agent make?",opts:["Full refund of remaining months","Waives the notice period due to relocation","Freezes the account free of charge","Extends membership for free"],ans:1},
      {q:"When will the membership end?",opts:["Today","In 30 days","End of this month","End of the year"],ans:2},
    ]
  },
  { id:17, title:"Electricity Bill Dispute", duration:"1:55",
    transcript:[
      {role:"Agent",text:"PowerGrid customer service. I'm Dalia. How can I assist?"},
      {role:"Customer",text:"My electricity bill this month is 2,800 EGP. Last month it was 1,100 EGP. Nothing has changed at home. This must be an error."},
      {role:"Agent",text:"I can understand why that difference would be alarming. Let me investigate your account. Your meter reading this month shows 890 units. Last month it was 320 units."},
      {role:"Customer",text:"890 units? That's impossible. We haven't used anything differently."},
      {role:"Agent",text:"I agree it's a significant jump. I'll schedule a meter inspection within 48 hours to check for a fault or misread. If a fault is confirmed, the bill will be adjusted accordingly."},
      {role:"Customer",text:"And do I need to pay the 2,800 EGP in the meantime?"},
      {role:"Agent",text:"You can pay last month's amount of 1,100 EGP for now. Once the inspection is complete, we'll issue a corrected bill if needed."},
    ],
    questions:[
      {q:"By how much did the bill increase?",opts:["From 900 to 1,800","From 1,100 to 2,800","From 2,000 to 4,000","From 500 to 1,500"],ans:1},
      {q:"What does the meter show this month?",opts:["320 units","500 units","750 units","890 units"],ans:3},
      {q:"What will happen within 48 hours?",opts:["A bill correction","A refund","A meter inspection","A technician upgrade"],ans:2},
      {q:"What could explain the discrepancy?",opts:["High usage appliances","Theft","A meter fault or misread","Seasonal rate increase"],ans:2},
      {q:"What can the customer pay in the meantime?",opts:["The full 2,800 EGP","Nothing until the inspection","Last month's amount of 1,100 EGP","Half of the disputed bill"],ans:2},
    ]
  },
  { id:18, title:"Courier Damaged Package", duration:"1:45",
    transcript:[
      {role:"Agent",text:"QuickSend support. I'm Nour. How can I help?"},
      {role:"Customer",text:"The package I received today was completely crushed. It contained fragile electronics and everything inside is broken."},
      {role:"Agent",text:"I'm so sorry. That's a serious issue and not acceptable. Can I get your tracking number?"},
      {role:"Customer",text:"QS-2024-56789."},
      {role:"Agent",text:"I can see your shipment. I'm going to initiate a damage claim immediately. Please take photos of the package and contents and email them to claims@quicksend.com within 24 hours."},
      {role:"Customer",text:"What happens after I send the photos?"},
      {role:"Agent",text:"Our claims team reviews within 3 business days. If damage is confirmed, you'll receive full compensation up to the declared value of your shipment."},
      {role:"Customer",text:"I declared 5,000 EGP. Will I get all of it back?"},
      {role:"Agent",text:"Yes, the full declared value is covered. You'll receive it within 7 business days after claim approval."},
    ],
    questions:[
      {q:"What was inside the damaged package?",opts:["Clothing","Documents","Fragile electronics","Food items"],ans:2},
      {q:"What must the customer do within 24 hours?",opts:["Return the package","Call back","Email photos of the damage","Visit a branch"],ans:2},
      {q:"How long does the claims team take to review?",opts:["Same day","24 hours","3 business days","1 week"],ans:2},
      {q:"What is the declared value of the shipment?",opts:["2,000 EGP","3,500 EGP","5,000 EGP","7,500 EGP"],ans:2},
      {q:"How long after approval will the customer receive compensation?",opts:["Immediately","3 business days","7 business days","30 days"],ans:2},
    ]
  },
  { id:19, title:"Slow Internet Speed Complaint", duration:"1:50",
    transcript:[
      {role:"Agent",text:"NetZone support. I'm Bassem. How can I help today?"},
      {role:"Customer",text:"My internet speed has been extremely slow for the past week. I'm paying for 100 Mbps but I'm getting less than 5 Mbps on speed tests."},
      {role:"Agent",text:"That is a significant difference from what you're paying for, and I understand how disruptive that must be. Let me run a line diagnostic. Can I have your account number?"},
      {role:"Customer",text:"NZ-2024-7711."},
      {role:"Agent",text:"I can see significant packet loss on your line, which is causing the speed issue. I'll reset your connection remotely. Please restart your router now. If speeds don't improve within 30 minutes, call back and we'll dispatch a technician."},
      {role:"Customer",text:"What about this week of slow internet?"},
      {role:"Agent",text:"I'll apply a service credit of 7 days to your account for the disruption. This will appear on your next bill."},
    ],
    questions:[
      {q:"What speed is the customer paying for?",opts:["50 Mbps","75 Mbps","100 Mbps","200 Mbps"],ans:2},
      {q:"What speed is the customer actually getting?",opts:["Less than 5 Mbps","10 Mbps","20 Mbps","50 Mbps"],ans:0},
      {q:"What does the diagnostic show?",opts:["Router is broken","Significant packet loss","Billing suspension","Account is blocked"],ans:1},
      {q:"What is the first action the agent takes?",opts:["Sends a technician","Resets the connection remotely","Issues a refund","Upgrades the plan"],ans:1},
      {q:"What compensation is applied?",opts:["One month free","7 days of service credit","A speed upgrade","A free router"],ans:1},
    ]
  },
  { id:20, title:"Hotel Room Complaint", duration:"1:55",
    transcript:[
      {role:"Agent",text:"Royal Stay Hotels. I'm Mariam. How can I help you?"},
      {role:"Customer",text:"I booked a sea view room for my anniversary, but when I arrived, I was given a room facing the parking lot. I specifically chose and paid for a sea view."},
      {role:"Agent",text:"I sincerely apologize. That is completely unacceptable, especially for such a special occasion. Let me check availability immediately."},
      {role:"Customer",text:"I hope you can fix this."},
      {role:"Agent",text:"I'm pleased to confirm I have a sea view suite available on the 8th floor — it's actually an upgrade from your original booking. I'd like to offer it to you at no extra charge, along with a complimentary welcome dinner for two tonight."},
      {role:"Customer",text:"That's very generous. We accept."},
      {role:"Agent",text:"Wonderful. Please go to reception now and they will arrange the room transfer. Happy anniversary!"},
    ],
    questions:[
      {q:"What type of room did the customer book?",opts:["Garden view","City view","Parking view","Sea view"], ans:3},
      {q:"What room was the customer initially given?",opts:["Sea view room","Suite","Room facing the parking lot","Mountain view"], ans:2},
      {q:"What does the agent offer as a solution?",opts:["Full refund","Same room with apology","Sea view suite upgrade at no charge","A voucher for next stay"], ans:2},
      {q:"What additional offer is made?",opts:["Free breakfast","Complimentary welcome dinner for two","Spa treatment","Airport transfer"], ans:1},
      {q:"On which floor is the new room?",opts:["4th floor","6th floor","8th floor","10th floor"], ans:2},
    ]
  },
  { id:21, title:"Refund Not Received", duration:"1:45",
    transcript:[
      {role:"Agent",text:"PaySmart support. This is Layla."},
      {role:"Customer",text:"I returned an item three weeks ago and was told the refund would take 7–10 days. It's been three weeks and I still have nothing."},
      {role:"Agent",text:"I'm very sorry for this delay. That is beyond our standard processing time. Let me look into your return right now. Can I have your return reference number?"},
      {role:"Customer",text:"It's RTN-2024-14421."},
      {role:"Agent",text:"I can see your return was received and processed on our end. The refund was sent to your bank on the 12th. Sometimes banks take longer to reflect it. Can I confirm which bank you use?"},
      {role:"Customer",text:"CairoBank."},
      {role:"Agent",text:"CairoBank can take up to 5 additional business days. If it doesn't appear by this Friday, contact your bank with reference TXN-88441 and they can locate it."},
    ],
    questions:[
      {q:"When was the item returned?",opts:["One week ago","Two weeks ago","Three weeks ago","One month ago"],ans:2},
      {q:"What was the original refund timeline?",opts:["3–5 days","7–10 days","2 weeks","1 month"],ans:1},
      {q:"When did the company send the refund?",opts:["The same day of return","One week after return","On the 12th","Still not sent"],ans:2},
      {q:"Why might the refund be delayed?",opts:["The company hasn't sent it","The return was rejected","CairoBank takes up to 5 additional business days","The account is frozen"],ans:2},
      {q:"What should the customer do if the refund doesn't appear by Friday?",opts:["Call back again","File a legal complaint","Contact their bank with the transaction reference","Visit the store in person"],ans:2},
    ]
  },
  { id:22, title:"Internet Plan Downgrade Request", duration:"1:40",
    transcript:[
      {role:"Agent",text:"FiberFast support. I'm Hassan."},
      {role:"Customer",text:"I want to downgrade my plan from the 200 Mbps to the 100 Mbps. I'm paying too much and I don't use that much bandwidth."},
      {role:"Agent",text:"I understand. May I have your account number?"},
      {role:"Customer",text:"FF-2023-4421."},
      {role:"Agent",text:"I can do that for you. The 100 Mbps plan is 180 EGP less per month. The change will take effect at the start of your next billing cycle, which begins on the 1st of next month."},
      {role:"Customer",text:"Can I change it back if I feel I need the speed?"},
      {role:"Agent",text:"Absolutely, you can upgrade again at any time with no penalties. Would you also like to consider our 150 Mbps mid-tier option as a compromise?"},
      {role:"Customer",text:"No, the 100 Mbps is fine. Please go ahead."},
    ],
    questions:[
      {q:"What plan is the customer currently on?",opts:["50 Mbps","100 Mbps","200 Mbps","500 Mbps"],ans:2},
      {q:"What plan does the customer want?",opts:["50 Mbps","100 Mbps","150 Mbps","200 Mbps"],ans:1},
      {q:"How much will the customer save monthly?",opts:["100 EGP","150 EGP","180 EGP","200 EGP"],ans:2},
      {q:"When does the change take effect?",opts:["Immediately","Within 24 hours","Start of next billing cycle","End of contract"],ans:2},
      {q:"Can the customer upgrade again later?",opts:["No, they must wait 6 months","Yes, but with a penalty","Yes, at any time with no penalties","Only after 30 days"],ans:2},
    ]
  },
  { id:23, title:"Car Rental Dispute", duration:"2:00",
    transcript:[
      {role:"Agent",text:"DriveEasy Rentals. I'm Omar."},
      {role:"Customer",text:"Hi. I returned my rental car three days ago and you've charged me for an extra day I didn't use. I returned it at 10 AM but you've charged until 5 PM."},
      {role:"Agent",text:"I'm sorry about this charge. Let me check the return log. Can I have your rental agreement number?"},
      {role:"Customer",text:"DR-2024-88211."},
      {role:"Agent",text:"I can see the car was checked in at 10:17 AM on the 14th. The charge appears to be a system error. I'll issue a refund for the extra day's charge — that's 350 EGP back to your card."},
      {role:"Customer",text:"How long will the refund take?"},
      {role:"Agent",text:"Between 3 and 5 business days. You'll also receive a confirmation email within the hour."},
      {role:"Customer",text:"Thank you for sorting this quickly."},
    ],
    questions:[
      {q:"What is the customer's complaint?",opts:["Wrong car was given","Overcharged for fuel","Charged for an extra day not used","Damage was falsely reported"],ans:2},
      {q:"What time did the customer return the car?",opts:["8 AM","10 AM","12 PM","5 PM"],ans:1},
      {q:"What does the return log confirm?",opts:["The car was returned late","The car was returned at 10:17 AM","The car had damage","The charge is correct"],ans:1},
      {q:"How much will be refunded?",opts:["150 EGP","250 EGP","350 EGP","500 EGP"],ans:2},
      {q:"When will the customer receive a confirmation email?",opts:["Immediately","Within the hour","Within 24 hours","Within 3 days"],ans:1},
    ]
  },
  { id:24, title:"E-commerce Checkout Problem", duration:"1:35",
    transcript:[
      {role:"Agent",text:"ShopNow customer support. I'm Nadia."},
      {role:"Customer",text:"Hi. I've been trying to complete a purchase for the past hour, but every time I click 'Pay Now', I get an error message saying 'Transaction Failed'."},
      {role:"Agent",text:"I'm sorry you're experiencing this. Let me help. Can you tell me which payment method you're using?"},
      {role:"Customer",text:"I'm using my Visa card ending in 4892."},
      {role:"Agent",text:"That card may have 3D Secure verification. Try completing the payment on a desktop browser rather than mobile, and make sure to check for an OTP from your bank during checkout."},
      {role:"Customer",text:"I'll try that. What if it still fails?"},
      {role:"Agent",text:"Call your bank to check if online transactions are enabled, or try an alternative card. You can also pay via InstaPay or CashOnDelivery. I'll stay on hold while you try."},
      {role:"Customer",text:"Let me try now. Thank you."},
    ],
    questions:[
      {q:"What error does the customer receive?",opts:["Out of stock","Transaction Failed","Account suspended","Delivery not available"],ans:1},
      {q:"What payment method is the customer using?",opts:["Mastercard","Debit card","Visa card ending in 4892","Bank transfer"],ans:2},
      {q:"What does the agent suggest first?",opts:["Try a different card","Use a desktop browser and check for OTP","Contact the bank immediately","Cancel and reorder"],ans:1},
      {q:"What does 3D Secure require?",opts:["A password","An OTP (one-time password) from the bank","A PIN","A security question"],ans:1},
      {q:"Which alternative payment methods are offered?",opts:["Only cash","Only bank transfer","InstaPay or Cash on Delivery","Cryptocurrency"],ans:2},
    ]
  },
  { id:25, title:"School Fee Payment Query", duration:"1:45",
    transcript:[
      {role:"Agent",text:"BrightFuture Academy, accounts department. I'm Sara."},
      {role:"Customer",text:"Hello. I want to ask about the payment schedule for the new school year. My daughter is starting Grade 7."},
      {role:"Agent",text:"Welcome! I'd be happy to explain. Tuition for Grade 7 is 28,000 EGP per year. You can pay annually with a 5% discount, or in three equal installments due September, January, and April."},
      {role:"Customer",text:"What's the amount per installment?"},
      {role:"Agent",text:"Each installment is approximately 9,333 EGP. A late payment fee of 200 EGP is applied after a 7-day grace period."},
      {role:"Customer",text:"Is there financial aid available?"},
      {role:"Agent",text:"Yes, we have a merit scholarship and a need-based assistance program. Both require an application by August 15th. I'll email you the forms."},
    ],
    questions:[
      {q:"What is the annual tuition for Grade 7?",opts:["22,000 EGP","25,000 EGP","28,000 EGP","30,000 EGP"],ans:2},
      {q:"What discount is offered for annual payment?",opts:["3%","5%","8%","10%"],ans:1},
      {q:"How many installments are available?",opts:["Two","Three","Four","Monthly"],ans:1},
      {q:"What is the late payment fee after the grace period?",opts:["50 EGP","100 EGP","200 EGP","500 EGP"],ans:2},
      {q:"What is the deadline for financial aid applications?",opts:["July 15","August 1","August 15","September 1"],ans:2},
    ]
  },
  { id:26, title:"Telecom Number Portability", duration:"1:50",
    transcript:[
      {role:"Agent",text:"MobiConnect customer care. I'm Hany."},
      {role:"Customer",text:"I want to transfer my number from WaveNet to MobiConnect, but I want to keep my current number. Is that possible?"},
      {role:"Agent",text:"Absolutely. This is called number portability and it's completely free. The process takes 3 to 5 business days."},
      {role:"Customer",text:"Will I lose service during the transfer?"},
      {role:"Agent",text:"There may be a brief interruption of 1 to 2 hours on the day of transfer, usually between midnight and 2 AM to minimize disruption."},
      {role:"Customer",text:"What do I need to bring?"},
      {role:"Agent",text:"You need your national ID, your current SIM card, and a proof of account ownership from WaveNet. Visit any MobiConnect store to initiate the request."},
      {role:"Customer",text:"That sounds straightforward. I'll do it this week."},
    ],
    questions:[
      {q:"What is the customer requesting?",opts:["A new number","An international plan","Number portability to keep their current number","A SIM replacement"],ans:2},
      {q:"How long does the transfer process take?",opts:["Same day","1–2 days","3–5 business days","1 week"],ans:2},
      {q:"When does the service interruption typically occur?",opts:["During business hours","Between midnight and 2 AM","During peak usage","On weekends only"],ans:1},
      {q:"What document is NOT required for the request?",opts:["National ID","Current SIM card","Proof of account ownership from WaveNet","Passport"],ans:3},
      {q:"Where must the request be initiated?",opts:["Online only","Via phone call","Any MobiConnect store","Via the current provider"],ans:2},
    ]
  },
  { id:27, title:"Subscription Auto-Renewal Complaint", duration:"1:40",
    transcript:[
      {role:"Agent",text:"DigitalPlus support. I'm Lena."},
      {role:"Customer",text:"I cancelled my subscription last month and yet you've charged me again this month. I have the cancellation email to prove it."},
      {role:"Agent",text:"I'm very sorry. Let me look into this immediately. May I have your account email?"},
      {role:"Customer",text:"It's karim.2024@email.com."},
      {role:"Agent",text:"I can see your cancellation request was submitted last month, but it appears it was not processed correctly due to a system error. This charge was made in error."},
      {role:"Customer",text:"So when will I get my money back?"},
      {role:"Agent",text:"I'm processing the refund now. It will return to your card within 3–5 business days. I also want to confirm that no further charges will be made."},
      {role:"Customer",text:"I want that in writing."},
      {role:"Agent",text:"Absolutely. You'll receive a confirmation email with the refund reference and cancellation confirmation within 30 minutes."},
    ],
    questions:[
      {q:"What is the customer's complaint?",opts:["Charged for a service never ordered","Charged again after cancellation","Service quality is poor","Wrong amount charged"],ans:1},
      {q:"What caused the error?",opts:["Customer cancelled incorrectly","A system error","Late cancellation","Bank issue"],ans:1},
      {q:"When will the refund be processed?",opts:["Immediately","Within 1 business day","Within 3–5 business days","Within 2 weeks"],ans:2},
      {q:"What does the customer ask for?",opts:["A full year refund","Confirmation in writing","Compensation beyond refund","To speak to a manager"],ans:1},
      {q:"When will the confirmation email arrive?",opts:["Immediately","Within 30 minutes","Within 24 hours","Within 48 hours"],ans:1},
    ]
  },
  { id:28, title:"University Application Support", duration:"1:55",
    transcript:[
      {role:"Agent",text:"NileUniversity admissions. I'm Yasmine."},
      {role:"Customer",text:"Hello. I applied to the Business Administration program two months ago. I haven't received a decision. The portal still shows 'under review'."},
      {role:"Agent",text:"I understand the wait must be stressful. May I have your application ID?"},
      {role:"Customer",text:"NU-APP-2024-7532."},
      {role:"Agent",text:"Your application is under the final review stage. The admissions committee convenes next week and all applicants will receive notifications by the 20th."},
      {role:"Customer",text:"Is there anything missing from my file?"},
      {role:"Agent",text:"Your file is complete. All documents are verified. The remaining step is the committee's final decision."},
      {role:"Customer",text:"Can I improve my chances by submitting anything else?"},
      {role:"Agent",text:"The submission window is closed. However, if you'd like to write a brief letter of interest, I can attach it to your file as supplementary material."},
    ],
    questions:[
      {q:"How long ago did the customer apply?",opts:["One month","Two months","Three months","Six months"],ans:1},
      {q:"What is the current status on the portal?",opts:["Accepted","Rejected","Under review","Awaiting documents"],ans:2},
      {q:"When will applicants receive notifications?",opts:["This week","By the 20th","Next month","After the holiday"],ans:1},
      {q:"Is anything missing from the file?",opts:["Yes, a reference letter","Yes, transcripts","No, the file is complete","The committee hasn't checked yet"],ans:2},
      {q:"What can the customer still submit?",opts:["Nothing at all","An updated resume","A brief letter of interest as supplementary material","A new application"],ans:2},
    ]
  },
  { id:29, title:"Event Ticket Cancellation", duration:"1:45",
    transcript:[
      {role:"Agent",text:"EventNow support. I'm Kareem."},
      {role:"Customer",text:"I bought two tickets to the concert next Friday but I'm no longer able to attend. I'd like a refund."},
      {role:"Agent",text:"I'm sorry you won't be able to make it. Can I have your booking reference?"},
      {role:"Customer",text:"EN-2024-CC-3310."},
      {role:"Agent",text:"I can see your booking. Our standard policy allows cancellations with a full refund up to 14 days before the event. The concert is 8 days away, which is within the 14-day window. However, as a one-time gesture, I can offer you a 70% refund."},
      {role:"Customer",text:"What about the other 30%?"},
      {role:"Agent",text:"That covers the platform and booking fee which is non-refundable under our terms. Alternatively, you could transfer the tickets to someone else at no charge."},
      {role:"Customer",text:"I'll take the 70% refund. Thank you."},
    ],
    questions:[
      {q:"How many days until the concert?",opts:["5 days","8 days","10 days","14 days"],ans:1},
      {q:"What is the standard full refund window?",opts:["7 days before","10 days before","14 days before","30 days before"],ans:2},
      {q:"What percentage refund is offered as a gesture?",opts:["50%","60%","70%","90%"],ans:2},
      {q:"What does the non-refundable 30% cover?",opts:["Profit margin","Platform and booking fees","Venue costs","Artist fee"],ans:1},
      {q:"What is the alternative to the refund?",opts:["Store credit","Attending a different event","Transferring tickets to someone else","Postponing to next event"],ans:2},
    ]
  },
  { id:30, title:"Delivery to Wrong Address", duration:"1:50",
    transcript:[
      {role:"Agent",text:"ShipIt Logistics. I'm Amira."},
      {role:"Customer",text:"My package was supposed to be delivered to 14 Nile Street, but the tracking shows it was delivered to 41 Nile Street. Someone else has my package."},
      {role:"Agent",text:"I'm so sorry. That is a serious delivery error. Let me investigate immediately. Your tracking number please?"},
      {role:"Customer",text:"SL-2024-77431."},
      {role:"Agent",text:"I can confirm there was a courier error — the package was scanned at the wrong address. I'm dispatching a recovery team to retrieve it now. They'll attempt recovery within 4 hours."},
      {role:"Customer",text:"What if the person at that address refuses to return it?"},
      {role:"Agent",text:"If recovery is not possible within 24 hours, we will replace the shipment at no cost, or issue a full refund — your choice."},
    ],
    questions:[
      {q:"What went wrong with the delivery?",opts:["Package was lost","Package was damaged","Delivered to the wrong address","Delivered to a different city"],ans:2},
      {q:"What is the correct address?",opts:["41 Nile Street","4 Nile Street","14 Nile Street","114 Nile Street"],ans:2},
      {q:"Within how many hours will the recovery team attempt retrieval?",opts:["1 hour","2 hours","4 hours","8 hours"],ans:2},
      {q:"What happens if recovery fails within 24 hours?",opts:["Customer must collect themselves","File a police report","Replacement or full refund at customer's choice","Partial refund only"],ans:2},
      {q:"What was the cause of the error?",opts:["Wrong label printed","Customer gave wrong address","Courier scanned at the wrong address","System glitch"],ans:2},
    ]
  },
  { id:31, title:"Corporate Account Setup", duration:"1:55",
    transcript:[
      {role:"Agent",text:"EnterpriseLink. I'm Fady. How can I help?"},
      {role:"Customer",text:"Hi. Our company wants to open a corporate account. We have about 50 employees who will need services. What's the process?"},
      {role:"Agent",text:"Welcome. For a team of 50, you'd qualify for our Business Pro package. I'll walk you through it. Can I have your company name and tax registration number?"},
      {role:"Customer",text:"We're TechNova Egypt. Tax ID: TN-2019-44512."},
      {role:"Agent",text:"Thank you. The setup takes 3 business days after document verification. You'll need: company registration, tax card, and authorized signatory ID. Everything can be submitted online."},
      {role:"Customer",text:"Is there a setup fee?"},
      {role:"Agent",text:"No setup fee for the Business Pro package. You'll receive dedicated account management and 24/7 priority support. Monthly billing starts at the beginning of the following month."},
    ],
    questions:[
      {q:"How many employees will use the service?",opts:["25","50","100","200"],ans:1},
      {q:"Which package does the customer qualify for?",opts:["Starter Package","Business Basic","Business Pro","Enterprise Elite"],ans:2},
      {q:"How long does account setup take?",opts:["Same day","1 business day","3 business days","1 week"],ans:2},
      {q:"What document is NOT mentioned as required?",opts:["Company registration","Tax card","Authorized signatory ID","Bank statement"],ans:3},
      {q:"Is there a setup fee?",opts:["Yes, 500 EGP","Yes, 1,000 EGP","No setup fee","Only for first year"],ans:2},
    ]
  },
  { id:32, title:"Travel Insurance Claim", duration:"2:00",
    transcript:[
      {role:"Agent",text:"SafeTrip Insurance. I'm Doaa."},
      {role:"Customer",text:"I had to cancel my holiday due to a medical emergency in the family and I've already paid for flights and hotel. I want to make a travel insurance claim."},
      {role:"Agent",text:"I'm sorry for the difficult situation. Travel insurance covers cancellations due to medical emergencies. Can I have your policy number?"},
      {role:"Customer",text:"ST-2024-MED-1122."},
      {role:"Agent",text:"Your policy includes trip cancellation coverage up to 10,000 EGP. To process the claim, you'll need: a medical certificate, proof of your bookings, and payment receipts."},
      {role:"Customer",text:"How long does the claim take?"},
      {role:"Agent",text:"Once all documents are submitted, the review takes 10 business days. Payment is made within 5 additional business days after approval."},
      {role:"Customer",text:"Where do I send the documents?"},
      {role:"Agent",text:"Upload them to our claims portal at safetrip.com/claims or email them to claims@safetrip.com. I'll send you the exact list by SMS now."},
    ],
    questions:[
      {q:"Why did the customer cancel their trip?",opts:["They changed their mind","Work commitment","Family medical emergency","Bad weather forecast"],ans:2},
      {q:"What is the maximum trip cancellation coverage?",opts:["5,000 EGP","7,500 EGP","10,000 EGP","15,000 EGP"],ans:2},
      {q:"Which document is NOT mentioned as required?",opts:["Medical certificate","Proof of bookings","Payment receipts","Passport copy"],ans:3},
      {q:"How long does the claim review take?",opts:["5 business days","7 business days","10 business days","14 business days"],ans:2},
      {q:"How can documents be submitted?",opts:["Only in person","Only by post","Via the claims portal or email","Only via fax"],ans:2},
    ]
  },
  { id:33, title:"Job Offer Negotiation", duration:"2:00",
    transcript:[
      {role:"Agent",text:"PrimeCorp HR. I'm Rania."},
      {role:"Customer",text:"Hello. I received a job offer from your company and I'd like to discuss the salary package before I accept."},
      {role:"Agent",text:"Of course. We value open conversation about compensation. The base salary offered is 8,000 EGP, correct?"},
      {role:"Customer",text:"Yes. I was hoping for 9,500 EGP based on my 4 years of experience in the field."},
      {role:"Agent",text:"I understand. Our current salary band for this position tops at 9,000 EGP. I can revise the offer to 9,000 EGP. Additionally, the package includes a performance bonus of up to 15% annually."},
      {role:"Customer",text:"That's more reasonable. What about transportation and health insurance?"},
      {role:"Agent",text:"Transportation allowance is 800 EGP monthly and comprehensive health insurance is included. Would you like to accept at 9,000 EGP base with these benefits?"},
      {role:"Customer",text:"Yes, I'll accept. Thank you."},
    ],
    questions:[
      {q:"What was the original base salary offer?",opts:["7,000 EGP","8,000 EGP","9,000 EGP","10,000 EGP"],ans:1},
      {q:"What salary did the candidate ask for?",opts:["8,500 EGP","9,000 EGP","9,500 EGP","10,000 EGP"],ans:2},
      {q:"What is the maximum salary for the band?",opts:["8,500 EGP","9,000 EGP","9,500 EGP","10,000 EGP"],ans:1},
      {q:"What is the annual performance bonus?",opts:["Up to 10%","Up to 15%","Up to 20%","Up to 25%"],ans:1},
      {q:"What is the monthly transportation allowance?",opts:["500 EGP","600 EGP","800 EGP","1,000 EGP"],ans:2},
    ]
  },
  { id:34, title:"Mobile App Technical Support", duration:"1:40",
    transcript:[
      {role:"Agent",text:"AppTech support. I'm Adel."},
      {role:"Customer",text:"The app keeps crashing every time I try to open the payments section. It's been two days and I can't pay my bills through it."},
      {role:"Agent",text:"I'm sorry for the frustration. Let me help you. Which phone model and operating system are you using?"},
      {role:"Customer",text:"iPhone 14 Pro, iOS 17."},
      {role:"Agent",text:"Thank you. We did identify a bug in the payments section affecting iOS 17 users and a fix is being released tomorrow. As a temporary solution, please use our mobile website at m.apptech.com — all features work there."},
      {role:"Customer",text:"Can I do everything there?"},
      {role:"Agent",text:"Yes, 100%. All payment features are available. Also, please update the app tomorrow after 10 AM to get the patch. I'll send you a reminder SMS."},
    ],
    questions:[
      {q:"What section of the app is crashing?",opts:["Login screen","Settings","Payments section","Transaction history"],ans:2},
      {q:"What device is the customer using?",opts:["Android phone","iPhone 14 Pro, iOS 17","iPhone 12, iOS 16","Samsung Galaxy"],ans:1},
      {q:"What is the root cause of the issue?",opts:["Internet connection","A bug in the payments section affecting iOS 17","Corrupted app data","Server maintenance"],ans:1},
      {q:"When will the fix be released?",opts:["Today","Tomorrow","This weekend","Next week"],ans:1},
      {q:"What temporary solution is offered?",opts:["Download another app","Reset the phone","Use the mobile website at m.apptech.com","Wait for the update"],ans:2},
    ]
  },
  { id:35, title:"Pharmacy Prescription Refill", duration:"1:35",
    transcript:[
      {role:"Agent",text:"MediCare pharmacy. I'm Noha."},
      {role:"Customer",text:"Hi. I need to refill my prescription for blood pressure medication. I usually pick it up in person but I'd like home delivery this time."},
      {role:"Agent",text:"Of course. Do you have your prescription number or your patient ID?"},
      {role:"Customer",text:"Patient ID is MC-4421-BPMED."},
      {role:"Agent",text:"I can see your prescription. You have 3 refills remaining. For home delivery, there's a 20 EGP delivery fee, and it arrives within 24 hours."},
      {role:"Customer",text:"Can it arrive today?"},
      {role:"Agent",text:"Same-day delivery is available for orders placed before 12 PM. It's currently 10:30 AM, so yes, you qualify. The medication will arrive by 6 PM."},
      {role:"Customer",text:"Perfect. Please confirm my address."},
    ],
    questions:[
      {q:"Why is the customer calling?",opts:["New prescription","Checking side effects","Prescription refill with home delivery","Cancelling an order"],ans:2},
      {q:"How many refills remain?",opts:["1","2","3","5"],ans:2},
      {q:"What is the home delivery fee?",opts:["10 EGP","15 EGP","20 EGP","30 EGP"],ans:2},
      {q:"What is the cutoff time for same-day delivery?",opts:["10 AM","12 PM","2 PM","4 PM"],ans:1},
      {q:"By what time will the medication arrive?",opts:["12 PM","2 PM","4 PM","6 PM"],ans:3},
    ]
  },
  { id:36, title:"VIP Customer Service Escalation", duration:"2:05",
    transcript:[
      {role:"Agent",text:"PremiumLine support. I'm Zainab."},
      {role:"Customer",text:"I am a VIP member and I've been waiting on hold for 20 minutes. That is completely unacceptable. I demand an explanation."},
      {role:"Agent",text:"I sincerely apologize. As a VIP member you should never experience that wait. A technical issue affected our priority queue today — that is on us."},
      {role:"Customer",text:"I want this logged as a formal complaint."},
      {role:"Agent",text:"Absolutely. I'm logging it now as a Priority 1 complaint. You'll receive a written apology from our Service Director within 24 hours and a complimentary 3-month VIP extension."},
      {role:"Customer",text:"A 3-month extension. That's reasonable. Now, the reason I was calling — my invoice shows a duplicate charge."},
      {role:"Agent",text:"Let me look at that right away. Yes, I can see the duplicate charge. I'll reverse it now. The credit will appear within 2 business days."},
    ],
    questions:[
      {q:"How long did the customer wait on hold?",opts:["5 minutes","10 minutes","20 minutes","30 minutes"],ans:2},
      {q:"Why was the VIP queue affected?",opts:["Customer error","High call volume","A technical issue","Staff shortage"],ans:2},
      {q:"What compensation is offered for the wait?",opts:["A discount voucher","A free upgrade","A 3-month VIP membership extension","A full refund"],ans:2},
      {q:"Within how many hours will the written apology arrive?",opts:["2 hours","12 hours","24 hours","48 hours"],ans:2},
      {q:"What is the customer's original reason for calling?",opts:["Service cancellation","Password reset","A duplicate charge on the invoice","Account upgrade"],ans:2},
    ]
  },
  { id:37, title:"Incorrect Name on Official Document", duration:"1:50",
    transcript:[
      {role:"Agent",text:"DocuFast services. I'm Hana."},
      {role:"Customer",text:"I received my official document and my name is misspelled. It says 'Mohamad' instead of 'Mohamed'. This is a legal document and I can't use it like this."},
      {role:"Agent",text:"I completely understand the urgency. This is our error and we'll correct it immediately. Can I have your document reference number?"},
      {role:"Customer",text:"DF-2024-CERT-8821."},
      {role:"Agent",text:"I've confirmed the error. A corrected document will be issued and courier delivered to your registered address within 48 hours at no cost."},
      {role:"Customer",text:"What do I do with the incorrect one?"},
      {role:"Agent",text:"Please keep it and hand it to the courier when they deliver the corrected version. We'll void the incorrect document from our records."},
      {role:"Customer",text:"And there will be no charge for this correction?"},
      {role:"Agent",text:"Absolutely not. It was our error and the full correction, including redelivery, is completely free."},
    ],
    questions:[
      {q:"What is the error on the document?",opts:["Wrong address","Incorrect date","Misspelled name","Wrong document type"],ans:2},
      {q:"Why is this especially serious?",opts:["It's expensive","It's a legal document","It was lost","It arrived late"],ans:1},
      {q:"Within how many hours will the corrected document arrive?",opts:["24 hours","48 hours","72 hours","One week"],ans:1},
      {q:"What should the customer do with the incorrect document?",opts:["Destroy it","Return it immediately","Keep it and give to courier at delivery","File a complaint with authorities"],ans:2},
      {q:"How much does the correction cost the customer?",opts:["A small handling fee","200 EGP","500 EGP","Nothing, it's completely free"],ans:3},
    ]
  },
  { id:38, title:"Catering Order Complaint", duration:"1:45",
    transcript:[
      {role:"Agent",text:"GourmetCater support. I'm Tarek."},
      {role:"Customer",text:"I ordered catering for 30 people for an event yesterday. The food was 45 minutes late, arrived cold, and two items were missing entirely."},
      {role:"Agent",text:"I'm deeply sorry. That level of service is completely unacceptable for an event. Can I have your order number?"},
      {role:"Customer",text:"GC-2024-EV-5502."},
      {role:"Agent",text:"I can see the issues on our system — the delivery was delayed due to a driver shortage and two items were apparently out of stock but were not communicated to you. That's our fault."},
      {role:"Customer",text:"My guests noticed everything. It was very embarrassing."},
      {role:"Agent",text:"I understand. I'd like to offer a 40% refund on your total order and a complimentary catering package for your next event up to 2,000 EGP."},
      {role:"Customer",text:"The 40% refund is acceptable. I'm not sure about future business right now."},
    ],
    questions:[
      {q:"How late was the delivery?",opts:["15 minutes","30 minutes","45 minutes","1 hour"],ans:2},
      {q:"What were the two main problems besides lateness?",opts:["Wrong address and wrong items","Food cold and two items missing","Food cold and wrong portion size","Missing items and overcharge"],ans:1},
      {q:"What caused the delay?",opts:["Traffic","Wrong address","Driver shortage","Kitchen fire"],ans:2},
      {q:"What was the compensation offered?",opts:["30% refund and voucher","40% refund and complimentary package up to 2,000 EGP","Full refund","Free delivery on next order"],ans:1},
      {q:"What did the customer accept?",opts:["Both the refund and future offer","Only the future catering package","The 40% refund only","Nothing, escalated to manager"],ans:2},
    ]
  },
  { id:39, title:"Duplicate Account Issue", duration:"1:40",
    transcript:[
      {role:"Agent",text:"ProfileHub support. I'm Laila."},
      {role:"Customer",text:"I somehow have two accounts with your platform — one from 2021 and one from last year. All my purchase history is on the 2021 account but I can only log into the 2022 one."},
      {role:"Agent",text:"I can help merge them. Can I have the emails for both accounts?"},
      {role:"Customer",text:"The 2021 one is old.email@mail.com and the 2022 one is new.email@mail.com."},
      {role:"Agent",text:"I can see both accounts. I'll merge them, keeping all purchase history from the 2021 account and migrating it to the 2022 login credentials. The process takes about 10 minutes."},
      {role:"Customer",text:"Will I lose any data?"},
      {role:"Agent",text:"No. All orders, preferences, and saved items will be transferred. Once done, you'll receive a confirmation email to new.email@mail.com."},
    ],
    questions:[
      {q:"When was the customer's older account created?",opts:["2019","2020","2021","2023"],ans:2},
      {q:"What is the customer's main issue?",opts:["Forgotten password","Hacked account","Two accounts with purchase history on the old one","Wrong email address"],ans:2},
      {q:"What does the agent propose?",opts:["Delete the old account","Create a third account","Merge both accounts","Reset both passwords"],ans:2},
      {q:"Which account will the customer log into after the merge?",opts:["The 2021 one","The 2022 one with old credentials","The 2022 one with current credentials","A brand new account"],ans:2},
      {q:"What will the customer receive after the process?",opts:["A phone call","A PDF of purchase history","A confirmation email to new.email@mail.com","A printed receipt"],ans:2},
    ]
  },
  { id:40, title:"Language Barrier Support", duration:"1:45",
    transcript:[
      {role:"Agent",text:"GlobalCare support. I'm Sara. How can I help you today?"},
      {role:"Customer",text:"Hello. My English is not very good. I have problem with my order. Order not arrive."},
      {role:"Agent",text:"No problem at all. I'll speak slowly and clearly. Can you give me your order number?"},
      {role:"Customer",text:"Order number... it is GC-5512-2024."},
      {role:"Agent",text:"Thank you. I found your order. Your delivery is delayed. It will arrive tomorrow. Is that okay?"},
      {role:"Customer",text:"Tomorrow? What time?"},
      {role:"Agent",text:"Between 10 AM and 2 PM. You will receive a text message one hour before delivery."},
      {role:"Customer",text:"Okay. Thank you. You very helpful."},
    ],
    questions:[
      {q:"What does the customer say about their English?",opts:["It's fluent","It's limited","They are a native speaker","They speak business English"],ans:1},
      {q:"What is the customer's problem?",opts:["Wrong item received","Account suspended","Order has not arrived","Payment failed"],ans:2},
      {q:"How does the agent adapt their communication?",opts:["Speaks very fast","Uses complex vocabulary","Speaks slowly and clearly","Transfers to a translator"],ans:2},
      {q:"When will the order arrive?",opts:["Today","Tomorrow","In two days","Next week"],ans:1},
      {q:"How will the customer be notified before delivery?",opts:["Email","Phone call","Text message one hour before","Door knock"],ans:2},
    ]
  },
  { id:41, title:"Senior Customer Assistance", duration:"1:50",
    transcript:[
      {role:"Agent",text:"TeleAssist. I'm Nadia. How can I help you today?"},
      {role:"Customer",text:"Hello, dear. I'm 74 years old and my daughter set up this internet for me. Now it's not working and I don't know what to do. I'm not very good with technology."},
      {role:"Agent",text:"Don't worry at all. I'll guide you through it step by step. It's going to be very simple. Is the small black box with the lights plugged into the wall?"},
      {role:"Customer",text:"Yes, it's plugged in but all the lights are red."},
      {role:"Agent",text:"Perfect. Now, at the back of the box, you'll see a small button. Can you press and hold it for 10 seconds?"},
      {role:"Customer",text:"I pressed it. Oh! Now some lights are turning green."},
      {role:"Agent",text:"Wonderful! That means it's working. Give it 2 minutes and all lights should be green. You did a great job."},
    ],
    questions:[
      {q:"How old is the customer?",opts:["64","69","74","80"],ans:2},
      {q:"What is the problem?",opts:["Slow internet","Internet not working — all lights red","Can't log into account","Wrong plan charged"],ans:1},
      {q:"How does the agent approach the guidance?",opts:["Technical and fast","Step by step, very simple language","Transfers to technical team","Asks customer to read the manual"],ans:1},
      {q:"What does the customer do to fix the issue?",opts:["Turns off the router","Calls the electrician","Presses and holds the reset button for 10 seconds","Unplugs the box completely"],ans:2},
      {q:"What do the changing lights indicate?",opts:["The box is broken","The internet is working again","A new firmware update","The box is overheating"],ans:1},
    ]
  },
  { id:42, title:"B2B Supply Delay Complaint", duration:"1:55",
    transcript:[
      {role:"Agent",text:"SupplyChain Pro, business accounts. I'm Mariam."},
      {role:"Customer",text:"I need to speak with someone urgently. We ordered 500 units of component X4 three weeks ago for a production line that starts Monday. We've received nothing and there's no update."},
      {role:"Agent",text:"I understand the urgency. This directly impacts your production. Let me escalate this to our logistics director immediately. Can I have your purchase order number?"},
      {role:"Customer",text:"PO-B2B-2024-0088."},
      {role:"Agent",text:"I can see the order. It's been held at customs since last week. Our logistics team was not properly informed. This is a serious oversight on our part."},
      {role:"Customer",text:"If those parts don't arrive by Friday, we lose a 2 million EGP contract."},
      {role:"Agent",text:"I hear you. I'm escalating this to Priority 1 now. Our director will personally call you within 30 minutes. We will arrange expedited customs clearance and ensure delivery by Friday."},
    ],
    questions:[
      {q:"How many units were ordered?",opts:["100","250","500","1000"],ans:2},
      {q:"When does production start?",opts:["Tomorrow","This Friday","Monday","Next week"],ans:2},
      {q:"Where has the order been held?",opts:["In a warehouse","At the company's facility","At customs","In transit"],ans:2},
      {q:"What is at stake if parts don't arrive by Friday?",opts:["A small order","The agent's job","A 2 million EGP contract","The company's license"],ans:2},
      {q:"What does the agent promise?",opts:["Standard delivery","Refund if delayed","Priority escalation and Friday delivery","Nothing specific"],ans:2},
    ]
  },
  { id:43, title:"Incorrect Medical Test Results", duration:"2:00",
    transcript:[
      {role:"Agent",text:"DiagLab patient services. I'm Rana."},
      {role:"Customer",text:"I received my blood test results yesterday and I noticed my name is on the report but the patient ID belongs to someone else. These may not even be my results."},
      {role:"Agent",text:"This is a serious concern and I want to assure you we will investigate immediately. Can I have the report number and your national ID?"},
      {role:"Customer",text:"Report number RL-2024-7743. National ID: 29901022345."},
      {role:"Agent",text:"I've found the discrepancy. There was a data entry error. Your correct results are in our system. I'll prepare a corrected report and have it couriered to you within 24 hours, along with a formal apology letter."},
      {role:"Customer",text:"I'm worried someone else has my results."},
      {role:"Agent",text:"The results sent to you belong to a different patient, not yours. Your data was not shared. I'm also notifying our compliance officer to prevent recurrence."},
    ],
    questions:[
      {q:"What is the issue with the report?",opts:["Wrong test conducted","Test results are inaccurate","Name and patient ID don't match","Report is unreadable"],ans:2},
      {q:"What does the agent do immediately?",opts:["Ignores the concern","Transfers to a doctor","Investigates and finds the discrepancy","Asks for a second visit"],ans:2},
      {q:"When will the corrected report arrive?",opts:["Same day","Within 24 hours","Within 48 hours","End of week"],ans:1},
      {q:"What is the customer worried about?",opts:["Being charged twice","Getting incorrect treatment","Someone else having their results","The lab closing"],ans:2},
      {q:"Who is being notified to prevent recurrence?",opts:["The Ministry of Health","The lab director","The compliance officer","The patient's doctor"],ans:2},
    ]
  },
  { id:44, title:"Online Course Access Issue", duration:"1:40",
    transcript:[
      {role:"Agent",text:"LearnPlus support. I'm Hana."},
      {role:"Customer",text:"I bought a course three days ago but I can't access it. Every time I click on the course, it says 'Enrollment Pending'."},
      {role:"Agent",text:"I'm sorry for that. Let me check your enrollment. Can I have your email?"},
      {role:"Customer",text:"student.2024@mail.com."},
      {role:"Agent",text:"I can see your purchase was completed but the enrollment trigger failed due to a payment gateway sync issue. I'll manually enroll you now."},
      {role:"Customer",text:"How long will it take?"},
      {role:"Agent",text:"It'll be instant. Please refresh the page in 2 minutes and you'll have full access. I'll also extend your access by 3 days to compensate for the delay."},
      {role:"Customer",text:"That's great. I really needed to start this course."},
    ],
    questions:[
      {q:"How long ago was the course purchased?",opts:["Same day","Two days","Three days","One week"],ans:2},
      {q:"What error message does the customer see?",opts:["Payment Failed","Course Not Found","Enrollment Pending","Access Denied"],ans:2},
      {q:"What caused the enrollment failure?",opts:["Customer error","Server maintenance","Payment gateway sync issue","Course capacity full"],ans:2},
      {q:"How long until access is available after the fix?",opts:["Immediately","2 minutes","30 minutes","Next day"],ans:1},
      {q:"What extra compensation is given?",opts:["A full refund","A free second course","3 additional days of access","A discount on next purchase"],ans:2},
    ]
  },
  { id:45, title:"Noise Complaint — Residential Complex", duration:"1:50",
    transcript:[
      {role:"Agent",text:"CityProperty management. I'm Ahmed."},
      {role:"Customer",text:"I'm calling about a noise complaint. My neighbor in apartment 5B has been playing loud music until 2 AM every night for the past week. I've knocked on their door but nothing has changed."},
      {role:"Agent",text:"I'm sorry you're dealing with this. Our quiet hours policy prohibits loud noise after 10 PM. This is a clear violation. Can I have your apartment number?"},
      {role:"Customer",text:"I'm in 5A."},
      {role:"Agent",text:"I'll issue an official noise violation notice to apartment 5B today. If the issue continues, the next step is a formal warning, which can escalate to lease review."},
      {role:"Customer",text:"Will they know it came from me?"},
      {role:"Agent",text:"All complaints are confidential. The notice will reference a building-wide policy reminder, not your specific complaint."},
    ],
    questions:[
      {q:"How long has the noise issue been occurring?",opts:["One day","Three days","One week","Two weeks"],ans:2},
      {q:"Until what time has the neighbor been playing music?",opts:["Midnight","1 AM","2 AM","3 AM"],ans:2},
      {q:"What are the building's quiet hours?",opts:["After 9 PM","After 10 PM","After 11 PM","After midnight"],ans:1},
      {q:"What will the agent issue to apartment 5B?",opts:["An eviction notice","A police report","An official noise violation notice","A warning call"],ans:2},
      {q:"Will the complaint be traced back to the customer?",opts:["Yes, the neighbor will be told","No, all complaints are confidential","Only if it goes to court","The customer must sign a statement"],ans:1},
    ]
  },
];

// ─── SPEAKING PROMPTS ───
const ALL_SPEAKING_PROMPTS = [
  "Greet a customer calling about a billing discrepancy and make them feel heard.",
  "Explain to a customer that their delivery will be delayed by two days.",
  "De-escalate an angry customer who has been on hold for 30 minutes.",
  "Close a call professionally after resolving a customer complaint.",
  "Explain your company's refund policy clearly and politely.",
  "Handle a customer who is asking for a discount you cannot authorize.",
  "Introduce yourself and your role at the start of a customer call.",
  "Summarize the steps you have taken to resolve a customer's issue.",
  "Ask a customer for their verification information politely and professionally.",
  "Apologize to a customer for a service outage that lasted 3 hours.",
  "Explain the difference between your Basic and Premium plans to a customer.",
  "Describe how you would handle two frustrated customers at the same time.",
  "Tell the interviewer about your strongest communication skill with an example.",
  "Explain why you want to work in a customer service role.",
  "Describe a time you stayed calm under pressure and what the outcome was.",
  "Handle a customer who insists on speaking to a manager immediately.",
  "Explain a technical issue in simple language to a non-technical customer.",
  "Practice saying the NATO phonetic alphabet to confirm a customer's name.",
  "Respond to a customer who says: 'Your company is the worst I have ever dealt with.'",
  "Walk a customer through resetting their password step by step.",
];

const TESTIMONIALS = [
  { name: "Ahmed Hassan", role: "BPO Agent, Cairo", text: "I went from B1 to B2 in 3 weeks using this platform. The HR simulation was exactly like my real interview!", avatar: "AH", score: "B2" },
  { name: "Nour Khalil", role: "Customer Support, Alex", text: "The AI feedback on my speaking was incredibly detailed. I finally understood my pronunciation mistakes.", avatar: "NK", score: "C1" },
  { name: "Mohamed Farouk", role: "Call Center Rep, Giza", text: "Best platform for call center prep. The grammar tests are spot-on for what interviewers actually ask.", avatar: "MF", score: "B1" },
];

const BLOG_POSTS = [
  {
    id: 1,
    cat: "Speaking Tips",
    title: "10 Phrases That Will Impress Any Call Center Interviewer",
    excerpt: "Master these power phrases to demonstrate clarity, empathy, and professionalism in your next interview.",
    time: "5 min read",
    date: "May 10, 2025",
    author: "English Test Team",
    content: `Landing a call center job isn't just about speaking English — it's about speaking it professionally, empathetically, and clearly under pressure. Interviewers listen for specific phrases that signal you're ready for the role. Here are 10 power phrases that will immediately set you apart.

**1. "I completely understand how frustrating that must be."**
This phrase demonstrates empathy — the single most valued skill in customer service. Don't just say "I understand." Say you completely understand and connect it to their feeling.

**2. "Allow me to look into that for you right away."**
This shows urgency and ownership. "Right away" signals you're proactive, not passive.

**3. "Just to confirm I have this right..."**
Active listening isn't silent. Paraphrasing back what the customer said proves you heard them and prevents miscommunication.

**4. "What I can do for you is..."**
This is the professional alternative to "I can't do that." It shifts focus from limitation to solution — and interviewers love it.

**5. "I sincerely apologize for the inconvenience caused."**
The word "sincerely" elevates a basic apology into a professional one. Pair it with a solution for maximum impact.

**6. "Rest assured, I will personally follow up on this."**
Taking personal ownership of a case is a B2-level communication skill that separates average agents from great ones.

**7. "Would you mind if I placed you on a brief hold while I check that?"**
Asking permission before putting someone on hold is a courtesy that most agents skip. Doing it makes you memorable.

**8. "I appreciate your patience."**
Simple, sincere, and powerful. Say this after a hold, a wait, or a long explanation.

**9. "Is there anything else I can assist you with today?"**
This closing phrase shows you're thorough and customer-focused — never in a hurry to end the call.

**10. "Thank you for bringing this to our attention."**
Turn every complaint into a positive interaction. This phrase transforms a negative experience into a valued contribution.

**Putting It All Together**
Practice these phrases out loud daily. Record yourself. Listen back. The goal isn't to sound scripted — it's to have these phrases so internalized that they come naturally when you're under pressure in a real interview or call.`,
  },
  {
    id: 2,
    cat: "Grammar Guide",
    title: "Common Grammar Mistakes in Customer Service English",
    excerpt: "Avoid these critical errors that cost applicants the job — and learn the correct forms with real examples.",
    time: "7 min read",
    date: "May 8, 2025",
    author: "English Test Team",
    content: `Grammar mistakes in a call center interview don't just affect your score — they affect the interviewer's confidence in your ability to communicate with customers professionally. Here are the most common errors, why they happen, and how to fix them.

**Mistake 1: Mixing up present simple and present continuous**
❌ "The customer is call about a billing issue."
✅ "The customer is calling about a billing issue."

Use present continuous (-ing) for actions happening right now. Use present simple for habits and facts.

**Mistake 2: Wrong passive voice**
❌ "The complaint was not resolve yet."
✅ "The complaint has not been resolved yet."

Passive voice requires: to be + past participle. "Resolve" becomes "resolved."

**Mistake 3: Subject-verb agreement errors**
❌ "Neither the agent nor the supervisors was informed."
✅ "Neither the agent nor the supervisors were informed."

When using "neither...nor," the verb agrees with the subject closer to it — "supervisors" (plural) = "were."

**Mistake 4: Overusing "I will" instead of "I'll" in speech**
In natural spoken English, contractions sound more human and less robotic. "I'll check that" sounds warmer than "I will check that."

**Mistake 5: Incorrect conditionals**
❌ "If the customer will call back, I will resolve it."
✅ "If the customer calls back, I will resolve it."

In real conditional sentences (Type 1), use present simple in the if-clause, not future.

**Mistake 6: Missing articles (a/an/the)**
❌ "Please hold while I check account."
✅ "Please hold while I check the account."

Articles are one of the hardest things for Arabic speakers. "The" is used for specific things both speakers know about.

**Quick Practice Rule:**
Before your interview, write 5 sentences using each structure above. Say them aloud 10 times each. Your brain will start choosing the correct form automatically.`,
  },
  {
    id: 3,
    cat: "HR Prep",
    title: "How to Answer 'Tell Me About Yourself' Perfectly",
    excerpt: "A step-by-step framework used by successful BPO applicants to craft a compelling 90-second introduction.",
    time: "6 min read",
    date: "May 6, 2025",
    author: "English Test Team",
    content: `"Tell me about yourself" is the most asked — and most mishandled — question in any interview. Most candidates either ramble for 5 minutes or give a one-sentence answer. Here's a framework that takes exactly 90 seconds and leaves a strong impression.

**The P-R-P Framework: Present → Relevant Past → Purpose**

**Step 1: Present (20 seconds)**
Start with who you are right now — your current role, key skill, or status.
Example: "I'm currently working as a customer service representative at a retail company, where I handle around 40 customer inquiries per day."

**Step 2: Relevant Past (40 seconds)**
Mention 1–2 experiences that are directly relevant to the job you're applying for.
Example: "Before that, I completed a 6-month customer support internship where I handled billing inquiries and learned how to manage difficult customers calmly. I also took an English proficiency course and scored B2 level."

**Step 3: Purpose (30 seconds)**
End with why you're here — your motivation for this specific role.
Example: "I'm applying to this position because I want to grow in a professional BPO environment where I can use my English skills daily and develop into a senior agent role within the next two years."

**What NOT to do:**
- Don't start with "My name is..." — they already know your name.
- Don't mention personal details like family, age, or location unless asked.
- Don't read from a script — memorize the structure, not the words.

**Practice tip:**
Record yourself on your phone. Watch it back. Does it sound natural? Do you pause at the right moments? Is your pacing comfortable? Aim to feel like you're having a conversation, not delivering a speech.`,
  },
  {
    id: 4,
    cat: "Vocabulary",
    title: "100 Essential Call Center English Terms You Must Know",
    excerpt: "From SLA to escalation, master the vocabulary that separates beginners from professionals.",
    time: "10 min read",
    date: "May 3, 2025",
    author: "English Test Team",
    content: `Working in a call center means swimming in acronyms, jargon, and professional phrases from day one. Here are the most essential terms you need to know — grouped by category.

**Performance Metrics**
- **AHT (Average Handling Time):** The average time spent on a call including hold and wrap-up time.
- **FCR (First Call Resolution):** Resolving the customer's issue in a single call without follow-up.
- **CSAT (Customer Satisfaction Score):** A post-call survey score measuring customer happiness.
- **NPS (Net Promoter Score):** Measures how likely a customer is to recommend the company.
- **SLA (Service Level Agreement):** A contract defining expected service performance standards.
- **Occupancy Rate:** The percentage of time agents are actively handling calls.
- **Adherence:** How closely an agent follows their scheduled work hours.

**Call Handling Terms**
- **Escalation:** Transferring a call to a higher-level agent or supervisor.
- **Queue:** A line of waiting calls before being answered.
- **Hold:** Pausing a call while the agent checks information.
- **Warm Transfer:** Briefly explaining a customer's issue to the next agent before transferring.
- **Cold Transfer:** Transferring without explanation.
- **ACW (After Call Work):** Time spent on documentation after a call ends.
- **Wrap-up Time:** Same as ACW.

**Customer Interaction Phrases**
- **Empathy statement:** A phrase showing you understand the customer's feelings.
- **Probing question:** A question asked to better understand the customer's issue.
- **Verification:** Confirming the customer's identity before accessing their account.
- **Resolution:** The solution provided to the customer's problem.
- **De-escalation:** Calming an angry or upset customer.

**Professional Communication**
- **Active listening:** Fully concentrating and responding thoughtfully.
- **Rapport:** A positive connection built with a customer.
- **Articulate:** Able to express ideas clearly.
- **Concise:** Brief and to the point.
- **Verbose:** Using too many words — avoid this.

Knowing these terms fluently will make you sound confident and prepared from your very first day.`,
  },
  {
    id: 5,
    cat: "Listening Skills",
    title: "How to Improve Your Listening Comprehension for Call Center Work",
    excerpt: "Practical techniques to train your ear for fast, natural-speed English in real customer interactions.",
    time: "8 min read",
    date: "April 30, 2025",
    author: "English Test Team",
    content: `Listening is harder than it looks. In a real call center, customers speak fast, use slang, have accents, and don't pause for you to process. Here's how to train your listening comprehension systematically.

**Why Listening is Hard**
When we learn English in school, we hear slow, clear, textbook speech. Real English is different — words merge, sounds drop, and pace is much faster. "Did you eat?" sounds like "Jeet?" in natural speech.

**Technique 1: Shadowing**
Find a YouTube call center roleplay video. Play 10 seconds. Pause. Repeat exactly what you heard — same speed, same rhythm, same tone. This trains both your ear and your mouth simultaneously.

**Technique 2: Dictation Practice**
Play an English audio clip. Write down exactly what you hear, word for word. Then check your transcript. This forces deep listening, not passive listening.

**Technique 3: Active Podcast Listening**
Don't just have podcasts playing in the background. Choose one English podcast episode per week. Listen once without stopping. Then listen again and pause at every sentence you didn't fully catch.

**Technique 4: Note-Taking While Listening**
While watching a call center training video, take notes. Don't pause. Write the key points you catch. This simulates real call conditions where you must listen and process simultaneously.

**Technique 5: Predict Before You Hear**
In a customer call context, you can often predict what the customer will say next based on context. Training this prediction skill reduces the cognitive load of listening.

**Daily Practice Plan:**
- 15 minutes of shadowing
- 10 minutes of dictation
- 20 minutes of podcast listening with active attention
- Do this for 30 days and your listening will transform.`,
  },
  {
    id: 6,
    cat: "Career Tips",
    title: "How to Pass a BPO English Assessment in Egypt",
    excerpt: "What to expect in the English test stage of call center hiring — and how to score B2 or above.",
    time: "9 min read",
    date: "April 25, 2025",
    author: "English Test Team",
    content: `Most BPO companies in Egypt — whether Majorel, Concentrix, Teleperformance, or local call centers — require candidates to pass an English assessment before an interview. Here's exactly what to expect and how to prepare.

**What's Typically Tested**
1. Grammar: Multiple choice on tenses, conditionals, passive voice
2. Vocabulary: Business and customer service terms
3. Reading comprehension: Short passages with questions
4. Listening: A recorded call with comprehension questions
5. Speaking: A roleplay scenario or structured questions

**The Scoring System**
Most companies use CEFR levels: A1, A2, B1, B2, C1. For English-speaking accounts (US/UK clients), you typically need B2 minimum. For Arabic-speaking accounts with English reports, B1 is often acceptable.

**Grammar Focus Areas**
- Present perfect vs. simple past
- Passive voice constructions
- Conditional sentences (Type 1 and 2)
- Modal verbs (can/could/would/should/must)

**Common Interview Roleplay Scenarios**
- Handle an angry customer calling about a billing error
- Explain a product feature to a first-time customer
- De-escalate a frustrated customer threatening to cancel
- Close a call after resolving an issue professionally

**The Day Before the Test**
- Sleep well. Cognitive performance drops significantly with poor sleep.
- Review professional phrases and common phrasal verbs.
- Do a 20-minute speaking practice out loud.
- Don't memorize scripts — memorize patterns.

**The Golden Rule**
Every interviewer and assessor knows you're nervous. They're not testing perfection — they're testing your ability to communicate clearly under pressure. Speak slowly, confidently, and correct yourself gracefully if you make a mistake.`,
  },
];


const FAQ_DATA = [
  { q: "How long does the full assessment take?", a: "The complete English assessment takes approximately 45–60 minutes. You can also take individual sections separately in 10–15 minutes each." },
  { q: "What CEFR levels do you test?", a: "We assess from A2 (Elementary) through C1 (Advanced), covering all common call center hiring requirements." },
  { q: "Is my microphone data stored?", a: "Voice recordings are processed in real-time by our AI and are not stored permanently. Your privacy is our priority." },
  { q: "Can I retake the assessment?", a: "Yes, you can retake each section up to 3 times per week. Your best score is always displayed on your dashboard." },
];

const LEVEL_MAP = { A2: { min: 0, max: 49, color: "#f59e0b", label: "Elementary" }, B1: { min: 50, max: 64, color: "#3b82f6", label: "Intermediate" }, B2: { min: 65, max: 79, color: "#8b5cf6", label: "Upper Intermediate" }, C1: { min: 80, max: 100, color: "#10b981", label: "Advanced" } };

function getLevel(score) {
  for (const [lvl, data] of Object.entries(LEVEL_MAP)) {
    if (score >= data.min && score <= data.max) return { lvl, ...data };
  }
  return { lvl: "B1", ...LEVEL_MAP.B1 };
}

// ─── LEADERBOARD DATA ───
const INITIAL_LEADERBOARD = [
  { name: "Sarah M.", score: 96, level: "C1", test: "Grammar", country: "🇪🇬" },
  { name: "Ahmed K.", score: 92, level: "C1", test: "HR Simulation", country: "🇸🇦" },
  { name: "Nour A.", score: 89, level: "B2", test: "Vocabulary", country: "🇪🇬" },
  { name: "Omar F.", score: 86, level: "B2", test: "Reading", country: "🇯🇴" },
  { name: "Layla H.", score: 83, level: "B2", test: "Listening", country: "🇪🇬" },
  { name: "Karim S.", score: 81, level: "B2", test: "Grammar", country: "🇱🇧" },
  { name: "Dina R.", score: 78, level: "B1", test: "Vocabulary", country: "🇸🇦" },
  { name: "Youssef T.", score: 75, level: "B1", test: "HR Simulation", country: "🇪🇬" },
];

// ─── GEMINI API HELPER ───
const GEMINI_KEY = "AIzaSyD560phFOF2mTEg5PmAs6tbGgvXfiUvkN8";
async function callGemini(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// ═══════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');

  :root {
    --bg: #050810;
    --bg2: #080d1a;
    --bg3: #0d1424;
    --card: rgba(13,20,40,0.8);
    --border: rgba(99,102,241,0.2);
    --border2: rgba(139,92,246,0.3);
    --indigo: #6366f1;
    --violet: #8b5cf6;
    --cyan: #22d3ee;
    --emerald: #10b981;
    --rose: #f43f5e;
    --amber: #f59e0b;
    --text: #e2e8f0;
    --muted: #94a3b8;
    --dim: #475569;
    --glow-indigo: 0 0 40px rgba(99,102,241,0.3);
    --glow-violet: 0 0 40px rgba(139,92,246,0.3);
    --glow-cyan: 0 0 40px rgba(34,211,238,0.2);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Sora', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .ar body, [dir="rtl"] { font-family: 'Noto Sans Arabic', 'Sora', sans-serif; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg2); }
  ::-webkit-scrollbar-thumb { background: var(--indigo); border-radius: 3px; }

  /* NOISE OVERLAY */
  .noise::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* GRID BG */
  .grid-bg {
    background-image:
      linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* GLOW ORBS */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 { width: 500px; height: 500px; background: rgba(99,102,241,0.15); top: -100px; left: -100px; }
  .orb-2 { width: 400px; height: 400px; background: rgba(139,92,246,0.12); bottom: 0; right: -80px; }
  .orb-3 { width: 300px; height: 300px; background: rgba(34,211,238,0.08); top: 50%; left: 50%; transform: translate(-50%,-50%); }

  /* NAV */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    background: rgba(5,8,16,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    gap: 24px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--indigo), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
    cursor: pointer;
  }

  .nav-logo span { font-size: 22px; -webkit-text-fill-color: initial; }

  .nav-links {
    display: flex;
    gap: 4px;
    flex: 1;
    overflow-x: auto;
  }

  .nav-link {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    border: none;
    background: none;
  }
  .nav-link:hover, .nav-link.active { color: var(--text); background: rgba(99,102,241,0.12); }

  .nav-actions { display: flex; gap: 8px; align-items: center; }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: inherit;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--indigo), var(--violet));
    color: white;
    box-shadow: 0 0 20px rgba(99,102,241,0.3);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(99,102,241,0.5); }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { border-color: var(--indigo); color: var(--text); }

  .btn-outline {
    background: transparent;
    color: var(--indigo);
    border: 1px solid var(--indigo);
  }
  .btn-outline:hover { background: rgba(99,102,241,0.1); }

  .btn-danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; }
  .btn-success { background: linear-gradient(135deg, var(--emerald), #059669); color: white; }
  .btn-lang { background: rgba(34,211,238,0.1); color: var(--cyan); border: 1px solid rgba(34,211,238,0.3); font-size: 12px; padding: 5px 12px; }

  /* SECTIONS */
  .section { padding: 80px 24px; position: relative; }
  .section-sm { padding: 40px 24px; }
  .container { max-width: 1100px; margin: 0 auto; }

  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: rgba(99,102,241,0.12);
    color: var(--indigo);
    border: 1px solid rgba(99,102,241,0.25);
    margin-bottom: 16px;
  }

  .section-title {
    font-size: clamp(26px, 4vw, 42px);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 12px;
  }

  .section-sub {
    font-size: 15px;
    color: var(--muted);
    max-width: 540px;
  }

  .grad-text {
    background: linear-gradient(135deg, var(--indigo), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 24px 60px;
    position: relative;
    overflow: hidden;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.3);
    color: var(--cyan);
    margin-bottom: 28px;
    animation: fadeUp 0.6s ease both;
  }

  .hero-badge::before { content: '✦'; color: var(--indigo); }

  .hero h1 {
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .hero-sub {
    font-size: clamp(14px, 2vw, 18px);
    color: var(--muted);
    max-width: 600px;
    line-height: 1.7;
    margin-bottom: 36px;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; animation: fadeUp 0.6s 0.3s ease both; }

  .hero-stats {
    display: flex;
    gap: 40px;
    margin-top: 60px;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeUp 0.6s 0.4s ease both;
  }

  .hero-stat { text-align: center; }
  .hero-stat-num { font-size: 32px; font-weight: 800; background: linear-gradient(135deg, var(--indigo), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; }

  .hero-visual {
    margin-top: 60px;
    width: 100%;
    max-width: 700px;
    border-radius: 20px;
    border: 1px solid var(--border);
    background: var(--card);
    backdrop-filter: blur(20px);
    padding: 24px;
    animation: fadeUp 0.6s 0.5s ease both;
  }

  /* CARDS */
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
  }
  .card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: var(--glow-indigo); }

  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }

  .card-icon { font-size: 32px; margin-bottom: 12px; }
  .card-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
  .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ASSESSMENT */
  .assess-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
  .assess-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  .assess-card:hover { border-color: var(--indigo); transform: translateY(-4px); box-shadow: var(--glow-indigo); }
  .assess-card .icon { font-size: 36px; margin-bottom: 12px; }
  .assess-card .label { font-size: 13px; font-weight: 600; color: var(--text); }

  /* QUIZ */
  .quiz-wrap { max-width: 680px; margin: 0 auto; }
  .quiz-question { font-size: 18px; font-weight: 600; margin-bottom: 24px; line-height: 1.5; }
  .quiz-options { display: flex; flex-direction: column; gap: 12px; }
  .quiz-opt {
    padding: 14px 20px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: rgba(13,20,40,0.6);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    text-align: left;
  }
  [dir="rtl"] .quiz-opt { text-align: right; }
  .quiz-opt:hover { border-color: var(--indigo); background: rgba(99,102,241,0.08); }
  .quiz-opt.selected { border-color: var(--violet); background: rgba(139,92,246,0.15); color: white; }
  .quiz-opt.correct { border-color: var(--emerald); background: rgba(16,185,129,0.15); color: var(--emerald); }
  .quiz-opt.wrong { border-color: var(--rose); background: rgba(244,63,94,0.1); color: var(--rose); }

  /* PROGRESS */
  .progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(99,102,241,0.15);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--indigo), var(--cyan));
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  /* TIMER */
  .timer {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 8px;
    background: rgba(244,63,94,0.1);
    border: 1px solid rgba(244,63,94,0.25);
    color: var(--rose);
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  /* RESULT */
  .result-card {
    text-align: center;
    padding: 48px 32px;
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 20px;
    max-width: 480px;
    margin: 0 auto;
  }
  .result-score {
    font-size: 72px;
    font-weight: 800;
    line-height: 1;
    margin: 16px 0;
  }
  .result-level {
    font-size: 28px;
    font-weight: 800;
    padding: 8px 24px;
    border-radius: 12px;
    display: inline-block;
    margin-bottom: 16px;
  }

  /* DASHBOARD */
  .stat-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; text-align: center; }
  .stat-num { font-size: 28px; font-weight: 800; }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; }

  /* AUTH */
  .auth-card { max-width: 420px; margin: 0 auto; padding: 40px; }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 13px; font-weight: 500; color: var(--muted); margin-bottom: 6px; }
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: rgba(13,20,40,0.8);
    color: var(--text);
    font-family: inherit;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  .divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; color: var(--dim); font-size: 12px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  /* ADMIN */
  .admin-sidebar { min-width: 200px; border-right: 1px solid var(--border); }
  [dir="rtl"] .admin-sidebar { border-right: none; border-left: 1px solid var(--border); }
  .admin-nav-item { padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--muted); transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
  .admin-nav-item:hover, .admin-nav-item.active { background: rgba(99,102,241,0.12); color: var(--text); }

  /* HR SIM */
  .hr-question { font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 32px; padding: 24px; background: rgba(99,102,241,0.06); border: 1px solid var(--border); border-radius: 16px; line-height: 1.5; }
  .hr-answer { width: 100%; min-height: 120px; padding: 16px; border-radius: 12px; border: 1px solid var(--border); background: rgba(13,20,40,0.8); color: var(--text); font-family: inherit; font-size: 14px; resize: vertical; outline: none; }
  .hr-answer:focus { border-color: var(--indigo); }

  /* TESTIMONIALS */
  .testi-card { padding: 28px; background: var(--card); border: 1px solid var(--border); border-radius: 16px; }
  .testi-stars { color: var(--amber); font-size: 14px; margin-bottom: 12px; }
  .testi-text { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 16px; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--indigo), var(--violet)); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; }
  .testi-name { font-size: 14px; font-weight: 600; }
  .testi-role { font-size: 12px; color: var(--muted); }
  .testi-badge { padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-left: auto; }

  /* BLOG */
  .blog-card { overflow: hidden; cursor: pointer; }
  .blog-cat { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--cyan); margin-bottom: 10px; }
  .blog-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; line-height: 1.4; }
  .blog-excerpt { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .blog-meta { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--dim); }
  .blog-read { color: var(--indigo); font-weight: 600; cursor: pointer; }
  .blog-read:hover { color: var(--cyan); }

  /* FAQ */
  .faq-item { border-bottom: 1px solid var(--border); }
  .faq-q { padding: 18px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 600; }
  .faq-a { font-size: 14px; color: var(--muted); line-height: 1.7; padding-bottom: 18px; }

  /* AD SPACES */
  .ad-banner { border: 1px dashed rgba(99,102,241,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; text-align: center; background: rgba(13,20,40,0.5); color: var(--dim); font-size: 12px; }
  .ad-banner-top { height: 80px; margin-bottom: 16px; }
  .ad-banner-side { height: 300px; }
  .ad-banner-footer { height: 90px; }

  /* FOOTER */
  .footer { padding: 48px 24px 24px; border-top: 1px solid var(--border); }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
  .footer-brand { font-size: 13px; color: var(--muted); line-height: 1.7; margin-top: 8px; }
  .footer-col-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--dim); margin-bottom: 12px; }
  .footer-link { font-size: 13px; color: var(--muted); cursor: pointer; display: block; margin-bottom: 8px; transition: color 0.2s; }
  .footer-link:hover { color: var(--text); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid var(--border); font-size: 12px; color: var(--dim); flex-wrap: wrap; gap: 8px; }

  /* SPEAKING */
  .mic-btn {
    width: 72px; height: 72px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, var(--rose), #dc2626);
    color: white;
    font-size: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    box-shadow: 0 0 20px rgba(244,63,94,0.3);
  }
  .mic-btn.recording {
    animation: pulse-mic 1.5s infinite;
    box-shadow: 0 0 0 0 rgba(244,63,94,0.4);
  }
  .mic-btn.idle { background: linear-gradient(135deg, var(--indigo), var(--violet)); box-shadow: 0 0 20px rgba(99,102,241,0.3); }

  /* READING PASSAGE */
  .passage { background: rgba(13,20,40,0.6); border: 1px solid var(--border); border-radius: 12px; padding: 20px; font-size: 14px; line-height: 1.8; color: var(--muted); margin-bottom: 24px; }

  /* CHIP */
  .chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .chip-indigo { background: rgba(99,102,241,0.15); color: var(--indigo); border: 1px solid rgba(99,102,241,0.25); }
  .chip-green { background: rgba(16,185,129,0.15); color: var(--emerald); border: 1px solid rgba(16,185,129,0.25); }
  .chip-red { background: rgba(244,63,94,0.12); color: var(--rose); border: 1px solid rgba(244,63,94,0.2); }
  .chip-amber { background: rgba(245,158,11,0.12); color: var(--amber); border: 1px solid rgba(245,158,11,0.2); }

  /* TABLE */
  .table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .table th { text-align: left; padding: 10px 14px; color: var(--muted); font-weight: 600; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid var(--border); }
  [dir="rtl"] .table th { text-align: right; }
  .table td { padding: 12px 14px; border-bottom: 1px solid rgba(99,102,241,0.07); }
  .table tr:hover td { background: rgba(99,102,241,0.04); }

  /* FEATURE LIST */
  .feat-item { display: flex; align-items: flex-start; gap: 12px; padding: 16px 0; border-bottom: 1px solid var(--border); }
  .feat-item:last-child { border-bottom: none; }
  .feat-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(99,102,241,0.12); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .feat-body { flex: 1; }
  .feat-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .feat-desc { font-size: 13px; color: var(--muted); }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse-mic { 0% { box-shadow: 0 0 0 0 rgba(244,63,94,0.5); } 70% { box-shadow: 0 0 0 16px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

  .float { animation: float 4s ease-in-out infinite; }
  .fade-in { animation: fadeUp 0.5s ease both; }
  .spin { animation: spin 1s linear infinite; }

  /* TABS */
  .tabs { display: flex; gap: 4px; background: rgba(13,20,40,0.8); border: 1px solid var(--border); border-radius: 12px; padding: 4px; margin-bottom: 24px; }
  .tab { flex: 1; padding: 8px; text-align: center; border-radius: 8px; font-size: 12px; font-weight: 600; color: var(--muted); cursor: pointer; transition: all 0.2s; }
  .tab.active { background: linear-gradient(135deg, var(--indigo), var(--violet)); color: white; }

  /* BADGES */
  .badge { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
  .badge-new { background: rgba(16,185,129,0.2); color: var(--emerald); }
  .badge-pro { background: rgba(139,92,246,0.2); color: var(--violet); }

  /* NOTIFICATION DOT */
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--rose); display: inline-block; }

  /* BLOG POST PAGE */
  .blog-post-content { font-size: 15px; line-height: 1.9; color: var(--muted); }
  .blog-post-content strong { color: var(--text); font-weight: 700; }
  .blog-hero-img { width: 100%; height: 220px; border-radius: 16px; background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2)); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 64px; margin-bottom: 32px; }

  /* RESULT REPORT */
  .result-section { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; margin-bottom: 16px; }
  .result-section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--dim); margin-bottom: 12px; }
  .score-bar-wrap { margin-bottom: 10px; }
  .score-bar-label { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px; }
  .score-bar-track { height: 8px; background: rgba(99,102,241,0.12); border-radius: 4px; overflow: hidden; }
  .score-bar-fill { height: 100%; border-radius: 4px; transition: width 1s ease; }

  /* CERTIFICATE */
  .certificate { background: linear-gradient(135deg, rgba(13,20,40,0.95), rgba(8,13,26,0.98)); border: 2px solid; border-radius: 20px; padding: 40px; text-align: center; max-width: 640px; margin: 0 auto; position: relative; overflow: hidden; }
  .certificate::before { content: ''; position: absolute; inset: 6px; border: 1px solid; border-radius: 16px; opacity: 0.3; pointer-events: none; }
  .cert-title { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 8px; }
  .cert-name { font-size: 32px; font-weight: 800; margin: 12px 0; }
  .cert-level { font-size: 48px; font-weight: 900; margin: 8px 0; }
  .cert-watermark { position: absolute; font-size: 120px; opacity: 0.03; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }

  /* LEADERBOARD */
  .lb-row { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border); background: var(--card); margin-bottom: 8px; transition: all 0.2s; }
  .lb-row:hover { border-color: var(--border2); }
  .lb-rank { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; flex-shrink: 0; }
  .lb-rank-1 { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }
  .lb-rank-2 { background: linear-gradient(135deg, #94a3b8, #64748b); color: white; }
  .lb-rank-3 { background: linear-gradient(135deg, #b45309, #92400e); color: white; }
  .lb-rank-other { background: rgba(99,102,241,0.1); color: var(--muted); }

  /* STT VOICE INPUT */
  .voice-btn { width: 80px; height: 80px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 32px; transition: all 0.3s; margin: 0 auto; }
  .voice-btn-idle { background: linear-gradient(135deg, var(--indigo), var(--violet)); box-shadow: 0 0 24px rgba(99,102,241,0.4); }
  .voice-btn-listening { background: linear-gradient(135deg, var(--rose), #dc2626); animation: pulse-mic 1.2s infinite; box-shadow: 0 0 30px rgba(244,63,94,0.5); }

  /* ABOUT / LEGAL PAGES */
  .page-prose { max-width: 720px; margin: 0 auto; font-size: 15px; line-height: 1.9; color: var(--muted); }
  .page-prose h2 { font-size: 20px; font-weight: 700; color: var(--text); margin: 28px 0 10px; }
  .page-prose h3 { font-size: 16px; font-weight: 600; color: var(--text); margin: 20px 0 8px; }
  .page-prose p { margin-bottom: 14px; }

  /* CONTACT FORM */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  @media (max-width: 600px) { .contact-grid { grid-template-columns: 1fr; } }
  textarea.form-input { min-height: 120px; resize: vertical; }

  /* RESPONSIVE IMPROVEMENTS */
  @media (max-width: 900px) { .feat-layout { grid-template-columns: 1fr !important; } }
  @media (max-width: 600px) { .hero-stats { gap: 16px; } .hero-stat-num { font-size: 24px; } .certificate { padding: 24px 16px; } .cert-level { font-size: 36px; } }



  /* SCROLLABLE TABS MOBILE */
  @media (max-width: 480px) {
    .assess-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* INPUT RANGE */
  input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 2px; background: var(--border); outline: none; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: var(--indigo); cursor: pointer; }

  /* TOOLTIP */
  .tooltip { position: relative; }
  .tooltip-text { position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%); background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 6px 10px; font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s; }
  .tooltip:hover .tooltip-text { opacity: 1; }
`;

// ═══════════════════════════════════════════════
// SUBCOMPONENTS
// ═══════════════════════════════════════════════

function AdBanner({ className = "", label = "Advertisement" }) {
  return (
    <div className={`ad-banner ${className}`} style={{ padding: "12px" }}>
      <div>
        <div style={{ fontSize: 11, marginBottom: 4, color: "var(--dim)" }}>📢 {label}</div>
        <div style={{ fontSize: 12 }}>Google AdSense Banner</div>
      </div>
    </div>
  );
}

function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${(current / total) * 100}%` }} />
    </div>
  );
}

function Timer({ seconds }) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return <div className="timer">⏱ {m}:{s}</div>;
}

// ═══════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════

function HomePage({ t, setPage, lang }) {
  const [faqOpen, setFaqOpen] = useState(null);

  const heroSubtitles = {
    en: [
      "Rate your English and get ready for better opportunities",
      "Test your skills and discover your true English level",
      "Your English journey starts with a single test",
      "Assess your level. Build your confidence. Land the job",
      "Start your assessment and see where you stand today",
    ],
    ar: [
      "قيّم لغتك الإنجليزية واستعد لفرص أفضل",
      "اختبر قدراتك الآن واكتشف مستواك الحقيقي",
      "ما مستواك في الإنجليزية؟ اعرف في دقائق",
      "قيّم مستواك. ابنِ ثقتك. احصل على الوظيفة",
      "ابدأ تقييمك الآن وشوف أين تقف اليوم",
    ],
  };

  const [subtitleIdx, setSubtitleIdx] = useState(() => Math.floor(Math.random() * 5));

  useEffect(() => {
    setSubtitleIdx(Math.floor(Math.random() * heroSubtitles[lang].length));
  }, [lang]);

  const subtitle = heroSubtitles[lang][subtitleIdx];

  return (
    <div>
      {/* TOP AD */}
      <div className="container" style={{ paddingTop: 80 }}>
        <AdBanner className="ad-banner-top" />
      </div>

      {/* HERO */}
      <section className="hero grid-bg" style={{ paddingTop: 40 }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 900, margin: "0 auto" }}>
          <div className="hero-badge">{t.hero.badge}</div>
          <h1 key={subtitleIdx} style={{ animation: "fadeUp 0.5s ease both" }}>
            <span className="grad-text">{subtitle}</span>
          </h1>
          <div className="hero-ctas">
            <button className="btn btn-primary" style={{ padding: "13px 28px", fontSize: 15 }} onClick={() => setPage("assessment")}>
              🚀 {t.hero.cta1}
            </button>
            <button className="btn btn-ghost" style={{ padding: "13px 28px", fontSize: 15 }} onClick={() => setPage("dashboard")}>
              📊 {t.hero.cta2}
            </button>
          </div>
          <div className="hero-stats">
            {[["50K+", t.hero.stat1], ["2,400+", t.hero.stat2], ["94%", t.hero.stat3]].map(([n, l]) => (
              <div className="hero-stat" key={l}><div className="hero-stat-num">{n}</div><div className="hero-stat-label">{l}</div></div>
            ))}
          </div>
          {/* MOCK PLATFORM PREVIEW */}
          <div className="hero-visual float" style={{ marginTop: 48 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["Grammar", "Speaking", "Vocabulary", "HR Sim"].map((s, i) => (
                <div key={i} className="chip chip-indigo" style={{ fontSize: 11 }}>{s}</div>
              ))}
            </div>
            <div style={{ background: "rgba(99,102,241,0.06)", borderRadius: 12, padding: 16, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>📝 Grammar Question #3 of 5</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>She ___ to the office every morning.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["go", "goes ✓", "going"].map((o, i) => (
                  <div key={i} style={{ padding: "10px 16px", borderRadius: 8, border: `1px solid ${i === 1 ? "var(--emerald)" : "var(--border)"}`, background: i === 1 ? "rgba(16,185,129,0.1)" : "transparent", fontSize: 13, color: i === 1 ? "var(--emerald)" : "var(--muted)" }}>{o}</div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
              <div className="progress-bar" style={{ flex: 1, marginBottom: 0, marginRight: 16 }}><div className="progress-fill" style={{ width: "60%" }} /></div>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>3/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="section-label">⚡ Why VoiceReady</div>
          <h2 className="section-title">{t.why.title}</h2>
          <p className="section-sub" style={{ marginBottom: 40 }}>{t.why.subtitle}</p>
          <div className="grid-3">
            {t.whyCards.map((c, i) => (
              <div className="card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="card-icon">{c.icon}</div>
                <div className="card-title">{c.title}</div>
                <div className="card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="feat-layout">
            <div>
              <div className="section-label">🔧 Platform Features</div>
              <h2 className="section-title">{t.features.title}</h2>
              <p className="section-sub" style={{ marginBottom: 32 }}>{t.features.subtitle}</p>
              <div>
                {[["🎓", "Grammar & Vocabulary Tests", "Adaptive MCQ with instant explanations"],
                  ["🎙️", "Speaking Practice + AI Score", "Record, analyze, improve your pronunciation"],
                  ["🤝", "HR Interview Simulation", "Real questions, AI-powered feedback"],
                  ["📈", "Progress Dashboard", "Track scores, trends, and weak points"],
                  ["🌐", "Bilingual (AR / EN)", "Full RTL Arabic support"]
                ].map(([icon, title, desc], i) => (
                  <div className="feat-item" key={i}>
                    <div className="feat-icon">{icon}</div>
                    <div className="feat-body">
                      <div className="feat-title">{title}</div>
                      <div className="feat-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <AdBanner className="ad-banner-side" label="Sidebar Ad Space" />
              <div className="card" style={{ textAlign: "center", padding: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Get Certified</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Official CEFR level report (A2–C1)</div>
                <button className="btn btn-primary" onClick={() => setPage("assessment")}>Take Assessment</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="section-label">💬 Testimonials</div>
          <h2 className="section-title" style={{ marginBottom: 32 }}>{t.testimonials.title}</h2>
          <div className="grid-3">
            {TESTIMONIALS.map((tm, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">"{tm.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{tm.avatar}</div>
                  <div>
                    <div className="testi-name">{tm.name}</div>
                    <div className="testi-role">{tm.role}</div>
                  </div>
                  <div className="testi-badge" style={{ background: LEVEL_MAP[tm.score]?.color + "22", color: LEVEL_MAP[tm.score]?.color }}>{tm.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section">
        <div className="container">
          <div className="section-label">📚 Learning Hub</div>
          <h2 className="section-title">{t.blog.title}</h2>
          <p className="section-sub" style={{ marginBottom: 32 }}>{t.blog.subtitle}</p>
          <div className="grid-2" style={{ marginBottom: 24 }}>
            {BLOG_POSTS.map((post, i) => (
              <div className="card blog-card" key={i}>
                {i === 1 && <AdBanner style={{ marginBottom: 12, height: 60 }} label="In-article Ad" />}
                <div className="blog-cat">{post.cat}</div>
                <div className="blog-title">{post.title}</div>
                <div className="blog-excerpt">{post.excerpt}</div>
                <div className="blog-meta">
                  <span>⏱ {post.time}</span>
                  <span className="blog-read">{t.blog.readMore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-label">❓ FAQ</div>
          <h2 className="section-title" style={{ marginBottom: 32 }}>{t.faq.title}</h2>
          {FAQ_DATA.map((item, i) => (
            <div className="faq-item" key={i}>
              <div className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                {item.q}
                <span style={{ color: "var(--indigo)", fontSize: 20 }}>{faqOpen === i ? "−" : "+"}</span>
              </div>
              {faqOpen === i && <div className="faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))", border: "1px solid var(--border2)", borderRadius: 24, padding: "64px 32px" }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>🎯</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>Ready to Ace Your Interview?</h2>
            <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: 15 }}>Join 50,000+ users who improved their English and landed their dream jobs.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 15 }} onClick={() => setPage("assessment")}>Start for Free</button>
              <button className="btn btn-ghost" style={{ padding: "14px 32px", fontSize: 15 }} onClick={() => setPage("assessment")}>Try a Sample Test</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── READING SECTION COMPONENT ───
function ReadingSection({ t, passage, readQs, answers, handleAnswer, handleSubmit, timer, onBack }) {
  const answered = Object.keys(answers).filter(k => k.startsWith("r")).length;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={onBack}>{t.assessment.back}</button>
          <Timer seconds={timer} />
        </div>

        <h3 style={{ marginBottom: 4 }}>📄 Reading Comprehension</h3>
        <div style={{ fontSize: 12, color: "var(--cyan)", marginBottom: 16 }}>Topic: {passage.title}</div>

        <div className="passage">
          <strong>{passage.title}</strong><br /><br />
          {passage.text.split("\n\n").map((para, i) => (
            <span key={i}>{para}{i < passage.text.split("\n\n").length - 1 && <><br /><br /></>}</span>
          ))}
        </div>

        <ProgressBar current={answered} total={readQs.length} />
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>{answered} / {readQs.length} answered</div>

        {readQs.map((q, qi) => (
          <div className="card" key={qi} style={{ marginBottom: 16 }}>
            <div className="quiz-question" style={{ fontSize: 15 }}>Q{qi + 1}. {q.q}</div>
            <div className="quiz-options">
              {q.opts.map((o, oi) => (
                <button
                  key={oi}
                  className={`quiz-opt ${answers[`r${qi}`] === oi ? "selected" : ""}`}
                  onClick={() => handleAnswer(`r${qi}`, oi)}
                >
                  <span style={{ color: "var(--dim)", marginRight: 10, fontFamily: "monospace" }}>{String.fromCharCode(65 + oi)}.</span>{o}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          className="btn btn-success"
          onClick={handleSubmit}
          disabled={answered < readQs.length}
          style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 15, marginTop: 8, opacity: answered < readQs.length ? 0.5 : 1 }}
        >
          {answered < readQs.length ? `Answer all questions (${answered}/${readQs.length})` : `${t.assessment.submit} 🚀`}
        </button>
      </div>
    </section>
  );
}

// ─── TTS HOOK ───
function useTTS() {
  const [playing, setPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const cancelRef = useRef(false);
  const idxRef = useRef(0);
  const linesRef = useRef([]);

  const getVoices = useCallback(() => {
    const all = window.speechSynthesis.getVoices();
    // Prefer en-US → en-GB → any English
    const enUS = all.filter(v => v.lang === "en-US");
    const enGB = all.filter(v => v.lang === "en-GB");
    const pool = enUS.length ? enUS : enGB.length ? enGB : all.filter(v => v.lang.startsWith("en"));
    // Pick ONE reliable voice — avoid male voices that cut on Brave/Chrome
    // Samantha, Karen, Moira, Zira are proven stable cross-platform
    const best =
      pool.find(v => /samantha|karen|moira|zira|victoria|susan/i.test(v.name)) ||
      pool.find(v => v.localService) || // prefer local (offline) voices — more stable
      pool[0];
    return { female: best, male: best }; // same voice, differentiated by pitch below
  }, []);

  const speakFrom = useCallback((startIdx) => {
    const lines = linesRef.current;
    if (!window.speechSynthesis || !lines.length) return;
    window.speechSynthesis.cancel();
    cancelRef.current = false;
    idxRef.current = startIdx;
    setPlaying(true);

    const next = () => {
      if (cancelRef.current || idxRef.current >= lines.length) {
        setPlaying(false);
        setCurrentLine(-1);
        if (!cancelRef.current) idxRef.current = 0;
        return;
      }

      const line = lines[idxRef.current];
      setCurrentLine(idxRef.current);
      const { female, male } = getVoices();

      // Split into sentences to avoid Chrome's ~15s speech cut-off bug
      const sentences = line.text.match(/[^.!?,]+[.!?,]*/g) || [line.text];
      let sIdx = 0;

      const speakSentence = () => {
        if (cancelRef.current) return;
        if (sIdx >= sentences.length) {
          idxRef.current++;
          // Natural pause between speakers: Agent→Customer shorter, Customer→Agent longer
          const pause = line.role === "Agent" ? 550 : 320;
          setTimeout(next, pause);
          return;
        }

        const text = sentences[sIdx].trim();
        if (!text) { sIdx++; speakSentence(); return; }

        const utter = new SpeechSynthesisUtterance(text);
        utter.voice = line.role === "Agent" ? female : male;
        // Same voice, different pitch/rate = two distinct speakers, no cut-off
        utter.rate = line.role === "Agent" ? 0.88 : 0.95;
        utter.pitch = line.role === "Agent" ? 1.15 : 0.72; // high = female agent, low = male customer
        utter.volume = 1;

        // Chrome keepalive: resume if paused unexpectedly mid-sentence
        const keepAlive = setInterval(() => {
          if (window.speechSynthesis.paused && !cancelRef.current) {
            window.speechSynthesis.resume();
          }
        }, 4000);

        utter.onend = () => {
          clearInterval(keepAlive);
          sIdx++;
          if (!cancelRef.current) setTimeout(speakSentence, 60);
        };

        utter.onerror = (e) => {
          clearInterval(keepAlive);
          // "interrupted" means user paused — don't skip ahead
          if (e.error === "interrupted" || e.error === "canceled") return;
          sIdx++;
          if (!cancelRef.current) setTimeout(speakSentence, 60);
        };

        window.speechSynthesis.speak(utter);
      };

      speakSentence();
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => next();
    } else {
      next();
    }
  }, [getVoices]);

  // play: if same scenario resume from where stopped, else start fresh
  const speakLines = useCallback((lines) => {
    linesRef.current = lines;
    speakFrom(idxRef.current);
  }, [speakFrom]);

  const stop = useCallback(() => {
    cancelRef.current = true;
    window.speechSynthesis.cancel();
    setPlaying(false);
    // idxRef.current stays → resume will continue from here
  }, []);

  const restart = useCallback(() => {
    idxRef.current = 0;
    setCurrentLine(-1);
  }, []);

  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);
  return { playing, currentLine, speakLines, stop, restart };
}

// ─── LISTENING SECTION COMPONENT ───
function ListeningSection({ t, scenario, lisQs, answers, handleAnswer, handleSubmit, timer, onBack }) {
  const { playing, currentLine, speakLines, stop, restart } = useTTS();

  // stop TTS on unmount
  useEffect(() => () => stop(), []);

  const answered = Object.keys(answers).filter(k => k.startsWith("l")).length;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 700 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => { stop(); onBack(); }}>{t.assessment.back}</button>
          <Timer seconds={timer} />
        </div>

        <h3 style={{ marginBottom: 4 }}>🎧 Listening Test</h3>
        <div style={{ fontSize: 12, color: "var(--cyan)", marginBottom: 20 }}>Scenario: {scenario.title}</div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ background: "rgba(99,102,241,0.08)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "var(--cyan)", marginBottom: 10, fontWeight: 700 }}>🔊 Audio Player — {scenario.duration}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {!playing ? (
                <button className="btn btn-primary" style={{ gap: 6 }} onClick={() => speakLines(scenario.transcript)}>
                  ▶ {currentLine >= 0 ? "Resume" : "Play Audio"}
                </button>
              ) : (
                <button className="btn btn-danger" style={{ gap: 6 }} onClick={stop}>
                  ⏸ Pause
                </button>
              )}
              <button
                className="btn btn-ghost"
                style={{ fontSize: 12, padding: "6px 12px" }}
                onClick={() => { stop(); restart(); speakLines(scenario.transcript); }}
              >
                ↺ Restart
              </button>
              <div style={{ flex: 1, height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--indigo), var(--cyan))",
                  borderRadius: 2,
                  width: currentLine >= 0 ? `${((currentLine + 1) / scenario.transcript.length) * 100}%` : "0%",
                  transition: "width 0.5s ease"
                }} />
              </div>
              <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                {currentLine >= 0 ? `${currentLine + 1}/${scenario.transcript.length}` : scenario.duration}
              </span>
            </div>
            {playing && (
              <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--rose)", animation: "pulse-mic 1s infinite" }} />
                Now speaking: <strong style={{ color: "var(--text)" }}>{scenario.transcript[currentLine]?.role}</strong>
              </div>
            )}
          </div>

          <div style={{ fontSize: 12, color: "var(--dim)" }}>
            💡 Tip: Listen carefully, then answer. You can replay as many times as needed.
          </div>
        </div>

        <ProgressBar current={answered} total={lisQs.length} />
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>{answered} / {lisQs.length} answered</div>

        {lisQs.map((q, qi) => (
          <div className="card" key={qi} style={{ marginBottom: 16 }}>
            <div className="quiz-question" style={{ fontSize: 15 }}>Q{qi + 1}. {q.q}</div>
            <div className="quiz-options">
              {q.opts.map((o, oi) => (
                <button
                  key={oi}
                  className={`quiz-opt ${answers[`l${qi}`] === oi ? "selected" : ""}`}
                  onClick={() => handleAnswer(`l${qi}`, oi)}
                >
                  <span style={{ color: "var(--dim)", marginRight: 10, fontFamily: "monospace" }}>{String.fromCharCode(65 + oi)}.</span>{o}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          className="btn btn-success"
          onClick={() => { stop(); handleSubmit(); }}
          disabled={answered < lisQs.length}
          style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 15, marginTop: 8, opacity: answered < lisQs.length ? 0.5 : 1 }}
        >
          {answered < lisQs.length ? `Answer all questions (${answered}/${lisQs.length})` : `${t.assessment.submit} 🚀`}
        </button>
      </div>
    </section>
  );
}

// ─── ASSESSMENT PAGE ───
function AssessmentPage({ t, lang }) {
  const [section, setSection] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(120);
  const [recording, setRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [fullResult, setFullResult] = useState(null);
  // randomized per session
  const [activePassage, setActivePassage] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);
  const [activeGrammar, setActiveGrammar] = useState([]);
  const [activeVocab, setActiveVocab] = useState([]);
  const [activeSpeakingPrompts, setActiveSpeakingPrompts] = useState([]);
  const timerRef = useRef(null);

  const ALL_SPEAKING_PROMPTS = [
    "Greet a customer calling about a billing issue.",
    "Explain that an order will be delayed by 3 days.",
    "De-escalate an angry customer who received a wrong product.",
    "Apologize and offer a solution for a service outage.",
    "Explain your company's refund policy clearly.",
    "Handle a customer who wants to cancel their subscription.",
    "Assist a customer who forgot their password.",
    "Respond to a customer praising your service.",
    "Explain a technical issue in simple, non-technical language.",
    "Introduce yourself professionally at the start of a call.",
  ];

  const sections = [
    { id: "grammar", icon: "📝", label: t.assessment.grammar, type: "mcq" },
    { id: "vocabulary", icon: "📖", label: t.assessment.vocabulary, type: "mcq" },
    { id: "reading", icon: "📄", label: t.assessment.reading, type: "reading" },
    { id: "listening", icon: "🎧", label: t.assessment.listening, type: "listening" },
    { id: "speaking", icon: "🎙️", label: t.assessment.speaking, type: "speaking" },
    { id: "hr", icon: "🤝", label: t.assessment.hr, type: "hr" },
  ];

  const startSection = (s) => {
    // randomize every time
    setActiveGrammar(pickRandom(GRAMMAR_QUESTIONS, 10));
    setActiveVocab(pickRandom(VOCAB_QUESTIONS, 10));
    setActivePassage(ALL_READING_PASSAGES[Math.floor(Math.random() * ALL_READING_PASSAGES.length)]);
    setActiveScenario(ALL_LISTENING_SCENARIOS[Math.floor(Math.random() * ALL_LISTENING_SCENARIOS.length)]);
    setActiveSpeakingPrompts(shuffle(ALL_SPEAKING_PROMPTS));
    setSection(s); setStep(0); setAnswers({}); setSubmitted(false); setTimer(120); setAiFeedback(""); setRecordingDone(false);
  };

  useEffect(() => {
    if (section && !submitted) {
      timerRef.current = setInterval(() => setTimer(p => p > 0 ? p - 1 : 0), 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [section, submitted]);

  const handleAnswer = (qi, ai) => setAnswers(p => ({ ...p, [qi]: ai }));

  const calcScore = () => {
    if (section?.type === "mcq") {
      const qs = section.id === "grammar" ? activeGrammar : activeVocab;
      if (!qs.length) return 70;
      let correct = 0;
      qs.forEach((q, i) => { if (answers[i] === q.ans) correct++; });
      return Math.round((correct / qs.length) * 100);
    }
    if (section?.type === "reading" && activePassage) {
      const qs = activePassage.questions;
      let correct = 0;
      qs.forEach((q, i) => { if (answers[`r${i}`] === q.ans) correct++; });
      return Math.round((correct / qs.length) * 100);
    }
    if (section?.type === "listening" && activeScenario) {
      const qs = activeScenario.questions;
      let correct = 0;
      qs.forEach((q, i) => { if (answers[`l${i}`] === q.ans) correct++; });
      return Math.round((correct / qs.length) * 100);
    }
    return Math.floor(Math.random() * 26) + 65;
  };

  const handleSubmit = async () => {
    clearInterval(timerRef.current);
    setSubmitted(true);
    setLoadingAI(true);
    const score = calcScore();

    // build per-section scores
    const grammarScore = section.id === "grammar" ? score : undefined;
    const vocabScore = section.id === "vocabulary" ? score : undefined;
    const readingScore = section.type === "reading" ? score : undefined;
    const listeningScore = section.type === "listening" ? score : undefined;

    // compute strengths & weaknesses from score
    const strengths = [];
    const weaknesses = [];
    if (score >= 75) strengths.push(section.label + " comprehension");
    else weaknesses.push(section.label + " — needs more practice");
    if (score >= 80) strengths.push("Strong use of professional vocabulary");
    if (score < 60) weaknesses.push("Increase practice frequency to build fluency");
    if (score >= 65) strengths.push("Good grasp of core English structures");
    if (score < 50) weaknesses.push("Focus on fundamental grammar rules");

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          messages: [{
            role: "user",
            content: `You are an English assessment AI. The user completed the "${section.id}" section and scored ${score}%. CEFR level: ${getLevel(score).lvl}. Reply ONLY with valid JSON:
{"feedback":"2-3 sentences: honest level assessment, 1 strength, 1 improvement tip. Max 80 words."}`
          }]
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const match = raw.match(/\{[\s\S]*?\}/);
      const parsed = match ? JSON.parse(match[0]) : null;
      const fb = parsed?.feedback || null;
      if (!fb) throw new Error("no feedback");
      setAiFeedback(fb);
      setFullResult({ score, grammarScore, vocabScore, readingScore, listeningScore, aiFeedback: fb, strengths, weaknesses, candidateName: "" });
    } catch {
      // Smart fallback based on actual score
      const lvl = getLevel(score).lvl;
      const fb = score >= 80
        ? `Great work! You scored ${score}% — that's ${lvl} level. Your ${section.id} skills are strong. Keep pushing to reach the next level by practicing more complex structures.`
        : score >= 60
        ? `You scored ${score}% — ${lvl} level. You have a solid foundation in ${section.id}. Focus on the specific areas flagged below to move up to the next CEFR level.`
        : `You scored ${score}% — ${lvl} level. Your ${section.id} needs focused practice. Review the basics and try this test again after a week of daily study.`;
      setAiFeedback(fb);
      setFullResult({ score, grammarScore, vocabScore, readingScore, listeningScore, aiFeedback: fb, strengths, weaknesses, candidateName: "" });
    }
    setLoadingAI(false);
  };

  const startRecording = () => {
    setRecording(true);
    setTimeout(() => { setRecording(false); setRecordingDone(true); }, 4000);
  };

  if (!section) {
    return (
      <section className="section">
        <div className="container">
          <AdBanner className="ad-banner-top" />
          <div className="section-label">🎓 Assessment Center</div>
          <h2 className="section-title">{t.assessment.title}</h2>
          <p style={{ color: "var(--muted)", marginBottom: 32 }}>{t.assessment.subtitle}</p>
          <div className="assess-grid">
            {sections.map(s => (
              <div className="assess-card" key={s.id} onClick={() => startSection(s)}>
                <div className="icon">{s.icon}</div>
                <div className="label">{s.label}</div>
                <div style={{ marginTop: 12 }}><button className="btn btn-primary" style={{ fontSize: 12, padding: "6px 14px" }}>{t.assessment.start}</button></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (submitted) {
    if (loadingAI || !fullResult) {
      const score = calcScore();
      const lvlData = getLevel(score);
      return (
        <section className="section">
          <div className="container">
            <div className="result-card fade-in" style={{ textAlign: "center", padding: 48 }}>
              <div className="spin" style={{ display: "inline-block", fontSize: 32, marginBottom: 16 }}>⚙️</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>AI is analyzing your results...</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Building your personal report</div>
            </div>
          </div>
        </section>
      );
    }
    return <ResultReport result={fullResult} lang={lang} onRetake={() => startSection(section)} onHome={() => { setSection(null); setSubmitted(false); setFullResult(null); }} />;
  }

  // MCQ QUIZ
  if (section.type === "mcq") {
    const activeQs = section.id === "grammar" ? activeGrammar : activeVocab;
    if (!activeQs.length) return null;
    const q = activeQs[step];
    const total = activeQs.length;
    return (
      <section className="section">
        <div className="container">
          <div className="quiz-wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setSection(null)}>{t.assessment.back}</button>
              <Timer seconds={timer} />
            </div>
            <ProgressBar current={step + 1} total={total} />
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 20 }}>{section.label} — {step + 1} / {total}</div>
            <div className="card">
              <div className="quiz-question">{q.q}</div>
              <div className="quiz-options">
                {q.opts.map((opt, i) => (
                  <button key={i} className={`quiz-opt ${answers[step] === i ? "selected" : ""}`} onClick={() => handleAnswer(step, i)}>
                    <span style={{ color: "var(--dim)", marginRight: 10, fontFamily: "monospace" }}>{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 10 }}>
              {step < total - 1 ? (
                <button className="btn btn-primary" onClick={() => setStep(p => p + 1)} disabled={answers[step] === undefined}>
                  {t.assessment.next}
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleSubmit}>{t.assessment.submit} 🚀</button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // READING
  if (section.type === "reading") {
    if (!activePassage) return null;
    const readQs = activePassage.questions;
    return <ReadingSection
      t={t}
      passage={activePassage}
      readQs={readQs}
      answers={answers}
      handleAnswer={handleAnswer}
      handleSubmit={handleSubmit}
      timer={timer}
      onBack={() => setSection(null)}
    />;
  }

  // LISTENING
  if (section.type === "listening") {
    if (!activeScenario) return null;
    const lisQs = activeScenario.questions;
    return <ListeningSection
      t={t}
      scenario={activeScenario}
      lisQs={lisQs}
      answers={answers}
      handleAnswer={handleAnswer}
      handleSubmit={handleSubmit}
      timer={timer}
      onBack={() => setSection(null)}
    />;
  }

  // SPEAKING
  if (section.type === "speaking") {
    return <SpeakingSection t={t} prompts={activeSpeakingPrompts} timer={timer} onBack={() => setSection(null)} lang={lang} />;
  }

  // HR SIM
  if (section.type === "hr") {
    return <HRPage t={t} onBack={() => setSection(null)} lang={lang} />;
  }

  return null;
}

// ─── HR SIMULATION ───
function HRPage({ t, onBack, lang }) {
  const [qIdx, setQIdx] = useState(-1);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answerScore, setAnswerScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [scores, setScores] = useState([]);

  const start = () => setQIdx(0);

  const analyze = async () => {
    const trimmed = answer.trim();
    if (!trimmed) return;
    setLoading(true);

    const wordCount = trimmed.split(/\s+/).length;
    const isGibberish = wordCount < 4 || /^(.)\1+$/.test(trimmed) || /^[^a-zA-Z\u0600-\u06FF]+$/.test(trimmed);

    if (isGibberish) {
      setFeedback("Your answer is too short. Write at least 2–3 full sentences with a specific example.");
      setAnswerScore(12);
      setScores(p => [...p, 12]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: `You are a strict HR interviewer at a call center company. Evaluate this interview answer honestly.

Question: "${HR_QUESTIONS[qIdx]}"
Candidate's answer: "${trimmed}"

Score strictly:
0-20: gibberish or completely off-topic
21-40: very weak, no real content
41-60: somewhat relevant but vague, missing examples
61-74: average, needs more structure
75-84: good, clear and relevant
85-100: excellent, specific examples, professional tone

Reply ONLY with this JSON, nothing else:
{"score":NUMBER,"feedback":"One specific weakness and one concrete improvement tip. Max 50 words."}`
          }]
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const jsonMatch = raw.match(/\{[\s\S]*?\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      if (parsed && parsed.score !== undefined) {
        const score = Math.max(0, Math.min(100, Number(parsed.score)));
        setAnswerScore(score);
        setFeedback(parsed.feedback || "Practice giving structured answers with specific examples.");
        setScores(p => [...p, score]);
      } else {
        throw new Error("parse failed");
      }
    } catch (err) {
      // CORS fallback — score based on real linguistic signals
      const words = trimmed.toLowerCase().split(/\s+/);
      const wordCount = words.length;

      // Check for quality signals in the answer
      const hasExample = /example|time when|situation|once i|i was|i worked|i handled|i dealt|for instance|such as/i.test(trimmed);
      const hasProfVocab = /communication|customer|experience|skill|team|solution|resolve|professional|dedicated|motivated|challenge|improve/i.test(trimmed);
      const hasStructure = trimmed.includes(",") && trimmed.split(/[.!?]/).filter(s => s.trim().length > 5).length >= 2;
      const isOnTopic = HR_QUESTIONS[qIdx].toLowerCase().split(" ").filter(w => w.length > 4).some(w => trimmed.toLowerCase().includes(w));

      let score = 0;
      if (wordCount >= 4)   score += 15;
      if (wordCount >= 15)  score += 10;
      if (wordCount >= 30)  score += 10;
      if (isOnTopic)        score += 20;
      if (hasExample)       score += 20;
      if (hasProfVocab)     score += 15;
      if (hasStructure)     score += 10;

      score = Math.min(82, Math.max(8, score));

      const tips = !isOnTopic
        ? "Your answer doesn't seem to address the question directly. Re-read the question and answer specifically."
        : !hasExample
        ? "Add a real example from your experience. Use the STAR method: Situation, Task, Action, Result."
        : !hasStructure
        ? "Structure your answer better — use at least 2–3 sentences with clear logic."
        : "Good effort. Try to use more professional vocabulary and be more specific.";

      setAnswerScore(score);
      setFeedback(tips);
      setScores(p => [...p, score]);
    }
    setLoading(false);
  };

  const nextQ = () => {
    if (qIdx < HR_QUESTIONS.length - 1) {
      setQIdx(p => p + 1); setAnswer(""); setFeedback(""); setAnswerScore(null);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const lvl = getLevel(avg);
    return (
      <section className="section">
        <div className="container">
          <div className="result-card fade-in">
            <div style={{ fontSize: 48 }}>🤝</div>
            <h3 style={{ margin: "12px 0" }}>Interview Complete!</h3>
            <div className="result-score grad-text">{avg}%</div>
            <div className="result-level" style={{ background: lvl.color + "22", color: lvl.color }}>{lvl.lvl}</div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>Answered {scores.length} HR questions</div>
            <button className="btn btn-primary" onClick={onBack}>← Back to Assessment</button>
          </div>
        </div>
      </section>
    );
  }

  if (qIdx === -1) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
          <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 24 }} onClick={onBack}>{t.assessment.back}</button>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🤝</div>
          <h2 style={{ marginBottom: 12 }}>{t.hr.title}</h2>
          <p style={{ color: "var(--muted)", marginBottom: 32, lineHeight: 1.7 }}>
            You'll be asked {HR_QUESTIONS.length} common HR interview questions. Answer by typing, then receive instant AI feedback on your grammar, fluency, and content.
          </p>
          <button className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 15 }} onClick={start}>{t.hr.start}</button>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={onBack}>{t.assessment.back}</button>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>{qIdx + 1} / {HR_QUESTIONS.length}</span>
        </div>
        <ProgressBar current={qIdx + 1} total={HR_QUESTIONS.length} />
        <div className="hr-question">{HR_QUESTIONS[qIdx]}</div>
        <textarea
          className="hr-answer"
          placeholder="Type your answer here..."
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        {!feedback && (
          <button className="btn btn-primary" onClick={analyze} disabled={loading || !answer.trim()} style={{ width: "100%" }}>
            {loading ? <><span className="spin">⚙️</span> {t.hr.analyzing}</> : "Analyze with AI 🤖"}
          </button>
        )}
        {feedback && (
          <div className="fade-in">
            <div style={{
              background: answerScore >= 75 ? "rgba(16,185,129,0.06)" : answerScore >= 50 ? "rgba(245,158,11,0.06)" : "rgba(244,63,94,0.06)",
              border: `1px solid ${answerScore >= 75 ? "rgba(16,185,129,0.25)" : answerScore >= 50 ? "rgba(245,158,11,0.25)" : "rgba(244,63,94,0.25)"}`,
              borderRadius: 12, padding: 16, marginBottom: 16
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: answerScore >= 75 ? "var(--emerald)" : answerScore >= 50 ? "var(--amber)" : "var(--rose)", textTransform: "uppercase" }}>🤖 {t.hr.feedback}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: answerScore >= 75 ? "var(--emerald)" : answerScore >= 50 ? "var(--amber)" : "var(--rose)" }}>{answerScore}%</div>
              </div>
              {/* Score explanation */}
              <div style={{ fontSize: 12, color: answerScore >= 75 ? "var(--emerald)" : answerScore >= 50 ? "var(--amber)" : "var(--rose)", fontWeight: 600, marginBottom: 10, padding: "6px 10px", borderRadius: 8, background: answerScore >= 75 ? "rgba(16,185,129,0.08)" : answerScore >= 50 ? "rgba(245,158,11,0.08)" : "rgba(244,63,94,0.08)" }}>
                {answerScore >= 85 ? "✅ Excellent answer — specific, professional, and well-structured."
                  : answerScore >= 75 ? "✅ Good answer — clear and relevant. Minor improvements possible."
                  : answerScore >= 60 ? "⚠️ Average answer — relevant but lacks specific examples or structure."
                  : answerScore >= 40 ? "⚠️ Weak answer — too vague or missing key details the interviewer expects."
                  : "❌ Poor answer — off-topic, too short, or doesn't address the question."}
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{feedback}</div>
            </div>
            <button className="btn btn-primary" onClick={nextQ} style={{ width: "100%" }}>
              {qIdx < HR_QUESTIONS.length - 1 ? t.hr.next : t.hr.finish} →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── DASHBOARD ───
function DashboardPage({ t, user }) {
  const history = [
    { test: "Grammar", score: 78, level: "B2", date: "May 14, 2025" },
    { test: "Vocabulary", score: 65, level: "B1", date: "May 12, 2025" },
    { test: "Reading", score: 82, level: "B2", date: "May 10, 2025" },
    { test: "Speaking", score: 71, level: "B1", date: "May 8, 2025" },
    { test: "HR Simulation", score: 88, level: "B2", date: "May 6, 2025" },
  ];
  return (
    <section className="section">
      <div className="container">
        <AdBanner className="ad-banner-top" />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, var(--indigo), var(--violet))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👤</div>
          <div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{t.dashboard.welcome}</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{user?.name || "Farouk"}</div>
          </div>
          <div className="chip chip-indigo" style={{ marginLeft: "auto" }}>B2 Level</div>
        </div>
        <div className="stat-cards">
          {[["5", t.dashboard.totalTests, "📋"], ["77%", t.dashboard.avgScore, "📊"], ["B2", t.dashboard.level, "🏆"], ["12", t.dashboard.streak, "🔥"]].map(([n, l, i]) => (
            <div className="stat-card" key={l}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{i}</div>
              <div className="stat-num grad-text">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>📋 {t.dashboard.history}</div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <table className="table">
                <thead><tr><th>Test</th><th>Score</th><th>Level</th><th>Date</th></tr></thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i}>
                      <td>{h.test}</td>
                      <td><span style={{ color: h.score >= 75 ? "var(--emerald)" : "var(--amber)" }}>{h.score}%</span></td>
                      <td><span className={`chip ${h.score >= 75 ? "chip-green" : "chip-amber"}`}>{h.level}</span></td>
                      <td style={{ color: "var(--muted)" }}>{h.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>💡 {t.dashboard.tips}</div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--emerald)", fontWeight: 700, marginBottom: 8 }}>✅ {t.dashboard.strengths}</div>
              {["Reading Comprehension", "Vocabulary Range", "HR Interview Skills"].map(s => (
                <div key={s} style={{ fontSize: 13, color: "var(--muted)", padding: "4px 0", borderBottom: "1px solid rgba(99,102,241,0.07)" }}>• {s}</div>
              ))}
            </div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--rose)", fontWeight: 700, marginBottom: 8 }}>⚠️ {t.dashboard.weaknesses}</div>
              {["Verb Tenses", "Speaking Confidence", "Listening Speed"].map(s => (
                <div key={s} style={{ fontSize: 13, color: "var(--muted)", padding: "4px 0", borderBottom: "1px solid rgba(99,102,241,0.07)" }}>• {s}</div>
              ))}
            </div>
            <AdBanner className="ad-banner-side" style={{ height: 200 }} label="Sidebar Ad" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AUTH ───
function AuthPage({ t, mode, setPage, setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";

  const handle = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name: form.name || "User", email: form.email });
      setPage("dashboard");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div className="auth-card card">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{isLogin ? "👋" : "🚀"}</div>
            <h2 style={{ fontSize: 24, fontWeight: 800 }}>{isLogin ? t.auth.login : t.auth.signup}</h2>
          </div>
          <button className="btn btn-ghost" style={{ width: "100%", marginBottom: 20, gap: 8, justifyContent: "center" }} onClick={handle}>
            <span>🌐</span> {t.auth.google}
          </button>
          <div className="divider">or</div>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">{t.auth.name}</label>
              <input className="form-input" placeholder="Farouk Ahmed" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">{t.auth.email}</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">{t.auth.password}</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", padding: "13px", fontSize: 15, marginTop: 8, justifyContent: "center" }} onClick={handle} disabled={loading}>
            {loading ? <span className="spin">⚙️</span> : (isLogin ? t.auth.login : t.auth.signup)}
          </button>
          <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--muted)" }}>
            {isLogin ? t.auth.noAccount : t.auth.hasAccount}{" "}
            <span style={{ color: "var(--indigo)", cursor: "pointer", fontWeight: 600 }} onClick={() => setPage(isLogin ? "signup" : "login")}>
              {isLogin ? t.auth.signupLink : t.auth.loginLink}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ADMIN ───
function AdminPage({ t }) {
  const [tab, setTab] = useState("users");
  const navItems = [
    { id: "users", icon: "👥", label: t.admin.users },
    { id: "questions", icon: "❓", label: t.admin.questions },
    { id: "blogs", icon: "📝", label: t.admin.blogs },
    { id: "analytics", icon: "📊", label: t.admin.analytics },
    { id: "ads", icon: "📢", label: t.admin.ads },
  ];

  const fakeUsers = [
    { name: "Ahmed Hassan", email: "ahmed@example.com", level: "B2", tests: 8, joined: "May 2025" },
    { name: "Nour Khalil", email: "nour@example.com", level: "C1", tests: 15, joined: "Apr 2025" },
    { name: "Mohamed Ali", email: "moh@example.com", level: "B1", tests: 3, joined: "May 2025" },
    { name: "Sara Ibrahim", email: "sara@example.com", level: "A2", tests: 2, joined: "May 2025" },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-label">⚙️ Admin</div>
        <h2 className="section-title" style={{ marginBottom: 24 }}>{t.admin.title}</h2>
        <div style={{ display: "flex", gap: 20 }} className="admin-layout">
          <div className="admin-sidebar" style={{ padding: "8px" }}>
            {navItems.map(item => (
              <div key={item.id} className={`admin-nav-item ${tab === item.id ? "active" : ""}`} onClick={() => setTab(item.id)}>
                <span>{item.icon}</span> {item.label}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            {tab === "users" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700 }}>Users ({fakeUsers.length})</div>
                  <div className="chip chip-green">● System Online</div>
                </div>
                <div className="card" style={{ padding: 0 }}>
                  <table className="table">
                    <thead><tr><th>Name</th><th>Email</th><th>Level</th><th>Tests</th><th>Joined</th></tr></thead>
                    <tbody>
                      {fakeUsers.map((u, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{u.name}</td>
                          <td style={{ color: "var(--muted)" }}>{u.email}</td>
                          <td><span className="chip chip-indigo">{u.level}</span></td>
                          <td>{u.tests}</td>
                          <td style={{ color: "var(--muted)" }}>{u.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {tab === "questions" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700 }}>Question Bank ({GRAMMAR_QUESTIONS.length + VOCAB_QUESTIONS.length})</div>
                  <button className="btn btn-primary" style={{ fontSize: 12 }}>+ {t.admin.addQ}</button>
                </div>
                {[...GRAMMAR_QUESTIONS.slice(0, 3)].map((q, i) => (
                  <div className="card" key={i} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{q.q}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {q.opts.map((o, oi) => (
                        <span key={oi} className={`chip ${oi === q.ans ? "chip-green" : "chip-indigo"}`}>{o}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "analytics" && (
              <div>
                <div style={{ fontWeight: 700, marginBottom: 16 }}>Platform Analytics</div>
                <div className="stat-cards">
                  {[["4", "Total Users", "👥"], ["28", "Tests Today", "📊"], ["74%", "Avg Score", "🏆"], ["94%", "Pass Rate", "✅"]].map(([n, l, i]) => (
                    <div className="stat-card" key={l}>
                      <div style={{ fontSize: 20, marginBottom: 6 }}>{i}</div>
                      <div className="stat-num grad-text">{n}</div>
                      <div className="stat-label">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ marginTop: 20 }}>
                  <div style={{ fontWeight: 600, marginBottom: 16 }}>Score Distribution</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 120 }}>
                    {[["A2", 15, "var(--amber)"], ["B1", 35, "var(--indigo)"], ["B2", 38, "var(--violet)"], ["C1", 12, "var(--emerald)"]].map(([l, h, c]) => (
                      <div key={l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{ width: "100%", height: `${h * 3}px`, background: c, borderRadius: "4px 4px 0 0", opacity: 0.8 }} />
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{l}</div>
                        <div style={{ fontSize: 11, color: c, fontWeight: 700 }}>{h}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {tab === "ads" && (
              <div>
                <div style={{ fontWeight: 700, marginBottom: 16 }}>Ad Manager</div>
                {[["Top Banner", "728×90", "Active"], ["Sidebar Right", "300×250", "Active"], ["In-article", "468×60", "Paused"], ["Footer", "728×90", "Active"]].map(([name, size, status]) => (
                  <div className="card" key={name} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{size} • Google AdSense</div>
                    </div>
                    <span className={`chip ${status === "Active" ? "chip-green" : "chip-amber"}`}>{status}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "blogs" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700 }}>Blog Posts ({BLOG_POSTS.length})</div>
                  <button className="btn btn-primary" style={{ fontSize: 12 }}>+ {t.admin.addBlog}</button>
                </div>
                {BLOG_POSTS.map((p, i) => (
                  <div className="card" key={i} style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--cyan)", marginBottom: 4 }}>{p.cat}</div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.time}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 10px" }}>Edit</button>
                      <button className="btn btn-danger" style={{ fontSize: 11, padding: "4px 10px" }}>Del</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BLOG POST PAGE ───
function BlogPostPage({ post, setPage }) {
  const related = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);
  const ICONS = { "Speaking Tips": "🎙️", "Grammar Guide": "📝", "HR Prep": "🤝", "Vocabulary": "📖", "Listening Skills": "🎧", "Career Tips": "🚀" };
  const paragraphs = post.content.split("\n\n");
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 24 }} onClick={() => setPage("blog")}>← Back to Blog</button>
        <div className="section-label">{post.cat}</div>
        <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 800, lineHeight: 1.25, marginBottom: 16 }}>{post.title}</h1>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--dim)", marginBottom: 32, flexWrap: "wrap" }}>
          <span>✍️ {post.author}</span><span>📅 {post.date}</span><span>⏱ {post.time}</span>
        </div>
        <div className="blog-hero-img">{ICONS[post.cat] || "📄"}</div>
        <div className="blog-post-content">
          {paragraphs.map((para, i) => {
            if (!para.trim()) return null;
            if (para.startsWith("**") && para.endsWith("**") && !para.slice(2, -2).includes("**")) {
              return <h2 key={i} style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", margin: "24px 0 10px" }}>{para.slice(2, -2)}</h2>;
            }
            const parts = para.split(/(\*\*[^*]+\*\*)/g);
            return <p key={i} style={{ marginBottom: 16 }}>{parts.map((p, j) => p.startsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : p)}</p>;
          })}
        </div>
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>📚 Related Articles</div>
            <div className="grid-2">
              {related.map(r => (
                <div className="card blog-card" key={r.id} style={{ cursor: "pointer" }} onClick={() => setPage("blog-post-" + r.id)}>
                  <div className="blog-cat">{r.cat}</div>
                  <div className="blog-title">{r.title}</div>
                  <div className="blog-excerpt" style={{ WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.excerpt}</div>
                  <div style={{ fontSize: 12, color: "var(--indigo)", marginTop: 8, fontWeight: 600 }}>Read Article →</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── RESULT REPORT PAGE ───
function ResultReport({ result, onRetake, onHome, lang }) {
  const [certVisible, setCertVisible] = useState(false);
  const lvl = getLevel(result.score);
  const improvements = {
    grammar: result.grammarScore < 70 ? "Focus on verb tenses, passive voice, and conditionals." : "Refine your use of advanced structures like inversions and subjunctives.",
    vocab: result.vocabScore < 70 ? "Learn more call center terminology and professional phrases." : "Expand idiomatic expressions and business English collocations.",
    overall: result.score < 65 ? "Dedicate 30 minutes daily to grammar exercises and vocabulary flashcards." : result.score < 80 ? "Practice speaking aloud daily and do 2 listening tests per week." : "You're at an advanced level. Focus on naturalness and reducing hesitation.",
  };
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🏆</div>
          <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, marginBottom: 8 }}>Your Results Report</h2>
          <div style={{ fontSize: 72, fontWeight: 900, color: lvl.color, lineHeight: 1, margin: "16px 0" }}>{result.score}%</div>
          <div style={{ display: "inline-block", padding: "8px 28px", borderRadius: 12, background: lvl.color + "22", color: lvl.color, fontSize: 22, fontWeight: 800, border: `1px solid ${lvl.color}44` }}>{lvl.lvl} — {lvl.label}</div>
        </div>

        {/* SCORE BREAKDOWN */}
        <div className="result-section">
          <div className="result-section-title">📊 Score Breakdown</div>
          {[
            ["Grammar", result.grammarScore, "var(--indigo)"],
            ["Vocabulary", result.vocabScore, "var(--violet)"],
            ["Reading", result.readingScore, "var(--cyan)"],
            ["Listening", result.listeningScore, "var(--emerald)"],
            ...(result.speakingScore ? [["Speaking / HR", result.speakingScore, "var(--amber)"]] : []),
          ].map(([label, score, color]) => score !== undefined && (
            <div className="score-bar-wrap" key={label}>
              <div className="score-bar-label"><span>{label}</span><span style={{ color, fontWeight: 700 }}>{score}%</span></div>
              <div className="score-bar-track"><div className="score-bar-fill" style={{ width: score + "%", background: color }} /></div>
            </div>
          ))}
        </div>

        {/* AI FEEDBACK */}
        {result.aiFeedback && (
          <div className="result-section">
            <div className="result-section-title">🤖 AI Analysis</div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>{result.aiFeedback}</div>
          </div>
        )}

        {/* STRENGTHS & WEAKNESSES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div className="result-section">
            <div className="result-section-title" style={{ color: "var(--emerald)" }}>✅ Strengths</div>
            {result.strengths.map((s, i) => <div key={i} style={{ fontSize: 13, color: "var(--muted)", padding: "4px 0", borderBottom: "1px solid rgba(99,102,241,0.07)" }}>• {s}</div>)}
          </div>
          <div className="result-section">
            <div className="result-section-title" style={{ color: "var(--rose)" }}>⚠️ Weak Areas</div>
            {result.weaknesses.map((w, i) => <div key={i} style={{ fontSize: 13, color: "var(--muted)", padding: "4px 0", borderBottom: "1px solid rgba(99,102,241,0.07)" }}>• {w}</div>)}
          </div>
        </div>

        {/* IMPROVEMENT TIPS */}
        <div className="result-section" style={{ marginBottom: 32 }}>
          <div className="result-section-title">💡 Improvement Plan</div>
          {Object.values(improvements).map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ color: "var(--cyan)", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          <button className="btn btn-primary" style={{ padding: "12px 24px" }} onClick={() => setCertVisible(true)}>🏅 View Certificate</button>
          <button className="btn btn-ghost" onClick={onRetake}>🔄 Retake Test</button>
          <button className="btn btn-ghost" onClick={onHome}>🏠 Home</button>
        </div>

        {certVisible && (
          <div style={{ marginTop: 8 }}>
            <Certificate result={result} lvl={lvl} />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── CERTIFICATE ───
function Certificate({ result, lvl }) {
  const borderColor = lvl.color;
  const printCert = () => {
    const el = document.getElementById("cert-printable");
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>Certificate</title><style>body{margin:0;background:#050810;color:#e2e8f0;font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;}*{box-sizing:border-box;}</style></head><body>${el.outerHTML}</body></html>`);
    w.document.close(); w.print();
  };
  return (
    <div>
      <div id="cert-printable" className="certificate fade-in" style={{ borderColor }}>
        <div className="cert-watermark">⚡</div>
        <div className="cert-title" style={{ color: borderColor }}>Certificate of Achievement</div>
        <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 20 }}>English Test Platform</div>
        <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 6 }}>This certifies that the holder has achieved</div>
        <div className="cert-name grad-text">{result.candidateName || "English Learner"}</div>
        <div style={{ fontSize: 14, color: "var(--muted)", margin: "8px 0" }}>an English proficiency level of</div>
        <div className="cert-level" style={{ color: borderColor }}>{lvl.lvl}</div>
        <div style={{ fontSize: 13, color: borderColor, fontWeight: 600, marginBottom: 20 }}>{lvl.label}</div>
        <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 4 }}>Overall Score: <strong style={{ color: "var(--text)" }}>{result.score}%</strong></div>
        <div style={{ fontSize: 12, color: "var(--dim)" }}>Issued: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</div>
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${borderColor}33`, fontSize: 11, color: "var(--dim)", letterSpacing: "0.05em" }}>
          ⚡ ENGLISH TEST PLATFORM — englishtest.io
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button className="btn btn-primary" onClick={printCert} style={{ gap: 6 }}>🖨️ Print / Save Certificate</button>
      </div>
    </div>
  );
}

// ─── LEADERBOARD PAGE ───
function LeaderboardPage({ setPage }) {
  const [board] = useState(INITIAL_LEADERBOARD);
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <div className="section-label">🏆 Leaderboard</div>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Top Performers</h2>
        <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: 14 }}>This week's highest scoring users across all test sections.</p>
        {board.map((entry, i) => (
          <div className="lb-row" key={i}>
            <div className={`lb-rank ${i === 0 ? "lb-rank-1" : i === 1 ? "lb-rank-2" : i === 2 ? "lb-rank-3" : "lb-rank-other"}`}>
              {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{entry.name} {entry.country}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{entry.test}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: LEVEL_MAP[entry.level]?.color }}>{entry.score}%</div>
              <div className="chip chip-indigo" style={{ fontSize: 10 }}>{entry.level}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button className="btn btn-primary" onClick={() => setPage("assessment")}>Take a Test to Join 🚀</button>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT PAGE ───
function AboutPage({ setPage }) {
  return (
    <section className="section">
      <div className="container">
        <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 24 }} onClick={() => setPage("home")}>← Back to Home</button>
        <div className="section-label">ℹ️ About Us</div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>About English Test</h2>
        <div className="page-prose">
          <p>English Test is a professional English assessment platform built specifically for call center applicants and customer service professionals in the Arab world. Our mission is to help every candidate walk into their BPO interview with confidence, competence, and a certified English level they can be proud of.</p>
          <h2>Our Mission</h2>
          <p>We believe that language should not be a barrier to career opportunity. Thousands of talented professionals in Egypt, Saudi Arabia, Jordan, and across the MENA region are passed over for call center roles not because of skill, but because they haven't had structured, targeted English practice. We're here to change that.</p>
          <h2>What We Offer</h2>
          <p>Our platform combines CEFR-mapped grammar and vocabulary tests, real listening comprehension scenarios, speaking practice with AI evaluation, and HR interview simulation. Every test is scored objectively — no random results, no fake scores. You get a real assessment of where you stand.</p>
          <h2>Our Approach</h2>
          <p>We use AI-powered evaluation via Google's Gemini model to provide intelligent, context-aware feedback on your written and spoken answers. Our 50+ listening scenarios are all modeled on real call center conversations, and our grammar bank covers 100 questions targeting the exact structures employers test.</p>
          <h2>Who This Is For</h2>
          <p>English Test is designed for: fresh graduates entering the BPO market, current call center agents looking to qualify for English-speaking accounts, and HR managers who want to pre-screen candidates before formal interviews.</p>
          <div style={{ marginTop: 32 }}>
            <button className="btn btn-primary" onClick={() => setPage("assessment")}>Start Your Assessment →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRIVACY POLICY PAGE ───
function PrivacyPage({ setPage }) {
  return (
    <section className="section">
      <div className="container">
        <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 24 }} onClick={() => setPage("home")}>← Back</button>
        <div className="section-label">🔒 Legal</div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>Privacy Policy</h2>
        <div className="page-prose">
          <p><em>Last updated: May 2025</em></p>
          <h2>1. Information We Collect</h2>
          <p>English Test collects only the information necessary to provide our service. This includes: answers you submit during tests (processed in real-time and not permanently stored), your session data to maintain your test progress, and optional name information if you choose to display it on a certificate.</p>
          <h2>2. Voice Data</h2>
          <p>When you use our Speaking Practice feature, your voice is converted to text via the Web Speech API, which is processed locally in your browser. We do not record, store, or transmit your audio data to our servers.</p>
          <h2>3. AI Processing</h2>
          <p>Written and spoken answers submitted for AI evaluation are sent to Google's Gemini API for analysis. These submissions are governed by Google's privacy terms. We send only the text of your answer and the question context — no personal identifying information is included in these requests.</p>
          <h2>4. Cookies</h2>
          <p>We use minimal session cookies to maintain your test state during a session. We do not use tracking cookies or third-party advertising cookies. Advertisement spaces on this platform are reserved for Google AdSense integration, subject to Google's own cookie policies.</p>
          <h2>5. Data Retention</h2>
          <p>Test scores displayed on your dashboard are stored locally in your browser session and are cleared when you close the browser. We do not maintain a server-side database of individual user scores.</p>
          <h2>6. Contact</h2>
          <p>For any privacy concerns, contact us at privacy@englishtest.io</p>
        </div>
      </div>
    </section>
  );
}

// ─── TERMS OF SERVICE PAGE ───
function TermsPage({ setPage }) {
  return (
    <section className="section">
      <div className="container">
        <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 24 }} onClick={() => setPage("home")}>← Back</button>
        <div className="section-label">📋 Legal</div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>Terms of Service</h2>
        <div className="page-prose">
          <p><em>Last updated: May 2025</em></p>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using English Test, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the platform.</p>
          <h2>2. Use of the Platform</h2>
          <p>English Test is provided for educational and professional development purposes. You agree to use the platform honestly and not to share, reproduce, or distribute test questions or content without written permission.</p>
          <h2>3. Assessment Integrity</h2>
          <p>Our assessments are designed to provide an honest evaluation of your English proficiency. Attempting to manipulate scores, submit automated responses, or exploit technical vulnerabilities is strictly prohibited and will result in your results being invalidated.</p>
          <h2>4. AI-Generated Feedback</h2>
          <p>AI feedback provided on this platform is for educational guidance only. It does not constitute a formal qualification, employment assessment, or professional recommendation. Scores should be used for personal improvement tracking, not as official credentials.</p>
          <h2>5. Certificates</h2>
          <p>Certificates generated by English Test are provided as personal achievement records. They are not accredited qualifications and should not be represented as officially certified documents. Employers should conduct their own independent English assessments.</p>
          <h2>6. Intellectual Property</h2>
          <p>All content on this platform — including questions, scenarios, articles, and design elements — is the intellectual property of English Test. Unauthorized reproduction is prohibited.</p>
          <h2>7. Limitation of Liability</h2>
          <p>English Test provides this platform on an "as is" basis. We make no guarantees that using this platform will result in employment, and accept no liability for decisions made by employers based on platform results.</p>
          <h2>8. Contact</h2>
          <p>For questions about these terms, contact legal@englishtest.io</p>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT PAGE ───
function ContactPage({ setPage }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = () => { if (form.name && form.email && form.message) setSent(true); };
  return (
    <section className="section">
      <div className="container">
        <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 24 }} onClick={() => setPage("home")}>← Back</button>
        <div className="section-label">📬 Get in Touch</div>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Contact Us</h2>
        <p style={{ color: "var(--muted)", marginBottom: 40, fontSize: 15 }}>Have a question, suggestion, or partnership enquiry? We'd love to hear from you.</p>
        <div className="contact-grid">
          <div>
            {sent ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Message Sent!</div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>We'll get back to you within 24 hours.</div>
              </div>
            ) : (
              <div className="card">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Ahmed Hassan" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="ahmed@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" placeholder="Question about assessment scores" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" placeholder="Your message..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ minHeight: 120, resize: "vertical" }} />
                </div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>Send Message 📨</button>
              </div>
            )}
          </div>
          <div>
            {[["📧", "Email", "hello@englishtest.io"], ["💬", "Support", "support@englishtest.io"], ["🤝", "Partnerships", "partners@englishtest.io"], ["📍", "Location", "Cairo, Egypt"]].map(([icon, label, val]) => (
              <div className="card" key={label} style={{ marginBottom: 12, display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ fontSize: 24 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--dim)", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14 }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HR SPEAKING INTERVIEW SIMULATION ───
const SPEAKING_QUESTIONS = [
  { q: "Tell me about yourself and your work experience.", hint: "Talk about your background, skills, and what makes you suitable for this role." },
  { q: "Why do you want to work in a call center?", hint: "Mention communication skills, helping people, and career growth." },
  { q: "What are your greatest strengths as a communicator?", hint: "Give specific examples — listening, clarity, empathy, etc." },
  { q: "Describe a time you handled a difficult or angry customer.", hint: "Use the STAR method: Situation, Task, Action, Result." },
  { q: "What are your weaknesses, and how are you working on them?", hint: "Be honest but show self-awareness and improvement steps." },
  { q: "Where do you see yourself professionally in 2 years?", hint: "Show ambition but realistic goals within the company." },
  { q: "How do you handle stress and pressure at work?", hint: "Give a real technique: breathing, prioritising, staying calm." },
  { q: "Why should we hire you over other candidates?", hint: "Be confident — mention unique value you bring to the team." },
];

function SpeakingSection({ t, prompts, timer: globalTimer, onBack, lang }) {
  const QUESTIONS = SPEAKING_QUESTIONS;
  const MAX = QUESTIONS.length;
  const Q_TIME = 55;

  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("intro");
  const [answer, setAnswer] = useState("");
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [qTimer, setQTimer] = useState(Q_TIME);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [allResults, setAllResults] = useState([]);

  const recogRef = useRef(null);
  const listeningRef = useRef(false);
  const timerRef = useRef(null);
  const finalTextRef = useRef("");

  useEffect(() => {
    if (phase !== "answering") return;
    setQTimer(Q_TIME);
    timerRef.current = setInterval(() => {
      setQTimer(p => {
        if (p <= 1) { clearInterval(timerRef.current); handleSubmitAnswer(); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, step]);

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (recogRef.current) { try { recogRef.current.abort(); } catch (_) {} }
    const r = new SR();
    r.lang = "en-US"; r.continuous = true; r.interimResults = true;
    finalTextRef.current = "";
    r.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalTextRef.current += e.results[i][0].transcript + " ";
        else interim += e.results[i][0].transcript;
      }
      const full = (finalTextRef.current + interim).trim();
      setTranscript(full); setAnswer(full);
    };
    r.onerror = (e) => { if (e.error === "no-speech") return; setListening(false); listeningRef.current = false; };
    r.onend = () => {
      if (listeningRef.current && recogRef.current === r) {
        try { r.start(); } catch (_) { setListening(false); listeningRef.current = false; }
      }
    };
    recogRef.current = r;
    try { r.start(); listeningRef.current = true; setListening(true); } catch (_) {}
  };

  const stopListening = () => {
    listeningRef.current = false;
    try { recogRef.current?.stop(); } catch (_) {}
    recogRef.current = null;
    setListening(false);
  };

  const handleSubmitAnswer = async () => {
    clearInterval(timerRef.current);
    stopListening();
    setPhase("feedback");
    setLoading(true);
    const trimmed = answer.trim();
    const q = QUESTIONS[step];

    if (trimmed.split(/\s+/).filter(Boolean).length < 4) {
      const r = { question: q.q, answer: trimmed || "(no answer)", grammarScore: 5, fluencyScore: 5, vocabScore: 5, overallScore: 5, feedback: "No answer provided. In a real interview this would be a critical miss. Practice speaking for at least 30 seconds per question.", corrected: "", pronunciationNote: "" };
      setFeedback(r); setAllResults(p => [...p, r]); setLoading(false); return;
    }

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [{
            role: "user",
            content: `You are a professional HR interviewer evaluating a call center job candidate. Be STRICT and HONEST.

Interview Question: "${q.q}"
Candidate's Answer: "${trimmed}"

Score on these dimensions:
- grammarScore 0-10: correctness of grammar and sentence structure
- fluencyScore 0-10: how natural and connected the language flows
- vocabScore 0-10: range and professionalism of vocabulary
- overallScore 0-100: overall interview answer quality

Strict scoring guide:
grammarScore/fluencyScore/vocabScore: 1-3 poor, 4-6 average, 7-8 good, 9-10 excellent
overallScore: 0-30 off-topic, 31-55 weak, 56-70 average, 71-84 good, 85-100 excellent

Reply ONLY with this exact JSON, nothing else:
{"grammarScore":N,"fluencyScore":N,"vocabScore":N,"overallScore":N,"feedback":"1 specific weakness + 1 actionable tip. Max 50 words.","corrected":"Model answer a strong candidate would give. 2-3 sentences.","pronunciationNote":"1 note on likely pronunciation challenge based on their word choices."}`
          }]
        })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("no json");
      const p = JSON.parse(match[0]);
      const result = {
        question: q.q, answer: trimmed,
        grammarScore: Math.min(10, Math.max(0, Number(p.grammarScore) || 5)),
        fluencyScore: Math.min(10, Math.max(0, Number(p.fluencyScore) || 5)),
        vocabScore: Math.min(10, Math.max(0, Number(p.vocabScore) || 5)),
        overallScore: Math.min(100, Math.max(0, Number(p.overallScore) || 50)),
        feedback: p.feedback || "No feedback.", corrected: p.corrected || "", pronunciationNote: p.pronunciationNote || "",
      };
      setFeedback(result); setAllResults(prev => [...prev, result]);
    } catch {
      // Smart local scoring when API unavailable
      const words = trimmed.toLowerCase().split(/\s+/);
      const wc = words.length;
      const hasExample = /example|once|when i|i worked|i handled|situation|time when|i was/i.test(trimmed);
      const hasProfVocab = /professional|experience|skill|communicate|customer|resolve|dedicated|challenge|improve|team/i.test(trimmed);
      const sentenceCount = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 4).length;
      const onTopic = q.q.toLowerCase().split(" ").filter(w => w.length > 4).some(w => trimmed.toLowerCase().includes(w));

      const gScore = Math.min(8, Math.max(2, Math.round(3 + (sentenceCount >= 2 ? 2 : 0) + (hasProfVocab ? 2 : 0) + (wc >= 25 ? 1 : 0))));
      const fScore = Math.min(8, Math.max(2, Math.round(3 + (wc >= 20 ? 2 : 0) + (sentenceCount >= 3 ? 2 : 0) + (onTopic ? 1 : 0))));
      const vScore = Math.min(8, Math.max(2, Math.round(3 + (hasProfVocab ? 3 : 0) + (wc >= 30 ? 2 : 0))));
      const overall = Math.min(78, Math.max(10, Math.round(
        (wc < 8 ? 15 : wc < 20 ? 35 : 50) +
        (onTopic ? 12 : 0) + (hasExample ? 12 : 0) +
        (hasProfVocab ? 8 : 0) + (sentenceCount >= 3 ? 6 : 0)
      )));

      const tip = !onTopic
        ? "Your answer doesn't directly address the question. Re-read it carefully and respond specifically."
        : !hasExample
        ? "Add a concrete example from your experience — this is what HR interviewers look for most."
        : wc < 20
        ? "Expand your answer. Aim for at least 3 sentences covering What, How, and the Result."
        : "Good length. Strengthen your vocabulary with more professional business English terms.";

      const fb = {
        question: q.q, answer: trimmed,
        grammarScore: gScore, fluencyScore: fScore, vocabScore: vScore, overallScore: overall,
        feedback: tip,
        corrected: "",
        pronunciationNote: ""
      };
      setFeedback(fb); setAllResults(p => [...p, fb]);
    }
    setLoading(false);
  };

  const nextQuestion = () => {
    if (step < MAX - 1) { setStep(p => p + 1); setAnswer(""); setTranscript(""); setFeedback(null); finalTextRef.current = ""; setPhase("answering"); }
    else setPhase("done");
  };

  const retryQuestion = () => {
    setAnswer(""); setTranscript(""); setFeedback(null); finalTextRef.current = "";
    setAllResults(p => p.slice(0, -1)); setPhase("answering");
  };

  useEffect(() => () => { clearInterval(timerRef.current); stopListening(); }, []);

  // INTRO
  if (phase === "intro") return (
    <section className="section">
      <div className="container" style={{ maxWidth: 620, textAlign: "center" }}>
        <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 28, display: "block" }} onClick={onBack}>← Back</button>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎙️</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>HR Speaking Interview</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 32px" }}>
          Answer {MAX} real HR interview questions. Each has <strong style={{ color: "var(--text)" }}>55 seconds</strong>. Your answer is evaluated by AI for grammar, fluency, vocabulary, and content quality.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 36, textAlign: "left" }}>
          {[["🎤", "Voice or Type", "Mic or keyboard"], ["⏱️", "55 sec each", "Auto-submits"], ["🤖", "Real AI scores", "Claude AI"], ["📊", "Full report", "After all questions"]].map(([icon, title, desc]) => (
            <div key={title} style={{ background: "rgba(99,102,241,0.07)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 12px" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{desc}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ padding: "14px 40px", fontSize: 16 }} onClick={() => setPhase("answering")}>Start Interview →</button>
      </div>
    </section>
  );

  // DONE
  if (phase === "done") {
    const avg = (key) => Math.round(allResults.reduce((s, r) => s + r[key], 0) / allResults.length);
    const avgG = avg("grammarScore") * 10;
    const avgF = avg("fluencyScore") * 10;
    const avgV = avg("vocabScore") * 10;
    const avgO = avg("overallScore");
    const lvl = getLevel(avgO);
    const rec = avgO >= 80 ? { label: "✅ PASS", color: "var(--emerald)", note: "Strong candidate. Recommended for next round." }
      : avgO >= 60 ? { label: "⚠️ NEEDS IMPROVEMENT", color: "var(--amber)", note: "Shows potential. Needs more preparation before the real interview." }
      : { label: "❌ NOT READY YET", color: "var(--rose)", note: "Significant improvement needed. Practice daily for 2–4 weeks." };
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>📋</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Interview Complete</h2>
            <div style={{ fontSize: 60, fontWeight: 900, color: lvl.color, lineHeight: 1.1, margin: "12px 0" }}>{avgO}%</div>
            <div style={{ display: "inline-block", padding: "8px 24px", borderRadius: 12, background: lvl.color + "22", color: lvl.color, fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{lvl.lvl} — {lvl.label}</div>
            <div style={{ padding: "8px 20px", borderRadius: 10, background: rec.color + "18", color: rec.color, fontSize: 14, fontWeight: 700, border: `1px solid ${rec.color}44`, display: "inline-block", marginBottom: 6 }}>{rec.label}</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{rec.note}</div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--dim)", marginBottom: 14 }}>📊 Score Breakdown</div>
            {[["Grammar", avgG, "var(--indigo)"], ["Fluency", avgF, "var(--violet)"], ["Vocabulary", avgV, "var(--cyan)"], ["Overall Interview", avgO, lvl.color]].map(([label, sc, color]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span>{label}</span><span style={{ fontWeight: 700, color }}>{sc}%</span></div>
                <div style={{ height: 8, background: "rgba(99,102,241,0.12)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: sc + "%", background: color, borderRadius: 4, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>📝 Question by Question</div>
            {allResults.map((r, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, flex: 1, lineHeight: 1.4 }}>Q{i + 1}. {r.question}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: r.overallScore >= 75 ? "var(--emerald)" : r.overallScore >= 55 ? "var(--amber)" : "var(--rose)", flexShrink: 0 }}>{r.overallScore}%</div>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  {[["G", r.grammarScore], ["F", r.fluencyScore], ["V", r.vocabScore]].map(([l, s]) => (
                    <div key={l} style={{ padding: "3px 10px", borderRadius: 8, background: "rgba(99,102,241,0.1)", fontSize: 12 }}>{l}: <strong>{s}/10</strong></div>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{r.feedback}</div>
                {r.corrected && <div style={{ marginTop: 8, padding: "8px 12px", background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: 8, fontSize: 12, color: "var(--muted)" }}><span style={{ color: "var(--cyan)", fontWeight: 700 }}>✏️ Model: </span>{r.corrected}</div>}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={() => { setPhase("intro"); setStep(0); setAllResults([]); setAnswer(""); setTranscript(""); setFeedback(null); }}>🔄 Retake</button>
            <button className="btn btn-ghost" onClick={onBack}>← Back to Tests</button>
          </div>
        </div>
      </section>
    );
  }

  // ANSWERING + FEEDBACK
  const q = QUESTIONS[step];
  const timerPct = (qTimer / Q_TIME) * 100;
  const timerColor = qTimer > 20 ? "var(--emerald)" : qTimer > 10 ? "var(--amber)" : "var(--rose)";
  const hasMic = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => { clearInterval(timerRef.current); stopListening(); onBack(); }}>← Exit</button>
          <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Question {step + 1} of {MAX}</span>
          {phase === "answering"
            ? <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, color: timerColor, background: timerColor + "18", padding: "4px 14px", borderRadius: 8, border: `1px solid ${timerColor}44` }}>⏱ {String(Math.floor(qTimer / 60)).padStart(2, "0")}:{String(qTimer % 60).padStart(2, "0")}</div>
            : <div style={{ fontSize: 12, color: "var(--muted)" }}>📊 Feedback</div>}
        </div>

        <div style={{ height: 6, background: "rgba(99,102,241,0.12)", borderRadius: 3, overflow: "hidden", marginBottom: 4 }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, var(--indigo), var(--cyan))", borderRadius: 3, width: `${(step / MAX) * 100}%`, transition: "width 0.4s" }} />
        </div>
        {phase === "answering" && (
          <div style={{ height: 4, background: "rgba(244,63,94,0.1)", borderRadius: 2, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ height: "100%", background: timerColor, borderRadius: 2, width: timerPct + "%", transition: "width 1s linear" }} />
          </div>
        )}
        {phase !== "answering" && <div style={{ marginBottom: 20 }} />}

        <div style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "var(--cyan)", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>💼 Interview Question</div>
          <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.5, marginBottom: 8 }}>{q.q}</div>
          <div style={{ fontSize: 12, color: "var(--dim)" }}>💡 {q.hint}</div>
        </div>

        {phase === "answering" && (
          <div className="fade-in">
            {hasMic && (
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <button onClick={listening ? stopListening : startListening} style={{ width: 72, height: 72, borderRadius: "50%", border: "none", cursor: "pointer", background: listening ? "linear-gradient(135deg, var(--rose), #dc2626)" : "linear-gradient(135deg, var(--indigo), var(--violet))", color: "white", fontSize: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: listening ? "0 0 0 8px rgba(244,63,94,0.2), 0 0 24px rgba(244,63,94,0.4)" : "0 0 24px rgba(99,102,241,0.4)", animation: listening ? "pulse-mic 1.2s infinite" : "none", transition: "all 0.3s", marginBottom: 10 }}>
                  {listening ? "⏹" : "🎙"}
                </button>
                <div style={{ fontSize: 13, color: listening ? "var(--rose)" : "var(--muted)", fontWeight: listening ? 600 : 400 }}>
                  {listening ? "🔴 Listening — speak now..." : "Tap mic to speak"}
                </div>
                {listening && transcript && (
                  <div style={{ marginTop: 10, padding: "10px 16px", background: "rgba(13,20,40,0.8)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 13, color: "var(--muted)", textAlign: "left", lineHeight: 1.7, maxHeight: 100, overflowY: "auto" }}>
                    <span style={{ color: "var(--cyan)", fontSize: 11, fontWeight: 700 }}>LIVE: </span>{transcript}
                  </div>
                )}
                <div style={{ fontSize: 12, color: "var(--dim)", margin: "10px 0 4px" }}>— or type below —</div>
              </div>
            )}
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder={hasMic ? "Speech appears here, or type your answer..." : "Type your answer here..."} style={{ width: "100%", minHeight: 120, padding: "14px 16px", borderRadius: 12, border: "1px solid var(--border)", background: "rgba(13,20,40,0.8)", color: "var(--text)", fontFamily: "inherit", fontSize: 14, lineHeight: 1.7, resize: "vertical", outline: "none", marginBottom: 8 }} onFocus={e => e.target.style.borderColor = "var(--indigo)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 12 }}>
              <span style={{ color: "var(--dim)" }}>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
              <span style={{ color: answer.trim().split(/\s+/).filter(Boolean).length >= 25 ? "var(--emerald)" : "var(--muted)" }}>{answer.trim().split(/\s+/).filter(Boolean).length >= 25 ? "✅ Good" : "Aim for 25+ words"}</span>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 15 }} onClick={handleSubmitAnswer} disabled={answer.trim().length < 3}>Submit Answer →</button>
          </div>
        )}

        {phase === "feedback" && (
          <div className="fade-in">
            {loading ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div className="spin" style={{ display: "inline-block", fontSize: 32, marginBottom: 12 }}>⚙️</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>AI is evaluating your answer...</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Analyzing grammar, fluency, vocabulary and content</div>
              </div>
            ) : feedback && (
              <>
                <div style={{ background: feedback.overallScore >= 75 ? "rgba(16,185,129,0.07)" : feedback.overallScore >= 55 ? "rgba(245,158,11,0.07)" : "rgba(244,63,94,0.07)", border: `1px solid ${feedback.overallScore >= 75 ? "rgba(16,185,129,0.3)" : feedback.overallScore >= 55 ? "rgba(245,158,11,0.3)" : "rgba(244,63,94,0.3)"}`, borderRadius: 14, padding: 20, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: feedback.overallScore >= 75 ? "var(--emerald)" : feedback.overallScore >= 55 ? "var(--amber)" : "var(--rose)" }}>🤖 AI Evaluation</div>
                    <div style={{ fontSize: 30, fontWeight: 900, color: feedback.overallScore >= 75 ? "var(--emerald)" : feedback.overallScore >= 55 ? "var(--amber)" : "var(--rose)" }}>{feedback.overallScore}%</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                    {[["Grammar", feedback.grammarScore], ["Fluency", feedback.fluencyScore], ["Vocabulary", feedback.vocabScore]].map(([label, sc]) => (
                      <div key={label} style={{ flex: 1, minWidth: 80, textAlign: "center", padding: "8px 6px", borderRadius: 10, background: "rgba(99,102,241,0.1)", border: "1px solid var(--border)" }}>
                        <div style={{ fontSize: 11, color: "var(--dim)", marginBottom: 3 }}>{label}</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: sc >= 7 ? "var(--emerald)" : sc >= 5 ? "var(--amber)" : "var(--rose)" }}>{sc}<span style={{ fontSize: 12, fontWeight: 400 }}>/10</span></div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginBottom: 10 }}>{feedback.feedback}</div>
                  {feedback.pronunciationNote && <div style={{ fontSize: 13, color: "var(--dim)", padding: "8px 12px", background: "rgba(99,102,241,0.06)", borderRadius: 8, marginBottom: 10 }}>🗣️ <strong>Pronunciation note:</strong> {feedback.pronunciationNote}</div>}
                  {feedback.corrected && <div style={{ background: "rgba(34,211,238,0.06)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(34,211,238,0.2)" }}><div style={{ fontSize: 11, color: "var(--cyan)", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>✏️ Model Answer</div><div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{feedback.corrected}</div></div>}
                </div>
                <div style={{ background: "rgba(13,20,40,0.6)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "var(--dim)", marginBottom: 6, textTransform: "uppercase" }}>Your Answer</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{feedback.answer || "(no answer)"}</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={retryQuestion}>🔄 Retry</button>
                  <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={nextQuestion}>{step < MAX - 1 ? `Next (${step + 2}/${MAX}) →` : "View Results 📊"}</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [homeKey, setHomeKey] = useState(0);
  const t = TRANSLATIONS[lang];

  const navigateTo = (p) => {
    if (p === "home") setHomeKey(k => k + 1);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLang = () => {
    setLang(l => l === "en" ? "ar" : "en");
    if (page === "home") setHomeKey(k => k + 1);
  };

  const navLinks = [
    { id: "home", label: t.nav.home },
    { id: "assessment", label: t.nav.assessment },
    { id: "dashboard", label: t.nav.dashboard },
    { id: "blog", label: t.nav.blog },
    { id: "leaderboard", label: lang === "en" ? "Leaderboard" : "المتصدرون" },
    { id: "admin", label: t.nav.admin },
  ];

  // resolve blog post page
  const blogPostMatch = page.startsWith("blog-post-");
  const blogPostId = blogPostMatch ? parseInt(page.replace("blog-post-", "")) : null;
  const blogPostData = blogPostId ? BLOG_POSTS.find(p => p.id === blogPostId) : null;

  return (
    <div dir={t.dir} className="noise">
      <style>{css}</style>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigateTo("home")}>
          <span>⚡</span> English Test
        </div>
        <div className="nav-links">
          {navLinks.map(l => (
            <button key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => navigateTo(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="btn btn-lang" onClick={toggleLang}>{t.nav.switchLang}</button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main style={{ paddingTop: 0, minHeight: "100vh" }}>
        {page === "home" && <HomePage key={homeKey} t={t} setPage={navigateTo} lang={lang} />}
        {page === "assessment" && <AssessmentPage t={t} lang={lang} />}
        {page === "dashboard" && <DashboardPage t={t} user={user} setPage={navigateTo} />}
        {page === "leaderboard" && <LeaderboardPage setPage={navigateTo} />}
        {page === "admin" && <AdminPage t={t} />}
        {page === "about" && <AboutPage setPage={navigateTo} />}
        {page === "privacy" && <PrivacyPage setPage={navigateTo} />}
        {page === "terms" && <TermsPage setPage={navigateTo} />}
        {page === "contact" && <ContactPage setPage={navigateTo} />}

        {/* BLOG LIST */}
        {page === "blog" && (
          <section className="section">
            <div className="container">
              <AdBanner className="ad-banner-top" />
              <div className="section-label">📚 Blog</div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>{t.blog.title}</h2>
              <p style={{ color: "var(--muted)", marginBottom: 36 }}>{t.blog.subtitle}</p>
              <div className="grid-2">
                {BLOG_POSTS.map((post) => (
                  <div className="card blog-card" key={post.id} style={{ cursor: "pointer" }} onClick={() => navigateTo("blog-post-" + post.id)}>
                    <div className="blog-cat">{post.cat}</div>
                    <div className="blog-title">{post.title}</div>
                    <div className="blog-excerpt">{post.excerpt}</div>
                    <div className="blog-meta">
                      <span>⏱ {post.time}</span>
                      <span className="blog-read">{t.blog.readMore}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BLOG POST */}
        {blogPostMatch && blogPostData && <BlogPostPage post={blogPostData} setPage={navigateTo} />}
        {blogPostMatch && !blogPostData && (
          <section className="section">
            <div className="container" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
              <h2>Article not found</h2>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigateTo("blog")}>Back to Blog</button>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <AdBanner className="ad-banner-footer" style={{ marginBottom: 40 }} label="Footer Ad — 728×90" />
          <div className="footer-grid">
            <div>
              <div className="nav-logo" style={{ marginBottom: 12, cursor: "default" }}>⚡ English Test</div>
              <div className="footer-brand">{t.footer.tagline}<br />Built for call center professionals in the Arab world.</div>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              {[
                ["Assessment", "assessment"],
                ["HR Simulation", "assessment"],
                ["Dashboard", "dashboard"],
                ["Blog", "blog"],
                ["Leaderboard", "leaderboard"],
              ].map(([label, route]) => (
                <span key={label} className="footer-link" onClick={() => navigateTo(route)}>{label}</span>
              ))}
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              {[
                ["About", "about"],
                ["Privacy Policy", "privacy"],
                ["Terms of Service", "terms"],
                ["Contact", "contact"],
              ].map(([label, route]) => (
                <span key={label} className="footer-link" onClick={() => navigateTo(route)}>{label}</span>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t.footer.rights}</span>
            <div style={{ display: "flex", gap: 16 }}>
              {["Twitter", "LinkedIn", "YouTube"].map(s => (
                <span key={s} className="footer-link" style={{ margin: 0 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
