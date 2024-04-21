import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Data had commas at the end, cleaned it up
# with open("DiseaseData.csv", 'r') as file:
#     lines = file.readlines()

# lines = [line.rstrip(',\n')+'\n' for line in lines]

# with open("DiseaseData.csv", 'w') as file:
#     file.writelines(lines)

symptoms = open("WebpageWorkings\FormPage\symptoms.txt", "r").readline()
symptoms = symptoms.split(",")
symptoms_dict = {}
for i in range(len(symptoms)):
    symptoms_dict[symptoms[i]] = i

data = pd.read_csv("DiseasePredictorModel\DiseaseData.csv")

X = data.drop('prognosis', axis=1)
y = data['prognosis']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

# Tested to make sure the model is well fit
# y_pred = model.predict(X_test)
# print(classification_report(y_test, y_pred))

def predict(data):
    data_array = np.array(data)
    probabilities = model.predict_proba(data_array.reshape(1, -1))
    
    proba_df = pd.DataFrame(probabilities, columns=model.classes_)
    top_3 = proba_df.iloc[0].nlargest(3)

    return top_3

# # Gastroenteritis
# predict("0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0", "str")
# # Fungal Infection
# predict("DiseasePredictorModel\csvTest.csv", "csv")

# testarr = [0] * len(symptoms)
# testarr[symptoms_dict["pain_in_anal_region"]] = 1
# predict(testarr, "lst")

def createInput(input):
    arr = [0] * len(symptoms)
    for i in input:
        arr[symptoms_dict[i]] = 1
    return arr