@echo off
set IMAGE_MAGICK_CONVERT_EXE=.\tools\ImageMagick-6.7.0-Q16-Windows-Convert.exe
set PNG_OUT_EXE=.\tools\pngout.exe
cls
rmdir /s /q ..\images
xcopy /s /i .\images ..\images
for /r ..\images %%X in (*.jpg) do (%IMAGE_MAGICK_CONVERT_EXE% %%X -verbose -resize 640x4096 %%X)
for /r ..\images %%X in (*.png) do (%IMAGE_MAGICK_CONVERT_EXE% %%X -verbose -resize 640x4096 %%X)
rem for /r ..\images %%X in (*.jpg) do (%PNG_OUT_EXE% %%X /y)
rem for /r ..\images %%X in (*.png) do (%PNG_OUT_EXE% %%X /y)
