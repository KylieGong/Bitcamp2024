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

data = pd.read_csv("DiseasePredictorModel\DiseaseData.csv")

X = data.drop('prognosis', axis=1)
y = data['prognosis']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

def predict(data, type):
    if type == "str":
        data_array = np.array([int(x) for x in data.split(',')])
        probabilities = model.predict_proba(data_array.reshape(1, -1))
    else:
        X = pd.read_csv(data).values
        probabilities = model.predict_proba(X)
    
    proba_df = pd.DataFrame(probabilities, columns=model.classes_)
    top_3_prognosis = proba_df.iloc[0].nlargest(3)

    print("Top 3 prognosis and their probabilities:")
    print(top_3_prognosis)

# Gastroenteritis
predict("0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0", "str")
# Fungal Infection
predict("csvTest.csv", "csv")