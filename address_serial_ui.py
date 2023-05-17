import tkinter as tk
import tkinter.ttk as ttk
import serial.tools.list_ports
import serial

import continuous_threading

from itertools import cycle




# --- functions ---

com_name =""



def com_port_reading(num):
    global com_name , pre_com_name


    if com_name != " ":

        try:
            pre_com_name = com_name
            ser = serial.Serial(com_name, 19200 , timeout=2)
            cc = ser.readline()
            data_len = len(cc)
            print(data_len)
            type_id_value.config(text="{}".format(chr(cc[1]) + chr(cc[2])))
            device_id_value.config(text="{}".format(chr(cc[3]) + chr(cc[4]) + chr(cc[5]) + chr(cc[6])))
            pid_id_value.config(text="{}".format(chr(cc[7]) + chr(cc[8])))
            lock_id_value.config(text="{}".format(chr(cc[9]) + chr(cc[10]) + chr(cc[11]) + chr(cc[12])))
            status_id_value.config(text="{}".format(chr(cc[13]) + chr(cc[14])))
        except:
            print("")






















def serial_ports():
    return serial.tools.list_ports.comports()

def on_select(event=None):


    global  com_name
    # or get selection directly from combobox
    com_name = (cb.get().split(" ")[0])
    print(com_name)


# --- main ---

root = tk.Tk()
root.title('SMART TOIET TESTING')
root.geometry('380x400')


cb = ttk.Combobox(root, values=serial_ports())
cb.pack()
cb.place(x=110,y=20)

type_id_label = tk.Label(root, text="Type ID： =")
type_id_label.pack()
type_id_label.place(x=50,y=90)

type_id_value = tk.Label(root)
type_id_value.pack()
type_id_value.place(x=140,y=90)


device_id_label = tk.Label(root, text="Device ID： =")
device_id_label.pack()
device_id_label.place(x=50,y= 130)

device_id_value = tk.Label(root)
device_id_value.pack()
device_id_value.place(x=140,y=130)




pid_id_label = tk.Label(root, text="PID：　=")
pid_id_label.pack()
pid_id_label.place(x=50,y=170)

pid_id_value = tk.Label(root)
pid_id_value.pack()
pid_id_value.place(x=140,y=170)





lock_id_label = tk.Label(root, text="LOCK ID： =")
lock_id_label.pack()
lock_id_label.place(x=50,y=210)


lock_id_value = tk.Label(root)
lock_id_value.pack()
lock_id_value.place(x=140,y=210)






status_id_label = tk.Label(root, text="VALUE / STATUS：　=")
status_id_label.pack()
status_id_label.place(x=50,y=250)

status_id_value = tk.Label(root)
status_id_value.pack()
status_id_value.place(x=200,y=250)




# assign function to combobox
cb.bind('<<ComboboxSelected>>', on_select)


t1 = continuous_threading.ContinuousThread(target=com_port_reading, args=(10,))
t1.start()



root.mainloop()