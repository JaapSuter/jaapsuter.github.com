@echo off
set NODE_PATH=B:\Projects\Web\;C:\Program Files (x86)\nodejs\node_modules;C:\Users\Jaap\AppData\Roaming\npm\node_modules
rem git --git-dir="B:\Projects\Web\coffee-script\.git" --work-tree="B:\Projects\Web\coffee-script" branch
node B:\Projects\Web\coffee-script\bin\coffee  %*

