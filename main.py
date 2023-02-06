import matplotlib.pyplot as plt
from time import sleep

from server import CustomServer
from graphDiskManager import loadGraph, saveGraph

database = loadGraph()
server = CustomServer(database)
plt.figure()

try:
    server.start()

    # Main loop
    while True :
      sleep(1)
      if server.shouldClearPlot:
        plt.clf()
        server.shouldClearPLot = False
    
except KeyboardInterrupt :
    server.stop() # Para o servidor
    saveGraph(database)