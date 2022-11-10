Final Genomics Project 

TOPIC: Wheeler graph visualization, and algorithms!!!

TEAM MEMBERS: Brandon Stride, Collin Hughes, Joanna Bi, Julia Ross

Current Goals: 
    1. Build Tutorial Page
        a. Build interactive graph component (with react flow) so it can be nested into the tutorial page easily
    2. Finalize visualize page
        a. Build algorithm that compresses multi-string wheeler graphs (per section 4.4 of the paper: https://www.sciencedirect.com/science/article/pii/S0304397517305285)
    3. Refactor / Integrate wheeler graph detection algorithms.
        a. Start stylizing the "Wheeler Property" page.
    4. Deploy both server and client apps for the presentation on wednesday (11/16/2022). 



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

    

    
