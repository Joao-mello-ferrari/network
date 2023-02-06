from graphDiskManager import loadGraph, saveGraph

g = loadGraph()

v = g.getVertices()

for i in v:
  print(g.getNode(i).value['name'], f'id = {i}')

id = int(input('Id para deletar: '))

del g.nodeList[id]
g.numVertices -= 1

saveGraph(g)

