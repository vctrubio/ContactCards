from django.shortcuts import render, HttpResponse
import os
import re

def generate_directory_tree(path):
    html = "<ul>"
    try:
        items = os.listdir(path)
        for item in items:
            if item.startswith('_'):
                continue
            item_path = os.path.join(path, item)
            if os.path.isdir(item_path):
                html += f"<li>{item}{generate_directory_tree(item_path)}</li>"
            else:
                html += f"<li>{item}</li>"
    except PermissionError:
        html += "<li>Permission Denied</li>"
    html += "</ul>"
    return html

def extract_urls(file_path):
    urls = []
    with open(file_path, 'r') as file:
        content = file.read()
        pattern = re.compile(r"path\('([^']*)'")
        matches = pattern.findall(content)
        urls.extend([f"<a href='{match}'>{match}</a>" for match in matches if match.strip() and 'blog' not in match])  # Create HTML links
    return urls

def index(request):
    base_path = '.'  # You can change this to any directory you want to start from
    urls_path = os.path.join(base_path, 'root/urls.py')
    
    html = """
    <html>
    <head>
        <style>
            .container {{
                display: flex;
                border: 1px solid green;
            }}
            .column {{
                flex: 50%;
                padding: 10px;
            }}
        </style>
    </head>
    <body>
        <h1>Hello Love</h1>
        <div class="container">
            <div class="column">
                <h2>Directory Tree:</h2>
                {directory_tree}
            </div>
            <div class="column">
                <h2>URLs:</h2>
                <ul>
                    {urls}
                </ul>
            </div>
        </div>
    </body>
    </html>
    """
    
    directory_tree = generate_directory_tree(base_path)
    urls = extract_urls(urls_path)
    urls_list = "".join(f"<li>{url}</li>" for url in urls)
    
    html = html.format(directory_tree=directory_tree, urls=urls_list)
    
    return HttpResponse(html)

def login_view(request):
    return render(request, 'base.html')