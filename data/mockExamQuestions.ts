
import type { MockQuestion } from '../types.ts';

// Total marks should ideally be 100.
// Section A: 46 Questions (76 marks)
//   - 16 questions x 1 mark = 16 marks
//   - 30 questions x 2 marks = 60 marks
// Section B: 6 MTQs (24 marks)
//   - 6 scenarios x 4 questions x 1 mark = 24 marks

export const mockQuestions: MockQuestion[] = [
  // ==========================================================================
  // SECTION A, PART 1: 1-MARK QUESTIONS (16 Questions)
  // ==========================================================================
  {
    id: 'A1_1',
    type: 'single',
    topic: 'Business Organisation',
    marks: 1,
    question: 'A sole trader organisation has a separate legal identity from its owner.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'A sole trader and the business are legally the same entity; the owner has unlimited liability.'
  },
  {
    id: 'A1_2',
    type: 'single',
    topic: 'Structure',
    marks: 1,
    question: 'The "Scalar Chain" refers to the number of subordinates a manager directly supervises.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'The Scalar Chain refers to the line of authority from top management to the lowest ranks. The number of subordinates is the "Span of Control".'
  },
  {
    id: 'A1_3',
    type: 'single',
    topic: 'Organisational Culture',
    marks: 1,
    question: 'In Charles Handy\'s gods of management, which god represents a "Role Culture"?',
    options: ['Zeus', 'Apollo', 'Athena', 'Dionysus'],
    correctAnswer: 'Apollo',
    explanation: 'Apollo represents Role Culture (logic, bureaucracy, and rules).'
  },
  {
    id: 'A1_4',
    type: 'single',
    topic: 'Economics',
    marks: 1,
    question: 'Which type of unemployment occurs when there is a general lack of demand in the economy?',
    options: ['Frictional', 'Structural', 'Cyclical', 'Seasonal'],
    correctAnswer: 'Cyclical',
    explanation: 'Cyclical unemployment is caused by a downturn in the business cycle (recession).'
  },
  {
    id: 'A1_5',
    type: 'single',
    topic: 'Marketing',
    marks: 1,
    question: 'In the marketing mix (4Ps), "Public Relations" is part of which P?',
    options: ['Product', 'Price', 'Place', 'Promotion'],
    correctAnswer: 'Promotion',
    explanation: 'Public Relations (PR) is a tool used within the Promotion mix.'
  },
  {
    id: 'A1_6',
    type: 'single',
    topic: 'Accounting',
    marks: 1,
    question: 'Financial Accounting is primarily concerned with providing information to internal management.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Financial Accounting focuses on external stakeholders (shareholders, banks). Management Accounting focuses on internal users.'
  },
  {
    id: 'A1_7',
    type: 'single',
    topic: 'Governance',
    marks: 1,
    question: 'A non-executive director (NED) should be employed by the company on a full-time basis.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'NEDs are independent, part-time directors who provide oversight.'
  },
  {
    id: 'A1_8',
    type: 'single',
    topic: 'Ethics',
    marks: 1,
    question: 'Which fundamental principle requires an accountant to be straightforward and honest?',
    options: ['Integrity', 'Objectivity', 'Confidentiality', 'Competence'],
    correctAnswer: 'Integrity',
    explanation: 'Integrity imposes an obligation to be straightforward and honest in all professional and business relationships.'
  },
  {
    id: 'A1_9',
    type: 'single',
    topic: 'Audit',
    marks: 1,
    question: 'The primary responsibility for the prevention and detection of fraud rests with the external auditor.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Management is primarily responsible for preventing and detecting fraud. Auditors assess the risk.'
  },
  {
    id: 'A1_10',
    type: 'single',
    topic: 'Technology',
    marks: 1,
    question: 'What does the "S" stand for in "SPAM"?',
    options: ['Sending', 'System', 'Solicited', 'Unsolicited'],
    correctAnswer: 'Unsolicited',
    explanation: 'Strictly speaking, SPAM isn\'t an acronym, but it refers to Unsolicited Commercial Email.'
  },
  {
    id: 'A1_11',
    type: 'single',
    topic: 'Economics',
    marks: 1,
    question: 'Inflation is defined as a general decrease in the price level of goods and services.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Inflation is a general INCREASE in price levels. A decrease is Deflation.'
  },
  {
    id: 'A1_12',
    type: 'single',
    topic: 'Structure',
    marks: 1,
    question: 'A "Tall" organisation typically has a wide span of control.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Tall organisations have many levels of hierarchy and typically a narrow span of control.'
  },
  {
    id: 'A1_13',
    type: 'single',
    topic: 'Leadership',
    marks: 1,
    question: 'Which leadership style involves the leader making decisions without consulting the team?',
    options: ['Democratic', 'Autocratic', 'Laissez-faire', 'Transformational'],
    correctAnswer: 'Autocratic',
    explanation: 'Autocratic leaders hold all authority and make decisions alone.'
  },
  {
    id: 'A1_14',
    type: 'single',
    topic: 'HR',
    marks: 1,
    question: 'The document that lists the skills, experience, and qualifications required for a job is the Job Description.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'This is the "Person Specification". The Job Description outlines the tasks and responsibilities.'
  },
  {
    id: 'A1_15',
    type: 'single',
    topic: 'Communication',
    marks: 1,
    question: 'Lateral communication occurs between people at different levels of the hierarchy.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Lateral (Horizontal) communication happens between people at the SAME level. Different levels is Vertical.'
  },
  {
    id: 'A1_16',
    type: 'single',
    topic: 'Ethics',
    marks: 1,
    question: 'Which threat arises when an accountant promotes a client’s position to the point where objectivity is compromised?',
    options: ['Self-interest', 'Advocacy', 'Familiarity', 'Intimidation'],
    correctAnswer: 'Advocacy',
    explanation: 'Advocacy threat occurs when promoting a client’s opinion (e.g., shares) compromises objectivity.'
  },

  // ==========================================================================
  // SECTION A, PART 2: 2-MARK QUESTIONS (30 Questions)
  // ==========================================================================

  // --- STAKEHOLDERS & ORGANISATION ---
  {
    id: 'A2_17',
    type: 'matching',
    topic: 'Stakeholders',
    marks: 2,
    question: 'Match the stakeholder group to their primary interest.',
    pairs: [
      { left: 'Shareholders', right: 'Return on Capital (Dividends)' },
      { left: 'Employees', right: 'Job Security & Pay' },
      { left: 'Customers', right: 'Value for Money' },
      { left: 'Government', right: 'Tax Revenues & Compliance' }
    ],
    explanation: 'Shareholders want profit, employees want security, customers want value, government wants tax/law adherence.'
  },
  {
    id: 'A2_18',
    type: 'single',
    topic: 'Organisational Culture',
    marks: 2,
    question: 'According to Hofstede, which dimension refers to the degree to which less powerful members accept that power is distributed unequally?',
    options: [
      'Uncertainty Avoidance',
      'Power Distance',
      'Individualism',
      'Masculinity'
    ],
    correctAnswer: 'Power Distance',
    explanation: 'Power Distance measures the acceptance of hierarchy and unequal power distribution.'
  },
  {
    id: 'A2_19',
    type: 'single',
    topic: 'Environment',
    marks: 2,
    question: 'Which of the following is a SOCIAL factor in PESTEL analysis?',
    options: [
      'New data protection laws',
      'Rise in interest rates',
      'Ageing population',
      'Introduction of AI technology'
    ],
    correctAnswer: 'Ageing population',
    explanation: 'Demographics (ageing population) is a key Social factor. Laws are Legal, rates are Economic, AI is Technological.'
  },
  {
    id: 'A2_20',
    type: 'single',
    topic: 'Economics',
    marks: 2,
    question: 'If the government reduces income tax, what is the likely immediate effect on the economy?',
    options: [
      'Decrease in consumer spending',
      'Increase in aggregate demand',
      'Increase in unemployment',
      'Decrease in inflation'
    ],
    correctAnswer: 'Increase in aggregate demand',
    explanation: 'Lower taxes mean more disposable income, leading to higher spending and increased aggregate demand.'
  },
  {
    id: 'A2_21',
    type: 'single',
    topic: 'Marketing',
    marks: 2,
    question: 'Which pricing strategy involves setting a high initial price for a unique product to maximize revenue before competitors enter?',
    options: [
      'Penetration Pricing',
      'Cost-plus Pricing',
      'Price Skimming',
      'Going Rate Pricing'
    ],
    correctAnswer: 'Price Skimming',
    explanation: 'Skimming involves "skimming" the cream off the market with high prices for early adopters.'
  },

  // --- ACCOUNTING & FINANCE ---
  {
    id: 'A2_22',
    type: 'single',
    topic: 'Accounting',
    marks: 2,
    question: 'Which of the following is the main purpose of the International Financial Reporting Standards (IFRS)?',
    options: [
      'To minimize tax payments for global companies',
      'To harmonise accounting practices globally',
      'To replace national governments',
      'To ensure all companies make a profit'
    ],
    correctAnswer: 'To harmonise accounting practices globally',
    explanation: 'IFRS exists to create a common global language for business affairs so that accounts are understandable and comparable.'
  },
  {
    id: 'A2_23',
    type: 'multi',
    topic: 'Controls',
    marks: 2,
    question: 'Which TWO of the following are examples of "Physical Controls"?',
    options: [
      'Passwords on computers',
      'Locking cash in a safe',
      'Bank reconciliations',
      'ID card entry systems'
    ],
    correctAnswers: ['Locking cash in a safe', 'ID card entry systems'],
    explanation: 'Physical controls restrict physical access to assets. Passwords are logical/access controls; reconciliations are arithmetic/accounting controls.'
  },
  {
    id: 'A2_24',
    type: 'single',
    topic: 'Fraud',
    marks: 2,
    question: 'Teeming and Lading (Lapping) is a type of fraud typically associated with:',
    options: [
      'Inventory theft',
      'Cash receipts from customers',
      'Payroll ghost employees',
      'Supplier invoice padding'
    ],
    correctAnswer: 'Cash receipts from customers',
    explanation: 'Teeming and lading involves delaying the recording of cash receipts to hide the theft of money.'
  },
  {
    id: 'A2_25',
    type: 'single',
    topic: 'Money Laundering',
    marks: 2,
    question: 'What is the correct order of the three stages of money laundering?',
    options: [
      'Layering, Placement, Integration',
      'Placement, Layering, Integration',
      'Integration, Placement, Layering',
      'Placement, Integration, Layering'
    ],
    correctAnswer: 'Placement, Layering, Integration',
    explanation: 'Dirty money is Placed into the system, Layered to hide origin, and Integrated back as "clean" money.'
  },

  // --- HR & MANAGEMENT ---
  {
    id: 'A2_26',
    type: 'matching',
    topic: 'Motivation',
    marks: 2,
    question: 'Match the theory to the theorist.',
    pairs: [
      { left: 'Hierarchy of Needs', right: 'Maslow' },
      { left: 'Hygiene Factors', right: 'Herzberg' },
      { left: 'Theory X and Theory Y', right: 'McGregor' },
      { left: 'Expectancy Theory', right: 'Vroom' }
    ],
    explanation: 'Maslow (Pyramid), Herzberg (Two-factor), McGregor (X/Y), Vroom (Expectancy).'
  },
  {
    id: 'A2_27',
    type: 'single',
    topic: 'Teams',
    marks: 2,
    question: 'In Tuckman’s stages of team development, which stage involves conflict as members resist the group’s influence?',
    options: ['Forming', 'Storming', 'Norming', 'Performing'],
    correctAnswer: 'Storming',
    explanation: 'Storming is the stage of conflict and competition for status/roles.'
  },
  {
    id: 'A2_28',
    type: 'single',
    topic: 'Appraisal',
    marks: 2,
    question: 'Which barrier to appraisal occurs when a manager rates an employee based solely on a recent mistake, ignoring a year of good work?',
    options: [
      'Halo Effect',
      'Recency Effect',
      'Central Tendency',
      'Contrast Effect'
    ],
    correctAnswer: 'Recency Effect',
    explanation: 'Recency effect places too much emphasis on recent events rather than performance over the whole period.'
  },
  {
    id: 'A2_29',
    type: 'multi',
    topic: 'Recruitment',
    marks: 2,
    question: 'Which TWO are advantages of INTERNAL recruitment?',
    options: [
      'Brings fresh ideas',
      'Cheaper and faster',
      'Motivates existing staff',
      'Wider pool of candidates'
    ],
    correctAnswers: ['Cheaper and faster', 'Motivates existing staff'],
    explanation: 'Internal recruitment saves ad costs and boosts morale. Fresh ideas come from external.'
  },
  
  // --- ETHICS & PROFESSIONALISM ---
  {
    id: 'A2_30',
    type: 'single',
    topic: 'Ethics',
    marks: 2,
    question: 'An accountant is asked to audit a company where his wife is the Finance Director. Which threat does this represent?',
    options: [
      'Self-review',
      'Advocacy',
      'Familiarity',
      'Intimidation'
    ],
    correctAnswer: 'Familiarity',
    explanation: 'A close family relationship creates a Familiarity threat (too sympathetic to the client).'
  },
  {
    id: 'A2_31',
    type: 'single',
    topic: 'Ethics',
    marks: 2,
    question: 'Under which circumstance is an accountant permitted to disclose confidential information?',
    options: [
      'To help a friend invest',
      'When required by law',
      'When the client is annoying',
      'To gossip with colleagues'
    ],
    correctAnswer: 'When required by law',
    explanation: 'Confidentiality can be broken if required by law (e.g., money laundering reporting) or with client consent.'
  },
  
  // --- TECHNOLOGY ---
  {
    id: 'A2_32',
    type: 'single',
    topic: 'Technology',
    marks: 2,
    question: 'Which of the following best describes "Big Data"?',
    options: [
      'Data stored on old computers',
      'Data that is high volume, high velocity, and high variety',
      'Data strictly for financial reporting',
      'Data that is manually processed'
    ],
    correctAnswer: 'Data that is high volume, high velocity, and high variety',
    explanation: 'The 3 Vs (Volume, Velocity, Variety) are the defining characteristics of Big Data.'
  },
  {
    id: 'A2_33',
    type: 'single',
    topic: 'Technology',
    marks: 2,
    question: 'A distributed ledger technology where transactions are recorded across many computers is known as:',
    options: [
      'Cloud Computing',
      'Blockchain',
      'Automation',
      'Data Analytics'
    ],
    correctAnswer: 'Blockchain',
    explanation: 'Blockchain is a decentralized, distributed ledger technology.'
  },

  // --- MIXED TOPICS ---
  {
    id: 'A2_34',
    type: 'single',
    topic: 'Governance',
    marks: 2,
    question: 'Which committee is responsible for setting the pay of Executive Directors?',
    options: [
      'Audit Committee',
      'Nomination Committee',
      'Remuneration Committee',
      'Risk Committee'
    ],
    correctAnswer: 'Remuneration Committee',
    explanation: 'The Remuneration Committee determines the pay/packages for executives.'
  },
  {
    id: 'A2_35',
    type: 'single',
    topic: 'Economics',
    marks: 2,
    question: 'A deficit in the Balance of Payments means:',
    options: [
      'Government spends more than it earns in tax',
      'Value of imports exceeds value of exports',
      'Inflation is higher than interest rates',
      'Unemployment is rising'
    ],
    correctAnswer: 'Value of imports exceeds value of exports',
    explanation: 'Balance of Payments trade deficit occurs when imports > exports.'
  },
  {
    id: 'A2_36',
    type: 'matching',
    topic: 'Porter',
    marks: 2,
    question: 'Match the scenario to the Porter’s Five Force.',
    pairs: [
      { left: 'Few large suppliers exist', right: 'High Bargaining Power of Suppliers' },
      { left: 'Low startup costs', right: 'High Threat of New Entrants' },
      { left: 'Many similar products', right: 'High Threat of Substitutes' },
      { left: 'Customers buy in bulk', right: 'High Bargaining Power of Buyers' }
    ],
    explanation: 'Understanding the drivers of industry competition.'
  },
  {
    id: 'A2_37',
    type: 'single',
    topic: 'Controls',
    marks: 2,
    question: 'Which is a "General Control" in an IT environment?',
    options: [
      'A password for a specific application',
      'Virus protection software on the network',
      'A validation check on an input field',
      'Checking the total of a batch of invoices'
    ],
    correctAnswer: 'Virus protection software on the network',
    explanation: 'General controls apply to the whole system environment. The others are "Application Controls".'
  },
  {
    id: 'A2_38',
    type: 'single',
    topic: 'Learning',
    marks: 2,
    question: 'Honey and Mumford identified four learning styles. Which one describes people who like to stand back and observe?',
    options: ['Activists', 'Reflectors', 'Theorists', 'Pragmatists'],
    correctAnswer: 'Reflectors',
    explanation: 'Reflectors prefer to observe and think before acting. Activists do; Theorists understand; Pragmatists experiment.'
  },
  {
    id: 'A2_39',
    type: 'single',
    topic: 'Communication',
    marks: 2,
    question: 'Which pattern of communication is fastest but has the lowest satisfaction for members?',
    options: ['Circle', 'Chain', 'Wheel', 'All-Channel'],
    correctAnswer: 'Wheel',
    explanation: 'The Wheel is centralized (fast/efficient) but only the center person is satisfied; others feel isolated.'
  },
  {
    id: 'A2_40',
    type: 'single',
    topic: 'Diversity',
    marks: 2,
    question: 'A quota system to ensure a certain percentage of women are on the board is an example of:',
    options: [
      'Direct Discrimination',
      'Positive Discrimination',
      'Positive Action',
      'Victimisation'
    ],
    correctAnswer: 'Positive Discrimination',
    explanation: 'Positive Discrimination (hiring based on a protected characteristic to meet a quota) is generally illegal in the UK, unlike Positive Action.'
  },
  {
    id: 'A2_41',
    type: 'single',
    topic: 'Audit',
    marks: 2,
    question: 'Which of the following is NOT a right of the External Auditor?',
    options: [
      'Right to access books and records',
      'Right to speak at the AGM',
      'Right to vote at board meetings',
      'Right to receive notice of general meetings'
    ],
    correctAnswer: 'Right to vote at board meetings',
    explanation: 'Auditors observe and report; they do not vote or run the company.'
  },
  {
    id: 'A2_42',
    type: 'single',
    topic: 'Personal Effectiveness',
    marks: 2,
    question: 'In time management, a task that is "Urgent but Not Important" should ideally be:',
    options: ['Done immediately by you', 'Delegated', 'Planned for later', 'Ignored'],
    correctAnswer: 'Delegated',
    explanation: 'The Eisenhower Matrix suggests delegating urgent but unimportant tasks.'
  },
  {
    id: 'A2_43',
    type: 'single',
    topic: 'Structure',
    marks: 2,
    question: 'A company outsources its manufacturing, IT, and HR, keeping only a small core team. What structure is this?',
    options: ['Matrix', 'Hollow (or Network)', 'Divisional', 'Functional'],
    correctAnswer: 'Hollow (or Network)',
    explanation: 'A Hollow organisation focuses on core competencies and outsources non-core activities.'
  },
  {
    id: 'A2_44',
    type: 'single',
    topic: 'Economics',
    marks: 2,
    question: 'Fiscal Policy is controlled by:',
    options: ['The Central Bank', 'The Government', 'The Stock Market', 'Commercial Banks'],
    correctAnswer: 'The Government',
    explanation: 'Fiscal policy involves Government taxation and spending. Monetary policy is the Central Bank.'
  },
  {
    id: 'A2_45',
    type: 'single',
    topic: 'Marketing',
    marks: 2,
    question: 'Segmenting a market based on lifestyle, personality, or values is called:',
    options: [
      'Demographic segmentation',
      'Geographic segmentation',
      'Psychographic segmentation',
      'Behavioural segmentation'
    ],
    correctAnswer: 'Psychographic segmentation',
    explanation: 'Psychographics deals with psychological attributes like lifestyle and personality.'
  },
  {
    id: 'A2_46',
    type: 'single',
    topic: 'Ethics',
    marks: 2,
    question: 'An accountant takes money from the client account to pay for a personal holiday, intending to pay it back. Is this ethical?',
    options: [
      'Yes, if paid back',
      'No, it is misappropriation of funds',
      'Yes, if the client agrees',
      'No, unless the firm approves'
    ],
    correctAnswer: 'No, it is misappropriation of funds',
    explanation: 'Taking client money for personal use is theft/misappropriation, regardless of intent to repay.'
  },

  // ==========================================================================
  // SECTION B: MULTI-TASK QUESTIONS (6 SCENARIOS x 4 MARKS = 24 MARKS)
  // ==========================================================================

  // MTQ 1: STRUCTURE
  {
    id: 'MTQ_1',
    type: 'scenario',
    topic: 'Structure',
    scenario: `TechGlobal has grown rapidly from a small startup to a multinational. Currently, the CEO makes all decisions (Entrepreneurial). However, the company now sells three very different products: Software, Hardware, and Consulting, across Europe and Asia. Efficiency is dropping.`,
    questions: [
      {
        id: 'MTQ_1_a',
        type: 'dropdown',
        topic: 'Structure',
        marks: 1,
        question: 'Which structure is currently causing bottlenecks?',
        parts: [{ options: ['Entrepreneurial', 'Matrix', 'Divisional'], correctAnswer: 'Entrepreneurial' }],
        explanation: 'One person (CEO) cannot manage a complex multinational effectively.'
      },
      {
        id: 'MTQ_1_b',
        type: 'dropdown',
        topic: 'Structure',
        marks: 1,
        question: 'Which structure would BEST allow focus on the three different product lines?',
        parts: [{ options: ['Functional', 'Divisional by Product', 'Hollow'], correctAnswer: 'Divisional by Product' }],
        explanation: 'Divisional by Product allows each product line to have its own specialised management.'
      },
      {
        id: 'MTQ_1_c',
        type: 'dropdown',
        topic: 'Structure',
        marks: 1,
        question: 'Identify ONE disadvantage of the Divisional structure.',
        parts: [{ options: ['Duplication of functions (e.g. HR in every division)', 'Slower decision making', 'Lack of focus'], correctAnswer: 'Duplication of functions (e.g. HR in every division)' }],
        explanation: 'Divisions often replicate support functions (HR, IT), increasing costs.'
      },
      {
        id: 'MTQ_1_d',
        type: 'dropdown',
        topic: 'Structure',
        marks: 1,
        question: 'If TechGlobal wants to share resources between projects and functions, which complex structure could they use?',
        parts: [{ options: ['Matrix', 'Entrepreneurial', 'Tall'], correctAnswer: 'Matrix' }],
        explanation: 'Matrix structure combines functional and project lines, sharing resources.'
      }
    ]
  },

  // MTQ 2: ECONOMICS
  {
    id: 'MTQ_2',
    type: 'scenario',
    topic: 'Economics',
    scenario: `The country is facing high inflation. The Central Bank has decided to increase interest rates. ABC Ltd sells luxury cars.`,
    questions: [
      {
        id: 'MTQ_2_a',
        type: 'dropdown',
        topic: 'Economics',
        marks: 1,
        question: 'Increasing interest rates is an example of:',
        parts: [{ options: ['Fiscal Policy', 'Monetary Policy', 'Supply-side Policy'], correctAnswer: 'Monetary Policy' }],
        explanation: 'Interest rates and money supply are tools of Monetary Policy.'
      },
      {
        id: 'MTQ_2_b',
        type: 'dropdown',
        topic: 'Economics',
        marks: 1,
        question: 'How will higher interest rates likely affect ABC Ltd\'s customers?',
        parts: [{ options: ['Increase disposable income', 'Decrease borrowing cost', 'Reduce disposable income'], correctAnswer: 'Reduce disposable income' }],
        explanation: 'Higher mortgage/loan payments reduce the money customers have available to spend.'
      },
      {
        id: 'MTQ_2_c',
        type: 'dropdown',
        topic: 'Economics',
        marks: 1,
        question: 'What is the likely impact on demand for luxury cars?',
        parts: [{ options: ['Demand will rise', 'Demand will fall significantly', 'No change'], correctAnswer: 'Demand will fall significantly' }],
        explanation: 'Luxury goods have high income elasticity; demand drops sharply when income falls.'
      },
      {
        id: 'MTQ_2_d',
        type: 'dropdown',
        topic: 'Economics',
        marks: 1,
        question: 'High inflation generally leads to:',
        parts: [{ options: ['Loss of purchasing power', 'Lower prices', 'Increased savings value'], correctAnswer: 'Loss of purchasing power' }],
        explanation: 'Inflation erodes the real value of money.'
      }
    ]
  },

  // MTQ 3: GOVERNANCE & ETHICS
  {
    id: 'MTQ_3',
    type: 'scenario',
    topic: 'Governance',
    scenario: `The Board of XYZ Plc consists of a CEO (who is also the Chairman) and 3 Executive Directors. There are no Non-Executive Directors.`,
    questions: [
      {
        id: 'MTQ_3_a',
        type: 'dropdown',
        topic: 'Governance',
        marks: 1,
        question: 'Is it best practice for the CEO and Chairman to be the same person?',
        parts: [{ options: ['Yes', 'No'], correctAnswer: 'No' }],
        explanation: 'Roles should be split to prevent one person having unfettered power.'
      },
      {
        id: 'MTQ_3_b',
        type: 'dropdown',
        topic: 'Governance',
        marks: 1,
        question: 'The board lacks:',
        parts: [{ options: ['Executive power', 'Independence', 'Managers'], correctAnswer: 'Independence' }],
        explanation: 'Without Non-Executive Directors (NEDs), there is no independent oversight.'
      },
      {
        id: 'MTQ_3_c',
        type: 'dropdown',
        topic: 'Governance',
        marks: 1,
        question: 'Which committee should ideally be staffed entirely by NEDs to set director pay?',
        parts: [{ options: ['Audit Committee', 'Remuneration Committee', 'Sales Committee'], correctAnswer: 'Remuneration Committee' }],
        explanation: 'Executives should not set their own pay.'
      },
      {
        id: 'MTQ_3_d',
        type: 'dropdown',
        topic: 'Governance',
        marks: 1,
        question: 'Who are the primary stakeholders the board is accountable to?',
        parts: [{ options: ['Shareholders', 'Suppliers', 'Competitors'], correctAnswer: 'Shareholders' }],
        explanation: 'Directors are agents of the shareholders.'
      }
    ]
  },

  // MTQ 4: RECRUITMENT & TEAMS
  {
    id: 'MTQ_4',
    type: 'scenario',
    topic: 'HR',
    scenario: `A manager needs to hire a new accountant. She wants someone who is already qualified. Once hired, the team enters a phase of conflict.`,
    questions: [
      {
        id: 'MTQ_4_a',
        type: 'dropdown',
        topic: 'HR',
        marks: 1,
        question: 'The document outlining the person\'s qualifications is the:',
        parts: [{ options: ['Job Description', 'Person Specification', 'Contract'], correctAnswer: 'Person Specification' }],
        explanation: 'Person Spec details the human requirements (skills/quals).'
      },
      {
        id: 'MTQ_4_b',
        type: 'dropdown',
        topic: 'HR',
        marks: 1,
        question: 'Which selection method is best to test actual accounting skills?',
        parts: [{ options: ['Interview', 'Work Proficiency Test', 'Reference Check'], correctAnswer: 'Work Proficiency Test' }],
        explanation: 'A test (e.g., spreadsheet task) proves ability better than talk.'
      },
      {
        id: 'MTQ_4_c',
        type: 'dropdown',
        topic: 'Teams',
        marks: 1,
        question: 'The team is arguing. According to Tuckman, this stage is:',
        parts: [{ options: ['Forming', 'Storming', 'Norming'], correctAnswer: 'Storming' }],
        explanation: 'Storming involves conflict and role negotiation.'
      },
      {
        id: 'MTQ_4_d',
        type: 'dropdown',
        topic: 'Teams',
        marks: 1,
        question: 'According to Belbin, the person who comes up with creative ideas is the:',
        parts: [{ options: ['Shaper', 'Plant', 'Monitor Evaluator'], correctAnswer: 'Plant' }],
        explanation: 'The Plant is the creative innovator in the team.'
      }
    ]
  },

  // MTQ 5: CONTROLS & FRAUD
  {
    id: 'MTQ_5',
    type: 'scenario',
    topic: 'Control',
    scenario: `Mr. Smith processes invoices, authorizes payments, and signs the cheques. He recently bought a luxury boat despite a low salary.`,
    questions: [
      {
        id: 'MTQ_5_a',
        type: 'dropdown',
        topic: 'Control',
        marks: 1,
        question: 'The main control weakness here is lack of:',
        parts: [{ options: ['Physical security', 'Segregation of duties', 'Authorisation'], correctAnswer: 'Segregation of duties' }],
        explanation: 'One person doing all steps allows fraud to go unchecked.'
      },
      {
        id: 'MTQ_5_b',
        type: 'dropdown',
        topic: 'Fraud',
        marks: 1,
        question: 'The luxury boat is a potential indicator of fraud known as a:',
        parts: [{ options: ['Lifestyle symptom', 'System failure', 'Accounting error'], correctAnswer: 'Lifestyle symptom' }],
        explanation: 'Living beyond apparent means is a classic red flag.'
      },
      {
        id: 'MTQ_5_c',
        type: 'dropdown',
        topic: 'Control',
        marks: 1,
        question: 'If Smith creates a fake supplier and pays himself, this is:',
        parts: [{ options: ['Teeming and lading', 'Payroll fraud', 'Supplier fraud'], correctAnswer: 'Supplier fraud' }],
        explanation: 'Creating dummy vendors to steal funds.'
      },
      {
        id: 'MTQ_5_d',
        type: 'dropdown',
        topic: 'Control',
        marks: 1,
        question: 'What control could prevent this?',
        parts: [{ options: ['Two signatures required on cheques', 'Faster computers', 'Open door policy'], correctAnswer: 'Two signatures required on cheques' }],
        explanation: 'Dual authorization makes it harder for one person to steal.'
      }
    ]
  },

  // MTQ 6: PERSONAL EFFECTIVENESS
  {
    id: 'MTQ_6',
    type: 'scenario',
    topic: 'Personal Effectiveness',
    scenario: `Sarah has too much work. She spends hours answering unimportant emails and misses the deadline for a vital report. She feels stressed.`,
    questions: [
      {
        id: 'MTQ_6_a',
        type: 'dropdown',
        topic: 'Time Mgmt',
        marks: 1,
        question: 'Answering unimportant emails is:',
        parts: [{ options: ['Urgent/Important', 'Urgent/Not Important', 'Not Urgent/Not Important'], correctAnswer: 'Urgent/Not Important' }],
        explanation: 'Emails often feel urgent (pinging) but add little long-term value.'
      },
      {
        id: 'MTQ_6_b',
        type: 'dropdown',
        topic: 'Time Mgmt',
        marks: 1,
        question: 'The vital report was:',
        parts: [{ options: ['Urgent/Important', 'Not Urgent/Not Important'], correctAnswer: 'Urgent/Important' }],
        explanation: 'Deadlines for key tasks are critical.'
      },
      {
        id: 'MTQ_6_c',
        type: 'dropdown',
        topic: 'Communication',
        marks: 1,
        question: 'Sarah should communicate her workload issues to her manager. This is:',
        parts: [{ options: ['Upward communication', 'Downward communication', 'Diagonal communication'], correctAnswer: 'Upward communication' }],
        explanation: 'Communicating from subordinate to superior is Upward.'
      },
      {
        id: 'MTQ_6_d',
        type: 'dropdown',
        topic: 'Development',
        marks: 1,
        question: 'To improve, Sarah creates a Personal Development Plan (PDP). This is part of:',
        parts: [{ options: ['Lifelong learning', 'Formal discipline', 'Recruitment'], correctAnswer: 'Lifelong learning' }],
        explanation: 'PDPs are tools for continuous professional development.'
      }
    ]
  }
];
