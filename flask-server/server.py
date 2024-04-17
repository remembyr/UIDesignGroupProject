from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

app = Flask(__name__)

user = {"completedProtein": False, "completedCarbs": False, "completedFat": False, "quizScore":0}

#User API Route
@app.route("/get_user", methods=['GET', 'POST'])
def get_user():
    return jsonify(user)

@app.route('/update_user', methods=['GET', 'POST'])
def update_user():
   global user
   checkpoint = request.get_json()
   updated_user = {
	    "completedProtein": checkpoint['completedProtein'],
    	"completedCarbs": checkpoint['completedCarbs'],
        "completedFat": checkpoint['completedFat'],
        "quizScore": checkpoint['quizScore'],
   }
   
   user = updated_user
   return jsonify(success=True, data=updated_user)

if __name__ == "__main__":
    app.run(debug=True)