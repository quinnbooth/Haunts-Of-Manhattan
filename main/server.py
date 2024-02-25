from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
import json

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
      if prompt.lower() in haunt['title'].lower():
         results.append((haunt['id'], haunt['title']))
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




