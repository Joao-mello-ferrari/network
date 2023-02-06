import networkx as nx
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

from graph import Graph as GraphDataStructure

def plotAndSaveGraph(database: GraphDataStructure, userId: str):
  database.makeRelationsList(userId)

  nodes = list(map(
      lambda id: database.getNode(id).value['name'][0].upper(), 
      database.nodeList.keys()
  ))
  
  knownEdges = database.listaDeRelacoesDoTipoConhecido
  friendEdges = database.listaDeRelacoesDoTipoAmigo
  relativeEdges = database.listaDeRelacoesDoTipoParente
  customerEdges = database.listaDeRelacoesDoTipoCliente

  allEdges = knownEdges + friendEdges + relativeEdges + customerEdges

  G = nx.Graph()
  G.add_nodes_from(nodes) #nodes
  G.add_edges_from(allEdges) #allEdges
  pos = nx.spring_layout(G)  # random position for all nodes
  
  options = {"edgecolors": "#ff0000", "node_size": 600, "alpha": 1}
  
  nx.draw_networkx_nodes(
    G, 
    pos, 
    nodelist=nodes, # nodes
    node_color="tab:red", 
    **options
  )

  nx.draw_networkx_edges(
    G, 
    pos, 
    knownEdges, # knownEdges
    width=2.4, 
    alpha=1.0, 
    edge_color='#000000',
    min_target_margin=10,
    arrows=True, 
    arrowstyle="->"
  )

  nx.draw_networkx_edges(
    G, 
    pos, 
    friendEdges, # friendEdges
    width=2.4, 
    alpha=1.0, 
    edge_color='#cc9000', 
    connectionstyle='arc3, rad = 0.2', 
    min_target_margin=10,
    arrows=True, 
    arrowstyle="->"
  )
  
  nx.draw_networkx_edges(
    G, 
    pos, 
    relativeEdges, # relativeEdges
    width=2.4, 
    alpha=1.0, 
    edge_color='#00cc99', 
    connectionstyle='arc3, rad = 0.4', 
    min_target_margin=10,
    arrows=True, 
    arrowstyle="->"
  )

  nx.draw_networkx_edges(
    G, 
    pos, 
    customerEdges, # customerEdges
    width=2.4, 
    alpha=1.0, 
    edge_color='#ff6666'
  )
  
  # # # some math labels
  nodeLabels = {}
  for node in nodes: nodeLabels[node] = node

  lineLegend = [
    Line2D([0], [0], color="#000000", lw=4),
    Line2D([0], [0], color="#cc9000", lw=4),
    Line2D([0], [0], color="#00cc99", lw=4),
    Line2D([0], [0], color="#ff6666", lw=4),
  ]

  lineLegendNames = ['Conhecido(a)', 'Amigo(a)', 'Parente', 'Cliente']


  nx.draw_networkx_labels(G, pos, nodeLabels, font_size=20, font_color="whitesmoke")

  plt.legend(lineLegend, lineLegendNames, loc=(-0.09,0.85))
  plt.axis("off")
  plt.savefig('files/graph.jpg', dpi=1000)

  return True


