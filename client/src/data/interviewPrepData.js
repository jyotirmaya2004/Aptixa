export const INTERVIEW_DOMAINS = [
  { id: 'all', label: 'All Topics', icon: 'Sparkles' },
  { id: 'technical', label: 'Technical Core', icon: 'Code2' },
  { id: 'hr_behavioral', label: 'HR & Behavioral', icon: 'UserCheck' },
  { id: 'company_patterns', label: 'Company Guides', icon: 'Building2' },
  { id: 'system_design', label: 'System Design Basics', icon: 'Briefcase' }
];

export const COMPANY_PROFILES = [
  {
    name: 'TCS (NQT / Digital / Prime)',
    rounds: ['Online Test (Aptitude + Coding)', 'Technical Interview', 'Managerial & HR Round'],
    focusTopics: ['C/C++ Basics', 'OOPs Concepts', 'DBMS SQL Queries', 'Data Structures (Arrays, Trees)', 'Project Deep Dive'],
    tip: 'TCS focuses heavily on your final year project, basic C/C++ pointers, SQL joins, and your willingness to relocate.'
  },
  {
    name: 'Infosys (SE / DSE / SP)',
    rounds: ['Online Aptitude & Coding Test', 'Technical + HR Combined Interview'],
    focusTopics: ['Python / Java Fundamentals', 'DSA (Pointers, Recursion, Dynamic Programming)', 'DBMS Normalization', 'Logical Reasoning'],
    tip: 'For DSE/SP roles, demonstrate strong problem solving, optimal time complexity, and clean code formatting during live coding.'
  },
  {
    name: 'Accenture',
    rounds: ['Cognitive & Technical Assessment', 'Coding Assessment', 'Communication Test', 'HR Interview'],
    focusTopics: ['Pseudo-code Tracing', 'Agile Methodologies', 'Cloud Basics', 'Behavioral STAR Scenarios', 'Team Management'],
    tip: 'Accenture places high value on communication fluency, pseudo-code accuracy, and situational adaptability.'
  },
  {
    name: 'Wipro (NLTH / Turbo)',
    rounds: ['Online Test (Aptitude, Verbal, Coding)', 'Technical Interview', 'HR Interview'],
    focusTopics: ['Strings & Array Manipulation', 'Operating System Basics', 'Computer Networks (OSI Model)', 'C++ Memory Management'],
    tip: 'Be ready to write pseudo-code on a shared whiteboard or notepad and explain time complexity step-by-step.'
  },
  {
    name: 'Amazon',
    rounds: ['Online Assessment (OA1 + OA2)', 'Technical Round 1 (DSA)', 'Technical Round 2 (DSA + System Design)', 'Bar Raiser Round'],
    focusTopics: ['Trees & Graphs (BFS/DFS)', '16 Leadership Principles', 'Low Level System Design', 'Space/Time Optimization'],
    tip: 'Every answer in Amazon HR/Bar Raiser rounds MUST follow the STAR method aligned with Leadership Principles like Customer Obsession and Ownership.'
  }
];

export const INTERVIEW_QUESTIONS = [
  // Technical Core - OOPs, DBMS, OS, CN, DSA
  {
    id: 'tech-001',
    category: 'technical',
    domain: 'OOPs',
    difficulty: 'Medium',
    question: 'What are the 4 Pillars of Object-Oriented Programming (OOPs)? Explain with real-world examples.',
    summaryAnswer: 'The 4 pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism.',
    fullAnswer: `1. **Encapsulation**: Wrapping data (variables) and code (methods) together as a single unit (class) while restricting direct access using private access modifiers (e.g. Bank Account balance accessed via getter/setter).
2. **Abstraction**: Hiding background complexity and showing only essential features to the user (e.g. Car accelerator pedal — you press it to accelerate without needing to know engine combustion details).
3. **Inheritance**: Mechanism where one class acquires properties and behaviors of a parent class to promote code reusability (e.g. ElectricCar extending Car).
4. **Polymorphism**: Ability of a method or object to take on multiple forms via Method Overloading (Compile-time) or Method Overriding (Runtime).`,
    keyKeywords: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism', 'Method Overriding', 'Reusability'],
    codeSnippet: `// Polymorphism Example in Java
class Animal {
    void makeSound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Bark"); }
}`
  },
  {
    id: 'tech-002',
    category: 'technical',
    domain: 'DBMS',
    difficulty: 'Hard',
    question: 'What is the difference between WHERE and HAVING clauses in SQL?',
    summaryAnswer: 'WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY.',
    fullAnswer: `* **WHERE Clause**: Used to filter rows before any grouping occurs. Cannot contain aggregate functions like SUM(), COUNT(), AVG().
* **HAVING Clause**: Used to filter groups after the GROUP BY clause has aggregated rows. Works directly with aggregate function results.

**Execution Order**: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.`,
    keyKeywords: ['WHERE (Pre-grouping)', 'HAVING (Post-grouping)', 'GROUP BY', 'Aggregate Functions', 'Execution Order'],
    codeSnippet: `SELECT department_id, COUNT(*) 
FROM employees 
WHERE salary > 50000          -- Filters individual rows first
GROUP BY department_id 
HAVING COUNT(*) > 5;          -- Filters aggregated department groups`
  },
  {
    id: 'tech-003',
    category: 'technical',
    domain: 'DBMS',
    difficulty: 'Medium',
    question: 'What are ACID properties in Database Management Systems?',
    summaryAnswer: 'Atomicity, Consistency, Isolation, and Durability ensure reliable transaction processing.',
    fullAnswer: `* **Atomicity**: "All or Nothing". Either all operations in a transaction execute successfully, or the database rolls back to its original state.
* **Consistency**: Ensures the database transitions from one valid state to another, maintaining all schema constraints and integrity rules.
* **Isolation**: Concurrent transactions execute independently without interfering with each other (preventing Dirty Reads & Phantom Reads).
* **Durability**: Once a transaction is committed, changes persist permanently in storage even in the event of system failures or power loss.`,
    keyKeywords: ['Atomicity (All-or-Nothing)', 'Consistency', 'Isolation', 'Durability', 'Transaction Commit/Rollback']
  },
  {
    id: 'tech-004',
    category: 'technical',
    domain: 'Operating Systems',
    difficulty: 'Hard',
    question: 'What is a Deadlock? What are the 4 Necessary Conditions for a Deadlock to occur?',
    summaryAnswer: 'A deadlock is a situation where two or more processes are blocked forever, waiting for resources held by each other.',
    fullAnswer: `Four Coffman conditions must hold simultaneously for a deadlock to occur:
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode (only one process can use it at a time).
2. **Hold and Wait**: A process is holding at least one resource and waiting to acquire additional resources held by other processes.
3. **No Preemption**: Resources cannot be forcibly taken away from a process; they can only be released voluntarily.
4. **Circular Wait**: A closed chain of processes exists, where each process holds resources needed by the next process in the chain.`,
    keyKeywords: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Circular Wait', 'Banker’s Algorithm']
  },
  {
    id: 'tech-005',
    category: 'technical',
    domain: 'Computer Networks',
    difficulty: 'Medium',
    question: 'What happens under the hood when you type a URL like https://www.google.com in a web browser?',
    summaryAnswer: 'DNS resolution → TCP 3-Way Handshake → TLS/SSL Security → HTTP GET request → Server Response → Browser Rendering.',
    fullAnswer: `1. **DNS Lookup**: The browser checks Local Cache, OS Hosts file, and queries Recursive DNS Servers to resolve \`www.google.com\` into an IP Address (e.g. 142.250.190.46).
2. **TCP 3-Way Handshake**: Client sends SYN packet, Server replies with SYN-ACK, Client sends ACK to establish a reliable TCP socket connection.
3. **TLS/SSL Handshake**: For HTTPS, cryptographic keys are negotiated for encrypted end-to-end communication.
4. **HTTP Request & Response**: Browser sends an \`HTTP GET /\` request header. Server processes it and responds with HTTP 200 OK + HTML payload.
5. **DOM & CSSOM Rendering**: Browser parses HTML to construct DOM tree, parses CSS to construct CSSOM, builds Render Tree, calculates Layout, and paints pixels on screen.`,
    keyKeywords: ['DNS Resolution', 'TCP Handshake (SYN/ACK)', 'TLS Encrypted Tunnel', 'HTTP GET', 'DOM Rendering']
  },
  {
    id: 'tech-006',
    category: 'technical',
    domain: 'DSA',
    difficulty: 'Medium',
    question: 'What is the difference between Process and Thread? When should you use Multi-threading over Multi-processing?',
    summaryAnswer: 'Processes have independent memory spaces, while Threads share memory within the same process.',
    fullAnswer: `* **Process**: An executing program with its own isolated address space, stack, heap, and file descriptors. Inter-Process Communication (IPC) is heavier.
* **Thread**: Lightweight unit of execution within a process that shares code, data, and heap memory with peer threads. Context switching is much faster.
* **When to use Multi-threading**: I/O-bound tasks (web scraping, database queries, responsive UIs) where sharing memory state is required.
* **When to use Multi-processing**: CPU-bound computation tasks (image rendering, matrix multiplication) to bypass Global Interpreter Locks (GIL) and utilize multiple CPU cores effectively.`,
    keyKeywords: ['Isolated Address Space', 'Shared Memory', 'Context Switching Overhead', 'I/O Bound vs CPU Bound']
  },

  // HR & Behavioral - STAR Method
  {
    id: 'hr-001',
    category: 'hr_behavioral',
    domain: 'Introduction',
    difficulty: 'Easy',
    question: 'How do you structure "Tell Me About Yourself" for a Technical Interview?',
    summaryAnswer: 'Follow the Present-Past-Future framework in 90 seconds.',
    fullAnswer: `Use the **Present-Past-Future (PPF) Framework** (1.5 to 2 minutes max):

1. **Present (30s)**: "Hi, I’m [Name], currently pursuing my B.Tech in [Branch] at [College]. My core specialization is Full-Stack Web Development and Data Structures."
2. **Past (40s)**: "Over the past 2 years, I’ve built full-stack applications using React, Node.js, and SQL. I also solved 300+ LeetCode problems and completed an internship at [Company/Project] where I optimized database query response times by 35%."
3. **Future (20s)**: "I’m passionate about building scalable, high-impact systems, which is why I’m excited about the Software Engineer role at [Target Company]."`,
    keyKeywords: ['Present-Past-Future Framework', 'Concise 90s Pitch', 'Highlight Metrics', 'Align with Job Description']
  },
  {
    id: 'hr-002',
    category: 'hr_behavioral',
    domain: 'Behavioral STAR',
    difficulty: 'Medium',
    question: 'Describe a situation where you faced a tough bug or technical obstacle. How did you resolve it?',
    summaryAnswer: 'Use the STAR Method: Situation, Task, Action, Result.',
    fullAnswer: `**STAR Framework Example**:
* **Situation**: During our final year capstone project, our web app crashed under simultaneous 50+ WebSocket user connections.
* **Task**: I needed to identify the memory leak and restore application throughput within 48 hours before project presentation.
* **Action**: I used Node.js memory profilers and Chrome DevTools to trace memory usage. I discovered we weren’t clearing event listeners on client disconnects. I refactored the event emitter architecture and added connection pooling.
* **Result**: Memory consumption dropped by 65%, latency decreased from 1.2s to 120ms, and the project scored an A+ grade.`,
    keyKeywords: ['STAR Method', 'Situation', 'Task', 'Action', 'Quantifiable Result']
  },
  {
    id: 'hr-003',
    category: 'hr_behavioral',
    domain: 'Conflict Resolution',
    difficulty: 'Medium',
    question: 'How do you handle disagreement with a teammate regarding technical architecture or code reviews?',
    summaryAnswer: 'Focus on objective metrics, benchmark data, and consensus rather than personal opinion.',
    fullAnswer: `1. **Listen Actively**: First understand their perspective and underlying concerns (e.g. maintainability vs speed).
2. **Focus on Data & Metrics**: Compare alternatives objectively using benchmarks, complexity analysis, or prototyping rather than personal opinions.
3. **Seek Common Ground**: Align decisions with the overarching project goals (e.g. deadline vs scalability).
4. **Agree and Commit**: Once the team reaches a decision or lead gives direction, fully commit to execution without friction.`,
    keyKeywords: ['Active Listening', 'Data-Driven Decision', 'Benchmark Proofs', 'Disagree and Commit']
  },
  {
    id: 'hr-004',
    category: 'hr_behavioral',
    domain: 'Weakness & Strength',
    difficulty: 'Easy',
    question: 'What is your biggest weakness and how are you working to overcome it?',
    summaryAnswer: 'State a genuine professional growth area along with active steps you are taking to improve.',
    fullAnswer: `**Good Approach**: Select a non-fatal professional skill and pair it with tangible improvement steps.

* **Example Answer**: "Earlier, I used to jump straight into coding solutions before detailing system architecture on paper, which sometimes caused refactoring delays. Now, I explicitly spend the first 20% of my time designing class diagrams, documenting edge cases, and discussing technical specs before writing code."

**Avoid**: Fake weaknesses like "I work too hard" or "I am a perfectionist".`,
    keyKeywords: ['Self-awareness', 'Actionable Steps', 'Continuous Growth', 'Avoid Clichés']
  },

  // System Design & Architecture Basics
  {
    id: 'sys-001',
    category: 'system_design',
    domain: 'System Design',
    difficulty: 'Hard',
    question: 'What is the difference between Horizontal Scaling and Vertical Scaling?',
    summaryAnswer: 'Vertical scaling upgrades single machine hardware (RAM/CPU); Horizontal scaling adds more server instances behind a load balancer.',
    fullAnswer: `* **Vertical Scaling (Scaling Up)**: Increasing the CPU, RAM, or SSD storage capacity of a single existing server.
  * *Pros*: Simple, no architectural changes required.
  * *Cons*: Hardware limits, single point of failure (SPOF), downtime during hardware upgrade.
* **Horizontal Scaling (Scaling Out)**: Adding more machine instances to the pool and routing traffic via a Load Balancer (e.g. Nginx, AWS ALB).
  * *Pros*: Infinite scalability, high availability, fault tolerance.
  * *Cons*: Complex distributed state, data synchronization, stateless server requirements.`,
    keyKeywords: ['Scale Up vs Scale Out', 'Load Balancer', 'Single Point of Failure (SPOF)', 'Stateless Services']
  },
  {
    id: 'sys-002',
    category: 'system_design',
    domain: 'System Design',
    difficulty: 'Hard',
    question: 'What is the CAP Theorem in Distributed Systems?',
    summaryAnswer: 'In a distributed data store, you can only guarantee 2 out of 3 properties: Consistency, Availability, Partition Tolerance.',
    fullAnswer: `In a network partition scenario (communication failure between nodes):
* **Consistency (C)**: Every read receives the most recent write or an error.
* **Availability (A)**: Every non-failing node returns a non-error response (without guaranteeing latest write).
* **Partition Tolerance (P)**: System continues operating despite network message drops or delays.

Because network partitions (P) are inevitable in real-world distributed networks, systems must choose between **CP** (e.g., MongoDB, HBase) or **AP** (e.g., Cassandra, DynamoDB).`,
    keyKeywords: ['Consistency (C)', 'Availability (A)', 'Partition Tolerance (P)', 'CP vs AP Tradeoff']
  }
];
