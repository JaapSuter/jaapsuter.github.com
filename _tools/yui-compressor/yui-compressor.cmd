@echo off
echo %~dp0
call "c:\Program Files (x86)\Java\jre7\bin\java.exe" -jar %~dp0yuicompressor-2.4.8pre.jar %*
