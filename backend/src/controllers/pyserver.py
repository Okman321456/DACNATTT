import re
from flask import Flask, request
import json 
import process
import numpy as np
   
# Setup flask server
app = Flask(__name__) 
  
# Setup url route which will calculate
# total sum of array.
@app.route('/processrq', methods = ['POST']) 
def processing_request():
    data = request.get_json() 
    print(data)
    print(type(data))
  
    # Data variable contains the 
    # data from the node server

    df=process.toFrame(data)

    print("Len_of_rq: ",df["Len_of_rq"])
    print("Len_of_argu: ",df["Len_of_argu"])
    print("Num_of_argu: ",df["Num_of_argu"])
    print("Len_of_path: ",df["Len_of_path"])
    print("Num_of_digit_in_argu: ",df["Num_of_digit_in_argu"])
    print("Num_of_let_in_argu: ",df["Num_of_let_in_argu"])
    print("Num_of_let_char_in_path: ",df["Num_of_let_char_in_path"])
    print("Num_of_spea_char_in_path: ",df["Num_of_spea_char_in_path"])


    pred = process.reconstructed_model.predict(df)
    print(pred)
    result = np.around(pred)
    # result=pred
    result=result[0][0].astype(np.float64)
    results={
        "result":result
    }

    # Return data in json format 
    json_result=json.dumps(results)
    print(json_result)
    return json_result
   
if __name__ == "__main__": 
    app.run(port=5000)