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


# AJAX FUNCTIONS




if __name__ == '__main__':
   app.run(debug = True)




