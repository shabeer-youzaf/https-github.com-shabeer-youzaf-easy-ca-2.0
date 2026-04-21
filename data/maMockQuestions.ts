
import type { MockQuestion } from '../types.ts';

/**
 * ACCA MA Mock Exam Question Bank
 * Derived from Kaplan Study Text and ACCA Mock Exam Formats
 * Pool of questions for dynamic generation
 */
export const maMockQuestions: MockQuestion[] = [
  {
    id: 'MA_A1',
    type: 'single',
    subjectId: 'MA',
    topic: 'Accounting for management',
    marks: 2,
    question: 'Comparing financial accounting with management accounting, which of the following is true?',
    options: [
      'Financial accounting is for internal users only',
      'Management accounting must follow strict legal formats',
      'Financial accounting is mainly a historical record',
      'Management accounting is produced for external stakeholders'
    ],
    correctAnswer: 'Financial accounting is mainly a historical record',
    explanation: 'Financial accounting primarily records past transactions for external users. Management accounting is forward-looking and intended for internal managers.',
    explanationMal: 'ഫിനാൻഷ്യൽ അക്കൗണ്ടിംഗ് പ്രധാനമായും过去的 (historical) ഇടപാടുകൾ രേഖപ്പെടുത്തുന്നതും പുറത്തുള്ളവർക്ക് (external users) വേണ്ടിയുള്ളതുമാണ്. എന്നാൽ മാനേജ്‌മെന്റ് അക്കൗണ്ടിംഗ് ഭാവിയിലേക്കുള്ള പ്ലാനിംഗിനും (forward-looking) സ്ഥാപനത്തിനുള്ളിലെ മാനേജർമാർക്കും വേണ്ടിയുള്ളതാണ്.'
  },
  {
    id: 'MA_A2',
    type: 'single',
    subjectId: 'MA',
    topic: 'Accounting for management',
    marks: 2,
    question: 'Information resulting from sorting and analysing data is known as:',
    options: ['Raw facts', 'Information', 'Knowledge', 'Wisdom'],
    correctAnswer: 'Information',
    explanation: 'Information is data that has been processed and made meaningful for decision-making.',
    explanationMal: 'ഡാറ്റയെ തരംതിരിക്കുകയും (sorting) വിശകലനം ചെയ്യുകയും (analysing) ചെയ്യുമ്പോൾ അത് വിവരങ്ങളായി (information) മാറുന്നു. ഇത് തീരുമാനങ്ങൾ എടുക്കാൻ സഹായിക്കുന്നു.'
  },
  {
    id: 'MA_A3',
    type: 'single',
    subjectId: 'MA',
    topic: 'Planning and Control',
    marks: 2,
    question: 'Establishing the overall long-term objectives of an organisation (5 years plus) is an example of:',
    options: ['Tactical planning', 'Operational planning', 'Strategic planning', 'Directing'],
    correctAnswer: 'Strategic planning',
    explanation: 'Strategic planning is long-term (usually 5+ years) and involves senior management setting the direction for the whole organisation.',
    explanationMal: 'ഒരു സ്ഥാപനത്തിന്റെ ദീർഘകാല ലക്ഷ്യങ്ങൾ (സാധാരണയായി 5 വർഷത്തിന് മുകളിൽ) നിശ്ചയിക്കുന്നതിനെ സ്ട്രാറ്റജിക് പ്ലാനിംഗ് (Strategic planning) എന്ന് വിളിക്കുന്നു. ഇത് പ്രധാനമായും ഉയർന്ന ഉദ്യോഗസ്ഥരാണ് (senior management) ചെയ്യുന്നത്.'
  },
  {
    id: 'MA_A4',
    type: 'single',
    subjectId: 'MA',
    topic: 'Planning and Control',
    marks: 2,
    question: 'A Management Accountant communicates a detailed budget to ensure cost savings in the next year. This is:',
    options: ['Strategic planning', 'Tactical planning', 'Operational planning', 'Goal congruence'],
    correctAnswer: 'Tactical planning',
    explanation: 'Tactical planning involves medium-term plans (usually 1 year) like budgets for specific areas of the business.',
    explanationMal: 'അടുത്ത വർഷത്തേക്കുള്ള ബജറ്റ് പോലുള്ള മീഡിയം ടേം പ്ലാനുകളെ ടാക്റ്റിക്കൽ പ്ലാനിംഗ് (Tactical planning) എന്ന് വിളിക്കുന്നു. സ്ട്രാറ്റജിക് പ്ലാനുകൾ നടപ്പിലാക്കാൻ ഇത് സഹായിക്കുന്നു.'
  },
  {
    id: 'MA_A5',
    type: 'single',
    subjectId: 'MA',
    topic: 'Cost Centres',
    marks: 2,
    question: 'A manager responsible for both costs incurred and revenues earned in a division is managing a:',
    options: ['Cost centre', 'Revenue centre', 'Profit centre', 'Investment centre'],
    correctAnswer: 'Profit centre',
    explanation: 'In a profit centre, the manager is accountable for both costs and revenues, and thus the net profit of that division.',
    explanationMal: 'ചെലവുകൾക്കും (costs) വരുമാനത്തിനും (revenues) ഒരുപോലെ ഉത്തരവാദിത്തമുള്ള വിഭാഗത്തെ പ്രോഫിറ്റ് സെന്റർ (Profit centre) എന്ന് വിളിക്കുന്നു. ലാഭം വർദ്ധിപ്പിക്കുക എന്നതാണ് ഇവിടുത്തെ ലക്ഷ്യം.'
  },
  {
    id: 'MA_A6',
    type: 'single',
    subjectId: 'MA',
    topic: 'Cost Classification',
    marks: 2,
    question: 'Costs which can be directly identified with a specific cost unit are called:',
    options: ['Indirect costs', 'Direct costs', 'Overheads', 'Fixed costs'],
    correctAnswer: 'Direct costs',
    explanation: 'Direct costs (like material or labour used for one specific unit) can be easily traced to that unit. Indirect costs cannot.',
    explanationMal: 'ഒരു നിർദ്ദിഷ്ട ഉൽപ്പന്നവുമായി (cost unit) നേരിട്ട് ബന്ധിപ്പിക്കാവുന്ന ചെലവുകളെ ഡയറക്ട് കോസ്റ്റ്സ് (Direct costs) എന്ന് വിളിക്കുന്നു. ഉദാഹരണത്തിന് ഒരു ഷർട്ട് നിർമ്മിക്കാൻ ഉപയോഗിച്ച തുണി.'
  },
  {
    id: 'MA_A7',
    type: 'single',
    subjectId: 'MA',
    topic: 'Cost Classification',
    marks: 2,
    question: 'Total direct costs are known as:',
    options: ['Production cost', 'Prime cost', 'Total cost', 'Marginal cost'],
    correctAnswer: 'Prime cost',
    explanation: 'Prime cost = Direct Materials + Direct Labour + Direct Expenses.',
    explanationMal: 'ഡയറക്ട് മെറ്റീരിയൽ, ഡയറക്ട് ലേബർ, ഡയറക്ട് എക്സ്പെൻസസ് എന്നിവയുടെ ആകെത്തുകയെ പ്രൈം കോസ്റ്റ് (Prime cost) എന്ന് വിളിക്കുന്നു.'
  },
  {
    id: 'MA_A8',
    type: 'single',
    subjectId: 'MA',
    topic: 'Cost Behaviour',
    marks: 2,
    question: 'A cost that remains constant in total regardless of output level is a:',
    options: ['Variable cost', 'Semi-variable cost', 'Fixed cost', 'Stepped fixed cost'],
    correctAnswer: 'Fixed cost',
    explanation: 'Fixed costs (like factory rent) do not change when production volume changes within a relevant range.',
    explanationMal: 'ഉല്പാദനം കൂടിയാലും കുറഞ്ഞാലും മാറാത്ത ആകെ ചെലവുകളെ ഫിക്സഡ് കോസ്റ്റ് (Fixed cost) എന്ന് വിളിക്കുന്നു. ഉദാഹരണത്തിന് ഫാക്ടറി വാടക.'
  },
  {
    id: 'MA_A9',
    type: 'single',
    subjectId: 'MA',
    topic: 'High-Low Method',
    marks: 2,
    question: 'At 1,000 units, total cost is $2,000. At 2,000 units, total cost is $3,500. Using High-Low method, what is Variable Cost per unit?',
    options: ['$1.50', '$2.00', '$1.75', '$1.25'],
    correctAnswer: '$1.50',
    explanation: 'VC per unit = (Change in Cost) / (Change in Activity) = (3,500 - 2,000) / (2,000 - 1,000) = 1,500 / 1,000 = $1.50.',
    explanationMal: 'വേരിയബിൾ കോസ്റ്റ് കാണാൻ മൊത്തം ചെലവിലെ മാറ്റത്തെ ഉല്പാദനത്തിലെ മാറ്റം കൊണ്ട് ഹരിക്കണം. (3,500 - 2,000) / (2,000 - 1,000) = 1,500 / 1,000 = $1.50.'
  },
  {
    id: 'MA_A10',
    type: 'single',
    subjectId: 'MA',
    topic: 'Inventory Management',
    marks: 2,
    question: 'The Economic Order Quantity (EOQ) is the quantity that minimizes the total of:',
    options: [
      'Holding costs and purchase costs',
      'Ordering costs and purchase costs',
      'Holding costs and ordering costs',
      'Stock-out costs and holding costs'
    ],
    correctAnswer: 'Holding costs and ordering costs',
    explanation: 'EOQ aims to balance holding costs and ordering costs to find the most cost-effective order size.',
    explanationMal: 'സാധനങ്ങൾ സൂക്ഷിക്കുന്നതിനുള്ള ചെലവും (Holding costs) ഓർഡർ ചെയ്യുന്നതിനുള്ള ചെലവും (Ordering costs) ഏറ്റവും കുറവാകുന്ന ഓർഡർ അളവിനെയാണ് EOQ എന്ന് വിളിക്കുന്നത്.'
  },
  {
    id: 'MA_A11',
    type: 'single',
    subjectId: 'MA',
    topic: 'Labour Accounting',
    marks: 2,
    question: 'What is "Idle Time"?',
    options: [
      'Time spent on training',
      'Time when workers are paid but not productive',
      'Time spent on repairs which is productive',
      'Overtime hours'
    ],
    correctAnswer: 'Time when workers are paid but not productive',
    explanation: 'Idle time occurs due to machine breakdowns, material shortages, etc., where workers are paid but cannot work.',
    explanationMal: 'മെഷീൻ കേടാകുന്നത് കൊണ്ടോ മെറ്റീരിയൽ ഇല്ലാത്തത് കൊണ്ടോ പണിക്കാർ ജോലി ചെയ്യാതിരിക്കുന്ന സമയത്തെ ഐഡിൽ ടൈം (Idle time) എന്ന് വിളിക്കുന്നു. ഈ സമയത്തും അവർക്ക് ശമ്പളം നൽകേണ്ടി വരും.'
  },
  {
    id: 'MA_A12',
    type: 'single',
    subjectId: 'MA',
    topic: 'Absorption Costing',
    marks: 2,
    question: 'Which of the following is a disadvantage of a "Blanket OAR"?',
    options: [
      'It is easy to calculate',
      'It is less accurate than cost centre rates',
      'It requires multiple calculations',
      'It ignores non-production overheads'
    ],
    correctAnswer: 'It is less accurate than cost centre rates',
    explanation: 'A blanket OAR uses one rate for the whole factory, ignoring differences between departments, making it less accurate.',
    explanationMal: 'ബ്ലാങ്കറ്റ് OAR എന്നത് മുഴുവൻ ഫാക്ടറിക്കും ഒരു റേറ്റ് മാത്രം ഉപയോഗിക്കുന്നതാണ്. ഇത് ഓരോ വിഭാഗത്തിന്റെയും (department) പ്രത്യേകതകൾ കണക്കിലെടുക്കാത്തതിനാൽ കൃത്യത കുറവായിരിക്കും.'
  },
  {
    id: 'MA_A13',
    type: 'single',
    subjectId: 'MA',
    topic: 'Budgeting',
    marks: 2,
    question: 'A budget prepared for a specific level of activity that does not change is a:',
    options: ['Flexible budget', 'Fixed budget', 'Incremental budget', 'Rolling budget'],
    correctAnswer: 'Fixed budget',
    explanation: 'A fixed budget is set for one specific activity level and does not auto-adjust.',
    explanationMal: 'ഒരു നിശ്ചിത ഉല്പാദന അളവിന് (activity level) മാത്രം തയ്യാറാക്കുന്ന ബജറ്റാണ് ഫിക്സഡ് ബജറ്റ് (Fixed budget). ഇത് ഉല്പാദനത്തിനനുസരിച്ച് മാറില്ല.'
  },
  {
    id: 'MA_A14',
    type: 'single',
    subjectId: 'MA',
    topic: 'Variance Analysis',
    marks: 2,
    question: 'If actual material cost is $5,000 and standard cost for actual output is $4,500, the variance is:',
    options: ['$500 Favourable', '$500 Adverse', '$5,000 Adverse', '$4,500 Favourable'],
    correctAnswer: '$500 Adverse',
    explanation: 'Actual cost > Standard cost = Adverse variance (loss).',
    explanationMal: 'ഫലത്തിലെ ചെലവ് (Actual cost) സ്റ്റാൻഡേർഡ് ചെലവിനേക്കാൾ കൂടുതൽ ആണെങ്കിൽ അത് അഡ്വേഴ്സ് വേരിയൻസ് (Adverse variance) ആണ്. ഇത് നഷ്ടത്തെ സൂചിപ്പിക്കുന്നു.'
  },
  {
    id: 'MA_A15',
    type: 'single',
    subjectId: 'MA',
    topic: 'Big Data',
    marks: 2,
    question: 'Which of the following is NOT one of the 5Vs of Big Data?',
    options: ['Volume', 'Velocity', 'Variety', 'Viability'],
    correctAnswer: 'Viability',
    explanation: 'The 5Vs are Volume, Velocity, Variety, Veracity, and Value.',
    explanationMal: 'ബിഗ് ഡാറ്റയുടെ 5Vs എന്നത് വോളിയം (Volume), വെലോസിറ്റി (Velocity), വെറൈറ്റി (Variety), വെരാസിറ്റി (Veracity), വാല്യൂ (Value) എന്നിവയാണ്. വയബിലിറ്റി (Viability) ഇതിൽ പെടുന്നില്ല.'
  },
  {
    id: 'MA_A16',
    type: 'single',
    subjectId: 'MA',
    topic: 'Interest Rates',
    marks: 2,
    question: 'If the nominal interest rate is 10% and inflation is 5%, what is the real interest rate roughly (Fisher equation)?',
    options: ['5%', '4.76%', '15%', '10.5%'],
    correctAnswer: '4.76%',
    explanation: '(1 + nominal) = (1 + real)(1 + inflation) => (1.10 / 1.05) - 1 = 0.0476 or 4.76%.',
    explanationMal: 'ഫിഷർ ഇക്വേഷൻ പ്രകാരം (1 + nominal) = (1 + real)(1 + inflation) ആണ്. അപ്പോൾ (1.10 / 1.05) - 1 = 0.0476. അതായത് 4.76%.'
  },
  {
    id: 'MA_A17',
    type: 'single',
    subjectId: 'MA',
    topic: 'Process Costing',
    marks: 2,
    question: 'Which of the following occurs when actual losses are less than expected losses?',
    options: ['Normal loss', 'Abnormal loss', 'Abnormal gain', 'Scrap value'],
    correctAnswer: 'Abnormal gain',
    explanation: 'If we lose fewer units than predicted, we have an abnormal gain.',
    explanationMal: 'പ്രതീക്ഷിച്ചതിനേക്കാൾ കുറവ് നഷ്ടം (loss) സംഭവിക്കുമ്പോൾ അതിനെ അബ്‌നോർമൽ ഗെയിൻ (Abnormal gain) എന്ന് വിളിക്കുന്നു.'
  },
  {
    id: 'MA_A18',
    type: 'single',
    subjectId: 'MA',
    topic: 'Standard Costing',
    marks: 2,
    question: 'Which variance measures the difference between actual price and standard price of materials?',
    options: ['Usage variance', 'Price variance', 'Efficiency variance', 'Rate variance'],
    correctAnswer: 'Price variance',
    explanation: 'Material Price Variance = (Std Price - Actual Price) x Actual Quantity.',
    explanationMal: 'യഥാർത്ഥ വിലയും (actual price) നിശ്ചയിച്ച വിലയും (standard price) തമ്മിലുള്ള വ്യത്യാസത്തെ പ്രൈസ് വേരിയൻസ് (Price variance) എന്ന് വിളിക്കുന്നു.'
  },
  {
    id: 'MA_A19',
    type: 'single',
    subjectId: 'MA',
    topic: 'Cost Classification',
    marks: 2,
    question: 'Rent of a factory is typically classified as:',
    options: ['Direct cost', 'Variable cost', 'Period cost', 'Direct expense'],
    correctAnswer: 'Period cost',
    explanation: 'Fixed overheads like rent are often charged to the period rather than a specific unit in marginal costing.',
    explanationMal: 'ഫാക്ടറി വാടക ഒരു നിശ്ചിത കാലയളവിലേക്കുള്ള ചെലവായതുകൊണ്ട് അതിനെ പിരീഡ് കോസ്റ്റ് (Period cost) എന്ന് വിളിക്കുന്നു.'
  },
  {
    id: 'MA_A20',
    type: 'single',
    subjectId: 'MA',
    topic: 'Working Capital',
    marks: 2,
    question: 'Calculating the Current Ratio involves dividing Current Assets by:',
    options: ['Total Assets', 'Current Liabilities', 'Long-term debt', 'Equity'],
    correctAnswer: 'Current Liabilities',
    explanation: 'Current Ratio = Current Assets / Current Liabilities.',
    explanationMal: 'കറന്റ് റേഷ്യോ (Current Ratio) കാണാൻ കറന്റ് അസറ്റ്സിനെ കറന്റ് ലയബിലിറ്റീസ് കൊണ്ട് ഹരിക്കണം.'
  }
];
