from pickle import load, dump
from graph import Graph

def loadGraph():
  try:
    # Open the file in binary mode
    with open('files/graph.pkl', 'rb') as file:
        return load(file) # Call load method to deserialize
  except:
    return Graph()

def saveGraph(graph):
  # Open a file and use dump()
  with open('files/graph.pkl', 'wb') as file:
      dump(graph, file) # A new file will be created
