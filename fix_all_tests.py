import json
import re
import glob

def extract_inputs(expected_output):
    inputs = []
    lines = expected_output.split('\n')
    for line in lines:
        if any(keyword in line for keyword in ["Enter", "How many", "Guess:", "Choice:", "Numbers:", "First:", "Second:", "Word:", "Sentence:", "Target:", "Item:", "Quantity:", "Search:", "Replace:"]):
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
            # Fix if current is empty or differs significantly in number of lines (e.g. they only provided 1 line when 3 were needed)
            if extracted_str and (current == '' or len(current.split('\n')) < len(extracted_str.split('\n'))):
                # Don't blindly overwrite if we just extracted something different by mistake, but if it's longer it's probably missing lines
                if current == '' or current in extracted_str:
                    t['input'] = extracted_str
                    modified = True
                    print(f"Fixed {f} Q{q.get('question_id')}: set input to {repr(extracted_str)}")
                
    if modified:
        with open(f, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
            file.write("\n")
