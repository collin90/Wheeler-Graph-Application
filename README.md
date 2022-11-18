Final Genomics Project 

TOPIC: Wheeler graph visualization, and algorithms!!!

TEAM MEMBERS: Brandon Stride, Collin Hughes, Joanna Bi, Julia Ross

Current Goals: 
    1. (Collin) Refactor Interactive Graph such that it will update LIVE to show the OILC representation of the graph if it is wheeler
        1a. (Julia/Joanna) Add the hover feature to display additional inforation when you hover over certain key terms. You could also show a link to reference pages with this.
    2. (Julia/Joanna) Build a python algorithm for the pattern matching page to take in an OILC file, and convert it to a graph visuialization (nodes and edges)
    3. (Anyone who's brave) Build a pattern matching algortihm to visually (with node highlighting!) trace a string P through the wheeler graph created from ^. This should be a step-by-step trace, as in, the user can click their way through the pattern matching process letter-by-letter, with new nodes being highlighted at every step, like a debugger. Or, they can click "show result", and have the whole thing happen at once. We should also report below the graph, whether P is found, as well as how many times its found. If possible, and this is a 'stretch goal', what indices of what strings P is found.
    4. (Brandon) Refactor findOrdering to a functional programming language without convoluting overall server architecture too significantly.
    5. (Brandon) Add the merge idea to the findOrdering, and compare the results.
    6. (Collin) Optimize the memory usage for the following algorithms: getSingleStringWheelerGraph, and getTrieWheelerGraph. Very important for running visualize with big inputs on our deployed app in the cloud. Because I'm cheap!!
    7. (Collin) Clean up The pages, such that components are modularized into react functions (like the download buttons) so that its easier to reuse things from page to page.


HOW TO RUN THIS APP IN YOUR DEVELOPMENT SERVER!!!

    A) Run these commands in your terminal
       1.  pip install virtualenv
       2.  virtualenv env
       3.  source env/Scripts/activate     ** it might be env/bin/activate if you get an error. You should see (env) as the output on your terminal; it might also be ```./env/Scripts/activate.ps1```, and this could require that you run ```Set-ExecutionPolicy RemoteSigned``` **
       4.  pip install flask flask_cors
       5.  python algorithms/main.py    **this should launch a dev server for the python file (which doesn't do much yet, but it will!) If you go to this localhost url, it will show a 404 error. That's because the page does nothing by itself, it only has a callable method.**

    *Now, go to a new terminal and do the remaining commands to launch the actual app

       6.  yarn install
       7.  yarn dev

    
THIS APP IS DEPLOYED NOW.

1. the python back end is running at https://python-wheeler-algorithms.ue.r.appspot.com/  HOWEVER, it is not in use right now. Use localhost for now plz!
2. The front end is running with github pages at https://collin90.github.io/Wheeler-Graph-Application/#/


    
