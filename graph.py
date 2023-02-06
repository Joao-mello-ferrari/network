# -*- coding: utf-8 -*-
from node import *
nodoIdList = []

from random import randrange

class Graph:
    def __init__(self):
        self.nodeList = {}  #lista de nodos
        self.numVertices = 0

        self.listaDeRelacoesDoTipoConhecido = []
        self.listaDeRelacoesDoTipoAmigo = []
        self.listaDeRelacoesDoTipoParente = []
        self.listaDeRelacoesDoTipoCliente = []

        self.maxSearchReturnSize = 50

    def __contains__(self, key):
        return key in self.nodeList

    def __iter__(self):
      for key in self.nodeList.keys():
        yield self.nodeList[key]

    def hashByEmail(self, email):
        key = 0
        for i in email: key += ord(i)
        return key
        
    def addNode(self, value):
        self.numVertices = self.numVertices + 1
        self.wideSearchMinStartSize = min(self.numVertices, 5)
        
        nodeKey = self.hashByEmail(value['email'])
        newNodo = Nodo(nodeKey, value)
        self.nodeList[nodeKey] = newNodo  #a key do nodo é a chave dele no json/dic
        return newNodo
    
    def getNode(self, key):
        if key in self.nodeList:
            return self.nodeList[key]   # retorna um nodo, tomando como base a chave
        else:
            return None
    
    def addEdge(self, f, t, relationType):
      if f in self.nodeList and t in self.nodeList:
        if relationType not in ['known', 'friend', 'relative', 'customer']:
          return False

        # Adiciona a relacao unilateral (somente conhecido)
        self.nodeList[f].addNeighbor(self.nodeList[t].getId(), relationType)  
        
        # Adiciona a relação contrária, se for de algum dos tipos abaixo
        if relationType in ['friend', 'relative', 'customer']: 
          self.nodeList[t].addNeighbor(self.nodeList[f].getId(), relationType)  

    def removeEdge(self, f, t, relationType):
      if f in self.nodeList and t in self.nodeList:
        if relationType not in ['known', 'friend', 'relative', 'customer']:
          return False

        # Remove a relacao unilateral (somente conhecido)
        self.nodeList[f].removeNeighbor(self.nodeList[t].getId(), relationType)  
        
        # Remove a relação contrária, se for de algum dos tipos abaixo
        if relationType in ['friend', 'relative', 'customer']: 
          self.nodeList[t].removeNeighbor(self.nodeList[f].getId(), relationType) 

    def makeRelationsList(self, userId):
         self.listaDeRelacoesDoTipoConhecido = []
         self.listaDeRelacoesDoTipoAmigo = []
         self.listaDeRelacoesDoTipoParente = []
         self.listaDeRelacoesDoTipoCliente = []
        
         for nodoId1 in self.nodeList.keys():   
        #pega um nodo e na sequencia pega os nodos que estão ligados a ele
            for nodoId2 in self.nodeList[nodoId1].getConnections()[0].keys():
        #pega o id do nodo que ta conectado ao 1 nodo e cria a tupla da relação
                tuplaRelacao = (
                  self.nodeList[nodoId1].value['name'][0].upper(), 
                  self.nodeList[nodoId2].value['name'][0].upper()
                )
                types = self.nodeList[nodoId1].getConnections()[0][nodoId2]    
        #vetor com os tipos de relações entre 2 nodos, pq podemos ter mais de 1 tipo de
        #relação entre dois nodos. Ex: known e friend

        #percorre o vetor com os tipos de relações entre os dois nodos e identifica qual
        #relação existe entre eles e guarda a tupla na lista correspondente à relação.       
                for i in range(len(types)):
                    if(types[i] == 'friend'): 
                        self.listaDeRelacoesDoTipoAmigo.append(tuplaRelacao)
                    elif(types[i] == 'relative'):
                        self.listaDeRelacoesDoTipoParente.append(tuplaRelacao)
                    elif(types[i] == 'known'):
                        self.listaDeRelacoesDoTipoConhecido.append(tuplaRelacao)
                    elif(types[i] == 'customer'):
                        self.listaDeRelacoesDoTipoCliente.append(tuplaRelacao)    

    def buscaNod(self, nodoId, search, searchKey):
        global nodoIdList   #lista pra recursão não entrar em loop
        nodoIdList.append(nodoId)
        
        for nodo in self.getNode(nodoId).getConnections()[0].keys():    #verifica se no primeiro nivel tem relação
           if(self.getNode(nodo).value[searchKey] == search): 
               return (self.getNode(nodo).value)
        for nodo in self.getNode(nodoId).getConnections()[0].keys():    #se n achar, chama recursivo a busca para os outros niveis
            if nodo not in nodoIdList: 
                return self.buscaLargura(nodo,search, searchKey, False)
        return 'no conection'
    
    def wideSearch(self, nodeId, search, searchKey):
        originNode = self.getNode(nodeId)
        
        searchLine = list(originNode.getConnections()[0].keys())
        matchedNodes = []
        searchedNodes = [nodeId]
        
        while len(searchLine) < min(self.numVertices-1, 5):
          newNodeId = self.getRandomNode()
          if newNodeId not in searchLine and newNodeId != nodeId:
            searchLine.append(newNodeId)
          
        for relatedNodeId in searchLine: 
          if len(matchedNodes) > self.maxSearchReturnSize: break
          if relatedNodeId in searchedNodes: continue

          searchedNodes.append(relatedNodeId)
          relatedNode = self.getNode(relatedNodeId)
          
          if search in relatedNode.value[searchKey].lower():
            nodeCopy = relatedNode.copy()
            del nodeCopy['privateInfo']
            del nodeCopy['password']

            connections = []
            try: connections = originNode.connectedTo[relatedNodeId]
            except: pass
            
            nodeCopy['connections'] = connections
            nodeCopy['id'] = relatedNodeId
            matchedNodes.append(nodeCopy)

          nodeRelationsDictKeys = relatedNode.getConnections()[0].keys()
          searchLine += list(nodeRelationsDictKeys)

        return matchedNodes

    def getVertices(self):
        return list(self.nodeList.keys())
    
    def getRandomNode(self):
      randomInt = randrange(-1, self.numVertices-1)
      randomId = self.getVertices()[randomInt]
      return randomId
    
    def getNodeByEmail(self, email):
      hashedEmail = self.hashByEmail(email)
      return self.getNode(hashedEmail)
    
    def getNodeRelationsNodes(self, userId, connectionsDict):
      user = self.getNode(userId)
      connectedNodesList = []
      for nodeKey in connectionsDict.keys():
        node = self.getNode(nodeKey).copy()
        del node['privateInfo']
        node['id'] = nodeKey
        node['connections'] = user.connectedTo[nodeKey]
        connectedNodesList.append(node)

      return connectedNodesList
