@echo off
cls
if "%1" == "all" goto all

ruby .\_ruby\do.rb %*
goto done

:all
ruby .\_ruby\do.rb clean

start cmd /k ruby .\_ruby\do.rb jekyll
start cmd /k ruby .\_ruby\do.rb compass
start cmd /k ruby .\_ruby\do.rb server
start cmd /k ruby .\_ruby\do.rb livereload

:done

