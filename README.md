Final Genomics Project 

TOPIC: Wheeler graph visualization, and algorithms!!!

TEAM MEMBERS: Brandon Stride, Collin Hughes, Joanna Bi, Julia Ross


HOW TO RUN THIS APP IN YOUR DEVELOPMENT SERVER!!!

    A) Run these commands in your terminal
       1.  pip install virtualenv
       2.  virtualenv env
       3.  source env/Scripts/activate     ** it might be env/bin/activate if you get an error. You should see (env) as the output on your terminal; it might also be ```./env/Scripts/activate.ps1```, and this could require that you run ```Set-ExecutionPolicy RemoteSigned``` **
       4.  pip install flask flask_cors
       5.  python algorithms/main.py    **this should launch a dev server for the python file (which doesn't do much yet, but it will!) If you go to this localhost url, it will show a 404 error. That's because the page does nothing by itself, it only has a callable method.**

    B) Now, go to a new terminal and do the remaining commands to launch the actual app

       6.  yarn install
       7.  yarn dev

    C) Finally, you need to make sure the app is hitting the correct localhost back end for the python calls. Go to src/url.js and make sure the URL var is set to `http://127.0.0.1:5000/`  now, all the calls made will hit the correct endpoint. This step is necessary if you want to do local debugging of the python server. If the url is set instead to a deployed endpoint, then making changes in the /algorithms source code will do nothing until the folder is redeployed.

    
THIS APP IS DEPLOYED NOW.

1. the python back end is running at https://python-wheeler-algorithms-service-34nimsvaoa-uk.a.run.app HOWEVER, this will not always be the case. Soon, I will delete this service because its not free!!!
2. The front end is running with github pages at https://collin90.github.io/Wheeler-Graph-Application/#/ This will likely always be up. 


    
