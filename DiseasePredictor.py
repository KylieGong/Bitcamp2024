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

data = pd.read_csv("DiseaseData.csv")

X = data.drop('prognosis', axis=1)
y = data['prognosis']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))