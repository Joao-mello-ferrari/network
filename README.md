# Why build a social network?
During our second semester of graduation, some very nice data structures. In order to fullfill our aknowledgmente on those subjects, we have decided to develop this social network apllication. 
<br/>
This application consist in a mono repo. Front-end was develped with ReactJS, and the code is inside the **web** folder. Back-end has been written in pythom, and we have used some fancy libs to create the backend logic, which will be presented afterwards.


# Check the project for yourself!
> **Project website** - https://stocks.joaomellof.com </br>
> **Youtube Video** - https://youtu.be/Peg5Mx_zU1I </br>

![stocks home screen. Header on top, with user info and logout button. Filters and table right below, showing stocks](https://user-images.githubusercontent.com/67838782/181861838-e968fad6-c5a1-4320-8274-7478240794bd.png "stocks preview") 

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
   cd web && yarn 
```

   # Main concepts used within this project
   * **React**
   * **Sass** for advanced css features
   * **MicroWebSrv2** for our backend server
   * **Pickle** for saving and retrieving the saved graph
   * **Networkx + Matplotlib** for ploting our database in a graph plot