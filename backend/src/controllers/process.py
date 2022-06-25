from multiprocessing.sharedctypes import Value
import re
import sys
import os

import keras
from keras.models import  Sequential
from keras.layers.core import  Lambda , Dense, Flatten, Dropout
import tensorflow as tf

import numpy as np
import pandas as pd
from numpy.random import RandomState
import warnings
warnings.filterwarnings("ignore")
# data_path="E:/lms/2021-2022 k2/DACNATTT/Web-Application-Attack-Datasets-master/WekaData/"
# df_normal = pd.read_csv(data_path + "normal_data.csv",  encoding = 'utf8')
# df_normal = df_normal[:40000]
# df_normal = df_normal.drop(['Class'], axis=1)
# df_anomalous = pd.read_csv(data_path + "anomalous_data.csv",  encoding = 'utf8')
# df_anomalous = df_anomalous[:40000]
# df_anomalous = df_anomalous.drop(['Class'], axis=1)

# df_normal["y"]=0
# df_anomalous["y"]=1

# data = pd.concat([df_normal, df_anomalous], axis =0 )
# data = data.sample(frac = 1)
# data.reset_index(inplace = True)
# data.drop(["index"], axis = 1, inplace = True)
# # data.replace([np.inf, -np.inf], np.nan, inplace=True)
# data = data.dropna(axis=1, how='any')

# y = data['y']
# X = data.drop(['y'], axis=1)

# from sklearn.preprocessing import MinMaxScaler
# scaler = MinMaxScaler(feature_range=(0, 10))
# X = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)

def scale(max,min,value):
  value=int(value)
  if(value>=min and value<=max):
    return float((value-min))/(max-min)
  elif(value>max):
    return 1
  elif(value<min):
    return 0

def toFrame(data):
  max_Len_of_rq=1174
  min_Len_of_rq=33
  Len_of_rq=scale(max_Len_of_rq,min_Len_of_rq,data["Len_of_rq"])
  max_Len_of_argu=953
  min_Len_of_argu=2
  Len_of_argu=scale(max_Len_of_argu,min_Len_of_argu,data["Len_of_argu"])
  max_Num_of_argu=17
  min_Num_of_argu=0
  Num_of_argu=scale(max_Num_of_argu,min_Num_of_argu,data["Num_of_argu"])
  max_Num_of_digit_in_argu=437
  min_Num_of_digit_in_argu=0
  Num_of_digit_in_argu=scale(max_Num_of_digit_in_argu,min_Num_of_digit_in_argu,data["Num_of_digit_in_argu"])
  max_Len_of_path=982
  min_Len_of_path=4
  Len_of_path=scale(max_Len_of_path,min_Len_of_path,data["Len_of_path"])
  max_Num_of_let_in_argu=363
  min_Num_of_let_in_argu=0
  Num_of_let_in_argu=scale(max_Num_of_let_in_argu,min_Num_of_let_in_argu,data["Num_of_let_in_argu"])
  max_Num_of_let_char_in_path=483
  min_Num_of_let_char_in_path=0
  Num_of_let_char_in_path=scale(max_Num_of_let_char_in_path,min_Num_of_let_char_in_path,data["Num_of_let_char_in_path"])
  max_Num_of_spea_char_in_path=114
  min_Num_of_spea_char_in_path=0
  Num_of_spea_char_in_path=scale(max_Num_of_spea_char_in_path,min_Num_of_spea_char_in_path,data["Num_of_spea_char_in_path"])
  s={
    "Len_of_rq":pd.Series(Len_of_rq, index=['1']),
    "Len_of_argu":pd.Series(Len_of_argu, index=['1']),
    "Num_of_argu":pd.Series(Num_of_argu, index=['1']),
    "Num_of_digit_in_argu":pd.Series(Num_of_digit_in_argu, index=['1']),
    "Len_of_path":pd.Series(Len_of_path, index=['1']),
    "Num_of_let_in_argu":pd.Series(Num_of_let_in_argu, index=['1']),
    "Num_of_let_char_in_path":pd.Series(Num_of_let_char_in_path, index=['1']),
    "Num_of_spea_char_in_path":pd.Series(Num_of_spea_char_in_path, index=['1'])
  }
  df = pd.DataFrame(s, index=['1'])
  return df

# max_Len_of_rq=1174
# min_Len_of_rq=33
# Len_of_rq=scale(max_Len_of_rq,min_Len_of_rq,sys.argv[1])
# max_Len_of_argu=953
# min_Len_of_argu=2
# Len_of_argu=scale(max_Len_of_argu,min_Len_of_argu,sys.argv[2])
# max_Num_of_argu=17
# min_Num_of_argu=0
# Num_of_argu=scale(max_Num_of_argu,min_Num_of_argu,sys.argv[3])
# max_Num_of_digit_in_argu=437
# min_Num_of_digit_in_argu=0
# Num_of_digit_in_argu=scale(max_Num_of_digit_in_argu,min_Num_of_digit_in_argu,sys.argv[4])
# max_Len_of_path=982
# min_Len_of_path=4
# Len_of_path=scale(max_Len_of_path,min_Len_of_path,sys.argv[5])
# max_Num_of_let_in_argu=363
# min_Num_of_let_in_argu=0
# Num_of_let_in_argu=scale(max_Num_of_let_in_argu,min_Num_of_let_in_argu,sys.argv[6])
# max_Num_of_let_char_in_path=483
# min_Num_of_let_char_in_path=0
# Num_of_let_char_in_path=scale(max_Num_of_let_char_in_path,min_Num_of_let_char_in_path,sys.argv[7])
# max_Num_of_spea_char_in_path=114
# min_Num_of_spea_char_in_path=0
# Num_of_spea_char_in_path=scale(max_Num_of_spea_char_in_path,min_Num_of_spea_char_in_path,sys.argv[8])

# s={
#   "Len_of_rq":pd.Series(Len_of_rq, index=['1']),
#   "Len_of_argu":pd.Series(Len_of_argu, index=['1']),
#   "Num_of_argu":pd.Series(Num_of_argu, index=['1']),
#   "Num_of_digit_in_argu":pd.Series(Len_of_path, index=['1']),
#   "Len_of_path":pd.Series(Num_of_digit_in_argu, index=['1']),
#   "Num_of_let_in_argu":pd.Series(Num_of_let_in_argu, index=['1']),
#   "Num_of_let_char_in_path":pd.Series(Num_of_let_char_in_path, index=['1']),
#   "Num_of_spea_char_in_path":pd.Series(Num_of_spea_char_in_path, index=['1'])
# }
# df = pd.DataFrame(s, index=['1'])
# print(df)

d = {'Len_of_rq': 0.236658, 'Len_of_argu': 0.092488, 'Num_of_argu': 0.228534,'Num_of_digit_in_argu': 0.032856,
     'Len_of_path': 0.127994,'Num_of_let_in_argu': 0.153709,'Num_of_let_char_in_path': 0.178272,'Num_of_spea_char_in_path': 0.027404}
mean_px = pd.Series(data=d).astype(np.float32)
# print(mean_px)

d = {'Len_of_rq': 0.100372, 'Len_of_argu': 0.121447, 'Num_of_argu': 0.280453,'Num_of_digit_in_argu': 0.059938,
     'Len_of_path': 0.130411,'Num_of_let_in_argu': 0.195509,'Num_of_let_char_in_path': 0.166821,'Num_of_spea_char_in_path': 0.065864}
std_px = pd.Series(data=d).astype(np.float32)
# print(std_px)

def standardize(x): 
    return (x-mean_px)/std_px

reconstructed_model = keras.models.load_model("./Model_8_128_32_16_1")

# pred = reconstructed_model.predict(df)
# results = np.around(pred)
# print(pred)

# count=0
# for i in range(len(results)):
#   if(abs(results[i]-y.values[i])==0):
#     count+=1
# print(count,"/",len(results))

# print("ID: " + sys.argv[1])