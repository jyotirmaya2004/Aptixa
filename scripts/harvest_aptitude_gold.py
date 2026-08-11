#!/usr/bin/env python3
import urllib.request
import json
import os
import sys
import re

ENDPOINTS = {
    'random': {
        'name': 'Random Aptitude',
        'url': 'https://aptitude-gold.vercel.app/Random',
        'category': 'quantitative'
    },
    'mixture': {
        'name': 'Mixture and Alligation',
        'url': 'https://aptitude-gold.vercel.app/MixtureAndAlligation',
        'category': 'quantitative'
    },
    'age': {
        'name': 'Problems on Ages',
        'url': 'https://aptitude-gold.vercel.app/Age',
        'category': 'quantitative'
    },
    'permutation': {
        'name': 'Permutation and Combination',
        'url': 'https://aptitude-gold.vercel.app/PermutationAndCombination',
        'category': 'quantitative'
    },
    'profit': {
        'name': 'Profit and Loss',
        'url': 'https://aptitude-gold.vercel.app/ProfitAndLoss',
        'category': 'quantitative'
    },
    'pipes': {
        'name': 'Pipes and Cisterns',
        'url': 'https://aptitude-gold.vercel.app/PipesAndCistern',
        'category': 'quantitative'
    },
    'speed': {
        'name': 'Speed Time Distance',
        'url': 'https://aptitude-gold.vercel.app/SpeedTimeDistance',
        'category': 'quantitative'
    },
    'calendar': {
        'name': 'Calendars',
        'url': 'https://aptitude-gold.vercel.app/Calendar',
        'category': 'logical'
    },
    'simple_interest': {
        'name': 'Simple Interest',
        'url': 'https://aptitude-gold.vercel.app/SimpleInterest',
        'category': 'quantitative'
    }
}

def clean_str(val):
    if not val:
        return ''
    return str(val).strip()

def match_correct_option(answer, options):
    ans_clean = clean_str(answer).lower()
    
    # 1. Direct match with option or option without prefix like 'A ' or 'A) '
    for idx, opt in enumerate(options):
        opt_clean = clean_str(opt).lower()
        opt_sub = re.sub(r'^[a-d][\.\)\s]+', '', opt_clean).strip()
        if ans_clean == opt_clean or ans_clean == opt_sub:
            return idx

    # 2. Check if answer starts with option letter 'A', 'B', 'C', 'D'
    if len(ans_clean) == 1 and ans_clean in 'abcd':
        return 'abcd'.index(ans_clean)
        
    for idx, opt in enumerate(options):
        opt_clean = clean_str(opt).lower()
        if ans_clean in opt_clean or opt_clean in ans_clean:
            return idx

    return 0

def fetch_topic_questions(topic_key, config, max_attempts=30):
    print(f"Fetching '{config['name']}' from {config['url']}...")
    seen_questions = set()
    questions = []

    for i in range(max_attempts):
        try:
            req = urllib.request.Request(
                config['url'],
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req, timeout=8) as resp:
                if resp.status == 200:
                    raw = resp.read().decode('utf-8')
                    d = json.loads(raw)
                    
                    q_text = clean_str(d.get('question'))
                    if not q_text or q_text in seen_questions:
                        continue
                    
                    seen_questions.add(q_text)
                    raw_opts = d.get('options', [])
                    if not isinstance(raw_opts, list):
                        raw_opts = [str(raw_opts)]
                    
                    # Clean options
                    opts = [clean_str(o) for o in raw_opts]
                    # Ensure 4 options
                    while len(opts) < 4:
                        opts.append(f"Option {len(opts)+1}")
                    opts = opts[:4]

                    raw_ans = clean_str(d.get('answer', ''))
                    correct_idx = match_correct_option(raw_ans, opts)
                    explanation = clean_str(d.get('explanation', ''))

                    question_item = {
                        "id": f"gold-{topic_key}-{len(questions)+1}",
                        "topic": config['name'],
                        "topicKey": topic_key,
                        "category": config['category'],
                        "question": q_text,
                        "options": opts,
                        "correctOption": correct_idx,
                        "answer": raw_ans,
                        "explanation": explanation,
                        "apiEndpoint": config['url']
                    }
                    questions.append(question_item)
        except Exception as e:
            print(f"  Attempt {i+1} failed: {e}")

    print(f"  --> Harvested {len(questions)} unique questions for '{config['name']}'.")
    return questions

def main():
    all_data = {}
    total_count = 0

    for key, config in ENDPOINTS.items():
        qs = fetch_topic_questions(key, config)
        all_data[key] = {
            "name": config['name'],
            "endpoint": config['url'],
            "category": config['category'],
            "count": len(qs),
            "questions": qs
        }
        total_count += len(qs)

    output_payload = {
        "metadata": {
            "source": "https://aptitude-gold.vercel.app/",
            "totalTopics": len(ENDPOINTS),
            "totalQuestions": total_count
        },
        "topics": all_data
    }

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    paths = [
        os.path.join(base_dir, "client", "src", "data", "externalAptitudeQuestions.json"),
        os.path.join(base_dir, "client", "public", "data", "externalAptitudeQuestions.json"),
        os.path.join(base_dir, "server", "data", "externalAptitudeQuestions.json")
    ]

    for p in paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            json.dump(output_payload, f, indent=2, ensure_ascii=False)
        print(f"Saved payload ({total_count} questions) to: {p}")

if __name__ == '__main__':
    main()
