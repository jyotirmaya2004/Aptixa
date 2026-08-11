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
  },

  // ── MORE TECHNICAL CORE ──
  {
    id: 'tech-007', category: 'technical', domain: 'OOPs', difficulty: 'Medium',
    question: 'What is the difference between Abstract Class and Interface?',
    summaryAnswer: 'Abstract class can have concrete + abstract methods; Interface (pre-Java 8) has only abstract method signatures.',
    fullAnswer: `* **Abstract Class**: Can have constructors, instance variables, concrete methods, and abstract methods. Supports single inheritance only.\n* **Interface**: Defines a contract of method signatures. A class can implement multiple interfaces (multiple inheritance of type). Java 8+ allows default and static methods in interfaces.\n* **When to use Abstract Class**: When classes share common state/behavior (e.g., Vehicle with fuel field).\n* **When to use Interface**: When unrelated classes need a common capability (e.g., Serializable, Comparable).`,
    keyKeywords: ['Abstract Class', 'Interface', 'Multiple Inheritance', 'Default Methods', 'Contract'],
    codeSnippet: `abstract class Vehicle {\n  int fuel;\n  abstract void start();\n  void stop() { System.out.println("Stopped"); }\n}\ninterface Electric {\n  void charge();\n}`
  },
  {
    id: 'tech-008', category: 'technical', domain: 'OOPs', difficulty: 'Easy',
    question: 'What is Constructor Overloading? Can a constructor call another constructor?',
    summaryAnswer: 'Constructor overloading means multiple constructors with different parameter lists. Yes, use this() for chaining.',
    fullAnswer: `* **Constructor Overloading**: Defining multiple constructors in the same class with different parameter signatures.\n* **Constructor Chaining**: One constructor can invoke another using this(args) — must be the first statement.\n* **Key Rule**: If no constructor is defined, the compiler provides a default no-arg constructor. If any constructor is defined, the default is NOT provided automatically.`,
    keyKeywords: ['Constructor Overloading', 'this()', 'Chaining', 'Default Constructor', 'Parameterized'],
    codeSnippet: `class Student {\n  String name; int age;\n  Student() { this("Unknown", 0); }\n  Student(String n, int a) { name = n; age = a; }\n}`
  },
  {
    id: 'tech-009', category: 'technical', domain: 'DBMS', difficulty: 'Medium',
    question: 'What are the different types of SQL Joins? Explain with examples.',
    summaryAnswer: 'INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF joins serve different row-matching needs.',
    fullAnswer: `* **INNER JOIN**: Returns only matching rows from both tables.\n* **LEFT JOIN**: All rows from left table + matched rows from right (NULLs for non-matches).\n* **RIGHT JOIN**: All rows from right table + matched rows from left.\n* **FULL OUTER JOIN**: All rows from both tables, NULLs where no match.\n* **CROSS JOIN**: Cartesian product of both tables (every row × every row).\n* **SELF JOIN**: A table joined with itself using aliases (e.g., finding employee-manager pairs).`,
    keyKeywords: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER', 'CROSS JOIN', 'SELF JOIN'],
    codeSnippet: `SELECT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id;`
  },
  {
    id: 'tech-010', category: 'technical', domain: 'DBMS', difficulty: 'Hard',
    question: 'What is Database Normalization? Explain 1NF, 2NF, and 3NF.',
    summaryAnswer: 'Normalization eliminates data redundancy by organizing tables into well-structured forms.',
    fullAnswer: `* **1NF**: Each column holds atomic (indivisible) values. No repeating groups or arrays.\n* **2NF**: Must be in 1NF + every non-key column is fully dependent on the entire primary key (no partial dependency).\n* **3NF**: Must be in 2NF + no transitive dependency (non-key column depending on another non-key column).\n* **BCNF**: Stricter version of 3NF — every determinant must be a candidate key.\n\n**Trade-off**: Over-normalization can hurt read performance due to excessive JOINs. Denormalization is sometimes used for analytics.`,
    keyKeywords: ['1NF Atomic Values', '2NF No Partial Dependency', '3NF No Transitive Dependency', 'BCNF', 'Denormalization']
  },
  {
    id: 'tech-011', category: 'technical', domain: 'Operating Systems', difficulty: 'Medium',
    question: 'What is the difference between Paging and Segmentation in Memory Management?',
    summaryAnswer: 'Paging divides memory into fixed-size frames; Segmentation uses variable-size logical units.',
    fullAnswer: `* **Paging**: Physical memory is divided into fixed-size blocks called frames. Logical memory divided into same-size pages. No external fragmentation but may have internal fragmentation.\n* **Segmentation**: Memory divided into variable-size segments based on logical divisions (code, stack, data). Can cause external fragmentation.\n* **Key Difference**: Paging is invisible to the programmer; Segmentation reflects the program's logical structure.\n* **Modern OS**: Most use segmentation with paging (segmented paging) for the best of both worlds.`,
    keyKeywords: ['Paging', 'Segmentation', 'Page Table', 'Internal Fragmentation', 'External Fragmentation']
  },
  {
    id: 'tech-012', category: 'technical', domain: 'Operating Systems', difficulty: 'Medium',
    question: 'Explain the difference between Mutex and Semaphore.',
    summaryAnswer: 'Mutex is a locking mechanism for single-thread ownership; Semaphore is a signaling mechanism for counting resources.',
    fullAnswer: `* **Mutex (Mutual Exclusion)**: Binary lock — only the thread that locked it can unlock it. Used to protect critical sections. Ownership-based.\n* **Semaphore**: Integer counter that allows N threads to access a resource pool. wait() decrements, signal() increments. No ownership concept.\n* **Binary Semaphore vs Mutex**: Binary semaphore can be signaled by any thread; Mutex can only be released by the owner thread.\n* **Use Case**: Mutex for exclusive resource access (printer); Semaphore for limited pool (database connection pool of size 10).`,
    keyKeywords: ['Mutex', 'Semaphore', 'Critical Section', 'Ownership', 'wait()/signal()']
  },
  {
    id: 'tech-013', category: 'technical', domain: 'Computer Networks', difficulty: 'Medium',
    question: 'What are the differences between TCP and UDP protocols?',
    summaryAnswer: 'TCP is connection-oriented and reliable; UDP is connectionless and faster but unreliable.',
    fullAnswer: `* **TCP**: Connection-oriented, reliable delivery with ACK, flow control, congestion control. Used for HTTP, FTP, Email. Higher overhead.\n* **UDP**: Connectionless, no delivery guarantee, no ordering, no flow control. Used for DNS, video streaming, gaming, VoIP. Lower latency.\n* **Key Difference**: TCP ensures every byte arrives in order; UDP prioritizes speed over reliability.\n* **Header Size**: TCP header = 20 bytes minimum; UDP header = 8 bytes.`,
    keyKeywords: ['TCP Connection-Oriented', 'UDP Connectionless', 'Reliable vs Fast', '3-Way Handshake', 'Streaming']
  },
  {
    id: 'tech-014', category: 'technical', domain: 'Computer Networks', difficulty: 'Easy',
    question: 'Explain the OSI Model and its 7 layers.',
    summaryAnswer: 'Physical → Data Link → Network → Transport → Session → Presentation → Application.',
    fullAnswer: `From bottom to top:\n1. **Physical**: Bits over wire/radio (Ethernet cables, Wi-Fi signals)\n2. **Data Link**: Frames, MAC addressing, error detection (Switches)\n3. **Network**: Packets, IP addressing, routing (Routers)\n4. **Transport**: Segments, TCP/UDP, port numbers, flow control\n5. **Session**: Session establishment, maintenance, teardown\n6. **Presentation**: Encryption, compression, data format translation (SSL/TLS)\n7. **Application**: HTTP, FTP, SMTP, DNS — user-facing protocols\n\n**Mnemonic**: "Please Do Not Throw Sausage Pizza Away"`,
    keyKeywords: ['7 Layers', 'Physical', 'Data Link', 'Network', 'Transport', 'Application', 'OSI vs TCP/IP']
  },
  {
    id: 'tech-015', category: 'technical', domain: 'DSA', difficulty: 'Medium',
    question: 'What is the difference between Stack and Queue? Give real-world examples.',
    summaryAnswer: 'Stack is LIFO (Last In First Out); Queue is FIFO (First In First Out).',
    fullAnswer: `* **Stack (LIFO)**: Last element pushed is first to be popped. Operations: push(), pop(), peek(). Example: Browser back button, undo/redo, function call stack.\n* **Queue (FIFO)**: First element enqueued is first to be dequeued. Operations: enqueue(), dequeue(), front(). Example: Printer queue, BFS traversal, ticket counter line.\n* **Variants**: Deque (double-ended), Priority Queue (min/max heap), Circular Queue.`,
    keyKeywords: ['LIFO', 'FIFO', 'Push/Pop', 'Enqueue/Dequeue', 'Priority Queue', 'BFS']
  },
  {
    id: 'tech-016', category: 'technical', domain: 'DSA', difficulty: 'Hard',
    question: 'Explain Time Complexity. What is Big O notation?',
    summaryAnswer: 'Big O describes the upper bound of an algorithm's growth rate as input size increases.',
    fullAnswer: `* **O(1)**: Constant — array index access, hash map lookup\n* **O(log N)**: Logarithmic — binary search\n* **O(N)**: Linear — single loop traversal\n* **O(N log N)**: Linearithmic — merge sort, quicksort average\n* **O(N²)**: Quadratic — nested loops, bubble sort\n* **O(2^N)**: Exponential — recursive subsets\n* **O(N!)**: Factorial — permutations\n\n**Key**: Big O measures worst-case scalability, not actual runtime. Always aim for the lowest possible complexity.`,
    keyKeywords: ['Big O', 'O(1)', 'O(N)', 'O(N log N)', 'O(N²)', 'Worst Case', 'Space Complexity']
  },
  {
    id: 'tech-017', category: 'technical', domain: 'DSA', difficulty: 'Medium',
    question: 'What is a Hash Map? How does it handle collisions?',
    summaryAnswer: 'A hash map stores key-value pairs using a hash function. Collisions handled via chaining or open addressing.',
    fullAnswer: `* **Hash Function**: Converts key into array index. Ideally distributes keys uniformly.\n* **Collision**: When two keys hash to the same index.\n* **Chaining**: Each bucket stores a linked list of entries. O(1) average, O(N) worst.\n* **Open Addressing**: On collision, probe for next empty slot (linear probing, quadratic probing, double hashing).\n* **Load Factor**: ratio of entries to buckets. When it exceeds threshold (e.g., 0.75), the map resizes (rehashing).`,
    keyKeywords: ['Hash Function', 'Collision', 'Chaining', 'Open Addressing', 'Load Factor', 'O(1) Average']
  },
  {
    id: 'tech-018', category: 'technical', domain: 'DSA', difficulty: 'Hard',
    question: 'Explain BFS and DFS traversals on a graph. When to use which?',
    summaryAnswer: 'BFS explores level by level using a queue; DFS explores depth-first using a stack/recursion.',
    fullAnswer: `* **BFS (Breadth-First Search)**: Uses Queue. Explores all neighbors at current depth before moving deeper. Finds shortest path in unweighted graphs. Space O(V).\n* **DFS (Depth-First Search)**: Uses Stack or recursion. Goes as deep as possible before backtracking. Better for cycle detection, topological sort, connected components.\n* **BFS Use Cases**: Shortest path, level-order traversal, social network connections.\n* **DFS Use Cases**: Maze solving, topological sorting, detecting cycles, strongly connected components.`,
    keyKeywords: ['BFS Queue', 'DFS Stack', 'Shortest Path', 'Topological Sort', 'Cycle Detection', 'O(V+E)']
  },
  {
    id: 'tech-019', category: 'technical', domain: 'OOPs', difficulty: 'Medium',
    question: 'What is the difference between Method Overloading and Method Overriding?',
    summaryAnswer: 'Overloading = same name, different parameters (compile-time); Overriding = same signature in subclass (runtime).',
    fullAnswer: `* **Overloading (Compile-time Polymorphism)**: Same method name with different parameter types/count in the SAME class. Resolved at compile time.\n* **Overriding (Runtime Polymorphism)**: Subclass provides its own implementation of a method already defined in the parent class. Same name AND signature. Resolved at runtime via vtable.\n* **Rules for Overriding**: Cannot reduce visibility, cannot throw broader checked exceptions, return type must be same or covariant.`,
    keyKeywords: ['Overloading', 'Overriding', 'Compile-time', 'Runtime', 'Polymorphism', '@Override']
  },
  {
    id: 'tech-020', category: 'technical', domain: 'DBMS', difficulty: 'Medium',
    question: 'What is an Index in a database? What are its types?',
    summaryAnswer: 'An index is a data structure that speeds up data retrieval at the cost of extra storage and slower writes.',
    fullAnswer: `* **Purpose**: Dramatically speeds up SELECT queries by creating a sorted lookup structure (like a book's index).\n* **Types**:\n  - **Primary Index**: On the primary key column, automatically created.\n  - **Clustered Index**: Physically sorts table rows. Only ONE per table.\n  - **Non-clustered Index**: Separate structure with pointers to rows. Multiple allowed.\n  - **Composite Index**: On multiple columns.\n  - **Unique Index**: Ensures no duplicate values.\n* **Trade-off**: Faster reads, slower INSERT/UPDATE/DELETE operations due to index maintenance.`,
    keyKeywords: ['Clustered Index', 'Non-clustered', 'B-Tree', 'Query Optimization', 'Composite Index']
  },

  // ── MORE HR & BEHAVIORAL ──
  {
    id: 'hr-005', category: 'hr_behavioral', domain: 'Leadership', difficulty: 'Medium',
    question: 'Tell me about a time you took initiative or led a project without being asked.',
    summaryAnswer: 'Use STAR method. Show proactive ownership and measurable impact.',
    fullAnswer: `**STAR Example**:\n* **Situation**: Our college's coding club had no structured curriculum for freshers.\n* **Task**: I wanted to help juniors build strong DSA foundations before placement season.\n* **Action**: I voluntarily designed a 6-week bootcamp covering arrays, trees, graphs, and DP. Created problem sets, hosted weekly contests on HackerRank, and mentored 40+ students.\n* **Result**: 85% of attendees cleared at least one company's online coding round. The club adopted my curriculum permanently.\n\n**Key**: Show you don't wait for instructions — you identify gaps and act.`,
    keyKeywords: ['Initiative', 'Ownership', 'Proactive', 'Measurable Impact', 'STAR Method']
  },
  {
    id: 'hr-006', category: 'hr_behavioral', domain: 'Teamwork', difficulty: 'Easy',
    question: 'How do you work in a team? What role do you usually take?',
    summaryAnswer: 'Describe your natural role (facilitator/executor/planner) with a concrete team project example.',
    fullAnswer: `**Framework**: Describe role → Give example → Show adaptability.\n\n* "I naturally gravitate toward being a **coordinator** — I enjoy breaking large tasks into subtasks, assigning ownership, and tracking progress. In our capstone project, I created a Notion board with sprint milestones, organized daily standups, and ensured we delivered 2 days early."\n\n* **Key Point**: Also mention adaptability: "But I can equally contribute as a hands-on coder when the team needs it. I've debugged critical production issues during hackathons under time pressure."`,
    keyKeywords: ['Team Role', 'Coordinator', 'Adaptability', 'Sprint Planning', 'Collaboration']
  },
  {
    id: 'hr-007', category: 'hr_behavioral', domain: 'Motivation', difficulty: 'Easy',
    question: 'Why do you want to work at our company?',
    summaryAnswer: 'Research the company. Align your skills and aspirations with their mission, tech stack, and growth opportunities.',
    fullAnswer: `**3-Part Formula**:\n1. **Company-specific praise**: "I admire [Company]'s work on [specific product/initiative]. Your recent [tech blog/product launch] showed innovative use of [technology]."\n2. **Skill alignment**: "My experience with [React/Java/ML] directly aligns with your [team/project], and I'm excited to contribute from day one."\n3. **Growth aspiration**: "I see this role as the perfect launchpad to deepen my expertise in [system design/cloud architecture] while contributing to real-world impact."\n\n**Avoid**: Generic answers like "It's a big company" or "Good salary."`,
    keyKeywords: ['Company Research', 'Skill Alignment', 'Growth Mindset', 'Specific Examples', 'Avoid Generic']
  },
  {
    id: 'hr-008', category: 'hr_behavioral', domain: 'Problem Solving', difficulty: 'Medium',
    question: 'Describe a time you failed at something. How did you handle it?',
    summaryAnswer: 'Own the failure honestly, explain what you learned, and show how you improved afterwards.',
    fullAnswer: `**STAR Example**:\n* **Situation**: During my 3rd semester, I submitted a DBMS project with a critical SQL injection vulnerability.\n* **Task**: The professor flagged it during review and I had to fix it within 24 hours.\n* **Action**: I researched parameterized queries, implemented prepared statements throughout the codebase, and added input validation. I also wrote a brief security audit document.\n* **Result**: Scored full marks on the resubmission. More importantly, I now make security a first-class concern in every project.\n\n**Key**: Never say "I've never failed." Show growth mindset and resilience.`,
    keyKeywords: ['Failure', 'Growth Mindset', 'Resilience', 'Learning from Mistakes', 'Honest Self-reflection']
  },
  {
    id: 'hr-009', category: 'hr_behavioral', domain: 'Pressure', difficulty: 'Medium',
    question: 'How do you handle pressure and tight deadlines?',
    summaryAnswer: 'Break tasks into smaller milestones, prioritize ruthlessly, communicate proactively, and stay calm.',
    fullAnswer: `**Response Framework**:\n1. **Prioritize**: "I use the Eisenhower Matrix — categorize tasks as urgent/important and tackle high-impact items first."\n2. **Break Down**: "I decompose large deliverables into 2-hour sprints with clear checkpoints."\n3. **Communicate**: "If a deadline is genuinely at risk, I proactively inform stakeholders with a revised timeline rather than delivering late silently."\n4. **Example**: "During our hackathon, we had 24 hours to build a full-stack app. I divided the work into frontend, backend, and deployment tracks, set 6-hour milestones, and we shipped with 2 hours to spare."`,
    keyKeywords: ['Prioritization', 'Eisenhower Matrix', 'Sprint Milestones', 'Proactive Communication', 'Stay Calm']
  },
  {
    id: 'hr-010', category: 'hr_behavioral', domain: 'Goals', difficulty: 'Easy',
    question: 'Where do you see yourself in 5 years?',
    summaryAnswer: 'Show ambition aligned with the company growth path. Mention skill development, not just titles.',
    fullAnswer: `**Good Answer Template**:\n"In 5 years, I see myself as a **senior engineer** with deep expertise in [system design/cloud/ML]. I want to:\n1. Master building production-grade distributed systems\n2. Mentor junior developers and contribute to engineering culture\n3. Potentially lead a small team or own a critical product module\n\nI specifically chose [Company] because your engineering growth ladder and mentorship programs align with this trajectory."\n\n**Avoid**: "I want to be a manager" (too title-focused) or "I want to start my own company" (suggests you'll leave).`,
    keyKeywords: ['Growth Path', 'Skill Mastery', 'Mentorship', 'Company Alignment', 'Realistic Ambition']
  },

  // ── MORE SYSTEM DESIGN ──
  {
    id: 'sys-003', category: 'system_design', domain: 'System Design', difficulty: 'Medium',
    question: 'What is a Load Balancer? What are common load balancing algorithms?',
    summaryAnswer: 'A load balancer distributes incoming traffic across multiple servers for high availability and performance.',
    fullAnswer: `* **Purpose**: Prevent single server overload, ensure fault tolerance, improve response times.\n* **Algorithms**:\n  - **Round Robin**: Requests distributed sequentially across servers.\n  - **Weighted Round Robin**: Servers with higher capacity get more requests.\n  - **Least Connections**: Routes to server with fewest active connections.\n  - **IP Hash**: Routes based on client IP (session stickiness).\n  - **Random**: Simple random selection.\n* **Examples**: Nginx, HAProxy, AWS ALB/NLB, Cloudflare.`,
    keyKeywords: ['Load Balancer', 'Round Robin', 'Least Connections', 'High Availability', 'Nginx', 'AWS ALB']
  },
  {
    id: 'sys-004', category: 'system_design', domain: 'System Design', difficulty: 'Hard',
    question: 'What is Caching? Explain cache eviction policies.',
    summaryAnswer: 'Caching stores frequently accessed data in fast storage to reduce latency and database load.',
    fullAnswer: `* **Cache Layers**: Browser cache → CDN → Application cache (Redis/Memcached) → Database query cache.\n* **Eviction Policies**:\n  - **LRU (Least Recently Used)**: Evicts the item not accessed for the longest time. Most common.\n  - **LFU (Least Frequently Used)**: Evicts the item with lowest access count.\n  - **FIFO**: Evicts the oldest entry first.\n  - **TTL (Time To Live)**: Entries expire after a set duration.\n* **Cache Invalidation Strategies**: Write-through, write-back, write-around.\n* **Cache Hit vs Miss**: High hit ratio (>95%) means effective caching.`,
    keyKeywords: ['Redis', 'LRU', 'LFU', 'TTL', 'Cache Invalidation', 'Write-through', 'CDN']
  },
  {
    id: 'sys-005', category: 'system_design', domain: 'System Design', difficulty: 'Medium',
    question: 'What is a REST API? What are RESTful design principles?',
    summaryAnswer: 'REST is an architectural style for web APIs using HTTP methods on resource URIs.',
    fullAnswer: `* **REST Principles**:\n  - **Stateless**: Each request contains all information needed; server doesn't store session state.\n  - **Resource-based**: URLs represent resources (e.g., /users/123).\n  - **HTTP Methods**: GET (read), POST (create), PUT (update), DELETE (remove), PATCH (partial update).\n  - **Uniform Interface**: Consistent URL patterns and response formats (JSON).\n* **Status Codes**: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error.\n* **Best Practices**: Use nouns not verbs in URLs, version your API (/v1/), implement pagination.`,
    keyKeywords: ['REST', 'Stateless', 'HTTP Methods', 'Resource URIs', 'Status Codes', 'JSON']
  }
];
