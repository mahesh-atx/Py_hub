import json
import re
import glob
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

def extract_inputs(expected_output):
    inputs = []
    lines = expected_output.split('\n')
    for line in lines:
        if any(keyword in line for keyword in ["Enter ", "How many", "Guess:", "Choice:", "Numbers:", "First:", "Second:"]):
            match = re.search(r'(:|\?|>)\s*(.*)', line)
            if match:
                val = match.group(2).strip()
                if val:
                    inputs.append(val)
    return inputs

files = glob.glob('public/practice-data/*/hidden-tests.json')
files.extend(glob.glob('public/practice-data/*/assignment-tests.json'))

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    modified = False
    for q in data.get('questions', []):
        for t in q.get('tests', []):
            expected = t.get('expected_output', '')
            extracted = extract_inputs(expected)
            extracted_str = '\n'.join(extracted)
            
            if "Choice:" in expected and not extracted:
                extracted_str = "4"
                
            current = t.get('input', '')
            if extracted_str and current == '':
                print(f"File: {f} | Q: {q['question_id']}")
                print(f"  Current input: {repr(current)}")
                print(f"  Extracted:     {repr(extracted_str)}")
                print(f"  Expected Out:  {repr(expected)}\n")
