import json
import pickle
from tkinter.constants import ROUND
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(bed, bath, acre_lot, state, house_size):
    try:
        loc_index = __data_columns.index(state.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = bed
    x[1] = bath
    x[2] = acre_lot
    x[3] = house_size

    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)

def get_location_names():
    print("Locations in get_location_names function:", __locations)  # Debug print
    return __locations

def load_saved_artifacts():
    print("Loading saved artifacts...start")

    global __locations, __data_columns
    global __model

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)["data_columns"]
        __locations = __data_columns[4:]  # check if this index is correct
        print("Loaded locations:", __locations)  # Debug print

    with open("./artifacts/USA_Real_state_lr_model_pickle", "rb") as f:
        __model = pickle.load(f)

    print("Loading saved artifacts...done")

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price(2, 3, 0, 'colorado', 700))
    print(get_estimated_price(2, 3, 0, 'colorado', 1200))
