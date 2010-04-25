@echo off
cls
rmdir /s /q ..\images
xcopy /s /i .\images ..\images
for /r ..\images %%X in (*.jpg) do (convert %%X -resize 640x4096 %%X)
for /r ..\images %%X in (*.png) do (convert %%X -resize 640x4096 %%X)
