from flask import request, jsonify, render_template, make_response, Flask
from face_classificators.face_classificator import age_and_gender_predictor
from json import loads
app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/')
def home_page():
    return render_template("index.html")

@app.route('/api-docs')
def docs_page():
    return render_template("docs.html")

# A route for age and gender prediction
@app.route('/api/', methods=["POST"])
def api_all():
    if request.method == 'POST':

        snap_data = request.data
        snap_data = loads(snap_data)
        try:
            age, gender = age_and_gender_predictor(snap_data['picture'])
            result = {
                "age": age,
                "gender": gender
            }
            print(f"age: {result['age']}, gender: {result['gender']}")
            return jsonify(result)
        except:
            print("coś poszlo nie tak")
            return jsonify("the face on parsed data wasn't to clear to detect")

    if request.method == 'GET':
        return jsonify("you need to provide us some data")

app.run()
