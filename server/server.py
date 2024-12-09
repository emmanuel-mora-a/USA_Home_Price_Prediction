from flask import Flask, request, jsonify
import util

util.load_saved_artifacts()
app = Flask(__name__)


@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    # This adds an HTTP header to the response that allows cross-origin requests (CORS).
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    bed = float(request.form['bed'])
    bath = float(request.form['bath'])
    acre_lot = float(request.form['acre_lot'])
    state = request.form['state']
    house_size = float(request.form['house_size'])

    response = jsonify({'estimated_price' : util.get_estimated_price(bed, bath, acre_lot, state, house_size)})

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Homa Price Prediction")
    app.run()