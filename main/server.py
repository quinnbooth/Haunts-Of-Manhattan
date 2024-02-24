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
   results = []
   for key in haunts_data.keys():
      haunt = haunts_data[key]
      if prompt.lower() in haunt['title'].lower():
         results.append(haunt['title'])
   results.sort()
   return render_template('search.html', query=prompt, results_data=results)   


# AJAX FUNCTIONS




if __name__ == '__main__':
   app.run(debug = True)




