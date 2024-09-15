# KisanSahayak - Empowering Farmers with Smart Agriculture Solutions

**KisanSahayak** is a smart, data-driven web application designed to help farmers make informed decisions. By integrating machine learning and environmental data, we aim to provide farmers with real-time insights into rainfall patterns, crop recommendations, and disease management.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Dataset Information](#dataset-information)
- [Contributing](#contributing)
- [Team Members](#team-members)
- [License](#license)

## Project Overview
KisanSahayak provides detailed analysis of district-wise rainfall patterns and predicts the optimal crop types based on soil nutrients, temperature, humidity, and other factors. Farmers can also receive disease predictions and management tips to safeguard their crops. 

This project is especially tailored for farmers in India, providing personalized insights based on the specific environmental conditions of their region.

## Features
- **Rainfall Analysis:** Analyze actual vs. normal rainfall and understand deviations.
- **Crop Recommendations:** Suggest the best crops to plant based on soil and environmental conditions.
- **Disease Prediction:** Predict potential diseases and offer treatment recommendations.
- **Interactive Reports:** Users can upload their data and receive a comprehensive analysis report.

## Technologies Used
- **Backend:** Node JS
- **Frontend:** HTML, CSS, JavaScript, React, React Native
- **Machine Learning:** scikit-learn, pandas, tensorflow
- **Database:** MongoDB
- **Deployment:** AWS EC2, Docker

## Getting Started
To get started with the project, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/yourusername/kisansahayak.git
cd kisansahayak
pip install -r requirements.txt
```

## Usage
Once the project is set up, you can start the web application using the following command:

```bash
python app.py
```

Open your browser and navigate to `http://127.0.0.1:5000` to use the application.

## Dataset Information
Our data is sourced from reliable datasets like IMD (India Meteorological Department) and district-wise agricultural reports. The data contains key features like district names, actual rainfall, normal rainfall, and percentage deviation from the norm.

## Contributing
We welcome contributions from the community! Please feel free to submit a pull request or open an issue if you find any bugs or have suggestions for new features.

## Team Members
This project is a collaborative effort by:
- **Sagnik Basak** (Team Leader) – Machine Learning & Data Analysis Development
- **Tamojit Das** – Full Stack development
- **Ankan Das** – DL Model Development
- **Debeshee Sen** – Full stack development and design
- **Titas Kabiraj** – Front End, design and documentation
- **Ritesh Das** - Android Development

Feel free to reach out to any of us via [kisansahayak@gmail.com](mailto:kisansahayak@gmail.com) for any queries.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
