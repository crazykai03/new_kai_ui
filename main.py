import serial
import json
import threading



ser = serial.Serial("/dev/ttyS0", 19200,timeout=0.2)
data_to_store ={}
json_array=""
real_time_json =""
try:
    jsonFile = open("data.json", "r")
    json_array = json.load(jsonFile)
    jsonFile.close()
except:
  print("An exception occurred")
  json_array =[]



def check_update():
    for i in range(len(json_array)):
        if json_array[i]["control_led-id"] == data_to_store["control_led-id"]:
            json_array[i]["status"] = data_to_store["status"]
            return True

    return False


def get_data():
    global  json_array
    try:
    	jsonFile = open("data.json", "r")
    	json_array = json.load(jsonFile)
    	jsonFile.close()
    	threading.Timer(1.0, get_data).start()
    except:
    	print("no file")

threading.Timer(1.0, get_data).start()


if __name__ == "__main__":
    while True:
     data_arr=ser.readline()
     
     data_len = len(data_arr)
          
     check_sum=0
     if data_len ==18:
         for x in range(1, 15):
             check_sum +=data_arr[x]
         check_in_hex = format(check_sum,'02X')[-2:]
         if (chr(data_arr[15]) + chr(data_arr[16])== check_in_hex):
             data_to_store["type_id"] = chr(data_arr[1])+chr(data_arr[2])
             data_to_store["lock_id"] = chr(data_arr[3])+chr(data_arr[4]) + chr(data_arr[5])+chr(data_arr[6])
             data_to_store["control_led-id"]= chr(data_arr[9])+chr(data_arr[10]) + chr(data_arr[11])+chr(data_arr[12])
             if (data_to_store["type_id"] == "00"):
                data_to_store["status"] = chr(int(chr(data_arr[13]) + chr(data_arr[14]),16))
             data_to_store["reference_id"]=""
             data_to_store["dry_contact_id"]=""


             if check_update() == False:
                 json_array.append(data_to_store)

             jsonFile = open("data.json","w")
             jsonFile.write(json.dumps(json_array))
             jsonFile.close()

             print(json_array)








