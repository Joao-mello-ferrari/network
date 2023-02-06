class Nodo:
    def __init__(self, key, value):
        self.id = key
        self.value = value
        self.connectedTo = {}
        
    def addNeighbor(self, nbr, relationType):
        try: # Caso já tenha relação com o nodo, adicionar a nova
          self.connectedTo[nbr]
          
          self.connectedTo[nbr].append(relationType)
        except: # Primeira relação. Criar lista e adicionar a string que descreve a relação
          self.connectedTo[nbr] = [relationType]  
        
        return True
    
    def removeNeighbor(self, nbr, relationType):
      relations = self.connectedTo[nbr]
      
      if len(relations) == 1 and relationType in relations:
        del self.connectedTo[nbr]
        return

      relations.remove(relationType)
    
    def getConnections(self):
        string = ''
        for key in self.connectedTo.keys():
          string += f'Relações do nodo {self.id} com o nodo {key}: {self.connectedTo[key]}\n'
        
        # Retorna o dicionário contendo todas as relações do nodo e uma string interpolada
        return self.connectedTo, string  
    
    def getId(self):
        return self.id
    
    def getValue(self):
        return self.value

    def copy(self):
      keys = self.value.keys()
      copy = {}
      for key in keys:
        copy[key] = self.value[key]
    
      return copy

    def getRelations(self, nbr):
      if(nbr in self.connectedTo):
        return True, self.connectedTo[nbr] # Retorna as relações com um nodo em específico
      else: return False
      
    def __iter__(self):
      for key in self.connectedTo.keys():
        yield key, self.connectedTo[key]
