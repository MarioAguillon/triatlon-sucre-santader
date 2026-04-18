import os
import re

files = [
    'about/about.component.ts',
    'disciplines/disciplines.component.ts',
    'invitation/invitation.component.ts',
    'jerseys/jerseys.component.ts',
    'sponsors/sponsors.component.ts',
    'registration/registration.component.ts',
    'footer/footer.component.ts'
]

classes = [
    '.about-section {',
    '.disciplines-section {',
    '.invitation-section {',
    '.jerseys-section {',
    '.sponsors-section {',
    '.registration-section {',
    '.main-footer {'
]

for p in files:
    path = os.path.join(r'C:\Angular Davis\triatlon\frontend\src\app\components', p.replace('/', '\\'))
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        code = f.read()

    for c in classes:
        # Very specific regex to remove `background: foo;` on the line next to or under the class declaration
        c_regex = c.replace('.', '\\.').replace('{', '\\{')
        pattern = re.compile(rf'({c_regex}[^}}]*?)background:\s*[^;]*;', re.DOTALL)
        code = pattern.sub(r'\1', code)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(code)

print("Done removing backgrounds.")
