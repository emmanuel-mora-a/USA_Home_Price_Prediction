# Real Estate Price Prediction in the USA









# 1 - Home Price LM model

## Data source

[USA Real Estate Dataset | Kaggle](https://www.kaggle.com/datasets/ahmedshahriarsakib/usa-real-estate-dataset)

## About Dataset

## Context

This dataset contains Real Estate listings in the US broken by State and zip code.

## Download

kaggle API Command

```
!kaggle datasets download -d ahmedshahriarsakib/usa-real-estate-dataset
```

### Content

The dataset has 1 CSV file with 10 columns -

1. realtor-data.csv (2,226,382 entries)
   - brokered by (categorically encoded agency/broker)
   - status (Housing status - a. ready for sale or b. ready to build)
   - price (Housing price, it is either the current listing price or recently sold price if the house is sold recently)
   - bed (# of beds)
   - bath (# of bathrooms)
   - acre_lot (Property / Land size in acres)
   - street (categorically encoded street address)
   - city (city name)
   - state (state name)
   - zip_code (postal code of the area)
   - house_size (house area/size/living space in square feet)
   - prev_sold_date (Previously sold date)

NB:

1. `brokered by` and `street` addresses were categorically encoded due to data privacy policy
2. `acre_lot` means the total land area, and `house_size` denotes the living space/building area

## Acknowledgements

Data was collected from -

- [https://www.realtor.com/](https://www.realtor.com/) - A real estate listing website operated by the News Corp subsidiary Move, Inc. and based in Santa Clara, California. It is the second most visited real estate listing website in the United States as of 2024, with over 100 million monthly active users.

**The dataset is stored in a CSV file (`realtor-data.zip.csv`).**

## Overview

This project aims to analyze and predict real estate prices in the USA using a large dataset of property listings. The main objective is to identify factors that influence property prices and build predictive models to forecast future prices. The project involves data cleaning, exploratory data analysis (EDA), feature engineering, and model building.

## Table of Contents

1. Installation

2. Usage

3. Exploratory Data Analysis (EDA)

4. Feature Engineering

5. Model Building

6. Results

7. Contributing

8. License

## Installation

To get started with this project, clone the repository and install the required dependencies. You will need Python 3.x and the following libraries:

- pandas

- numpy

- matplotlib

- seaborn

- sklearn

- statsmodels

## Usage

To run the analysis and generate results, follow these steps:

### Data Loading and Setup

Load the dataset and set up the environment for analysis.

### Exploratory Data Analysis (EDA)

Analyze the dataset to understand its structure and content, including dimensions, descriptive statistics, data types, and the presence of missing values and duplicates.

### Data Cleaning

Handle missing values by dropping rows with NaN values and remove unnecessary columns that do not contribute to the predictive model. This step ensures the dataset is clean and ready for analysis.

### Feature Engineering

Create new features such as `price_per_sqft` to enhance the dataset. This step also includes reducing the dimension of categorical variables and handling categorical data.

### Model Building

Build and evaluate various models for price prediction. This involves splitting the data into training and testing sets, applying One-Hot Encoding (OHE) to categorical variables, and fitting different regression models.

### Model Evaluation

Evaluate model performance using metrics and GridSearchCV to find the best model and hyperparameters.

## Results

The key findings of the analysis are summarized in the results section. This includes:

- Factors that significantly influence property prices

- Model performance metrics

- Visualizations of data distributions and model predictions

## Saving my model a pickle file


This block of code is saving your trained LinearRegression model (`lr_clf`) to a file using the `pickle` module. This allows you to save the state of the model and reload it later without needing to retrain it. It's useful for saving models that take a long time to train or when you want to deploy the model in production

I also saved it for later use in the flask app





## Exporting the columns in Json

This block of code creates a JSON file named `columns.json` that contains the column names of the DataFrame `X`, converted to lowercase. This is useful for saving the structure or metadata of your DataFrame, which can be easily loaded and used late in the flask app



# 2 - Home Price Prediction Flask App

This repository contains a Flask web application that predicts home prices based on several features such as the number of bedrooms, bathrooms, lot size, state, and house size. The app uses a pre-trained linear regression model to make predictions.

## Table of Contents

- Installation

- Usage

- API Endpoints

- File Descriptions

- UI Components

- Contributing

- License

## Installation

1. **Clone the repository**:
   
   bash
   
   ```
   git clone https://github.com/yourusername/home-price-prediction.git
   cd home-price-prediction
   ```

2. **Create a virtual environment**:
   
   bash
   
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install the required packages**:
   
   bash
   
   ```
   pip install -r requirements.txt
   ```

4. **Set up artifacts**:
   
   - Ensure the pre-trained model (`USA_Real_state_lr_model_pickle`) and `columns.json` are placed in the `./artifacts` directory.

## Usage

1. **Start the Flask server**:
   
   bash
   
   ```
   python server.py
   ```

2. **Access the API endpoints**:
   
   - Open your browser and navigate to `http://127.0.0.1:5000/get_location_names` to get the list of location names.
   
   - Use a tool like Postman to test the `/predict_home_price` endpoint with a POST request.

## API Endpoints

### GET `/get_location_names`

- **Description**: Returns a list of location names.

- **Response**:
  
  json
  
  ```
  {
      "locations": ["state1", "state2", "state3", ...]
  }
  ```

### POST `/predict_home_price`

- **Description**: Predicts the home price based on the provided features.

- **Request**:
  
  - `bed`: Number of bedrooms (float)
  
  - `bath`: Number of bathrooms (float)
  
  - `acre_lot`: Lot size in acres (float)
  
  - `state`: State name (string)
  
  - `house_size`: Size of the house in square feet (float)

- **Response**:
  
  json
  
  ```
  {
      "estimated_price": 123456.78
  }
  ```

## File Descriptions

### `server.py`

- The main Flask application file that defines the API endpoints.

- Loads the saved artifacts (model and column names) from disk.

- Handles incoming requests and uses the utility functions to get predictions.

### `util.py`

- Contains utility functions for loading saved artifacts, predicting home prices, and retrieving location names.

- Defines functions to deserialize the model and columns data.

- Provides helper functions for making predictions using the loaded model.

### `columns.json`

- A JSON file containing the column names of the dataset used for training the model.

### `USA_Real_state_lr_model_pickle`

- A pickle file containing the serialized pre-trained linear regression model.

### `app.css`

- Contains the CSS styles for the web interface, including general styles and form styling.

### `app.html`

- The HTML file defining the structure and layout of the web interface, including the form for user inputs.

### `app.js`

- Contains the JavaScript code to handle form submissions, interact with the Flask API, and update the UI dynamically.

## UI Components

### CSS (`app.css`)

- **General Styles**: Defines styles for the body, headings, and form elements.

- **Form Styling**: Styles the form for user inputs, including text fields, radio buttons, and the submit button.

### HTML (`app.html`)

- **Structure**: Defines the structure of the web page, including headings, input fields, and the form.

- **Form Elements**: Contains input fields for house size, lot size, number of rooms, number of bathrooms, and state selection.

### JavaScript (`app.js`)

- **Form Handling**: Contains functions to get values from the form, send requests to the Flask API, and display the estimated price.

- **Page Load**: Loads location names from the API when the page is loaded.
