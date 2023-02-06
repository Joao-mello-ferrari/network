# Why build a social network?
During our second semester of graduation, some very nice data structures. In order to fullfill our aknowledgment on those subjects, we have decided to develop this social network apllication. 
<br/>
This application consist in a mono repo. Front-end was develped with ReactJS, and the code is inside the **web** folder. Back-end has been written in pythom, and we have used some fancy libs to create the backend logic, which will be presented afterwards.


# Check the project for yourself! Click on the image below
[![Check the project video](https://user-images.githubusercontent.com/67838782/217044359-e992d5c8-0155-49e6-8aa2-e3ad85bb2747.png)](https://www.youtube.com/embed/YZYNvoWDaLo)

# How can i download and run the project?
With simples steps, it will be able to run everything locally.
<ul>
  <li>
    Make sure you have node installed in your computer. <a href="https://nodejs.org/en/">Check their page for more</a>
  </li>
  <li>
    If you want to clone this repository via git, you'll to install it as well. <a href="https://git-scm.com/">Take a look on their home page</a>
  </li>
  <li>
    Then, simply download the code and start the project, like shown below.
  </li>
</ul>


```git
   git clone https://github.com/Joao-mello-ferrari/network.git
   cd network
```
We will have to install python and some libs, using pip, for example.
```git
   pip install networkx matplotlib pickle MicroWebSrv2
   cd web && yarn && yarn dev
```

   # Main concepts used within this project
   * **React**
   * **Sass** for advanced css features
   * **MicroWebSrv2** for our backend server
   * **Pickle** for saving and retrieving the saved graph
   * **Networkx + Matplotlib** for ploting our database in a graph plot
