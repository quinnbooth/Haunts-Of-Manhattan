from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
import json
import re

current_id = 11
with open('./static/haunts.json', 'r', encoding='utf-8') as json_file:
    haunts_data = json.load(json_file)


# ROUTES

@app.route('/')
def welcome():
   return render_template('welcome.html')   

@app.route('/search/<prompt>')
def search(prompt):
   global haunts_data
   results = []
   for key in haunts_data.keys():
      haunt = haunts_data[key]
      p = prompt.lower()
      if p in haunt['title'].lower():
         # results.append((haunt['id'], haunt['title']))
         highlighted_title = re.sub(p, lambda match: f'<span class="highlighted">{match.group()}</span>', haunt['title'], flags=re.IGNORECASE)
         results.append((haunt['id'], highlighted_title))
      elif p in haunt['address'].lower():
         # results.append((haunt['id'], haunt['address']))
         highlighted_address = re.sub(p, lambda match: f'<span class="highlighted">{match.group()}</span>', haunt['address'], flags=re.IGNORECASE)
         results.append((haunt['id'], highlighted_address))
      else:
         count = 0
         for c in haunt['comments']:
            if p in c:
               # results.append((haunt['id'], "..." + haunt['comments'][count] + "..."))
               highlighted_comment = re.sub(p, lambda match: f'<span class="highlighted">{match.group()}</span>', haunt['comments'][count], flags=re.IGNORECASE)
               results.append((haunt['id'], highlighted_comment))
               break
            count += 1
   results.sort()
   return render_template('search.html', query=prompt, results_data=results)   

@app.route('/view/<id>')
def view(id):
   global haunts_data
   result = {}
   for key in haunts_data.keys():
      haunt = haunts_data[key]
      if haunt['id'] == int(id):
         result = haunt
   return render_template('view.html', result_data=result) 

@app.route('/add')
def add():
   return render_template('add.html')



# AJAX FUNCTIONS

@app.route('/get_suggestions', methods=['GET', 'POST'])
def get_suggestions():
   global haunts_data
   suggestions = request.get_json()
   results = []
   for key in haunts_data.keys():
      haunt = haunts_data[key]
      if haunt['id'] in suggestions:
         results.append(haunt)
   return jsonify(result=results)


if __name__ == '__main__':
   app.run(debug = True)




