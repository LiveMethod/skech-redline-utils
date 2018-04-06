# skech-redline-utils
Generate redlining symbols for sketch from text values (eg the spacing units in your design system) 


TODO:

-----------------

css/style docs:
http://airbnb.io/react-sketchapp/docs/styling.html

-----------------

Inserting into groups is going to be an issue at some point. The H shaped line symbol, particularly. 
read more about doing that here:
https://github.com/airbnb/react-sketchapp/issues/153

-----------------

This is a first pass API wise, by just allowing a resizingConstraint={{ top: true, right: true, bottom: true, left: false, fixedHeight: true, fixedWidth: false }} property on View, Text, and Image components. Definitely open to whatever API makes the most sense here (Props, HOC, etc)

-----------------

Add the full library generation:

Render Library: same as classic react-sketchapp, render the library in the current document
Generate Library: it's creating a new sketch document, rendering the library, saving it and adding the file to the user libraries.

add the functionality here:
https://github.com/mathieudutour/react-sketchapp-library
as discussed here:
https://github.com/airbnb/react-sketchapp/issues/172