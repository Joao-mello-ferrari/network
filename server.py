from MicroWebSrv2 import *
from graphPlot import plotAndSaveGraph
from graph import Graph

class CustomServer(MicroWebSrv2):
  def __init__(self, database: Graph):
    super().__init__()
    self.AllowAllOrigins=True               # Permitir requisições de qualquer endpoint
    self.CORSAllowAll = True                # Permtir troca de recursos (dados) sem protocolo de segurança
    self.BindAddress = ('localhost', 3000)  # Alterar a porta onde o backend estará disponível
    self.database = database
    self.shouldClearPlot = False

  def start(self):
    self.StartManaged() 

  def stop(self,):
    self.Stop() 

  # Cadastrar usuário/empresa
  @WebRoute(POST, '/signup', name="signup")
  def Signup(self, request):
    newEntity = request.GetPostedJSONObject()
    self.database.addNode(newEntity)
    request.Response.ReturnOk()

  # Logar usuário/empresa
  @WebRoute(POST, '/login', name="login")
  def Login(self, request):
    body = request.GetPostedJSONObject()
    email = body['email']
    password = body['password']

    user = self.database.getNodeByEmail(email)

    if not user:
      return request.Response.ReturnBadRequest()

    if user.value['password'] != password:
      return request.Response.ReturnUnauthorized('Invalid information')
    
    userCopy = user.copy()
    userCopy["id"] = user.getId()
    request.Response.ReturnOkJSON(userCopy)
  
  # Carregar os nodos que se relacionam com o usuário de id <userid>
  @WebRoute(GET, '/relations/<userid>', name="relations")
  def LoadRelations(self, request, args):
    userId = args['userid']
    user = self.database.getNode(userId)

    if user:
      relations = self.database.getNodeRelationsNodes(userId, user.getConnections()[0])
      return request.Response.ReturnOkJSON({ 'relations': relations })
    
    request.Response.ReturnBadRequest()
    
  # Carregar as TODAS as entidades, por busca em largura
  # O usuário com id <userid> será a raiz da busca
  @WebRoute(GET, '/entities/<userid>', name="entities")
  def LoadEntities(self, request, args):
    params = request.QueryParams
    
    userId = args['userid']
    search = params['search']
    searchKey = params['searchKey']

    user = self.database.getNode(userId)
    
    if user:
      searchResults = self.database.wideSearch(userId, search, searchKey)
      request.Response.ReturnOkJSON({ 'entities': searchResults })
    
    request.Response.ReturnBadRequest()

  # Montar e retornar o grafo (.png), com e sem foca no usuário
  @WebRoute(GET, '/graph/<userid>', name="graph")
  def CreateGraph(self, request, args):
    userId = args['userid']

    self.shouldClearPlot = plotAndSaveGraph(self.database, userId)
    return request.Response.ReturnFile('./files/graph.jpg')

  # Adicionar/deletar a relação x do usuário de id userid
  @WebRoute(PUT, '/relation/<userid>', name="add_remove_relation")
  def EditRelation(self, request, args):
    body = request.GetPostedJSONObject()
    userId = args['userid']
    entityId = body['entityId']
    relationType = body['relationType']
    operation = body['operation']

    if operation == 'create':
      self.database.addEdge(userId, entityId, relationType)
      return request.Response.ReturnOk()

    elif operation == 'delete':
      self.database.removeEdge(userId, entityId, relationType)
      return request.Response.ReturnOk()

    request.Response.ReturnBadRequest()
