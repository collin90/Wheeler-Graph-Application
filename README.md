Final Genomics Project 

TOPIC: Wheeler graph visualization, and algorithms!!!

TEAM MEMBERS: Brandon Stride, Collin Hughes, Joanna Bi, Julia Ross

Current Goals: 

    1. (Joanna) Finishing the pattern matching tutorial. Final adjustments to the tutorial page. Someone should really look into Ben's mid presentation feedback and incorporate that in the tutorial otherwise we'll prob lose points again.

    2. (Collin) Write up a readme on how to test the various methods in our algorithms folder.

    3. (Collin) Redeploy the code to the old cloud sdk server so we can present again.

    4. (All) finishing the paper.


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


    
